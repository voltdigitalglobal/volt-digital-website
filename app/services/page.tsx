"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import servicesHero from "@/image/services.png";
import icon from "@/image/icon1.png";
import rect21 from "@/image/Rectangle 21.png";
import rect21_1 from "@/image/Rectangle 21-1.png";
import rect21_2 from "@/image/Rectangle 21-2.png";
import rect21_3 from "@/image/Rectangle 21-3.png";

const SERVICES_DATA = [
  {
    num: "01",
    title: "Digital Marketing",
    tagline: "Brand, content, and always-on presence.",
    bullets: [
      "Social media strategy & content strategy",
      "SEO, local search, and Google My Business optimization",
      "Email marketing, WhatsApp marketing & customer journeys",
      "Influencer, community & creator partnerships",
      "Creative best practices strategies",
      "Complete paid media handling (Meta, Snapchat, Tiktok etc...)"
    ],
    img: rect21,
  },
  {
    num: "02",
    title: "Performance Marketing",
    tagline: "Paid media engineered for ROI, not reach.",
    bullets: [
      "Meta, TikTok, Google, YouTube & LinkedIn Ads management",
      "Full-funnel conversion strategy & landing page design",
      "Pixel/CAPI tracking, GA4, and attribution setup",
      "Creative testing, audience segmentation & retargeting",
      "Weekly performance reviews with ROI dashboards"
    ],
    img: rect21_2,
  },
  {
    num: "03",
    title: "Digital Transformation",
    tagline: "The systems behind the growth.",
    bullets: [
      "CRM setup (HubSpot, Zoho, Salesforce) & lead pipelines",
      "Marketing automation, chatbots & WhatsApp Business API",
      "Website, e-commerce & booking platform builds",
      "Data dashboards, KPI reporting & AI-assisted workflows",
      "Integrations: POS, accounting, inventory, customer support"
    ],
    img: rect21_1,
  },
  {
    num: "04",
    title: "Business Consulting",
    tagline: "The 360° growth advisory layer.",
    bullets: [
      "Go-to-market strategy, pricing & positioning reviews",
      "Standard Operating Procedures (SOPs) & process design",
      "Employee trainings & performance frameworks",
      "Customer retention programs & lifetime value optimization",
      "Quarterly business reviews with the founder team"
    ],
    img: rect21_3,
  },
];

export default function ServicesPage() {
  return (
    <main className="relative min-h-screen bg-white overflow-x-hidden">
      <Navbar />

      {/* --- Services Hero --- */}
      <section className="relative h-[720px] pt-[120px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={servicesHero}
            alt="Services"
            fill
            className="object-cover opacity-100"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#010C19]/80 via-transparent to-white" />
        </div>

        <div className="relative z-10 text-center px-6 -translate-y-[70px]">
          <div className="flex flex-wrap justify-center gap-x-[0.3em] mb-6">
            {"How VOLT digital Can Help".split(" ").map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.8, delay: i * 0.1, ease: [0.2, 0.65, 0.3, 0.9] }}
                className="text-6xl md:text-[80px] font-normal text-white tracking-tight"
              >
                {word === "VOLT" || word === "digital" ? <span className="text-[#1071FF]">{word}</span> : word}
              </motion.span>
            ))}
          </div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-white/80 text-lg md:text-xl max-w-4xl mx-auto leading-relaxed"
          >
            Four integrated pillars, one joined-up growth engine. Every engagement is built around the outcomes you actually care about: qualified leads, retained customers, leaner operations, and better decisions.
          </motion.p>
        </div>
      </section>

      {/* --- Services List (Alternating) --- */}
      <section className="relative z-10 -mt-32 pb-32 px-6 max-w-7xl mx-auto flex flex-col gap-20">
        {SERVICES_DATA.map((service, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: idx % 2 === 0 ? -100 : 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 1, ease: [0.2, 0.65, 0.3, 0.9] }}
            className={`relative w-full rounded-[32px] p-10 md:p-16 flex flex-col lg:flex-row items-center gap-12 md:gap-20 overflow-hidden bg-gradient-to-b from-[#0A121E] to-[#1071FF] group`}
          >
            {/* Content Side */}
            <div className={`flex-1 flex flex-col gap-6 order-2 ${idx % 2 === 0 ? 'lg:order-1' : 'lg:order-2'}`}>
              <span className="text-6xl md:text-8xl font-normal text-[#1071FF]/80 tracking-tighter">
                {service.num}
              </span>
              <div className="flex flex-col gap-4">
                <div className="flex flex-wrap gap-x-[0.3em]">
                  {service.title.split(" ").map((word, wIdx) => (
                    <motion.h3
                      key={wIdx}
                      initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: wIdx * 0.1 }}
                      className="text-4xl md:text-[57px] font-medium text-white tracking-tight leading-none"
                    >
                      {word}
                    </motion.h3>
                  ))}
                </div>
                <p className="text-white font-medium text-xl md:text-[32px] leading-tight">
                  {service.tagline}
                </p>
              </div>
              <ul className="flex flex-col gap-3 mt-4">
                {service.bullets.map((bullet, bIdx) => (
                  <li key={bIdx} className="flex items-start gap-3 text-white/90 text-base md:text-lg">
                    <span className="text-white font-bold mt-1">•</span>
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>

            {/* Image Side */}
            <div className={`flex-1 w-full order-1 ${idx % 2 === 0 ? 'lg:order-2' : 'lg:order-1'}`}>
              <div className="relative aspect-[4/3] rounded-[24px] overflow-hidden shadow-2xl">
                <Image
                  src={service.img}
                  alt={service.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </div>
          </motion.div>
        ))}
      </section>

      {/* --- Contact & Footer --- */}
      <Contact />
      <Footer />
    </main>
  );
}
