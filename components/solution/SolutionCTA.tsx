export default function SolutionCTA() {
  return (
    <section className="w-full py-24 px-6 bg-gradient-to-b from-background-dark to-primary/10">
      <div className="mx-auto max-w-[800px] text-center">
        <h2 className="text-4xl font-bold text-white mb-6">Stop leaking alpha today.</h2>
        <p className="text-lg text-[#9da1b9] mb-10">Join the leading institutions moving their rebalancing logic to a confidential on-chain environment.</p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a
            href="https://calendly.com/bolarinwamuhdsodiq0/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="h-14 px-8 rounded-lg bg-primary text-white text-lg font-bold hover:bg-primary-dark transition shadow-lg shadow-primary/25 flex items-center justify-center"
          >
            Schedule Technical Demo
          </a>
          <button className="h-14 px-8 rounded-lg bg-surface-dark border border-[#282b39] text-white text-lg font-bold hover:bg-[#282b39] transition">
            Read the Documentation
          </button>
        </div>

        <div className="mt-12 flex justify-center gap-8 grayscale opacity-50">
          {/* Trust indicators */}
          <div className="h-8 w-24 bg-white/20 rounded"></div>
          <div className="h-8 w-24 bg-white/20 rounded"></div>
          <div className="h-8 w-24 bg-white/20 rounded"></div>
          <div className="h-8 w-24 bg-white/20 rounded"></div>
        </div>
      </div>
    </section>
  );
}

