"use client";

import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";

// Assuming these paths remain the same as your mobile setup
import { useAppSelector } from "../../../hooks/useTypedSelector";
import { loginUser } from "../../../store/auth/action/loginAction";
import { AppDispatch } from "../../../store/auth/store";
import LoadingOverlay from "@/components/common/AppLoader";

const LoginScreen = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, error } = useAppSelector((state) => state.loginState);

  useEffect(() => {
    localStorage.removeItem("registrationEmail");
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!email || !password) {
      alert("Please enter both email and password.");
      return;
    }

    try {
      const credentials = {
        email: email.trim().toLowerCase(),
        password: password,
      };

      // Dispatch the action and wait for the response
      const response: any = await dispatch(loginUser(credentials));

      // If login is successful (status 200/201), navigate to the Dashboard
      if (response && (response.status === 200 || response.status === 201)) {
        router.replace("/dashboard"); // Adjusted for web routing
      }
    } catch (err) {
      console.log("Login execution stopped due to error", err);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col justify-center px-6 py-12">
      <LoadingOverlay visible={isLoading} message="Signing you in..." />
      {/* Back to Home */}
      <button
        onClick={() => router.push("/")}
        className="absolute top-8 left-8 flex items-center gap-2 text-slate-400 hover:text-[#6D28D9] transition-colors"
      >
        <ArrowLeft size={20} />
        <span className="font-bold text-sm">Back</span>
      </button>

      <div className="max-w-md w-full mx-auto">
        <h1 className="text-3xl font-bold text-slate-900">Welcome Back</h1>
        <p className="text-slate-500 mt-2 mb-10">
          Log in to your secure account
        </p>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-14 bg-slate-50 border border-slate-200 rounded-xl px-5 outline-none focus:ring-2 focus:ring-[#6D28D9]"
              placeholder="name@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-14 bg-slate-50 border border-slate-200 rounded-xl px-5 pr-12 outline-none focus:ring-2 focus:ring-[#6D28D9]"
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-4 text-slate-400"
              >
                {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
              </button>
            </div>
          </div>

          {/* Forgot Password Link */}
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => router.push("/screens/auth/ForgotPasswordScreen")}
              className="text-sm font-semibold text-[#6D28D9] hover:text-[#5b21b6]"
            >
              Forgot Password?
            </button>
          </div>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full h-14 bg-[#6D28D9] text-white rounded-xl font-bold hover:bg-[#5b21b6] disabled:opacity-70 mt-6"
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div className="text-center mt-8">
          <button
            onClick={() => router.push("/screens/auth/SignUpScreen")}
            className="text-slate-500"
          >
            Don't have an account?{" "}
            <span className="text-[#6D28D9] font-bold">Sign Up</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
