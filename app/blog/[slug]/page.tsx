"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Search, BookOpen } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import heroImg from "@/image/recent_news_card1_image.png";

interface Blog {
  id: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  image_url: string;
  author: string;
  created_at: string;
  published_at: string;
}

export default function BlogArticlePage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;

  const [blog, setBlog] = useState<Blog | null>(null);
  const [recentBlogs, setRecentBlogs] = useState<Blog[]>([]);
  const [notFound, setNotFound] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [shareUrl, setShareUrl] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") setShareUrl(window.location.href);
  }, []);

  useEffect(() => {
    if (!slug) return;

    const fetchBlogData = async () => {
      // Fetch current blog by slug
      const { data: blogData, error: blogError } = await supabase
        .from("blogs")
        .select("*")
        .eq("slug", slug)
        .eq("is_active", true)
        .single();

      if (blogError || !blogData) {
        setNotFound(true);
      } else {
        setBlog(blogData);
      }

      // Fetch recent blogs for sidebar
      const { data: recData } = await supabase
        .from("blogs")
        .select("*")
        .eq("is_active", true)
        .neq("slug", slug)
        .order("published_at", { ascending: false })
        .limit(3);

      setRecentBlogs(recData || []);
    };

    fetchBlogData();
  }, [slug]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/blog?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const renderContent = (text: string) => {
    if (!text) return null;
    if (/<[a-z][\s\S]*>/i.test(text)) {
      return (
        <div
          dangerouslySetInnerHTML={{ __html: text }}
          className="prose prose-lg max-w-none text-black/80 font-light leading-relaxed"
        />
      );
    }
    return (
      <div className="prose prose-lg max-w-none text-black/80 font-light leading-relaxed">
        {text.split(/\n\s*\n/).map((para, i) => (
          <p className="mb-6" key={i}>{para}</p>
        ))}
      </div>
    );
  };

  // Article not found state
  if (notFound) {
    return (
      <main className="relative min-h-screen bg-white text-black pt-32 flex flex-col justify-between">
        <Navbar />
        <div className="max-w-md mx-auto text-center py-20 px-6">
          <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-6" />
          <h1 className="text-3xl font-bold mb-4">Article Not Found</h1>
          <p className="text-gray-500 mb-8 font-light">
            The article you are looking for does not exist or has been removed.
          </p>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 bg-[#1071FF] text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transition-all"
          >
            Back to Blog
          </Link>
        </div>
        <Footer />
      </main>
    );
  }

  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(blog?.title || "");
  const socialLinks = {
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    whatsapp: `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`,
    pinterest: `https://pinterest.com/pin/create/button/?url=${encodedUrl}&media=${encodeURIComponent(blog?.image_url || "")}&description=${encodedTitle}`,
  };

  return (
    <main className="relative min-h-screen bg-white overflow-x-hidden pt-32 text-black">
      <Navbar />

      {/* Header Section */}
      <div className="max-w-5xl mx-auto px-6 text-center flex flex-col gap-4 mb-12">
        <p className="font-bold text-lg text-black">
          {blog ? `Published: ${new Date(blog.published_at).toLocaleDateString("en-GB")}` : "\u00A0"}
        </p>
        <h1 className="text-4xl md:text-6xl font-light text-[#1071FF] tracking-tight leading-tight min-h-[1em]">
          {blog?.title || ""}
        </h1>
      </div>

      {/* Main Container */}
      <div className="max-w-[1400px] mx-auto px-6 mb-32">
        {/* Hero Image */}
        <div className="relative w-full aspect-[21/9] md:aspect-[2.5/1] rounded-[32px] border-[12px] border-[#1071FF] overflow-hidden z-0 bg-gray-100">
          <Image
            src={blog?.image_url || heroImg.src}
            alt={blog?.title || "Blog"}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Content Layout */}
        <div className="relative z-10 flex flex-col lg:flex-row justify-between -mt-12 md:-mt-24 xl:-mt-32 lg:px-4">

          {/* Left Sidebar (Social Icons) */}
          <div className="hidden lg:flex flex-col gap-6 w-[80px] shrink-0 pt-16 md:pt-32 xl:pt-40 items-center">
            <SocialIcon type="linkedin" href={socialLinks.linkedin} />
            <SocialIcon type="twitter" href={socialLinks.twitter} />
            <SocialIcon type="pinterest" href={socialLinks.pinterest} />
            <SocialIcon type="whatsapp" href={socialLinks.whatsapp} />
            <SocialIcon type="facebook" href={socialLinks.facebook} />
          </div>

          {/* Main Article Content */}
          <div className="flex-1 bg-white p-6 md:p-10 lg:p-12 xl:p-16 max-w-4xl mx-auto lg:mx-0 w-full mt-8 lg:mt-0 shadow-[0_-10px_40px_rgba(0,0,0,0.05)] lg:shadow-none">
            {blog ? renderContent(blog.content) : (
              <div className="space-y-4 animate-pulse">
                <div className="h-4 bg-gray-100 rounded w-full" />
                <div className="h-4 bg-gray-100 rounded w-5/6" />
                <div className="h-4 bg-gray-100 rounded w-4/6" />
                <div className="h-4 bg-gray-100 rounded w-full mt-8" />
                <div className="h-4 bg-gray-100 rounded w-5/6" />
                <div className="h-4 bg-gray-100 rounded w-3/6" />
              </div>
            )}
          </div>

          {/* Right Sidebar */}
          <div className="w-full lg:w-[320px] xl:w-[360px] shrink-0 pt-12 lg:pt-32 xl:pt-40 flex flex-col gap-12">

            {/* Search Bar */}
            <form onSubmit={handleSearchSubmit} className="relative w-full">
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#F3F4F6] text-black rounded-full py-4 pl-6 pr-12 outline-none placeholder:text-gray-500 focus:ring-2 focus:ring-[#1071FF]/50 transition-all"
              />
              <button type="submit" aria-label="Search">
                <Search className="absolute right-5 top-1/2 -translate-y-1/2 text-[#1071FF] w-5 h-5 cursor-pointer" />
              </button>
            </form>

            {/* Recent Blogs */}
            <div className="flex flex-col gap-6">
              <h3 className="text-2xl font-bold text-black">Recent Blogs</h3>
              <div className="flex flex-col gap-4">
                {recentBlogs.length > 0
                  ? recentBlogs.map((recBlog) => (
                      <Link
                        href={`/blog/${recBlog.slug}`}
                        key={recBlog.id}
                        className="block bg-[#F3F4F6] hover:bg-gray-200 transition-colors rounded-[20px] p-6"
                      >
                        <p className="text-[#1071FF] font-medium text-lg leading-snug">
                          {recBlog.title}
                        </p>
                      </Link>
                    ))
                  : [1, 2, 3].map((i) => (
                      <div key={i} className="bg-[#F3F4F6] rounded-[20px] p-6 h-[72px] animate-pulse" />
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

function SocialIcon({ type, href }: { type: string; href: string }) {
  const commonClasses = "w-8 h-8 text-black hover:text-[#1071FF] transition-colors cursor-pointer";

  const renderSVG = () => {
    switch (type) {
      case "linkedin":
        return (
          <svg className={commonClasses} viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
          </svg>
        );
      case "twitter":
        return (
          <svg className={commonClasses} viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.008 4.076H5.078z"/>
          </svg>
        );
      case "pinterest":
        return (
          <svg className={commonClasses} viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0c-6.627 0-12 5.372-12 12 0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.969-2.915 2.176-2.915 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.923 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146 1.124.347 2.317.535 3.55.535 6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/>
          </svg>
        );
      case "whatsapp":
        return (
          <svg className={commonClasses} viewBox="0 0 24 24" fill="currentColor">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.347-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.876 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
          </svg>
        );
      case "facebook":
        return (
          <svg className={commonClasses} viewBox="0 0 24 24" fill="currentColor">
            <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" aria-label={`Share on ${type}`}>
      {renderSVG()}
    </a>
  );
}
