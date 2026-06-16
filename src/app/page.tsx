// app/page.tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "./hooks/useTypedSelector";
import { Logo3D } from "../components/common/Logo3D";

export default function RootPage() {
  const router = useRouter();
  const { user } = useAppSelector((state) => state.loginState);

  useEffect(() => {
    const timer = setTimeout(() => {
      const hasSeenOnboarding = localStorage.getItem("hasSeenOnboarding");

      // LOGIC FLOW:
      // 1. If already logged in, skip everything and go to Dashboard
      if (user?.token) {
        router.replace("/dashboard");
      }
      // 2. If they've seen onboarding (returning user), send to Login
      else if (hasSeenOnboarding === "true") {
        router.replace("/screens/auth/LoginScreen");
      }
      // 3. IF NEW USER: Send to the Marketing Landing Page first!
      else {
        router.replace("/landing");
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [user?.token, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <Logo3D size={220} />
    </div>
  );
}
