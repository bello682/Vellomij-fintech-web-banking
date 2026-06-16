// # DataScreen
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { IoClose } from "react-icons/io5";

// Import your logic and theme
import { buyDataAction } from "../../../store/auth/action/dashboard/walletAction";
import { colors } from "../../../theme/colors";

const DATA_PLANS: any = {
  MTN: [
    { id: "1", label: "1.5GB - 30 Days", price: 1000 },
    { id: "2", label: "2GB - 30 Days", price: 1200 },
    { id: "3", label: "5GB - 30 Days", price: 2500 },
  ],
  AIRTEL: [
    { id: "4", label: "1.5GB - 30 Days", price: 1000 },
    { id: "5", label: "3GB - 30 Days", price: 1500 },
  ],
  GLO: [
    { id: "6", label: "2.9GB - 30 Days", price: 1000 },
    { id: "7", label: "5.8GB - 30 Days", price: 2000 },
  ],
};

const DataScreen = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [network, setNetwork] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedPlan, setSelectedPlan] = useState<any>(null);
  const [showPinModal, setShowPinModal] = useState(false);
  const [messageModal, setMessageModal] = useState({
    visible: false,
    title: "",
    message: "",
    isSuccess: false,
  });

  //   const handleContinue = () => {
  //     if (!network || !phone || !selectedPlan) {
  //       return alert("Please complete all selections");
  //     }
  //     setShowPinModal(true);
  //   };

  const handleContinue = () => {
    if (!network || !phone || !selectedPlan) {
      setMessageModal({
        visible: true,
        title: "Selection Required",
        message: "Please complete all selections before proceeding.",
        isSuccess: false,
      });
      return;
    }
    setShowPinModal(true);
  };

  const handleFinalSubmit = async (pin: string) => {
    if (!selectedPlan) return;

    const res: any = await dispatch(
      buyDataAction({
        phoneNumber: phone,
        amount: selectedPlan.price,
        network: network,
        dataPlan: selectedPlan.label,
        pin,
      }) as any,
    );

    setShowPinModal(false);
    if (res.success) {
      //   alert(res.message);
      setMessageModal({
        visible: true,
        title: res.success ? "Success!" : "Transaction Failed",
        message: res.message,
        isSuccess: res.success,
      });
      router.push("/dashboard");
    } else {
      //   alert(res.message);
      setMessageModal({
        visible: true,
        title: res.success ? "Success!" : "Transaction Failed",
        message: res.message,
        isSuccess: res.success,
      });
    }
  };

  return (
    <div className="flex-1 min-h-screen bg-white">
      {/* Header */}
      <div className="flex justify-between items-center p-5">
        <button onClick={() => router.back()}>
          <IoClose size={28} color={colors.darkBlue} />
        </button>
        <h1 className="text-[18px] font-extrabold text-blue-900">
          Buy Data Bundle
        </h1>
        <div style={{ width: 28 }} />
      </div>

      <div className="p-5">
        <p className="text-[14px] font-bold text-blue-900 mb-2">Phone Number</p>
        <input
          className="w-full bg-gray-50 p-4 rounded-[12px] border border-gray-200 text-[16px] mb-5"
          placeholder="08012345678"
          type="tel"
          onChange={(e) => setPhone(e.target.value)}
        />

        <p className="text-[14px] font-bold text-blue-900 mb-3 mt-2">
          Select Network
        </p>
        <div className="flex justify-between mb-5">
          {["MTN", "AIRTEL", "GLO", "9MOBILE"].map((net) => (
            <button
              key={net}
              onClick={() => {
                setNetwork(net);
                setSelectedPlan(null);
              }}
              className={`py-2 px-4 rounded-[20px] border ${
                network === net
                  ? "bg-blue-600 border-blue-600"
                  : "bg-gray-50 border-gray-200"
              }`}
            >
              <span
                className={`text-[12px] font-bold ${network === net ? "text-white" : "text-blue-900"}`}
              >
                {net}
              </span>
            </button>
          ))}
        </div>

        {network ? (
          <>
            <p className="text-[14px] font-bold text-blue-900 mb-3 mt-4">
              Select Plan
            </p>
            {DATA_PLANS[network]?.map((plan: any) => (
              <button
                key={plan.id}
                onClick={() => setSelectedPlan(plan)}
                className={`w-full flex justify-between p-4 bg-gray-50 rounded-[12px] border mb-3 ${
                  selectedPlan?.id === plan.id
                    ? "border-blue-600 bg-blue-50"
                    : "border-gray-200"
                }`}
              >
                <span className="font-semibold text-blue-900">
                  {plan.label}
                </span>
                <span className="font-bold text-blue-600">₦{plan.price}</span>
              </button>
            ))}
          </>
        ) : (
          <p className="text-center mt-8 text-gray-400">
            Please select a network to see plans
          </p>
        )}
      </div>

      <div className="p-5 border-t border-gray-100">
        <button
          onClick={handleContinue}
          className="w-full bg-blue-600 py-4 rounded-[15px] items-center justify-center flex"
        >
          <span className="text-white font-extrabold text-[16px]">
            Proceed to Pay ₦{selectedPlan?.price || 0}
          </span>
        </button>
      </div>

      {/* PIN Modal */}
      {showPinModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-5">
          <div className="w-full max-w-sm bg-white p-8 rounded-[20px] items-center flex flex-col">
            <p className="text-[18px] font-bold mb-6">Enter PIN</p>
            <input
              type="password"
              maxLength={4}
              autoFocus
              className="border-b-2 border-blue-600 w-[80px] text-center text-[24px] tracking-[10px] outline-none"
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
          </div>
        </div>
      )}

      {messageModal.visible && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-5 z-50">
          <div className="w-full max-w-sm bg-white p-8 rounded-[20px] items-center flex flex-col">
            <h3
              className={`text-[18px] font-bold mb-3 ${messageModal.isSuccess ? "text-green-600" : "text-red-600"}`}
            >
              {messageModal.title}
            </h3>
            <p className="text-center text-gray-600 mb-6">
              {messageModal.message}
            </p>
            <button
              onClick={() => {
                setMessageModal({ ...messageModal, visible: false });
                if (messageModal.isSuccess) router.push("/dashboard");
              }}
              className="w-full bg-blue-600 py-3 rounded-[12px] text-white font-bold"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataScreen;
