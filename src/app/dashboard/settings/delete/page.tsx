// # DeleteAccountScreen
"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import {
  IoArrowBack,
  IoTrashOutline,
  IoRemoveCircle,
  IoCheckbox,
  IoSquareOutline,
} from "react-icons/io5";

import { useAppSelector } from "../../../hooks/useTypedSelector";
import { deleteUserAccount } from "../../../store/auth/action/deleteUserAction";
import { colors } from "../../../theme/colors";
import LoadingOverlay from "@/components/common/AppLoader"; // Ensure path is correct

const DeleteAccountScreen = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  // const { user } = useAppSelector((state: any) => state.loginState);
  const { loading_now } = useAppSelector((state: any) => state.deleteUserState);
  const { user } = useAppSelector((state: any) => state.profileReducer);
  // You can now access user.bankInfo.balance or user.transactions directly!

  const balance = user?.bankInfo?.balance ?? 0;
  const [hasConsented, setHasConsented] = useState(false);

  // Custom Modal State
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    console.log("CURRENT USER OBJECT FROM REDUX:", user);
  }, [user]);

  const validateAndDelete = () => {
    if (balance > 0) {
      alert(
        `Withdraw All Funds First: You still have ₦${balance.toLocaleString()} in your account. Please withdraw or transfer your balance before deleting.`,
      );
      return;
    }

    if (!hasConsented) {
      alert(
        "Action Required: Please acknowledge the terms by checking the box.",
      );
      return;
    }

    setShowConfirm(true);
  };

  const handleFinalDelete = async () => {
    if (!user?.id) {
      console.error("CRITICAL: User ID is missing!");
      alert("Error: User session not found. Please log out and log back in.");
      return;
    }

    setShowConfirm(false);
    const success = await dispatch(deleteUserAccount(user.id) as any);
    if (success) {
      router.push("/screens/auth/LoginScreen");
    }
  };

  return (
    <div className="flex-1 bg-white min-h-screen">
      <LoadingOverlay
        visible={loading_now}
        message="Permanently closing account..."
      />

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-5">
          <div className="bg-white p-8 rounded-[24px] max-w-sm w-full text-center">
            <h2 className="text-[20px] font-extrabold text-blue-900 mb-2">
              Final Warning
            </h2>
            <p className="text-gray-500 mb-8 text-[14px]">
              This will permanently erase your transaction history, KYC
              documents, and account access. Are you absolutely sure?
            </p>
            <div className="flex flex-col gap-3">
              <button
                onClick={handleFinalDelete}
                className="bg-red-500 text-white py-4 rounded-[16px] font-bold"
              >
                Delete Permanently
              </button>
              <button
                onClick={() => setShowConfirm(false)}
                className="text-gray-500 font-bold py-2"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-row items-center p-5">
        <button onClick={() => router.back()}>
          <IoArrowBack size={24} className="text-blue-900" />
        </button>
        <h1 className="text-[18px] font-bold ml-4 text-blue-900">
          Account Privacy
        </h1>
      </div>

      <div className="px-6 pb-10 max-w-lg mx-auto">
        <div className="flex justify-center my-6">
          <div className="w-[80px] h-[80px] rounded-full bg-red-50 flex items-center justify-center">
            <IoTrashOutline size={40} className="text-red-500" />
          </div>
        </div>

        <h2 className="text-[24px] font-extrabold text-blue-900 text-center">
          Delete Account?
        </h2>
        <p className="text-[15px] text-gray-500 text-center mt-3 leading-6">
          We're sorry to see you go. Deleting your account is permanent and
          cannot be undone.
        </p>

        <div className="mt-8 bg-gray-50 p-5 rounded-[16px]">
          <p className="text-[14px] font-bold text-blue-900 mb-4">
            What you should know:
          </p>
          <BulletItem text="All your KYC data (BVN, ID Image) will be wiped." />
          <BulletItem text="Your transaction history (receipts) will be inaccessible." />
          <BulletItem text="Any pending support tickets will be closed immediately." />
        </div>

        <button
          className="flex items-center mt-8 w-full"
          onClick={() => setHasConsented(!hasConsented)}
        >
          {hasConsented ? (
            <IoCheckbox size={24} className="text-blue-600" />
          ) : (
            <IoSquareOutline size={24} className="text-gray-400" />
          )}
          <span className="text-[13px] text-gray-700 ml-3 text-left leading-5">
            I confirm that I have read the terms and I understand that my data
            will be permanently deleted.
          </span>
        </button>

        <button
          disabled={!hasConsented || loading_now}
          onClick={validateAndDelete}
          className={`w-full h-[58px] rounded-[16px] mt-10 font-bold text-[16px] ${
            hasConsented ? "bg-red-500 text-white" : "bg-red-200 text-white"
          }`}
        >
          Delete My Account
        </button>

        <button
          onClick={() => router.back()}
          className="w-full py-4 mt-5 text-blue-600 font-semibold text-[15px]"
        >
          Keep My Account
        </button>
      </div>
    </div>
  );
};

function BulletItem({ text }: { text: string }) {
  return (
    <div className="flex items-start mb-3">
      <IoRemoveCircle size={18} className="text-red-500 mt-0.5" />
      <p className="text-[14px] text-gray-600 ml-2 flex-1 leading-5">{text}</p>
    </div>
  );
}

export default DeleteAccountScreen;
