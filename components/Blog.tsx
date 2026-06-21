"use client";

import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import blog1 from "@/image/recent_news_card1_image.png";
import blog2 from "@/image/recent_news_card2_image1.png";
import blog3 from "@/image/recent_news_card3_image2.png";

const BLOG_POSTS = [
  {
    title: "For SMEs getting serious about digital",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum......",
    image: blog1,
  },
  {
    title: "For SMEs getting serious about digital",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum......",
    image: blog2,
  },
  {
    title: "For SMEs getting serious about digital",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum......",
    image: blog3,
  },
];

export default function Blog() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });

  return (
    <section ref={ref} className="relative min-h-screen w-full bg-[#010C19] py-32 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        {/* Section Header */}
        <div className="flex flex-wrap justify-center gap-x-[0.3em] mb-20">
          {"Recent News".split(" ").map((word, i) => (
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

        <div className="relative w-full overflow-x-auto no-scrollbar pb-12 [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]">
          {/* Decorative Connecting Line */}
          <div className="absolute top-[35%] left-0 right-0 h-[1px] border-t border-dashed border-[#1071FF]/40 z-0 hidden lg:block" />

          <div className="flex gap-8 w-max min-w-full">
            {BLOG_POSTS.map((post, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className="relative z-10 p-[2px] rounded-[32px] bg-gradient-to-b from-[#1071FF] to-transparent group transition-all duration-500 hover:shadow-[0_0_40px_rgba(16,113,255,0.15)] w-[320px] md:w-[420px] flex-shrink-0"
              >
                <div className="h-full w-full bg-gradient-to-b from-[#010C19] to-[#010811] rounded-[30px] p-8 flex flex-col">
                  {/* Image Container */}
                  <div className="relative w-full aspect-[4/3] rounded-[24px] overflow-hidden mb-8 border border-white/5">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex flex-col gap-4">
                    <h3 className="text-[20px] md:text-[24px] font-bold text-[#1071FF] leading-tight">
                      {post.title}
                    </h3>
                    <p className="text-white/70 text-base md:text-lg leading-relaxed font-normal">
                      {post.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
