export default function ConfidentialExecution() {
  return (
    <section id="confidential-execution">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
        <div className="max-w-xl">
          <h2 className="text-primary font-bold tracking-wider uppercase text-sm mb-2">Core Technology</h2>
          <h3 className="text-3xl font-bold text-white mb-4">Confidential Execution</h3>
          <p className="text-[#9da1b9]">Execute complex rebalancing strategies without revealing trade sizes, target allocations, or current portfolio composition to the public mempool.</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Card 1 */}
        <div className="group p-6 rounded-xl bg-surface-dark border border-[#282b39] hover:border-primary/50 transition-all duration-300">
          <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
            <span className="material-symbols-outlined">lock_person</span>
          </div>
          <h4 className="text-white text-lg font-bold mb-2">Encrypted Target Allocations</h4>
          <p className="text-[#9da1b9] text-sm leading-relaxed">Define portfolio targets using encrypted states. Only the strategy owner holds the decryption key, keeping long-term intent private.</p>
        </div>
        
        {/* Card 2 */}
        <div className="group p-6 rounded-xl bg-surface-dark border border-[#282b39] hover:border-primary/50 transition-all duration-300">
          <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
            <span className="material-symbols-outlined">calculate</span>
          </div>
          <h4 className="text-white text-lg font-bold mb-2">Private Position Computation</h4>
          <p className="text-[#9da1b9] text-sm leading-relaxed">Compute rebalancing needs on-chain using FHE. The contract calculates the difference between current and target states without decrypting either.</p>
        </div>
        
        {/* Card 3 */}
        <div className="group p-6 rounded-xl bg-surface-dark border border-[#282b39] hover:border-primary/50 transition-all duration-300">
          <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
            <span className="material-symbols-outlined">currency_exchange</span>
          </div>
          <h4 className="text-white text-lg font-bold mb-2">Homomorphic Trade Deltas</h4>
          <p className="text-[#9da1b9] text-sm leading-relaxed">Trade amounts are derived homomorphically. Swaps occur against the pool with encrypted input amounts, ensuring privacy throughout execution.</p>
        </div>
        
        {/* Card 4 */}
        <div className="group p-6 rounded-xl bg-surface-dark border border-[#282b39] hover:border-primary/50 transition-all duration-300">
          <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
            <span className="material-symbols-outlined">visibility_off</span>
          </div>
          <h4 className="text-white text-lg font-bold mb-2">Zero-Knowledge Operations</h4>
          <p className="text-[#9da1b9] text-sm leading-relaxed">Verify the validity of rebalancing logic and solvency constraints using ZK proofs without revealing the underlying data points.</p>
        </div>
      </div>
    </section>
  );
}

