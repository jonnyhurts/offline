"use client";

import { useState, useRef, useEffect, useCallback } from "react";

interface ViewMasterDiscProps {
  images: string[]; // up to 11: [0-9] = 10 ring slots, [10] = center label
  month?: string;
  year?: string;
}

export default function ViewMasterDisc({
  images,
  month,
  year,
}: ViewMasterDiscProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const discRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState(460);
  const [rotation, setRotation] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [dragStart, setDragStart] = useState(0);
  const [velocity, setVelocity] = useState(0);
  const [lastAngle, setLastAngle] = useState(0);
  const [lastTime, setLastTime] = useState(0);
  const animRef = useRef<number>(0);

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

  const RING_SLOTS = 10;
  const ANGLE_STEP = 360 / RING_SLOTS;
  const SLOT_RADIUS = size * 0.35;
  const SLOT_SIZE = size * 0.105;
  const LABEL_SIZE = size * 0.30;
  const HOLE_SIZE = size * 0.045;
  const PERF_RADIUS = size * 0.46;
  const PERF_SIZE = size * 0.02;

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

  const handlePointerUp = () => setDragging(false);

  const ringImages = images.slice(0, 10);
  const labelImage = images[10] || null;
  const filledRing = ringImages.filter(Boolean).length;
  const hasLabel = !!labelImage;
  const isComplete = filledRing === 10 && hasLabel;

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
              className="absolute rounded-full pointer-events-none animate-pulse"
              style={{
                inset: -8,
                background:
                  "radial-gradient(circle, rgba(232,70,28,0.2) 0%, transparent 70%)",
              }}
            />
          )}

          {/* Main disc body — WHITE */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background:
                "radial-gradient(circle at 42% 38%, #ffffff 0%, #f5f5f5 35%, #e8e8e8 60%, #ddd 100%)",
              boxShadow:
                "0 16px 48px rgba(0,0,0,0.25), 0 6px 16px rgba(0,0,0,0.15), inset 0 1px 3px rgba(255,255,255,0.8), inset 0 -2px 6px rgba(0,0,0,0.08)",
              transform: `rotate(${rotation}deg)`,
              transition: dragging ? "none" : "transform 0.1s linear",
              cursor: dragging ? "grabbing" : "grab",
            }}
          >
            {/* Outer ring */}
            <div
              className="absolute rounded-full"
              style={{
                inset: size * 0.012,
                border: "1.5px solid rgba(0,0,0,0.08)",
              }}
            />

            {/* Film perforations around edge */}
            {Array.from({ length: 24 }).map((_, i) => (
              <div
                key={`perf-${i}`}
                className="absolute"
                style={{
                  width: PERF_SIZE,
                  height: PERF_SIZE,
                  borderRadius: 2,
                  background: "rgba(0,0,0,0.08)",
                  border: "0.5px solid rgba(0,0,0,0.05)",
                  top: "50%",
                  left: "50%",
                  marginLeft: -PERF_SIZE / 2,
                  marginTop: -PERF_SIZE / 2,
                  transform: `rotate(${i * 15}deg) translateY(-${PERF_RADIUS}px)`,
                }}
              />
            ))}

            {/* Middle decorative ring */}
            <div
              className="absolute rounded-full"
              style={{
                inset: size * 0.07,
                border: "0.5px solid rgba(0,0,0,0.06)",
              }}
            />

            {/* Inner decorative ring */}
            <div
              className="absolute rounded-full"
              style={{
                inset: size * 0.14,
                border: "0.5px solid rgba(0,0,0,0.05)",
              }}
            />

            {/* Notch marks between slots */}
            {Array.from({ length: RING_SLOTS }).map((_, i) => {
              const angle = i * ANGLE_STEP + ANGLE_STEP / 2 - 90;
              const notchW = size * 0.01;
              const notchH = size * 0.025;
              return (
                <div
                  key={`notch-${i}`}
                  className="absolute"
                  style={{
                    width: notchW,
                    height: notchH,
                    borderRadius: notchW / 2,
                    background: "rgba(0,0,0,0.1)",
                    top: "50%",
                    left: "50%",
                    marginLeft: -notchW / 2,
                    marginTop: -notchH / 2,
                    transform: `rotate(${angle}deg) translateY(-${SLOT_RADIUS}px)`,
                  }}
                />
              );
            })}

            {/* 10 ring image slots (square) */}
            {Array.from({ length: RING_SLOTS }).map((_, i) => {
              const angle = i * ANGLE_STEP - 90;
              const img = ringImages[i];

              return (
                <div
                  key={`slot-${i}`}
                  className="absolute overflow-hidden"
                  style={{
                    width: SLOT_SIZE,
                    height: SLOT_SIZE,
                    borderRadius: size * 0.01,
                    top: "50%",
                    left: "50%",
                    marginLeft: -SLOT_SIZE / 2,
                    marginTop: -SLOT_SIZE / 2,
                    transform: `rotate(${angle}deg) translateY(-${SLOT_RADIUS}px)`,
                    border: img
                      ? "2px solid rgba(0,0,0,0.15)"
                      : "1.5px dashed rgba(232, 70, 28, 0.35)",
                    background: img ? "#000" : "rgba(232, 70, 28, 0.04)",
                    boxShadow: img
                      ? "inset 0 0 4px rgba(0,0,0,0.3), 0 1px 3px rgba(0,0,0,0.1)"
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
                        className="font-bold"
                        style={{
                          fontSize: size * 0.02,
                          color: "rgba(232, 70, 28, 0.3)",
                          transform: `rotate(${-angle}deg)`,
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
                  transform: `rotate(${textAngle}deg) translateY(-${size * 0.215}px) translate(-50%, -50%)`,
                }}
              >
                <span
                  className="font-black tracking-[0.2em] whitespace-nowrap"
                  style={{ fontSize: size * 0.014, color: "rgba(0,0,0,0.08)" }}
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
                  transform: `rotate(90deg) translateY(-${size * 0.215}px) translate(-50%, -50%)`,
                }}
              >
                <span
                  className="font-black tracking-[0.15em] whitespace-nowrap uppercase"
                  style={{ fontSize: size * 0.012, color: "rgba(0,0,0,0.08)" }}
                >
                  {month} {year || ""}
                </span>
              </div>
            )}

            {/* OFFL/NE logo in orange below center label */}
            <div
              className="absolute pointer-events-none flex flex-col items-center"
              style={{
                top: "50%",
                left: "50%",
                transform: `translate(-50%, ${LABEL_SIZE / 2 + size * 0.012}px)`,
              }}
            >
              <span
                className="font-black tracking-[0.15em] whitespace-nowrap"
                style={{ fontSize: size * 0.028, color: "#E8461C" }}
              >
                {"OFFL/NE"}
              </span>
            </div>

            {/* Center label area (picture 11) */}
            <div
              className="absolute rounded-full overflow-hidden flex items-center justify-center"
              style={{
                width: LABEL_SIZE,
                height: LABEL_SIZE,
                top: "50%",
                left: "50%",
                marginLeft: -LABEL_SIZE / 2,
                marginTop: -LABEL_SIZE / 2,
                background: labelImage
                  ? "transparent"
                  : "radial-gradient(circle, #f0f0f0 0%, #e0e0e0 100%)",
                border: "2.5px solid rgba(0,0,0,0.1)",
                boxShadow:
                  "inset 0 2px 8px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.05)",
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
                  <div
                    className="font-bold uppercase tracking-wider"
                    style={{ fontSize: size * 0.022, color: "rgba(0,0,0,0.15)" }}
                  >
                    11
                  </div>
                  <div
                    className="uppercase tracking-wider"
                    style={{ fontSize: size * 0.014, color: "rgba(0,0,0,0.1)" }}
                  >
                    Label
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
                  marginLeft: -HOLE_SIZE / 2,
                  marginTop: -HOLE_SIZE / 2,
                  background:
                    "radial-gradient(circle, #333 50%, #222 100%)",
                  border: "2px solid rgba(0,0,0,0.15)",
                  boxShadow: "inset 0 1px 4px rgba(0,0,0,0.5)",
                }}
              />
            </div>
          </div>
        </div>

        {/* Counter + instructions */}
        <div className="mt-5 text-center space-y-1">
          <div className="flex items-center justify-center gap-2">
            <span
              className={`text-sm font-bold ${isComplete ? "text-green-400" : "text-white/40"}`}
            >
              {filledRing + (hasLabel ? 1 : 0)}/11 pictures loaded
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
            Drag to rotate · Pictures 1-10 on ring · Picture 11 is the label
          </p>
        </div>
      </div>
    </div>
  );
}
