"use client";

export default function PowerIcon({
  size = 160,
  color = "black",
  className = "",
}: {
  size?: number;
  color?: string;
  className?: string;
}) {
  // Film-reel style power button: circle made of square perforations
  const numSquares = 16;
  const radius = 38;
  const squareSize = 10;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Circle made of square perforations */}
      {Array.from({ length: numSquares }).map((_, i) => {
        const angle = (i * 360) / numSquares - 90;
        const rad = (angle * Math.PI) / 180;
        const cx = 50 + radius * Math.cos(rad);
        const cy = 50 + radius * Math.sin(rad);
        // Slight variation for hand-drawn feel
        const variation = i % 3 === 0 ? 1 : i % 3 === 1 ? -0.5 : 0.5;
        return (
          <rect
            key={i}
            x={cx - squareSize / 2}
            y={cy - squareSize / 2}
            width={squareSize + variation}
            height={squareSize - variation * 0.5}
            rx={1.5}
            fill={color}
            transform={`rotate(${angle + 90} ${cx} ${cy})`}
          />
        );
      })}
      {/* Power button stem */}
      <rect
        x="46"
        y="12"
        width="8"
        height="26"
        rx="3"
        fill={color}
      />
      {/* Outer ring stroke for structure */}
      <circle
        cx="50"
        cy="50"
        r="40"
        stroke={color}
        strokeWidth="4"
        strokeOpacity="0.15"
      />
    </svg>
  );
}
