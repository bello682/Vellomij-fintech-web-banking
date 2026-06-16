// # SecurityScreen (where SetPin lives)
"use client";

import React, { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { IoChevronBack, IoLockClosed } from "react-icons/io5";

// Import your store actions and theme
import { setTransactionPin } from "../../../store/auth/action/dashboard/walletAction";
import { colors } from "../../../theme/colors";

const SetPinScreen = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [pin, setPin] = useState("");
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleComplete = async (value: string) => {
    if (value.length === 4) {
      setLoading(true);
      const res: any = await dispatch(setTransactionPin(value) as any);
      setLoading(false);

      if (res.success) {
        alert(res.message);
        router.back();
      } else {
        setPin("");
        alert(res.message);
      }
    }
  };

  const renderBoxes = () => {
    return (
      <div
        className="flex flex-row justify-between w-full max-w-[300px] px-5 cursor-pointer"
        onClick={() => inputRef.current?.focus()}
      >
        {[0, 1, 2, 3].map((index) => (
          <div
            key={index}
            className={`w-[60px] h-[65px] rounded-[12px] border flex items-center justify-center bg-gray-50 
              ${pin.length === index ? "border-blue-600 border-2" : "border-gray-200"}
              ${pin.length > index ? "border-blue-900" : ""}`}
          >
            <span className="text-[24px] font-bold text-blue-900">
              {pin[index] ? "●" : ""}
            </span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header */}
      <div className="p-5">
        <button
          onClick={() => router.back()}
          className="w-[45px] h-[45px] flex items-center justify-center"
        >
          <IoChevronBack size={28} className="text-blue-900" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center px-8 pt-5">
        <div className="w-[80px] h-[80px] rounded-full bg-gray-100 flex items-center justify-center mb-5">
          <IoLockClosed size={32} className="text-blue-600" />
        </div>

        <h1 className="text-[24px] font-extrabold text-blue-900 mb-2">
          Set Transaction PIN
        </h1>
        <p className="text-[15px] text-gray-500 text-center leading-[22px] mb-10 max-w-[280px]">
          Create a 4-digit PIN to authorize your transfers and bill payments.
        </p>

        {renderBoxes()}

        {/* Hidden Actual Input */}
        <input
          ref={inputRef}
          type="number"
          className="opacity-0 absolute"
          value={pin}
          onChange={(e) => {
            const val = e.target.value;
            if (val.length <= 4) {
              setPin(val);
              if (val.length === 4) handleComplete(val);
            }
          }}
          autoFocus={true}
        />

        {loading && (
          <div className="mt-10 flex flex-col items-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
            <p className="mt-2 text-gray-500 text-[14px]">
              Securing your account...
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SetPinScreen;
