"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { data, error: loginError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (loginError) {
      setError(loginError.message);
      return;
    }

    if (data.user) {
      const role = data.user.user_metadata?.role;
      router.push(role === "talent" ? "/dashboard" : "/dashboard/fan");
    }
  }

  return (
    <section className="min-h-screen flex items-center justify-center bg-black px-4 py-24">
      <div className="w-full max-w-md">
        <div className="flex items-center justify-center gap-2 mb-8">
          <svg width="40" height="40" viewBox="0 0 100 100" fill="none">
            <circle cx="50" cy="50" r="40" stroke="#E8461C" strokeWidth="6" strokeDasharray="10 5" />
            <rect x="46" y="12" width="8" height="28" rx="4" fill="#E8461C" />
          </svg>
        </div>

        <h1 className="text-3xl font-black text-center mb-2">Welcome Back</h1>
        <p className="text-white/60 text-center mb-8">Log in to your OFFL/NE account</p>

        <form onSubmit={handleLogin} className="space-y-5">
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-lg px-4 py-3">
              {error}
            </div>
          )}

          <div>
            <label className="text-sm text-white/60 block mb-1.5">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:border-offline-orange focus:outline-none transition-colors"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="text-sm text-white/60 block mb-1.5">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:border-offline-orange focus:outline-none transition-colors"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-offline-orange hover:bg-offline-orange-light disabled:opacity-50 text-white font-bold py-4 rounded-full transition-colors text-lg"
          >
            {loading ? "Logging in..." : "Log In"}
          </button>

          <p className="text-center text-white/40 text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-offline-orange hover:underline">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
}
