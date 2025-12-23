export default function Problem() {
  return (
    <div className="relative flex w-full flex-col bg-surface-dark border-y border-[#282b39]" id="problem">
      <div className="px-5 md:px-10 lg:px-40 flex flex-1 justify-center py-20">
        <div className="flex flex-col max-w-[1200px] flex-1">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="flex flex-col gap-6">
              <h2 className="text-white text-3xl md:text-4xl font-bold leading-tight">
                The <span className="text-red-500">$6.2M</span> Annual Problem
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed">
                Institutional portfolios lose millions annually to MEV, sandwich attacks, and strategy exposure on public ledgers. Standard rebalancing broadcasts your intent to the entire market before execution.
              </p>
              <p className="text-gray-400 text-lg leading-relaxed">
                Our FHE solution reclaims this value by keeping your strategy logic and amounts confidential until settlement.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <div className="flex items-center gap-3 p-4 rounded-lg bg-background-dark border border-[#3b3f54]">
                  <span className="material-symbols-outlined text-red-500 text-[28px]">trending_down</span>
                  <div>
                    <div className="text-sm text-gray-400">Avg. Slippage Loss</div>
                    <div className="text-white font-bold">45 bps / trade</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 rounded-lg bg-background-dark border border-[#3b3f54]">
                  <span className="material-symbols-outlined text-red-500 text-[28px]">visibility</span>
                  <div>
                    <div className="text-sm text-gray-400">Strategy Leaks</div>
                    <div className="text-white font-bold">100% Public</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative rounded-xl overflow-hidden bg-background-dark border border-[#3b3f54] p-8 flex flex-col items-center justify-center min-h-[320px]">
              {/* Decorative chart visual */}
              <div className="w-full h-full flex items-end justify-between gap-2 opacity-50 absolute bottom-0 left-0 px-8 pb-8">
                <div className="w-full bg-red-500/10 h-[40%] rounded-t-sm"></div>
                <div className="w-full bg-red-500/20 h-[60%] rounded-t-sm"></div>
                <div className="w-full bg-red-500/30 h-[30%] rounded-t-sm"></div>
                <div className="w-full bg-red-500/40 h-[80%] rounded-t-sm"></div>
                <div className="w-full bg-red-500/50 h-[50%] rounded-t-sm"></div>
              </div>
              <div className="relative z-10 text-center">
                <h3 className="text-5xl font-black text-white mb-2 tracking-tight">$6,200,000</h3>
                <p className="text-red-400 font-medium">Lost annually to MEV & Front-running</p>
                <div className="mt-6 inline-block px-4 py-2 bg-red-500/10 text-red-400 text-sm font-bold rounded border border-red-500/20">
                  WITHOUT PRIVACY
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

