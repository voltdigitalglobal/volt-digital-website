"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import icon from "@/image/icon1.png";

export default function Preloader() {
  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-[9999] bg-[#010C19] flex items-center justify-center"
    >
      <div className="relative flex items-center justify-center">
        
        {/* Outer Spinning Ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="absolute w-32 h-32 rounded-full border-t-2 border-b-2 border-r-2 border-[#1071FF] shadow-[0_0_20px_rgba(16,113,255,0.4)]"
        />

        {/* Inner Pulsing Glow */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute w-24 h-24 rounded-full bg-[#1071FF]/20 blur-xl"
        />

        {/* Center Icon */}
        <div className="relative z-10 w-24 h-24 flex items-center justify-center">
          <Image 
            src={icon} 
            alt="Loading..." 
            width={80} 
            height={80} 
            className="object-contain"
            priority
          />
        </div>
      </div>
    </motion.div>
  );
}
