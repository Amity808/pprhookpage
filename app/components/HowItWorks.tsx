export default function HowItWorks() {
  const steps = [
    {
      icon: "lock",
      title: "Encrypted Balances",
      description: "User balances and strategy parameters are encrypted on the client side using FHE public keys. The encrypted ciphertext is submitted to the blockchain.",
      color: "primary",
    },
    {
      icon: "database",
      title: "Off-chain Compute",
      description: "Relayers perform complex rebalancing calculations on the encrypted data. The data remains encrypted during the entire computation process.",
      color: "gray",
    },
    {
      icon: "shield",
      title: "ZK Proof Generation",
      description: "A Zero-Knowledge Proof (ZKP) is generated to verify that the off-chain computation was performed correctly according to the protocol rules, without revealing inputs.",
      color: "gray",
    },
    {
      icon: "verified",
      title: "On-chain Verification",
      description: "The Uniswap v4 Hook verifies the ZK proof on-chain. If valid, the state transition is approved.",
      color: "gray",
    },
    {
      icon: "currency_exchange",
      title: "Secure Rebalance",
      description: "The hook executes the swap or liquidity adjustment. The exact amounts and strategy remain hidden from public observers and front-runners.",
      color: "accent-uniswap",
    },
  ];

  return (
    <div className="relative flex w-full flex-col bg-background-dark py-20" id="solution">
      <div className="px-5 md:px-10 lg:px-40 flex flex-1 justify-center">
        <div className="flex flex-col max-w-[960px] flex-1">
          <div className="text-center mb-16">
            <h2 className="text-white text-3xl md:text-4xl font-bold mb-4">How It Works: 5-Step Confidential Execution</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Leveraging Fully Homomorphic Encryption (FHE) to compute on encrypted data without decrypting it.
            </p>
          </div>
          <div className="grid grid-cols-[40px_1fr] gap-x-6 px-4">
            {steps.map((step, index) => (
              <div key={index} className="contents">
                <div className="flex flex-col items-center pt-2">
                  <div className={`size-10 rounded-full ${
                    step.color === "primary" 
                      ? "bg-primary/20 text-primary border-primary/30" 
                      : step.color === "accent-uniswap"
                      ? "bg-accent-uniswap/20 text-accent-uniswap border-accent-uniswap/30"
                      : "bg-surface-dark text-gray-400 border-[#3b3f54]"
                  } flex items-center justify-center border z-10`}>
                    <span className="material-symbols-outlined text-[20px]">{step.icon}</span>
                  </div>
                  {index < steps.length - 1 && (
                    <div className="w-[2px] bg-[#3b3f54] h-full grow my-2"></div>
                  )}
                </div>
                <div className={`flex flex-col ${index < steps.length - 1 ? "pb-10" : ""} pt-1`}>
                  <h3 className="text-white text-xl font-bold mb-2">{step.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

