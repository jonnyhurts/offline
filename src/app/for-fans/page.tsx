import FilmStrip from "@/components/FilmStrip";
import Link from "next/link";

export const metadata = {
  title: "For Fans — OFFL/NE",
  description: "Subscribe to your favorite talent and receive exclusive physical collectibles monthly.",
};

export default function ForFansPage() {
  return (
    <>
      <section className="bg-offline-orange pt-24 pb-16 px-4">
        <FilmStrip className="mb-12" />
        <div className="max-w-5xl mx-auto">
          <h1 className="text-5xl sm:text-7xl font-black text-black tracking-tighter leading-none mb-6">
            OWN THE<br />MOMENT
          </h1>
          <p className="text-xl text-black/80 max-w-2xl mb-10 font-medium">
            Exclusive pictures from your favorite talent — delivered as physical collectibles you can hold, collect, and keep forever.
          </p>
          <Link
            href="/signup?role=fan"
            className="bg-black text-white font-bold text-lg px-10 py-4 rounded-full hover:bg-offline-dark transition-colors inline-block"
          >
            Subscribe Now
          </Link>
        </div>
        <FilmStrip className="mt-12" />
      </section>

      {/* What You Get */}
      <section className="bg-black py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl sm:text-5xl font-black mb-12 tracking-tight">
            WHAT YOU <span className="text-offline-orange">GET</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Monthly REALS", desc: "A physical collectible delivered to your door every month, featuring 10 exclusive pictures from your chosen talent." },
              { title: "Never-Seen-Before", desc: "Every picture is exclusive to OFFL/NE. You see what nobody else gets to see." },
              { title: "Truly Yours", desc: "These aren't digital files that anyone can screenshot. They're physical items, made for you." },
              { title: "Limited Editions", desc: "Every REAL is limited. What you receive becomes a rare, collectible item." },
              { title: "No Screens Required", desc: "Hold your REALS in your hands. No phone, no app, no scrolling — just pure content." },
              { title: "Build Your Collection", desc: "Each month adds to your collection. Display, trade, or keep them safe — they're yours forever." },
            ].map((item) => (
              <div key={item.title} className="border border-white/10 rounded-xl p-6 hover:border-offline-orange/40 transition-colors">
                <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How Subscription Works */}
      <section className="bg-offline-dark py-24 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-black mb-12 tracking-tight">
            HOW IT <span className="text-offline-orange">WORKS</span>
          </h2>
          <div className="space-y-10">
            {[
              { step: "1", title: "Browse Talent", desc: "Explore artists, athletes, musicians, and influencers on OFFL/NE." },
              { step: "2", title: "Subscribe", desc: "Pick your favorites and subscribe. Monthly delivery, cancel anytime." },
              { step: "3", title: "Receive Your REALS", desc: "Physical collectibles arrive at your door every month. Worldwide shipping included." },
              { step: "4", title: "Collect Forever", desc: "Each REAL is yours to keep. Build your collection, display it, treasure it." },
            ].map((item) => (
              <div key={item.step} className="flex gap-6 items-start">
                <div className="w-14 h-14 rounded-full bg-offline-orange flex items-center justify-center text-xl font-black text-black flex-shrink-0">
                  {item.step}
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-1">{item.title}</h3>
                  <p className="text-white/60">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-black py-24 px-4 text-center">
        <h2 className="text-4xl sm:text-5xl font-black mb-6 tracking-tight">
          JOIN THE <span className="text-offline-orange">INNER CIRCLE</span>
        </h2>
        <p className="text-white/60 text-lg mb-10 max-w-xl mx-auto">
          Be among the first to receive exclusive physical content from the talent you love.
        </p>
        <Link
          href="/signup?role=fan"
          className="bg-offline-orange hover:bg-offline-orange-light text-white font-bold text-lg px-10 py-4 rounded-full transition-colors inline-block"
        >
          Get Started
        </Link>
      </section>
    </>
  );
}
