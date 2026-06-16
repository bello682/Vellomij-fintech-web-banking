// # TransferConfirmScreen
"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../../hooks/useTypedSelector";
import { sendMoney } from "../../../store/auth/action/dashboard/transferAction";
import { AppDispatch } from "../../../store/auth/store";
import { colors } from "../../../theme/colors";
import { IoArrowBack, IoBackspaceOutline } from "react-icons/io5";

const ConfirmTransferScreen = () => {
  const searchParams = useSearchParams(); //
  const amount = searchParams.get("amount") || "0";
  const accountNumber = searchParams.get("accountNumber") || "";
  const recipientName = searchParams.get("recipientName") || "";
  const bank = searchParams.get("bank") || "";
  const description = searchParams.get("description") || "";

  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const { loading_send } = useAppSelector((state) => state.transferState);
  const [pin, setPin] = useState("");

  const handleKeyPress = (val: string) => {
    if (pin.length < 4) setPin((prev) => prev + val);
  };

  const handleBackspace = () => {
    setPin((prev) => prev.slice(0, -1));
  };

  const handleConfirm = async () => {
    if (pin.length !== 4) return;

    const result = await (dispatch(
      sendMoney({
        accountNumber,
        amount: parseFloat(amount),
        pin,
        recipientName,
        description,
      }),
    ) as any);

    console.log(amount);

    if (result && result.success) {
      router.push(
        `/dashboard/transfers/success?amount=${amount}&name=${recipientName}&transactionId=${result.transactionId}`,
      );
    } else {
      setPin("");
      const errorMessage = result?.message || "Transaction failed";
      const errorLower = errorMessage.toLowerCase();

      if (
        errorLower.includes("pin not set") ||
        errorLower.includes("no pin") ||
        errorLower.includes("set a transaction pin")
      ) {
        if (
          window.confirm(`${errorMessage}. Would you like to set your PIN now?`)
        ) {
          router.push("/dashboard/settings/security");
        }
      } else {
        window.alert(`Transaction Failed: ${errorMessage}`);
      }
    }
  };

  return (
    <div className="flex-1 bg-white min-h-screen">
      <div className="flex justify-between items-center p-5">
        <button onClick={() => router.back()}>
          <IoArrowBack size={24} color={colors.darkBlue} />
        </button>
        <h1 className="text-[18px] font-bold text-blue-900">
          Confirm Transfer
        </h1>
        <div className="w-[24px]" />
      </div>

      <div className="m-5 p-5 bg-gray-50 rounded-[20px] flex flex-col items-center border border-gray-100">
        <p className="text-[13px] text-gray-500">You are sending</p>
        <p className="text-[28px] font-extrabold text-blue-900 mt-1">
          ₦{Number(amount).toLocaleString()}
        </p>

        <div className="w-full h-[1px] bg-gray-200 my-5" />

        <div className="flex justify-between w-full mb-3">
          <p className="text-[13px] text-gray-500">Recipient</p>
          <p className="text-[14px] font-bold text-blue-900">{recipientName}</p>
        </div>
        <div className="flex justify-between w-full mb-3">
          <p className="text-[13px] text-gray-500">Bank</p>
          <p className="text-[14px] font-bold text-blue-900">{bank}</p>
        </div>
        <div className="flex justify-between w-full mb-3">
          <p className="text-[13px] text-gray-500">Account</p>
          <p className="text-[14px] font-bold text-blue-900">{accountNumber}</p>
        </div>
        <div className="flex justify-between w-full">
          <p className="text-[13px] text-gray-500">Description</p>
          <p className="text-[14px] font-bold text-blue-900 truncate max-w-[60%]">
            {description || "No description"}
          </p>
        </div>
      </div>

      <div className="flex-1 px-8 flex flex-col items-center">
        <p className="text-[15px] font-semibold text-gray-500 mb-5">
          Enter your 4-digit PIN
        </p>
        <div className="flex flex-row mb-10">
          {[1, 2, 3, 4].map((_, i) => (
            <div
              key={i}
              className={`w-[15px] h-[15px] rounded-full border-2 mx-2.5 ${pin.length > i ? "bg-blue-600 border-blue-600" : "border-gray-200"}`}
            />
          ))}
        </div>

        <div className="flex flex-wrap justify-center w-full max-w-[300px]">
          {["1", "2", "3", "4", "5", "6", "7", "8", "9", "", "0", "back"].map(
            (key, i) => (
              <button
                // key={i}
                key={`numpad-${key}`}
                className="w-[33%] h-[60px] flex items-center justify-center"
                onClick={() =>
                  key === "back"
                    ? handleBackspace()
                    : key !== "" && handleKeyPress(key)
                }
              >
                {key === "back" ? (
                  <IoBackspaceOutline size={28} color={colors.darkBlue} />
                ) : (
                  <span className="text-[24px] font-bold text-blue-900">
                    {key}
                  </span>
                )}
              </button>
            ),
          )}
        </div>

        <button
          className={`w-full h-[55px] rounded-[16px] flex items-center justify-center mt-5 ${pin.length < 4 || loading_send ? "bg-gray-200" : "bg-blue-600"}`}
          onClick={handleConfirm}
          disabled={pin.length < 4 || loading_send}
        >
          {loading_send ? (
            <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
          ) : (
            <span className="text-white font-bold text-[16px]">
              Confirm & Send
            </span>
          )}
        </button>
      </div>
    </div>
  );
};

export default ConfirmTransferScreen;
