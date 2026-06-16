// components/dashboard/Sidebar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  IoHomeOutline,
  IoWalletOutline,
  IoCardOutline,
  IoSettingsOutline,
  IoHelpCircleOutline,
} from "react-icons/io5";

const navItems = [
  { name: "Dashboard", path: "/dashboard", icon: <IoHomeOutline /> },
  { name: "Wallet", path: "/dashboard/wallet", icon: <IoWalletOutline /> },
  { name: "Transfers", path: "/dashboard/transfers", icon: <IoCardOutline /> },
  {
    name: "Settings",
    path: "/dashboard/settings",
    icon: <IoSettingsOutline />,
  },
  {
    name: "Support",
    path: "/dashboard/support",
    icon: <IoHelpCircleOutline />,
  },
];

export const Sidebar = ({ onClose }: { onClose?: () => void }) => {
  const pathname = usePathname();

  return (
    <aside className="w-full md:w-64 bg-blue-900 text-white flex flex-col h-screen">
      <div className="p-6 font-bold text-2xl tracking-tight">FintechPro</div>

      <nav className="flex-1 px-4 py-6 space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.path;
          return (
            <Link
              key={item.name}
              href={item.path}
              onClick={onClose}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                isActive
                  ? "bg-white text-blue-900 font-bold"
                  : "text-blue-100 hover:bg-blue-800"
              }`}
            >
              {item.icon}
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="p-6 text-xs text-blue-300">© 2026 FintechPro Bank</div>
    </aside>
  );
};
