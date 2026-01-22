export default function FeaturesCTA() {
  return (
    <section className="rounded-2xl bg-gradient-to-r from-primary to-blue-800 p-12 text-center relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 mix-blend-overlay"></div>
      
      <div className="relative z-10 flex flex-col items-center gap-6">
        <h2 className="text-3xl md:text-4xl font-black text-white">Ready to deploy institutional strategies?</h2>
        <p className="text-blue-100 max-w-xl text-lg">Integrate the Umbra finance into your asset management workflow today. Open source and audit-ready.</p>
        
        <div className="flex gap-4">
          <button className="bg-white text-primary hover:bg-gray-100 transition-colors text-base font-bold px-8 py-3 rounded-lg shadow-lg">
            Get Started
          </button>
          <button className="bg-blue-900/50 text-white hover:bg-blue-900 transition-colors text-base font-bold px-8 py-3 rounded-lg border border-white/20">
            Read Whitepaper
          </button>
        </div>
      </div>
    </section>
  );
}

