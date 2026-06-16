"use client";

import React from "react";
import { useRouter } from "next/navigation";
import {
  IoArrowBack,
  IoPhonePortraitOutline,
  IoWifiOutline,
  IoBulbOutline,
  IoTvOutline,
  IoChevronForward,
} from "react-icons/io5";

// Store the Component reference, NOT the rendered element
const serviceCategories = [
  {
    title: "Communication",
    items: [
      {
        label: "Buy Airtime",
        icon: IoPhonePortraitOutline,
        path: "/dashboard/payments/airtime",
      },
      {
        label: "Buy Data",
        icon: IoWifiOutline,
        path: "/dashboard/payments/data",
      },
    ],
  },
  {
    title: "Utilities",
    items: [
      {
        label: "Electricity Bills",
        icon: IoBulbOutline,
        path: "/dashboard/payments/bills",
      },
      { label: "Cable TV", icon: IoTvOutline, path: "/dashboard/payments/tv" },
    ],
  },
];

export default function PaymentsHub() {
  const router = useRouter();

  return (
    <div className="flex-1 bg-gray-50 min-h-screen pb-10">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white px-5 pt-12 pb-6 border-b border-gray-100 mb-6">
          <button onClick={() => router.back()} className="mb-4">
            <IoArrowBack size={24} className="text-blue-900" />
          </button>
          <h1 className="text-[24px] font-extrabold text-blue-900">Payments</h1>
        </div>

        <div className="px-5 space-y-8">
          {serviceCategories.map((category, idx) => (
            <div key={idx}>
              <h2 className="text-[12px] font-bold text-gray-400 uppercase tracking-widest mb-3 ml-1">
                {category.title}
              </h2>
              <div className="bg-white rounded-[24px] border border-gray-100 shadow-sm overflow-hidden">
                {category.items.map((item, i) => {
                  const Icon = item.icon; // Use the reference here
                  return (
                    <button
                      key={i}
                      onClick={() => router.push(item.path)}
                      className="w-full flex items-center p-5 border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors"
                    >
                      <div className="w-[48px] h-[48px] rounded-full bg-blue-50 flex items-center justify-center text-blue-600 mr-4">
                        <Icon size={24} /> {/* Now TypeScript is happy */}
                      </div>
                      <div className="flex-1 text-left">
                        <p className="text-[16px] font-bold text-blue-900">
                          {item.label}
                        </p>
                      </div>
                      <IoChevronForward size={20} className="text-gray-300" />
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
