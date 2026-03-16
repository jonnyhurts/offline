import Link from "next/link";
import FilmStrip from "./FilmStrip";
import PowerIcon from "./PowerIcon";

export default function Footer() {
  return (
    <footer className="bg-black">
      <FilmStrip />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <PowerIcon size={28} color="#E8461C" />
              <span className="text-lg font-black text-white">
                OFFL<span className="text-offline-orange">/</span>NE
              </span>
            </div>
            <p className="text-white/50 text-sm">
              Not just another post. A personal moment.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4">Platform</h4>
            <div className="flex flex-col gap-2">
              <Link href="/about" className="text-white/50 hover:text-white text-sm transition-colors">About</Link>
              <Link href="/for-talent" className="text-white/50 hover:text-white text-sm transition-colors">For Talent</Link>
              <Link href="/for-fans" className="text-white/50 hover:text-white text-sm transition-colors">For Fans</Link>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold text-sm mb-4">Account</h4>
            <div className="flex flex-col gap-2">
              <Link href="/signup" className="text-white/50 hover:text-white text-sm transition-colors">Sign Up</Link>
              <Link href="/login" className="text-white/50 hover:text-white text-sm transition-colors">Log In</Link>
              <Link href="/dashboard" className="text-white/50 hover:text-white text-sm transition-colors">Dashboard</Link>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold text-sm mb-4">Contact</h4>
            <div className="flex flex-col gap-2">
              <span className="text-white/50 text-sm">hello@offline.com</span>
              <span className="text-white/50 text-sm">Oslo, Norway</span>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 text-center">
          <p className="text-white/30 text-xs">&copy; 2026 OFFL/NE. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
