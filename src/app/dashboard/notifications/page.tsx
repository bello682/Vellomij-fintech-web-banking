// # NotificationsScreen
"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { IoArrowBack, IoNotificationsOffOutline } from "react-icons/io5";
import { useAppSelector } from "../../hooks/useTypedSelector";

const NotificationsScreen = () => {
  const router = useRouter();
  const { data } = useAppSelector((state) => state.dashboard);
  const notifications = data?.notifications || [];

  return (
    <div className="flex flex-1 flex-col bg-white min-h-screen">
      {/* Header */}
      <div className="flex flex-row justify-between p-5 items-center">
        <button onClick={() => router.back()}>
          <IoArrowBack size={24} className="text-blue-900" />
        </button>
        <h1 className="text-[18px] font-extrabold text-blue-900">
          Notifications
        </h1>
        <div style={{ width: 24 }} />
      </div>

      {notifications.length > 0 ? (
        <div className="flex flex-col">
          {notifications.map((item: any, index: number) => (
            <div key={index} className="p-5 border-b border-gray-200">
              <p className="text-[14px] text-blue-900">
                {item.message || "New Update"}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-1 justify-center items-center">
          <IoNotificationsOffOutline size={64} className="text-gray-200" />
          <p className="mt-2.5 text-gray-500 text-[16px]">
            No notifications yet
          </p>
        </div>
      )}
    </div>
  );
};

export default NotificationsScreen;
