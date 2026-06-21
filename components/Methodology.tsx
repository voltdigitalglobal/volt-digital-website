"use client";

import React, { useRef } from "react";
import { motion, useScroll, useInView, useTransform } from "framer-motion";
import Image from "next/image";
import growthBg from "@/image/growth_section.png";

const STEPS = [
  {
    num: "01",
    title: "Diagnose",
    time: "Weeks 1—2",
    desc: "Full business + marketing audit. Funnel, channels, CRM, ops. We find the leaks before we pour in fuel.",
  },
  {
    num: "02",
    title: "Design",
    time: "Weeks 2—3",
    desc: "Positioning, offer, pricing, ICP. A clear growth plan with channel mix, targets, and a 90-day roadmap you can hold us to.",
  },
  {
    num: "03",
    title: "Deploy",
    time: "Weeks 3—6",
    desc: "Campaigns live. Tracking in place. Creative tested. Systems installed. First leads already in the pipeline.",
  },
  {
    num: "04",
    title: "Decode",
    time: "Weeks 6—10",
    desc: "Weekly performance reviews, creative iteration, audience refinement. We decode what's working — and double down.",
  },
  {
    num: "05",
    title: "Double-Down",
    time: "Weeks 10—12+",
    desc: "Scale winning campaigns, codify SOPs, train your team. Hand you a repeatable playbook you can run with forever.",
  },
];

function StepItem({ step, index }: { step: any; index: number }) {
  const ref = useRef(null);
  // Re-animate every time it enters the viewport
  const isInView = useInView(ref, { once: false, amount: 0.5 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.1 }}
      className={`relative flex flex-col md:flex-row items-center w-full rounded-2xl py-6 md:p-8 transition-all duration-500 hover:bg-blue-50/80 group bg-blue-50/50`}
    >
      {/* Timeline Node */}
      <div
        className={`absolute left-8 md:left-1/2 -translate-x-[10px] top-10 md:top-1/2 md:-translate-y-1/2 w-[20px] h-[20px] rounded-full z-20 transition-all duration-500 ${isInView ? "bg-[#0066FF] shadow-[0_0_0_8px_rgba(0,102,255,0.15)] scale-100" : "bg-gray-300 scale-75"
          }`}
      />

      {/* Step Card (Left side of node on desktop, top on mobile) */}
      <div className="w-full md:w-1/2 flex md:justify-end md:pr-16 relative z-10 pl-20 md:pl-0">
        <div className="w-full max-w-[280px]">
          <span className="text-[#8BA4CA] text-sm font-bold tracking-wider">{step.num}</span>
          <h3 className="text-[#0B132B] text-xl md:text-2xl font-bold mt-1 mb-2 group-hover:text-[#0066FF] transition-colors duration-300">{step.title}</h3>
          <span className="text-[#4A5568] text-sm font-medium">{step.time}</span>
        </div>
      </div>

      {/* Description Text (Right side of node on desktop, bottom on mobile) */}
      <div className="w-full md:w-1/2 flex md:justify-start md:pl-16 mt-4 md:mt-0 pl-20 md:pl-0 border-t md:border-t-0 md:border-l border-blue-100 md:border-transparent pt-4 md:pt-0">
        <p className="text-[#4A5568] text-base leading-relaxed max-w-[340px]">
          {step.desc}
        </p>
      </div>
    </motion.div>
  );
}

export default function Methodology() {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const isTitleInView = useInView(titleRef, { once: false, amount: 0.3 });

  // Scrub effect for the central animated line
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  return (
    <section className="relative z-10 w-full bg-white py-32 md:py-48 overflow-hidden font-sans" ref={containerRef}>

      {/* Background Graphic Asset */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
        <Image
          src={growthBg}
          alt=""
          fill
          className="object-contain object-left-top opacity-100"
          priority
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 flex flex-col lg:flex-row gap-20 items-center">

        {/* Left Column (Text Content) */}
        <div className="w-full lg:w-[40%] flex flex-col justify-center" ref={titleRef}>
          <div className="flex flex-col">
            <div className="flex flex-wrap gap-x-[0.3em] mb-8">
              {["The", "Growth", "360", "Method"].map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                  whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  viewport={{ once: false, amount: 0.2 }}
                  transition={{ duration: 0.8, delay: i * 0.1, ease: [0.2, 0.65, 0.3, 0.9] }}
                  className={`text-5xl md:text-7xl font-bold tracking-tight ${i >= 1 ? "text-[#0066FF]" : "text-[#0B132B]"}`}
                >
                  {word}
                </motion.span>
              ))}
            </div>

            <motion.p
              initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
              animate={isTitleInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : { opacity: 0, y: 10, filter: "blur(8px)" }}
              transition={{ delay: 0.7, duration: 1.0, ease: "easeOut" }}
              className="text-[#334155] text-lg leading-[1.8] font-normal max-w-md"
            >
              Getting customers is easy. Keeping them is hard. Growth360 is our proprietary framework for solving both — a 90-day operating system that joins performance marketing, operational optimization, and business strategy into a single measurable growth engine.
            </motion.p>
          </div>
        </div>

        {/* Right Column (Vertical Timeline) */}
        <div className="w-full lg:w-[60%] relative py-10">

          {/* Timeline Background Line (Faded) */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-[4px] bg-gray-100 md:-translate-x-1/2 rounded-full" />

          {/* Active Glowing Line (Scrubbed on scroll) */}
          <motion.div
            className="absolute left-8 md:left-1/2 top-0 bottom-0 w-[4px] bg-[#0066FF] md:-translate-x-1/2 origin-top rounded-full shadow-[0_0_15px_rgba(0,102,255,0.3)]"
            style={{ scaleY: scrollYProgress }}
          />

          <div className="space-y-8 md:space-y-12 relative z-10">
            {STEPS.map((step, index) => (
              <StepItem key={index} step={step} index={index} />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
