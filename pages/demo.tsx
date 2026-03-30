import { useState, useEffect, useCallback, useRef } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, usePublicClient, useWalletClient } from 'wagmi';
import {
    parseEther,
    formatEther,
    keccak256,
    toBytes,
    encodeAbiParameters,
    parseAbiParameters,
    parseAbi,
    type Address,
    isAddress
} from 'viem';
// Note: Ensure @cofhe/sdk is installed
import { createCofheConfig, createCofheClient } from "@cofhe/sdk/web";
import { sepolia } from "@cofhe/sdk/chains";
import { Encryptable, FheTypes } from "@cofhe/sdk";
import { PermitUtils } from "@cofhe/sdk/permits";

// Contract addresses configuration deployed on Sepolia
const CONFIG = {
    HOOK_ADDRESS: "0x6A755997D7B06900Fc3AFA8085A76C7182658aC8" as const,
    POOL_MANAGER_ADDRESS: "0xE03A1074c86CFeDd5C142C4F04F1a1536e203543" as const,
    SWAP_ROUTER_ADDRESS: "0xcAc2474F8AAA489A7739B21Ced73c184b35C1821" as const,
    TOKEN0_ADDRESS: "0x2794a0b7187BFCd81D2b6d05E8a6e6cAE3F97fFa" as const, // MockTokenA
    TOKEN1_ADDRESS: "0xEa20820719c5Ae04Bce9A098E209f4d8C60DAF06" as const, // MockTokenB
    LP_FEE: 3000,
    TICK_SPACING: 60,
};

const HOOK_ABI = parseAbi([
    "struct EncryptedValue { uint256 ctHash; uint8 securityZone; uint8 utype; bytes signature; }",
    "struct Strategy { bytes32 strategyId; address owner; bool isActive; uint256 lastRebalanceBlock; uint256 rebalanceFrequency; EncryptedValue executionWindow; EncryptedValue spreadBlocks; uint256 priorityFee; EncryptedValue maxSlippage; }",
    "struct PoolKey { address currency0; address currency1; uint24 fee; int24 tickSpacing; address hooks; }",
    "event DarkOrderPlaced(bytes32 indexed poolId, uint256 indexed orderId, address indexed owner, bool isBuy)",
    "event DarkOrderFilled(bytes32 indexed poolId, uint256 indexed orderId, uint128 matchedAmount)",
    "event DarkOrderClaimed(bytes32 indexed poolId, uint256 indexed orderId, uint128 claimedAmount)",
    "function createStrategy(bytes32 strategyId, uint256 rebalanceFrequency, EncryptedValue executionWindow, EncryptedValue spreadBlocks, EncryptedValue maxSlippage) external returns (bool)",
    "function setTargetAllocation(bytes32 strategyId, address currency, EncryptedValue targetPercentage, EncryptedValue minThreshold, EncryptedValue maxThreshold) external",
    "function setEncryptedPosition(bytes32 strategyId, address currency, EncryptedValue position) external",
    "function enableCrossPoolCoordination(bytes32 strategyId, bytes32[] pools) external",
    "function getStrategy(bytes32 strategyId) external view returns (Strategy)",
    "function getEncryptedPosition(bytes32 strategyId, address currency) external view returns (uint256)",
    "function placeDarkOrder(PoolKey poolKey, uint128 plainAmount, EncryptedValue encAmount, bool isBuy) external payable returns (uint256 orderId)",
    "function cancelDarkOrder(PoolKey poolKey, uint256 orderId) external",
    "function claimDarkOrder(PoolKey poolKey, uint256 orderId) external",
    "function getDarkOrder(PoolKey poolKey, uint256 orderId) external view returns (address owner, uint256 encryptedAmount, uint128 plainAmount, uint128 filledAmount, bool isBuy, bool isActive)",
]);

const ERC20_ABI = parseAbi([
    "function balanceOf(address account) external view returns (uint256)",
    "function symbol() external view returns (string)",
    "function approve(address spender, uint256 amount) external returns (bool)",
    "function allowance(address owner, address spender) external view returns (uint256)",
]);

const SWAP_ROUTER_ABI = [
    {
        name: 'swap',
        type: 'function',
        stateMutability: 'payable',
        inputs: [
            {
                name: 'poolKey',
                type: 'tuple',
                components: [
                    { name: 'currency0', type: 'address' },
                    { name: 'currency1', type: 'address' },
                    { name: 'fee', type: 'uint24' },
                    { name: 'tickSpacing', type: 'int24' },
                    { name: 'hooks', type: 'address' },
                ],
            },
            {
                name: 'params',
                type: 'tuple',
                components: [
                    { name: 'zeroForOne', type: 'bool' },
                    { name: 'amountSpecified', type: 'int256' },
                    { name: 'sqrtPriceLimitX96', type: 'uint160' },
                ],
            },
            { name: 'hookData', type: 'bytes' },
        ],
        outputs: [{ name: '', type: 'int256' }],
    },
] as const;

type LogEntry = {
    type: 'info' | 'success' | 'error' | 'warning';
    message: string;
    timestamp: Date;
};

type Toast = {
    id: number;
    type: 'success' | 'error' | 'info' | 'warning';
    title: string;
    message: string;
};

let cofheGlobalClient: any = null;

export default function SDKDemo() {
    const { address, isConnected, chain } = useAccount();
    const publicClient = usePublicClient();
    const { data: walletClient } = useWalletClient();

    const [logs, setLogs] = useState<LogEntry[]>([]);
    const [loading, setLoading] = useState(false);
    const [loadingStep, setLoadingStep] = useState('');
    const [strategyId, setStrategyId] = useState<`0x${string}`>('0x');
    const [token0Balance, setToken0Balance] = useState('0');
    const [token1Balance, setToken1Balance] = useState('0');
    const [cofheInitialized, setCofheInitialized] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [toasts, setToasts] = useState<Toast[]>([]);

    // Form inputs
    const [targetAllocToken0, setTargetAllocToken0] = useState('5000'); // 50%
    const [targetAllocToken1, setTargetAllocToken1] = useState('5000'); // 50%
    const [positionToken0, setPositionToken0] = useState('0.05');
    const [positionToken1, setPositionToken1] = useState('0.05');
    const [orderAmount, setOrderAmount] = useState('0.01');
    const [isBuyOrder, setIsBuyOrder] = useState(true);
    const [swapAmount, setSwapAmount] = useState('0.01');
    const [zeroForOne, setZeroForOne] = useState(true);
    const [finalizeOrderId, setFinalizeOrderId] = useState('0');
    const [unsealedAmount, setUnsealedAmount] = useState<string | null>(null);

    useEffect(() => {
        setMounted(true);
    }, []);

    // --- Toast Notifications ---
    const showToast = useCallback((type: Toast['type'], title: string, message: string) => {
        const id = Date.now();
        setToasts(prev => [...prev, { id, type, title, message }]);
        setTimeout(() => {
            setToasts(prev => prev.filter(t => t.id !== id));
        }, 5000);
    }, []);

    const dismissToast = useCallback((id: number) => {
        setToasts(prev => prev.filter(t => t.id !== id));
    }, []);

    const addLog = (type: LogEntry['type'], message: string) => {
        setLogs(prev => [...prev, { type, message, timestamp: new Date() }]);
    };

    // Initialize @cofhe/sdk
    useEffect(() => {
        const initCofhe = async () => {
            if (isConnected && address && walletClient && publicClient && !cofheInitialized && !cofheGlobalClient) {
                try {
                    addLog('info', 'Initializing @cofhe/sdk client...');
                    const config = createCofheConfig({ 
                        environment: 'web',
                        supportedChains: [sepolia]
                    });
                    
                    const client = createCofheClient(config);
                    await client.connect(publicClient as any, walletClient as any);
                    
                    cofheGlobalClient = client;
                    setCofheInitialized(true);
                    addLog('success', '✓ @cofhe/sdk initialized successfully');
                    showToast('success', 'SDK Ready', 'CoFHE SDK is connected');
                } catch (error: any) {
                    addLog('error', `Failed to initialize SDK: ${error.message}`);
                    showToast('error', 'SDK Init Failed', error.message);
                }
            }
        };
        initCofhe();
    }, [isConnected, address, walletClient, publicClient, cofheInitialized]);

    // Load token balances
    useEffect(() => {
        if (isConnected && address && publicClient) {
            const loadBalances = async () => {
                try {
                    const [bal0, bal1] = await Promise.all([
                        publicClient.readContract({
                            address: CONFIG.TOKEN0_ADDRESS,
                            abi: ERC20_ABI,
                            functionName: 'balanceOf',
                            args: [address],
                        }),
                        publicClient.readContract({
                            address: CONFIG.TOKEN1_ADDRESS,
                            abi: ERC20_ABI,
                            functionName: 'balanceOf',
                            args: [address],
                        }),
                    ]);

                    setToken0Balance(formatEther(bal0 as bigint));
                    setToken1Balance(formatEther(bal1 as bigint));
                } catch (error: any) {
                    // Ignore silently
                }
            };
            loadBalances();
        }
    }, [isConnected, address, publicClient]);

    const getPoolKey = () => {
        const addr0 = BigInt(CONFIG.TOKEN0_ADDRESS);
        const addr1 = BigInt(CONFIG.TOKEN1_ADDRESS);
        const [c0, c1] = addr0 < addr1
            ? [CONFIG.TOKEN0_ADDRESS, CONFIG.TOKEN1_ADDRESS]
            : [CONFIG.TOKEN1_ADDRESS, CONFIG.TOKEN0_ADDRESS];
            
        return {
            currency0: c0 as Address,
            currency1: c1 as Address,
            fee: CONFIG.LP_FEE,
            tickSpacing: CONFIG.TICK_SPACING,
            hooks: CONFIG.HOOK_ADDRESS as Address,
        };
    };

    const handleGenerateStrategyId = () => {
        if (!address) return;
        const id = keccak256(
            encodeAbiParameters(parseAbiParameters('address, uint256'), [address, BigInt(Date.now())])
        );
        setStrategyId(id);
        addLog('info', `Generated strategy ID: ${id}`);
        showToast('info', 'Strategy ID', 'New strategy ID generated');
    };

    const handleCreateStrategy = async () => {
        if (!walletClient || !strategyId || strategyId === '0x' || !cofheInitialized) {
            addLog('error', 'Ready FHE, connect wallet, and define a strategy ID');
            return;
        }

        setLoading(true);
        setLoadingStep('Creating strategy...');
        try {
            addLog('info', 'Creating strategy with encrypted parameters...');
            const [executionWindow, spreadBlocks, maxSlippage] = await cofheGlobalClient.encryptInputs([
                Encryptable.uint128(100n), // 100 blocks
                Encryptable.uint128(10n),  // 10 blocks
                Encryptable.uint128(500n), // 5% slippage
            ]).execute();

            addLog('info', 'Submitting createStrategy transaction...');
            const hash = await walletClient.writeContract({
                address: CONFIG.HOOK_ADDRESS,
                abi: HOOK_ABI,
                functionName: 'createStrategy',
                args: [
                    strategyId,
                    10n, // rebalanceFrequency
                    executionWindow,
                    spreadBlocks,
                    maxSlippage,
                ],
            });

            addLog('info', `Transaction submitted: ${hash}`);
            if (publicClient) {
                await publicClient.waitForTransactionReceipt({ hash });
                addLog('success', '✓ Strategy created successfully!');
                showToast('success', 'Strategy Created', 'Parameters are encrypted on-chain');
            }
        } catch (error: any) {
            if (error.message?.includes('already exists')) {
                addLog('warning', 'Strategy already exists, ignored error.');
                showToast('info', 'Strategy Exists', 'It was already created');
            } else {
                addLog('error', `Failed to create strategy: ${error.message}`);
                showToast('error', 'Strategy Failed', error.message?.slice(0, 80));
            }
        } finally {
            setLoading(false);
            setLoadingStep('');
        }
    };

    const handleSetAllocation = async (tokenNum: 0 | 1) => {
        if (!walletClient || !strategyId || strategyId === '0x' || !cofheInitialized) return;
        const tokenAddr = tokenNum === 0 ? CONFIG.TOKEN0_ADDRESS : CONFIG.TOKEN1_ADDRESS;
        const targetBps = BigInt(tokenNum === 0 ? targetAllocToken0 : targetAllocToken1);

        setLoading(true);
        setLoadingStep(`Setting Token${tokenNum} allocation...`);
        try {
            addLog('info', `Encrypting allocation parameters for Token${tokenNum}... Target: ${targetBps}`);
            const [targetPercentage, minThreshold, maxThreshold] = await cofheGlobalClient.encryptInputs([
                Encryptable.uint128(targetBps),
                Encryptable.uint128(100n),  // 1% min threshold
                Encryptable.uint128(1000n), // 10% max threshold
            ]).execute();

            const hash = await walletClient.writeContract({
                address: CONFIG.HOOK_ADDRESS,
                abi: HOOK_ABI,
                functionName: 'setTargetAllocation',
                args: [strategyId, tokenAddr, targetPercentage, minThreshold, maxThreshold],
            });

            addLog('info', `Transaction: ${hash}`);
            if (publicClient) {
                await publicClient.waitForTransactionReceipt({ hash });
                addLog('success', `✓ Token${tokenNum} allocation set successfully!`);
                showToast('success', 'Allocation Set', `Token${tokenNum} target updated`);
            }
        } catch (error: any) {
            addLog('error', `Failed to set Token${tokenNum} allocation: ${error.message}`);
            showToast('error', 'Allocation Failed', error.message?.slice(0, 80));
        } finally {
            setLoading(false);
            setLoadingStep('');
        }
    };

    const handleSetPosition = async (tokenNum: 0 | 1) => {
        if (!walletClient || !strategyId || strategyId === '0x' || !cofheInitialized) return;
        const tokenAddr = tokenNum === 0 ? CONFIG.TOKEN0_ADDRESS : CONFIG.TOKEN1_ADDRESS;
        const posValue = parseEther(tokenNum === 0 ? positionToken0 : positionToken1);

        setLoading(true);
        setLoadingStep(`Setting Token${tokenNum} position...`);
        try {
            addLog('info', `Encrypting position for Token${tokenNum}... Value: ${formatEther(posValue)}`);
            const [position] = await cofheGlobalClient.encryptInputs([
                Encryptable.uint128(posValue)
            ]).execute();

            const hash = await walletClient.writeContract({
                address: CONFIG.HOOK_ADDRESS,
                abi: HOOK_ABI,
                functionName: 'setEncryptedPosition',
                args: [strategyId, tokenAddr, position],
            });

            addLog('info', `Transaction: ${hash}`);
            if (publicClient) {
                await publicClient.waitForTransactionReceipt({ hash });
                addLog('success', `✓ Token${tokenNum} position set!`);
                showToast('success', 'Position Set', `Token${tokenNum} position encrypted`);
            }
        } catch (error: any) {
            addLog('error', `Failed to set Token${tokenNum} position: ${error.message}`);
            showToast('error', 'Position Failed', error.message?.slice(0, 80));
        } finally {
            setLoading(false);
            setLoadingStep('');
        }
    };

    const approveToken = async (tokenAddress: string, amount: bigint) => {
        if (!publicClient || !walletClient || !address) return;
        const allowance = await publicClient.readContract({
            address: tokenAddress as Address,
            abi: ERC20_ABI,
            functionName: 'allowance',
            args: [address, CONFIG.HOOK_ADDRESS],
        }) as bigint;

        if (allowance < amount) {
            addLog('info', `Approving token for Hook...`);
            const hash = await walletClient.writeContract({
                address: tokenAddress as Address,
                abi: ERC20_ABI,
                functionName: 'approve',
                args: [CONFIG.HOOK_ADDRESS, parseEther("10000")],
            });
            await publicClient.waitForTransactionReceipt({ hash });
            addLog('success', `✓ Token approved`);
        }
    };

    const approveTokenForRouter = async (tokenAddress: string, amount: bigint) => {
        if (!publicClient || !walletClient || !address) return;
        const allowance = await publicClient.readContract({
            address: tokenAddress as Address,
            abi: ERC20_ABI,
            functionName: 'allowance',
            args: [address, CONFIG.SWAP_ROUTER_ADDRESS],
        }) as bigint;

        if (allowance < amount) {
            addLog('info', `Approving token for Router...`);
            const hash = await walletClient.writeContract({
                address: tokenAddress as Address,
                abi: ERC20_ABI,
                functionName: 'approve',
                args: [CONFIG.SWAP_ROUTER_ADDRESS, parseEther("10000")],
            });
            await publicClient.waitForTransactionReceipt({ hash });
            addLog('success', `✓ Token approved for Router`);
        }
    };

    const handlePlaceDarkOrder = async () => {
        if (!walletClient || !cofheInitialized || !publicClient) return;

        setLoading(true);
        setLoadingStep('Placing Dark Order...');
        try {
            const amountBN = parseEther(orderAmount);
            const depositToken = isBuyOrder ? CONFIG.TOKEN1_ADDRESS : CONFIG.TOKEN0_ADDRESS;
            
            await approveToken(depositToken, amountBN);

            addLog('info', `Encrypting Dark Order Amount: ${orderAmount}...`);
            const [encAmount] = await cofheGlobalClient.encryptInputs([
                Encryptable.uint128(amountBN)
            ]).execute();

            addLog('info', `Submitting placeDarkOrder via Hook...`);
            const hash = await walletClient.writeContract({
                address: CONFIG.HOOK_ADDRESS,
                abi: HOOK_ABI,
                functionName: 'placeDarkOrder',
                args: [getPoolKey(), amountBN, encAmount, isBuyOrder],
                gas: 2000000n
            });

            addLog('info', `Transaction submitted: ${hash}`);
            const receipt = await publicClient.waitForTransactionReceipt({ hash, timeout: 120_000 });
            
            let foundEvent = false;
            for (const log of receipt.logs) {
                if (log.address.toLowerCase() === CONFIG.HOOK_ADDRESS.toLowerCase()) {
                    try {
                        const parsed = (HOOK_ABI as any).find((x: any) => x.name === 'DarkOrderPlaced'); 
                        // Simplified finding: it works since viem automatically parses logs with getLogs
                    } catch(e) {}
                }
            }

            // Let's use getLogs to parse it properly
            const logs = await publicClient.getLogs({
                address: CONFIG.HOOK_ADDRESS,
                event: parseAbi(['event DarkOrderPlaced(bytes32 indexed poolId, uint256 indexed orderId, address indexed owner, bool isBuy)'])[0],
                args: { owner: address },
                fromBlock: receipt.blockNumber,
                toBlock: receipt.blockNumber
            });

            if (logs.length > 0) {
                const newOrderId = logs[0].args.orderId?.toString();
                addLog('success', `✓ Dark Order placed! Order ID: ${newOrderId}`);
                showToast('success', 'Order Placed', `Dark order #${newOrderId} encrypted and placed`);
                if (newOrderId) setFinalizeOrderId(newOrderId);
            } else {
                addLog('warning', `✓ Transaction confirmed, but failed to parse Order ID event.`);
                showToast('warning', 'Order Placed', `Placed, but failed to extract ID.`);
            }

        } catch (error: any) {
            addLog('error', `Failed to place dark order: ${error.message}`);
            showToast('error', 'Order Failed', error.message?.slice(0, 80));
        } finally {
            setLoading(false);
            setLoadingStep('');
        }
    };

    const handleExecuteSwap = async () => {
        if (!walletClient || !publicClient || !address) return;

        setLoading(true);
        setLoadingStep('Executing Swap...');
        try {
            const amountBN = parseEther(swapAmount);
            const tokenInStr = zeroForOne ? CONFIG.TOKEN0_ADDRESS : CONFIG.TOKEN1_ADDRESS;
            await approveTokenForRouter(tokenInStr, amountBN);

            addLog('info', `Swapping ${swapAmount} (zeroForOne: ${zeroForOne})`);
            const sqrtPriceLimitX96 = zeroForOne ? 4295128740n : 1461446703485210103287273052203988822378723970341n;
            const hookDataToPass = strategyId === '0x' ? '0x' : encodeAbiParameters(parseAbiParameters('bytes32'), [strategyId]);

            const hash = await walletClient.writeContract({
                address: CONFIG.SWAP_ROUTER_ADDRESS,
                abi: SWAP_ROUTER_ABI,
                functionName: 'swap',
                args: [
                    getPoolKey(),
                    {
                        zeroForOne,
                        amountSpecified: -amountBN,
                        sqrtPriceLimitX96
                    },
                    hookDataToPass as `0x${string}`
                ],
                gas: 5000000n
            });

            addLog('info', `Transaction submitted: ${hash}`);
            const receipt = await publicClient.waitForTransactionReceipt({ hash, timeout: 120_000 });
            addLog('success', `✓ Swap confirmed! Gas used: ${receipt.gasUsed.toString()}`);
            showToast('success', 'Swap Executed', 'Swap processed by PoolManager');

            // Find matching event
            const logs = await publicClient.getLogs({
                address: CONFIG.HOOK_ADDRESS,
                event: parseAbi(['event DarkOrderFilled(bytes32 indexed poolId, uint256 indexed orderId, uint128 matchedAmount)'])[0],
                fromBlock: receipt.blockNumber,
                toBlock: receipt.blockNumber
            });

            if (logs.length > 0) {
                for (const matching of logs) {
                    addLog('success', `✨ MATCH! Order #${matching.args.orderId} filled with ${formatEther(matching.args.matchedAmount as bigint)} tokens`);
                }
            } else {
                addLog('info', `No Active Dark Orders matched the swap.`);
            }

        } catch (error: any) {
            addLog('error', `Failed to execute swap: ${error.message}`);
            showToast('error', 'Swap Failed', error.message?.slice(0, 80));
        } finally {
            setLoading(false);
            setLoadingStep('');
        }
    };

    const handleFinalizeOrder = async () => {
        if (!walletClient || !publicClient || !address) return;

        setLoading(true);
        setLoadingStep(`Finalizing Order #${finalizeOrderId}...`);
        try {
            const orderIdBN = BigInt(finalizeOrderId);
            const orderData = await publicClient.readContract({
                address: CONFIG.HOOK_ADDRESS,
                abi: HOOK_ABI,
                functionName: 'getDarkOrder',
                args: [getPoolKey(), orderIdBN]
            }) as any;

            addLog('info', `Order ${finalizeOrderId} Status: Built-in Active=${orderData[5]}, Filled=${formatEther(orderData[3])}`);
            
            if (orderData[3] > 0n) {
                addLog('info', `Claiming ${formatEther(orderData[3])} matched tokens...`);
                const hash = await walletClient.writeContract({
                    address: CONFIG.HOOK_ADDRESS,
                    abi: HOOK_ABI,
                    functionName: 'claimDarkOrder',
                    args: [getPoolKey(), orderIdBN]
                });
                await publicClient.waitForTransactionReceipt({ hash });
                addLog('success', `✓ Claimed matched tokens successfully!`);
                showToast('success', 'Claimed', 'Matched tokens claimed to wallet');
            } else {
                addLog('info', `Order empty. Cancelling inactive/unfilled order...`);
                const hash = await walletClient.writeContract({
                    address: CONFIG.HOOK_ADDRESS,
                    abi: HOOK_ABI,
                    functionName: 'cancelDarkOrder',
                    args: [getPoolKey(), orderIdBN]
                });
                await publicClient.waitForTransactionReceipt({ hash });
                addLog('success', `✓ Order Cancelled!`);
                showToast('info', 'Cancelled', 'Unfilled order was cancelled');
            }

        } catch (error: any) {
            addLog('error', `Finalization failed: ${error.message}`);
            showToast('error', 'Finalize Failed', error.message?.slice(0, 80));
        } finally {
            setLoading(false);
            setLoadingStep('');
        }
    };

    const handleReadUnsealPosition = async (tokenNum: 0 | 1) => {
        if (!publicClient || !walletClient || !address || !cofheInitialized || strategyId === '0x') return;
        setLoading(true);
        setLoadingStep('Unsealing position...');
        try {
            const tokenAddr = tokenNum === 0 ? CONFIG.TOKEN0_ADDRESS : CONFIG.TOKEN1_ADDRESS;
            const ctHash = await publicClient.readContract({
                address: CONFIG.HOOK_ADDRESS,
                abi: HOOK_ABI,
                functionName: 'getEncryptedPosition',
                args: [strategyId, tokenAddr]
            }) as bigint;

            if (ctHash === 0n) {
                addLog('warning', `No encrypted position found for Token${tokenNum}`);
                setLoading(false);
                return;
            }

            addLog('info', `Creating FHE permit manually...`);
            const permit = await PermitUtils.createSelfAndSign(
                { issuer: address, name: "Ephemeral Position Permit" },
                publicClient as any,
                walletClient as any
            );

            addLog('info', `Decrypting position...`);
            const unsealed = await cofheGlobalClient.decryptForView(ctHash, FheTypes.Uint128)
                .withPermit(permit)
                .execute();

            addLog('success', `✓ Position Unsealed: ${formatEther(unsealed)} tokens`);
            showToast('success', 'Unsealed!', `Position unsealed to ${formatEther(unsealed)}`);
            setUnsealedAmount(formatEther(unsealed));
        } catch (error: any) {
             addLog('error', `Decryption failed: ${error.message}`);
             showToast('error', 'Unseal Failed', error.message?.slice(0, 80));
        } finally {
            setLoading(false);
            setLoadingStep('');
        }
    }

    if (!mounted) return null;

    return (
        <div className="min-h-screen bg-background-dark text-white pt-20">
            {/* Toast Notifications */}
            <div className="fixed top-20 right-4 z-[100] space-y-3 max-w-sm">
                {toasts.map(toast => (
                    <div
                        key={toast.id}
                        className={`rounded-lg p-4 shadow-xl border backdrop-blur-lg animate-slide-in cursor-pointer transition-all hover:scale-[1.02] ${toast.type === 'success' ? 'bg-green-500/20 border-green-500/50 text-green-300' :
                            toast.type === 'error' ? 'bg-red-500/20 border-red-500/50 text-red-300' :
                                toast.type === 'warning' ? 'bg-yellow-500/20 border-yellow-500/50 text-yellow-300' :
                                    'bg-blue-500/20 border-blue-500/50 text-blue-300'
                            }`}
                        onClick={() => dismissToast(toast.id)}
                    >
                        <p className="font-semibold text-sm">{toast.title}</p>
                        <p className="text-xs mt-1 opacity-80">{toast.message}</p>
                    </div>
                ))}
            </div>

            <div className="container mx-auto px-4 py-8 max-w-6xl">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent-uniswap bg-clip-text text-transparent">
                            Uniswap v4 FHE Dark Pool
                        </h1>
                        <p className="text-slate-400 mt-2">SDK Migration Demo</p>
                    </div>
                    <ConnectButton />
                </div>

                {isConnected && chain?.id !== 11155111 && (
                    <div className="bg-yellow-500/10 border border-yellow-500/50 rounded-lg p-4 mb-6">
                        <p className="text-yellow-400 font-semibold">⚠️ Wrong Network</p>
                        <p className="text-yellow-300 text-sm">Please switch to Sepolia testnet</p>
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Left Column Controls */}
                    <div className="space-y-6">

                        {/* Config */}
                        <div className="bg-surface-dark/50 p-6 rounded-xl border border-white/10">
                             <h2 className="text-2xl font-bold mb-4 text-primary">Configuration</h2>
                             <p className="text-sm font-mono text-slate-400 break-all mb-1">Hook: {CONFIG.HOOK_ADDRESS}</p>
                             <p className="text-sm font-mono text-slate-400 break-all mb-3">Router: {CONFIG.SWAP_ROUTER_ADDRESS}</p>
                             
                             <p className="text-sm">Token0 Bal: {parseFloat(token0Balance).toFixed(4)} <span className="text-slate-500">[{CONFIG.TOKEN0_ADDRESS.slice(0,6)}...]</span></p>
                             <p className="text-sm">Token1 Bal: {parseFloat(token1Balance).toFixed(4)} <span className="text-slate-500">[{CONFIG.TOKEN1_ADDRESS.slice(0,6)}...]</span></p>

                             <p className="text-xs text-slate-400 mt-4">
                                FHE Status: <span className={cofheInitialized ? 'text-green-400' : 'text-yellow-400'}>
                                    {cofheInitialized ? '✓ Initialized' : '⏳ Initializing...'}
                                </span>
                            </p>
                        </div>

                        {/* Strategy Box */}
                        <div className="bg-surface-dark/50 p-6 rounded-xl border border-white/10">
                            <h2 className="text-2xl font-bold mb-4 text-primary">1. Strategy Management</h2>
                            <div className="flex gap-2 mb-4">
                                <input type="text" value={strategyId} onChange={e => setStrategyId(e.target.value as `0x${string}`)} className="flex-1 bg-slate-900/50 border border-slate-700 rounded px-4 py-2 font-mono text-xs" />
                                <button onClick={handleGenerateStrategyId} className="bg-primary/20 hover:bg-primary/40 px-4 py-2 rounded font-semibold text-primary transition-colors text-sm">Gen ID</button>
                            </div>
                            <button onClick={handleCreateStrategy} disabled={loading} className="w-full bg-primary hover:opacity-90 px-4 py-2 rounded font-semibold mb-4 text-white">
                                Create FHE Strategy
                            </button>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-xs text-slate-400">Token0 Target Alloc (Bps)</label>
                                    <input type="text" value={targetAllocToken0} onChange={e => setTargetAllocToken0(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-sm mt-1 mb-2" />
                                    <button onClick={() => handleSetAllocation(0)} disabled={loading} className="w-full bg-slate-800 hover:bg-slate-700 rounded p-2 text-xs">Set T0 Alloc</button>
                                </div>
                                <div>
                                    <label className="text-xs text-slate-400">Token1 Target Alloc (Bps)</label>
                                    <input type="text" value={targetAllocToken1} onChange={e => setTargetAllocToken1(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-sm mt-1 mb-2" />
                                    <button onClick={() => handleSetAllocation(1)} disabled={loading} className="w-full bg-slate-800 hover:bg-slate-700 rounded p-2 text-xs">Set T1 Alloc</button>
                                </div>
                                <div>
                                    <label className="text-xs text-slate-400">Token0 Enc Position (Tokens)</label>
                                    <input type="text" value={positionToken0} onChange={e => setPositionToken0(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-sm mt-1 mb-2" />
                                    <button onClick={() => handleSetPosition(0)} disabled={loading} className="w-full bg-slate-800 hover:bg-slate-700 rounded p-2 text-xs">Set T0 Position</button>
                                </div>
                                <div>
                                    <label className="text-xs text-slate-400">Token1 Enc Position (Tokens)</label>
                                    <input type="text" value={positionToken1} onChange={e => setPositionToken1(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-sm mt-1 mb-2" />
                                    <button onClick={() => handleSetPosition(1)} disabled={loading} className="w-full bg-slate-800 hover:bg-slate-700 rounded p-2 text-xs">Set T1 Position</button>
                                </div>
                            </div>
                        </div>

                        <div className="bg-surface-dark/50 p-6 rounded-xl border border-white/10">
                            <h2 className="text-2xl font-bold mb-4 text-primary">Unseal Position</h2>
                             <div className="grid grid-cols-2 gap-4">
                                <button onClick={() => handleReadUnsealPosition(0)} disabled={loading} className="bg-purple-600 hover:bg-purple-500 rounded p-2 text-sm text-white">Unseal T0</button>
                                <button onClick={() => handleReadUnsealPosition(1)} disabled={loading} className="bg-purple-600 hover:bg-purple-500 rounded p-2 text-sm text-white">Unseal T1</button>
                             </div>
                             {unsealedAmount && <p className="mt-3 text-sm text-green-300">Decrypted Position: {unsealedAmount} tokens</p>}
                        </div>

                    </div>

                    {/* Right Column Controls */}
                    <div className="space-y-6">

                        {/* Dark Orders Box */}
                        <div className="bg-surface-dark/50 p-6 rounded-xl border border-emerald-500/20">
                            <h2 className="text-2xl font-bold mb-4 text-emerald-400">2. Place FHE Dark Order</h2>
                            <div className="flex gap-4 mb-4">
                                <div className="flex-1">
                                    <label className="text-xs text-slate-400">Amount (Tokens)</label>
                                    <input type="text" value={orderAmount} onChange={e => setOrderAmount(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-sm mt-1" />
                                </div>
                                <div>
                                    <label className="block text-xs text-slate-400">Direction</label>
                                    <select value={isBuyOrder ? 'buy' : 'sell'} onChange={(e) => setIsBuyOrder(e.target.value === 'buy')} className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-sm mt-1">
                                        <option value="buy">BUY (Deposit T1)</option>
                                        <option value="sell">SELL (Deposit T0)</option>
                                    </select>
                                </div>
                            </div>
                            <button onClick={handlePlaceDarkOrder} disabled={loading} className="w-full bg-emerald-500 hover:bg-emerald-400 px-4 py-2 rounded text-white font-bold transition-colors">
                                Encrypt & Place Dark Order
                            </button>
                        </div>

                        {/* Execute Swap Box */}
                        <div className="bg-surface-dark/50 p-6 rounded-xl border border-accent-uniswap/30">
                            <h2 className="text-2xl font-bold mb-4 text-accent-uniswap">3. Execute Swap</h2>
                            <div className="flex gap-4 mb-4">
                                <div className="flex-1">
                                    <label className="text-xs text-slate-400">Amount Specified</label>
                                    <input type="text" value={swapAmount} onChange={e => setSwapAmount(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-sm mt-1" />
                                </div>
                                <div className="flex-1">
                                    <label className="block text-xs text-slate-400">Direction (0 For 1)</label>
                                    <select value={zeroForOne ? 'true' : 'false'} onChange={(e) => setZeroForOne(e.target.value === 'true')} className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-sm mt-1">
                                        <option value="true">True (Sell T0 for T1)</option>
                                        <option value="false">False (Sell T1 for T0)</option>
                                    </select>
                                </div>
                            </div>
                            <button onClick={handleExecuteSwap} disabled={loading} className="w-full bg-accent-uniswap hover:bg-pink-500 px-4 py-2 rounded text-white font-bold transition-colors">
                                Swap (Matches Counterparty Dark Orders)
                            </button>
                        </div>

                        {/* Finalization Box */}
                        <div className="bg-surface-dark/50 p-6 rounded-xl border border-white/10">
                            <h2 className="text-2xl font-bold mb-4 text-primary">4. Finalization</h2>
                            <div className="flex gap-4 mb-4">
                                <div className="flex-1">
                                    <label className="text-xs text-slate-400">Finalize Order ID</label>
                                    <input type="text" value={finalizeOrderId} onChange={e => setFinalizeOrderId(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-sm mt-1" />
                                </div>
                            </div>
                            <button onClick={handleFinalizeOrder} disabled={loading} className="w-full bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded text-white transition-colors">
                                Claim or Cancel Order
                            </button>
                        </div>

                    </div>
                </div>

                {/* Loading State Overlay */}
                {loading && (
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
                        <div className="bg-surface-dark p-8 rounded-xl border border-white/10 flex flex-col items-center max-w-sm text-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
                            <h3 className="text-xl font-bold text-white mb-2">{loadingStep}</h3>
                            <p className="text-sm text-slate-400">Please confirm transactions in your wallet and wait for block confirmation.</p>
                        </div>
                    </div>
                )}

                {/* Logs Terminal */}
                <div className="mt-8 bg-[#0D1117] rounded-xl border border-white/10 overflow-hidden shadow-2xl">
                    <div className="flex items-center justify-between px-4 py-2 border-b border-white/10 bg-[#161B22]">
                        <div className="flex flex-col">
                           <span className="text-sm font-semibold text-slate-200">Execution Logs</span>
                        </div>
                        <button onClick={() => setLogs([])} className="text-xs text-slate-400 hover:text-white transition-colors">
                            Clear Logs
                        </button>
                    </div>
                    <div className="p-4 h-[300px] overflow-y-auto font-mono text-xs space-y-2 relative" id="logs-container">
                        {logs.map((log, i) => (
                            <div key={i} className={`
                                ${log.type === 'error' ? 'text-red-400' : ''}
                                ${log.type === 'success' ? 'text-green-400' : ''}
                                ${log.type === 'warning' ? 'text-yellow-400' : ''}
                                ${log.type === 'info' ? 'text-slate-300' : ''}
                            `}>
                                <span className="opacity-50 mr-2">[{log.timestamp.toLocaleTimeString()}]</span>
                                {log.message}
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}
