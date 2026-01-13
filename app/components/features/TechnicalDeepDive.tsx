export default function TechnicalDeepDive() {
  return (
    <section id="deep-dive">
      <h2 className="text-3xl font-bold text-white mb-8">Technical Deep Dive</h2>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Column: Navigation/Explanation */}
        <div className="lg:w-1/3 space-y-6">
          <div className="p-6 rounded-xl bg-surface-dark border border-primary/30 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-primary"></div>
            <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">architecture</span>
              Uniswap v4 Hook Architecture
            </h3>
            <p className="text-[#9da1b9] text-sm mb-4">
              Our hook intercepts the `beforeSwap` and `afterSwap` triggers. It utilizes transient storage (EIP-1153) to manage encrypted state during the transaction lifecycle, ensuring minimal gas impact while maintaining privacy guarantees.
            </p>
            <a className="text-primary text-sm font-bold flex items-center gap-1 hover:gap-2 transition-all" href="#">
              View Contract Code <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </a>
          </div>
          
          <div className="p-6 rounded-xl bg-surface-dark border border-[#282b39] hover:border-[#282b39]/80 opacity-80 hover:opacity-100 transition-opacity">
            <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
              <span className="material-symbols-outlined text-gray-400">enhanced_encryption</span>
              FHE Integration
            </h3>
            <p className="text-[#9da1b9] text-sm">
              We utilize tfhe-rs bindings compiled to WASM for off-chain encryption and Zama's fhEVM libraries for on-chain homomorphic operations.
            </p>
          </div>
        </div>
        
        {/* Right Column: Architecture Diagram / Visual */}
        <div className="lg:w-2/3 bg-[#0d0e14] rounded-xl border border-[#282b39] p-6 relative overflow-hidden">
          {/* Placeholder for schematic */}
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/graphy.png')] opacity-10"></div>
          
          <div className="relative z-10 flex flex-col gap-8 items-center justify-center h-full min-h-[400px]">
            {/* Flow Diagram CSS Representation */}
            <div className="flex flex-col md:flex-row items-center gap-4 w-full justify-center">
              {/* User Node */}
              <div className="flex flex-col items-center gap-2">
                <div className="bg-surface-dark p-4 rounded-lg border border-[#282b39] text-white shadow-lg text-center w-32">
                  <span className="material-symbols-outlined mb-1">person</span>
                  <div className="text-xs font-bold">User</div>
                  <div className="text-[10px] text-gray-500">Encrypted Input</div>
                </div>
              </div>
              
              {/* Arrow */}
              <div className="hidden md:flex flex-col items-center">
                <div className="text-[10px] text-gray-500 mb-1">Signed Tx</div>
                <div className="h-[1px] w-12 bg-gray-600"></div>
              </div>
              <div className="md:hidden h-8 w-[1px] bg-gray-600"></div>
              
              {/* Hook Node */}
              <div className="bg-primary/10 p-4 rounded-lg border border-primary text-white shadow-lg shadow-primary/10 text-center w-40">
                <span className="material-symbols-outlined mb-1 text-primary">webhook</span>
                <div className="text-xs font-bold">Hook Contract</div>
                <div className="text-[10px] text-primary/70">Homomorphic Calc</div>
              </div>
              
              {/* Arrow */}
              <div className="hidden md:flex flex-col items-center">
                <div className="text-[10px] text-gray-500 mb-1">Deltas</div>
                <div className="h-[1px] w-12 bg-gray-600"></div>
              </div>
              <div className="md:hidden h-8 w-[1px] bg-gray-600"></div>
              
              {/* Pool Node */}
              <div className="bg-surface-dark p-4 rounded-lg border border-[#282b39] text-white shadow-lg text-center w-32">
                <span className="material-symbols-outlined mb-1">water_drop</span>
                <div className="text-xs font-bold">Uniswap Pool</div>
                <div className="text-[10px] text-gray-500">Liquidity Swap</div>
              </div>
            </div>
            
            {/* Data Flow Description */}
            <div className="bg-black/30 p-4 rounded-lg border border-dashed border-gray-700 max-w-lg">
              <div className="text-xs font-mono text-gray-400">
                <span className="text-primary">&gt;&gt;</span> function beforeSwap(sender, key, params, hookData) external override returns (bytes4)<br/>
                <span className="text-primary">&gt;&gt;</span> // Decrypts params using FHE Oracle<br/>
                <span className="text-primary">&gt;&gt;</span> // Validates rebalance logic<br/>
                <span className="text-primary">&gt;&gt;</span> return IPoolManager.beforeSwap.selector;
              </div>
            </div>
          </div>
          
          <div className="absolute bottom-4 right-4 text-xs text-gray-600 font-mono">Architecture Overview v1.2</div>
        </div>
      </div>
    </section>
  );
}

