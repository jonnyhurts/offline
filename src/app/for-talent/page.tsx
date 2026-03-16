import FilmStrip from "@/components/FilmStrip";
import Link from "next/link";

export const metadata = {
  title: "For Talent — OFFL/NE",
  description: "Why creators, athletes, and influencers should join OFFL/NE.",
};

export default function ForTalentPage() {
  return (
    <>
      <section className="bg-black pt-24 pb-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-5xl sm:text-7xl font-black tracking-tighter leading-none mb-6">
            YOUR CONTENT.<br />
            <span className="text-offline-orange">THEIR HANDS.</span>
          </h1>
          <p className="text-xl text-white/70 max-w-2xl mb-10">
            Give your audience something they can actually hold. Upload 10 exclusive pictures each month — we turn them into physical collectibles and deliver them directly to your most loyal fans.
          </p>
          <Link
            href="/signup?role=talent"
            className="bg-offline-orange hover:bg-offline-orange-light text-white font-bold text-lg px-10 py-4 rounded-full transition-colors inline-block"
          >
            Apply as Talent
          </Link>
        </div>
      </section>

      <FilmStrip />

      {/* Why OFFL/NE */}
      <section className="bg-offline-orange py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl sm:text-5xl font-black text-black mb-12 tracking-tight">
            WHY OFFL/NE?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { title: "Full Creative Control", desc: "You choose what to share. No algorithms, no gatekeepers — your pictures, your rules." },
              { title: "Revenue From Day One", desc: "Earn directly from every subscriber, every month. Simple, transparent, recurring." },
              { title: "Deeper Fan Connection", desc: "Move beyond likes and comments. Give your fans something personal that builds real loyalty." },
              { title: "We Handle Everything", desc: "Upload 10 pictures. We produce the REALS, package them, and ship worldwide." },
              { title: "Collectible Value", desc: "Your pictures become limited-edition physical items that fans treasure and collect." },
              { title: "No Ads, No Noise", desc: "Your content stands alone. No competing posts, no ads, no distractions." },
            ].map((item) => (
              <div key={item.title} className="bg-black/10 rounded-xl p-6">
                <h3 className="text-xl font-black text-black mb-2">{item.title}</h3>
                <p className="text-black/70">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FilmStrip />

      {/* How It Works for Talent */}
      <section className="bg-black py-24 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-black mb-12 tracking-tight">
            HOW IT <span className="text-offline-orange">WORKS</span>
          </h2>
          <div className="space-y-12">
            {[
              { step: "1", title: "Sign Up & Get Verified", desc: "Create your talent profile. We review your application and get you set up." },
              { step: "2", title: "Upload 10 Exclusive Pictures", desc: "Each month, upload 10 pictures that are exclusive to OFFL/NE — not shared anywhere else." },
              { step: "3", title: "We Produce Your REALS", desc: "Your pictures are transformed into physical collectible REALS, printed and packaged for delivery." },
              { step: "4", title: "Fans Subscribe & Collect", desc: "Subscribers receive their REALS monthly at their door. You earn from every subscription." },
            ].map((item) => (
              <div key={item.step} className="flex gap-6 items-start">
                <div className="text-4xl font-black text-offline-orange w-12 flex-shrink-0">{item.step}</div>
                <div>
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-white/60 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Link
              href="/signup?role=talent"
              className="bg-offline-orange hover:bg-offline-orange-light text-white font-bold text-lg px-10 py-4 rounded-full transition-colors inline-block"
            >
              Start Creating
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
