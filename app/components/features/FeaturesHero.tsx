export default function FeaturesHero() {
  return (
    <section className="relative w-full py-20 px-4 flex flex-col items-center justify-center bg-background-dark border-b border-[#282b39] overflow-hidden">
      {/* Abstract Background */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none" style={{backgroundImage: "radial-gradient(circle at 50% 50%, #1337ec 0%, transparent 50%)"}}></div>
      <div className="absolute inset-0 z-0 opacity-10" style={{backgroundImage: "url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%239C92AC\' fill-opacity=\'0.4\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')"}}></div>
      
      <div className="relative z-10 text-center max-w-4xl mx-auto flex flex-col items-center gap-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-dark border border-[#282b39] text-xs font-medium text-primary mb-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
          </span>
          Uniswap v4 Production Ready
        </div>
        
        <h1 className="text-4xl md:text-6xl font-black text-white leading-tight tracking-tight">
          Confidential <span className="text-primary">Execution</span> Features
        </h1>
        
        <p className="text-[#9da1b9] text-lg md:text-xl max-w-2xl leading-relaxed">
          Discover the institutional-grade capabilities enabling private, multi-asset rebalancing strategies directly on-chain using Fully Homomorphic Encryption (FHE).
        </p>
        
        <div className="flex flex-wrap gap-4 mt-4">
          <button className="bg-surface-dark border border-[#282b39] hover:border-primary text-white font-medium py-3 px-6 rounded-lg transition-all flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px]">description</span>
            Technical Documentation
          </button>
          <button className="bg-surface-dark border border-[#282b39] hover:border-primary text-white font-medium py-3 px-6 rounded-lg transition-all flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px]">security</span>
            Security Audit
          </button>
        </div>
      </div>
    </section>
  );
}

