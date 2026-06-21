"use client";

import { useLayoutEffect, useRef, useState, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import servicesBg from "@/image/services.png";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const SERVICE_TEXTS = [
  "Digital Marketing",
  "Performance Marketing",
  "Digital Transformation",
  "Business Consulting"
];

export default function Services() {
  const root = useRef<HTMLDivElement>(null);
  const rotatingTextRef = useRef<HTMLSpanElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  // Text rotation logic
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % SERVICE_TEXTS.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  // Animate the text change
  useLayoutEffect(() => {
    if (!rotatingTextRef.current) return;

    const tl = gsap.timeline();

    // Animate text out and in
    tl.fromTo(
      rotatingTextRef.current,
      { y: 15, opacity: 0, filter: "blur(4px)" },
      { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.8, ease: "power3.out" }
    );
  }, [index]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Reveal lines animation
      gsap.fromTo(".reveal-text",
        {
          y: 60,
          opacity: 0,
        },
        {
          scrollTrigger: {
            trigger: root.current,
            start: "top 85%",
          },
          y: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.15,
          ease: "power4.out",
          immediateRender: false,
          onComplete: () => {
            // Enable smooth width transitions for the container to handle text length changes
            if (textContainerRef.current) {
              textContainerRef.current.style.transition = "all 0.8s cubic-bezier(0.65, 0, 0.35, 1)";
            }
          }
        }
      );

      // Container expansion effect on scroll (no pinning)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: "top 95%",
          end: "top 20%",
          scrub: true,
        }
      });

      tl.to(".img-container", {
        maxWidth: "100%",
        maxHeight: "100%",
        borderRadius: 0,
        ease: "none",
      }, 0)
        .to(".img-wrapper", {
          paddingLeft: 0,
          paddingRight: 0,
          paddingTop: 0,
          paddingBottom: 0,
          ease: "none",
        }, 0);

      // Image zoom effect on scroll (no pinning)
      gsap.to(".services-hero-img", {
        scale: 1.15,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top 95%",
          end: "top 20%",
          scrub: true,
        },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="services-section relative w-full h-[650px] md:h-[800px] bg-white overflow-hidden flex items-center justify-center">

      {/* Services Header Image & Text Overlay */}
      <div className="img-wrapper w-full h-full p-6 md:p-12 flex items-center justify-center">
        <div className="reveal-text img-container relative w-full h-full max-w-7xl rounded-[32px] overflow-hidden opacity-0 translate-y-[60px] shadow-2xl flex items-center justify-center">
          <Image
            src={servicesBg}
            alt="Our Services"
            fill
            className="services-hero-img object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40 z-0" />

          <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
            <div className="flex flex-col items-center justify-center space-y-1 font-['Satoshi']">
              <div className="overflow-hidden">
                <h2 className="reveal-text text-white text-4xl md:text-[64px] font-bold tracking-tight leading-[1.1] opacity-0">
                  A Performance-first Growth
                </h2>
              </div>

              <div className="overflow-hidden">
                <h2 className="reveal-text text-white text-4xl md:text-[64px] font-bold tracking-tight leading-[1.1] opacity-0">
                  Consultancy Helping to Scale
                </h2>
              </div>

              <div className="flex flex-wrap md:flex-nowrap items-center justify-center gap-x-4 w-full whitespace-nowrap">
                <div className="overflow-hidden">
                  <h2 className="reveal-text text-white text-4xl md:text-[64px] font-bold tracking-tight leading-[1.1] opacity-0">
                    Revenue Through
                  </h2>
                </div>

                <div
                  ref={textContainerRef}
                  className="reveal-text inline-flex items-center justify-center opacity-0 translate-y-[60px]"
                  style={{ willChange: "width, transform" }}
                >
                  <span
                    ref={rotatingTextRef}
                    key={index}
                    className="text-[#1071FF] text-3xl md:text-[64px] font-bold tracking-tight leading-[1.1] whitespace-nowrap"
                  >
                    {SERVICE_TEXTS[index]}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
