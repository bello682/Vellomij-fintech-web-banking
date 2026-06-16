// # BillsScreen
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { IoArrowBack } from "react-icons/io5";

// Import your logic and theme
import { buyElectricityAction } from "../../../store/auth/action/dashboard/walletAction";
import { colors } from "../../../theme/colors";

const PROVIDERS = [
  { id: "IKEDC", name: "Ikeja Electric" },
  { id: "EKEDC", name: "Eko Electric" },
  { id: "KEDCO", name: "Kano Electric" },
  { id: "PHED", name: "Port Harcourt" },
];

const BillScreen = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [provider, setProvider] = useState("");
  const [meterNumber, setMeterNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [showPinModal, setShowPinModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleProcess = () => {
    if (!provider || !meterNumber || !amount) {
      return alert("Please fill all fields");
    }
    setShowPinModal(true);
  };

  const handleFinalSubmit = async (pin: string) => {
    setLoading(true);
    const result: any = await dispatch(
      buyElectricityAction({
        meterNumber,
        amount: parseFloat(amount),
        provider,
        pin,
      }) as any,
    );

    setLoading(false);
    setShowPinModal(false);

    if (result.success) {
      alert(
        `Purchase Successful\n\nToken: ${result.data.token}\n\nThis token has also been sent to your notifications.`,
      );
      router.push("/dashboard");
    } else {
      alert(result.message);
    }
  };

  return (
    <div className="flex-1 min-h-screen bg-white">
      {/* Header */}
      <div className="flex justify-between items-center p-5">
        <button onClick={() => router.back()}>
          <IoArrowBack size={24} color={colors.darkBlue} />
        </button>
        <h1 className="text-[18px] font-extrabold text-blue-900">
          Electricity
        </h1>
        <div style={{ width: 24 }} />
      </div>

      {/* Content */}
      <div className="p-5">
        <p className="text-[14px] font-bold text-blue-900 mb-3">
          Select Provider
        </p>
        <div className="flex flex-wrap gap-2 mb-6">
          {PROVIDERS.map((item) => (
            <button
              key={item.id}
              onClick={() => setProvider(item.id)}
              className={`py-2 px-4 rounded-[8px] border ${
                provider === item.id
                  ? "bg-blue-600 border-blue-600 text-white"
                  : "bg-gray-50 border-gray-200"
              }`}
            >
              <span
                className={`text-[13px] font-semibold ${provider === item.id ? "text-white" : "text-blue-900"}`}
              >
                {item.name}
              </span>
            </button>
          ))}
        </div>

        <div className="mb-5">
          <p className="text-[14px] font-bold text-blue-900 mb-2">
            Meter Number
          </p>
          <input
            className="w-full bg-gray-50 p-4 rounded-[12px] border border-gray-200 text-[16px]"
            placeholder="Enter 11-13 digit meter number"
            type="number"
            value={meterNumber}
            onChange={(e) => setMeterNumber(e.target.value)}
          />
        </div>

        <div className="mb-8">
          <p className="text-[14px] font-bold text-blue-900 mb-2">Amount (₦)</p>
          <input
            className="w-full bg-gray-50 p-4 rounded-[12px] border border-gray-200 text-[16px]"
            placeholder="0.00"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <button
          onClick={handleProcess}
          className="w-full bg-blue-600 py-4 rounded-[15px] items-center justify-center flex"
        >
          <span className="text-white font-extrabold text-[16px]">
            Verify & Pay
          </span>
        </button>
      </div>

      {/* PIN Modal */}
      {showPinModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-5">
          <div className="w-full max-w-sm bg-white p-8 rounded-[20px] items-center flex flex-col">
            <p className="text-[17px] font-bold mb-6">Enter Transaction PIN</p>
            <input
              type="password"
              maxLength={4}
              autoFocus
              className="border-b-2 border-blue-600 w-[120px] text-center text-[28px] tracking-[10px] outline-none"
              onChange={(e) => {
                if (e.target.value.length === 4)
                  handleFinalSubmit(e.target.value);
              }}
            />
            {loading && <p className="mt-4 text-blue-600">Processing...</p>}
            <button
              onClick={() => setShowPinModal(false)}
              className="mt-6 text-red-500 font-semibold"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BillScreen;
