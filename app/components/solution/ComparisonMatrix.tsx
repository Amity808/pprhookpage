export default function ComparisonMatrix() {
  return (
    <section className="w-full py-20 px-6 bg-background-dark">
      <div className="mx-auto max-w-[1024px]">
        <h2 className="text-3xl font-bold text-white text-center mb-12">Why We Win</h2>
        
        <div className="overflow-x-auto rounded-xl border border-[#282b39]">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-dark border-b border-[#282b39] text-sm uppercase tracking-wider text-[#9da1b9]">
                <th className="p-4 md:p-6 font-medium">Feature</th>
                <th className="p-4 md:p-6 font-bold text-white bg-primary/10 border-l border-r border-primary/20">ConfidentialRebalancingHook</th>
                <th className="p-4 md:p-6 font-medium">Traditional Rebalancing</th>
                <th className="p-4 md:p-6 font-medium">ZK Solutions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#282b39] text-sm md:text-base text-gray-300">
              <tr className="bg-background-dark hover:bg-surface-dark/50">
                <td className="p-4 md:p-6 font-semibold">MEV Protection</td>
                <td className="p-4 md:p-6 text-primary bg-primary/5 border-l border-r border-primary/20">
                  <span className="material-symbols-outlined align-middle mr-1">check_circle</span>
                  Complete
                </td>
                <td className="p-4 md:p-6 text-gray-500">None</td>
                <td className="p-4 md:p-6 text-yellow-500">Partial</td>
              </tr>
              
              <tr className="bg-background-dark hover:bg-surface-dark/50">
                <td className="p-4 md:p-6 font-semibold">Execution Privacy</td>
                <td className="p-4 md:p-6 text-primary bg-primary/5 border-l border-r border-primary/20">
                  <span className="material-symbols-outlined align-middle mr-1">check_circle</span>
                  FHE Encrypted
                </td>
                <td className="p-4 md:p-6 text-gray-500">Public</td>
                <td className="p-4 md:p-6 text-white">Private</td>
              </tr>
              
              <tr className="bg-background-dark hover:bg-surface-dark/50">
                <td className="p-4 md:p-6 font-semibold">State Management</td>
                <td className="p-4 md:p-6 text-primary bg-primary/5 border-l border-r border-primary/20">
                  <span className="material-symbols-outlined align-middle mr-1">check_circle</span>
                  Shared (Easy)
                </td>
                <td className="p-4 md:p-6 text-white">Shared</td>
                <td className="p-4 md:p-6 text-red-400">Fragmented (Hard)</td>
              </tr>
              
              <tr className="bg-background-dark hover:bg-surface-dark/50">
                <td className="p-4 md:p-6 font-semibold">Latency</td>
                <td className="p-4 md:p-6 text-primary bg-primary/5 border-l border-r border-primary/20">
                  <span className="material-symbols-outlined align-middle mr-1">check_circle</span>
                  ~2s (Optimistic)
                </td>
                <td className="p-4 md:p-6 text-white">~12s</td>
                <td className="p-4 md:p-6 text-red-400">~10-20 mins</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

