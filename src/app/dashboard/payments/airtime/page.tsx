// # AirtimeScreen
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { IoArrowBack } from "react-icons/io5";

// Import your logic and theme
import { buyAirtimeAction } from "../../../store/auth/action/dashboard/walletAction";
import { colors } from "../../../theme/colors";

const NETWORKS = [
  { id: "MTN", name: "MTN", color: "#FFCC00" },
  { id: "AIRTEL", name: "Airtel", color: "#FF0000" },
  { id: "GLO", name: "Glo", color: "#008000" },
  { id: "9MOBILE", name: "9Mobile", color: "#005733" },
];

const AirtimeScreen = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [selectedNetwork, setSelectedNetwork] = useState("");
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState("");
  const [showPinModal, setShowPinModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleOpenPinModal = () => {
    if (!selectedNetwork || !phone || !amount) {
      return alert("Please fill all fields");
    }
    setShowPinModal(true);
  };

  const handleFinalSubmit = async (enteredPin: string) => {
    setLoading(true);
    const result: any = await dispatch(
      buyAirtimeAction({
        phoneNumber: phone,
        amount: parseFloat(amount),
        network: selectedNetwork,
        pin: enteredPin,
      }) as any,
    );
    setLoading(false);
    setShowPinModal(false);

    if (result.success) {
      alert(result.message);
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
          Buy Airtime
        </h1>
        <div style={{ width: 24 }} />
      </div>

      {/* Content */}
      <div className="p-5">
        <p className="text-[14px] font-bold text-blue-900 mb-4">
          Select Network
        </p>
        <div className="flex flex-wrap justify-between mb-8">
          {NETWORKS.map((net) => (
            <button
              key={net.id}
              className={`w-[48%] bg-gray-50 p-4 rounded-[12px] flex flex-col items-center mb-4 border ${
                selectedNetwork === net.id ? "border-2" : "border-gray-200"
              }`}
              style={{
                borderColor: selectedNetwork === net.id ? net.color : undefined,
              }}
              onClick={() => setSelectedNetwork(net.id)}
            >
              <div
                className="w-[40px] h-[40px] rounded-full mb-3 flex items-center justify-center overflow-hidden"
                style={{ backgroundColor: net.color }}
              >
                <p className="font-bold text-[10px] text-[white] text-center leading-tight truncate px-1">
                  {net.name}
                </p>
              </div>
            </button>
          ))}
        </div>

        <div className="mb-5">
          <p className="text-[14px] font-bold text-blue-900 mb-2">
            Phone Number
          </p>
          <input
            className="w-full bg-gray-50 p-4 rounded-[12px] border border-gray-200 text-[16px]"
            placeholder="08012345678"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <div className="mb-8">
          <p className="text-[14px] font-bold text-blue-900 mb-2">Amount</p>
          <input
            className="w-full bg-gray-50 p-4 rounded-[12px] border border-gray-200 text-[16px]"
            placeholder="Min ₦50"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <button
          className="w-full bg-blue-900 py-4 rounded-[15px] items-center justify-center flex"
          onClick={handleOpenPinModal}
        >
          <span className="text-white font-extrabold text-[16px]">
            Continue
          </span>
        </button>
      </div>

      {/* PIN Modal */}
      {showPinModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-5">
          <div className="w-full max-w-sm bg-white p-8 rounded-[20px] items-center flex flex-col">
            <p className="text-[18px] font-bold mb-6">Enter Transaction PIN</p>
            <input
              type="password"
              maxLength={4}
              autoFocus
              className="border-b-2 border-blue-600 w-[100px] text-center text-[24px] tracking-[10px] outline-none"
              onChange={(e) => {
                if (e.target.value.length === 4)
                  handleFinalSubmit(e.target.value);
              }}
            />
            <button
              onClick={() => setShowPinModal(false)}
              className="mt-6 text-red-500 font-bold"
            >
              Cancel
            </button>
            {loading && <p className="mt-4 text-blue-600">Processing...</p>}
          </div>
        </div>
      )}
    </div>
  );
};

export default AirtimeScreen;
