"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import ellipse3 from "@/image/Ellipse 3.png";
import teamImage from "@/image/Rectangle 21.png"; // Fallback image if exact team photo is not available

export default function AboutStory() {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center py-24 px-6 md:px-12 lg:px-24 overflow-hidden bg-[#050A15]">
      {/* Background Gradient */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Image
          src={ellipse3}
          alt=""
          fill
          className="object-cover opacity-60 mix-blend-screen"
          priority
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-col gap-12">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl font-semibold text-white tracking-tight"
        >
          Our Story
        </motion.h2>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center lg:items-start">
          {/* Left Image */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full lg:w-1/2 relative aspect-[4/3] rounded-[32px] overflow-hidden shadow-2xl"
          >
            <Image 
              src={teamImage} 
              alt="Our Story Team" 
              fill 
              className="object-cover"
            />
          </motion.div>

          {/* Right Text Content */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="w-full lg:w-1/2 flex flex-col gap-6 text-[#A1A1AA] text-lg md:text-xl leading-relaxed font-light"
          >
            <p>
              <strong className="text-white font-medium">VOLT digital</strong> is the product of a simple observation made inside the walls of Qatar&apos;s largest marketing agencies: the frameworks, discipline, and analytical rigour that fuel enterprise growth almost never filter down to the SMEs who drive most of the country&apos;s economic activity.
            </p>
            <p>
              SMEs are typically served by freelancers who can execute a single channel, or by agencies that recycle enterprise retainers into cut-down versions that don&apos;t fit. Both models miss the point. SMEs don&apos;t just need content or ads — they need a growth partner that understands their operations, their margins, and the unglamorous retention work that actually compounds.
            </p>
            <p>
              So we built the agency we wished existed. One that treats every SME like the enterprise it could become. One that leads with performance, bakes in consulting, and hands over systems you own — not a dependency you&apos;re trapped in.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
