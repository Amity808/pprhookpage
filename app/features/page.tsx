import type { Metadata } from "next";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FeaturesHero from "../components/features/FeaturesHero";
import ConfidentialExecution from "../components/features/ConfidentialExecution";
import InstitutionalGrade from "../components/features/InstitutionalGrade";
import ProductionMetrics from "../components/features/ProductionMetrics";
import TechnicalDeepDive from "../components/features/TechnicalDeepDive";
import ComparisonTable from "../components/features/ComparisonTable";
import FeaturesCTA from "../components/features/FeaturesCTA";

export const metadata: Metadata = {
  title: "Confidential Execution Features - Confidential Rebalancing Hook",
  description: "Discover the institutional-grade capabilities enabling private, multi-asset rebalancing strategies directly on-chain using Fully Homomorphic Encryption (FHE).",
};

export default function FeaturesPage() {
  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-white min-h-screen flex flex-col overflow-x-hidden">
      <Navbar />
      <FeaturesHero />
      <main className="w-full max-w-[1280px] mx-auto px-4 md:px-10 py-16 flex flex-col gap-24">
        <ConfidentialExecution />
        <InstitutionalGrade />
        <ProductionMetrics />
        <TechnicalDeepDive />
        <ComparisonTable />
        <FeaturesCTA />
      </main>
      <Footer />
    </div>
  );
}

