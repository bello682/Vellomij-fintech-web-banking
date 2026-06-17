"use client";

import React from "react";

interface Logo3DProps {
  size?: number;
}

export const Logo3D: React.FC<Logo3DProps> = React.memo(({ size = 180 }) => {
  return (
    <div
      className="flex flex-col items-center justify-center"
      style={{ width: size, height: size * 1.35 }}
    >
      {/* Spinning Container */}
      <div
        className="flex flex-row items-center relative animate-spin-slow"
        style={{ perspective: "1000px" }}
      >
        <span
          // className="font-bold text-[#007BFF] z-20 drop-shadow-lg"
          className="font-bold text-[#6D28D9] z-20 drop-shadow-lg"
          style={{ fontSize: size * 0.44 }}
        >
          V
        </span>
        <span
          // className="font-bold text-[#0056B3] z-20 drop-shadow-lg"
          className="font-bold text-[#6D28D9] z-20 drop-shadow-lg"
          style={{ fontSize: size * 0.44, marginLeft: size * -0.11 }}
        >
          B
        </span>
      </div>

      <p
        // className="font-semibold text-[#0A1629] mt-0 tracking-[1.5px] text-center"
        className="font-semibold text-[#6D28D9] mt-0 tracking-[1.5px] text-center"
        style={{ fontSize: size * 0.11 }}
      >
        Vellomij Bank
      </p>
    </div>
  );
});

export default Logo3D;
