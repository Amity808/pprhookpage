export default function ImplementationPath() {
  return (
    <section className="w-full py-20 px-6 bg-surface-dark border-t border-[#282b39]/50">
      <div className="mx-auto max-w-[1280px]">
        <h2 className="text-3xl font-bold text-white mb-12 text-center">Implementation Path</h2>
        
        <div className="grid md:grid-cols-3 gap-6">
          <div className="relative p-8 bg-background-dark border border-[#282b39] rounded-xl">
            <div className="absolute -top-4 left-8 bg-primary text-white text-sm font-bold px-3 py-1 rounded-full">Step 1</div>
            <h3 className="text-xl font-bold text-white mt-2 mb-3">Discovery & Design</h3>
            <p className="text-[#9da1b9] text-sm">We analyze your current rebalancing frequency, asset mix, and liquidity requirements to configure the hook parameters.</p>
            <div className="mt-4 text-xs font-mono text-gray-500">Duration: 1-2 Weeks</div>
          </div>
          
          <div className="relative p-8 bg-background-dark border border-[#282b39] rounded-xl">
            <div className="absolute -top-4 left-8 bg-[#282b39] text-white text-sm font-bold px-3 py-1 rounded-full border border-gray-600">Step 2</div>
            <h3 className="text-xl font-bold text-white mt-2 mb-3">Testnet Integration</h3>
            <p className="text-[#9da1b9] text-sm">Deploy onto Sepolia testnet with mirrored liquidity. Conduct dry-runs of large rebalancing events to verify slippage.</p>
            <div className="mt-4 text-xs font-mono text-gray-500">Duration: 2-4 Weeks</div>
          </div>
          
          <div className="relative p-8 bg-background-dark border border-[#282b39] rounded-xl">
            <div className="absolute -top-4 left-8 bg-[#282b39] text-white text-sm font-bold px-3 py-1 rounded-full border border-gray-600">Step 3</div>
            <h3 className="text-xl font-bold text-white mt-2 mb-3">Mainnet Deployment</h3>
            <p className="text-[#9da1b9] text-sm">Gradual TVL migration with multisig controls. Real-time monitoring dashboard activation for compliance teams.</p>
            <div className="mt-4 text-xs font-mono text-gray-500">Duration: Ongoing</div>
          </div>
        </div>
      </div>
    </section>
  );
}

