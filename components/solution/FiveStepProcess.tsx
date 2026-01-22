export default function FiveStepProcess() {
  return (
    <section className="w-full py-20 px-6 bg-background-dark relative">
      <div className="mx-auto max-w-[960px]">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">The 5-Step Confidential Process</h2>
          <p className="text-[#9da1b9] max-w-2xl mx-auto">From intent to execution, your strategy remains encrypted. Only the result is revealed.</p>
        </div>
        
        <div className="relative border-l border-[#282b39] ml-4 md:ml-0 md:pl-0 space-y-12">
          {/* Step 1 */}
          <div className="relative pl-12 md:pl-0 md:grid md:grid-cols-[1fr_80px_1fr] md:gap-4 items-center group">
            <div className="hidden md:block text-right pr-8">
              <h3 className="text-xl font-bold text-white">Private Target Setting</h3>
              <p className="text-sm text-[#9da1b9] mt-2">Fund managers define portfolio targets locally. Targets are encrypted client-side before transmission.</p>
            </div>
            <div className="absolute left-0 -translate-x-[5px] md:relative md:left-auto md:translate-x-0 h-10 w-10 rounded-full border-4 border-background-dark bg-[#282b39] flex items-center justify-center z-10 group-hover:bg-primary transition-colors">
              <span className="material-symbols-outlined text-white text-sm">target</span>
            </div>
            <div className="md:hidden mb-2">
              <h3 className="text-xl font-bold text-white">Private Target Setting</h3>
            </div>
            <div className="bg-surface-dark border border-[#282b39] p-5 rounded-lg shadow-lg">
              <div className="h-32 w-full bg-cover bg-center rounded opacity-80" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAbf5fBKdumJDwpR2r0qozQ5woomrwL0c76GTR03qUBgBK2Jbo6t4GO9gsYTkUuXFJ_7i_-8Yu7_xRat2GA2-wB6ap7JSWaBJovsCawIe5j08Lc3TodNWFByN0x5oiYemLY79CpwzXrdsyI6beMGYDFLEc3kl97gIP9gfXMJ4K_h3vzQNplutGWtvkhcratbwqJ8OaMmj6PM_GIQQhwUQoVs8Letr2dLfTM2SZbOIleMVpQvuPE0G3VsJn7TA04-UHBFC13IvSTBFQ")'}}></div>
              <p className="md:hidden text-sm text-[#9da1b9] mt-3">Fund managers define portfolio targets locally. Targets are encrypted client-side before transmission.</p>
            </div>
          </div>
          
          {/* Step 2 */}
          <div className="relative pl-12 md:pl-0 md:grid md:grid-cols-[1fr_80px_1fr] md:gap-4 items-center group">
            <div className="order-3 bg-surface-dark border border-[#282b39] p-5 rounded-lg shadow-lg md:text-right">
              <div className="h-32 w-full bg-cover bg-center rounded opacity-80" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAFa5DaJykCv9LR8kT9RUu-rlIKYLgL4fpWEbb3_0y6RZTAm6iIkvMGewySrHcPbqcuQYwU0qfUkymkjNidzcurqERuDP-vNAmNLDICR50x9s7pm_L84tfyisDFU8gvqAm3ATo9DpUn0gvFtRAE95VD7B1q03DYPMHas3UOSAm6d9S-eZxdkCruAOZrJKzanmyVvedf2CuyCXpflXLZfyhqz45M1V4146xG_1YkpEHwJEqUHHBvOOK3xT9JEEIuWeSOPGmJ9r-XfaU")'}}></div>
              <p className="md:hidden text-sm text-[#9da1b9] mt-3">The hook calculates necessary swaps over encrypted data. No one, not even the node operator, sees the trade size.</p>
            </div>
            <div className="absolute left-0 -translate-x-[5px] md:relative md:left-auto md:translate-x-0 h-10 w-10 rounded-full border-4 border-background-dark bg-[#282b39] flex items-center justify-center z-10 group-hover:bg-primary transition-colors order-2">
              <span className="material-symbols-outlined text-white text-sm">calculate</span>
            </div>
            <div className="md:hidden mb-2">
              <h3 className="text-xl font-bold text-white">Private Position Computation</h3>
            </div>
            <div className="hidden md:block pl-8 order-1">
              <h3 className="text-xl font-bold text-white">Private Position Computation</h3>
              <p className="text-sm text-[#9da1b9] mt-2">The hook calculates necessary swaps over encrypted data. No one, not even the node operator, sees the trade size.</p>
            </div>
          </div>
          
          {/* Step 3 */}
          <div className="relative pl-12 md:pl-0 md:grid md:grid-cols-[1fr_80px_1fr] md:gap-4 items-center group">
            <div className="hidden md:block text-right pr-8">
              <h3 className="text-xl font-bold text-white">Encrypted Execution Timing</h3>
              <p className="text-sm text-[#9da1b9] mt-2">Trades are batched and executed randomly within a time window to prevent timing analysis attacks.</p>
            </div>
            <div className="absolute left-0 -translate-x-[5px] md:relative md:left-auto md:translate-x-0 h-10 w-10 rounded-full border-4 border-background-dark bg-[#282b39] flex items-center justify-center z-10 group-hover:bg-primary transition-colors">
              <span className="material-symbols-outlined text-white text-sm">timer_off</span>
            </div>
            <div className="md:hidden mb-2">
              <h3 className="text-xl font-bold text-white">Encrypted Execution Timing</h3>
            </div>
            <div className="bg-surface-dark border border-[#282b39] p-5 rounded-lg shadow-lg">
              <div className="h-32 w-full bg-cover bg-center rounded opacity-80" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuB2TDI8LsnZR6lactudG7-uknSUnYHZ1boVTP_1juEw9tAwlrFKOtVM7m4izpcAIfpQnKUfczbmOoO-KJ7wMOjDq5ffHclrkVE_Jf7jjRUTrrBSf0dGR4XEgAwwpgeGD6Kk8mE7SZnhJ9tD84Y4lE9Ja9lTAwsIG7JdHVG3rtw65fbJZapUbM5owDPhGYUXIYL93365NNqIKPfp6ENi7Bf6Npl-bog6FHpoUYCDuWm9OtO8Ry_ruxSNChplZ9AoyDMTPVWtbR6mFgI")'}}></div>
              <p className="md:hidden text-sm text-[#9da1b9] mt-3">Trades are batched and executed randomly within a time window to prevent timing analysis attacks.</p>
            </div>
          </div>
          
          {/* Step 4 */}
          <div className="relative pl-12 md:pl-0 md:grid md:grid-cols-[1fr_80px_1fr] md:gap-4 items-center group">
            <div className="order-3 bg-surface-dark border border-[#282b39] p-5 rounded-lg shadow-lg md:text-right">
              <div className="h-32 w-full bg-cover bg-center rounded opacity-80" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCVkYM-hXugPKJOKFVO7mD9Xd5FjbHLtKCbBcosLHPi1sIqoYT5xQm6KbiwgU3sMql9RIR1fqFwkOlX8yls6MRQM_fZx4L19rauQpgCHNvdQ5TGO023JrHrzeOPlGkETiYRU70e3Zfc-IYU8F2DmE-AB2ppOjdt1dEqIFnUvKhO__4yKeZ5SHG0OhXGN-FTXNXxEzXjy3W8wqvs0XXWfGd5cqhZERr4sLcaY0NheEpL_7EDmVoX1-2s34AXOh5JMmbQ57ssczeL1SM")'}}></div>
              <p className="md:hidden text-sm text-[#9da1b9] mt-3">Atomic multi-hop swaps across different pools occur simultaneously, ensuring portfolio balance.</p>
            </div>
            <div className="absolute left-0 -translate-x-[5px] md:relative md:left-auto md:translate-x-0 h-10 w-10 rounded-full border-4 border-background-dark bg-[#282b39] flex items-center justify-center z-10 group-hover:bg-primary transition-colors order-2">
              <span className="material-symbols-outlined text-white text-sm">hub</span>
            </div>
            <div className="md:hidden mb-2">
              <h3 className="text-xl font-bold text-white">Cross-Pool Coordination</h3>
            </div>
            <div className="hidden md:block pl-8 order-1">
              <h3 className="text-xl font-bold text-white">Cross-Pool Coordination</h3>
              <p className="text-sm text-[#9da1b9] mt-2">Atomic multi-hop swaps across different pools occur simultaneously, ensuring portfolio balance.</p>
            </div>
          </div>
          
          {/* Step 5 */}
          <div className="relative pl-12 md:pl-0 md:grid md:grid-cols-[1fr_80px_1fr] md:gap-4 items-center group">
            <div className="hidden md:block text-right pr-8">
              <h3 className="text-xl font-bold text-white">Selective Compliance Reveal</h3>
              <p className="text-sm text-[#9da1b9] mt-2">Zero-knowledge proofs are generated to prove solvency and compliance to auditors without revealing positions publically.</p>
            </div>
            <div className="absolute left-0 -translate-x-[5px] md:relative md:left-auto md:translate-x-0 h-10 w-10 rounded-full border-4 border-background-dark bg-[#282b39] flex items-center justify-center z-10 group-hover:bg-primary transition-colors">
              <span className="material-symbols-outlined text-white text-sm">fact_check</span>
            </div>
            <div className="md:hidden mb-2">
              <h3 className="text-xl font-bold text-white">Selective Compliance Reveal</h3>
            </div>
            <div className="bg-surface-dark border border-[#282b39] p-5 rounded-lg shadow-lg">
              <div className="h-32 w-full bg-cover bg-center rounded opacity-80" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAQcCltOkbuNJlWnDa14ickyfeIjuGYxc7bMLr_WdLQyInYHZW7o1FR1s9OWaro7rPaxHfqraxC3U34jaESaNATupGaXzPOapXN4mfKF7qijmZWT8Zy1Ta8Va6Evz7uuyXnxAk17i2ms29YRgLj3YTrg5NfEFLW3fvq5ehqrGc8SsgN5425WuS9ZJOLrexCm7VWe16xlmfU16JtadE0yXtKUGSgKwj51siNUZWSf96mmHzUwz95Ro1AXD07ButF_TxZrFRDtADcFTU")'}}></div>
              <p className="md:hidden text-sm text-[#9da1b9] mt-3">Zero-knowledge proofs are generated to prove solvency and compliance to auditors without revealing positions publically.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

