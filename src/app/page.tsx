import Link from "next/link";
import FilmStrip from "@/components/FilmStrip";
import PowerIcon from "@/components/PowerIcon";

export default function Home() {
  return (
    <>
      {/* Hero — full-bleed orange like the PDF cover */}
      <section className="relative min-h-screen flex items-center justify-center bg-offline-orange overflow-hidden">
        <FilmStrip className="absolute top-0 left-0 right-0" />
        <FilmStrip className="absolute bottom-0 left-0 right-0" />

        <div className="text-center px-4 py-20 relative z-10">
          {/* Power button icon — film reel style like PDF */}
          <div className="flex justify-center mb-6">
            <PowerIcon size={200} color="black" />
          </div>

          <h1 className="text-[8rem] sm:text-[12rem] md:text-[16rem] font-black text-black tracking-tighter leading-none stacked-heading">
            OFFL<span className="skew-slash">/</span>NE
          </h1>

          <div className="mt-8 mb-12">
            <p className="text-glow text-white text-2xl sm:text-3xl font-black tracking-wide">
              Not just another post. A personal moment.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <Link
              href="/signup"
              className="bg-black text-white font-black text-xl px-12 py-5 rounded-full hover:scale-105 transition-transform pulse-cta"
            >
              GET STARTED
            </Link>
            <Link
              href="/about"
              className="border-3 border-black text-black font-black text-xl px-12 py-5 rounded-full hover:bg-black hover:text-white transition-all"
            >
              LEARN MORE
            </Link>
          </div>
        </div>
      </section>

      {/* CLOSER THAN EVER — stacked bold text + bullets like PDF slide 2 */}
      <section className="bg-offline-orange py-0 overflow-hidden">
        <FilmStrip />
        <div className="max-w-7xl mx-auto px-4 py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-[5rem] sm:text-[7rem] lg:text-[9rem] font-black text-black stacked-heading leading-none">
              CLOSER<br />THAN<br />EVER
            </h2>
            <ul className="mt-8 space-y-3">
              {["A Direct Line to Talent", "Exclusive Access, Beyond Social Media", "Real Connection, Not Just Content", "From Fan to Inner Circle"].map((item) => (
                <li key={item} className="text-black/80 text-lg font-bold flex items-center gap-3">
                  <span className="w-2.5 h-2.5 bg-black rounded-full flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="text-black/80 text-lg leading-relaxed space-y-5">
            <p className="text-xl font-bold text-black">
              We&apos;re transforming a classic viewing format into something entirely new — a physical collectible that allows talent, brands, musicians, athletes, and influencers to share exclusive, personal content with their audience.
            </p>
            <p>
              Unlike digital content that floods social media and disappears in seconds, this is something real — a physical item, delivered monthly, that fans can watch, own, and collect forever.
            </p>
            <p>
              No screens, no scrolling — just a pure, tangible experience that creates a deeper connection between those with a following and the people who support them.
            </p>
            <p className="text-glow text-white text-2xl font-black pt-4">
              Not just another post. A personal moment.
            </p>
          </div>
        </div>
        <FilmStrip />
      </section>

      {/* MORE PERSONAL THAN EVER — matching PDF slide 3 */}
      <section className="bg-offline-orange py-0 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-[4rem] sm:text-[5.5rem] lg:text-[7rem] font-black text-black stacked-heading leading-none">
              MORE<br />PERSONAL<br />THAN<br />EVER
            </h2>
            <ul className="mt-8 space-y-3">
              {["Unfiltered & Direct", "Exclusive & Intimate", "Tangible & Collectible", "No Distractions", "For True Fans Only", "Content That's Felt, Not Just Seen"].map((item) => (
                <li key={item} className="text-black/80 text-lg font-bold flex items-center gap-3">
                  <span className="w-2.5 h-2.5 bg-black rounded-full flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="text-black/80 text-lg leading-relaxed space-y-5">
            <p className="text-xl font-bold text-black">
              OFFL/NE creates a deeper, more personal connection between talent and their audience — something no digital platform can offer.
            </p>
            <p>
              Fans receive authentic moments straight from their favorite talent, whether it&apos;s behind-the-scenes footage, personal messages, or exclusive insights — all delivered offline for a real, tangible experience they can own and collect.
            </p>
            <p className="text-glow text-white text-2xl font-black pt-4">
              And truly yours.
            </p>
          </div>
        </div>
      </section>

      {/* MORE EXCLUSIVE THAN EVER — PDF slide 4 */}
      <section className="bg-offline-orange py-0 overflow-hidden">
        <FilmStrip />
        <div className="max-w-7xl mx-auto px-4 py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-[4rem] sm:text-[5.5rem] lg:text-[7rem] font-black text-black stacked-heading leading-none">
              MORE<br />EXCLUSIVE<br />THAN<br />EVER
            </h2>
            <ul className="mt-8 space-y-3">
              {["Limited-Edition Content", "Physical Ownership", "Controlled Access", "Personalized Connection", "Scarcity Creates Value", "Offline & Private"].map((item) => (
                <li key={item} className="text-black/80 text-lg font-bold flex items-center gap-3">
                  <span className="w-2.5 h-2.5 bg-black rounded-full flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="text-black/80 text-lg leading-relaxed space-y-5">
            <p className="text-xl font-bold text-black">
              Collectibles have always held value. True exclusivity creates value, and OFFL/NE is built on that principle.
            </p>
            <p>
              Every release is available only through OFFL/NE, ensuring controlled access and giving talent full control over who sees their content. There are no reposts, no leaks — this content isn&apos;t mass-shared but reserved only for those who choose to be part of it.
            </p>
            <p className="text-glow text-white text-2xl font-black pt-4">
              This is the future of collectibles.
            </p>
          </div>
        </div>
        <FilmStrip />
      </section>

      {/* EASIER THAN EVER — PDF slide 5 */}
      <section className="bg-offline-orange py-0 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-[4rem] sm:text-[5.5rem] lg:text-[7rem] font-black text-black stacked-heading leading-none">
              EASIER<br />THAN<br />EVER
            </h2>
            <ul className="mt-8 space-y-3">
              {["Simple & Reliable", "Scalable Production", "Effortless Shipping", "Steady Revenue", "Influencer-Driven Growth", "Perfect Market Timing"].map((item) => (
                <li key={item} className="text-black/80 text-lg font-bold flex items-center gap-3">
                  <span className="w-2.5 h-2.5 bg-black rounded-full flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="text-black/80 text-lg leading-relaxed space-y-5">
            <p className="text-xl font-bold text-black">
              OFFL/NE represents a seamless, scalable business model that merges physical collectibles with an easy-to-use digital platform.
            </p>
            <p>
              The app and platform are lightweight, specifically designed for managing subscriptions, uploading content, and automating fulfillment. Shipping is quick, affordable, and worldwide.
            </p>
            <p className="text-glow text-white text-2xl font-black pt-4">
              Easy to start, impossible to stop.
            </p>
          </div>
        </div>
      </section>

      {/* CTA — big, bold, playful */}
      <section className="bg-black py-32 px-4 text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto relative z-10">
          <h2 className="text-5xl sm:text-7xl md:text-8xl font-black mb-8 stacked-heading">
            READY TO GO<br />
            <span className="text-offline-orange">OFFL<span className="skew-slash">/</span>NE</span>?
          </h2>
          <p className="text-white/50 text-xl mb-12 max-w-xl mx-auto">
            Whether you&apos;re talent looking to connect deeper with your audience, or a fan ready for something real.
          </p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <Link
              href="/signup?role=talent"
              className="bg-offline-orange hover:bg-offline-orange-light text-white font-black text-xl px-12 py-5 rounded-full transition-all hover:scale-105 pulse-cta"
            >
              JOIN AS TALENT
            </Link>
            <Link
              href="/signup?role=fan"
              className="border-3 border-white text-white font-black text-xl px-12 py-5 rounded-full hover:bg-white hover:text-black transition-all"
            >
              JOIN AS FAN
            </Link>
          </div>
        </div>

        {/* Background decoration */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 text-[20rem] font-black text-white leading-none">O</div>
          <div className="absolute bottom-10 right-10 text-[20rem] font-black text-white leading-none">F</div>
        </div>
      </section>
    </>
  );
}
