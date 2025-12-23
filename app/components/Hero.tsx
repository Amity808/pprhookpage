export default function Hero() {
  return (
    <div className="relative flex min-h-[90vh] pt-20 w-full flex-col bg-background-dark bg-hero-glow">
      <div className="px-5 md:px-10 lg:px-40 flex flex-1 justify-center items-center py-10">
        <div className="flex flex-col max-w-[1200px] flex-1">
          <div className="@container">
            <div className="flex flex-col gap-10 lg:flex-row items-center">
              {/* Hero Text */}
              <div className="flex flex-col gap-6 flex-1 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 self-center lg:self-start px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wide">
                  <span className="material-symbols-outlined text-[16px]">verified_user</span>
                  Production Ready
                </div>
                <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-black leading-[1.1] tracking-[-0.02em]">
                  Confidential Rebalancing on <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-uniswap to-purple-500">Uniswap v4</span>
                </h1>
                <p className="text-gray-400 text-lg md:text-xl font-normal leading-relaxed max-w-[640px] mx-auto lg:mx-0">
                  The first FHE-powered solution for institutional DeFi. Eliminate annual losses from front-running and MEV with fully encrypted order execution.
                </p>
                <div className="flex flex-wrap gap-4 justify-center lg:justify-start pt-2">
                  <button className="flex cursor-pointer items-center justify-center rounded-lg h-12 px-6 bg-primary hover:bg-primary-dark text-white text-base font-bold shadow-[0_0_20px_rgba(19,55,236,0.3)] transition-all">
                    Get Started
                  </button>
                  <button className="flex cursor-pointer items-center justify-center rounded-lg h-12 px-6 bg-[#282b39] hover:bg-[#323647] border border-[#3b3f54] text-white text-base font-bold transition-colors">
                    Schedule Demo
                  </button>
                </div>
                <div className="flex items-center justify-center lg:justify-start gap-6 pt-4 text-sm text-gray-500 font-medium">
                  <span className="flex items-center gap-1.5"><span className="material-symbols-outlined text-[18px] text-primary">check_circle</span> Audited</span>
                  <span className="flex items-center gap-1.5"><span className="material-symbols-outlined text-[18px] text-primary">check_circle</span> Open Source</span>
                  <span className="flex items-center gap-1.5"><span className="material-symbols-outlined text-[18px] text-primary">check_circle</span> Institutional</span>
                </div>
              </div>
              {/* Hero Visual */}
              <div className="w-full flex-1 flex justify-center lg:justify-end relative">
                {/* Abstract decorative elements */}
                <div className="absolute -top-10 -right-10 w-64 h-64 bg-primary/20 rounded-full blur-[80px]"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent-uniswap/10 rounded-full blur-[80px]"></div>
                <div className="relative w-full aspect-square max-w-[500px] bg-surface-dark border border-[#282b39] rounded-2xl overflow-hidden shadow-2xl flex items-center justify-center group" data-alt="Abstract visualization of encrypted blocks connecting to a Uniswap interface">
                  <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=2532&auto=format&fit=crop')] bg-cover bg-center opacity-40 mix-blend-overlay"></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-transparent to-transparent"></div>
                  {/* Diagram Overlay */}
                  <div className="relative z-10 flex flex-col gap-4 p-6 w-full max-w-[320px]">
                    <div className="bg-[#1c1d27]/90 backdrop-blur border border-green-500/30 rounded-lg p-4 flex items-center justify-between shadow-lg transform translate-y-2 transition-transform group-hover:translate-y-0">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-green-500/20 rounded-md text-green-400">
                          <span className="material-symbols-outlined">trending_up</span>
                        </div>
                        <div>
                          <div className="text-xs text-gray-400">Yield Strategy</div>
                          <div className="text-sm font-bold text-white">+ 12.4% APY</div>
                        </div>
                      </div>
                      <div className="text-xs text-green-400 font-mono">ENCRYPTED</div>
                    </div>
                    <div className="bg-[#1c1d27]/90 backdrop-blur border border-[#3b3f54] rounded-lg p-4 flex items-center justify-between shadow-lg opacity-80 scale-95">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/20 rounded-md text-primary">
                          <span className="material-symbols-outlined">lock</span>
                        </div>
                        <div>
                          <div className="text-xs text-gray-400">Rebalance Hook</div>
                          <div className="text-sm font-bold text-white">Processing...</div>
                        </div>
                      </div>
                      <div className="text-xs text-primary font-mono animate-pulse">FHE ACTIVE</div>
                    </div>
                    <div className="bg-[#1c1d27]/90 backdrop-blur border border-red-500/20 rounded-lg p-4 flex items-center justify-between shadow-lg opacity-60 scale-90 grayscale">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-red-500/10 rounded-md text-red-400">
                          <span className="material-symbols-outlined">visibility_off</span>
                        </div>
                        <div>
                          <div className="text-xs text-gray-400">MEV Bots</div>
                          <div className="text-sm font-bold text-white">Blocked</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

