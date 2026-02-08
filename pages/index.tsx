import CaseStudy from "../components/CaseStudy";
import CTA from "../components/CTA";
import Features from "../components/Features";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import HowItWorks from "../components/HowItWorks";
import Navbar from "../components/Navbar";
import Problem from "../components/Problem";

export default function Home() {
    return (
        <div className="bg-background-light dark:bg-background-dark text-[#111418] dark:text-white overflow-x-hidden">
            <Navbar />
            <Hero />
            <Problem />
            <HowItWorks />
            <CaseStudy />
            <Features />
            <CTA />
            <Footer />
        </div>
    );
}
