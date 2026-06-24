"use client";
import React from "react";

export default function DevOTPModal({
  otp,
  onClose,
  onFill,
}: {
  otp: string;
  onClose: () => void;
  onFill: () => void;
}) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-6 z-50">
      <div className="bg-white rounded-3xl p-8 w-full max-w-sm text-center">
        <h2 className="text-xl font-bold mb-2">Test Mode: OTP</h2>
        <p className="text-sm text-gray-500 mb-6">
          Use this code to verify your account
        </p>
        <div className="text-4xl font-mono font-bold tracking-widest text-[#6D28D9] mb-8">
          {otp}
        </div>
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-xl border border-gray-200"
          >
            Close
          </button>
          <button
            onClick={onFill}
            className="flex-1 py-3 rounded-xl bg-[#6D28D9] text-white"
          >
            Auto-fill
          </button>
        </div>
      </div>
    </div>
  );
}
