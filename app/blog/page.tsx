"use client";

import Image from "next/image";
import Link from "next/link";
import { Search } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// We'll use this placeholder image for the hero
import heroImg from "@/image/recent_news_card1_image.png";

const RECENT_BLOGS = [
  "For SMEs getting serious about digital",
  "For SMEs getting serious about digital",
  "For SMEs getting serious about digital"
];

export default function BlogArticlePage() {
  return (
    <main className="relative min-h-screen bg-white overflow-x-hidden pt-32 text-black">
      <Navbar />
      {/* Header Section */}
      <div className="max-w-5xl mx-auto px-6 text-center flex flex-col gap-4 mb-12">
        <p className="font-bold text-lg text-black">Published: 24/04/2026</p>
        <h1 className="text-4xl md:text-6xl font-light text-[#1071FF] tracking-tight leading-tight">
          For SMEs getting serious about digital
        </h1>
      </div>

      {/* Main Container */}
      <div className="max-w-[1400px] mx-auto px-6 mb-32">
        {/* Hero Image */}
        <div className="relative w-full aspect-[21/9] md:aspect-[2.5/1] rounded-[32px] border-[12px] border-[#1071FF] overflow-hidden z-0">
          <Image 
            src={heroImg} 
            alt="Blog Hero Image" 
            fill 
            className="object-cover"
            priority
          />
        </div>

        {/* Content Layout */}
        <div className="relative z-10 flex flex-col lg:flex-row justify-between -mt-12 md:-mt-24 xl:-mt-32 lg:px-4">
          
          {/* Left Sidebar (Social Icons) */}
          <div className="hidden lg:flex flex-col gap-6 w-[80px] shrink-0 pt-16 md:pt-32 xl:pt-40 items-center">
            <SocialIcon type="linkedin" />
            <SocialIcon type="twitter" />
            <SocialIcon type="pinterest" />
            <SocialIcon type="whatsapp" />
            <SocialIcon type="facebook" />
          </div>

          {/* Main Article Content */}
          <div className="flex-1 bg-white p-6 md:p-10 lg:p-12 xl:p-16 max-w-4xl mx-auto lg:mx-0 w-full mt-8 lg:mt-0 shadow-[0_-10px_40px_rgba(0,0,0,0.05)] lg:shadow-none">
            <div className="prose prose-lg max-w-none text-black/80 font-light leading-relaxed">
              <p className="mb-6">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&apos;s standard dummy text ever since the 1500s. when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
              </p>

              <h2 className="text-3xl font-bold text-black mt-12 mb-4">Why do we use it?</h2>
              <p className="mb-6">
                It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using &apos;Content here, content here&apos;, making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for &apos;lorem ipsum&apos; will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
              </p>

              <h2 className="text-3xl font-bold text-black mt-12 mb-4">Where does it come from?</h2>
              <p className="mb-6">
                Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.
              </p>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="w-full lg:w-[320px] xl:w-[360px] shrink-0 pt-12 lg:pt-32 xl:pt-40 flex flex-col gap-12">
            
            {/* Search Bar */}
            <div className="relative w-full">
              <input 
                type="text" 
                placeholder="Search" 
                className="w-full bg-[#F3F4F6] text-black rounded-full py-4 pl-6 pr-12 outline-none placeholder:text-gray-500 focus:ring-2 focus:ring-[#1071FF]/50 transition-all"
              />
              <Search className="absolute right-5 top-1/2 -translate-y-1/2 text-[#1071FF] w-5 h-5" />
            </div>

            {/* Recent Blogs */}
            <div className="flex flex-col gap-6">
              <h3 className="text-2xl font-bold text-black">Recent Blogs</h3>
              <div className="flex flex-col gap-4">
                {RECENT_BLOGS.map((blog, idx) => (
                  <Link 
                    href="#" 
                    key={idx}
                    className="block bg-[#F3F4F6] hover:bg-gray-200 transition-colors rounded-[20px] p-6"
                  >
                    <p className="text-[#1071FF] font-medium text-lg leading-snug">
                      {blog}
                    </p>
                  </Link>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}

// Simple social icon SVG wrappers
function SocialIcon({ type }: { type: string }) {
  const commonClasses = "w-8 h-8 text-black hover:text-[#1071FF] transition-colors cursor-pointer";
  
  switch (type) {
    case 'linkedin':
      return (
        <svg className={commonClasses} viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
        </svg>
      );
    case 'twitter':
      // X logo
      return (
        <svg className={commonClasses} viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.008 4.076H5.078z"/>
        </svg>
      );
    case 'pinterest':
      return (
        <svg className={commonClasses} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0c-6.627 0-12 5.372-12 12 0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.969-2.915 2.176-2.915 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.923 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146 1.124.347 2.317.535 3.55.535 6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/>
        </svg>
      );
    case 'whatsapp':
      return (
        <svg className={commonClasses} viewBox="0 0 24 24" fill="currentColor">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.347-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.876 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
        </svg>
      );
    case 'facebook':
      return (
        <svg className={commonClasses} viewBox="0 0 24 24" fill="currentColor">
          <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
        </svg>
      );
    default:
      return null;
  }
}
