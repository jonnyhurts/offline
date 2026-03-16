"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function SignUpPage() {
  const router = useRouter();
  const [role, setRole] = useState<"fan" | "talent" | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [category, setCategory] = useState("");
  const [social, setSocial] = useState("");
  const [address, setAddress] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name,
          role: role,
          category: role === "talent" ? category : undefined,
          social_url: role === "talent" ? social : undefined,
          shipping_address: role === "fan" ? address : undefined,
        },
      },
    });

    setLoading(false);

    if (signUpError) {
      setError(signUpError.message);
      return;
    }

    if (data.user) {
      setSubmitted(true);
    }
  }

  if (submitted) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-black px-4">
        <div className="text-center max-w-md">
          <div className="text-6xl text-offline-orange mb-6">
            <svg width="80" height="80" viewBox="0 0 100 100" fill="none" className="mx-auto">
              <circle cx="50" cy="50" r="40" stroke="#E8461C" strokeWidth="6" strokeDasharray="10 5" />
              <path d="M35 50l10 10 20-20" stroke="#E8461C" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h1 className="text-3xl font-black mb-4">You&apos;re In!</h1>
          <p className="text-white/60 mb-8">
            {role === "talent"
              ? "We'll review your application and get back to you shortly. Welcome to OFFL/NE."
              : "Your account has been created. Start browsing talent and subscribe to receive your first REALS."}
          </p>
          <p className="text-white/40 text-sm mb-6">
            Check your email to confirm your account.
          </p>
          <Link
            href={role === "talent" ? "/dashboard" : "/dashboard/fan"}
            className="bg-offline-orange hover:bg-offline-orange-light text-white font-bold px-8 py-3 rounded-full transition-colors inline-block"
          >
            Go to Dashboard
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen flex items-center justify-center bg-black px-4 py-24">
      <div className="w-full max-w-lg">
        <h1 className="text-4xl sm:text-5xl font-black mb-2 tracking-tight text-center">
          JOIN <span className="text-offline-orange">OFFL/NE</span>
        </h1>
        <p className="text-white/60 text-center mb-10">
          Create your account and go offline.
        </p>

        {/* Role Selection */}
        {!role && (
          <div className="space-y-4">
            <p className="text-sm text-white/40 text-center mb-4">I am...</p>
            <button
              onClick={() => setRole("talent")}
              className="w-full border-2 border-white/20 hover:border-offline-orange rounded-xl p-6 text-left transition-colors group"
            >
              <div className="text-xl font-bold mb-1 group-hover:text-offline-orange transition-colors">
                Talent / Creator
              </div>
              <div className="text-white/50 text-sm">
                Artist, musician, athlete, influencer, or brand looking to share exclusive content.
              </div>
            </button>
            <button
              onClick={() => setRole("fan")}
              className="w-full border-2 border-white/20 hover:border-offline-orange rounded-xl p-6 text-left transition-colors group"
            >
              <div className="text-xl font-bold mb-1 group-hover:text-offline-orange transition-colors">
                Fan / Subscriber
              </div>
              <div className="text-white/50 text-sm">
                Subscribe to your favorite talent and receive exclusive REALS monthly.
              </div>
            </button>
          </div>
        )}

        {/* Registration Form */}
        {role && (
          <form onSubmit={handleSubmit} className="space-y-5">
            <button
              type="button"
              onClick={() => { setRole(null); setError(""); }}
              className="text-sm text-white/40 hover:text-white transition-colors mb-2"
            >
              &larr; Back to role selection
            </button>

            <div className="inline-block bg-offline-orange/20 text-offline-orange text-xs font-bold px-3 py-1 rounded-full mb-2">
              {role === "talent" ? "TALENT ACCOUNT" : "FAN ACCOUNT"}
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-lg px-4 py-3">
                {error}
              </div>
            )}

            <div>
              <label className="text-sm text-white/60 block mb-1.5">Full Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:border-offline-orange focus:outline-none transition-colors"
                placeholder="Your name"
              />
            </div>

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
                minLength={8}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:border-offline-orange focus:outline-none transition-colors"
                placeholder="Min. 8 characters"
              />
            </div>

            {role === "talent" && (
              <>
                <div>
                  <label className="text-sm text-white/60 block mb-1.5">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-offline-orange focus:outline-none transition-colors"
                  >
                    <option value="">Select your category</option>
                    <option value="musician">Musician</option>
                    <option value="athlete">Athlete</option>
                    <option value="artist">Artist</option>
                    <option value="influencer">Influencer</option>
                    <option value="brand">Brand</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm text-white/60 block mb-1.5">Social / Website</label>
                  <input
                    type="text"
                    value={social}
                    onChange={(e) => setSocial(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:border-offline-orange focus:outline-none transition-colors"
                    placeholder="www.yoursite.com or @handle"
                  />
                </div>
              </>
            )}

            {role === "fan" && (
              <div>
                <label className="text-sm text-white/60 block mb-1.5">Shipping Address</label>
                <textarea
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:border-offline-orange focus:outline-none transition-colors"
                  rows={3}
                  placeholder="Street, city, postal code, country"
                />
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-offline-orange hover:bg-offline-orange-light disabled:opacity-50 text-white font-bold py-4 rounded-full transition-colors text-lg"
            >
              {loading ? "Creating account..." : role === "talent" ? "Apply Now" : "Create Account"}
            </button>

            <p className="text-center text-white/40 text-sm">
              Already have an account?{" "}
              <Link href="/login" className="text-offline-orange hover:underline">
                Log in
              </Link>
            </p>
          </form>
        )}
      </div>
    </section>
  );
}
