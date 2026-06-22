"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, BookOpen, ArrowRight } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Fallback image
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

export default function BlogListPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialSearchQuery = searchParams ? searchParams.get('search') || "" : "";

  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [recentBlogs, setRecentBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        let query = supabase.from("blogs").select("*").eq("is_active", true).order("published_at", { ascending: false });
        
        if (initialSearchQuery) {
          query = query.ilike('title', `%${initialSearchQuery}%`);
        }

        const { data: allBlogs, error: allBlogsError } = await query;
        if (allBlogsError) throw allBlogsError;
        setBlogs(allBlogs || []);

        const { data: recData, error: recError } = await supabase
          .from("blogs")
          .select("*")
          .eq("is_active", true)
          .order("published_at", { ascending: false })
          .limit(4);

        if (recError) throw recError;
        setRecentBlogs(recData || []);
      } catch (err) {
        console.error("Error fetching blogs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [initialSearchQuery]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/blog?search=${encodeURIComponent(searchQuery)}`);
    } else {
      router.push(`/blog`);
    }
  };

  return (
    <main className="relative min-h-screen bg-[#F8FAFC] overflow-x-hidden pt-32 text-black font-sans flex flex-col justify-between">
      <div>
        <Navbar variant="blog" />

        {/* Header Section */}
        <div className="max-w-5xl mx-auto px-6 text-center flex flex-col gap-4 mb-16">
          <p className="font-bold text-lg text-[#1071FF] tracking-wide uppercase">Our Blog</p>
          <h1 className="text-4xl md:text-6xl font-light text-black tracking-tight leading-tight">
            Latest News & <span className="text-[#1071FF] font-semibold">Updates</span>
          </h1>
        </div>

        {/* Main Container */}
        <div className="max-w-[1400px] mx-auto px-6 mb-32 flex flex-col lg:flex-row gap-12 lg:gap-16">
          
          {/* Left Content (Blog Cards) */}
          <div className="flex-1">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="bg-white rounded-[24px] overflow-hidden shadow-sm border border-gray-100 animate-pulse">
                    <div className="w-full aspect-[4/3] bg-gray-200" />
                    <div className="p-6 space-y-4">
                      <div className="h-4 bg-gray-200 rounded w-1/3" />
                      <div className="h-6 bg-gray-200 rounded w-3/4" />
                      <div className="h-4 bg-gray-200 rounded w-full" />
                      <div className="h-4 bg-gray-200 rounded w-5/6" />
                    </div>
                  </div>
                ))}
              </div>
            ) : blogs.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {blogs.map((blog) => (
                  <Link href={`/blog/${blog.slug}`} key={blog.id} className="group flex flex-col bg-white rounded-[24px] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100/50 hover:border-[#1071FF]/20">
                    <div className="relative w-full aspect-[4/3] overflow-hidden bg-gray-100">
                      <Image 
                        src={blog.image_url || heroImg.src} 
                        alt={blog.title} 
                        fill 
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-8 flex flex-col flex-1">
                      <p className="text-sm text-gray-500 font-medium mb-3">
                        {new Date(blog.published_at).toLocaleDateString("en-GB")}
                      </p>
                      <h3 className="text-2xl font-bold text-black mb-4 group-hover:text-[#1071FF] transition-colors line-clamp-2">
                        {blog.title}
                      </h3>
                      <p className="text-gray-600 mb-8 line-clamp-3 font-light leading-relaxed flex-1">
                        {blog.description}
                      </p>
                      <div className="flex items-center text-[#1071FF] font-semibold mt-auto group-hover:gap-2 transition-all">
                        Read Article <ArrowRight className="w-5 h-5 ml-1" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
               <div className="bg-white rounded-[32px] p-16 text-center shadow-sm border border-gray-100">
                <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-6" />
                <h2 className="text-2xl font-bold text-black mb-2">No blogs found</h2>
                <p className="text-gray-500">
                  {initialSearchQuery ? `We couldn't find any articles matching "${initialSearchQuery}".` : "Check back later for new updates from our team!"}
                </p>
                {initialSearchQuery && (
                  <button 
                    onClick={() => {
                      setSearchQuery("");
                      router.push('/blog');
                    }}
                    className="mt-6 px-6 py-2 bg-gray-100 hover:bg-gray-200 text-black rounded-full font-medium transition-colors"
                  >
                    Clear Search
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Right Sidebar */}
          <div className="w-full lg:w-[320px] xl:w-[360px] shrink-0 flex flex-col gap-10">
            
            {/* Search Bar */}
            <div className="bg-white p-6 rounded-[24px] shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold text-black mb-4">Search</h3>
              <form onSubmit={handleSearchSubmit} className="relative w-full">
                <input 
                  type="text" 
                  placeholder="Search articles..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#F8FAFC] text-black rounded-[16px] py-4 pl-5 pr-12 outline-none border border-gray-200 focus:border-[#1071FF] focus:ring-1 focus:ring-[#1071FF] transition-all"
                />
                <button type="submit" aria-label="Search" className="absolute right-4 top-1/2 -translate-y-1/2 p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <Search className="text-[#1071FF] w-5 h-5" />
                </button>
              </form>
            </div>

            {/* Recent Blogs */}
            <div className="bg-white p-6 rounded-[24px] shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold text-black mb-6">Recent Posts</h3>
              <div className="flex flex-col gap-5">
                {recentBlogs.length > 0
                  ? recentBlogs.map((recBlog) => (
                      <Link 
                        href={`/blog/${recBlog.slug}`} 
                        key={recBlog.id}
                        className="group flex gap-4 items-center p-3 -mx-3 rounded-[16px] hover:bg-[#F8FAFC] transition-colors"
                      >
                        <div className="relative w-20 h-20 shrink-0 rounded-[12px] overflow-hidden bg-gray-100">
                           <Image 
                            src={recBlog.image_url || heroImg.src} 
                            alt={recBlog.title} 
                            fill 
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-gray-500 font-medium mb-1">
                            {new Date(recBlog.published_at).toLocaleDateString("en-GB")}
                          </p>
                          <p className="text-black font-semibold text-sm leading-snug group-hover:text-[#1071FF] transition-colors line-clamp-2">
                            {recBlog.title}
                          </p>
                        </div>
                      </Link>
                    ))
                  : [1, 2, 3].map((i) => (
                      <div key={i} className="flex gap-4 items-center animate-pulse">
                        <div className="w-20 h-20 shrink-0 rounded-[12px] bg-gray-200" />
                        <div className="flex-1 space-y-2">
                           <div className="h-3 bg-gray-200 rounded w-1/2" />
                           <div className="h-4 bg-gray-200 rounded w-full" />
                           <div className="h-4 bg-gray-200 rounded w-3/4" />
                        </div>
                      </div>
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
