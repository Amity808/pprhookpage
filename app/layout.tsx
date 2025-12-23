import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Confidential Rebalancing Hook - Uniswap v4 FHE",
  description: "The first FHE-powered solution for institutional DeFi. Eliminate annual losses from front-running and MEV with fully encrypted order execution.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}

