"use client";

import { useState, useRef, useEffect, useCallback } from "react";

interface ViewMasterDiscProps {
  images: string[];
  labelImage: string | null;
  onLabelUpload?: (dataUrl: string) => void;
  month?: string;
  year?: string;
}

export default function ViewMasterDisc({
  images,
  labelImage,
  onLabelUpload,
  month,
  year,
}: ViewMasterDiscProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const discRef = useRef<HTMLDivElement>(null);
  const labelInputRef = useRef<HTMLInputElement>(null);
  const [size, setSize] = useState(460);
  const [rotation, setRotation] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [dragStart, setDragStart] = useState(0);
  const [velocity, setVelocity] = useState(0);
  const [lastAngle, setLastAngle] = useState(0);
  const [lastTime, setLastTime] = useState(0);
  const animRef = useRef<number>(0);

  // Responsive sizing
  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setSize(Math.min(entry.contentRect.width, 480));
      }
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Momentum / inertia after drag
  useEffect(() => {
    if (dragging || Math.abs(velocity) < 0.1) return;
    let vel = velocity;
    const animate = () => {
      vel *= 0.95;
      setRotation((r) => r + vel);
      if (Math.abs(vel) > 0.1) {
        animRef.current = requestAnimationFrame(animate);
      }
    };
    animRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animRef.current);
  }, [dragging, velocity]);

  const SLOT_COUNT = 10;
  const ANGLE_STEP = 360 / SLOT_COUNT;
  const SLOT_RADIUS = size * 0.35;
  const SLOT_W = size * 0.145;
  const SLOT_H = size * 0.105;
  const LABEL_SIZE = size * 0.28;
  const HOLE_SIZE = size * 0.055;
  const PERF_RADIUS = size * 0.455;
  const PERF_SIZE = size * 0.022;

  const getAngle = useCallback(
    (clientX: number, clientY: number) => {
      if (!discRef.current) return 0;
      const rect = discRef.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      return Math.atan2(clientY - cy, clientX - cx) * (180 / Math.PI);
    },
    []
  );

  const handlePointerDown = (e: React.PointerEvent) => {
    // Don't start drag on label click
    if ((e.target as HTMLElement).closest("[data-label-area]")) return;
    setDragging(true);
    const angle = getAngle(e.clientX, e.clientY);
    setDragStart(angle - rotation);
    setLastAngle(angle);
    setLastTime(Date.now());
    setVelocity(0);
    cancelAnimationFrame(animRef.current);
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!dragging) return;
    const angle = getAngle(e.clientX, e.clientY);
    const now = Date.now();
    const dt = now - lastTime;
    if (dt > 0) {
      setVelocity((angle - lastAngle) / Math.max(dt / 16, 1));
    }
    setLastAngle(angle);
    setLastTime(now);
    setRotation(angle - dragStart);
  };

  const handlePointerUp = () => {
    setDragging(false);
  };

  const handleLabelUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      onLabelUpload?.(ev.target?.result as string);
    };
    reader.readAsDataURL(file);
    // Reset so the same file can be re-selected
    e.target.value = "";
  };

  const filledCount = images.filter(Boolean).length;
  const isComplete = filledCount === 10;

  return (
    <div ref={containerRef} className="w-full max-w-[480px] mx-auto">
      <div className="flex flex-col items-center">
        <div
          ref={discRef}
          className="relative select-none touch-none"
          style={{ width: size, height: size }}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
        >
          {/* Glow effect when complete */}
          {isComplete && (
            <div
              className="absolute inset-[-8px] rounded-full pointer-events-none animate-pulse"
              style={{
                background:
                  "radial-gradient(circle, rgba(232,70,28,0.15) 0%, transparent 70%)",
              }}
            />
          )}

          {/* Main disc body */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: `radial-gradient(circle at 42% 38%, #383838 0%, #222 35%, #181818 60%, #0e0e0e 100%)`,
              boxShadow: `
                0 16px 48px rgba(0,0,0,0.7),
                0 6px 16px rgba(0,0,0,0.5),
                inset 0 1px 3px rgba(255,255,255,0.07),
                inset 0 -2px 6px rgba(0,0,0,0.4)
              `,
              transform: `rotate(${rotation}deg)`,
              transition: dragging
                ? "none"
                : "transform 0.1s linear",
              cursor: dragging ? "grabbing" : "grab",
            }}
          >
            {/* Outer ring */}
            <div
              className="absolute rounded-full"
              style={{
                inset: size * 0.012,
                border: "1.5px solid rgba(255,255,255,0.05)",
              }}
            />

            {/* Film perforations around edge */}
            {Array.from({ length: 24 }).map((_, i) => {
              const angle = i * 15;
              return (
                <div
                  key={`perf-${i}`}
                  className="absolute"
                  style={{
                    width: PERF_SIZE,
                    height: PERF_SIZE,
                    borderRadius: 2,
                    background: "rgba(0,0,0,0.55)",
                    border: "0.5px solid rgba(255,255,255,0.04)",
                    top: "50%",
                    left: "50%",
                    transform: `rotate(${angle}deg) translateY(-${PERF_RADIUS}px) translate(-50%, -50%)`,
                  }}
                />
              );
            })}

            {/* Middle decorative ring */}
            <div
              className="absolute rounded-full"
              style={{
                inset: size * 0.07,
                border: "0.5px solid rgba(255,255,255,0.035)",
              }}
            />

            {/* Inner decorative ring (around slots) */}
            <div
              className="absolute rounded-full"
              style={{
                inset: size * 0.14,
                border: "0.5px solid rgba(255,255,255,0.03)",
              }}
            />

            {/* Notch marks between slots */}
            {Array.from({ length: SLOT_COUNT }).map((_, i) => {
              const angle = i * ANGLE_STEP + ANGLE_STEP / 2 - 90;
              return (
                <div
                  key={`notch-${i}`}
                  className="absolute"
                  style={{
                    width: size * 0.012,
                    height: size * 0.03,
                    borderRadius: size * 0.006,
                    background: "rgba(0,0,0,0.45)",
                    border: "0.5px solid rgba(255,255,255,0.03)",
                    top: "50%",
                    left: "50%",
                    transform: `rotate(${angle}deg) translateY(-${SLOT_RADIUS}px) translate(-50%, -50%)`,
                  }}
                />
              );
            })}

            {/* Image slots */}
            {Array.from({ length: SLOT_COUNT }).map((_, i) => {
              const angle = i * ANGLE_STEP - 90;
              const img = images[i];

              return (
                <div
                  key={`slot-${i}`}
                  className="absolute overflow-hidden"
                  style={{
                    width: SLOT_W,
                    height: SLOT_H,
                    borderRadius: size * 0.012,
                    top: "50%",
                    left: "50%",
                    transform: `rotate(${angle}deg) translateY(-${SLOT_RADIUS}px) translate(-50%, -50%)`,
                    border: img
                      ? `2px solid rgba(255,255,255,0.18)`
                      : `1.5px dashed rgba(232, 70, 28, 0.25)`,
                    background: img ? "#000" : "rgba(232, 70, 28, 0.02)",
                    boxShadow: img
                      ? "inset 0 0 6px rgba(0,0,0,0.5), 0 1px 3px rgba(0,0,0,0.3)"
                      : "none",
                  }}
                >
                  {img ? (
                    <img
                      src={img}
                      alt={`Picture ${i + 1}`}
                      className="w-full h-full object-cover"
                      draggable={false}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span
                        className="text-offline-orange/25 font-bold"
                        style={{
                          fontSize: size * 0.02,
                          transform: `rotate(${-(angle)}deg)`,
                        }}
                      >
                        {i + 1}
                      </span>
                    </div>
                  )}
                </div>
              );
            })}

            {/* OFFL/NE branding text on disc */}
            {[0, 180].map((textAngle) => (
              <div
                key={`brand-${textAngle}`}
                className="absolute pointer-events-none"
                style={{
                  top: "50%",
                  left: "50%",
                  transform: `rotate(${textAngle}deg) translateY(-${size * 0.21}px) translate(-50%, -50%)`,
                }}
              >
                <span
                  className="font-black tracking-[0.2em] text-white/5 whitespace-nowrap"
                  style={{ fontSize: size * 0.018 }}
                >
                  {"OFFL/NE REALS"}
                </span>
              </div>
            ))}

            {/* Month/Year text on disc */}
            {month && (
              <div
                className="absolute pointer-events-none"
                style={{
                  top: "50%",
                  left: "50%",
                  transform: `rotate(90deg) translateY(-${size * 0.21}px) translate(-50%, -50%)`,
                }}
              >
                <span
                  className="font-black tracking-[0.15em] text-white/5 whitespace-nowrap uppercase"
                  style={{ fontSize: size * 0.016 }}
                >
                  {month} {year || ""}
                </span>
              </div>
            )}

            {/* Center label area */}
            <div
              data-label-area
              className="absolute rounded-full overflow-hidden flex items-center justify-center"
              style={{
                width: LABEL_SIZE,
                height: LABEL_SIZE,
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                background: labelImage
                  ? "transparent"
                  : "radial-gradient(circle, #1e1e1e 0%, #131313 100%)",
                border: `2.5px solid rgba(255,255,255,0.1)`,
                boxShadow:
                  "inset 0 2px 10px rgba(0,0,0,0.5), 0 0 0 1px rgba(0,0,0,0.3)",
                cursor: "pointer",
              }}
              onClick={(e) => {
                e.stopPropagation();
                labelInputRef.current?.click();
              }}
            >
              {labelImage ? (
                <img
                  src={labelImage}
                  alt="Center label"
                  className="w-full h-full object-cover"
                  style={{ transform: `rotate(${-rotation}deg)` }}
                  draggable={false}
                />
              ) : (
                <div
                  className="text-center"
                  style={{ transform: `rotate(${-rotation}deg)` }}
                >
                  <svg
                    width={size * 0.04}
                    height={size * 0.04}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="text-white/20 mx-auto mb-1"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 8v8M8 12h8" />
                  </svg>
                  <div
                    className="text-white/20 font-bold uppercase tracking-wider"
                    style={{ fontSize: size * 0.02 }}
                  >
                    Add Label
                  </div>
                </div>
              )}

              {/* Center hole */}
              <div
                className="absolute rounded-full pointer-events-none"
                style={{
                  width: HOLE_SIZE,
                  height: HOLE_SIZE,
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  background:
                    "radial-gradient(circle, #000 50%, #0a0a0a 100%)",
                  border: "2px solid rgba(255,255,255,0.06)",
                  boxShadow: "inset 0 1px 4px rgba(0,0,0,0.8)",
                }}
              />
            </div>
          </div>

          {/* Hidden file input for label */}
          <input
            ref={labelInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleLabelUpload}
          />
        </div>

        {/* Slot counter + instructions */}
        <div className="mt-5 text-center space-y-1">
          <div className="flex items-center justify-center gap-2">
            <span
              className={`text-sm font-bold ${isComplete ? "text-green-400" : "text-white/40"}`}
            >
              {filledCount}/10 pictures loaded
            </span>
            {isComplete && (
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                className="text-green-400"
              >
                <path
                  d="M5 13l4 4L19 7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </div>
          <p className="text-white/25 text-xs">
            Drag to rotate · Click center to add label
          </p>
        </div>
      </div>
    </div>
  );
}
