"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import formGrad from "@/image/form_gradient.png";
import starIcon from "@/image/star.png";

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });

  return (
    <section ref={ref} className="relative min-h-[80vh] w-full bg-[#010C19] pt-32 pb-12 px-6 flex flex-col items-center justify-center overflow-hidden">
      <div className="max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-[1fr_900px] gap-20 items-center">
        
        {/* Left Side: Title */}
        <div className="flex flex-col items-start">
          <div className="flex flex-wrap gap-x-[0.3em] mb-4">
            {["Get", "In", "Touch", "with", "Us"].map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.8, delay: i * 0.1, ease: [0.2, 0.65, 0.3, 0.9] }}
                className="text-5xl md:text-7xl font-bold text-white tracking-tight"
              >
                {word}
              </motion.span>
            ))}
          </div>
          
          <div className="relative mt-8">
            <motion.div 
              initial={{ opacity: 0, scale: 0, rotate: -45 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="relative w-40 h-40"
            >
              <Image src={starIcon} alt="" className="object-contain" fill />
            </motion.div>
          </div>
        </div>

        {/* Right Side: Form Card */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative p-[2px] rounded-[40px] bg-gradient-to-b from-[#103CFF] to-white group transition-all duration-500 w-full max-w-[900px]"
        >
          <div className="h-full w-full bg-[#010C19]/95 backdrop-blur-xl rounded-[38px] p-8 md:p-12 relative overflow-hidden">
            <form className="relative z-10 flex flex-col gap-8">
              {/* Row 1 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex flex-col gap-2">
                  <label className="text-white/70 text-sm font-medium ml-1">Name</label>
                  <input 
                    type="text" 
                    className="w-full bg-[#0A121E] border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-[#1071FF]/50 transition-colors shadow-[inset_0_4px_20px_rgba(0,0,0,0.8)]"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-white/70 text-sm font-medium ml-1">Email</label>
                  <input 
                    type="email" 
                    className="w-full bg-[#0A121E] border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-[#1071FF]/50 transition-colors shadow-[inset_0_4px_20px_rgba(0,0,0,0.8)]"
                  />
                </div>
              </div>

              {/* Row 2 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex flex-col gap-2">
                  <label className="text-white/70 text-sm font-medium ml-1">Phone</label>
                  <input 
                    type="tel" 
                    className="w-full bg-[#0A121E] border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-[#1071FF]/50 transition-colors shadow-[inset_0_4px_20px_rgba(0,0,0,0.8)]"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-white/70 text-sm font-medium ml-1">Business Name</label>
                  <input 
                    type="text" 
                    className="w-full bg-[#0A121E] border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-[#1071FF]/50 transition-colors shadow-[inset_0_4px_20px_rgba(0,0,0,0.8)]"
                  />
                </div>
              </div>

              {/* Row 3 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex flex-col gap-2">
                  <label className="text-white/70 text-sm font-medium ml-1">Industry</label>
                  <input 
                    type="text" 
                    className="w-full bg-[#0A121E] border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-[#1071FF]/50 transition-colors shadow-[inset_0_4px_20px_rgba(0,0,0,0.8)]"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-white/70 text-sm font-medium ml-1">What do you need help with?</label>
                  <input 
                    type="text" 
                    className="w-full bg-[#0A121E] border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-[#1071FF]/50 transition-colors shadow-[inset_0_4px_20px_rgba(0,0,0,0.8)]"
                  />
                </div>
              </div>

              {/* Message */}
              <div className="flex flex-col gap-2">
                <label className="text-white/70 text-sm font-medium ml-1">Message</label>
                <textarea 
                  rows={4}
                  className="w-full bg-[#0A121E] border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-[#1071FF]/50 transition-colors resize-none shadow-[inset_0_4px_20px_rgba(0,0,0,0.8)]"
                />
              </div>

              {/* Submit Button */}
              <div className="flex justify-center mt-4 relative">
                <button className="relative overflow-hidden flex items-center gap-3 px-8 py-3.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white text-lg font-bold shadow-[0_0_20px_rgba(255,255,255,0.05)] hover:bg-white/20 transition-all active:scale-95 group">
                  {/* Light sweep effect matching growth button */}
                  <div className="absolute top-0 left-[-100%] w-[60%] h-full bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-[-20deg] pointer-events-none transition-none group-hover:animate-[flashPass_0.7s_ease-in-out_forwards]" />
                  
                  <span className="relative z-10">Submit Query</span>
                  <svg 
                    width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                    className="relative z-10 transition-transform duration-300 group-hover:translate-x-1"
                  >
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            </form>

            {/* Bottom Clipping Gradient Overlay */}
            <div className="absolute bottom-0 left-0 right-0 h-full pointer-events-none opacity-60 z-0">
              <Image 
                src={formGrad} 
                alt="" 
                fill 
                className="object-cover object-bottom"
              />
            </div>
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        @keyframes flashPass {
          0% { left: -100%; }
          100% { left: 150%; }
        }
      `}</style>
    </section>
  );
}
