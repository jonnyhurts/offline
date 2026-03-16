"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import PowerIcon from "./PowerIcon";
import { supabase } from "@/lib/supabase";

export default function Navbar() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<{ name: string; role: string } | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) {
        setUser({
          name: data.user.user_metadata?.full_name || data.user.email || "User",
          role: data.user.user_metadata?.role || "fan",
        });
      }
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser({
          name: session.user.user_metadata?.full_name || session.user.email || "User",
          role: session.user.user_metadata?.role || "fan",
        });
      } else {
        setUser(null);
      }
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  async function handleLogout() {
    await supabase.auth.signOut();
    setUser(null);
    router.push("/");
  }

  const initials = user?.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2) || "??";

  const dashboardLink = user?.role === "talent" ? "/dashboard" : "/dashboard/fan";

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-sm border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <PowerIcon size={36} color="#E8461C" />
            <span className="text-xl font-black tracking-tight text-white">
              OFFL<span className="text-offline-orange">/</span>NE
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/about" className="text-sm text-white/70 hover:text-white transition-colors">
              About
            </Link>
            <Link href="/for-talent" className="text-sm text-white/70 hover:text-white transition-colors">
              For Talent
            </Link>
            <Link href="/for-fans" className="text-sm text-white/70 hover:text-white transition-colors">
              For Fans
            </Link>

            {user ? (
              <>
                <Link href={dashboardLink} className="text-sm text-white/70 hover:text-white transition-colors">
                  Dashboard
                </Link>
                <div className="flex items-center gap-3">
                  <Link
                    href={dashboardLink}
                    className="w-9 h-9 rounded-full bg-offline-orange flex items-center justify-center text-xs font-bold text-white"
                  >
                    {initials}
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="text-sm text-white/40 hover:text-white transition-colors"
                  >
                    Log Out
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link href="/login" className="text-sm text-white/70 hover:text-white transition-colors">
                  Log In
                </Link>
                <Link
                  href="/signup"
                  className="bg-offline-orange hover:bg-offline-orange-light text-white text-sm font-bold px-5 py-2.5 rounded-full transition-colors"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
              {isOpen ? (
                <path d="M6 6l12 12M6 18L18 6" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-black border-t border-white/10">
          <div className="flex flex-col px-4 py-4 gap-4">
            <Link href="/about" className="text-white/70 hover:text-white" onClick={() => setIsOpen(false)}>About</Link>
            <Link href="/for-talent" className="text-white/70 hover:text-white" onClick={() => setIsOpen(false)}>For Talent</Link>
            <Link href="/for-fans" className="text-white/70 hover:text-white" onClick={() => setIsOpen(false)}>For Fans</Link>
            {user ? (
              <>
                <Link href={dashboardLink} className="text-white/70 hover:text-white" onClick={() => setIsOpen(false)}>Dashboard</Link>
                <button onClick={() => { handleLogout(); setIsOpen(false); }} className="text-white/40 hover:text-white text-left">Log Out</button>
              </>
            ) : (
              <>
                <Link href="/login" className="text-white/70 hover:text-white" onClick={() => setIsOpen(false)}>Log In</Link>
                <Link href="/signup" className="bg-offline-orange text-white font-bold px-5 py-2.5 rounded-full text-center" onClick={() => setIsOpen(false)}>Sign Up</Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
