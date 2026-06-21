"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import ellipse2 from "@/image/Ellipse 2.png";
import starIcon from "@/image/star.png";
import spiralIcon from "@/image/spiral.png";

export default function AboutVision() {
  return (
    <section className="relative w-full py-32 px-6 md:px-12 lg:px-24 overflow-hidden bg-[#050A15]">
      {/* Background Gradient */}
      <div className="absolute inset-0 z-0 pointer-events-none flex justify-center items-center">
        <div className="relative w-[150%] h-[150%] translate-y-[420px]">
          <Image
            src={ellipse2}
            alt=""
            fill
            className="object-contain opacity-70 mix-blend-screen"
            priority
          />
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-col items-center gap-16">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl font-semibold text-white tracking-tight text-center"
        >
          Vision & Mission
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl mx-auto">
          {/* Vision Card */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="group relative flex flex-col justify-between p-10 md:p-14 rounded-[40px] border border-white/10 bg-white/[0.02] backdrop-blur-xl overflow-hidden hover:bg-white/[0.04] transition-colors duration-500 min-h-[400px]"
          >
            {/* Glossy Icon */}
            <div className="relative w-[120px] h-[120px] mb-8 transform group-hover:scale-110 group-hover:rotate-6 transition-transform duration-700">
              <Image 
                src={starIcon} 
                alt="Vision Icon" 
                fill 
                className="object-contain"
              />
            </div>

            <div className="flex flex-col gap-6">
              <h3 className="text-3xl md:text-4xl font-semibold text-white leading-tight">
                Become the Gulf&apos;s leading SME growth agency.
              </h3>
              <p className="text-white/60 text-lg leading-relaxed font-light">
                “To be the leading SME growth agency in the region, setting the benchmark for performance-driven marketing and business acceleration”
              </p>
            </div>
          </motion.div>

          {/* Mission Card */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="group relative flex flex-col justify-between p-10 md:p-14 rounded-[40px] border border-white/10 bg-white/[0.02] backdrop-blur-xl overflow-hidden hover:bg-white/[0.04] transition-colors duration-500 min-h-[400px]"
          >
            {/* Glossy Icon */}
            <div className="relative w-[120px] h-[120px] mb-8 transform group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-700">
              <Image 
                src={spiralIcon} 
                alt="Mission Icon" 
                fill 
                className="object-contain"
              />
            </div>

            <div className="flex flex-col gap-6">
              <h3 className="text-3xl md:text-4xl font-semibold text-white leading-tight">
                Help SMEs scale smarter and faster.
              </h3>
              <p className="text-white/60 text-lg leading-relaxed font-light">
                “We help SMEs scale smarter and faster by combining marketing performance, operational efficiency, and business strategy”
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
