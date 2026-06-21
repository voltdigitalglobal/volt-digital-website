"use client";

import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import engageBg from "@/image/how_we_engage.png";
import card1 from "@/image/card1.png";
import card2 from "@/image/card2.png";
import card3 from "@/image/card3.png";

const ENGAGEMENTS = [
  {
    tag: "Growth Starter",
    title: "For SMEs getting serious about digital",
    features: [
      "Social media management",
      "Paid ads setup & management",
      "Monthly reporting & review",
      "Basic CRM & lead capture",
      "Content calendar & creative",
      "WhatsApp / email nurture basics"
    ],
    grad: card1
  },
  {
    tag: "Growth Pro",
    title: "For SMEs ready to scale predictably",
    features: [
      "Everything in Growth Starter",
      "Landing pages & funnel build",
      "Full CRM setup & automation",
      "Lead tracking & attribution",
      "Weekly performance reviews",
      "Creative testing pipeline"
    ],
    grad: card2
  },
  {
    tag: "Growth 360",
    title: "For SMEs rebuilding the whole engine.",
    features: [
      "Everything in Growth Pro",
      "SOP design & team training",
      "Retention & loyalty programs",
      "Business process consulting",
      "Quarterly founder reviews",
      "Dedicated growth partner"
    ],
    grad: card3
  }
];

export default function HowWeEngage() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });

  return (
    <section ref={ref} className="relative min-h-screen w-full overflow-hidden bg-[#010C19] py-24 px-6 flex flex-col items-center">
      <div className="absolute inset-0 z-0">
        <Image
          src={engageBg}
          alt=""
          fill
          className="object-cover opacity-80"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#010C19] via-transparent to-[#010C19] opacity-60" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-col items-center text-center">
        <div className="flex flex-wrap justify-center gap-x-[0.3em] mb-20">
          {["How", "We", "Engage"].map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: [0.2, 0.65, 0.3, 0.9] }}
              className={`text-5xl md:text-7xl font-bold tracking-tight ${word === "Engage" ? "text-[#1071FF]" : "text-white"}`}
            >
              {word}
            </motion.span>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-white/70 text-base md:text-lg max-w-3xl leading-relaxed mb-20 font-normal"
        >
          Three structured pathways — whether you're validating a new idea, scaling a proven one, or rebuilding the engine under the hood. All engagements run on retainer with a 90-day minimum, because that's how long it takes to see performance marketing work properly.
        </motion.p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full">
          {ENGAGEMENTS.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="relative group h-full"
            >
              {/* Background Blob Effect */}
              <div className="absolute -inset-4 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 90, 0],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  className="absolute inset-0 bg-gradient-to-r from-[#1071FF]/20 via-blue-400/10 to-purple-500/10 blur-[80px] rounded-full"
                />
              </div>

              {/* Card Stroke (2px gradient) */}
              <div className="relative z-10 p-[2px] rounded-[40px] bg-gradient-to-b from-[#103CFF] to-white h-full transition-transform duration-500 hover:-translate-y-2">
                {/* Inner Content Wrapper */}
                <div className="relative h-full w-full bg-[#010C19] rounded-[38px] p-10 flex flex-col items-center overflow-hidden">
                  {/* Top Tag */}
                  <div className="inline-flex mb-8 self-start">
                    <span className={`px-6 py-2 border-2 border-white rounded-xl text-white text-lg md:text-xl font-bold shadow-lg transition-all duration-300 ${idx === 1
                      ? "bg-[#103CFF]"
                      : "bg-gradient-to-r from-[#00275F] to-[#1071FF]"
                      }`}>
                      {item.tag}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-[20px] md:text-[26px] font-bold text-[#1071FF] mb-8 leading-tight text-left">
                    {item.title}
                  </h3>

                  {/* Features List */}
                  <div className="flex flex-col gap-4 flex-grow text-left">
                    {item.features.map((feature, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-3">
                        <span className="text-[#1071FF] font-bold mt-[2px]">{">"}</span>
                        <span className="text-white/80 text-[18px] md:text-[22px] font-normal leading-tight">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Bottom Clipping Gradient */}
                  <div className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none opacity-80 group-hover:opacity-100 transition-opacity duration-700">
                    <Image
                      src={item.grad}
                      alt=""
                      fill
                      className="object-cover object-bottom"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
