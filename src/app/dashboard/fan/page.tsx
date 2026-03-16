"use client";

import { useState } from "react";
import Link from "next/link";

const TALENT = [
  { name: "DJ Shadow", category: "Musician", subscribers: "12.4K", price: "$9.99/mo", img: "🎵" },
  { name: "Marcus Rashford", category: "Athlete", subscribers: "45.2K", price: "$12.99/mo", img: "⚽" },
  { name: "Banksy", category: "Artist", subscribers: "8.7K", price: "$14.99/mo", img: "🎨" },
  { name: "Emma Chamberlain", category: "Influencer", subscribers: "33.1K", price: "$7.99/mo", img: "📸" },
  { name: "Erling Haaland", category: "Athlete", subscribers: "67.8K", price: "$14.99/mo", img: "⚡" },
  { name: "Tyler, The Creator", category: "Musician", subscribers: "28.3K", price: "$11.99/mo", img: "🎤" },
];

export default function FanDashboard() {
  const [activeTab, setActiveTab] = useState<"browse" | "subscriptions" | "collection">("browse");
  const [subscribedTo, setSubscribedTo] = useState<string[]>(["DJ Shadow", "Marcus Rashford"]);

  return (
    <div className="min-h-screen bg-black">
      {/* Dashboard Header */}
      <div className="bg-offline-dark border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-black">Fan Dashboard</h1>
              <p className="text-white/50 text-sm">Browse talent, manage your subscriptions and collection</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-offline-orange flex items-center justify-center text-sm font-bold">
              FN
            </div>
          </div>

          <div className="flex gap-1 mt-6 overflow-x-auto">
            {(["browse", "subscriptions", "collection"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2.5 rounded-full text-sm font-bold capitalize transition-colors ${
                  activeTab === tab
                    ? "bg-offline-orange text-white"
                    : "text-white/50 hover:text-white hover:bg-white/5"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Browse Talent */}
        {activeTab === "browse" && (
          <div>
            <h2 className="text-xl font-black mb-6">Discover Talent</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {TALENT.map((t) => {
                const isSubscribed = subscribedTo.includes(t.name);
                return (
                  <div key={t.name} className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-offline-orange/30 transition-colors">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-14 h-14 bg-offline-orange/20 rounded-full flex items-center justify-center text-2xl">
                        {t.img}
                      </div>
                      <div>
                        <h3 className="font-bold">{t.name}</h3>
                        <p className="text-white/40 text-sm">{t.category}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm mb-4">
                      <span className="text-white/50">{t.subscribers} subscribers</span>
                      <span className="text-offline-orange font-bold">{t.price}</span>
                    </div>
                    <button
                      onClick={() => {
                        if (isSubscribed) {
                          setSubscribedTo(subscribedTo.filter((n) => n !== t.name));
                        } else {
                          setSubscribedTo([...subscribedTo, t.name]);
                        }
                      }}
                      className={`w-full py-2.5 rounded-full font-bold text-sm transition-colors ${
                        isSubscribed
                          ? "bg-white/10 text-white/60 hover:bg-red-500/20 hover:text-red-400"
                          : "bg-offline-orange hover:bg-offline-orange-light text-white"
                      }`}
                    >
                      {isSubscribed ? "Subscribed" : "Subscribe"}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Subscriptions */}
        {activeTab === "subscriptions" && (
          <div>
            <h2 className="text-xl font-black mb-6">My Subscriptions</h2>
            {subscribedTo.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-white/40 mb-4">No subscriptions yet.</p>
                <button
                  onClick={() => setActiveTab("browse")}
                  className="bg-offline-orange hover:bg-offline-orange-light text-white font-bold px-8 py-3 rounded-full transition-colors"
                >
                  Browse Talent
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {subscribedTo.map((name) => {
                  const t = TALENT.find((x) => x.name === name)!;
                  return (
                    <div key={name} className="bg-white/5 border border-white/10 rounded-xl p-5 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-offline-orange/20 rounded-full flex items-center justify-center text-xl">
                          {t.img}
                        </div>
                        <div>
                          <h3 className="font-bold">{t.name}</h3>
                          <p className="text-white/40 text-sm">{t.category} — {t.price}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full font-bold">
                          Active
                        </span>
                        <button
                          onClick={() => setSubscribedTo(subscribedTo.filter((n) => n !== name))}
                          className="text-xs text-white/30 hover:text-red-400 transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  );
                })}

                <div className="bg-offline-orange/10 border border-offline-orange/30 rounded-xl p-5 mt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm text-white/50">Next delivery</div>
                      <div className="text-xl font-black text-offline-orange">March 28, 2026</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-white/50">REALS incoming</div>
                      <div className="text-xl font-black">{subscribedTo.length}</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Collection */}
        {activeTab === "collection" && (
          <div>
            <h2 className="text-xl font-black mb-6">My Collection</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { title: "Studio Session Vol.3", talent: "DJ Shadow", date: "Feb 2026", edition: "#847/∞" },
                { title: "Training Day: Manchester", talent: "Marcus Rashford", date: "Feb 2026", edition: "#1203/5000" },
                { title: "Midnight Beats", talent: "DJ Shadow", date: "Jan 2026", edition: "#623/∞" },
                { title: "Pre-Match Ritual", talent: "Marcus Rashford", date: "Jan 2026", edition: "#989/5000" },
              ].map((real, i) => (
                <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-5 hover:border-offline-orange/30 transition-colors">
                  <div className="w-full h-32 bg-gradient-to-br from-offline-orange/20 to-offline-orange/5 rounded-lg flex items-center justify-center text-4xl mb-4">
                    🎞️
                  </div>
                  <h3 className="font-bold mb-1">{real.title}</h3>
                  <p className="text-white/40 text-sm">{real.talent}</p>
                  <div className="flex items-center justify-between mt-3 text-xs text-white/30">
                    <span>{real.date}</span>
                    <span className="font-mono">{real.edition}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
