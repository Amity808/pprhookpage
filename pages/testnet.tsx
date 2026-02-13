import { useState, useEffect } from 'react';
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
    zeroHash,
    zeroAddress,
    type Address
} from 'viem';

// Contract addresses configuration
const CONFIG = {
    HOOK_ADDRESS: "0x29917CE538f0CCbd370C9db265e721595Af14Ac0",
    POOL_MANAGER_ADDRESS: "0xE03A1074c86CFeDd5C142C4F04F1a1536e203543",
    SWAP_ROUTER_ADDRESS: "0xf13D190e9117920c703d79B5F33732e10049b115",
    TOKEN0_ADDRESS: "0x2794a0b7187BFCd81D2b6d05E8a6e6cAE3F97fFa", // MockTokenA
    TOKEN1_ADDRESS: "0xEa20820719c5Ae04Bce9A098E209f4d8C60DAF06", // MockTokenB
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
]);

const ERC20_ABI = parseAbi([
    "function balanceOf(address account) external view returns (uint256)",
    "function symbol() external view returns (string)",
]);

type LogEntry = {
    type: 'info' | 'success' | 'error' | 'warning';
    message: string;
    timestamp: Date;
};

export default function Testnet() {
    const { address, isConnected, chain } = useAccount();
    const publicClient = usePublicClient();
    const { data: walletClient } = useWalletClient();

    const [logs, setLogs] = useState<LogEntry[]>([]);
    const [loading, setLoading] = useState(false);
    const [strategyId, setStrategyId] = useState<`0x${string}`>('0x');
    const [token0Balance, setToken0Balance] = useState('0');
    const [token1Balance, setToken1Balance] = useState('0');
    const [strategyExists, setStrategyExists] = useState(false);
    const [cofheInitialized, setCofheInitialized] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
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

            // Import cofhejs dynamically (browser version)
            const { cofhejs } = await import('cofhejs/web');

            // Use wagmi's wallet client directly
            if (!walletClient) {
                throw new Error('Wallet client not available');
            }

            // cofhejs may need a specific initialization for browser
            // For now, we'll attempt initialization without ethers
            // This might need adjustment based on cofhejs browser API
            // Use initializeWithViem for better compatibility with wagmi/viem
            await cofhejs.initializeWithViem({
                environment: 'TESTNET',
                viemClient: publicClient,
                viemWalletClient: walletClient,
            });

            setCofheInitialized(true);
            addLog('success', '✓ FHE encryption initialized successfully');
        } catch (error: any) {
            addLog('error', `Failed to initialize cofhejs: ${error.message}`);
            addLog('warning', 'Some features may not work without FHE initialization');
        }
    };

    const loadBalances = async () => {
        if (!publicClient || !address) return;

        try {
            const token0Contract = {
                address: CONFIG.TOKEN0_ADDRESS as `0x${string}`,
                abi: ERC20_ABI,
            };

            const token1Contract = {
                address: CONFIG.TOKEN1_ADDRESS as `0x${string}`,
                abi: ERC20_ABI,
            };

            const [balance0, balance1] = await Promise.all([
                publicClient.readContract({
                    ...token0Contract,
                    functionName: 'balanceOf',
                    args: [address],
                }),
                publicClient.readContract({
                    ...token1Contract,
                    functionName: 'balanceOf',
                    args: [address],
                }),
            ]);

            setToken0Balance(formatEther(balance0 as bigint));
            setToken1Balance(formatEther(balance1 as bigint));
        } catch (error) {
            console.error('Error loading balances:', error);
        }
    };

    const generateStrategyId = () => {
        const id = `fhe-strategy-${Date.now()}`;
        const hash = keccak256(toBytes(id));
        setStrategyId(hash);
        addLog('info', `Generated strategy ID: ${hash}`);
    };

    const checkStrategyExists = async () => {
        if (!publicClient || !strategyId) {
            addLog('error', 'Please generate a strategy ID first');
            return;
        }

        setLoading(true);
        try {
            const result = await publicClient.readContract({
                address: CONFIG.HOOK_ADDRESS as `0x${string}`,
                abi: HOOK_ABI,
                functionName: 'getStrategy',
                args: [strategyId as `0x${string}`],
            }) as any;

            const exists = result.strategyId !== zeroHash && result.owner !== zeroAddress;
            setStrategyExists(exists);

            if (exists) {
                addLog('success', `Strategy exists! Owner: ${result.owner}`);
                addLog('info', `Active: ${result.isActive}`);
            } else {
                addLog('info', 'Strategy does not exist yet');
            }
        } catch (error: any) {
            addLog('error', `Error checking strategy: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    const createStrategy = async () => {
        if (!walletClient || !strategyId || !cofheInitialized) {
            addLog('error', 'Please connect wallet, generate strategy ID, and ensure FHE is initialized');
            return;
        }

        setLoading(true);
        try {
            addLog('info', 'Creating strategy with encrypted parameters...');

            // Import cofhejs for encryption
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
                address: CONFIG.HOOK_ADDRESS as `0x${string}`,
                abi: HOOK_ABI,
                functionName: 'createStrategy',
                args: [
                    strategyId,
                    10n, // rebalanceFrequency
                    encryptedArray[0],
                    encryptedArray[1],
                    encryptedArray[2],
                ],
            });

            addLog('info', `Transaction submitted: ${hash}`);

            // Wait for confirmation
            if (publicClient) {
                await publicClient.waitForTransactionReceipt({ hash });
                addLog('success', '✓ Strategy created successfully!');
                setStrategyExists(true);
            }
        } catch (error: any) {
            addLog('error', `Failed to create strategy: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    const setTargetAllocation = async (tokenAddress: string, tokenName: string) => {
        if (!walletClient || !strategyId || !cofheInitialized) {
            addLog('error', 'Please ensure wallet is connected and strategy exists');
            return;
        }

        setLoading(true);
        try {
            addLog('info', `Setting target allocation for ${tokenName}...`);

            const { cofhejs, Encryptable } = await import('cofhejs/web');

            addLog('info', 'Encrypting allocation parameters...');
            const encryptedValues = await cofhejs.encrypt(
                [
                    Encryptable.uint128(5000n), // targetPercentage: 50%
                    Encryptable.uint128(100n),  // minThreshold: 1%
                    Encryptable.uint128(1000n), // maxThreshold: 10%
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
            addLog('info', 'Submitting transaction...');

            const hash = await walletClient.writeContract({
                address: CONFIG.HOOK_ADDRESS as `0x${string}`,
                abi: HOOK_ABI,
                functionName: 'setTargetAllocation',
                args: [
                    strategyId as `0x${string}`,
                    tokenAddress as `0x${string}`,
                    encryptedArray[0],
                    encryptedArray[1],
                    encryptedArray[2],
                ],
            });

            addLog('info', `Transaction: ${hash}`);

            if (publicClient) {
                await publicClient.waitForTransactionReceipt({ hash });
                addLog('success', `✓ Target allocation set for ${tokenName}!`);
            }
        } catch (error: any) {
            addLog('error', `Failed to set allocation: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    const setEncryptedPosition = async (tokenAddress: string, tokenName: string, amount: string) => {
        if (!walletClient || !strategyId || !cofheInitialized) {
            addLog('error', 'Please ensure wallet is connected and strategy exists');
            return;
        }

        setLoading(true);
        try {
            addLog('info', `Setting encrypted position for ${tokenName}...`);

            const { cofhejs, Encryptable } = await import('cofhejs/web');

            const positionValue = parseEther(amount);
            addLog('info', `Encrypting position value: ${amount} tokens...`);

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

            addLog('success', '✓ Position encrypted');
            addLog('info', 'Submitting transaction...');

            const hash = await walletClient.writeContract({
                address: CONFIG.HOOK_ADDRESS as `0x${string}`,
                abi: HOOK_ABI,
                functionName: 'setEncryptedPosition',
                args: [strategyId as `0x${string}`, tokenAddress as `0x${string}`, encryptedArray[0]],
            });

            addLog('info', `Transaction: ${hash}`);

            if (publicClient) {
                await publicClient.waitForTransactionReceipt({ hash });
                addLog('success', `✓ Encrypted position set for ${tokenName}!`);
            }
        } catch (error: any) {
            addLog('error', `Failed to set position: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    const registerPool = async () => {
        if (!walletClient || !strategyId) {
            addLog('error', 'Please ensure wallet is connected and strategy exists');
            return;
        }

        setLoading(true);
        try {
            addLog('info', 'Calculating pool ID...');

            const lpFee = 3000;
            const tickSpacing = 60;

            // Sort currencies
            const addr0 = BigInt(CONFIG.TOKEN0_ADDRESS);
            const addr1 = BigInt(CONFIG.TOKEN1_ADDRESS);
            const [c0, c1] = addr0 < addr1
                ? [CONFIG.TOKEN0_ADDRESS, CONFIG.TOKEN1_ADDRESS]
                : [CONFIG.TOKEN1_ADDRESS, CONFIG.TOKEN0_ADDRESS];

            // Calculate pool ID
            const encoded = encodeAbiParameters(
                parseAbiParameters('address, address, uint24, int24, address'),
                [c0 as Address, c1 as Address, lpFee, tickSpacing, CONFIG.HOOK_ADDRESS as Address]
            );
            const poolId = keccak256(encoded);

            addLog('info', `Pool ID: ${poolId}`);
            addLog('info', 'Registering pool with strategy...');

            const hash = await walletClient.writeContract({
                address: CONFIG.HOOK_ADDRESS as `0x${string}`,
                abi: HOOK_ABI,
                functionName: 'enableCrossPoolCoordination',
                args: [strategyId, [poolId]],
            });

            addLog('info', `Transaction: ${hash}`);

            if (publicClient) {
                await publicClient.waitForTransactionReceipt({ hash });
                addLog('success', '✓ Pool registered successfully!');
            }
        } catch (error: any) {
            addLog('error', `Failed to register pool: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    const clearLogs = () => setLogs([]);

    if (!mounted) return null;

    return (
        <div className="min-h-screen bg-background-dark text-white">
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

                {/* Configuration Section */}
                <div className="bg-surface-dark/50 backdrop-blur-lg rounded-xl p-6 mb-6 border border-white/10">
                    <h2 className="text-2xl font-bold mb-4 text-primary">Configuration</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                            <p className="text-slate-400">Hook Address:</p>
                            <p className="font-mono text-xs break-all">{CONFIG.HOOK_ADDRESS}</p>
                        </div>
                        <div>
                            <p className="text-slate-400">Pool Manager:</p>
                            <p className="font-mono text-xs break-all">{CONFIG.POOL_MANAGER_ADDRESS}</p>
                        </div>
                        <div>
                            <p className="text-slate-400">Token0 (MockTokenA):</p>
                            <p className="font-mono text-xs break-all">{CONFIG.TOKEN0_ADDRESS}</p>
                            <p className="text-slate-500 text-xs">Balance: {token0Balance}</p>
                        </div>
                        <div>
                            <p className="text-slate-400">Token1 (MockTokenB):</p>
                            <p className="font-mono text-xs break-all">{CONFIG.TOKEN1_ADDRESS}</p>
                            <p className="text-slate-500 text-xs">Balance: {token1Balance}</p>
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

                {/* Swap Section - Disabled for now */}
                <div className="bg-slate-800/30 backdrop-blur-lg rounded-xl p-6 mb-6 border border-slate-700/30 opacity-50">
                    <h2 className="text-2xl font-bold mb-4 text-slate-500">Swap Operations</h2>
                    <p className="text-slate-500 text-sm mb-4">⚠️ Swap functionality is currently being debugged and will be available soon</p>
                    <button
                        disabled
                        className="w-full bg-slate-700 cursor-not-allowed px-6 py-3 rounded font-semibold"
                    >
                        Execute Swap (Coming Soon)
                    </button>
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

                {loading && (
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
                        <div className="bg-surface-dark rounded-xl p-8 flex flex-col items-center gap-4 border border-white/10">
                            <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
                            <p className="text-lg font-semibold">Processing transaction...</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
