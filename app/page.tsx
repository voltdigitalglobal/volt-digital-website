import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Stats from "@/components/Stats";
import WhyVolt from "@/components/WhyVolt";
import Methodology from "@/components/Methodology";
import WhoWeServe from "@/components/WhoWeServe";
import HowWeEngage from "@/components/HowWeEngage";
import Blog from "@/components/Blog";
import Contact from "@/components/Contact";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Page() {
  return (
    <main className="relative min-h-screen">
      <Hero />
      <Services />
      <Stats />
      <WhyVolt />
      <Methodology />
      <WhoWeServe />
      <HowWeEngage />
      <Blog />
      <Contact />
      <CTA />
      <Footer />
    </main>
  );
}
