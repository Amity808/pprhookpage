export default function SolvingProblems() {
  return (
    <section className="w-full py-20 px-6 bg-surface-dark border-y border-[#282b39]/50">
      <div className="mx-auto max-w-[1280px]">
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">Solving Each Problem Systematically</h2>
          <p className="text-[#9da1b9]">We address the four pillars of value leakage in institutional DeFi.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Problem 1 */}
          <div className="bg-background-dark border border-[#282b39] rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="material-symbols-outlined text-red-500">content_copy</span>
              <h3 className="text-xl font-bold text-white">Copycat Trading</h3>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="p-4 bg-red-900/10 border border-red-900/30 rounded-lg">
                <span className="block text-red-400 font-bold mb-1">Before</span>
                <p className="text-gray-400">Public mempool reveals strategy. Alpha decays in hours.</p>
              </div>
              <div className="p-4 bg-green-900/10 border border-green-900/30 rounded-lg">
                <span className="block text-green-400 font-bold mb-1">After</span>
                <p className="text-gray-400">Intent encrypted. Strategy alpha preserved for months.</p>
              </div>
            </div>
          </div>
          
          {/* Problem 2 */}
          <div className="bg-background-dark border border-[#282b39] rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="material-symbols-outlined text-red-500">flash_on</span>
              <h3 className="text-xl font-bold text-white">MEV Losses</h3>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="p-4 bg-red-900/10 border border-red-900/30 rounded-lg">
                <span className="block text-red-400 font-bold mb-1">Before</span>
                <p className="text-gray-400">Sandwich attacks cost 0.5% - 2% per large rebalance.</p>
              </div>
              <div className="p-4 bg-green-900/10 border border-green-900/30 rounded-lg">
                <span className="block text-green-400 font-bold mb-1">After</span>
                <p className="text-gray-400">Zero visibility for searchers. 0% loss to MEV.</p>
              </div>
            </div>
          </div>
          
          {/* Problem 3 */}
          <div className="bg-background-dark border border-[#282b39] rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="material-symbols-outlined text-red-500">shield</span>
              <h3 className="text-xl font-bold text-white">Compliance Trade-off</h3>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="p-4 bg-red-900/10 border border-red-900/30 rounded-lg">
                <span className="block text-red-400 font-bold mb-1">Before</span>
                <p className="text-gray-400">Choice between KYC pools (low liquidity) or permissionless (risk).</p>
              </div>
              <div className="p-4 bg-green-900/10 border border-green-900/30 rounded-lg">
                <span className="block text-green-400 font-bold mb-1">After</span>
                <p className="text-gray-400">Access deep liquidity while proving compliance selectively.</p>
              </div>
            </div>
          </div>
          
          {/* Problem 4 */}
          <div className="bg-background-dark border border-[#282b39] rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="material-symbols-outlined text-red-500">schedule</span>
              <h3 className="text-xl font-bold text-white">Timing Attacks</h3>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="p-4 bg-red-900/10 border border-red-900/30 rounded-lg">
                <span className="block text-red-400 font-bold mb-1">Before</span>
                <p className="text-gray-400">Predictable periodic rebalancing exploited by market makers.</p>
              </div>
              <div className="p-4 bg-green-900/10 border border-green-900/30 rounded-lg">
                <span className="block text-green-400 font-bold mb-1">After</span>
                <p className="text-gray-400">Randomized execution windows mask patterns.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

