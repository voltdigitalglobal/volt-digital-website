"use client";

import Image from "next/image";
import glanceBg from "@/image/glance.png";

const STATS_DATA = [
  {
    value: "SME",
    label: "Built exclusively for SMEs",
  },
  {
    value: "04",
    label: "Integrated service pillars",
  },
  {
    value: "360°",
    label: "Growth consulting model",
    hasCaret: true,
  },
  {
    value: "QA",
    label: "Rooted in Qatar, ready for the Region",
  },
];

export default function Stats() {
  return (
    <section className="stats-section relative min-h-[600px] flex items-center justify-center py-32 px-6 overflow-hidden bg-[#00040D]">
      {/* Background Image - Matching Glance section */}
      <div className="absolute inset-0 z-0">
        <Image
          src={glanceBg}
          alt=""
          fill
          className="object-cover opacity-100"
          priority
        />
        <div className="absolute inset-0 bg-black/30 z-0" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {STATS_DATA.map((item, i) => (
            <div
              key={i}
              className="stats-card p-10 py-16 rounded-[40px] border border-white/10 bg-[#0A121E]/30 backdrop-blur-xl flex flex-col items-center justify-center text-center transition-all duration-500 hover:bg-[#0A121E]/50 hover:border-white/20 group"
            >
              <div className="relative mb-4 flex items-center justify-center">
                <h3 className="text-[#1071FF] text-6xl md:text-7xl font-bold font-['Outfit'] tracking-tight">
                  {item.value}
                </h3>
                {item.hasCaret && (
                  <span className="ml-2 mb-6">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 6L20 18H4L12 6Z" fill="#1071FF" />
                    </svg>
                  </span>
                )}
              </div>
              <p className="text-white/90 text-lg md:text-xl font-medium font-['Outfit'] leading-tight max-w-[200px]">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
