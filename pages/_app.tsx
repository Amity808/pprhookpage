import '@rainbow-me/rainbowkit/styles.css';
import '../styles/globals.css';

// Polyfill localStorage for SSR to avoid errors in third-party libraries (like @metamask/sdk)
if (typeof window === 'undefined') {
    (global as any).localStorage = {
        getItem: () => null,
        setItem: () => { },
        removeItem: () => { },
        clear: () => { },
        key: () => null,
        length: 0,
    };
}

import type { AppProps } from 'next/app';
import { getDefaultConfig, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import { sepolia } from 'wagmi/chains';
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const config = getDefaultConfig({
    appName: 'Umbra Finance',
    projectId: 'YOUR_PROJECT_ID', // Get from https://cloud.walletconnect.com/
    chains: [sepolia],
    ssr: true,
});

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
    return (
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
                <RainbowKitProvider>
                    <Component {...pageProps} />
                </RainbowKitProvider>
            </QueryClientProvider>
        </WagmiProvider>
    );
}
