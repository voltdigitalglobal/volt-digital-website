"use client";

import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useState, useRef } from "react";
import roundLogo from "@/image/round.png";
import whyBg from "@/image/why.png";

const DATA = [
  {
    id: "v-vision",
    title: "Vision",
    description: "We start with clarity. Positioning, ideal customer, market gap, and the three-year picture — mapped before we spend a rial on media.",
    boxClass: "top-[18px] left-[5px]",
    d: "M363.365 213.288C241.686 209.357 172.563 144.823 154.23 111.791C180.258 139.909 220.607 187.288 159.607 116.788C86.1067 31.8416 33.8183 26.0152 4.8472 18.3714",
    lineClass: "bottom-1/2 right-1/2 translate-x-[20px] translate-y-[20px]",
    gradId: "grad-tl",
  },
  {
    id: "l-leverage",
    title: "Leverage",
    description: "We deploy the unfair advantages — performance media, automation, AI workflows — that usually live only inside enterprise marketing departments.",
    boxClass: "top-[213px] left-[1px]",
    d: "M359.131 18.3714C330.16 26.0152 279.687 35.5698 204.316 117.468C141.759 185.443 183.72 139.909 209.748 111.791C191.415 144.823 122.292 209.357 0.613281 213.288",
    lineClass: "top-1/2 right-1/2 translate-x-[20px] -translate-y-[20px]",
    gradId: "grad-bl",
  },
  {
    id: "o-optimize",
    title: "Optimize",
    description: "We re-engineer how your business runs. Funnels, SOPs, pricing, retention — tightened so every new customer is worth more than the last.",
    boxClass: "top-[19px] left-[363px]",
    d: "M4.84721 213.907C33.8183 206.263 84.2915 196.709 159.662 114.811C222.219 46.8353 180.258 92.369 154.23 120.487C172.563 87.4551 241.686 22.9211 363.365 18.99",
    lineClass: "bottom-1/2 left-1/2 -translate-x-[20px] translate-y-[20px]",
    gradId: "grad-tr",
  },
  {
    id: "t-transformation",
    title: "Transformation",
    description: "We don't leave you with a campaign; we leave you with a system. Trained team, live dashboards, documented playbooks — yours to run forever.",
    boxClass: "top-[213px] left-[359px]",
    d: "M0.613281 18.99C122.292 22.9211 191.415 87.4551 209.748 120.487C183.72 92.369 141.759 46.8353 204.316 114.811C279.687 196.709 330.16 206.263 359.131 213.907",
    lineClass: "top-1/2 left-1/2 -translate-x-[20px] -translate-y-[20px]",
    gradId: "grad-br",
  },
];

function Card({ box, index, isInView }: { box: any, index: number, isInView: boolean }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`absolute ${box.boxClass} pointer-events-auto z-40 -translate-x-1/2 -translate-y-1/2`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={isInView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.9, y: 30 }}
        transition={{ delay: 4.45 + index * 0.15, duration: 0.6, ease: "easeOut" }}
        className="p-6 md:p-8 rounded-[32px] border border-white/10 bg-white/[0.03] backdrop-blur-[40px] w-[280px] md:w-[360px] shadow-2xl cursor-pointer overflow-hidden transition-all duration-500 hover:bg-white/[0.08] hover:border-white/30"
      >
        <div className="flex items-center gap-3 mb-1">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#1071FF] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-[#1071FF]"></span>
          </span>
          <h3 className="text-xl md:text-2xl font-bold transition-colors duration-300 text-[#1071FF]">
            {box.title}
          </h3>
        </div>

        <motion.div
          initial={false}
          animate={{ height: isHovered ? "auto" : 0, opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="overflow-hidden"
        >
          <p className="text-white/80 text-sm leading-relaxed font-normal mt-4 pt-4 border-t border-white/10">
            {box.description}
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default function WhyVolt() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });

  const titleWords = "Why VOLT Digital".split(" ");

  return (
    <section ref={ref} className="why-volt-section sticky top-0 z-0 min-h-screen flex flex-col items-center py-24 px-6 overflow-hidden bg-[#00040D]">

      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={whyBg}
          alt=""
          fill
          className="object-cover opacity-90"
          priority
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Header */}
      <div className="relative z-20 text-center max-w-4xl mx-auto mb-20">
        <div className="flex flex-wrap justify-center gap-x-[0.3em] mb-6">
          {["Why", "VOLT", "Digital"].map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: [0.2, 0.65, 0.3, 0.9] }}
              className={`text-5xl md:text-7xl font-bold tracking-tight ${word === "VOLT" ? "text-[#1071FF]" : "text-white"}`}
            >
              {word}
            </motion.span>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
          animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : { opacity: 0, y: 10, filter: "blur(8px)" }}
          transition={{ delay: 0.6, duration: 1.0, ease: "easeOut" }}
          className="text-white text-lg md:text-xl leading-relaxed font-normal"
        >
          We combine marketing performance, operational efficiency, and business strategy to turn ambitious SMEs into category leaders.
        </motion.p>
      </div>

      {/* Interactive Diagram Area */}
      <div className="relative w-full max-w-7xl h-[800px] mx-auto flex items-center justify-center">

        {/* Connection Lines */}
        {DATA.map((box, index) => (
          <div key={box.id} className={`absolute ${box.lineClass} w-[364px] h-[233px] z-10 pointer-events-none`}>
            <svg width="364" height="233" viewBox="0 0 364 233" fill="none">
              <defs>
                <linearGradient id={box.gradId} x1="359" y1="18" x2="0" y2="213" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#1071FF" />
                  <stop offset="1" stopColor="#010C19" stopOpacity="0.4" />
                </linearGradient>
              </defs>
              <motion.path
                d={box.d}
                stroke={`url(#${box.gradId})`}
                strokeWidth="38"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
                transition={{
                  duration: 1.5,
                  ease: "easeInOut",
                  delay: 2.5 + index * 0.15
                }}
              />
            </svg>

            {/* Box placed exactly at the end of the line */}
            <Card box={box} index={index} isInView={isInView} />
          </div>
        ))}

        {/* Center Logo with Spin Intro */}
        <div className="relative z-30">
          <motion.div
            initial={{ scale: 0, opacity: 0, rotate: -1080 }}
            animate={isInView ? { scale: 1, opacity: 1, rotate: 0 } : { scale: 0, opacity: 0, rotate: -1080 }}
            transition={{
              duration: 2.0,
              ease: "easeInOut",
              delay: 0.5
            }}
            className="relative w-40 h-40 md:w-56 md:h-56"
          >
            <div className="absolute inset-0 bg-[#1071FF]/40 rounded-full blur-[40px] animate-pulse" />
            <Image
              src={roundLogo}
              alt="VD Logo"
              fill
              className="object-contain relative z-10"
              priority
            />
          </motion.div>
        </div>

      </div>
    </section>
  );
}
