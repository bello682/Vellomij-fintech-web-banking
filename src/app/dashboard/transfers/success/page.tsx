// # TransferSuccessScreen
"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { IoCheckmark, IoShareOutline } from "react-icons/io5";
import { colors } from "../../../theme/colors";

const SuccessScreen = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Retrieve values from URL search params
  const amount = searchParams.get("amount") || "0";
  const recipientName = searchParams.get("name") || "Recipient";
  const transactionId = searchParams.get("transactionId") || "TRX-882910";

  return (
    <div className="flex-1 bg-white min-h-screen p-[25px] flex flex-col">
      <div className="flex-1 justify-center items-center flex flex-col">
        {/* Icon */}
        <div className="mb-[30px]">
          <div
            className="w-[100px] h-[100px] rounded-full flex justify-center items-center"
            style={{ backgroundColor: "#27AE60" }}
          >
            <IoCheckmark size={60} color="#FFFFFF" />
          </div>
        </div>

        <h1 className="text-[24px] font-extrabold text-blue-900 mb-[10px]">
          Transfer Successful!
        </h1>
        <p className="text-[15px] text-gray-500 text-center leading-[22px] px-[20px]">
          Your transfer of ₦{Number(amount).toLocaleString()} to {recipientName}{" "}
          has been processed.
        </p>

        {/* Receipt Brief */}
        <div className="w-full bg-gray-50 rounded-[20px] p-[20px] mt-[40px]">
          <div className="flex justify-between mb-[12px]">
            <p className="text-[13px] text-gray-500">Transaction ID</p>
            <p className="text-[13px] font-bold text-blue-900">
              {transactionId}
            </p>
          </div>
          <div className="flex justify-between mb-[12px]">
            <p className="text-[13px] text-gray-500">Status</p>
            <p className="text-[13px] font-bold" style={{ color: "#27AE60" }}>
              Completed
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="w-full pb-[20px]">
        <button
          className="w-full h-[55px] rounded-[16px] flex justify-center items-center mb-[15px]"
          style={{ backgroundColor: colors.primary }}
          onClick={() => router.push("/dashboard")}
        >
          <span className="text-white text-[16px] font-bold">Back to Home</span>
        </button>

        <button
          className="flex flex-row justify-center items-center w-full h-[55px]"
          onClick={() => {
            // Replace the path below with your actual path to the Transaction Detail/Receipt screen
            router.push(
              `/dashboard/transfers/transferServices/transactionDetails?id=${transactionId}`,
            );
          }}
        >
          <IoShareOutline size={20} color={colors.primary} />
          <span
            className="text-[16px] font-bold ml-[10px]"
            style={{ color: colors.primary }}
          >
            Share Receipt
          </span>
        </button>
      </div>
    </div>
  );
};

export default SuccessScreen;
