import AboutStory from "@/components/AboutStory";
import AboutVision from "@/components/AboutVision";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function AboutPage() {
  return (
    <main className="relative min-h-screen bg-[#050A15] overflow-x-hidden">
      <Navbar />
      <AboutStory />
      <AboutVision />
      <Contact />
      <Footer />
    </main>
  );
}
