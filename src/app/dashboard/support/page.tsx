"use client";

import React from "react";
import { useRouter } from "next/navigation";
import {
  IoChatbubbleEllipsesOutline,
  IoHelpCircleOutline,
  IoChevronForward,
} from "react-icons/io5";

const SupportHub = () => {
  const router = useRouter();

  const menuItems = [
    {
      title: "Chat Support",
      description: "Send us a message and get help from our team.",
      icon: <IoChatbubbleEllipsesOutline size={28} className="text-blue-600" />,
      path: "/dashboard/support/chat",
    },
    {
      title: "Help Center",
      description: "View your ticket history and previous updates.",
      icon: <IoHelpCircleOutline size={28} className="text-blue-600" />,
      path: "/dashboard/support/help",
    },
  ];

  return (
    <div className="flex-1 bg-white min-h-screen p-5">
      <h1 className="text-[24px] font-extrabold text-blue-900 mb-8">
        Support Center
      </h1>

      <div className="flex flex-col gap-4">
        {menuItems.map((item, index) => (
          <button
            key={index}
            onClick={() => router.push(item.path)}
            className="flex items-center p-6 bg-white border border-gray-100 rounded-[20px] shadow-sm hover:border-blue-200 transition-all text-left"
          >
            <div className="w-[60px] h-[60px] rounded-[20px] bg-blue-50 flex items-center justify-center mr-5">
              {item.icon}
            </div>
            <div className="flex-1">
              <h2 className="text-[17px] font-bold text-blue-900">
                {item.title}
              </h2>
              <p className="text-[14px] text-gray-500 mt-0.5">
                {item.description}
              </p>
            </div>
            <IoChevronForward size={20} className="text-gray-400" />
          </button>
        ))}
      </div>

      <div className="mt-10 p-6 bg-gray-50 rounded-[20px] border border-gray-100">
        <h3 className="text-[14px] font-bold text-blue-900 mb-2">
          Need urgent help?
        </h3>
        <p className="text-[13px] text-gray-500">
          Our support team is available 24/7. Average response time is under 15
          minutes.
        </p>
      </div>
    </div>
  );
};

export default SupportHub;
