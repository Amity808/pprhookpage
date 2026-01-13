export default function ProofPoints() {
  return (
    <section className="w-full py-16 px-6 bg-background-dark">
      <div className="mx-auto max-w-[1280px]">
        <h2 className="text-2xl font-bold text-white text-center mb-10">Production-Ready Proof Points</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="p-6 text-center bg-surface-dark rounded-xl border border-[#282b39]">
            <div className="text-3xl md:text-4xl font-black text-primary mb-2">100%</div>
            <div className="text-sm text-[#9da1b9] font-medium uppercase">Test Coverage</div>
          </div>
          
          <div className="p-6 text-center bg-surface-dark rounded-xl border border-[#282b39]">
            <div className="text-3xl md:text-4xl font-black text-white mb-2">&lt;5s</div>
            <div className="text-sm text-[#9da1b9] font-medium uppercase">Execution Latency</div>
          </div>
          
          <div className="p-6 text-center bg-surface-dark rounded-xl border border-[#282b39]">
            <div className="text-3xl md:text-4xl font-black text-white mb-2">2</div>
            <div className="text-sm text-[#9da1b9] font-medium uppercase">Major Audits</div>
          </div>
          
          <div className="p-6 text-center bg-surface-dark rounded-xl border border-[#282b39]">
            <div className="text-3xl md:text-4xl font-black text-primary mb-2">$0</div>
            <div className="text-sm text-[#9da1b9] font-medium uppercase">Lost to MEV</div>
          </div>
        </div>
      </div>
    </section>
  );
}

