export default function ProblemHero() {
  return (
    <section className="relative flex flex-col items-center justify-center px-4 md:px-10 lg:px-40 py-16 md:py-24 border-b border-[#282b39]">
      <div className="max-w-[1280px] w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="flex flex-col gap-6 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 w-fit">
            <span className="material-symbols-outlined text-red-500 text-sm">warning</span>
            <span className="text-red-400 text-xs font-bold uppercase tracking-wide">Critical Vulnerability</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight tracking-[-0.033em] text-white">
            The <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-400">$6.2M Annual Problem</span>: Why Institutional DeFi Needs Confidential Execution
          </h1>
          
          <p className="text-slate-400 text-lg md:text-xl font-normal leading-relaxed">
            Systematic value extraction is bleeding institutional yields dry. Discover the mechanics of the loss and why transparency is a trap for large-scale rebalancing.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <button className="flex items-center justify-center h-12 px-6 rounded-lg bg-primary hover:bg-blue-600 transition-all text-white font-bold">
              See How We Solve This
            </button>
            <button className="flex items-center justify-center h-12 px-6 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-all text-white font-medium">
              View The Data
            </button>
          </div>
        </div>
        
        <div className="relative w-full aspect-square md:aspect-video lg:aspect-square bg-[#1a1d2d] rounded-xl border border-[#282b39] overflow-hidden flex items-center justify-center group">
          {/* Decorative abstract background */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-background-dark to-background-dark"></div>
          
          <div className="relative z-10 flex flex-col items-center gap-4 p-8">
            <div className="w-full max-w-sm bg-background-dark/80 backdrop-blur border border-red-500/30 rounded-lg p-4 shadow-[0_0_30px_rgba(239,68,68,0.1)]">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-slate-400">Expected Yield</span>
                <span className="text-sm text-white font-mono">12.4%</span>
              </div>
              <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                <div className="bg-green-500 h-full w-[100%]"></div>
              </div>
            </div>
            
            <div className="h-12 w-0.5 bg-gradient-to-b from-green-500/50 to-red-500/50"></div>
            
            <div className="w-full max-w-sm bg-background-dark/80 backdrop-blur border border-red-500 rounded-lg p-4 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-1 bg-red-500 text-white text-[10px] font-bold uppercase rounded-bl">Leakage</div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-slate-400">Actual Realized</span>
                <span className="text-sm text-red-400 font-mono font-bold">8.1%</span>
              </div>
              <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                <div className="bg-red-500 h-full w-[65%]"></div>
              </div>
              <div className="mt-3 flex gap-2 text-xs text-red-400">
                <span className="material-symbols-outlined text-xs">trending_down</span>
                <span>-430 bps via Front-running</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

