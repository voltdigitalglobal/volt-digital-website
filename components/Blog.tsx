"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, useInView } from "framer-motion";
import { supabase } from "@/lib/supabaseClient";
import { BookOpen } from "lucide-react";

import blog1 from "@/image/recent_news_card1_image.png";
import blog2 from "@/image/recent_news_card2_image1.png";
import blog3 from "@/image/recent_news_card3_image2.png";

// Fallback posts if database is empty
const STATIC_POSTS = [
  {
    title: "For SMEs getting serious about digital",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum......",
    image: blog1.src,
    slug: "for-smes-getting-serious-about-digital",
  },
  {
    title: "How to Scale Online Operations",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum......",
    image: blog2.src,
    slug: "how-to-scale-online-operations",
  },
  {
    title: "Unlocking E-commerce Conversion",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum......",
    image: blog3.src,
    slug: "unlocking-ecommerce-conversion",
  },
];

interface BlogPost {
  title: string;
  description: string;
  image: string;
  slug: string;
  isDynamic?: boolean;
}

export default function Blog() {
  const router = useRouter();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });
  const [posts, setPosts] = useState<BlogPost[]>([]);

  // Drag to scroll state
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragMoved, setDragMoved] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  useEffect(() => {
    const fetchLatestBlogs = async () => {
      try {
        const { data, error } = await supabase
          .from("blogs")
          .select("title, description, image_url, slug")
          .eq("is_active", true)
          .order("published_at", { ascending: false })
          .limit(10); // Increased limit to enable scrolling

        if (error) throw error;

        if (data && data.length > 0) {
          const formatted = data.map((post) => ({
            title: post.title,
            description: post.description || "",
            image: post.image_url || "",
            slug: post.slug,
            isDynamic: true,
          }));
          setPosts(formatted);
        } else {
          setPosts(STATIC_POSTS);
        }
      } catch (err) {
        console.error("Failed to load homepage blogs:", err);
        setPosts(STATIC_POSTS);
      }
    };

    fetchLatestBlogs();
  }, []);

  const onMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setDragMoved(false);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const onMouseLeave = () => {
    setIsDragging(false);
  };

  const onMouseUp = () => {
    setIsDragging(false);
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2; // scroll fast
    if (Math.abs(walk) > 10) {
      setDragMoved(true); // Prevent click if mouse moved
    }
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

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

        <div 
          ref={scrollRef}
          onMouseDown={onMouseDown}
          onMouseLeave={onMouseLeave}
          onMouseUp={onMouseUp}
          onMouseMove={onMouseMove}
          className={`relative w-full overflow-x-auto no-scrollbar pb-12 [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)] ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
        >
          {/* Decorative Connecting Line */}
          <div className="absolute top-[35%] left-0 right-0 h-[1px] border-t border-dashed border-[#1071FF]/40 z-0 hidden lg:block" />

          <div className={`flex gap-8 w-max min-w-full lg:px-[10%] ${posts.length <= 3 ? "justify-center mx-auto" : ""}`}>
            {posts.map((post, idx) => (
                <motion.div
                  key={idx}
                  onClick={(e) => {
                    if (dragMoved) {
                      e.preventDefault();
                      return;
                    }
                    router.push(`/blog/${post.slug}`);
                  }}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: idx * 0.15 }}
                  className="relative z-50 p-[2px] rounded-[32px] bg-gradient-to-b from-[#1071FF] to-transparent group transition-all duration-500 hover:shadow-[0_0_40px_rgba(16,113,255,0.15)] w-[320px] md:w-[420px] flex-shrink-0 cursor-pointer pointer-events-auto"
                >
                  <div className="block h-full w-full bg-gradient-to-b from-[#010C19] to-[#010811] rounded-[30px] p-8 flex flex-col pointer-events-none select-none">
                  {/* Image Container */}
                  <div className="relative w-full aspect-[4/3] rounded-[24px] overflow-hidden mb-8 border border-white/5 bg-[#050A15]">
                    {post.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={post.image}
                        alt={post.title}
                        draggable="false"
                        className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-white/20">
                        <BookOpen className="w-12 h-12" />
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex flex-col gap-4">
                    <h3 className="text-[20px] md:text-[24px] font-bold text-[#1071FF] leading-tight group-hover:underline" title={post.title}>
                      {post.title.length > 50 ? post.title.substring(0, 50) + "..." : post.title}
                    </h3>
                    <p className="text-white/70 text-base md:text-lg leading-relaxed font-normal line-clamp-3">
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
