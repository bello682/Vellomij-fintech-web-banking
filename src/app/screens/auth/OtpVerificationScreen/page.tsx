"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { ArrowLeft } from "lucide-react"; // Install with: npm install lucide-react
import { useAppSelector } from "../../../hooks/useTypedSelector";
import { verifyUser } from "../../../store/auth/action/verificationAction";
import { AppDispatch } from "../../../store/auth/store";
import { toast } from "sonner"; // Assuming you have sonner for toasts
import { resendOtpUser } from "@/app/store/auth/action/resendOtpAction";
import DevOTPModal from "@/components/forTestingPurpose/DevOTPModal";

export default function OTPScreen() {
  const [code, setCode] = useState("");
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);

  // for testing
  const [showTestModal, setShowTestModal] = useState(false);
  const [testOtp, setTestOtp] = useState("");
  // for testing

  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const [email, setEmail] = useState("");

  const CODE_LENGTH = 6;
  const dispatch = useDispatch<AppDispatch>();
  const { loading } = useAppSelector((state) => state.verification);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timer > 0) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    } else {
      setCanResend(true);
    }
    return () => clearInterval(interval);
  }, [timer]);

  useEffect(() => {
    const storedEmail = localStorage.getItem("registrationEmail");
    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, []);

  const handleVerify = async () => {
    if (code.length < CODE_LENGTH) {
      toast.error("Invalid Code", {
        description: `Please enter the full ${CODE_LENGTH}-digit code`,
      });
      return;
    }
    try {
      const response: any = await dispatch(verifyUser(code, email));
      if (response?.status === 200 || response?.status === 201) {
        router.push("/screens/auth/LoginScreen");
      }
    } catch (error) {
      console.log("Verification process stopped", error);
    }
  };

  // for testing
  // If you pass the test OTP from the Registration page to this screen
  // or get it from your global state:
  useEffect(() => {
    const devOtp = localStorage.getItem("dev_otp");
    if (devOtp) {
      setTestOtp(devOtp);
      setShowTestModal(true);
    }
  }, []);
  // for testing

  return (
    <div className="min-h-screen bg-white flex flex-col p-6 pt-10">
      <button
        onClick={() => router.back()}
        className="w-10 h-10 flex items-center justify-center"
      >
        <ArrowLeft className="text-[#0A1629]" size={24} />
      </button>
      <div className="flex-1 max-w-md mx-auto w-full pt-10">
        <h1 className="text-[28px] font-extrabold text-[#0A1629] mb-3">
          Verification
        </h1>
        <p className="text-[#64748B] mb-10 leading-6">
          Enter the 6-digit code sent to{" "}
          <span className="font-bold text-[#0A1629]">
            {email || "your email"}
          </span>
        </p>

        {/* OTP Input Grid */}
        <div
          className="flex justify-between mb-10 gap-3"
          onClick={() => inputRef.current?.focus()}
        >
          {[...Array(CODE_LENGTH)].map((_, i) => {
            const digit = code[i] || "";
            const isFocused = code.length === i;
            return (
              <div
                key={i}
                className={`w-12 h-14 rounded-2xl border-2 flex items-center justify-center text-xl font-bold transition-all
                  ${isFocused ? "border-[#6D28D9] bg-white" : digit ? "border-[#6D28D9] bg-white" : "border-[#E2E8F0] bg-[#F8FAFC]"}`}
              >
                <span className="text-[#0A1629]">{digit}</span>
              </div>
            );
          })}
        </div>

        {/* Hidden Input */}
        <input
          ref={inputRef}
          type="number"
          value={code}
          onChange={(e) =>
            e.target.value.length <= CODE_LENGTH && setCode(e.target.value)
          }
          className="opacity-0 absolute"
          autoFocus
        />

        <button
          onClick={handleVerify}
          disabled={loading}
          className={`w-full h-[55px] rounded-2xl bg-[#6D28D9] text-white font-bold transition-opacity ${loading ? "opacity-70" : "hover:opacity-90"}`}
        >
          {loading ? "Verifying..." : "Verify Account"}
        </button>

        <div className="flex justify-center mt-8 text-sm">
          <p className="text-[#64748B]">Didn't receive code? </p>
          <button
            onClick={async () => {
              // 1. Trigger the resend action first
              try {
                await dispatch(resendOtpUser(email));

                // 2. Only reset the UI timer if the request was successful
                setTimer(60);
                setCanResend(false);
                setCode("");
              } catch (err) {
                // The action's catch block already handles the error toast
              }
            }}
            disabled={!canResend || loading} // Add loading check here
            className={`font-bold ml-1 ${canResend ? "text-[#6D28D9]" : "text-[#E2E8F0]"}`}
          >
            {loading
              ? "Sending..."
              : canResend
                ? "Resend OTP"
                : `Resend in ${timer}s`}
          </button>
        </div>
      </div>
      // Inside the return block, before the closing div
      {showTestModal && (
        <DevOTPModal
          otp={testOtp}
          onClose={() => setShowTestModal(false)}
          onFill={() => {
            setCode(testOtp);
            setShowTestModal(false);
          }}
        />
      )}
    </div>
  );
}
