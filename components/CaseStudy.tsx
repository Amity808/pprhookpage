export default function CaseStudy() {
  return (
    <div className="relative flex w-full flex-col bg-surface-dark border-y border-[#282b39]" id="roi">
      <div className="px-5 md:px-10 lg:px-40 flex flex-1 justify-center py-20">
        <div className="flex flex-col max-w-[1200px] flex-1">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="flex-1 order-2 lg:order-1">
              <div className="bg-background-dark border border-[#3b3f54] rounded-2xl p-6 md:p-10 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-20">
                  <span className="material-symbols-outlined text-[120px] text-primary">trending_up</span>
                </div>
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="h-10 w-10 rounded bg-white flex items-center justify-center">
                      {/* Placeholder logo */}
                      <div className="h-6 w-6 bg-black rounded-full"></div>
                    </div>
                    <span className="text-gray-400 font-mono text-sm">CASE STUDY: ALPHA FUND</span>
                  </div>
                  <div className="flex items-baseline gap-2 mb-2">
                    <h3 className="text-6xl font-black text-white tracking-tight">831%</h3>
                    <span className="text-green-500 font-bold text-xl flex items-center">
                      <span className="material-symbols-outlined text-[24px]">arrow_upward</span>
                      ROI
                    </span>
                  </div>
                  <p className="text-gray-400 mb-8">First-year return improvement vs. public execution</p>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center py-3 border-b border-[#3b3f54]">
                      <span className="text-gray-300">MEV Protection Saved</span>
                      <span className="text-white font-bold">$1.2M</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-[#3b3f54]">
                      <span className="text-gray-300">Gas Optimization</span>
                      <span className="text-white font-bold">-40% Costs</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-transparent">
                      <span className="text-gray-300">Strategy Alpha Retained</span>
                      <span className="text-white font-bold">100%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex-1 flex flex-col gap-6 order-1 lg:order-2">
              <div className="inline-flex w-fit items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-500 text-xs font-bold uppercase tracking-wide">
                Proven Results
              </div>
              <h2 className="text-white text-3xl md:text-4xl font-bold leading-tight">
                Institutional Performance, <br/>
                <span className="text-primary">Defended by Math.</span>
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed">
                See how leading hedge funds are using Umbra finance to execute large-scale portfolio adjustments without tipping their hand to the market.
              </p>
              <button className="flex w-fit items-center justify-center rounded-lg h-12 px-6 bg-white text-black hover:bg-gray-100 transition-colors font-bold mt-2">
                Read the Full Case Study
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

