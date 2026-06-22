"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useCallback, useState, useEffect } from "react";
import gsap from "gsap";

import logo from "@/image/logo.svg";
import icon1 from "@/image/icon1.png";

const NAV_ITEMS = ["HOME", "SERVICES", "BLOG", "ABOUT"];

export default function Navbar({ variant = "default" }: { variant?: "default" | "blog" }) {
  const menuRef = useRef<HTMLDivElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const menuTlRef = useRef<gsap.core.Timeline | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll-based navbar transformation
  useEffect(() => {
    const handleScroll = () => {
      const isMobile = window.innerWidth < 768;
      const isScrolled = window.scrollY > 100 && !isMobile;
      
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }

      if (isMobile) {
        gsap.to(".nav-bar", { width: "100%", duration: 0.3, ease: "power3.out" });
      } else {
        gsap.to(".nav-bar", {
          width: isScrolled ? "60%" : "80%",
          duration: 0.6,
          ease: "power3.inOut",
        });
      }
    };

    window.addEventListener("scroll", handleScroll);
    // Initial check
    handleScroll();
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrolled]);

  // Animate nav entry on mount
  useEffect(() => {
    gsap.fromTo(
      ".nav-bar",
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.9, ease: "power3.out", delay: 0.1 }
    );
  }, []);

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

    tl.to(".menu-item", { yPercent: -80, opacity: 0, duration: 0.4, stagger: 0.05 }, 0);
    tl.to(".menu-line", { scaleX: 0, duration: 0.3, stagger: 0.04, transformOrigin: "right" }, 0);
    tl.to(".menu-close", { rotation: 180, scale: 0, opacity: 0, duration: 0.35 }, 0.1);
    tl.to(
      menuRef.current,
      { clipPath: `circle(0% at ${clipOrigin})`, duration: 0.7, ease: "power3.inOut" },
      0.25
    );
  }, []);

  return (
    <>
      {/* ── Navigation ── */}
      <nav className={`nav-bar ${variant === "blog" ? "bg-white/80 shadow-sm !w-[90%] md:!w-[80%] max-w-6xl mx-auto rounded-full mt-4" : ""}`}>
        <div className={`nav-inner ${variant === "blog" ? "px-8 py-4 flex items-center justify-between w-full" : ""}`}>
          
          {variant === "blog" ? (
            <Link href="/" className="text-[#1071FF] font-bold text-2xl tracking-tight z-50 relative">
              Volt Digital
            </Link>
          ) : (
            <div className="nav-logo relative h-[36px] w-[180px]">
              <div
                className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                  scrolled ? "opacity-0 scale-75 blur-sm" : "opacity-100 scale-100 blur-0"
                }`}
              >
                <Image src={logo} alt="Volt Digital" width={180} height={36} priority className="h-full w-auto" />
              </div>
              <div
                className={`absolute inset-0 transition-all duration-700 ease-in-out flex items-center ${
                  scrolled ? "opacity-100 scale-100 blur-0" : "opacity-0 scale-125 blur-sm"
                }`}
              >
                <Image src={icon1} alt="Volt Icon" width={36} height={36} priority className="h-full w-auto" />
              </div>
            </div>
          )}

          <button 
            ref={hamburgerRef} 
            className={variant === "blog" ? "font-bold text-black tracking-widest uppercase text-sm z-50 relative hover:text-[#1071FF] transition-colors" : "nav-hamburger"} 
            aria-label="Open menu" 
            onClick={openMenu}
          >
            {variant === "blog" ? (
              "MENU"
            ) : (
              <>
                <span className="hamburger-line" />
                <span className="hamburger-line" />
                <span className="hamburger-line" />
              </>
            )}
          </button>
        </div>
      </nav>

      {/* ── Fullscreen Menu Overlay ── */}
      {menuOpen && (
        <div ref={menuRef} className="menu-overlay">
          <button className="menu-close" aria-label="Close menu" onClick={closeMenu}>
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <line x1="4" y1="4" x2="24" y2="24" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="24" y1="4" x2="4" y2="24" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </button>

          <div className="menu-content">
            {NAV_ITEMS.map((item, i) => (
              <div key={item} className="menu-item-wrapper">
                {i > 0 && <div className="menu-line" />}
                <div className="menu-item-overflow">
                  <Link
                    href={
                      item === "SERVICES"
                        ? "/services"
                        : item === "ABOUT"
                        ? "/about"
                        : item === "BLOG"
                        ? "/blog"
                        : "/"
                    }
                    className="menu-item"
                    onClick={closeMenu}
                  >
                    <span className="menu-arrow">→</span>
                    <span className="menu-text">{item}</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
