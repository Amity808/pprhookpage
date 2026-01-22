export default function TechnicalArchitecture() {
  return (
    <section className="w-full py-20 px-6 bg-surface-dark border-y border-[#282b39]/50">
      <div className="mx-auto max-w-[1280px]">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          <div className="lg:w-1/2">
            <h2 className="text-3xl font-bold text-white mb-6">Technical Architecture</h2>
            <ul className="space-y-6">
              <li className="flex gap-4">
                <div className="h-10 w-10 shrink-0 rounded bg-background-dark border border-[#282b39] flex items-center justify-center text-white font-bold">1</div>
                <div>
                  <h3 className="text-lg font-bold text-white">Hook Contract (Solidity)</h3>
                  <p className="text-[#9da1b9]">Lives on Uniswap v4. Intercepts swaps and manages liquidity pools. Acts as the gateway for encrypted requests.</p>
                </div>
              </li>
              
              <li className="flex gap-4">
                <div className="h-10 w-10 shrink-0 rounded bg-background-dark border border-[#282b39] flex items-center justify-center text-white font-bold">2</div>
                <div>
                  <h3 className="text-lg font-bold text-white">FHE Coprocessor</h3>
                  <p className="text-[#9da1b9]">Off-chain secure enclave (Fhenix) that processes encrypted states. Performs rebalancing math without decrypting values.</p>
                </div>
              </li>
              
              <li className="flex gap-4">
                <div className="h-10 w-10 shrink-0 rounded bg-background-dark border border-[#282b39] flex items-center justify-center text-white font-bold">3</div>
                <div>
                  <h3 className="text-lg font-bold text-white">Verification Relayer</h3>
                  <p className="text-[#9da1b9]">Submits the ZK proof of the computation back to the Hook to authorize the rebalance execution.</p>
                </div>
              </li>
            </ul>
          </div>
          
          <div className="lg:w-1/2 w-full">
            <div className="w-full aspect-square md:aspect-video rounded-xl bg-background-dark border border-[#282b39] p-2 shadow-2xl relative overflow-hidden">
              <div className="w-full h-full bg-contain bg-no-repeat bg-center" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuB1rSHhS5BBhdQBM1e4RFHzkxByrVxz-MKNloqIlzpEF92G0Up4712xiw1_-D00GjlTZIZ8d8lCLitmKNzyW8h1wBcueAlpttLZcpYzPyNPEN4Q521uG5AefV4vzzspsuYcnR49lYiIfpaaJYFKif84Ma2HAWLuo5gzJdndYDwPsPH3k9EksaITNwUdZuW6PY2cv8AKKtoth7iLL_MJS7f5lviLuLSQKz19f0HK_OupoAeDQ0CXlua0hg2GX_zZ5mypx3C_fLty2M8")'}}></div>
              <div className="absolute top-4 left-4 bg-black/60 backdrop-blur px-3 py-1 rounded text-xs text-white border border-white/10">Architecture v1.2</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

