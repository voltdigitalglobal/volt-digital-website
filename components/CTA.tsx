"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import ctaGrad from "@/image/cta_main_gradient.png";

export default function CTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });

  return (
    <section ref={ref} className="relative w-full bg-[#010C19] py-32 flex flex-col items-center justify-center overflow-hidden">
      
      <div className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto px-6">
        <div className="flex flex-wrap justify-center gap-x-[0.3em] mb-12">
          {"Ready to Amplify Your Business?".split(" ").map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: [0.2, 0.65, 0.3, 0.9] }}
              className="text-3xl md:text-5xl font-medium text-white tracking-tight"
            >
              {word}
            </motion.span>
          ))}
        </div>

        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="relative overflow-hidden flex items-center gap-3 px-8 py-3.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white text-xl font-medium shadow-[0_0_30px_rgba(255,255,255,0.05)] hover:bg-white/20 transition-all active:scale-95 group"
        >
          {/* Light sweep effect matching growth button */}
          <div className="absolute top-0 left-[-100%] w-[60%] h-full bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-[-20deg] pointer-events-none transition-none group-hover:animate-[flashPass_0.7s_ease-in-out_forwards]" />

          <span className="relative z-10">Book Growth Audit</span>
          <svg 
            width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
            className="relative z-10 transition-transform duration-300 group-hover:translate-x-1"
          >
            <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </motion.button>
      </div>

      <style jsx>{`
        @keyframes flashPass {
          0% { left: -100%; }
          100% { left: 150%; }
        }
      `}</style>

      {/* Bottom Clipping Gradient Image */}
      <div className="absolute bottom-0 left-0 right-0 h-full w-full pointer-events-none z-0">
        <Image 
          src={ctaGrad} 
          alt="" 
          fill 
          className="object-cover object-bottom"
          priority
        />
      </div>
    </section>
  );
}
