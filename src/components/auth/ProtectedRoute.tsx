// src/components/auth/ProtectedRoute.tsx
"use client";

// protection for dashboard routes. If user is not authenticated, they will be redirected to login page. While checking auth status, a loading state is shown.

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "../../app/hooks/useTypedSelector";
import LoadingOverlay from "../common/AppLoader";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAppSelector((state) => state.loginState);
  const router = useRouter();

  // This state ensures we don't redirect until we've checked local storage
  const [isChecking, setIsChecking] = useState(true);

  // useEffect(() => {
  //   // If the app is finished loading and there is no user token,
  //   // redirect the user to the login page.

  //   if (!isLoading && !user?.token) {
  //     router.push("/screens/auth/LoginScreen");
  //   }
  // }, [user, isLoading, router]);
  useEffect(() => {
    const token = localStorage.getItem("jwtToken"); // Check storage directly

    // Logic:
    // If we have a token in storage BUT Redux is empty,
    // it means we are just reloading (Redux is hydrating).
    // Don't redirect yet! Give it a moment.

    if (!isLoading) {
      if (!user?.token && !token) {
        // Only redirect if there is NO token in Redux AND NO token in storage
        // Definitely logged out
        router.push("/screens/auth/LoginScreen");
      }
      setIsChecking(false);
    }
  }, [user, isLoading, router]);

  // While the authentication state is loading, display a simple loading state.
  // If still loading or still checking storage, show the loader
  if (isLoading || isChecking) {
    return (
      <div className="flex h-screen items-center justify-center">
        <LoadingOverlay visible={isLoading} message="Processing..." />
      </div>
    );
  }

  // If the user is authenticated, render the protected children components.
  return <>{children}</>;
}
