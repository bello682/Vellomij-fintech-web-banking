"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { ArrowLeft, Key, Mail } from "lucide-react";
import { AppDispatch } from "../../../store/auth/store"; // Adjust path as needed
import { forgetUserPassword } from "../../../store/auth/action/forgetPasswordAction";

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState("");
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  // Using your specific reducer state
  const { loading_now } = useSelector(
    (state: any) => state.forgetPasswordReducer,
  );

  const handleResetRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    const success = await dispatch(forgetUserPassword(email, "web") as any);
    if (success) {
      // After 3 seconds, navigate back to Login
      setTimeout(() => router.push("/screens/auth/LoginScreen"), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col p-6 pt-10">
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-100 transition-colors"
      >
        <ArrowLeft className="text-[#0A1629]" size={24} />
      </button>

      <div className="flex-1 max-w-md mx-auto w-full pt-10">
        {/* Icon Circle */}
        <div className="w-20 h-20 rounded-full bg-[#F8FAFC] flex items-center justify-center mb-8">
          <Key size={40} className="text-[#6D28D9]" />
        </div>

        <h1 className="text-[28px] font-extrabold text-[#0A1629] mb-3">
          Forgot Password?
        </h1>
        <p className="text-[#64748B] leading-6 mb-10">
          No worries! Enter the email associated with your account and we'll
          send a reset link.
        </p>

        <form onSubmit={handleResetRequest} className="space-y-6">
          {/* Email Input Wrapper */}
          <div>
            <label className="block text-sm font-bold text-[#0A1629] mb-2">
              Email Address
            </label>
            <div className="flex items-center bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl px-4 h-[56px] focus-within:ring-2 focus-within:ring-[#6D28D9]">
              <Mail size={20} className="text-[#64748B]" />
              <input
                type="email"
                placeholder="example@gmail.com"
                className="flex-1 ml-3 bg-transparent outline-none text-[#0A1629]"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading_now || !email}
            className={`w-full h-[56px] rounded-2xl bg-[#6D28D9] text-white font-bold transition-all ${
              loading_now ? "opacity-70 cursor-not-allowed" : "hover:opacity-90"
            }`}
          >
            {loading_now ? "Sending..." : "Send Reset Link"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordScreen;
