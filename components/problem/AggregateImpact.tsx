export default function AggregateImpact() {
  return (
    <section className="py-20 px-4 md:px-10 lg:px-40 bg-background-dark border-t border-[#282b39]">
      <div className="max-w-[1280px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Aggregate Impact */}
          <div className="flex flex-col gap-6">
            <h2 className="text-3xl font-bold text-white">The Aggregate Impact</h2>
            <p className="text-slate-400">
              For a mid-sized crypto fund with $100M AUM rebalancing monthly, the losses compound aggressively. This isn't just "slippage" — it is a direct transfer of wealth from your LPs to MEV bots.
            </p>
            
            <div className="bg-[#1a1d2d] p-6 rounded-xl border border-[#282b39] mt-4">
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-5xl font-black text-white">$6.2M</span>
                <span className="text-red-400 font-bold">Annual Loss</span>
              </div>
              <div className="text-sm text-slate-500 mb-6">Estimated for $100M Fund, 12x Turnover</div>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-24 text-right text-xs text-slate-400">MEV Loss</div>
                  <div className="flex-1 bg-white/5 h-4 rounded-full overflow-hidden">
                    <div className="bg-red-500 h-full w-[45%]"></div>
                  </div>
                  <div className="w-16 text-xs text-white font-mono">$2.8M</div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-24 text-right text-xs text-slate-400">Alpha Decay</div>
                  <div className="flex-1 bg-white/5 h-4 rounded-full overflow-hidden">
                    <div className="bg-orange-500 h-full w-[35%]"></div>
                  </div>
                  <div className="w-16 text-xs text-white font-mono">$2.1M</div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-24 text-right text-xs text-slate-400">Spread Cost</div>
                  <div className="flex-1 bg-white/5 h-4 rounded-full overflow-hidden">
                    <div className="bg-yellow-500 h-full w-[20%]"></div>
                  </div>
                  <div className="w-16 text-xs text-white font-mono">$1.3M</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Who Suffers Most */}
          <div className="flex flex-col gap-6">
            <h2 className="text-3xl font-bold text-white">Who Suffers Most?</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              <div className="bg-[#1a1d2d] p-5 rounded-lg border border-[#282b39] hover:bg-white/5 transition-colors">
                <span className="material-symbols-outlined text-primary mb-3 text-3xl">query_stats</span>
                <h3 className="text-white font-bold mb-1">Hedge Funds</h3>
                <p className="text-slate-400 text-xs leading-relaxed">Active strategies with high turnover are bleeding alpha on every rebalance.</p>
              </div>
              
              <div className="bg-[#1a1d2d] p-5 rounded-lg border border-[#282b39] hover:bg-white/5 transition-colors">
                <span className="material-symbols-outlined text-primary mb-3 text-3xl">account_balance</span>
                <h3 className="text-white font-bold mb-1">Corporate Treasuries</h3>
                <p className="text-slate-400 text-xs leading-relaxed">Large block trades for stablecoin management are prime targets for timing attacks.</p>
              </div>
              
              <div className="bg-[#1a1d2d] p-5 rounded-lg border border-[#282b39] hover:bg-white/5 transition-colors">
                <span className="material-symbols-outlined text-primary mb-3 text-3xl">school</span>
                <h3 className="text-white font-bold mb-1">Endowments</h3>
                <p className="text-slate-400 text-xs leading-relaxed">Long-term holders looking to diversify without signaling market movements.</p>
              </div>
              
              <div className="bg-[#1a1d2d] p-5 rounded-lg border border-[#282b39] hover:bg-white/5 transition-colors">
                <span className="material-symbols-outlined text-primary mb-3 text-3xl">token</span>
                <h3 className="text-white font-bold mb-1">DAOs</h3>
                <p className="text-slate-400 text-xs leading-relaxed">Governance-driven treasury swaps are visible days in advance, guaranteeing front-running.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

