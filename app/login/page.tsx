"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Lock, Mail, AlertCircle, ArrowRight } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  // Redirect if already logged in
  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        router.push("/admin");
      }
    };
    checkUser();
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setError(error.message);
      } else {
        router.push("/admin");
        router.refresh();
      }
    } catch (err: any) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen bg-[#010C19] text-white flex flex-col justify-between overflow-hidden">
      <Navbar />

      {/* Decorative Radial Glows */}
      <div className="absolute top-[20%] left-[10%] w-[300px] h-[300px] rounded-full bg-[#1071FF]/20 blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-[20%] right-[10%] w-[300px] h-[300px] rounded-full bg-[#1071FF]/10 blur-[120px] pointer-events-none z-0" />

      {/* Main Login Form Container */}
      <div className="flex-grow flex items-center justify-center px-6 py-32 relative z-10">
        <div className="w-full max-w-md p-8 md:p-10 rounded-[32px] border border-white/10 bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold tracking-tight text-white mb-2">
              Admin Access
            </h1>
            <p className="text-white/60 text-sm">
              Log in to manage the Volt Digital blog platform.
            </p>
          </div>

          <form onSubmit={handleLogin} className="flex flex-col gap-6">
            {error && (
              <div className="flex items-center gap-3 bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-2xl text-sm">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Email Field */}
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-xs font-semibold uppercase tracking-wider text-white/50 pl-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 w-5 h-5" />
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="admin@voltdigital.global"
                  className="w-full bg-[#050A15]/80 text-white border border-white/10 rounded-2xl py-4 pl-12 pr-6 outline-none focus:border-[#1071FF] focus:ring-1 focus:ring-[#1071FF] transition-all"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="flex flex-col gap-2">
              <label htmlFor="password" className="text-xs font-semibold uppercase tracking-wider text-white/50 pl-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 w-5 h-5" />
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="w-full bg-[#050A15]/80 text-white border border-white/10 rounded-2xl py-4 pl-12 pr-6 outline-none focus:border-[#1071FF] focus:ring-1 focus:ring-[#1071FF] transition-all"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="mt-2 w-full relative flex items-center justify-center gap-3 py-4 rounded-2xl border border-white/15 bg-gradient-to-r from-[#1071FF] to-[#0D5BCC] text-white font-semibold text-lg hover:shadow-[0_0_30px_rgba(16,113,255,0.3)] disabled:opacity-50 transition-all cursor-pointer overflow-hidden group"
            >
              <span>{loading ? "Authenticating..." : "Sign In"}</span>
              {!loading && <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />}
            </button>
          </form>
        </div>
      </div>

      <Footer />
    </main>
  );
}
