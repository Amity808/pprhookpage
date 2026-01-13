import type { Metadata } from "next";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SolutionHero from "../components/solution/SolutionHero";
import BreakthroughSection from "../components/solution/BreakthroughSection";
import FiveStepProcess from "../components/solution/FiveStepProcess";
import SolvingProblems from "../components/solution/SolvingProblems";
import ComparisonMatrix from "../components/solution/ComparisonMatrix";
import TechnicalArchitecture from "../components/solution/TechnicalArchitecture";
import ProofPoints from "../components/solution/ProofPoints";
import ImplementationPath from "../components/solution/ImplementationPath";
import SolutionCTA from "../components/solution/SolutionCTA";

export const metadata: Metadata = {
  title: "Confidential Rebalancing Solution",
  description: "Eliminate $6.2M+ in annual slippage and MEV losses. The first hook enabling institutional-grade confidential multi-asset rebalancing using Fully Homomorphic Encryption (FHE).",
};

export default function SolutionPage() {
  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-white antialiased overflow-x-hidden">
      <Navbar />
      <main className="flex flex-col items-center">
        <SolutionHero />
        <BreakthroughSection />
        <FiveStepProcess />
        <SolvingProblems />
        <ComparisonMatrix />
        <TechnicalArchitecture />
        <ProofPoints />
        <ImplementationPath />
        <SolutionCTA />
      </main>
      <Footer />
    </div>
  );
}

