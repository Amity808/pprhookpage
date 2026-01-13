"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const navItems = [
    { href: "/problem", label: "Problem" },
    { href: "/solution", label: "Solution" },
    { href: "/features", label: "Technology" },
    { href: "/#company", label: "Company" },
  ];

  const isActive = (href: string) => {
    if (href.startsWith("/#")) {
      return false; // Hash links are never active
    }
    return pathname === href;
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 border-b border-[#282b39] bg-background-dark/80 backdrop-blur-md">
      <div className="layout-container flex justify-center w-full">
        <div className="px-5 md:px-10 lg:px-40 flex flex-1 justify-center py-0">
          <div className="flex items-center justify-between w-full max-w-[1200px] h-16">
            <Link href="/" className="flex items-center gap-3 text-white">
              <div className="size-8 flex items-center justify-center rounded bg-primary/20 text-primary">
                <span className="material-symbols-outlined">security</span>
              </div>
              <h2 className="text-white text-lg font-bold leading-tight tracking-tight">ConfidentialRebalancingHook</h2>
            </Link>
            <div className="hidden md:flex items-center gap-6">
              {navItems.map((item) => {
                const active = isActive(item.href);
                if (item.href.startsWith("/#")) {
                  return (
                    <a
                      key={item.href}
                      className={`${active
                        ? "text-white/90"
                        : "text-white/60"
                        } hover:text-white transition-colors text-sm font-medium leading-normal`}
                      href={item.href}
                    >
                      {item.label}
                    </a>
                  );
                }
                return (
                  <Link
                    key={item.href}
                    className={`${active
                      ? "text-white/90"
                      : "text-white/60"
                      } hover:text-white transition-colors text-sm font-medium leading-normal`}
                    href={item.href}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
            <div className="flex items-center gap-4">
              <button className="flex cursor-pointer items-center justify-center overflow-hidden rounded-lg h-9 px-4 bg-primary hover:bg-primary/90 transition-colors text-white text-sm font-bold leading-normal tracking-[0.015em]">
                <span className="truncate">Schedule a Demo</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

