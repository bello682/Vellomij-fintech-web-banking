"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/app/hooks/useTypedSelector";
import { getTransactionHistory } from "../../store/auth/action/dashboard/walletAction";
import { getUserDashboard } from "../../store/auth/action/dashboard/dashboardAction";
import { AppDispatch } from "../../store/auth/store";
import {
  IoNotificationsOutline,
  IoWalletOutline,
  IoShieldCheckmark,
  IoChevronForward,
  IoPaperPlaneOutline,
  IoAddCircleOutline,
  IoReceiptOutline,
  IoGridOutline,
  IoArrowDown,
  IoArrowUp,
  IoEyeOutline,
  IoEyeOffOutline,
} from "react-icons/io5";

const DashboardScreen = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const { user } = useAppSelector((state) => state.loginState);
  const { data, loading_now } = useAppSelector((state) => state.dashboard);
  const { transactions, loading_now: isLoading } = useAppSelector(
    (state) => state.walletState,
  );

  const [showBalance, setShowBalance] = useState(true);

  useEffect(() => {
    dispatch(getUserDashboard());
    dispatch(getTransactionHistory());
  }, [dispatch]);

  console.log(transactions);

  const kycStatus = data?.user?.verificationStatus || "pending";

  const handleAction = (route: string, isRestricted: boolean) => {
    if (isRestricted && kycStatus !== "verified") {
      alert(
        "Verification Required: Please complete your KYC to access this feature.",
      );
      router.push("/dashboard/kyc/intro");
      return;
    }
    router.push(`/dashboard/${route.toLowerCase()}`);
  };
  const handleAction2OutsideDashboard = (
    route: string,
    isRestricted: boolean,
  ) => {
    if (isRestricted && kycStatus !== "verified") {
      alert(
        "Verification Required: Please complete your KYC to access this feature.",
      );
      router.push("/dashboard/kyc/intro");
      return;
    }
    router.push(`/screens/dashboard/${route.toLowerCase()}`);
  };

  return (
    <main className="p-6 max-w-4xl mx-auto">
      {/* Header */}
      <header className="flex justify-between items-center mb-6">
        <div>
          <p className="text-sm text-gray-500 font-medium">Welcome back,</p>
          <h1 className="text-xl font-bold text-blue-900">
            {data?.user?.fullName || "User"}
          </h1>
        </div>
        <button
          onClick={() => router.push("/dashboard/notifications")}
          className="p-3 bg-gray-100 rounded-2xl relative"
        >
          <IoNotificationsOutline size={24} className="text-blue-900" />
          <span className="absolute top-2 right-3 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white" />
        </button>
      </header>

      {/* KYC Banner */}
      {kycStatus !== "verified" && (
        <button
          onClick={() => router.push("/dashboard/kyc/intro")}
          className="flex items-center w-full bg-red-50 p-4 rounded-2xl border border-red-100 mb-6"
        >
          <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center">
            <IoShieldCheckmark size={20} className="text-blue-600" />
          </div>
          <div className="flex-1 ml-3 text-left">
            <p className="text-sm font-bold text-red-700">
              Complete Verification
            </p>
            <p className="text-xs text-gray-500">
              Increase your transaction limits now
            </p>
          </div>
          <IoChevronForward size={18} className="text-gray-400" />
        </button>
      )}

      {/* Balance Card */}
      <div className="bg-blue-600 rounded-3xl p-6 text-white shadow-lg h-48 flex flex-col justify-between">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2 text-white/80 text-sm">
            <IoWalletOutline size={16} /> Total Balance
          </div>
          <button onClick={() => setShowBalance(!showBalance)}>
            {showBalance ? (
              <IoEyeOutline size={22} />
            ) : (
              <IoEyeOffOutline size={22} />
            )}
          </button>
        </div>
        <div className="text-3xl font-extrabold">
          ₦
          {showBalance
            ? data?.user?.balance?.toLocaleString() || "0.00"
            : "****"}
        </div>
        <div className="flex justify-between items-end">
          <div>
            <p className="text-[11px] text-white/60">Account Number</p>
            <p className="font-semibold">
              {data?.user?.accountNumber || "---"}
            </p>
          </div>
          <div className="bg-white/20 px-3 py-1 rounded-full text-[11px] font-bold">
            FintechPro
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="flex justify-between mt-6">
        <ActionItem
          icon={<IoPaperPlaneOutline />}
          label="Transfer"
          color="bg-blue-50"
          iconColor="#2F80ED"
          onPress={() => handleAction("transfers", true)}
          // onPress={() => {
          //   router.push("dashboard/transfers");
          // }}
        />
        <ActionItem
          icon={<IoAddCircleOutline />}
          label="Wallet"
          color="bg-green-50"
          iconColor="#27AE60"
          onPress={() => handleAction("Wallet", true)}
        />
        <ActionItem
          icon={<IoReceiptOutline />}
          label="Bills"
          color="bg-orange-50"
          iconColor="#F2994A"
          onPress={() => handleAction("Payments", true)}
          // onPress={() => {
          //   router.push("dashboard/payments");
          // }}
        />
        <ActionItem
          icon={<IoGridOutline />}
          label="More"
          color="bg-gray-100"
          iconColor="#1e3a8a"
          onPress={() => handleAction2OutsideDashboard("more-actions", true)}
          // onPress={() => {
          //   router.push("/screens/dashboard/more-actions");
          // }}
        />
      </div>

      {/* Transactions */}
      <div className="mt-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-extrabold text-blue-900">
            Recent Transactions
          </h2>
          <button
            onClick={() =>
              router.push(
                "/dashboard/transfers/transferServices/transactionHistory",
              )
            }
            className="text-blue-600 font-bold text-sm cursor-pointer"
          >
            See All
          </button>
        </div>

        {loading_now || isLoading ? (
          <div className="text-center py-10">Loading...</div>
        ) : transactions?.length > 0 ? (
          transactions
            .slice(0, 5)
            .map((item: any, idx: number) => (
              <TransactionItem key={item.id || idx} {...item} />
            ))
        ) : (
          <div className="text-center py-10 text-gray-400">
            No recent transactions
          </div>
        )}
      </div>
    </main>
  );
};

const ActionItem = ({ icon, label, color, iconColor, onPress }: any) => (
  <div className="flex flex-col items-center">
    <button
      onClick={onPress}
      className={`${color} w-16 h-16 rounded-2xl flex items-center justify-center mb-2`}
      style={{ color: iconColor }}
    >
      {React.cloneElement(icon, { size: 24 })}
    </button>
    <p className="text-xs font-semibold text-blue-900">{label}</p>
  </div>
);

const TransactionItem = ({
  title,
  date,
  amount,
  transactionType,
  flowType,
  description,
  account,
}: any) => {
  const isCredit = transactionType === "DEPOSIT" || flowType === "CREDIT";
  return (
    <div className="flex items-center py-4 border-b border-gray-100">
      <div
        className={`w-12 h-12 rounded-2xl flex items-center justify-center mr-4 ${isCredit ? "bg-green-50" : "bg-red-50"}`}
      >
        {isCredit ? (
          <IoArrowDown className="text-green-600" />
        ) : (
          <IoArrowUp className="text-red-500" />
        )}
      </div>
      <div className="flex-1">
        <p className="font-bold text-blue-900">{title || "Transaction"}</p>
        <p className="text-xs text-gray-500">
          {description || account || "No details"}
        </p>
      </div>
      <div className="text-right">
        <p
          className={`font-bold ${isCredit ? "text-green-600" : "text-blue-900"}`}
        >
          {isCredit ? "+" : "-"}₦{Number(amount).toLocaleString()}
        </p>
        <p className="text-[9px] uppercase font-bold text-gray-400">
          {transactionType}
        </p>
      </div>
    </div>
  );
};

export default DashboardScreen;
