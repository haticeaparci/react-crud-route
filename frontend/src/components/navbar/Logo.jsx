import React from "react";

export default function Logo({ size = 28 }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={size}
      viewBox="0 0 800 40"
      role="img"
      aria-label="Crafted with passion | Code, Love & Hatice"
    >
      <text
        x="0"
        y="25"
        fontFamily="system-ui, sans-serif"
        fontSize="18"
        fontWeight="600"
        fill="url(#grad)"
      >
        ✨ Crafted with passion | code, love &amp; hatice.aparci 💜
      </text>
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#ec4899" />
        </linearGradient>
      </defs>
    </svg>
  );
}
