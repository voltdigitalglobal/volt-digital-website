"use client";

import Image from "next/image";
import Link from "next/link";
import { useLayoutEffect, useRef, useCallback, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";

import logo from "@/image/logo_black.png";
import icon1 from "@/image/icon1.png";
import digitalMarketing from "@/image/digital marketing.png";
import performanceMarketing from "@/image/digital marketing-1.png";
import digitalTransformation from "@/image/digital transformation.png";
import businessConsulting from "@/image/business consulting.png";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const NAV_ITEMS = ["HOME", "SERVICES", "BLOG", "ABOUT"];

const CARDS = [
  { id: 1, title: "Digital Marketing", image: digitalMarketing },
  { id: 2, title: "Performance Marketing", image: performanceMarketing },
  { id: 3, title: "Digital Transformation", image: digitalTransformation },
  { id: 4, title: "Business Consulting", image: businessConsulting },
];

export default function Hero() {
  const root = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const menuTlRef = useRef<gsap.core.Timeline | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll-based navbar transformation
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 500;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);

        // Transform width smoothly
        gsap.to(".nav-bar", {
          width: isScrolled ? "60%" : "80%",
          duration: 0.6,
          ease: "power3.inOut"
        });
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrolled]);

  /* ── Menu open/close with GSAP ── */
  const openMenu = useCallback(() => {
    setMenuOpen(true);
    requestAnimationFrame(() => {
      if (!menuRef.current || !hamburgerRef.current) return;
      const hamburgerRect = hamburgerRef.current.getBoundingClientRect();
      const originX = hamburgerRect.left + hamburgerRect.width / 2;
      const originY = hamburgerRect.top + hamburgerRect.height / 2;
      const clipOrigin = `${originX}px ${originY}px`;
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      menuTlRef.current = tl;

      tl.fromTo(
        menuRef.current,
        { clipPath: `circle(0% at ${clipOrigin})` },
        { clipPath: `circle(150% at ${clipOrigin})`, duration: 0.9, ease: "power3.inOut" },
        0
      );

      tl.fromTo(
        ".menu-close",
        { rotation: -180, scale: 0, opacity: 0 },
        { rotation: 0, scale: 1, opacity: 1, duration: 0.6, ease: "back.out(1.7)" },
        0.3
      );

      tl.fromTo(
        ".menu-item",
        { yPercent: 100, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.7, stagger: 0.08, ease: "power3.out" },
        0.35
      );

      tl.fromTo(
        ".menu-line",
        { scaleX: 0, transformOrigin: "left" },
        { scaleX: 1, duration: 0.5, stagger: 0.06, ease: "power2.out" },
        0.5
      );
    });
  }, []);

  const closeMenu = useCallback(() => {
    if (!menuRef.current || !hamburgerRef.current) return;
    const hamburgerRect = hamburgerRef.current.getBoundingClientRect();
    const originX = hamburgerRect.left + hamburgerRect.width / 2;
    const originY = hamburgerRect.top + hamburgerRect.height / 2;
    const clipOrigin = `${originX}px ${originY}px`;

    const tl = gsap.timeline({
      defaults: { ease: "power3.in" },
      onComplete: () => setMenuOpen(false),
    });

    tl.to(".menu-item", {
      yPercent: -80,
      opacity: 0,
      duration: 0.4,
      stagger: 0.05,
    }, 0);

    tl.to(".menu-line", {
      scaleX: 0,
      duration: 0.3,
      stagger: 0.04,
      transformOrigin: "right",
    }, 0);

    tl.to(".menu-close", {
      rotation: 180,
      scale: 0,
      opacity: 0,
      duration: 0.35,
    }, 0.1);

    tl.to(menuRef.current, {
      clipPath: `circle(0% at ${clipOrigin})`,
      duration: 0.7,
      ease: "power3.inOut",
    }, 0.25);
  }, []);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      /* ── initial hidden states ── */
      gsap.set(".nav-bar", { y: -80, opacity: 0 });
      gsap.set(".hero-line", { y: 30, opacity: 0 });
      gsap.set(".hero-cta-btn", { scale: 0.8, opacity: 0 });
      gsap.set(".hero-card", { y: 50, opacity: 0 });

      /* ── master timeline ── */
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.to(".nav-bar", { y: 0, opacity: 1, duration: 1, ease: "power3.out" }, 0.2);
      tl.to(".hero-line", {
        y: 0, opacity: 1, duration: 1,
        stagger: 0.15,
      }, 0.4);
      tl.to(".hero-cta-btn", { scale: 1, opacity: 1, duration: 0.6, ease: "back.out(1.5)" }, 0.8);
      tl.to(".hero-card", {
        y: 0, opacity: 1, duration: 0.8,
        stagger: 0.15,
      }, 1.0);

    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative min-h-screen bg-white flex flex-col pt-6 pb-12 px-4 md:px-8 overflow-hidden font-sans">

      {/* ── Navigation ── */}
      <nav className="nav-bar">
        <div className="nav-inner transition-colors duration-500 !bg-transparent !bg-none !border-transparent" style={{ border: 'none' }}>
          <div className="nav-logo relative h-[36px] w-[180px]">
            <div className={`absolute inset-0 transition-all duration-700 ease-in-out ${scrolled ? 'opacity-0 scale-75 blur-sm' : 'opacity-100 scale-100 blur-0'}`}>
              <Image src={logo} alt="Volt Digital" width={180} height={36} priority className="h-full w-auto" />
            </div>
            <div className={`absolute inset-0 transition-all duration-700 ease-in-out flex items-center ${scrolled ? 'opacity-100 scale-100 blur-0' : 'opacity-0 scale-125 blur-sm'}`}>
              <Image src={icon1} alt="Volt Icon" width={36} height={36} priority className="h-full w-auto" />
            </div>
          </div>
          <button ref={hamburgerRef} className="nav-hamburger" aria-label="Open menu" onClick={openMenu}>
            <span className="hamburger-line !bg-[#1071FF]" />
            <span className="hamburger-line !bg-[#1071FF]" />
            <span className="hamburger-line !bg-[#1071FF]" />
          </button>
        </div>
      </nav>

      {/* ════════════════════════════════════
          FULLSCREEN MENU OVERLAY
          ════════════════════════════════════ */}
      {menuOpen && (
        <div ref={menuRef} className="menu-overlay">
          {/* Close button */}
          <button className="menu-close" aria-label="Close menu" onClick={closeMenu}>
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <line x1="4" y1="4" x2="24" y2="24" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="24" y1="4" x2="4" y2="24" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </button>

          {/* Menu items */}
          <div className="menu-content">
            {NAV_ITEMS.map((item, i) => (
              <div key={item} className="menu-item-wrapper">
                {i > 0 && <div className="menu-line" />}
                <div className="menu-item-overflow">
                  <Link href={item === "SERVICES" ? "/services" : item === "ABOUT" ? "/about" : item === "BLOG" ? "/blog" : `/#${item.toLowerCase()}`} className="menu-item" onClick={closeMenu}>
                    <span className="menu-arrow">→</span>
                    <span className="menu-text">{item}</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Main Content ── */}
      <div className="flex-1 flex flex-col items-center justify-center text-center mt-[40px] md:mt-24 max-w-5xl mx-auto w-full z-10">
        <h1 className="mt-[40px] md:mt-0 text-4xl md:text-6xl lg:text-7xl font-normal leading-[1.2] md:leading-[1.3] tracking-tight">
          <div className="overflow-hidden pb-[0.25em] -mb-[0.25em]"><div className="hero-line text-black">We create striking</div></div>
          <div className="overflow-hidden pb-[0.25em] -mb-[0.25em]"><div className="hero-line text-black">concepts and branding</div></div>
          <div className="overflow-hidden pb-[0.25em] -mb-[0.25em]"><div className="hero-line text-gray-400">that help your business</div></div>
          <div className="overflow-hidden pb-[0.25em] -mb-[0.25em]"><div className="hero-line text-gray-400">grow fast</div></div>
        </h1>

        <div className="mt-12 md:mt-16">
          <Link href="#contact" className="hero-cta-btn inline-flex bg-[#1071FF] text-white px-8 py-4 rounded-full text-lg font-semibold items-center gap-3 hover:bg-[#0d62df] hover:scale-105 active:scale-95 transition-all shadow-[0_8px_20px_rgba(16,113,255,0.3)]">
            Book Growth Audit <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>

      {/* ── Cards Section ── */}
      {/* Mobile: horizontal scroll; Desktop: 4-col grid */}
      <div className="w-full mt-20 z-10">
        {/* Mobile scroll wrapper */}
        <div className="flex gap-4 overflow-x-auto no-scrollbar px-4 pb-4 md:hidden">
          {CARDS.map((card) => (
            <div
              key={card.id}
              className="hero-card group relative flex-shrink-0 w-[260px] h-[220px] bg-[#E5E5E5] rounded-[32px] overflow-hidden flex flex-col justify-end p-6 cursor-pointer transition-[height] duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] hover:h-[320px]"
            >
              <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out">
                <Image src={card.image} alt={card.title} fill className="object-cover" sizes="260px" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
              <div className="relative z-10 flex flex-col">
                <h3 className="text-black group-hover:text-white text-xl group-hover:text-[25px] font-semibold transition-all duration-500 ease-in-out leading-tight w-3/4">
                  {card.title}
                </h3>
                <div className="overflow-hidden mt-4 h-0 group-hover:h-auto group-hover:overflow-visible">
                  <Link href="#contact" className="inline-block bg-white text-black text-sm font-bold px-5 py-2 rounded-full opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] delay-100">
                    Get start
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop grid */}
        <div className="hidden md:grid max-w-7xl mx-auto grid-cols-2 lg:grid-cols-4 gap-6 items-start px-4">
          {CARDS.map((card) => (
            <div
              key={card.id}
              className="hero-card group relative w-full h-[220px] bg-[#E5E5E5] rounded-[32px] overflow-hidden flex flex-col justify-end p-6 cursor-pointer transition-[height] duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] hover:h-[320px]"
            >
              <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out">
                <Image src={card.image} alt={card.title} fill className="object-cover" sizes="(max-width: 1024px) 50vw, 25vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
              <div className="relative z-10 flex flex-col">
                <h3 className="text-black group-hover:text-white text-xl md:text-2xl group-hover:text-[25px] md:group-hover:text-[29px] font-semibold transition-all duration-500 ease-in-out leading-tight w-3/4">
                  {card.title}
                </h3>
                <div className="overflow-hidden mt-4 h-0 group-hover:h-auto group-hover:overflow-visible">
                  <Link href="#contact" className="inline-block bg-white text-black text-sm font-bold px-5 py-2 rounded-full opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] delay-100">
                    Get start
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
