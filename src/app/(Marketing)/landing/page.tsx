"use client";

import React from "react";
import { motion } from "framer-motion";
import { Navigation } from "../../../components/Navigation";
import { Typewriter } from "../../../components/Typewriter";
import { useRouter } from "next/navigation";
import FAQ from "../../../components/FaqSection";
import {
  Landmark,
  LockIcon,
  ShieldCheck,
  ShieldCheckIcon,
  Zap,
} from "lucide-react";

export default function LandingPage() {
  const router = useRouter();

  return (
    <div className="bg-white min-h-screen text-[#6D28D9]">
      <Navigation />

      {/* Hero Section (Merged with Welcome Logic) */}
      <section className="h-screen flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h2 className="text-[#6D28D9] font-bold tracking-[0.25em] uppercase mb-4">
            Vellomij Bank
          </h2>
          {/* <h1 className="text-6xl md:text-8xl font-black mb-6 text-slate-900"> */}
          <h1 className="text-6xl md:text-8xl font-black mb-6 text-[#6D28D9]">
            Banking, <br />
            <Typewriter
              words={[
                "Redefined.",
                "Simplified.",
                "Secured.",
                "Global.",
                "Automated.",
                "Intelligent.",
                "Future-proof.",
                "Seamless.",
                "Fast.",
                "Transparent.",
                "Empowered.",
                "Yours.",
                "Lightning-fast.",
                "Smart.",
                "Reliable.",
                "Limitless.",
              ]}
            />
          </h1>
          <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
            Welcome to the future of banking. Manage your finances, save for
            goals, and invest in your future all in one place.
          </p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => router.push("/screens/auth/SignUpScreen")}
              className="bg-[#6D28D9] text-white px-10 py-4 rounded-full font-bold hover:scale-105 transition-transform"
            >
              Get Started
            </button>
            <button
              onClick={() => router.push("/screens/auth/LoginScreen")}
              className="border-2 border-[#6D28D9] text-[#6D28D9] px-10 py-4 rounded-full font-bold hover:bg-[#6D28D9] hover:text-white transition-all"
            >
              Sign In
            </button>
          </div>
        </motion.div>
      </section>

      {/* Services Section (Expanded with Onboarding Features) */}
      <section className="py-24 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-slate-900">
            Our Core Features
          </h2>
          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                title: "Smart Saving",
                desc: "Automated goals and high-yield interest.",
                icon: <Landmark />,
              },
              {
                title: "Fast Transfers",
                desc: "Send money instantly, anywhere in the world.",
                icon: <Zap />,
              },
              {
                title: "Secure Banking",
                desc: "Bank-grade security with multi-factor auth.",
                icon: <ShieldCheck />,
              },
            ].map((service, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -10 }}
                className="bg-white p-8 rounded-3xl shadow-sm border border-purple-100"
              >
                <div className="w-12 h-12 bg-[#6D28D9]/10 rounded-xl flex items-center justify-center mb-6 text-[#6D28D9]">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-semibold mb-4 text-slate-900">
                  {service.title}
                </h3>
                <p className="text-slate-500">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 px-6 bg-white">
        <div className="max-w-3xl mx-auto flex flex-col items-center text-center">
          {/* Centered Header */}
          <div className="flex flex-col items-center gap-4 mb-8">
            <div className="w-12 h-[2px] bg-[#6D28D9]" />
            <span className="text-[#6D28D9] text-xs font-bold tracking-[0.25em] uppercase">
              Who We Are
            </span>
          </div>

          <h2 className="text-4xl md:text-6xl font-black text-slate-900 leading-[1.1] mb-8">
            Banking built for the{" "}
            <span className="text-[#6D28D9]">modern era.</span>
          </h2>

          <p className="text-lg md:text-xl text-slate-500 leading-relaxed mb-16">
            Vellomij is more than just a bank — it's a financial ecosystem
            designed for speed, security, and clarity. We've stripped away the
            complexity of traditional banking to deliver a frictionless
            experience.
          </p>

          {/* Perfectly Centered Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full mb-16">
            {[
              { label: "Security", value: "24/7" },
              { label: "Hidden Fees", value: "0%" },
              { label: "Transfers", value: "<2s" },
              { label: "Customers", value: "2M+" },
            ].map((item) => (
              <div
                key={item.label}
                className="flex flex-col items-center justify-center p-4"
              >
                <p className="text-3xl md:text-4xl font-black text-[#6D28D9] mb-2">
                  {item.value}
                </p>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">
                  {item.label}
                </p>
              </div>
            ))}
          </div>

          {/* Centered Footer Actions */}
          <div className="flex items-center gap-6">
            <button className="bg-[#6D28D9] text-white rounded-full px-8 py-4 text-sm font-bold hover:opacity-90 transition-all">
              Learn more →
            </button>
            <a
              href="#"
              className="text-sm font-bold text-[#6D28D9] border-b-2 border-transparent hover:border-[#6D28D9] transition-all"
            >
              View our story ↗
            </a>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQ />

      {/* Contact Section */}
      <section id="contact" className="py-24 px-6 bg-slate-50">
        <div className="max-w-xl mx-auto text-center">
          <div className="inline-block p-3 rounded-2xl bg-[#6D28D9]/5 mb-6">
            <span className="text-[#6D28D9] text-2xl">✉️</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">
            Let's get in touch.
          </h2>

          <p className="text-lg text-slate-600 mb-10 leading-relaxed">
            Have a specific question or need technical support? Our team is
            available 24/7 to assist you.
          </p>

          <a
            href="mailto:support@vellomij.com"
            className="inline-flex items-center gap-2 bg-[#6D28D9] text-white px-8 py-4 rounded-full font-bold hover:bg-[#5b21b6] transition-all shadow-lg shadow-[#6D28D9]/20"
          >
            Email Support
            <span className="text-lg">→</span>
          </a>
        </div>
      </section>

      {/* Add About, FAQ, Contact sections here... */}

      <footer className="bg-white border-t border-slate-100 py-24">
        <div className="max-w-5xl mx-auto px-6">
          {/* Main Grid: Wide spacing between columns */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-16 mb-24">
            {/* Brand - Pushed to left */}
            <div className="col-span-2 md:col-span-1">
              <h3 className="text-xl font-black text-slate-900 mb-6">
                Vellomij
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed max-w-[220px] mb-8">
                Banking built for the modern era. Secure, fast, and transparent.
              </p>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="text-xs font-bold text-slate-400 hover:text-[#6D28D9]"
                >
                  Twitter
                </a>
                <a
                  href="#"
                  className="text-xs font-bold text-slate-400 hover:text-[#6D28D9]"
                >
                  LinkedIn
                </a>
              </div>
            </div>

            {/* Navigation Columns */}
            {[
              {
                title: "Product",
                links: ["Personal", "Business", "Savings", "Cards", "API"],
              },
              {
                title: "Company",
                links: ["About", "Careers", "Press", "Blog", "Contact"],
              },
              {
                title: "Legal",
                links: ["Privacy", "Terms", "Cookies", "Security", "Access"],
              },
            ].map((section) => (
              <div key={section.title} className="flex flex-col gap-6">
                <p className="text-[10px] font-black text-slate-900 uppercase tracking-[0.2em]">
                  {section.title}
                </p>
                <ul className="flex flex-col gap-4">
                  {section.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-sm font-medium text-slate-500 hover:text-[#6D28D9] transition-colors"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom Bar: Clean and Minimal */}
          <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-slate-100 gap-6">
            <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">
              © 2026 Vellomij. All rights reserved.
            </p>
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-black text-[#6D28D9] bg-[#6D28D9]/5 px-3 py-1 rounded-full uppercase tracking-wider">
                FCA Regulated
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
