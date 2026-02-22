export default function Footer() {
  return (
    <footer className="bg-background-dark border-t border-[#282b39] py-12">
      <div className="px-5 md:px-10 lg:px-40 flex justify-center">
        <div className="w-full max-w-[1200px] flex flex-col md:flex-row justify-between gap-10">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 text-white">
              <div className="size-6 flex items-center justify-center rounded bg-primary/20 text-primary">
                <span className="material-symbols-outlined text-[16px]">enhanced_encryption</span>
              </div>
              <h2 className="text-base font-bold">ConfidentialHook</h2>
            </div>
            <p className="text-gray-500 text-sm max-w-[300px]">
              The standard for confidential DeFi execution. Built for Uniswap v4.
            </p>
            <div className="flex gap-4 mt-2">
              <a
                className="text-gray-400 hover:text-white transition-colors"
                href="https://x.com/umbradefi"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="sr-only">X (Twitter)</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"></path>
                </svg>
              </a>
              <a className="text-gray-400 hover:text-white transition-colors" href="#">
                <span className="sr-only">GitHub</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" fillRule="evenodd"></path>
                </svg>
              </a>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 text-sm">
            <div className="flex flex-col gap-3">
              <h3 className="text-white font-bold">Product</h3>
              <a className="text-gray-400 hover:text-white transition-colors" href="#">How it Works</a>
              <a className="text-gray-400 hover:text-white transition-colors" href="#">Features</a>
              <a className="text-gray-400 hover:text-white transition-colors" href="#">Pricing</a>
              <a className="text-gray-400 hover:text-white transition-colors" href="#">Case Studies</a>
            </div>
            <div className="flex flex-col gap-3">
              <h3 className="text-white font-bold">Resources</h3>
              <a className="text-gray-400 hover:text-white transition-colors" href="#">Documentation</a>
              <a className="text-gray-400 hover:text-white transition-colors" href="#">API Reference</a>
              <a className="text-gray-400 hover:text-white transition-colors" href="#">Audits</a>
              <a className="text-gray-400 hover:text-white transition-colors" href="#">Community</a>
            </div>
            <div className="flex flex-col gap-3">
              <h3 className="text-white font-bold">Company</h3>
              <a className="text-gray-400 hover:text-white transition-colors" href="#">About</a>
              <a className="text-gray-400 hover:text-white transition-colors" href="#">Contact</a>
              <a className="text-gray-400 hover:text-white transition-colors" href="#">Privacy Policy</a>
              <a className="text-gray-400 hover:text-white transition-colors" href="#">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex justify-center mt-12 border-t border-[#282b39] pt-6">
        <p className="text-gray-600 text-xs">© 2023 Umbra Finance. All rights reserved.</p>
      </div>
    </footer>
  );
}

