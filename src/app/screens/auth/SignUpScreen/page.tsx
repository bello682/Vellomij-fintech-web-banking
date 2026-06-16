"use client";

import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

// Preserving your exact logic imports
import { useAppSelector } from "../../../hooks/useTypedSelector";
import { register } from "../../../store/auth/action/registerAction";
import { AppDispatch } from "../../../store/auth/store";
import LoadingOverlay from "@/components/common/AppLoader";

export default function RegisterScreen() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch<AppDispatch>();
  const { loading, errorMsg } = useAppSelector((state) => state.registration);

  useEffect(() => {
    localStorage.removeItem("registrationEmail");
  }, []);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName || !email || !password) {
      alert("Please fill in all fields");
      return;
    }

    const formData = { fullName, email, password };

    try {
      // Logic parity: dispatching the same register action
      const response: any = await dispatch(register(formData));

      if (response && (response.status === 201 || response.status === 200)) {
        // Navigating to OTP verification as per your mobile flow
        router.push("/screens/auth/OtpVerificationScreen");
      }
    } catch (error) {
      console.log("Registration process stopped due to error", error);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col justify-center px-6 py-12">
      <LoadingOverlay visible={loading} message="Creating your account..." />

      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="absolute top-8 left-8 flex items-center gap-2 text-slate-400 hover:text-[#6D28D9] transition-colors"
      >
        <ArrowLeft size={20} />
        <span className="font-bold text-sm">Back</span>
      </button>

      <div className="max-w-md w-full mx-auto">
        <h1 className="text-3xl font-black text-slate-900">Create Account</h1>
        <p className="text-slate-500 mt-2 mb-10">
          Join Vellomiji and start saving today.
        </p>

        <form onSubmit={handleRegister} className="space-y-5">
          {/* Full Name Input */}
          <div>
            <label className="block text-sm font-bold text-slate-900 mb-2">
              Full Name
            </label>
            <input
              type="text"
              placeholder="John Doe"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full h-14 bg-slate-50 border border-slate-200 rounded-xl px-5 outline-none focus:ring-2 focus:ring-[#6D28D9]"
            />
          </div>

          {/* Email Input */}
          <div>
            <label className="block text-sm font-bold text-slate-900 mb-2">
              Email Address
            </label>
            <input
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-14 bg-slate-50 border border-slate-200 rounded-xl px-5 outline-none focus:ring-2 focus:ring-[#6D28D9]"
            />
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-sm font-bold text-slate-900 mb-2">
              Password
            </label>
            <input
              type="password"
              placeholder="Create a strong password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-14 bg-slate-50 border border-slate-200 rounded-xl px-5 outline-none focus:ring-2 focus:ring-[#6D28D9]"
            />
          </div>

          {/* Error Message Display */}
          {errorMsg && (
            <p className="text-red-500 text-sm text-center font-medium">
              {errorMsg}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full h-14 bg-[#6D28D9] text-white rounded-xl font-bold hover:bg-[#5b21b6] transition-all disabled:opacity-70 mt-6"
          >
            {loading ? "Creating Account..." : "Continue"}
          </button>
        </form>

        <div className="text-center mt-8">
          <button
            onClick={() => router.push("/screens/auth/LoginScreen")}
            className="text-slate-500 text-sm"
          >
            Already have an account?{" "}
            <span className="text-[#6D28D9] font-bold">Log In</span>
          </button>
        </div>
      </div>
    </div>
  );
}
