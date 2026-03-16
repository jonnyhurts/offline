import FilmStrip from "@/components/FilmStrip";
import Link from "next/link";

export const metadata = {
  title: "About — OFFL/NE",
  description: "What OFFL/NE is, how it works, and the vision behind physical collectible content.",
};

export default function AboutPage() {
  return (
    <>
      {/* Hero — big stacked text like PDF */}
      <section className="bg-offline-orange pt-24 pb-0 px-4">
        <FilmStrip className="mb-12" />
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-end pb-16">
          <h1 className="text-[5rem] sm:text-[8rem] lg:text-[10rem] font-black text-black stacked-heading leading-none">
            ABOUT<br />OFFL<span className="skew-slash">/</span>NE
          </h1>
          <div>
            <p className="text-xl text-black/80 font-bold mb-4">
              We&apos;re transforming a classic viewing format into something entirely new.
            </p>
            <p className="text-black/60 text-lg">
              A physical collectible that creates a deeper connection between talent and their audience. Delivered in a way no other platform can offer.
            </p>
          </div>
        </div>
        <FilmStrip />
      </section>

      {/* What is OFFL/NE — dark section */}
      <section className="bg-black py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-5xl sm:text-7xl font-black mb-12 stacked-heading">
            WHAT IS<br /><span className="text-offline-orange">OFFL<span className="skew-slash">/</span>NE</span>?
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-6 text-white/70 text-lg leading-relaxed">
              <p>
                OFFL/NE is a platform that allows talent — artists, athletes, musicians, brands, and influencers — to share exclusive, personal content with their audience in a completely new way.
              </p>
              <p>
                Instead of digital content that floods social media and disappears in seconds, OFFL/NE delivers something real. A physical collectible, arriving monthly, that fans can watch, own, and collect forever.
              </p>
            </div>
            <div className="space-y-6 text-white/70 text-lg leading-relaxed">
              <p>
                No screens, no scrolling, no algorithms — just a pure, tangible experience that no other platform can offer.
              </p>
              <p className="text-glow text-white text-2xl font-black">
                Not just another post. A personal moment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Key Pillars — orange sections like PDF */}
      <section className="bg-offline-orange py-0">
        <FilmStrip />
        <div className="max-w-7xl mx-auto px-4 py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-[4rem] sm:text-[6rem] font-black text-black stacked-heading leading-none">
              MORE<br />PERSONAL<br />THAN<br />EVER
            </h3>
          </div>
          <div>
            <ul className="space-y-3 mb-8">
              {["Unfiltered & Direct", "Exclusive & Intimate", "Tangible & Collectible", "No Distractions", "For True Fans Only", "Content That's Felt, Not Just Seen"].map((p) => (
                <li key={p} className="text-black/80 text-lg font-bold flex items-center gap-3">
                  <span className="w-2.5 h-2.5 bg-black rounded-full flex-shrink-0" />
                  {p}
                </li>
              ))}
            </ul>
            <p className="text-glow text-white text-2xl font-black">And truly yours.</p>
          </div>
        </div>
        <FilmStrip />
      </section>

      <section className="bg-offline-orange py-0">
        <div className="max-w-7xl mx-auto px-4 py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-[4rem] sm:text-[6rem] font-black text-black stacked-heading leading-none">
              MORE<br />EXCLUSIVE<br />THAN<br />EVER
            </h3>
          </div>
          <div>
            <ul className="space-y-3 mb-8">
              {["Limited-Edition Content", "Physical Ownership", "Controlled Access", "Personalized Connection", "Scarcity Creates Value", "Offline & Private"].map((p) => (
                <li key={p} className="text-black/80 text-lg font-bold flex items-center gap-3">
                  <span className="w-2.5 h-2.5 bg-black rounded-full flex-shrink-0" />
                  {p}
                </li>
              ))}
            </ul>
            <p className="text-glow text-white text-2xl font-black">This is the future of collectibles.</p>
          </div>
        </div>
      </section>

      {/* Business — bold numbers */}
      <section className="bg-black py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-5xl sm:text-7xl font-black mb-16 stacked-heading">
            MORE<br />PROFIT<br /><span className="text-offline-orange">THAN EVER</span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mb-16">
            {["High Margins", "Recurring Revenue", "Minimal Overhead", "Scalable Growth", "Talent-Driven Sales"].map((label) => (
              <div key={label} className="bg-offline-orange/10 border border-offline-orange/30 rounded-xl p-5 text-center">
                <div className="text-sm font-black text-offline-orange">{label}</div>
              </div>
            ))}
          </div>
          <p className="text-glow text-white text-2xl font-black text-center">
            Designed for long-term success.
          </p>
          <div className="text-center mt-10">
            <Link
              href="/signup"
              className="bg-offline-orange hover:bg-offline-orange-light text-white font-black text-xl px-12 py-5 rounded-full transition-all hover:scale-105 pulse-cta inline-block"
            >
              GET STARTED
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
