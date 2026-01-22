export default function Features() {
  const features = [
    {
      icon: "enhanced_encryption",
      title: "Confidential Execution",
      description: "Your transaction inputs, outputs, and strategy parameters remain encrypted from submission to settlement.",
    },
    {
      icon: "apartment",
      title: "Institutional Grade",
      description: "Designed for high-frequency and high-value portfolios. Compliant architecture with audit trails.",
    },
    {
      icon: "rocket_launch",
      title: "Production Ready",
      description: "Fully audited smart contracts and ZK circuits. Deployed on mainnet and ready for integration.",
    },
  ];

  return (
    <div className="relative flex w-full flex-col bg-background-dark py-20" id="features">
      <div className="px-5 md:px-10 lg:px-40 flex flex-1 justify-center">
        <div className="flex flex-col max-w-[1200px] flex-1">
          <div className="text-center mb-16">
            <h2 className="text-white text-3xl md:text-4xl font-bold mb-4">Why Choose ConfidentialHook?</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="group bg-card-gradient border border-[#3b3f54] hover:border-primary/50 bg-[#1c1d27] p-8 rounded-xl transition-all duration-300 hover:-translate-y-1">
                <div className="size-12 rounded-lg bg-primary/20 text-primary flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                  <span className="material-symbols-outlined text-[28px]">{feature.icon}</span>
                </div>
                <h3 className="text-white text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

