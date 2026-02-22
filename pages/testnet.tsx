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
    encodePacked,
    type Address
} from 'viem';

// Contract addresses configuration
const CONFIG = {
    HOOK_ADDRESS: "0x797283907437277Ff05FF929c871f7517BdecaC0" as const,
    POOL_MANAGER_ADDRESS: "0xE03A1074c86CFeDd5C142C4F04F1a1536e203543" as const,
    SWAP_ROUTER_ADDRESS: "0xf13D190e9117920c703d79B5F33732e10049b115" as const,
    TOKEN0_ADDRESS: "0x2794a0b7187BFCd81D2b6d05E8a6e6cAE3F97fFa" as const, // MockTokenA
    TOKEN1_ADDRESS: "0xEa20820719c5Ae04Bce9A098E209f4d8C60DAF06" as const, // MockTokenB
    LP_FEE: 3000,
    TICK_SPACING: 60,
};

const HOOK_ABI = parseAbi([
    "struct EncryptedValue { uint256 ctHash; uint8 securityZone; uint8 utype; bytes signature; }",
    "struct Strategy { bytes32 strategyId; address owner; bool isActive; uint256 lastRebalanceBlock; uint256 rebalanceFrequency; EncryptedValue executionWindow; EncryptedValue spreadBlocks; uint256 priorityFee; EncryptedValue maxSlippage; }",
    "function createStrategy(bytes32 strategyId, uint256 rebalanceFrequency, EncryptedValue executionWindow, EncryptedValue spreadBlocks, EncryptedValue maxSlippage) external returns (bool)",
    "function setTargetAllocation(bytes32 strategyId, address currency, EncryptedValue targetPercentage, EncryptedValue minThreshold, EncryptedValue maxThreshold) external",
    "function setEncryptedPosition(bytes32 strategyId, address currency, EncryptedValue position) external",
    "function enableCrossPoolCoordination(bytes32 strategyId, bytes32[] pools) external",
    "function getStrategy(bytes32 strategyId) external view returns (Strategy)",
    "function poolStrategies(bytes32 poolId) external view returns (bytes32[])",
    "event RebalancingExecuted(bytes32 indexed strategyId, uint256 blockNumber)",
    "event FHEOperationFailed(bytes32 indexed strategyId, string operation, string reason)",
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
            { name: 'amountSpecified', type: 'int256' },
            { name: 'amountLimit', type: 'uint256' },
            { name: 'zeroForOne', type: 'bool' },
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
            { name: 'hookData', type: 'bytes' },
            { name: 'receiver', type: 'address' },
            { name: 'deadline', type: 'uint256' },
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

export default function Testnet() {
    const { address, isConnected, chain } = useAccount();
    const publicClient = usePublicClient();
    const { data: walletClient } = useWalletClient();

    const [logs, setLogs] = useState<LogEntry[]>([]);
    const [loading, setLoading] = useState(false);
    const [loadingStep, setLoadingStep] = useState('');
    const [strategyId, _setStrategyId] = useState<`0x${string}`>('0x');
    const strategyIdRef = useRef<`0x${string}`>('0x');
    const setStrategyId = (id: `0x${string}`) => { strategyIdRef.current = id; _setStrategyId(id); };
    const [token0Balance, setToken0Balance] = useState('0');
    const [token1Balance, setToken1Balance] = useState('0');
    const [strategyExists, setStrategyExists] = useState(false);
    const [cofheInitialized, setCofheInitialized] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [swapAmount, setSwapAmount] = useState('0.1');
    const [zeroForOne, setZeroForOne] = useState(true);
    const [fheConfirmed, setFheConfirmed] = useState(false);
    const [lastSwapTx, setLastSwapTx] = useState('');
    const [toasts, setToasts] = useState<Toast[]>([]);
    const [runAllProgress, setRunAllProgress] = useState(0);
    const [isRunningAll, setIsRunningAll] = useState(false);

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

    // Initialize cofhejs when wallet connects
    useEffect(() => {
        if (isConnected && address && walletClient && publicClient && !cofheInitialized) {
            initializeCofhejs();
        }
    }, [isConnected, address, walletClient, publicClient, cofheInitialized]);

    // Load token balances
    useEffect(() => {
        if (isConnected && address && publicClient) {
            loadBalances();
        }
    }, [isConnected, address, publicClient]);

    const initializeCofhejs = async () => {
        try {
            addLog('info', 'Initializing FHE encryption library (cofhejs)...');
            const { cofhejs } = await import('cofhejs/web');

            if (!walletClient) {
                throw new Error('Wallet client not available');
            }

            await cofhejs.initializeWithViem({
                environment: 'TESTNET',
                viemClient: publicClient,
                viemWalletClient: walletClient,
            });

            setCofheInitialized(true);
            addLog('success', '✓ FHE encryption initialized successfully');
            showToast('success', 'FHE Ready', 'Encryption library initialized');
        } catch (error: any) {
            addLog('error', `Failed to initialize cofhejs: ${error.message}`);
            showToast('error', 'FHE Init Failed', error.message);
            addLog('warning', 'Some features may not work without FHE initialization');
        }
    };

    const loadBalances = async () => {
        if (!publicClient || !address) return;
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
            addLog('warning', `Could not load balances: ${error.message}`);
        }
    };

    const generateStrategyId = (): `0x${string}` | undefined => {
        if (!address) return undefined;
        const id = keccak256(
            encodeAbiParameters(parseAbiParameters('address, uint256'), [address, BigInt(Date.now())])
        );
        setStrategyId(id);
        addLog('info', `Generated strategy ID: ${id}`);
        showToast('info', 'Strategy ID', 'New strategy ID generated');
        return id;
    };

    const checkStrategyExists = async () => {
        if (!publicClient || !strategyIdRef.current || strategyIdRef.current === '0x') return;
        setLoading(true);
        try {
            addLog('info', 'Checking if strategy exists...');
            const strategy = await publicClient.readContract({
                address: CONFIG.HOOK_ADDRESS,
                abi: HOOK_ABI,
                functionName: 'getStrategy',
                args: [strategyIdRef.current],
            }) as any;

            if (strategy && strategy.isActive) {
                setStrategyExists(true);
                addLog('success', '✓ Strategy exists and is active');
                showToast('success', 'Strategy Found', 'Strategy is active on-chain');
            } else {
                setStrategyExists(false);
                addLog('info', 'Strategy does not exist yet');
                showToast('info', 'Not Found', 'Strategy needs to be created');
            }
        } catch (error: any) {
            setStrategyExists(false);
            addLog('info', 'Strategy does not exist (will create new one)');
        } finally {
            setLoading(false);
        }
    };

    const createStrategy = async () => {
        if (!walletClient || !strategyIdRef.current || strategyIdRef.current === '0x' || !cofheInitialized) {
            addLog('error', 'Please connect wallet, generate strategy ID, and ensure FHE is initialized');
            return;
        }

        setLoading(true);
        setLoadingStep('Creating strategy...');
        try {
            addLog('info', 'Creating strategy with encrypted parameters...');
            const { cofhejs, Encryptable } = await import('cofhejs/web');

            addLog('info', 'Encrypting execution parameters...');
            const encryptedValues = await cofhejs.encrypt(
                [
                    Encryptable.uint128(100n), // executionWindow: 100 blocks
                    Encryptable.uint128(10n),  // spreadBlocks: 10 blocks
                    Encryptable.uint128(500n), // maxSlippage: 500 basis points (5%)
                ],
                (state: string) => addLog('info', `Encryption state: ${state}`)
            );

            const encryptedArray = Array.isArray(encryptedValues)
                ? encryptedValues
                : encryptedValues?.data || [];

            if (encryptedArray.length < 3) {
                throw new Error('Encryption failed - insufficient encrypted values');
            }

            addLog('success', '✓ Parameters encrypted successfully');
            addLog('info', 'Submitting transaction...');

            const hash = await walletClient.writeContract({
                address: CONFIG.HOOK_ADDRESS,
                abi: HOOK_ABI,
                functionName: 'createStrategy',
                args: [
                    strategyIdRef.current,
                    10n, // rebalanceFrequency
                    encryptedArray[0],
                    encryptedArray[1],
                    encryptedArray[2],
                ],
            });

            addLog('info', `Transaction submitted: ${hash}`);

            if (publicClient) {
                await publicClient.waitForTransactionReceipt({ hash, timeout: 120_000, pollingInterval: 3_000 });
                addLog('success', '✓ Strategy created successfully!');
                setStrategyExists(true);
                showToast('success', 'Strategy Created', 'FHE strategy is now on-chain');
            }
        } catch (error: any) {
            if (error.message?.includes('already exists') || error.message?.includes('Strategy already exists')) {
                addLog('warning', 'Strategy already exists, continuing...');
                setStrategyExists(true);
                showToast('info', 'Strategy Exists', 'Using existing strategy');
            } else {
                addLog('error', `Failed to create strategy: ${error.message}`);
                showToast('error', 'Strategy Failed', error.message?.slice(0, 80));
                throw error;
            }
        } finally {
            setLoading(false);
            setLoadingStep('');
        }
    };

    const setTargetAllocation = async (tokenAddress: string, tokenName: string) => {
        if (!walletClient || !strategyIdRef.current || strategyIdRef.current === '0x' || !cofheInitialized) {
            addLog('error', 'Please ensure wallet is connected and strategy exists');
            return;
        }

        setLoading(true);
        setLoadingStep(`Setting ${tokenName} allocation...`);
        try {
            addLog('info', `Setting target allocation for ${tokenName}...`);
            const { cofhejs, Encryptable } = await import('cofhejs/web');

            addLog('info', 'Encrypting allocation parameters...');
            const encryptedValues = await cofhejs.encrypt(
                [
                    Encryptable.uint128(5000n), // 50% target
                    Encryptable.uint128(100n),  // 1% min threshold
                    Encryptable.uint128(1000n), // 10% max threshold
                ],
                (state: string) => addLog('info', `Encryption state: ${state}`)
            );

            const encryptedArray = Array.isArray(encryptedValues)
                ? encryptedValues
                : encryptedValues?.data || [];

            if (encryptedArray.length < 3) {
                throw new Error('Encryption failed');
            }

            addLog('success', '✓ Parameters encrypted');

            const hash = await walletClient.writeContract({
                address: CONFIG.HOOK_ADDRESS,
                abi: HOOK_ABI,
                functionName: 'setTargetAllocation',
                args: [
                    strategyIdRef.current,
                    tokenAddress as Address,
                    encryptedArray[0],
                    encryptedArray[1],
                    encryptedArray[2],
                ],
            });

            addLog('info', `Transaction: ${hash}`);
            if (publicClient) {
                await publicClient.waitForTransactionReceipt({ hash, timeout: 120_000, pollingInterval: 3_000 });
                addLog('success', `✓ ${tokenName} allocation set successfully!`);
                showToast('success', 'Allocation Set', `${tokenName} target allocation configured`);
            }
        } catch (error: any) {
            addLog('error', `Failed to set ${tokenName} allocation: ${error.message}`);
            showToast('error', 'Allocation Failed', error.message?.slice(0, 80));
            throw error;
        } finally {
            setLoading(false);
            setLoadingStep('');
        }
    };

    const setEncryptedPosition = async (tokenAddress: string, tokenName: string, amount: string) => {
        if (!walletClient || !strategyIdRef.current || strategyIdRef.current === '0x' || !cofheInitialized) {
            addLog('error', 'Wallet, strategy, and FHE must be ready');
            return;
        }

        setLoading(true);
        setLoadingStep(`Setting ${tokenName} position...`);
        try {
            addLog('info', `Setting encrypted position for ${tokenName}...`);
            const { cofhejs, Encryptable } = await import('cofhejs/web');

            const positionValue = parseEther(amount);
            addLog('info', `Encrypting position value: ${positionValue.toString()}`);

            const encryptedValues = await cofhejs.encrypt(
                [Encryptable.uint128(positionValue)],
                (state: string) => addLog('info', `Encryption state: ${state}`)
            );

            const encryptedArray = Array.isArray(encryptedValues)
                ? encryptedValues
                : encryptedValues?.data || [];

            if (encryptedArray.length < 1) {
                throw new Error('Encryption failed');
            }

            addLog('success', '✓ Value encrypted');

            const hash = await walletClient.writeContract({
                address: CONFIG.HOOK_ADDRESS,
                abi: HOOK_ABI,
                functionName: 'setEncryptedPosition',
                args: [
                    strategyIdRef.current,
                    tokenAddress as Address,
                    encryptedArray[0],
                ],
            });

            addLog('info', `Transaction: ${hash}`);
            if (publicClient) {
                await publicClient.waitForTransactionReceipt({ hash, timeout: 120_000, pollingInterval: 3_000 });
                addLog('success', `✓ ${tokenName} position set!`);
                showToast('success', 'Position Set', `${tokenName} encrypted position stored`);
            }
        } catch (error: any) {
            addLog('error', `Failed to set ${tokenName} position: ${error.message}`);
            showToast('error', 'Position Failed', error.message?.slice(0, 80));
            throw error;
        } finally {
            setLoading(false);
            setLoadingStep('');
        }
    };

    const registerPool = async () => {
        if (!walletClient || !strategyIdRef.current || strategyIdRef.current === '0x') {
            addLog('error', 'Please ensure wallet is connected and strategy exists');
            return;
        }

        setLoading(true);
        setLoadingStep('Registering pool...');
        try {
            addLog('info', 'Calculating pool ID...');

            // Sort currencies
            const addr0 = BigInt(CONFIG.TOKEN0_ADDRESS);
            const addr1 = BigInt(CONFIG.TOKEN1_ADDRESS);
            const [c0, c1] = addr0 < addr1
                ? [CONFIG.TOKEN0_ADDRESS, CONFIG.TOKEN1_ADDRESS]
                : [CONFIG.TOKEN1_ADDRESS, CONFIG.TOKEN0_ADDRESS];

            // Calculate pool ID
            const encoded = encodeAbiParameters(
                parseAbiParameters('address, address, uint24, int24, address'),
                [c0 as Address, c1 as Address, CONFIG.LP_FEE, CONFIG.TICK_SPACING, CONFIG.HOOK_ADDRESS as Address]
            );
            const poolId = keccak256(encoded);

            addLog('info', `Pool ID: ${poolId}`);
            addLog('info', 'Registering pool with strategy...');

            const hash = await walletClient.writeContract({
                address: CONFIG.HOOK_ADDRESS,
                abi: HOOK_ABI,
                functionName: 'enableCrossPoolCoordination',
                args: [strategyIdRef.current, [poolId]],
            });

            addLog('info', `Transaction: ${hash}`);

            if (publicClient) {
                await publicClient.waitForTransactionReceipt({ hash, timeout: 120_000, pollingInterval: 3_000 });
                addLog('success', '✓ Pool registered successfully!');
                showToast('success', 'Pool Registered', 'Hook will now execute FHE during swaps');
            }
        } catch (error: any) {
            addLog('error', `Failed to register pool: ${error.message}`);
            showToast('error', 'Registration Failed', error.message?.slice(0, 80));
            throw error;
        } finally {
            setLoading(false);
            setLoadingStep('');
        }
    };

    // --- Approve token for swap router ---
    const approveTokenForSwap = async () => {
        if (!walletClient || !publicClient || !address) return;

        setLoading(true);
        setLoadingStep('Approving token...');
        try {
            const tokenAddress = zeroForOne ? CONFIG.TOKEN0_ADDRESS : CONFIG.TOKEN1_ADDRESS;
            const tokenName = zeroForOne ? 'Token0' : 'Token1';

            addLog('info', `Checking ${tokenName} allowance for Swap Router...`);

            const allowance = await publicClient.readContract({
                address: tokenAddress,
                abi: ERC20_ABI,
                functionName: 'allowance',
                args: [address, CONFIG.SWAP_ROUTER_ADDRESS],
            }) as bigint;

            const amount = parseEther(swapAmount);
            if (allowance >= amount) {
                addLog('success', `✓ ${tokenName} already approved`);
                showToast('info', 'Already Approved', `${tokenName} allowance is sufficient`);
                return;
            }

            addLog('info', `Approving ${tokenName} for Swap Router...`);
            const hash = await walletClient.writeContract({
                address: tokenAddress,
                abi: ERC20_ABI,
                functionName: 'approve',
                args: [CONFIG.SWAP_ROUTER_ADDRESS, BigInt("0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff")],
            });

            addLog('info', `Approval tx: ${hash}`);
            await publicClient.waitForTransactionReceipt({ hash, timeout: 120_000, pollingInterval: 3_000 });
            addLog('success', `✓ ${tokenName} approved for Swap Router`);
            showToast('success', 'Token Approved', `${tokenName} ready for swapping`);
        } catch (error: any) {
            addLog('error', `Approval failed: ${error.message}`);
            showToast('error', 'Approval Failed', error.message?.slice(0, 80));
        } finally {
            setLoading(false);
            setLoadingStep('');
        }
    };

    // --- Perform Swap with FHE hookData ---
    const performSwap = async () => {
        if (!walletClient || !publicClient || !address || !strategyIdRef.current || strategyIdRef.current === '0x') {
            addLog('error', 'Wallet, strategy must be ready');
            return;
        }

        setLoading(true);
        setLoadingStep('Executing swap...');
        setFheConfirmed(false);
        try {
            const amount = parseEther(swapAmount);

            // Sort currencies
            const addr0 = BigInt(CONFIG.TOKEN0_ADDRESS);
            const addr1 = BigInt(CONFIG.TOKEN1_ADDRESS);
            const [c0, c1] = addr0 < addr1
                ? [CONFIG.TOKEN0_ADDRESS, CONFIG.TOKEN1_ADDRESS]
                : [CONFIG.TOKEN1_ADDRESS, CONFIG.TOKEN0_ADDRESS];

            const poolKey = {
                currency0: c0 as Address,
                currency1: c1 as Address,
                fee: CONFIG.LP_FEE,
                tickSpacing: CONFIG.TICK_SPACING,
                hooks: CONFIG.HOOK_ADDRESS as Address,
            };

            // Encode strategyId as hookData (32 bytes)
            const hookData = encodeAbiParameters(
                parseAbiParameters('bytes32'),
                [strategyIdRef.current]
            );

            const deadline = BigInt(Math.floor(Date.now() / 1000) + 3600);

            addLog('info', `Swapping ${swapAmount} ${zeroForOne ? 'Token0 → Token1' : 'Token1 → Token0'}`);
            addLog('info', `hookData (strategyId): ${strategyIdRef.current}`);

            const hash = await walletClient.writeContract({
                address: CONFIG.SWAP_ROUTER_ADDRESS,
                abi: SWAP_ROUTER_ABI,
                functionName: 'swap',
                args: [
                    -amount, // amountSpecified (negative = exact input)
                    0n,      // amountLimit (0 = no slippage protection for testing)
                    zeroForOne,
                    poolKey,
                    hookData,
                    address,
                    deadline,
                ],
                gas: 5000000n,
            });

            addLog('info', `Swap tx: ${hash}`);
            setLastSwapTx(hash);

            const receipt = await publicClient.waitForTransactionReceipt({ hash, timeout: 120_000, pollingInterval: 3_000 });
            addLog('success', `✓ Swap confirmed! Gas used: ${receipt.gasUsed.toString()}`);

            // Check for RebalancingExecuted event
            const rebalancingTopic = keccak256(toBytes('RebalancingExecuted(bytes32,uint256)'));
            const fheEvents = receipt.logs.filter(
                log => log.address.toLowerCase() === CONFIG.HOOK_ADDRESS.toLowerCase() &&
                    log.topics[0] === rebalancingTopic
            );

            if (fheEvents.length > 0) {
                setFheConfirmed(true);
                addLog('success', '🔐 FHE operations CONFIRMED via RebalancingExecuted event!');
                showToast('success', 'FHE Confirmed! 🔐', 'Encrypted rebalancing executed on-chain');
            } else {
                addLog('warning', '⚠ Swap succeeded but no RebalancingExecuted event detected');
                showToast('warning', 'Swap Done', 'No FHE event detected — check strategy state');
            }

            // Refresh balances
            await loadBalances();
        } catch (error: any) {
            addLog('error', `Swap failed: ${error.message}`);
            showToast('error', 'Swap Failed', error.message?.slice(0, 100));
        } finally {
            setLoading(false);
            setLoadingStep('');
        }
    };

    // --- Run Full Flow ---
    const runFullFlow = async () => {
        if (!walletClient || !cofheInitialized || !address) {
            showToast('error', 'Not Ready', 'Connect wallet and wait for FHE initialization');
            return;
        }

        setIsRunningAll(true);
        setRunAllProgress(0);

        // Generate strategy ID first (synchronously via ref)
        const newId = generateStrategyId();
        if (!newId) {
            showToast('error', 'Error', 'Could not generate strategy ID');
            setIsRunningAll(false);
            return;
        }

        // Wait for React state to settle
        await new Promise(r => setTimeout(r, 500));

        const steps = [
            { label: 'Creating strategy', fn: createStrategy },
            { label: 'Setting Token0 allocation', fn: () => setTargetAllocation(CONFIG.TOKEN0_ADDRESS, 'Token0') },
            { label: 'Setting Token1 allocation', fn: () => setTargetAllocation(CONFIG.TOKEN1_ADDRESS, 'Token1') },
            { label: 'Setting Token0 position', fn: () => setEncryptedPosition(CONFIG.TOKEN0_ADDRESS, 'Token0', '1000000') },
            { label: 'Setting Token1 position', fn: () => setEncryptedPosition(CONFIG.TOKEN1_ADDRESS, 'Token1', '1000000') },
            { label: 'Registering pool', fn: registerPool },
            { label: 'Approving token', fn: approveTokenForSwap },
            { label: 'Executing swap with FHE', fn: performSwap },
        ];

        try {
            for (let i = 0; i < steps.length; i++) {
                setRunAllProgress(Math.round(((i) / steps.length) * 100));
                setLoadingStep(`Step ${i + 1}/${steps.length}: ${steps[i].label}`);
                addLog('info', `\n=== Step ${i + 1}/${steps.length}: ${steps[i].label} ===`);

                await steps[i].fn();

                // Small delay between steps
                await new Promise(r => setTimeout(r, 1000));
            }

            setRunAllProgress(100);
            showToast('success', 'Full Flow Complete! 🎉', 'All FHE operations executed successfully');
            addLog('success', '\n=== ✅ Full Flow Completed Successfully! ===');
        } catch (error: any) {
            showToast('error', 'Flow Interrupted', `Failed at: ${error.message?.slice(0, 80)}`);
            addLog('error', `Flow interrupted: ${error.message}`);
        } finally {
            setIsRunningAll(false);
            setLoading(false);
            setLoadingStep('');
        }
    };

    const clearLogs = () => setLogs([]);

    if (!mounted) return null;

    return (
        <div className="min-h-screen bg-background-dark text-white">
            {/* Toast Notifications */}
            <div className="fixed top-4 right-4 z-[100] space-y-3 max-w-sm">
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
                            FHE Rebalancing Hook
                        </h1>
                        <p className="text-slate-400 mt-2">Sepolia Testnet Dashboard</p>
                    </div>
                    <ConnectButton />
                </div>

                {/* Network Warning */}
                {isConnected && chain?.id !== 11155111 && (
                    <div className="bg-yellow-500/10 border border-yellow-500/50 rounded-lg p-4 mb-6">
                        <p className="text-yellow-400 font-semibold">⚠️ Wrong Network</p>
                        <p className="text-yellow-300 text-sm">Please switch to Sepolia testnet</p>
                    </div>
                )}

                {/* Run All Button */}
                {isConnected && cofheInitialized && (
                    <div className="bg-gradient-to-r from-primary/20 to-accent-uniswap/20 backdrop-blur-lg rounded-xl p-6 mb-6 border border-primary/30">
                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="text-xl font-bold text-white">🚀 One-Click Full Flow</h2>
                                <p className="text-slate-400 text-sm mt-1">
                                    Create strategy → Set allocations → Set positions → Register pool → Swap with FHE
                                </p>
                            </div>
                            <button
                                onClick={runFullFlow}
                                disabled={loading || isRunningAll}
                                className="bg-gradient-to-r from-primary to-accent-uniswap hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed px-8 py-3 rounded-lg font-bold text-lg transition-all shadow-lg shadow-primary/25"
                            >
                                {isRunningAll ? 'Running...' : 'Run All'}
                            </button>
                        </div>
                        {isRunningAll && (
                            <div className="mt-4">
                                <div className="flex justify-between text-xs text-slate-400 mb-1">
                                    <span>{loadingStep}</span>
                                    <span>{runAllProgress}%</span>
                                </div>
                                <div className="w-full bg-slate-800 rounded-full h-2">
                                    <div
                                        className="bg-gradient-to-r from-primary to-accent-uniswap h-2 rounded-full transition-all duration-500"
                                        style={{ width: `${runAllProgress}%` }}
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* Configuration Section */}
                <div className="bg-surface-dark/50 backdrop-blur-lg rounded-xl p-6 mb-6 border border-white/10">
                    <h2 className="text-2xl font-bold mb-4 text-primary">Configuration</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                            <p className="text-slate-400">Hook Address:</p>
                            <p className="font-mono text-xs break-all">{CONFIG.HOOK_ADDRESS}</p>
                        </div>
                        <div>
                            <p className="text-slate-400">Swap Router:</p>
                            <p className="font-mono text-xs break-all">{CONFIG.SWAP_ROUTER_ADDRESS}</p>
                        </div>
                        <div>
                            <p className="text-slate-400">Token0 (MockTokenA):</p>
                            <p className="font-mono text-xs break-all">{CONFIG.TOKEN0_ADDRESS}</p>
                            <p className="text-slate-500 text-xs">Balance: {parseFloat(token0Balance).toFixed(4)}</p>
                        </div>
                        <div>
                            <p className="text-slate-400">Token1 (MockTokenB):</p>
                            <p className="font-mono text-xs break-all">{CONFIG.TOKEN1_ADDRESS}</p>
                            <p className="text-slate-500 text-xs">Balance: {parseFloat(token1Balance).toFixed(4)}</p>
                        </div>
                    </div>
                    <div className="mt-4 p-3 bg-slate-900/50 rounded">
                        <p className="text-xs text-slate-400">
                            FHE Status: <span className={cofheInitialized ? 'text-green-400' : 'text-yellow-400'}>
                                {cofheInitialized ? '✓ Initialized' : '⏳ Initializing...'}
                            </span>
                        </p>
                    </div>
                </div>

                {/* Strategy Management */}
                <div className="bg-surface-dark/50 backdrop-blur-lg rounded-xl p-6 mb-6 border border-white/10">
                    <h2 className="text-2xl font-bold mb-4 text-primary">Strategy Management</h2>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm text-slate-400 mb-2">Strategy ID:</label>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={strategyId}
                                    readOnly
                                    placeholder="Generate a strategy ID first"
                                    className="flex-1 bg-slate-900/50 border border-slate-700 rounded px-4 py-2 font-mono text-xs"
                                />
                                <button
                                    onClick={generateStrategyId}
                                    className="bg-primary hover:bg-primary-dark px-6 py-2 rounded font-semibold transition-colors"
                                >
                                    Generate ID
                                </button>
                            </div>
                        </div>

                        <div className="flex gap-2">
                            <button
                                onClick={checkStrategyExists}
                                disabled={!strategyId || loading}
                                className="bg-slate-700 hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed px-6 py-3 rounded font-semibold transition-colors"
                            >
                                Check if Exists
                            </button>

                            <button
                                onClick={createStrategy}
                                disabled={!strategyId || loading || !cofheInitialized}
                                className="bg-accent-uniswap hover:opacity-90 disabled:bg-slate-700 disabled:cursor-not-allowed px-6 py-3 rounded font-semibold transition-colors"
                            >
                                Create Strategy
                            </button>
                        </div>

                        {strategyExists && (
                            <div className="bg-green-500/10 border border-green-500/50 rounded p-3">
                                <p className="text-green-400 text-sm">✓ Strategy exists and is ready</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Target Allocations */}
                <div className="bg-surface-dark/50 backdrop-blur-lg rounded-xl p-6 mb-6 border border-white/10">
                    <h2 className="text-2xl font-bold mb-4 text-primary">Target Allocations</h2>
                    <p className="text-slate-400 text-sm mb-4">Set encrypted target allocations for each token (50% target, 1-10% thresholds)</p>

                    <div className="flex gap-2">
                        <button
                            onClick={() => setTargetAllocation(CONFIG.TOKEN0_ADDRESS, 'Token0')}
                            disabled={!strategyExists || loading || !cofheInitialized}
                            className="flex-1 bg-primary hover:bg-primary-dark disabled:bg-slate-700 disabled:cursor-not-allowed px-6 py-3 rounded font-semibold transition-colors"
                        >
                            Set Token0 Allocation
                        </button>

                        <button
                            onClick={() => setTargetAllocation(CONFIG.TOKEN1_ADDRESS, 'Token1')}
                            disabled={!strategyExists || loading || !cofheInitialized}
                            className="flex-1 bg-primary hover:bg-primary-dark disabled:bg-slate-700 disabled:cursor-not-allowed px-6 py-3 rounded font-semibold transition-colors"
                        >
                            Set Token1 Allocation
                        </button>
                    </div>
                </div>

                {/* Encrypted Positions */}
                <div className="bg-surface-dark/50 backdrop-blur-lg rounded-xl p-6 mb-6 border border-white/10">
                    <h2 className="text-2xl font-bold mb-4 text-primary">Encrypted Positions</h2>
                    <p className="text-slate-400 text-sm mb-4">Set encrypted position values (using 1,000,000 tokens)</p>

                    <div className="flex gap-2">
                        <button
                            onClick={() => setEncryptedPosition(CONFIG.TOKEN0_ADDRESS, 'Token0', '1000000')}
                            disabled={!strategyExists || loading || !cofheInitialized}
                            className="flex-1 bg-primary hover:bg-primary-dark disabled:bg-slate-700 disabled:cursor-not-allowed px-6 py-3 rounded font-semibold transition-colors"
                        >
                            Set Token0 Position
                        </button>

                        <button
                            onClick={() => setEncryptedPosition(CONFIG.TOKEN1_ADDRESS, 'Token1', '1000000')}
                            disabled={!strategyExists || loading || !cofheInitialized}
                            className="flex-1 bg-primary hover:bg-primary-dark disabled:bg-slate-700 disabled:cursor-not-allowed px-6 py-3 rounded font-semibold transition-colors"
                        >
                            Set Token1 Position
                        </button>
                    </div>
                </div>

                {/* Pool Registration */}
                <div className="bg-surface-dark/50 backdrop-blur-lg rounded-xl p-6 mb-6 border border-white/10">
                    <h2 className="text-2xl font-bold mb-4 text-primary">Pool Registration</h2>
                    <p className="text-slate-400 text-sm mb-4">Register the pool with your strategy to enable FHE operations during swaps</p>

                    <button
                        onClick={registerPool}
                        disabled={!strategyExists || loading}
                        className="w-full bg-accent-uniswap hover:opacity-90 disabled:bg-slate-700 disabled:cursor-not-allowed px-6 py-3 rounded font-semibold transition-colors"
                    >
                        Register Pool with Strategy
                    </button>
                </div>

                {/* Swap Section */}
                <div className="bg-surface-dark/50 backdrop-blur-lg rounded-xl p-6 mb-6 border border-white/10">
                    <h2 className="text-2xl font-bold mb-4 text-primary">Swap Operations</h2>
                    <p className="text-slate-400 text-sm mb-4">Execute a swap through the UniswapV4 Router — the hook will trigger FHE rebalancing</p>

                    <div className="space-y-4">
                        {/* Swap Amount */}
                        <div>
                            <label className="block text-sm text-slate-400 mb-2">Swap Amount (tokens):</label>
                            <input
                                type="text"
                                value={swapAmount}
                                onChange={e => setSwapAmount(e.target.value)}
                                placeholder="0.1"
                                className="w-full bg-slate-900/50 border border-slate-700 rounded px-4 py-2 font-mono text-sm"
                            />
                        </div>

                        {/* Direction Toggle */}
                        <div>
                            <label className="block text-sm text-slate-400 mb-2">Direction:</label>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setZeroForOne(true)}
                                    className={`flex-1 px-4 py-2 rounded font-semibold text-sm transition-colors ${zeroForOne
                                        ? 'bg-primary text-white'
                                        : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                                        }`}
                                >
                                    Token0 → Token1
                                </button>
                                <button
                                    onClick={() => setZeroForOne(false)}
                                    className={`flex-1 px-4 py-2 rounded font-semibold text-sm transition-colors ${!zeroForOne
                                        ? 'bg-primary text-white'
                                        : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                                        }`}
                                >
                                    Token1 → Token0
                                </button>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-2">
                            <button
                                onClick={approveTokenForSwap}
                                disabled={loading}
                                className="flex-1 bg-slate-700 hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed px-6 py-3 rounded font-semibold transition-colors"
                            >
                                Approve Token
                            </button>
                            <button
                                onClick={performSwap}
                                disabled={!strategyExists || loading}
                                className="flex-1 bg-gradient-to-r from-primary to-accent-uniswap hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed px-6 py-3 rounded font-bold transition-all shadow-lg shadow-primary/20"
                            >
                                Execute Swap
                            </button>
                        </div>

                        {/* FHE Result */}
                        {lastSwapTx && (
                            <div className={`rounded-lg p-4 border ${fheConfirmed
                                ? 'bg-green-500/10 border-green-500/50'
                                : 'bg-yellow-500/10 border-yellow-500/50'
                                }`}>
                                <p className={`font-semibold text-sm ${fheConfirmed ? 'text-green-400' : 'text-yellow-400'}`}>
                                    {fheConfirmed ? '🔐 FHE Rebalancing Confirmed!' : '⚠ Swap completed, FHE status unknown'}
                                </p>
                                <p className="text-xs text-slate-400 mt-1 font-mono break-all">
                                    Tx: {lastSwapTx}
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Activity Log */}
                <div className="bg-surface-dark/50 backdrop-blur-lg rounded-xl p-6 border border-white/10">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-bold text-primary">Activity Log</h2>
                        <button
                            onClick={clearLogs}
                            className="text-sm text-slate-400 hover:text-white transition-colors"
                        >
                            Clear
                        </button>
                    </div>

                    <div className="space-y-2 max-h-96 overflow-y-auto">
                        {logs.length === 0 ? (
                            <p className="text-slate-500 text-sm">No activity yet</p>
                        ) : (
                            logs.map((log, i) => (
                                <div
                                    key={i}
                                    className={`p-3 rounded text-sm ${log.type === 'error' ? 'bg-red-500/10 text-red-400 border border-red-500/20' :
                                        log.type === 'success' ? 'bg-green-500/10 text-green-400 border border-green-500/20' :
                                            log.type === 'warning' ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20' :
                                                'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                                        }`}
                                >
                                    <span className="text-slate-500 text-xs mr-2">
                                        {log.timestamp.toLocaleTimeString()}
                                    </span>
                                    {log.message}
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {loading && !isRunningAll && (
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
                        <div className="bg-surface-dark rounded-xl p-8 flex flex-col items-center gap-4 border border-white/10">
                            <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
                            <p className="text-lg font-semibold">{loadingStep || 'Processing transaction...'}</p>
                        </div>
                    </div>
                )}
            </div>

            <style jsx>{`
                @keyframes slide-in {
                    from {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
                .animate-slide-in {
                    animation: slide-in 0.3s ease-out;
                }
            `}</style>
        </div>
    );
}
