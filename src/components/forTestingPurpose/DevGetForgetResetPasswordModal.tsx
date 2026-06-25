// components/forTestingPurpose/DevGetForgetResetPasswordModal.tsx
import React from "react";

interface DevResetModalProps {
  token: string;
  onClose: () => void;
}

export default function DevGetForgetResetPasswordModal({
  token,
  onClose,
}: DevResetModalProps) {
  // Construct the link manually for testing
  const resetLink = `https://vellomij-fintech-web-banking.vercel.app/reset-password/${token}`;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-xl">
        <h2 className="text-xl font-bold text-[#0A1629] mb-4">
          Dev: Password Reset
        </h2>
        <p className="text-sm text-slate-600 mb-4">
          Since email is disabled on Render free tier, use this token to test:
        </p>

        <div className="bg-slate-100 p-3 rounded-lg text-xs font-mono break-all mb-6">
          {token}
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => window.open(resetLink, "_blank")}
            className="flex-1 bg-[#6D28D9] text-white py-2 rounded-lg font-bold"
          >
            Go to Reset Page
          </button>
          <button
            onClick={onClose}
            className="flex-1 bg-slate-200 text-slate-700 py-2 rounded-lg font-bold"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
