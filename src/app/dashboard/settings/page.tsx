// # SettingsScreen
"use client";

import React from "react";
import { useRouter } from "next/navigation";
import {
  IoChevronForward,
  IoMoonOutline,
  IoNotificationsOutline,
  IoLanguageOutline,
  IoDocumentTextOutline,
  IoShieldCheckmarkOutline,
  IoInformationCircleOutline,
} from "react-icons/io5";

export default function SettingsScreen() {
  const router = useRouter();

  return (
    <div className="flex-1 bg-white p-5 min-h-screen">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-[24px] font-extrabold text-blue-900 mb-8">
          Settings
        </h1>

        {/* Preferences Section */}
        <div className="mb-8">
          <h3 className="text-[12px] font-bold text-gray-400 uppercase tracking-wider mb-2">
            Preferences
          </h3>
          <MenuItem icon={<IoMoonOutline />} label="Dark Mode" />
          <MenuItem
            icon={<IoNotificationsOutline />}
            label="Notification Settings"
          />
          <MenuItem icon={<IoLanguageOutline />} label="App Language" />
        </div>

        {/* Legal & System Section */}
        <div>
          <h3 className="text-[12px] font-bold text-gray-400 uppercase tracking-wider mb-2">
            Legal & About
          </h3>
          <MenuItem icon={<IoDocumentTextOutline />} label="Terms of Service" />
          <MenuItem
            icon={<IoShieldCheckmarkOutline />}
            label="Privacy Policy"
          />
          <MenuItem
            icon={<IoInformationCircleOutline />}
            label="About Version 1.0.0"
          />
        </div>
      </div>
    </div>
  );
}

// Reusing your MenuItem component structure for perfect consistency
function MenuItem({
  icon,
  label,
  onPress,
}: {
  icon: React.ReactNode;
  label: string;
  onPress?: () => void;
}) {
  return (
    <button
      onClick={onPress}
      className="flex items-center w-full py-[18px] border-b border-gray-100 hover:bg-gray-50 transition-colors"
    >
      <div className="w-[40px] h-[40px] rounded-[12px] bg-blue-50 flex items-center justify-center mr-[15px]">
        <div className="text-blue-900">{icon}</div>
      </div>
      <span className="flex-1 text-[16px] font-medium text-blue-900 text-left">
        {label}
      </span>
      <IoChevronForward size={20} className="text-gray-400" />
    </button>
  );
}
