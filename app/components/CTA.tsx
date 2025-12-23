export default function CTA() {
  return (
    <div className="relative flex w-full flex-col bg-surface-dark border-t border-[#282b39]">
      <div className="px-5 md:px-10 lg:px-40 flex flex-1 justify-center py-24">
        <div className="flex flex-col items-center max-w-[800px] text-center gap-8">
          <h2 className="text-white text-3xl md:text-5xl font-black leading-tight">
            Ready to reclaim your alpha?
          </h2>
          <p className="text-gray-400 text-lg md:text-xl max-w-[600px]">
            Start rebalancing confidentially on Uniswap v4 today. Schedule a demo with our engineering team.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
            <button className="flex cursor-pointer items-center justify-center rounded-lg h-14 px-8 bg-primary hover:bg-primary-dark text-white text-lg font-bold shadow-lg transition-colors w-full sm:w-auto">
              Get Started Now
            </button>
            <button className="flex cursor-pointer items-center justify-center rounded-lg h-14 px-8 bg-transparent hover:bg-[#282b39] border border-[#3b3f54] text-white text-lg font-bold transition-colors w-full sm:w-auto">
              Read Documentation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

