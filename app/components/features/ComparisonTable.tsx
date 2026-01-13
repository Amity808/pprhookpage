export default function ComparisonTable() {
  return (
    <section id="comparison">
      <h2 className="text-3xl font-bold text-white mb-8 text-center">Why Confidential Rebalancing?</h2>
      
      <div className="overflow-x-auto rounded-xl border border-[#282b39] bg-surface-dark">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#15161e] border-b border-[#282b39]">
              <th className="p-6 text-sm font-bold text-gray-400 uppercase tracking-wider w-1/4">Feature</th>
              <th className="p-6 text-sm font-bold text-primary uppercase tracking-wider w-1/4 bg-primary/5 border-t-2 border-t-primary">ConfidentialHook</th>
              <th className="p-6 text-sm font-bold text-gray-400 uppercase tracking-wider w-1/4">Standard AMM</th>
              <th className="p-6 text-sm font-bold text-gray-400 uppercase tracking-wider w-1/4">OTC Desk / CEX</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#282b39]">
            <tr className="hover:bg-white/5 transition-colors">
              <td className="p-6 text-white font-medium flex items-center gap-2">
                <span className="material-symbols-outlined text-gray-500">visibility_off</span>
                Trade Privacy
              </td>
              <td className="p-6 text-white bg-primary/5 font-bold">Fully Encrypted (FHE)</td>
              <td className="p-6 text-gray-400">Public Mempool</td>
              <td className="p-6 text-gray-400">Private but Trusted</td>
            </tr>
            <tr className="hover:bg-white/5 transition-colors">
              <td className="p-6 text-white font-medium flex items-center gap-2">
                <span className="material-symbols-outlined text-gray-500">savings</span>
                Custody
              </td>
              <td className="p-6 text-white bg-primary/5 font-bold">Self-Custodial</td>
              <td className="p-6 text-gray-400">Self-Custodial</td>
              <td className="p-6 text-gray-400">Custodial Risk</td>
            </tr>
            <tr className="hover:bg-white/5 transition-colors">
              <td className="p-6 text-white font-medium flex items-center gap-2">
                <span className="material-symbols-outlined text-gray-500">trending_up</span>
                Slippage Impact
              </td>
              <td className="p-6 text-white bg-primary/5 font-bold">Minimized (No Frontrunning)</td>
              <td className="p-6 text-gray-400">High (MEV Vulnerable)</td>
              <td className="p-6 text-gray-400">Low</td>
            </tr>
            <tr className="hover:bg-white/5 transition-colors">
              <td className="p-6 text-white font-medium flex items-center gap-2">
                <span className="material-symbols-outlined text-gray-500">verified</span>
                Auditability
              </td>
              <td className="p-6 text-white bg-primary/5 font-bold">ZK Proofs + View Keys</td>
              <td className="p-6 text-gray-400">Fully Public</td>
              <td className="p-6 text-gray-400">Black Box</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}

