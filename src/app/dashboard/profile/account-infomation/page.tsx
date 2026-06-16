"use client";

import React from "react";
import { useRouter } from "next/navigation";
import {
  IoArrowBack,
  IoCopyOutline,
  IoShieldCheckmark,
  IoTime,
} from "react-icons/io5";
import { useAppSelector } from "../../../hooks/useTypedSelector";

export default function AccountInformationScreen() {
  const router = useRouter();
  const { data } = useAppSelector((state: any) => state.dashboard);
  const user = data?.user || {};

  const isVerified = user.verificationStatus === "verified";

  return (
    <div className="flex-1 bg-gray-50 min-h-screen pb-10">
      {/* Hero Header */}
      <div className="bg-white px-5 pt-12 pb-8 border-b border-gray-100">
        <button onClick={() => router.back()} className="mb-6">
          <IoArrowBack size={24} className="text-blue-900" />
        </button>
        <div className="flex items-center gap-4">
          <div className="w-[64px] h-[64px] rounded-2xl bg-blue-600 flex items-center justify-center text-white text-[24px] font-bold">
            {user.fullName?.charAt(0).toUpperCase()}
          </div>
          <div>
            <h1 className="text-[20px] font-extrabold text-blue-900 capitalize">
              {user.fullName}
            </h1>
            <p className="text-[14px] text-gray-500">{user.email}</p>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-5 mt-6">
        {/* Verification Status Banner */}
        <div
          className={`flex items-center gap-3 p-4 rounded-[16px] mb-6 border ${isVerified ? "bg-green-50 border-green-100" : "bg-amber-50 border-amber-100"}`}
        >
          {isVerified ? (
            <IoShieldCheckmark size={24} className="text-green-600" />
          ) : (
            <IoTime size={24} className="text-amber-600" />
          )}
          <p
            className={`text-[13px] font-semibold ${isVerified ? "text-green-800" : "text-amber-800"}`}
          >
            Account Status: {user.verificationStatus?.toUpperCase()}
          </p>
        </div>

        {/* Detailed Grid */}
        <div className="space-y-4">
          <InfoCard
            label="Account Number"
            value={user.accountNumber}
            copyable
          />
          <InfoCard
            label="Daily Limit"
            value={`₦${user.dailyLimit?.toLocaleString()}`}
          />
          <InfoCard
            label="Account Status"
            value={user.isFrozen ? "Frozen" : "Active"}
          />
        </div>
      </div>
    </div>
  );
}

function InfoCard({
  label,
  value,
  copyable,
}: {
  label: string;
  value: string;
  copyable?: boolean;
}) {
  return (
    <div className="bg-white p-5 rounded-[20px] border border-gray-100 flex justify-between items-center shadow-sm">
      <div>
        <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
          {label}
        </p>
        <p className="text-[16px] font-bold text-blue-900 mt-0.5">{value}</p>
      </div>
      {copyable && (
        <button
          onClick={() => navigator.clipboard.writeText(value)}
          className="p-2.5 bg-gray-50 hover:bg-blue-50 rounded-xl transition-colors"
        >
          <IoCopyOutline size={18} className="text-blue-600" />
        </button>
      )}
    </div>
  );
}
