"use client";

import { useState } from "react";
import Link from "next/link";
import ViewMasterDisc from "@/components/ViewMasterDisc";

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

type MonthData = {
  images: string[]; // data URLs for preview
  confirmed: boolean;
};

type YearData = Record<number, MonthData>;

// Generate a placeholder image data URL with a given color
function makePlaceholder(color: string): string {
  if (typeof document === "undefined") return "";
  const c = document.createElement("canvas");
  c.width = 200;
  c.height = 200;
  const ctx = c.getContext("2d");
  if (ctx) {
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, 200, 200);
  }
  return c.toDataURL("image/png");
}

const DEMO_COLORS = [
  "#E8461C", "#1a1a2e", "#16213e", "#0f3460", "#533483",
  "#e94560", "#2b2d42", "#8d99ae", "#ef233c", "#d90429",
  "#f4a261",
];

export default function TalentDashboard() {
  const [activeTab, setActiveTab] = useState<"overview" | "upload" | "reals" | "subscribers">("overview");
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);
  const [monthsData, setMonthsData] = useState<YearData>(() => {
    const data: YearData = {};
    for (let i = 0; i < 12; i++) {
      data[i] = { images: [], confirmed: false };
    }
    // Pre-fill January with demo images
    data[0] = {
      images: DEMO_COLORS.map((color) => makePlaceholder(color)),
      confirmed: true,
    };
    return data;
  });
  const [agreedExclusive, setAgreedExclusive] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [reviewing, setReviewing] = useState(false);
  const [reviewIndex, setReviewIndex] = useState(0);
  const [approvedImages, setApprovedImages] = useState<boolean[]>([]);

  function handleFileUpload(monthIndex: number, files: FileList | null) {
    if (!files) return;
    const current = monthsData[monthIndex];
    const remaining = 11 - current.images.length;
    const toAdd = Array.from(files).slice(0, remaining);

    toAdd.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        setMonthsData((prev) => {
          const updated = { ...prev };
          const monthData = { ...updated[monthIndex] };
          if (monthData.images.length < 11) {
            monthData.images = [...monthData.images, e.target?.result as string];
            updated[monthIndex] = monthData;
          }
          return updated;
        });
      };
      reader.readAsDataURL(file);
    });
  }

  function removeImage(monthIndex: number, imgIndex: number) {
    setMonthsData((prev) => {
      const updated = { ...prev };
      const monthData = { ...updated[monthIndex] };
      monthData.images = monthData.images.filter((_, i) => i !== imgIndex);
      monthData.confirmed = false;
      updated[monthIndex] = monthData;
      return updated;
    });
  }

  function startReview() {
    setReviewing(true);
    setReviewIndex(0);
    setApprovedImages(new Array(11).fill(false));
  }

  function approveImage(index: number) {
    setApprovedImages((prev) => {
      const next = [...prev];
      next[index] = true;
      return next;
    });
    if (index < 10) {
      setReviewIndex(index + 1);
    }
  }

  function rejectImage(monthIndex: number, imgIndex: number) {
    removeImage(monthIndex, imgIndex);
    setReviewing(false);
  }

  function confirmMonth(monthIndex: number) {
    setMonthsData((prev) => ({
      ...prev,
      [monthIndex]: { ...prev[monthIndex], confirmed: true },
    }));
    setReviewing(false);
    setSelectedMonth(null);
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Dashboard Header */}
      <div className="bg-offline-dark border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-black">Talent Dashboard</h1>
              <p className="text-white/50 text-sm">Manage your REALS and connect with fans</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-offline-orange flex items-center justify-center text-sm font-bold">
                JH
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 mt-6 overflow-x-auto">
            {(["overview", "upload", "reals", "subscribers"] as const).map((tab) => (
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
        {/* Overview */}
        {activeTab === "overview" && (
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {[
                { label: "Total Subscribers", value: "1,247", change: "+12%" },
                { label: "REALS Shipped", value: "3,741", change: "+8%" },
                { label: "Monthly Revenue", value: "$18,705", change: "+15%" },
                { label: "Next Release", value: "Mar 28", change: "12 days" },
              ].map((stat) => (
                <div key={stat.label} className="bg-white/5 border border-white/10 rounded-xl p-5">
                  <div className="text-white/50 text-sm mb-1">{stat.label}</div>
                  <div className="text-2xl font-black">{stat.value}</div>
                  <div className="text-offline-orange text-xs font-bold mt-1">{stat.change}</div>
                </div>
              ))}
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h3 className="text-lg font-bold mb-4">Quick Actions</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <button
                  onClick={() => setActiveTab("upload")}
                  className="bg-offline-orange hover:bg-offline-orange-light text-white font-bold py-4 rounded-xl transition-colors"
                >
                  Upload New Content
                </button>
                <button
                  onClick={() => setActiveTab("reals")}
                  className="bg-white/10 hover:bg-white/20 text-white font-bold py-4 rounded-xl transition-colors"
                >
                  View My REALS
                </button>
                <button
                  onClick={() => setActiveTab("subscribers")}
                  className="bg-white/10 hover:bg-white/20 text-white font-bold py-4 rounded-xl transition-colors"
                >
                  View Subscribers
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Upload */}
        {activeTab === "upload" && (
          <div>
            {selectedMonth === null ? (
              <>
                {/* Exclusivity notice */}
                <div className="bg-offline-orange/10 border border-offline-orange/30 rounded-xl p-5 mb-8">
                  <p className="text-sm text-offline-orange font-bold mb-1">EXCLUSIVE CONTENT ONLY</p>
                  <p className="text-white/60 text-sm">
                    All pictures uploaded to OFFL/NE must be exclusive to this platform. They cannot be posted on any other social media or shared publicly elsewhere. By uploading, you agree to this exclusivity agreement.
                  </p>
                </div>

                {/* Year label */}
                <h2 className="text-xl font-black mb-6">2026 — Monthly Uploads</h2>

                {/* Month grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                  {MONTHS.map((month, i) => {
                    const data = monthsData[i];
                    const isConfirmed = data.confirmed;
                    const hasImages = data.images.length > 0;
                    const imageCount = data.images.length;

                    return (
                      <button
                        key={month}
                        onClick={() => { setSelectedMonth(i); setAgreedExclusive(false); }}
                        className={`relative border-2 rounded-xl p-6 text-left transition-all hover:scale-[1.02] ${
                          isConfirmed
                            ? "border-green-500 bg-green-500/10"
                            : "border-red-500/60 bg-red-500/5"
                        }`}
                      >
                        {/* Status dot */}
                        <div className={`absolute top-3 right-3 w-3 h-3 rounded-full ${
                          isConfirmed ? "bg-green-500" : "bg-red-500"
                        }`} />

                        <div className={`text-lg font-black mb-1 ${
                          isConfirmed ? "text-green-400" : "text-white"
                        }`}>
                          {month}
                        </div>

                        <div className="text-white/40 text-sm">
                          {isConfirmed
                            ? "11/11 — Confirmed"
                            : `${imageCount}/11 pictures`}
                        </div>

                        {/* Mini progress bar */}
                        <div className="mt-3 h-1.5 bg-white/10 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all ${
                              isConfirmed ? "bg-green-500" : imageCount > 0 ? "bg-offline-orange" : "bg-red-500/40"
                            }`}
                            style={{ width: `${(imageCount / 11) * 100}%` }}
                          />
                        </div>
                      </button>
                    );
                  })}
                </div>
              </>
            ) : (
              /* Single month upload view */
              <div className="max-w-3xl mx-auto">
                <button
                  onClick={() => setSelectedMonth(null)}
                  className="text-sm text-white/40 hover:text-white transition-colors mb-6"
                >
                  &larr; Back to all months
                </button>

                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-black">
                    {MONTHS[selectedMonth]}
                    <span className="text-white/40 ml-2 text-lg">2026</span>
                  </h2>
                  <span className={`text-sm font-bold px-3 py-1 rounded-full ${
                    monthsData[selectedMonth].confirmed
                      ? "bg-green-500/20 text-green-400"
                      : "bg-red-500/20 text-red-400"
                  }`}>
                    {monthsData[selectedMonth].images.length}/11 pictures
                  </span>
                </div>

                {/* Exclusivity agreement */}
                {!monthsData[selectedMonth].confirmed && (
                  <div className="bg-offline-orange/10 border border-offline-orange/30 rounded-xl p-5 mb-6">
                    <p className="text-sm text-white/70 mb-3">
                      I confirm that these pictures are <strong className="text-offline-orange">exclusive to OFFL/NE</strong> and will not be uploaded to any other social media platform.
                    </p>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={agreedExclusive}
                        onChange={(e) => setAgreedExclusive(e.target.checked)}
                        className="w-5 h-5 rounded border-white/20 accent-offline-orange"
                      />
                      <span className="text-sm font-bold text-white">I agree to the exclusivity terms</span>
                    </label>
                  </div>
                )}

                {/* Image grid — slots 1-10 are ring pictures, slot 11 is the center label */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                  {Array.from({ length: 11 }).map((_, i) => {
                    const img = monthsData[selectedMonth].images[i];
                    const isConfirmed = monthsData[selectedMonth].confirmed;
                    const isLabel = i === 10;

                    if (img) {
                      return (
                        <div key={i} className={`relative aspect-square rounded-xl overflow-hidden border-2 group ${isLabel ? "border-offline-orange/40" : "border-white/10"}`}>
                          <img src={img} alt={`Upload ${i + 1}`} className="w-full h-full object-cover" />
                          {!isConfirmed && (
                            <button
                              onClick={() => removeImage(selectedMonth, i)}
                              className="absolute top-1.5 right-1.5 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              X
                            </button>
                          )}
                          <div className={`absolute bottom-1.5 left-1.5 text-white text-xs font-bold px-2 py-0.5 rounded ${isLabel ? "bg-offline-orange/90" : "bg-black/70"}`}>
                            {isLabel ? "LABEL" : i + 1}
                          </div>
                        </div>
                      );
                    }

                    return (
                      <label
                        key={i}
                        className={`aspect-square rounded-xl border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-colors ${
                          agreedExclusive && !isConfirmed
                            ? isLabel
                              ? "border-offline-orange/30 hover:border-offline-orange hover:bg-offline-orange/5"
                              : "border-white/20 hover:border-offline-orange hover:bg-offline-orange/5"
                            : "border-white/10 opacity-40 cursor-not-allowed"
                        }`}
                      >
                        {agreedExclusive && !isConfirmed ? (
                          <>
                            <input
                              type="file"
                              accept="image/*"
                              multiple
                              className="hidden"
                              onChange={(e) => handleFileUpload(selectedMonth, e.target.files)}
                            />
                            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" className={`mb-1 ${isLabel ? "text-offline-orange/40" : "text-white/30"}`}>
                              <path d="M12 5v14M5 12h14" />
                            </svg>
                            <span className={`text-xs ${isLabel ? "text-offline-orange/40 font-bold" : "text-white/30"}`}>
                              {isLabel ? "LABEL" : i + 1}
                            </span>
                          </>
                        ) : (
                          <span className={`text-xs ${isLabel ? "text-offline-orange/20 font-bold" : "text-white/20"}`}>
                            {isLabel ? "LABEL" : i + 1}
                          </span>
                        )}
                      </label>
                    );
                  })}
                </div>

                {/* Drop zone for bulk upload */}
                {agreedExclusive && !monthsData[selectedMonth].confirmed && monthsData[selectedMonth].images.length < 11 && (
                  <div
                    onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                    onDragLeave={() => setDragOver(false)}
                    onDrop={(e) => {
                      e.preventDefault();
                      setDragOver(false);
                      handleFileUpload(selectedMonth, e.dataTransfer.files);
                    }}
                    className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors mb-6 ${
                      dragOver ? "border-offline-orange bg-offline-orange/10" : "border-white/15 hover:border-white/30"
                    }`}
                  >
                    <p className="text-white/40 text-sm">
                      Drag and drop pictures here, or click the slots above
                    </p>
                    <p className="text-white/20 text-xs mt-1">
                      {11 - monthsData[selectedMonth].images.length} more needed
                    </p>
                  </div>
                )}

                {/* Review & Confirm flow */}
                {monthsData[selectedMonth].images.length === 11 && !monthsData[selectedMonth].confirmed && !reviewing && (
                  <button
                    onClick={startReview}
                    className="w-full bg-offline-orange hover:bg-offline-orange-light text-white font-black py-4 rounded-full transition-colors text-lg"
                  >
                    REVIEW ALL 11 PICTURES
                  </button>
                )}

                {/* Review mode — go through each picture */}
                {reviewing && selectedMonth !== null && (
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-black">Review Your Pictures</h3>
                      <span className="text-sm text-white/40">
                        {approvedImages.filter(Boolean).length}/11 approved
                      </span>
                    </div>

                    {/* Progress dots */}
                    <div className="flex gap-1.5 mb-6">
                      {approvedImages.map((approved, i) => (
                        <button
                          key={i}
                          onClick={() => setReviewIndex(i)}
                          className={`flex-1 h-2 rounded-full transition-all ${
                            approved
                              ? "bg-green-500"
                              : i === reviewIndex
                                ? "bg-offline-orange"
                                : "bg-white/15"
                          }`}
                        />
                      ))}
                    </div>

                    {/* Current picture under review */}
                    <div className="flex flex-col items-center">
                      <div className="relative w-full max-w-sm aspect-square rounded-xl overflow-hidden border-2 border-white/20 mb-4">
                        <img
                          src={monthsData[selectedMonth].images[reviewIndex]}
                          alt={`Review picture ${reviewIndex + 1}`}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-3 left-3 bg-black/80 text-white text-sm font-bold px-3 py-1 rounded-full">
                          {reviewIndex === 10 ? "Label" : `Picture ${reviewIndex + 1}`} of 11
                        </div>
                        {approvedImages[reviewIndex] && (
                          <div className="absolute top-3 right-3 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                            APPROVED
                          </div>
                        )}
                      </div>

                      <p className="text-white/50 text-sm mb-4 text-center">
                        Is this picture unique, exclusive, and not posted on any other platform?
                      </p>

                      <div className="flex gap-3 w-full max-w-sm">
                        <button
                          onClick={() => rejectImage(selectedMonth, reviewIndex)}
                          className="flex-1 bg-red-500/20 hover:bg-red-500/30 text-red-400 font-bold py-3 rounded-full transition-colors border border-red-500/30"
                        >
                          Remove
                        </button>
                        {!approvedImages[reviewIndex] ? (
                          <button
                            onClick={() => approveImage(reviewIndex)}
                            className="flex-1 bg-green-500 hover:bg-green-400 text-white font-bold py-3 rounded-full transition-colors"
                          >
                            Approve
                          </button>
                        ) : (
                          <button
                            onClick={() => reviewIndex < 10 ? setReviewIndex(reviewIndex + 1) : null}
                            className="flex-1 bg-white/10 hover:bg-white/20 text-white font-bold py-3 rounded-full transition-colors"
                          >
                            {reviewIndex < 10 ? "Next" : "Done"}
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Final confirm — only when all 10 approved */}
                    {approvedImages.every(Boolean) && (
                      <button
                        onClick={() => confirmMonth(selectedMonth)}
                        className="w-full bg-green-500 hover:bg-green-400 text-white font-black py-4 rounded-full transition-colors text-lg mt-6"
                      >
                        CONFIRM {MONTHS[selectedMonth].toUpperCase()} — ALL PICTURES APPROVED
                      </button>
                    )}
                  </div>
                )}

                {monthsData[selectedMonth].confirmed && (
                  <div className="text-center py-6">
                    <svg width="60" height="60" viewBox="0 0 100 100" fill="none" className="mx-auto mb-3">
                      <circle cx="50" cy="50" r="40" stroke="#22c55e" strokeWidth="6" />
                      <path d="M35 50l10 10 20-20" stroke="#22c55e" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <p className="text-green-400 font-black text-lg">{MONTHS[selectedMonth]} is confirmed!</p>
                    <p className="text-white/40 text-sm mt-1">10 exclusive pictures + label locked in for this month.</p>
                  </div>
                )}

                {/* Disc Preview in upload view */}
                {monthsData[selectedMonth].images.length > 0 && (
                  <div className="mt-8 pt-8 border-t border-white/10">
                    <h3 className="text-lg font-black mb-4">Disc Preview</h3>
                    <p className="text-white/40 text-xs mb-6">
                      Pictures 1-10 appear on the ring · Picture 11 is the center label
                    </p>
                    <ViewMasterDisc
                      images={monthsData[selectedMonth].images}
                      month={MONTHS[selectedMonth]}
                      year="2026"
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* My REALS */}
        {activeTab === "reals" && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-black">My REALS</h2>
              <button
                onClick={() => setActiveTab("upload")}
                className="bg-offline-orange hover:bg-offline-orange-light text-white font-bold px-5 py-2 rounded-full text-sm transition-colors"
              >
                + New REAL
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { title: "Behind the Studio", date: "Feb 2026", status: "Shipped", subscribers: 1247 },
                { title: "Tour Diary: Oslo", date: "Jan 2026", status: "Shipped", subscribers: 1189 },
                { title: "Making of 'Echoes'", date: "Dec 2025", status: "Shipped", subscribers: 1102 },
                { title: "Personal Message: New Year", date: "Nov 2025", status: "Shipped", subscribers: 998 },
              ].map((real) => (
                <div key={real.title} className="bg-white/5 border border-white/10 rounded-xl p-5 hover:border-offline-orange/30 transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-12 h-12 bg-offline-orange/20 rounded-lg flex items-center justify-center text-xl">🎞️</div>
                    <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full font-bold">{real.status}</span>
                  </div>
                  <h3 className="font-bold mb-1">{real.title}</h3>
                  <p className="text-white/40 text-sm">{real.date} — {real.subscribers.toLocaleString()} shipped</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Subscribers */}
        {activeTab === "subscribers" && (
          <div>
            <h2 className="text-xl font-black mb-6">Subscribers</h2>
            <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left text-white/50 font-normal px-6 py-4">Name</th>
                      <th className="text-left text-white/50 font-normal px-6 py-4">Subscribed Since</th>
                      <th className="text-left text-white/50 font-normal px-6 py-4">REALS Received</th>
                      <th className="text-left text-white/50 font-normal px-6 py-4">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { name: "Alex M.", since: "Oct 2025", reals: 5, active: true },
                      { name: "Sarah K.", since: "Nov 2025", reals: 4, active: true },
                      { name: "Chris W.", since: "Dec 2025", reals: 3, active: true },
                      { name: "Emma L.", since: "Jan 2026", reals: 2, active: true },
                      { name: "David R.", since: "Feb 2026", reals: 1, active: true },
                    ].map((sub) => (
                      <tr key={sub.name} className="border-b border-white/5 hover:bg-white/5">
                        <td className="px-6 py-4 font-medium">{sub.name}</td>
                        <td className="px-6 py-4 text-white/60">{sub.since}</td>
                        <td className="px-6 py-4 text-white/60">{sub.reals}</td>
                        <td className="px-6 py-4">
                          <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full font-bold">
                            Active
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
