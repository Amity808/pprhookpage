export default function BreakthroughSection() {
  return (
    <section className="w-full py-20 px-6 bg-background-dark border-y border-[#282b39]/50">
      <div className="mx-auto max-w-[1280px]">
        <div className="flex flex-col md:flex-row gap-12 items-start">
          <div className="md:w-1/3 flex flex-col gap-4 sticky top-24">
            <h2 className="text-3xl font-bold text-white tracking-tight">Breakthrough: Three Technologies Converge</h2>
            <p className="text-[#9da1b9]">
              Umbra finance sits at the intersection of three major technological shifts, creating a unique opportunity for institutional alpha.
            </p>
          </div>
          
          <div className="md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Card 1 */}
            <div className="group p-6 rounded-xl border border-[#282b39] bg-surface-dark hover:border-primary/50 transition duration-300">
              <div className="h-10 w-10 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center mb-4 group-hover:bg-blue-500 group-hover:text-white transition">
                <span className="material-symbols-outlined">extension</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Uniswap v4 Hooks</h3>
              <p className="text-sm text-[#9da1b9]">Custom logic execution at the pool level enables native compliance and complex rebalancing strategies without leaving the AMM.</p>
            </div>
            
            {/* Card 2 */}
            <div className="group p-6 rounded-xl border border-[#282b39] bg-surface-dark hover:border-primary/50 transition duration-300">
              <div className="h-10 w-10 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center mb-4 group-hover:bg-purple-500 group-hover:text-white transition">
                <span className="material-symbols-outlined">enhanced_encryption</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Fhenix FHE Network</h3>
              <p className="text-sm text-[#9da1b9]">Fully Homomorphic Encryption allows computation on encrypted data, keeping trade intent secret until execution.</p>
            </div>
            
            {/* Card 3 */}
            <div className="group p-6 rounded-xl border border-[#282b39] bg-surface-dark hover:border-primary/50 transition duration-300 sm:col-span-2">
              <div className="h-10 w-10 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-4 group-hover:bg-emerald-500 group-hover:text-white transition">
                <span className="material-symbols-outlined">corporate_fare</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Institutional Adoption</h3>
              <p className="text-sm text-[#9da1b9]">Regulatory clarity and demand for on-chain privacy are driving the next wave of capital migration, requiring tools that match TradFi standards.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

