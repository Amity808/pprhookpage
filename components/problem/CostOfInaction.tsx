export default function CostOfInaction() {
  return (
    <section className="py-24 px-4 md:px-10 lg:px-40 bg-background-dark relative">
      <div className="max-w-[960px] mx-auto text-center">
        <h2 className="text-3xl font-bold text-white mb-6">The Cost of Inaction</h2>
        <p className="text-slate-400 mb-12 max-w-2xl mx-auto">
          Continuing to trade large size on transparent ledgers is a strategic error that compounds over time.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          <div className="relative p-6 border-l-2 border-primary bg-gradient-to-r from-primary/10 to-transparent">
            <span className="text-xs font-bold text-primary uppercase mb-2 block">Short Term (Now)</span>
            <h3 className="text-white font-bold mb-2">Bleeding Yield</h3>
            <p className="text-sm text-slate-400">You continue to pay a "transparency tax" of 1-3% on every major rebalancing event.</p>
          </div>

          <div className="relative p-6 border-l-2 border-orange-500 bg-gradient-to-r from-orange-500/10 to-transparent">
            <span className="text-xs font-bold text-orange-500 uppercase mb-2 block">Medium Term (6-12m)</span>
            <h3 className="text-white font-bold mb-2">LP Exodus</h3>
            <p className="text-sm text-slate-400">Underperformance vs. benchmarks leads LPs to redeem capital and move to more sophisticated funds.</p>
          </div>

          <div className="relative p-6 border-l-2 border-red-600 bg-gradient-to-r from-red-600/10 to-transparent">
            <span className="text-xs font-bold text-red-600 uppercase mb-2 block">Long Term (2y+)</span>
            <h3 className="text-white font-bold mb-2">Obsolescence</h3>
            <p className="text-sm text-slate-400">As privacy becomes standard for institutions, fully transparent funds will be viewed as negligent.</p>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center gap-6">
          <h3 className="text-2xl font-bold text-white">Stop the Leakage. Start Executing Confidentially.</h3>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <button className="flex min-w-[200px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-6 bg-primary hover:bg-blue-600 transition-all text-white text-base font-bold leading-normal tracking-[0.015em]">
              View Our Solution
            </button>
            <a
              href="https://calendly.com/bolarinwamuhdsodiq0/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-w-[200px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-6 border border-white/20 hover:bg-white/5 transition-all text-white text-base font-bold leading-normal tracking-[0.015em]"
            >
              Schedule a Demo
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

