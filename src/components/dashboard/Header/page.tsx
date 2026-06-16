// components/dashboard/Header.tsx
"use client";

import { IoNotificationsOutline, IoMenuOutline } from "react-icons/io5";
import { usePathname } from "next/navigation";
import { useAppSelector } from "@/app/hooks/useTypedSelector";
import { useRouter } from "next/navigation";

export const Header = ({ onToggle }: { onToggle: () => void }) => {
  const pathname = usePathname();
  const { user } = useAppSelector((state) => state.loginState);
  const router = useRouter();

  // A helper to format the route name for the header title
  const title = pathname.split("/").pop()?.toUpperCase() || "DASHBOARD";
  const userInitials = user?.user?.fullName
    ? user.user.fullName
        .split(" ")
        .map((n: string) => n[0]) // Added ": string" here
        .join("")
        .toUpperCase()
    : "U"; // Default to "U" if no name exists

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 sticky top-0 z-10">
      {/* Mobile Menu Icon */}
      <button onClick={onToggle} className="md:hidden p-2 text-blue-900">
        <IoMenuOutline size={28} />
      </button>

      <h2 className="text-lg font-bold text-blue-900 capitalize">{title}</h2>

      <div className="flex items-center gap-4">
        <button
          className="p-2 hover:bg-gray-100 rounded-full transition-colors relative"
          onClick={() => router.push("/dashboard/notifications")}
        >
          <IoNotificationsOutline size={22} className="text-blue-900" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white" />
        </button>
        <button
          className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center font-bold text-blue-900 text-xs cursor-pointer"
          onClick={() => {
            router.push("/dashboard/profile");
          }}
        >
          {userInitials}
        </button>
      </div>
    </header>
  );
};
