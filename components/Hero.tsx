"use client";
// Updated fix for TS safety in GSAP animations

import Image from "next/image";
import Link from "next/link";
import { useLayoutEffect, useRef, useCallback, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import bgImage from "@/image/bg.png";
import star from "@/image/star.png";
import doubleStar from "@/image/double_star.png";
import spiral from "@/image/spiral.png";
import logo from "@/image/logo.svg";
import icon1 from "@/image/icon1.png";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}


const NAV_ITEMS = ["HOME", "SERVICES", "BLOG", "ABOUT"];

export default function Hero() {
  const root = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const patternRef = useRef<HTMLDivElement>(null);
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
    // Small delay to let React render the menu DOM
    requestAnimationFrame(() => {
      if (!menuRef.current || !hamburgerRef.current) return;
      const hamburgerRect = hamburgerRef.current.getBoundingClientRect();
      const originX = hamburgerRect.left + hamburgerRect.width / 2;
      const originY = hamburgerRect.top + hamburgerRect.height / 2;
      const clipOrigin = `${originX}px ${originY}px`;
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      menuTlRef.current = tl;

      // Overlay slides in
      tl.fromTo(
        menuRef.current,
        { clipPath: `circle(0% at ${clipOrigin})` },
        { clipPath: `circle(150% at ${clipOrigin})`, duration: 0.9, ease: "power3.inOut" },
        0
      );

      // Close button spins in
      tl.fromTo(
        ".menu-close",
        { rotation: -180, scale: 0, opacity: 0 },
        { rotation: 0, scale: 1, opacity: 1, duration: 0.6, ease: "back.out(1.7)" },
        0.3
      );

      // Menu items stagger from below
      tl.fromTo(
        ".menu-item",
        { yPercent: 100, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.7, stagger: 0.08, ease: "power3.out" },
        0.35
      );

      // Line separators fade in
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

    // Menu items stagger out upward
    tl.to(".menu-item", {
      yPercent: -80,
      opacity: 0,
      duration: 0.4,
      stagger: 0.05,
    }, 0);

    // Lines scale out
    tl.to(".menu-line", {
      scaleX: 0,
      duration: 0.3,
      stagger: 0.04,
      transformOrigin: "right",
    }, 0);

    // Close button spins out
    tl.to(".menu-close", {
      rotation: 180,
      scale: 0,
      opacity: 0,
      duration: 0.35,
    }, 0.1);

    // Overlay closes with circle wipe
    tl.to(menuRef.current, {
      clipPath: `circle(0% at ${clipOrigin})`,
      duration: 0.7,
      ease: "power3.inOut",
    }, 0.25);
  }, []);

  /* ── Custom circle cursor logic ── */
  const lastMousePos = useRef({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: MouseEvent) => {
    lastMousePos.current = { x: e.clientX, y: e.clientY };
    if (!cursorRef.current) return;
    gsap.to(cursorRef.current, {
      x: e.clientX,
      y: e.clientY,
      duration: 0.15,
      ease: "power2.out",
    });
  }, []);

  const handleHeadingEnter = useCallback(() => {
    if (!cursorRef.current) return;
    gsap.to(cursorRef.current, {
      scale: 1,
      opacity: 1,
      duration: 0.3,
      ease: "back.out(1.7)",
    });
  }, []);

  const handleHeadingLeave = useCallback(() => {
    if (!cursorRef.current) return;
    gsap.to(cursorRef.current, {
      scale: 0,
      opacity: 0,
      duration: 0.25,
      ease: "power2.in",
    });
  }, []);

  // Automatically hide cursor on scroll if heading leaves the mouse area
  useEffect(() => {
    const handleScroll = () => {
      // Use document.elementFromPoint to see what's under the mouse at its last known position
      const el = document.elementFromPoint(lastMousePos.current.x, lastMousePos.current.y);
      const isOverHeading = el?.closest(".hero-heading");
      // Failsafe: if we've scrolled past the hero section (e.g. 800px), definitely hide it
      const isOutOfHeroRange = window.scrollY > 800;

      if (!isOverHeading || isOutOfHeroRange) {
        handleHeadingLeave();
      }
    };

    // Check more frequently during scroll for responsiveness
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleHeadingLeave]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      /* ── initial hidden states ── */
      gsap.set(".nav-bar", { y: -80, opacity: 0 });
      gsap.set(".hero-line", { yPercent: 120, opacity: 0 });
      gsap.set(".hero-cta", { y: 40, opacity: 0 });
      gsap.set(".hero-shape", { opacity: 0, scale: 0.5 });
      gsap.set(".hero-bg", { opacity: 0 });
      gsap.set(".hero-pill", { scaleX: 0, transformOrigin: "left center" });
      gsap.set(".custom-cursor", { scale: 0, opacity: 0 });

      /* ── master timeline ── */
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.to(".hero-bg", { opacity: 1, duration: 1.4 }, 0);
      tl.to(".nav-bar", { y: 0, opacity: 1, duration: 1, ease: "power3.out" }, 0.2);
      tl.to(".hero-shape", {
        opacity: 1, scale: 1, duration: 1.6,
        ease: "elastic.out(1, 0.6)", stagger: 0.12,
      }, 0.3);
      tl.to(".hero-line", {
        yPercent: 0, opacity: 1, duration: 1,
        stagger: 0.1, ease: "power3.out",
      }, 0.5);
      tl.to(".hero-pill", { scaleX: 1, duration: 0.7, ease: "back.out(1.7)" }, 0.9);
      tl.to(".hero-cta", { y: 0, opacity: 1, duration: 0.9, ease: "power3.out" }, 1.2);

      /* ── infinite floating ── */
      gsap.to(".shape-spiral", { y: -18, rotation: 8, duration: 5, repeat: -1, yoyo: true, ease: "sine.inOut" });
      gsap.to(".shape-star", { y: 16, rotation: -6, duration: 6, repeat: -1, yoyo: true, ease: "sine.inOut" });
      gsap.to(".shape-double", { y: -12, rotation: 5, duration: 5.5, repeat: -1, yoyo: true, ease: "sine.inOut" });

      /* ── CTA hover ── */
      const btn = root.current?.querySelector(".cta-btn");
      btn?.addEventListener("mouseenter", () => {
        gsap.to(".cta-arrow", { x: 6, duration: 0.35, ease: "power2.out" });
        gsap.to(".cta-btn", { scale: 1.04, duration: 0.35, ease: "power2.out" });
      });
      btn?.addEventListener("mouseleave", () => {
        gsap.to(".cta-arrow", { x: 0, duration: 0.35, ease: "power2.out" });
        gsap.to(".cta-btn", { scale: 1, duration: 0.35, ease: "power2.out" });
      });

      /* ── Pill hover ── */
      const pill = root.current?.querySelector(".hero-pill");
      pill?.addEventListener("mouseenter", () => {
        handleHeadingLeave();
      });
      pill?.addEventListener("mouseleave", () => {
        handleHeadingEnter();
      });

      /* ── Mouse move: parallax + interactive pattern ── */
      const onMove = (e: MouseEvent) => {
        const { innerWidth: w, innerHeight: h } = window;
        const x = (e.clientX / w - 0.5) * 2;
        const y = (e.clientY / h - 0.5) * 2;
        gsap.to(".shape-spiral", { x: x * 20, y: y * 16, duration: 0.8, ease: "power2.out" });
        gsap.to(".shape-star", { x: x * -24, y: y * 20, duration: 0.9, ease: "power2.out" });
        gsap.to(".shape-double", { x: x * 16, y: y * -12, duration: 0.9, ease: "power2.out" });
        if (patternRef.current) {
          gsap.to(patternRef.current, { x: x * -30, y: y * -25, duration: 1.2, ease: "power2.out" });
        }
      };
      window.addEventListener("mousemove", onMove);
      window.addEventListener("mousemove", handleMouseMove);

      const heading = root.current?.querySelector(".hero-heading");
      heading?.addEventListener("mouseenter", handleHeadingEnter as EventListener);
      heading?.addEventListener("mouseleave", handleHeadingLeave as EventListener);

      return () => {
        window.removeEventListener("mousemove", onMove);
        window.removeEventListener("mousemove", handleMouseMove as EventListener);
        heading?.removeEventListener("mouseenter", handleHeadingEnter as EventListener);
        heading?.removeEventListener("mouseleave", handleHeadingLeave as EventListener);
      };
    }, root);

    return () => ctx.revert();
  }, [handleMouseMove, handleHeadingEnter, handleHeadingLeave]);

  return (
    <section ref={root} className="hero-section">
      {/* ── Custom circle cursor ── */}
      <div ref={cursorRef} className="custom-cursor" />

      {/* ── Background layers ── */}
      <div className="hero-bg hero-bg-layer overflow-hidden">
        <div ref={patternRef} className="pattern-wrapper">
          <Image src={bgImage} alt="" fill sizes="120vw" className="hero-pattern-img" style={{ opacity: 1, mixBlendMode: 'normal' }} priority />
        </div>


        <div className="hero-radial-glow" />
        <div className="hero-vignette" />
      </div>

      {/* ── Navigation ── */}
      <nav className="nav-bar">
        <div className="nav-inner">
          <div className="nav-logo relative h-[36px] w-[180px]">
            <div className={`absolute inset-0 transition-all duration-700 ease-in-out ${scrolled ? 'opacity-0 scale-75 blur-sm' : 'opacity-100 scale-100 blur-0'}`}>
              <Image src={logo} alt="Volt Digital" width={180} height={36} priority className="h-full w-auto" />
            </div>
            <div className={`absolute inset-0 transition-all duration-700 ease-in-out flex items-center ${scrolled ? 'opacity-100 scale-100 blur-0' : 'opacity-0 scale-125 blur-sm'}`}>
              <Image src={icon1} alt="Volt Icon" width={36} height={36} priority className="h-full w-auto" />
            </div>
          </div>
          <button ref={hamburgerRef} className="nav-hamburger" aria-label="Open menu" onClick={openMenu}>
            <span className="hamburger-line" />
            <span className="hamburger-line" />
            <span className="hamburger-line" />
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

      {/* ── 3D Shapes ── */}
      <div className="hero-shape shape-spiral">
        <Image src={spiral} alt="" priority width={220} height={220} className="shape-img" />
      </div>
      <div className="hero-shape shape-star">
        <Image src={star} alt="" priority width={240} height={240} className="shape-img" />
      </div>
      <div className="hero-shape shape-double">
        <Image src={doubleStar} alt="" priority width={160} height={160} className="shape-img" />
      </div>

      {/* ── Main content ── */}
      <div className="hero-content">
        <h1 className="hero-heading">
          <span className="hero-line-wrapper">
            <span className="hero-line">
              <span className="text-white-grad">Built to </span>
              <span className="text-italic-script text-white-pure">Grow </span>
              <span className="text-white-grad">Your</span>
            </span>
          </span>

          <span className="hero-line-wrapper">
            <span className="hero-line">
              <span className="text-white-grad">Business </span>
              <span className="text-white-grad"> from</span>
            </span>
          </span>

          <span className="hero-line-wrapper">
            <span className="hero-line">
              <span className="text-white-grad">Marketing to </span>
              <span className="text-italic-script text-systems">Systems</span>
            </span>
          </span>
        </h1>

        <div className="hero-cta">
          <button type="button" className="cta-btn">
            <span className="cta-flash" />
            Book Growth Audit
            <span className="cta-arrow">→</span>
          </button>
        </div>
      </div>
    </section>
  );
}
