import type { Metadata } from "next";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProblemHero from "../components/problem/ProblemHero";
import TransparencyTrap from "../components/problem/TransparencyTrap";
import FourVulnerabilities from "../components/problem/FourVulnerabilities";
import AggregateImpact from "../components/problem/AggregateImpact";
import SolutionsFail from "../components/problem/SolutionsFail";
import CostOfInaction from "../components/problem/CostOfInaction";

export const metadata: Metadata = {
  title: "The $6.2M Annual Problem | ConfidentialRebalancingHook",
  description: "Systematic value extraction is bleeding institutional yields dry. Discover the mechanics of the loss and why transparency is a trap for large-scale rebalancing.",
};

export default function ProblemPage() {
  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-white font-display overflow-x-hidden">
      <Navbar />
      <ProblemHero />
      <TransparencyTrap />
      <FourVulnerabilities />
      <AggregateImpact />
      <SolutionsFail />
      <CostOfInaction />
      <Footer />
    </div>
  );
}

