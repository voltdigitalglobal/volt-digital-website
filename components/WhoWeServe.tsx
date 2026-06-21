"use client";

import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef, useEffect } from "react";
import whoBg from "@/image/who_we_serve.png";

// Import SVGs
import profIcon from "@/image/professional.svg";
import vehicleIcon from "@/image/vehicle auto.svg";
import estateIcon from "@/image/real estate.svg";
import retailIcon from "@/image/retail.svg";
import fbIcon from "@/image/f & b.svg";
import healthIcon from "@/image/healthcare.svg";

const CATEGORIES = [
  {
    title: "Professional Services & Beyond",
    description: "Clinics, law firms, consulting practices, education, fitness, home services and other founder-led SMEs ready to professionalise growth.",
    icon: profIcon
  },
  {
    title: "Vehicle & Automotive",
    description: "Driving schools, auto service workshops, garages, rental fleets and dealerships that need consistent lead flow and sharper operational KPIs.",
    icon: vehicleIcon
  },
  {
    title: "Real Estate & Property",
    description: "Brokerages, developers, short-stay operators and property management firms that need steady qualified enquiries and professional digital presence.",
    icon: estateIcon
  },
  {
    title: "Retail & E-commerce",
    description: "Single-store retailers, multi-outlet brands and D2C e-commerce businesses that need a direct channel that isn't hostage to marketplaces.",
    icon: retailIcon
  },
  {
    title: "F&B & Restaurants",
    description: "Restaurants, cafes, cloud kitchens and QSR brands that want full tables, loyal regulars, and delivery platforms that actually pay off.",
    icon: fbIcon
  },
  {
    title: "Healthcare & Clinics",
    description: "Dental, derma, polyclinics, wellness centres, speciality clinics and diagnostic labs that need qualified patient bookings and trust-led brand positioning.",
    icon: healthIcon
  }
];

// Duplicate for infinite scroll
const INFINITE_CATEGORIES = [...CATEGORIES, ...CATEGORIES];

export default function WhoWeServe() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.2 });
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let animationFrameId: number;
    let isPaused = false;

    const scroll = () => {
      if (!isPaused) {
        scrollContainer.scrollLeft += 0.8; // Smooth auto-scroll speed
        if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
          scrollContainer.scrollLeft = 0;
        }
      }
      animationFrameId = requestAnimationFrame(scroll);
    };

    const handleMouseEnter = () => { isPaused = true; };
    const handleMouseLeave = () => { isPaused = false; };

    // Support mouse wheel horizontal scroll
    const handleWheel = (e: WheelEvent) => {
      // If user is scrolling vertically, translate it to horizontal scroll for this container
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();
        scrollContainer.scrollLeft += e.deltaY;

        // Reset to loop if scrolled too far
        if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
          scrollContainer.scrollLeft = 0;
        } else if (scrollContainer.scrollLeft <= 0) {
          scrollContainer.scrollLeft = scrollContainer.scrollWidth / 2;
        }
      }
    };

    scrollContainer.addEventListener('mouseenter', handleMouseEnter);
    scrollContainer.addEventListener('mouseleave', handleMouseLeave);
    scrollContainer.addEventListener('wheel', handleWheel, { passive: false });

    animationFrameId = requestAnimationFrame(scroll);

    return () => {
      cancelAnimationFrame(animationFrameId);
      scrollContainer.removeEventListener('mouseenter', handleMouseEnter);
      scrollContainer.removeEventListener('mouseleave', handleMouseLeave);
      scrollContainer.removeEventListener('wheel', handleWheel);
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen bg-[#010C19] py-32 overflow-hidden flex items-center"
    >
      {/* Background Image Layer */}
      <div className="absolute inset-0 z-0">
        <Image
          src={whoBg}
          alt=""
          fill
          className="object-cover opacity-100"
          priority
        />
      </div>

      <div className="relative z-10 w-full flex flex-col lg:flex-row items-center">

        {/* Left Column (Auto-scrolling Cards) - Bleeding to the left edge */}
        <div className="w-full lg:w-[55%] relative order-2 lg:order-1 mt-12 lg:mt-0">
          <div
            ref={scrollRef}
            className="relative w-full overflow-x-auto no-scrollbar [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]"
          >
            <div
              className="flex gap-8 py-10"
              style={{ width: "fit-content" }}
            >
              {INFINITE_CATEGORIES.map((cat, i) => (
                <div
                  key={i}
                  className="relative p-[1.5px] rounded-[32px] bg-gradient-to-b from-[#1071FF] to-white/60 min-w-[320px] md:min-w-[420px] min-h-[500px] group/card transition-all duration-500 shadow-2xl"
                >
                  <div className="h-full w-full bg-[#010C19] p-12 rounded-[32px] flex flex-col gap-10">
                    <div className="relative w-12 h-12">
                      <Image
                        src={cat.icon}
                        alt={cat.title}
                        fill
                        className="object-contain"
                      />
                    </div>

                    <div className="flex flex-col gap-8">
                      <h3 className="text-[24px] md:text-[30px] font-bold text-[#1071FF] leading-tight">
                        {cat.title}
                      </h3>
                      <p className="text-white text-[22px] leading-snug font-normal opacity-90">
                        {cat.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Strong Left Edge Feather */}
          <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-[#010C19] via-[#010C19]/80 to-transparent pointer-events-none z-20" />
        </div>

        {/* Right Column (Text Content) - Aligned within container constraints */}
        <div className="w-full lg:w-[45%] text-left px-6 lg:pl-24 order-1 lg:order-2">
          <div className="flex flex-col">
            <div className="flex flex-wrap gap-x-[0.3em] mb-8">
              {["Who", "We", "Serve"].map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                  whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  viewport={{ once: false, amount: 0.2 }}
                  transition={{ duration: 0.8, delay: i * 0.1, ease: [0.2, 0.65, 0.3, 0.9] }}
                  className={`text-5xl md:text-7xl font-bold tracking-tight ${word === "Serve" ? "text-[#1071FF]" : "text-white"}`}
                >
                  {word}
                </motion.span>
              ))}
            </div>

            <motion.p
              initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
              animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : { opacity: 0, y: 10, filter: "blur(8px)" }}
              transition={{ delay: 0.7, duration: 1.0, ease: "easeOut" }}
              className="text-white/80 text-lg leading-relaxed max-w-md"
            >
              We combine marketing performance, operational efficiency, and business strategy to turn ambitious SMEs into category leaders.
            </motion.p>
          </div>
        </div>

      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />
    </section>
  );
}
