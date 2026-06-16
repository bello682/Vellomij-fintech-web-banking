import React from "react";
import { LogOut } from "lucide-react";

interface LogoutModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isLoading: boolean;
}

const LogoutModal: React.FC<LogoutModalProps> = ({
  visible,
  onClose,
  onConfirm,
  isLoading,
}) => {
  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-sm bg-white rounded-3xl p-8 flex flex-col items-center shadow-2xl animate-in fade-in zoom-in duration-200">
        {/* Icon Circle */}
        <div className="w-20 h-20 rounded-full bg-red-50 flex items-center justify-center mb-6">
          <LogOut size={32} className="text-red-500" />
        </div>

        {/* Text Content */}
        <h2 className="text-2xl font-bold text-slate-900 mb-3">Log Out</h2>
        <p className="text-slate-500 text-center mb-8 leading-relaxed">
          Are you sure you want to log out of your account?
        </p>

        {/* Buttons */}
        <div className="flex w-full gap-3">
          <button
            onClick={onClose}
            disabled={isLoading}
            className="flex-1 h-14 rounded-xl bg-slate-100 font-semibold text-slate-700 hover:bg-slate-200 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className="flex-1 h-14 rounded-xl bg-red-500 font-bold text-white hover:bg-red-600 transition-colors disabled:opacity-70"
          >
            {isLoading ? "Logging out..." : "Yes, Logout"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
