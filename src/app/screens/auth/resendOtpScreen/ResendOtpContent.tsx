"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { ArrowLeft, Mail, MailOpen } from "lucide-react";
import { useAppSelector } from "../../../hooks/useTypedSelector";
import { resendOtpUser } from "../../../store/auth/action/resendOtpAction";
import { AppDispatch } from "../../../store/auth/store";
import { toast } from "sonner";

export default function ResendOTPScreen() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");

  const dispatch = useDispatch<AppDispatch>();
  const { loading } = useAppSelector((state) => state.resendOtpState);

  // Capture email from URL query string
  useEffect(() => {
    const emailParam = searchParams.get("email");
    if (emailParam) {
      setEmail(emailParam);
    }
  }, [searchParams]);

  const handleResendOTP = async () => {
    if (!email) {
      toast.error("Error", { description: "Please enter your email address" });
      return;
    }

    try {
      await dispatch(resendOtpUser(email));
      // Navigate back to verify screen with email
      router.push(`/verify?email=${encodeURIComponent(email)}`);
    } catch (error) {
      // Action handles error display
    }
  };

  return (
    <div className="min-h-screen bg-white p-6 md:p-10 flex flex-col items-center">
      <div className="w-full max-w-md">
        <button
          onClick={() => router.back()}
          className="mb-8 p-2 rounded-full hover:bg-slate-100"
        >
          <ArrowLeft size={24} className="text-[#0A1629]" />
        </button>

        <div className="w-20 h-20 rounded-full bg-[#F8FAFC] flex items-center justify-center mb-8">
          <MailOpen size={40} className="text-[#6D28D9]" />
        </div>

        <div className="mb-10">
          <h1 className="text-[28px] font-extrabold text-[#0A1629] mb-3">
            Resend OTP
          </h1>
          <p className="text-[#64748B] leading-6">
            Enter your email address{" "}
            <span className="font-bold text-[#0A1629]">
              {email || "your account"}
            </span>
            . We will send a new 6-digit verification code to your inbox.
          </p>
        </div>

        <div className="mb-8">
          <label className="block text-sm font-bold text-[#0A1629] mb-2">
            Email Address
          </label>
          <div className="flex items-center bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl px-4 h-[56px] focus-within:ring-2 focus-within:ring-[#6D28D9]">
            <Mail size={20} className="text-[#64748B]" />
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 ml-3 bg-transparent outline-none text-[#0A1629]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        <button
          onClick={handleResendOTP}
          disabled={loading}
          className="w-full h-[56px] rounded-2xl bg-[#6D28D9] text-white font-bold hover:opacity-90 disabled:opacity-70 transition-all"
        >
          {loading ? "Sending..." : "Send New Code"}
        </button>

        <button
          onClick={() => router.push("/login")}
          className="w-full mt-6 text-sm font-semibold text-[#64748B] text-center"
        >
          Back to Login
        </button>
      </div>
    </div>
  );
}
