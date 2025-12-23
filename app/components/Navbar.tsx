export default function Navbar() {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 border-b border-[#282b39] bg-background-dark/80 backdrop-blur-md">
      <div className="layout-container flex justify-center w-full">
        <div className="px-5 md:px-10 lg:px-40 flex flex-1 justify-center py-0">
          <div className="flex items-center justify-between w-full max-w-[1200px] h-16">
            <div className="flex items-center gap-3 text-white">
              <div className="size-8 flex items-center justify-center rounded-lg bg-primary/20 text-primary">
                <span className="material-symbols-outlined text-[20px]">enhanced_encryption</span>
              </div>
              <h2 className="text-white text-lg font-bold leading-tight tracking-tight">ConfidentialHook</h2>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a className="text-gray-300 hover:text-white text-sm font-medium transition-colors" href="#problem">The Problem</a>
              <a className="text-gray-300 hover:text-white text-sm font-medium transition-colors" href="#solution">Solution</a>
              <a className="text-gray-300 hover:text-white text-sm font-medium transition-colors" href="#roi">Case Study</a>
              <a className="text-gray-300 hover:text-white text-sm font-medium transition-colors" href="#features">Features</a>
            </div>
            <div className="flex items-center gap-4">
              <button className="hidden sm:flex min-w-[84px] cursor-pointer items-center justify-center rounded-lg h-9 px-4 bg-primary hover:bg-primary-dark transition-colors text-white text-sm font-bold">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

