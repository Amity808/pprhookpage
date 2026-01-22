import type { DocsThemeConfig } from 'nextra-theme-docs';

const config: DocsThemeConfig = {
    logo: (
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <rect width="32" height="32" rx="8" fill="url(#gradient)" />
                <path d="M16 8L24 16L16 24L8 16L16 8Z" fill="white" opacity="0.9" />
                <defs>
                    <linearGradient id="gradient" x1="0" y1="0" x2="32" y2="32">
                        <stop offset="0%" stopColor="#8B5CF6" />
                        <stop offset="100%" stopColor="#EC4899" />
                    </linearGradient>
                </defs>
            </svg>
            <span style={{ fontWeight: 700, fontSize: '18px' }}>
                Umbra finance
            </span>
        </div>
    ),
    project: {
        link: 'https://github.com/Amity808/fhe-hook-template',
    },
    chat: {
        link: 'https://discord.gg/umbrafinance',
    },
    docsRepositoryBase: 'https://github.com/Amity808/fhe-hook-template/tree/main',
    footer: {
        text: (
            <span>
                MIT {new Date().getFullYear()} ©{' '}
                <a href="https://github.com/Amity808/fhe-hook-template" target="_blank">
                    Umbra finance
                </a>
                . Built with ❤️ for the future of confidential DeFi.
            </span>
        ),
    },
    useNextSeoProps() {
        return {
            titleTemplate: '%s – Umbra finance'
        }
    },
};

export default config;
