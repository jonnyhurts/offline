"use client";

export default function FilmStrip({ className = "" }: { className?: string }) {
  // Hand-drawn style: slightly varied sizes and rotations
  const perforations = [
    { w: 52, h: 42, r: 1.2, rx: 6 },
    { w: 48, h: 40, r: -0.8, rx: 7 },
    { w: 50, h: 43, r: 0.5, rx: 5 },
    { w: 51, h: 41, r: -1.5, rx: 8 },
    { w: 49, h: 42, r: 0.9, rx: 6 },
    { w: 52, h: 40, r: -0.6, rx: 7 },
    { w: 48, h: 43, r: 1.8, rx: 5 },
    { w: 50, h: 41, r: -1.2, rx: 6 },
    { w: 51, h: 42, r: 0.7, rx: 8 },
    { w: 49, h: 40, r: -0.4, rx: 7 },
    { w: 52, h: 43, r: 1.1, rx: 5 },
    { w: 48, h: 41, r: -1.7, rx: 6 },
    { w: 50, h: 42, r: 0.3, rx: 7 },
    { w: 51, h: 40, r: -0.9, rx: 8 },
  ];

  return (
    <div className={`w-full overflow-hidden bg-offline-orange ${className}`}>
      <div className="flex items-center justify-around px-3 py-3">
        {perforations.map((p, i) => (
          <div
            key={i}
            style={{
              width: p.w,
              height: p.h,
              transform: `rotate(${p.r}deg)`,
              borderRadius: p.rx,
            }}
            className="bg-white flex-shrink-0"
          />
        ))}
      </div>
    </div>
  );
}
