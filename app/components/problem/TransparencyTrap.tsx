export default function TransparencyTrap() {
  return (
    <section className="py-20 px-4 md:px-10 lg:px-40 bg-background-dark relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#282b39] to-transparent"></div>
      
      <div className="max-w-[1280px] mx-auto">
        <div className="text-center mb-16">
          <span className="text-primary font-bold tracking-wider uppercase text-sm">Root Cause</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-3 text-white">The Transparency Trap</h2>
          <p className="text-slate-400 max-w-2xl mx-auto mt-4">
            Blockchains are built for transparency, but institutional alpha relies on privacy. This fundamental mismatch creates a predatory environment.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="flex flex-col gap-6 order-2 md:order-1">
            <div className="flex flex-col gap-4">
              <div className="flex items-start gap-4">
                <div className="bg-[#1a1d2d] p-3 rounded-lg border border-[#282b39] shrink-0">
                  <span className="material-symbols-outlined text-white">visibility</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Public Mempools Broadcast Your Intent</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    When you submit a rebalancing transaction, it sits in the public mempool. For sophisticated actors, this is equivalent to publishing your trading strategy before it executes.
                  </p>
                </div>
              </div>
              
              <div className="w-px h-8 bg-[#282b39] ml-8 my-1"></div>
              
              <div className="flex items-start gap-4">
                <div className="bg-[#1a1d2d] p-3 rounded-lg border border-[#282b39] shrink-0">
                  <span className="material-symbols-outlined text-red-500">campaign</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Predatory Bots React in Milliseconds</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    MEV bots detect large rebalancing orders instantly. They manipulate the pool price before your trade settles, extracting risk-free profit at your expense.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="order-1 md:order-2 bg-[#1a1d2d] border border-[#282b39] rounded-xl p-6 md:p-8">
            <div className="flex flex-col gap-4">
              <div className="flex justify-between text-xs uppercase tracking-wider text-slate-500 font-bold mb-2">
                <span>Your Transaction</span>
                <span>Public View</span>
              </div>
              
              <div className="space-y-3">
                {/* Simulated Transaction Block */}
                <div className="flex items-center gap-3 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                  <span className="material-symbols-outlined text-red-500">lock_open</span>
                  <div className="flex-1 font-mono text-xs text-red-200">
                    <span className="opacity-50">Function:</span> swapExactInput<br/>
                    <span className="opacity-50">Amount:</span> 5,000,000 USDC<br/>
                    <span className="opacity-50">MinOut:</span> 4,980,000...
                  </div>
                  <div className="text-red-500 text-xs font-bold whitespace-nowrap">EXPOSED</div>
                </div>
                
                <div className="flex justify-center">
                  <span className="material-symbols-outlined text-slate-600">arrow_downward</span>
                </div>
                
                <div className="flex items-center justify-center gap-2 p-3 bg-[#1a1d2d] border border-[#282b39] border-dashed rounded-lg text-slate-500 text-sm">
                  <span className="material-symbols-outlined">smart_toy</span>
                  <span>MEV Bot Front-runs</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

