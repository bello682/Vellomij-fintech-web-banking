// # ProfileScreen
"use client";
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import {
  IoChevronForward,
  IoHelpCircleOutline,
  IoKeypadOutline,
  IoLogOutOutline,
  IoNotificationsOutline,
  IoPersonOutline,
  IoShieldCheckmarkOutline,
  IoTrashOutline,
} from "react-icons/io5";

// Import your hooks and types
import { useAppSelector } from "../../hooks/useTypedSelector";
import { AppDispatch } from "../../store/auth/store";
import { logoutUser } from "../../store/auth/action/logoutAction";
import LogoutModal from "@/components/common/LogoutModal";

export default function ProfileScreen() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const loginUser = useAppSelector((state) => state.loginState);
  const dashboardUser = useAppSelector((state) => state.dashboard);
  const { loading_now } = useAppSelector((state) => state.logout);

  const user =
    dashboardUser.data?.user || loginUser.user?.user || loginUser.user;
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleLogoutPress = () => setIsModalVisible(true);

  const confirmLogout = async () => {
    try {
      await dispatch(logoutUser());
    } catch (error) {
      setIsModalVisible(false);
    } finally {
      setIsModalVisible(false);
    }
  };

  const hasPin = !!user?.transactionPin;

  return (
    <div className="flex-1 bg-white p-5 min-h-screen">
      <div className="max-w-2xl mx-auto">
        {/* Profile Header */}
        <div className="flex flex-col items-center my-[30px]">
          <div className="w-[100px] h-[100px] rounded-full bg-gray-100 border-4 border-gray-200 flex items-center justify-center">
            <span className="text-[40px] font-bold text-blue-900">
              {user?.fullName ? user.fullName.charAt(0).toUpperCase() : "U"}
            </span>
          </div>

          <h2 className="text-[22px] font-bold text-blue-900 mt-[15px] capitalize">
            {user?.fullName || "Loading..."}
          </h2>
          <p className="text-[14px] text-gray-500 mt-[5px]">
            {user?.email || "..."}
          </p>

          <button className="mt-[15px] px-[20px] py-[8px] rounded-[20px] bg-blue-50 text-blue-600 font-semibold">
            Edit Profile
          </button>
        </div>

        {/* Menu Items */}
        <div className="mt-[20px]">
          <MenuItem
            icon={<IoPersonOutline />}
            label="Account Information"
            onPress={() => {
              router.push("/dashboard/profile/account-infomation");
            }}
          />
          <MenuItem
            icon={<IoKeypadOutline />}
            label={hasPin ? "Change Transaction PIN" : "Set Transaction PIN"}
            onPress={() => router.push("/dashboard/settings/security")}
          />
          <MenuItem
            icon={<IoShieldCheckmarkOutline />}
            label="Security & Biometrics"
          />
          <MenuItem
            icon={<IoNotificationsOutline />}
            label="Notifications"
            onPress={() => router.push("/dashboard/notifications")}
          />
          <MenuItem
            icon={<IoHelpCircleOutline />}
            label="Help & Support"
            onPress={() => router.push("/dashboard/support")}
          />

          <button
            onClick={() => router.push("/dashboard/settings/delete")}
            className="flex items-center w-full py-[15px]"
          >
            <div className="w-[40px] h-[40px] rounded-[12px] bg-[#FFF5F5] flex items-center justify-center mr-[15px]">
              <IoTrashOutline size={22} className="text-red-500" />
            </div>
            <span className="flex-1 text-[16px] font-medium text-red-500 text-left">
              Delete Account
            </span>
            <IoChevronForward size={20} className="text-gray-400" />
          </button>
        </div>

        <button
          onClick={handleLogoutPress}
          className="flex items-center justify-center mt-[40px] p-[15px] rounded-[16px] bg-red-50 w-full"
        >
          <IoLogOutOutline size={22} className="text-red-500" />
          <span className="text-red-500 text-[16px] font-bold ml-[10px]">
            Log Out
          </span>
        </button>

        <p className="text-center text-gray-500 mt-[30px] text-[12px]">
          Version 1.0.0 (Production)
        </p>
      </div>

      <LogoutModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onConfirm={confirmLogout}
        isLoading={loading_now}
      />
    </div>
  );
}

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
      className="flex items-center w-full py-[15px] border-b border-gray-200"
    >
      <div className="w-[40px] h-[40px] rounded-[12px] bg-gray-100 flex items-center justify-center mr-[15px]">
        <div className="text-blue-900">{icon}</div>
      </div>
      <span className="flex-1 text-[16px] font-medium text-blue-900 text-left">
        {label}
      </span>
      <IoChevronForward size={20} className="text-gray-400" />
    </button>
  );
}
