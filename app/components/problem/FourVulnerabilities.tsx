export default function FourVulnerabilities() {
  return (
    <section className="py-20 px-4 md:px-10 lg:px-40 bg-[#0f1119]">
      <div className="max-w-[1280px] mx-auto">
        <h2 className="text-3xl font-bold text-white mb-12">Four Core Vulnerabilities</h2>
        
        <div className="grid grid-cols-1 gap-6">
          {/* Vulnerability 1 */}
          <div className="bg-[#1a1d2d] border border-[#282b39] rounded-2xl p-6 md:p-8 hover:border-primary/50 transition-colors group">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-4 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-blue-500/20 rounded-lg text-blue-400">
                      <span className="material-symbols-outlined">content_copy</span>
                    </div>
                    <h3 className="text-xl font-bold text-white">Copycat Trading & Strategy Theft</h3>
                  </div>
                  <p className="text-slate-400 text-sm mb-6">
                    Competitors monitor your on-chain activity to reverse-engineer your proprietary alpha. Once your pattern is known, your edge evaporates.
                  </p>
                </div>
                <div className="mt-auto pt-6 border-t border-white/5">
                  <div className="text-xs text-slate-500 uppercase tracking-wider font-bold mb-1">Impact</div>
                  <div className="text-2xl font-bold text-white">Complete Alpha Decay</div>
                  <div className="text-sm text-red-400">Within 3-6 months</div>
                </div>
              </div>
              
              <div className="lg:col-span-8 bg-background-dark rounded-xl p-6 border border-[#282b39]">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-1">
                    <h4 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
                      <span className="material-symbols-outlined text-primary text-sm">science</span>
                      Mechanics
                    </h4>
                    <ul className="text-sm text-slate-400 space-y-2 list-disc pl-4">
                      <li>Address clustering algorithms identify your wallets.</li>
                      <li>Statistical analysis decodes your rebalancing triggers.</li>
                      <li>Bots mimic your trades with lower fees, diluting your yield.</li>
                    </ul>
                  </div>
                  
                  <div className="w-px bg-[#282b39] hidden md:block"></div>
                  
                  <div className="flex-1">
                    <h4 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
                      <span className="material-symbols-outlined text-orange-400 text-sm">domain</span>
                      Case Study: Quantum Capital
                    </h4>
                    <p className="text-xs text-slate-400 italic mb-2">
                      "After deploying our momentum strategy on-chain, we saw copy-trading volume exceed our own within 4 weeks. Slippage increased by 400%."
                    </p>
                    <div className="h-24 w-full bg-cover bg-center rounded-lg opacity-50 grayscale" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuA6vEcNM-uWWiAkz2kT8m5g43RzQzBOzPIzOdKKpAoTHL9IcAzWwZpSAEqhUzoZ3RzWEuEdA0Iy11prHW0gpaJ1OEwLXFAKBb1-a6qGivxImjArRc-wil0q7DxMbFFFtU3z5KiiIW1MHcEqIFPGpe1DnyklDf0hXFqtpXJMOHqFyS_5o37_3Su_7KlwNqqSywday7UAmT7N-qYc74OO4Tsu3cY8zP6j8w6BQIhq4qs2ELSET3z32XcUnoq2P28p9akOOI9PQFy0urA")'}}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Vulnerability 2 */}
          <div className="bg-[#1a1d2d] border border-[#282b39] rounded-2xl p-6 md:p-8 hover:border-primary/50 transition-colors group">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-4 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-red-500/20 rounded-lg text-red-400">
                      <span className="material-symbols-outlined">bolt</span>
                    </div>
                    <h3 className="text-xl font-bold text-white">MEV Extraction & Front-Running</h3>
                  </div>
                  <p className="text-slate-400 text-sm mb-6">
                    Sandwich attacks are the most direct form of theft. Searchers place buy orders immediately before yours and sell immediately after, forcing you to pay a worse price.
                  </p>
                </div>
                <div className="mt-auto pt-6 border-t border-white/5">
                  <div className="text-xs text-slate-500 uppercase tracking-wider font-bold mb-1">Impact</div>
                  <div className="text-2xl font-bold text-white">1-3% Loss Per Trade</div>
                  <div className="text-sm text-red-400">$250k on a $10M rebalance</div>
                </div>
              </div>
              
              <div className="lg:col-span-8 bg-background-dark rounded-xl p-6 border border-[#282b39]">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-1">
                    <h4 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
                      <span className="material-symbols-outlined text-primary text-sm">science</span>
                      Mechanics
                    </h4>
                    <ul className="text-sm text-slate-400 space-y-2 list-disc pl-4">
                      <li>Mempool scanning for high-value pending transactions.</li>
                      <li>Gas bidding wars to order transactions within a block.</li>
                      <li>Atomic execution ensures the attacker takes zero risk.</li>
                    </ul>
                  </div>
                  
                  <div className="w-px bg-[#282b39] hidden md:block"></div>
                  
                  <div className="flex-1">
                    <h4 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
                      <span className="material-symbols-outlined text-orange-400 text-sm">school</span>
                      Case Study: Stanford Endowment
                    </h4>
                    <p className="text-xs text-slate-400 italic mb-2">
                      "In our 2023 DeFi pilot, post-trade analysis revealed we lost 65 bps to sandwich attacks on every major rebalance event."
                    </p>
                    <div className="h-24 w-full bg-cover bg-center rounded-lg opacity-50 grayscale" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuA7QIlnX2CLko3IPxh1GZD-n_S250aA-YGjJYfsaD290-3-CH4PiTxZpWYS1aI65tqvQoe2bzLrFBb3JWtbo1qoo8HG46vQVufnOuF8z5lIstKzu3_HjC6n9Q49n2t-RaNqpGKzg4Xi4MmJPFEwemAtERNkTL0A8l4SGnbFzwtOLsnZZFGSJeXugBKD8ElEZbkWnVNnVx063vDgD6PwQwqAAe6mikfqNknjF3YHmp4L3jyGhCucB7NDXoOnojN0fjpsZ3zI94yVmpY")'}}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Vulnerability 3 */}
          <div className="bg-[#1a1d2d] border border-[#282b39] rounded-2xl p-6 md:p-8 hover:border-primary/50 transition-colors group">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-4 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-purple-500/20 rounded-lg text-purple-400">
                      <span className="material-symbols-outlined">schedule</span>
                    </div>
                    <h3 className="text-xl font-bold text-white">Timing Attacks & Pattern Exploitation</h3>
                  </div>
                  <p className="text-slate-400 text-sm mb-6">
                    Predictable rebalancing schedules (e.g., end of month) allow market makers to widen spreads artificially right when they know you must trade.
                  </p>
                </div>
                <div className="mt-auto pt-6 border-t border-white/5">
                  <div className="text-xs text-slate-500 uppercase tracking-wider font-bold mb-1">Impact</div>
                  <div className="text-2xl font-bold text-white">Higher Spread Costs</div>
                  <div className="text-sm text-red-400">Systematic overpayment</div>
                </div>
              </div>
              
              <div className="lg:col-span-8 bg-background-dark rounded-xl p-6 border border-[#282b39]">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-1">
                    <h4 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
                      <span className="material-symbols-outlined text-primary text-sm">science</span>
                      Mechanics
                    </h4>
                    <ul className="text-sm text-slate-400 space-y-2 list-disc pl-4">
                      <li>Historical analysis of wallet activity to predict "wake up" times.</li>
                      <li>Liquidity pulling just before scheduled trades.</li>
                      <li>Information asymmetry leverage.</li>
                    </ul>
                  </div>
                  
                  <div className="w-px bg-[#282b39] hidden md:block"></div>
                  
                  <div className="flex-1">
                    <h4 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
                      <span className="material-symbols-outlined text-orange-400 text-sm">factory</span>
                      Case Study: Tesla Treasury
                    </h4>
                    <p className="text-xs text-slate-400 italic mb-2">
                      "Automated periodic diversification of stablecoin holdings was targeted by LPs who widened spreads by 0.5% exactly on our execution window."
                    </p>
                    <div className="h-24 w-full bg-cover bg-center rounded-lg opacity-50 grayscale" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuArjV0mrF9vMFHgu4P0rteB2CqigzdygJdR0WgoH4pxjv7B8vUx09CfLgBaewAt1m7PzX0Z-HhaEt4UMAd1Zgo4NQ4-UxWhIoJVZuvNR7dQZ4KcGBE8XwiQD5DYQNsxCxBdXtnvuEm6fMw35965LPK2eU4UyRZyoMMSn2v8sDNLjxO8LMz2YYGnGHSMS-vFVHsErTE-37UprgGnmdsZsUgeX7RBqqg0gK0vnU5BJtpa7mlNJ6BewAdiP4yHvknjC1-F4LEaWo9A8EI")'}}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Vulnerability 4 */}
          <div className="bg-[#1a1d2d] border border-[#282b39] rounded-2xl p-6 md:p-8 hover:border-primary/50 transition-colors group">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-4 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-green-500/20 rounded-lg text-green-400">
                      <span className="material-symbols-outlined">gavel</span>
                    </div>
                    <h3 className="text-xl font-bold text-white">Compliance vs. Privacy Trade-off</h3>
                  </div>
                  <p className="text-slate-400 text-sm mb-6">
                    Traditional privacy tools (Mixers) are non-compliant. Public trading is compliant but leaks value. Institutions are stuck in a lose-lose situation.
                  </p>
                </div>
                <div className="mt-auto pt-6 border-t border-white/5">
                  <div className="text-xs text-slate-500 uppercase tracking-wider font-bold mb-1">Impact</div>
                  <div className="text-2xl font-bold text-white">Regulatory Risk</div>
                  <div className="text-sm text-red-400">Or Financial Loss</div>
                </div>
              </div>
              
              <div className="lg:col-span-8 bg-background-dark rounded-xl p-6 border border-[#282b39]">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-1">
                    <h4 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
                      <span className="material-symbols-outlined text-primary text-sm">science</span>
                      Mechanics
                    </h4>
                    <ul className="text-sm text-slate-400 space-y-2 list-disc pl-4">
                      <li>Tornado Cash and similar tools are OFAC sanctioned.</li>
                      <li>Public blockchains expose balance sheets to competitors.</li>
                      <li>Lack of "Selective Disclosure" capabilities.</li>
                    </ul>
                  </div>
                  
                  <div className="w-px bg-[#282b39] hidden md:block"></div>
                  
                  <div className="flex-1">
                    <h4 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
                      <span className="material-symbols-outlined text-orange-400 text-sm">balance</span>
                      The Dilemma
                    </h4>
                    <p className="text-xs text-slate-400 italic mb-2">
                      Institutions cannot use illicit privacy tools, forcing them to accept execution losses as the "cost of compliance" - a cost that is no longer sustainable.
                    </p>
                    <div className="h-24 w-full flex items-center justify-center border border-white/10 rounded-lg bg-white/5">
                      <span className="material-symbols-outlined text-4xl text-slate-600">block</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

