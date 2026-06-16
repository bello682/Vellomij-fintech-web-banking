import React from "react";

interface LoadingProps {
  visible: boolean;
  message?: string;
}

const LoadingOverlay = ({ visible, message = "Loading..." }: LoadingProps) => {
  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm">
      <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100 flex flex-col items-center animate-in fade-in zoom-in duration-200">
        {/* Animated Spinner */}
        <div className="w-10 h-10 border-4 border-[#6D28D9]/20 border-t-[#6D28D9] rounded-full animate-spin" />

        <p className="mt-5 text-sm font-bold text-[#6D28D9] tracking-wide uppercase">
          {message}
        </p>
      </div>
    </div>
  );
};

export default LoadingOverlay;
