import React from "react";
import { IoChevronForward } from "react-icons/io5";

interface MenuItemProps {
  icon: React.ReactNode;
  label: string;
  onPress?: () => void;
  iconBgColor?: string; // Optional: allow custom background color for icons
}

export const MenuItem = ({
  icon,
  label,
  onPress,
  iconBgColor = "bg-gray-100",
}: MenuItemProps) => {
  return (
    <button
      onClick={onPress}
      className="flex items-center w-full py-[15px] border-b border-gray-200"
    >
      <div
        className={`w-[40px] h-[40px] rounded-[12px] ${iconBgColor} flex items-center justify-center mr-[15px]`}
      >
        <div className="text-blue-900">{icon}</div>
      </div>
      <span className="flex-1 text-[16px] font-medium text-blue-900 text-left">
        {label}
      </span>
      <IoChevronForward size={20} className="text-gray-400" />
    </button>
  );
};
