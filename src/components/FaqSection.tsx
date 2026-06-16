"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "Is my money safe?",
      a: "We use institutional-grade encryption for every transaction, backed by multi-layered biometric authentication.",
    },
    {
      q: "Can I use it internationally?",
      a: "Yes, our cards work seamlessly in over 150 countries with real-time mid-market exchange rates.",
    },
    {
      q: "Are there hidden monthly fees?",
      a: "Absolutely not. Vellomiji is built on transparent pricing with zero monthly maintenance or hidden transaction fees.",
    },
  ];

  return (
    <section id="support" className="py-24 px-6 bg-[#6D28D9] text-white">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-black text-center mb-16">
          Common Questions
        </h2>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="border-b border-[#8b5cf6] pb-4">
              <button
                onClick={() => setActiveIndex(activeIndex === i ? null : i)}
                className="w-full flex justify-between items-center text-left py-4 focus:outline-none"
              >
                <span className="text-lg font-bold">{faq.q}</span>
                <span
                  className={`text-2xl transition-transform ${activeIndex === i ? "rotate-45" : ""}`}
                >
                  +
                </span>
              </button>

              <AnimatePresence>
                {activeIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <p className="text-[#e0d7ff] pb-4 leading-relaxed">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
