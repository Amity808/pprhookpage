export default function InstitutionalGrade() {
  return (
    <section id="institutional-grade">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
        <div className="max-w-xl">
          <h2 className="text-primary font-bold tracking-wider uppercase text-sm mb-2">Enterprise Ready</h2>
          <h3 className="text-3xl font-bold text-white mb-4">Institutional Grade Control</h3>
          <p className="text-[#9da1b9]">Built for asset managers requiring strict compliance, robust access controls, and verifiable governance.</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Large Card 1 */}
        <div className="flex flex-col md:flex-row gap-6 p-6 rounded-xl bg-surface-dark border border-[#282b39]">
          <div className="shrink-0 h-14 w-14 rounded-full bg-blue-900/30 flex items-center justify-center text-primary border border-primary/20">
            <span className="material-symbols-outlined text-[28px]">hub</span>
          </div>
          <div>
            <h4 className="text-white text-xl font-bold mb-2">Cross-Pool Coordination</h4>
            <p className="text-[#9da1b9] mb-4">Synchronize rebalancing across multiple Uniswap v4 pools atomically. Ensure portfolio consistency without race conditions or partial fills.</p>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-sm text-gray-300">
                <span className="material-symbols-outlined text-primary text-[18px]">check_circle</span>
                Atomic multi-hop routing
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-300">
                <span className="material-symbols-outlined text-primary text-[18px]">check_circle</span>
                Flash accounting integration
              </li>
            </ul>
          </div>
        </div>
        
        {/* Large Card 2 */}
        <div className="flex flex-col md:flex-row gap-6 p-6 rounded-xl bg-surface-dark border border-[#282b39]">
          <div className="shrink-0 h-14 w-14 rounded-full bg-blue-900/30 flex items-center justify-center text-primary border border-primary/20">
            <span className="material-symbols-outlined text-[28px]">gavel</span>
          </div>
          <div>
            <h4 className="text-white text-xl font-bold mb-2">Compliance & Reporting</h4>
            <p className="text-[#9da1b9] mb-4">Generate zero-knowledge viewing keys for auditors. Prove compliance with mandate constraints (e.g., max sector exposure) without public disclosure.</p>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-sm text-gray-300">
                <span className="material-symbols-outlined text-primary text-[18px]">check_circle</span>
                Selective disclosure keys
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-300">
                <span className="material-symbols-outlined text-primary text-[18px]">check_circle</span>
                On-chain audit trails
              </li>
            </ul>
          </div>
        </div>
        
        {/* Smaller Card 3 */}
        <div className="p-6 rounded-xl bg-surface-dark border border-[#282b39] flex items-start gap-4">
          <div className="text-primary mt-1">
            <span className="material-symbols-outlined">admin_panel_settings</span>
          </div>
          <div>
            <h4 className="text-white text-lg font-bold mb-1">Granular Access Control</h4>
            <p className="text-[#9da1b9] text-sm">Role-based permissions for traders, admins, and auditors. Supports multi-sig governance out of the box.</p>
          </div>
        </div>
        
        {/* Smaller Card 4 */}
        <div className="p-6 rounded-xl bg-surface-dark border border-[#282b39] flex items-start gap-4">
          <div className="text-primary mt-1">
            <span className="material-symbols-outlined">voting_chip</span>
          </div>
          <div>
            <h4 className="text-white text-lg font-bold mb-1">Governance Integration</h4>
            <p className="text-[#9da1b9] text-sm">Seamlessly plug into DAO governance frameworks (Governor Bravo, OpenZeppelin) for parameter updates.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

