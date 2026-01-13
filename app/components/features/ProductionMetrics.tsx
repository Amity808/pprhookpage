export default function ProductionMetrics() {
  return (
    <section className="bg-[#0b0c15] -mx-4 md:-mx-10 px-4 md:px-10 py-16 border-y border-[#282b39]" id="production-ready">
      <div className="max-w-[1280px] mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">Production Ready Metrics</h2>
          <p className="text-[#9da1b9] max-w-2xl mx-auto">Optimized for mainnet deployment with rigorous testing and gas auditing.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Metric 1: Test Coverage */}
          <div className="bg-surface-dark rounded-2xl p-8 border border-[#282b39] text-center relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/5 rounded-full blur-3xl -mr-16 -mt-16"></div>
            <div className="text-6xl font-black text-white mb-2 tracking-tight group-hover:scale-105 transition-transform">
              28<span className="text-primary text-4xl">/28</span>
            </div>
            <div className="text-sm font-bold uppercase tracking-widest text-[#9da1b9] mb-4">Tests Passed</div>
            <div className="w-full bg-gray-700 h-2 rounded-full overflow-hidden">
              <div className="bg-green-500 h-full w-full"></div>
            </div>
            <p className="text-xs text-[#9da1b9] mt-3">100% Branch Coverage via Foundry</p>
          </div>
          
          {/* Metric 2: Gas Optimization */}
          <div className="bg-surface-dark rounded-2xl p-8 border border-[#282b39] flex flex-col justify-between">
            <div className="mb-4">
              <h3 className="text-lg font-bold text-white mb-1">Gas Optimization</h3>
              <p className="text-[#9da1b9] text-sm">Comparison vs Standard FHE Implementation</p>
            </div>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs text-[#9da1b9] mb-1">
                  <span>Standard FHE</span>
                  <span>~1.2M Gas</span>
                </div>
                <div className="w-full bg-gray-700 h-3 rounded-full overflow-hidden">
                  <div className="bg-gray-500 h-full w-full"></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs text-white font-bold mb-1">
                  <span>Optimized Hook</span>
                  <span className="text-primary">~450k Gas</span>
                </div>
                <div className="w-full bg-gray-700 h-3 rounded-full overflow-hidden">
                  <div className="bg-primary h-full w-[35%]"></div>
                </div>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2 text-xs text-green-400">
              <span className="material-symbols-outlined text-[16px]">trending_down</span>
              62% Reduction in overhead
            </div>
          </div>
          
          {/* Metric 3: Security */}
          <div className="bg-surface-dark rounded-2xl p-8 border border-[#282b39] flex flex-col items-center justify-center text-center">
            <div className="h-16 w-16 bg-blue-500/10 rounded-full flex items-center justify-center text-primary mb-4">
              <span className="material-symbols-outlined text-[32px]">verified_user</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Double Audited</h3>
            <p className="text-[#9da1b9] text-sm mb-6">Smart contracts and ZK circuits audited by top-tier firms.</p>
            <div className="flex gap-2">
              <span className="px-3 py-1 bg-background-dark border border-[#282b39] rounded text-xs font-mono text-gray-400">Trail of Bits</span>
              <span className="px-3 py-1 bg-background-dark border border-[#282b39] rounded text-xs font-mono text-gray-400">OpenZeppelin</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

