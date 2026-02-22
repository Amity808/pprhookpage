export default function SolutionHero() {
  return (
    <section className="relative w-full overflow-hidden px-6 py-16 md:py-24 lg:py-32 bg-background-dark">
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 -mr-40 -mt-40 h-[600px] w-[600px] rounded-full bg-primary/10 blur-[100px]"></div>

      <div className="mx-auto max-w-[1280px] grid lg:grid-cols-2 gap-12 items-center relative z-10">
        <div className="flex flex-col gap-6">
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-[#282b39] bg-surface-dark px-3 py-1">
            <span className="flex h-2 w-2 rounded-full bg-green-500"></span>
            <span className="text-xs font-medium text-white">v1.0 Production Ready</span>
          </div>

          <h1 className="text-4xl font-black leading-tight tracking-tight text-white md:text-5xl lg:text-6xl">
            The Only Solution Without Trade-offs: <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-primary">Umbra Finance</span> on Uniswap v4
          </h1>

          <p className="text-lg text-[#9da1b9] max-w-xl">
            Eliminate $6.2M+ in annual slippage and MEV losses. The first hook enabling institutional-grade confidential multi-asset rebalancing using Fully Homomorphic Encryption (FHE).
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            <a
              href="https://calendly.com/bolarinwamuhdsodiq0/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="h-12 px-8 rounded-lg bg-primary text-white font-bold hover:bg-primary-dark transition flex items-center gap-2"
            >
              <span>Schedule a Demo</span>
              <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
            </a>
            <button className="h-12 px-8 rounded-lg border border-[#282b39] bg-surface-dark text-white font-bold hover:bg-[#282b39] transition">
              View Case Studies
            </button>
          </div>
        </div>

        <div className="relative w-full aspect-square md:aspect-video lg:aspect-square lg:h-auto rounded-2xl overflow-hidden border border-[#282b39] bg-surface-dark shadow-2xl group">
          {/* Abstract representation of encrypted data streams */}
          <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBt7Wh8XknDwYnpGIdK3lsM-IOOnGUt0S0WIUaO9cWGqvsXmudfL9S8WGmrXEPcp-J1jchkS1mLmcOxaqDPE0L5qlMin368IbjI0gYgmHurWxsYTN9r0XalxtGRu7oYXogAUfEWkZOsKqRgnC0EXNtnAUigtPekA2PBIUFM2-6hRzOZitf0GXhYfWo1RiY3wptsBouYcemGTRDRANoR4KJaJdGQ8l85TKxBQ8qoRoEI0u3vnyYQnT449twPH77DpTu6ROAeQO3AxgE")' }}></div>
          <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-transparent to-transparent"></div>

          {/* Floating Data Card Overlay */}
          <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-background-dark/90 border border-[#282b39] backdrop-blur-md">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-mono text-[#9da1b9]">REBALANCING STATUS</span>
              <span className="text-xs font-bold text-green-400 flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">lock</span>
                ENCRYPTED
              </span>
            </div>
            <div className="h-2 w-full bg-[#282b39] rounded-full overflow-hidden">
              <div className="h-full bg-primary w-[75%]"></div>
            </div>
            <div className="flex justify-between mt-2 text-xs text-white font-mono">
              <span>Target: Hidden</span>
              <span>Slippage: 0.01%</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

