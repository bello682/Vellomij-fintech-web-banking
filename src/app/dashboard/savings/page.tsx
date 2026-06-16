// # SavingsScreen
"use client";

import React from "react";
import {
  IoAdd,
  IoTrendingUp,
  IoShieldCheckmark,
  IoAirplane,
  IoCar,
} from "react-icons/io5";

import KYCGuard from "../../../../src/components/kyc/KYCGuard";
import { colors } from "../../theme/colors"; // Assuming path remains same

const SavingsScreen = () => {
  return (
    <KYCGuard>
      <div className="flex-1 bg-white min-h-screen p-5">
        {/* Header */}
        <div className="flex justify-between items-center mb-[25px]">
          <div>
            <h1 className="text-[28px] font-extrabold text-blue-900">
              Savings
            </h1>
            <p className="text-[14px] text-gray-500 mt-1">
              You're doing great this month!
            </p>
          </div>
          <button className="bg-blue-600 w-[45px] h-[45px] rounded-[15px] flex items-center justify-center">
            <IoAdd size={24} color="white" />
          </button>
        </div>

        {/* Total Savings Card */}
        <div className="bg-blue-900 p-[25px] rounded-[24px] mb-[30px] shadow-xl">
          <p className="text-white opacity-70 text-[14px] font-semibold">
            Total Balance
          </p>
          <p className="text-white text-[32px] font-bold my-2">$0.00</p>
          <div className="flex mt-[10px]">
            <div className="flex items-center mr-5">
              <IoTrendingUp size={16} color="#4ADE80" />
              <span className="text-[#4ADE80] text-[12px] font-bold ml-1.5">
                + 4.5% Int.
              </span>
            </div>
            <div className="flex items-center">
              <IoShieldCheckmark size={16} color="#4ADE80" />
              <span className="text-[#4ADE80] text-[12px] font-bold ml-1.5">
                Insured
              </span>
            </div>
          </div>
        </div>

        {/* Active Goals Section */}
        <h2 className="text-[18px] font-bold text-blue-900 mb-[15px]">
          Active Goals
        </h2>

        {/* Goal Item 1 */}
        <button className="w-full bg-gray-50 p-4 rounded-[20px] mb-[15px] border border-gray-200">
          <div className="flex items-center mb-[15px]">
            <div className="w-[48px] h-[48px] rounded-[14px] bg-[#FFE2E2] flex items-center justify-center">
              <IoAirplane size={22} color="#FF5A5A" />
            </div>
            <div className="flex-1 ml-3 text-left">
              <p className="text-[16px] font-bold text-blue-900">
                Summer Vacation
              </p>
              <p className="text-[12px] text-gray-500 mt-0.5">Target: $5,000</p>
            </div>
            <p className="text-[14px] font-bold text-blue-900">75%</p>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#FF5A5A] rounded-full"
              style={{ width: "75%" }}
            />
          </div>
        </button>

        {/* Goal Item 2 */}
        <button className="w-full bg-gray-50 p-4 rounded-[20px] mb-[15px] border border-gray-200">
          <div className="flex items-center mb-[15px]">
            <div className="w-[48px] h-[48px] rounded-[14px] bg-[#E2F3FF] flex items-center justify-center">
              <IoCar size={22} color={colors.primary} />
            </div>
            <div className="flex-1 ml-3 text-left">
              <p className="text-[16px] font-bold text-blue-900">
                Tesla Model 3
              </p>
              <p className="text-[12px] text-gray-500 mt-0.5">
                Target: $45,000
              </p>
            </div>
            <p className="text-[14px] font-bold text-blue-900">12%</p>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-600 rounded-full"
              style={{ width: "12%" }}
            />
          </div>
        </button>
      </div>
    </KYCGuard>
  );
};

export default SavingsScreen;
