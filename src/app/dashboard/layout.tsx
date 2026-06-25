// app/dashboard/layout.tsx
"use client";

import { Sidebar } from "../../components/dashboard/Sidebar/page";
import { Header } from "../../components/dashboard/Header/page";
import { ProtectedRoute } from "../../components/auth/ProtectedRoute";
import { useEffect, useState } from "react";
import { getFullUserProfile } from "../store/auth/action/dashboard/profileAction";
import { useDispatch } from "react-redux";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  // Trigger hydration here so all dashboard pages have access to the data
  useEffect(() => {
    dispatch(getFullUserProfile() as any);
  }, [dispatch]);

  return (
    // This wrapper prevents unauthorized users from accessing any dashboard route
    <ProtectedRoute>
      <div className="flex h-screen bg-slate-50">
        {/* Mobile Full-Screen Drawer */}
        {/* 1. Mobile Drawer (Only visible on mobile when toggled) */}
        <div
          className={`fixed inset-0 z-50 bg-blue-900 md:hidden transition-transform duration-300 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
        >
          <div className="p-4 text-white flex justify-end">
            <button
              onClick={() => setIsOpen(false)}
              className="text-2xl font-bold p-2"
            >
              ✕
            </button>
          </div>
          <Sidebar onClose={() => setIsOpen(false)} />
        </div>

        {/* Your navigation component */}
        {/* Desktop Sidebar */}
        {/* 2. Desktop Sidebar (Hidden on mobile, flex on md and up) */}
        {/* We use the md:flex class here to ensure it ONLY shows on desktop */}
        <div className="hidden md:flex">
          <Sidebar />
        </div>

        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Your top header component */}
          <Header onToggle={() => setIsOpen(true)} />

          {/* This renders the specific dashboard page content (e.g., page.tsx, wallet/page.tsx) */}
          <main className="flex-1 overflow-y-auto p-6">{children}</main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
