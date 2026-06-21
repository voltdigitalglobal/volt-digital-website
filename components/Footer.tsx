"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import logo from "@/image/logo.svg";

const QUICK_LINKS = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "Methodology", href: "/#methodology" },
  { name: "Why Volt", href: "/#whyvolt" },
  { name: "Blog", href: "/#blog" },
  { name: "Contact", href: "/#contact" },
];

const SERVICES = [
  "Digital Marketing",
  "Performance Marketing",
  "Digital Transformation",
  "Business Consulting",
];

export default function Footer() {
  return (
    <footer className="relative bg-[#010C19] pt-24 pb-12 px-6 overflow-hidden border-t border-white/5">
      {/* Background Decorative Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Column */}
          <div className="flex flex-col gap-6">
            <Link href="/" className="inline-block">
              <Image src={logo} alt="Volt Digital" width={150} height={30} className="h-8 w-auto" />
            </Link>
            <p className="text-white/60 text-lg leading-relaxed max-w-xs">
              Empowering SMEs with enterprise-grade marketing systems and digital transformation strategies.
            </p>
            {/* Social Links */}
            <div className="flex gap-4 mt-2">
              <Link href="#" className="w-11 h-11 rounded-full border border-white/10 bg-white/5 flex items-center justify-center hover:bg-[#1071FF] hover:border-[#1071FF] transition-all cursor-pointer group">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/40 group-hover:text-white transition-colors">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </Link>
              <Link href="#" className="w-11 h-11 rounded-full border border-white/10 bg-white/5 flex items-center justify-center hover:bg-[#1071FF] hover:border-[#1071FF] transition-all cursor-pointer group">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/40 group-hover:text-white transition-colors">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </Link>
              <Link href="#" className="w-11 h-11 rounded-full border border-white/10 bg-white/5 flex items-center justify-center hover:bg-[#1071FF] hover:border-[#1071FF] transition-all cursor-pointer group">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/40 group-hover:text-white transition-colors">
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                </svg>
              </Link>
              <Link href="#" className="w-11 h-11 rounded-full border border-white/10 bg-white/5 flex items-center justify-center hover:bg-[#1071FF] hover:border-[#1071FF] transition-all cursor-pointer group">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/40 group-hover:text-white transition-colors">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-6">
            <h4 className="text-white text-xl font-bold">Quick Links</h4>
            <ul className="flex flex-col gap-4">
              {QUICK_LINKS.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-white/60 hover:text-[#1071FF] transition-colors text-lg">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="flex flex-col gap-6">
            <h4 className="text-white text-xl font-bold">Services</h4>
            <ul className="flex flex-col gap-4">
              {SERVICES.map((service) => (
                <li key={service} className="text-white/60 hover:text-[#1071FF] transition-colors text-lg cursor-pointer">
                  {service}
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter / Contact Note */}
          <div className="flex flex-col gap-6">
            <h4 className="text-white text-xl font-bold">Get Started</h4>
            <p className="text-white/60 text-lg">
              Ready to amplify your business? Book your growth audit today.
            </p>
            <Link 
              href="#contact" 
              className="inline-flex items-center gap-2 text-[#1071FF] font-bold text-lg group"
            >
              Book Growth Audit
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-white/40 text-sm">
            © {new Date().getFullYear()} Volt Digital. All rights reserved.
          </p>
          <div className="flex gap-8 text-white/40 text-sm">
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
