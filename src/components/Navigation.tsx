"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check auth status here
    const token =
      typeof window !== "undefined" ? localStorage.getItem("jwtToken") : null;
    setIsLoggedIn(!!token);
  }, []);

  const menuItems = [
    { label: "About", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Support", href: "#support" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 px-6 py-6 bg-white/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link
          href="/"
          className="text-xl font-medium tracking-[0.2em] uppercase text-[#6D28D9]"
        >
          Vellomij.
        </Link>

        <div className="hidden md:flex items-center gap-12">
          {menuItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-[11px] font-medium tracking-[0.2em] uppercase text-[#6D28D9]"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/screens/auth/LoginScreen"
            className="text-[11px] font-bold tracking-[0.2em] uppercase bg-[#6D28D9] text-white px-6 py-2 rounded-full"
          >
            Login
          </Link>
        </div>

        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
    </nav>
  );
}
