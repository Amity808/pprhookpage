export default function SolutionsFail() {
  return (
    <section className="py-20 px-4 md:px-10 lg:px-40 bg-[#0f1119] border-t border-[#282b39]">
      <div className="max-w-[1280px] mx-auto">
        <h2 className="text-3xl font-bold text-white mb-10 text-center">Why Current Solutions Fail</h2>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="p-4 border-b border-[#282b39] text-slate-500 text-xs uppercase tracking-wider font-bold w-1/4">Solution</th>
                <th className="p-4 border-b border-[#282b39] text-slate-500 text-xs uppercase tracking-wider font-bold w-1/3">The Drawback</th>
                <th className="p-4 border-b border-[#282b39] text-primary text-xs uppercase tracking-wider font-bold w-1/3">The FHE Advantage</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              <tr className="group hover:bg-white/5 transition-colors">
                <td className="p-4 border-b border-[#282b39] text-white font-bold">ZK-Rollups (Privacy)</td>
                <td className="p-4 border-b border-[#282b39] text-slate-400">High computational overhead, trusted setups often required, fragmented liquidity.</td>
                <td className="p-4 border-b border-[#282b39] text-white">Direct execution on Uniswap v4 liquidity with encrypted state.</td>
              </tr>
              
              <tr className="group hover:bg-white/5 transition-colors">
                <td className="p-4 border-b border-[#282b39] text-white font-bold">Dark Pools</td>
                <td className="p-4 border-b border-[#282b39] text-slate-400">Low liquidity, high trust in centralized operator, difficult to audit.</td>
                <td className="p-4 border-b border-[#282b39] text-white">Access to deep, public liquidity while keeping intent private.</td>
              </tr>
              
              <tr className="group hover:bg-white/5 transition-colors">
                <td className="p-4 border-b border-[#282b39] text-white font-bold">Optimistic Privacy</td>
                <td className="p-4 border-b border-[#282b39] text-slate-400">Long challenge periods (7 days), not suitable for active trading.</td>
                <td className="p-4 border-b border-[#282b39] text-white">Instant settlement with mathematical privacy guarantees.</td>
              </tr>
              
              <tr className="group hover:bg-white/5 transition-colors">
                <td className="p-4 border-b border-[#282b39] text-white font-bold">Private OTC Desks</td>
                <td className="p-4 border-b border-[#282b39] text-slate-400">Wide spreads, counterparty risk, manual negotiation processes.</td>
                <td className="p-4 border-b border-[#282b39] text-white">Automated, atomic on-chain execution without human intermediaries.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

