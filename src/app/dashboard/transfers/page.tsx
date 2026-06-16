// # TransferScreen
"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../hooks/useTypedSelector";
import { fetchBanksFromPaystack } from "./bankServices/bankService.ts";
import {
  resetTransfer,
  verifyAccountNumber,
} from "../../store/auth/action/dashboard/transferAction";
import { AppDispatch } from "../../store/auth/store";
import { colors } from "../../theme/colors";
import {
  IoArrowBack,
  IoTimeOutline,
  IoBusinessOutline,
  IoAtOutline,
  IoReceiptOutline,
  IoChevronForward,
  IoCloseCircle,
  IoCheckmarkCircle,
  IoAlertCircle,
  IoBusiness,
} from "react-icons/io5";
import { useSearchParams } from "next/navigation";

const BANK_OPTIONS = [
  {
    id: "1",
    name: "Send to Bank Account",
    icon: <IoBusinessOutline size={24} color={colors.primary} />,
    desc: "Transfer to any bank instantly",
  },
  {
    id: "2",
    name: "Send to @Tag",
    icon: <IoAtOutline size={24} color={colors.primary} />,
    desc: "Free transfers to app users",
  },
  {
    id: "3",
    name: "Pay Bills",
    icon: <IoReceiptOutline size={24} color={colors.primary} />,
    desc: "Electricity, Water, Internet",
  },
];

const TransferScreen = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { verifiedName, loading_verify, error } = useAppSelector(
    (state) => state.transferState,
  );
  const { data: dashboardData } = useAppSelector((state) => state.dashboard);

  const [bankList, setBankList] = useState<any[]>([]);
  const [filteredBanks, setFilteredBanks] = useState<any[]>([]);
  const [searchBank, setSearchBank] = useState("");
  const [isBankModalVisible, setIsBankModalVisible] = useState(false);
  const [selectedBank, setSelectedBank] = useState<any>(null);
  const [step, setStep] = useState(1);
  const [accountNumber, setAccountNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const loadBanks = async () => {
      const banks = await fetchBanksFromPaystack();
      setBankList(banks);
      setFilteredBanks(banks);
    };
    loadBanks();
  }, []);

  useEffect(() => {
    const filtered = bankList.filter((b) =>
      b.name.toLowerCase().includes(searchBank.toLowerCase()),
    );
    setFilteredBanks(filtered);
  }, [searchBank, bankList]);

  useEffect(() => {
    if (accountNumber.length === 10 && selectedBank) {
      dispatch(verifyAccountNumber(accountNumber, selectedBank.code) as any);
    } else if (accountNumber.length < 10 && verifiedName) {
      dispatch(resetTransfer());
    }
  }, [accountNumber, selectedBank]);

  const handleGoBack = () => {
    if (step === 2) {
      setStep(1);
      dispatch(resetTransfer());
      setAccountNumber("");
      setAmount("");
      setDescription("");
      setSelectedBank(null);
    } else {
      router.back();
    }
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    const amountNum = parseFloat(amount);
    const balance = Number(dashboardData?.user?.balance || 0);

    if (accountNumber.length !== 10)
      newErrors.accountNumber = "Account number must be 10 digits";
    if (!amount || isNaN(amountNum) || amountNum <= 0)
      newErrors.amount = "Enter a valid amount";
    if (amountNum > balance) newErrors.amount = "Insufficient balance";
    if (!verifiedName)
      newErrors.accountNumber = "Please verify the account number first";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <div className="flex-1 bg-white min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center p-5">
        <button onClick={handleGoBack}>
          <IoArrowBack size={24} color={colors.darkBlue} />
        </button>
        <h1 className="text-[24px] font-extrabold text-blue-900">
          {step === 1 ? "Transfer" : "Enter Details"}
        </h1>
        <button
          onClick={() =>
            router.push(
              "/dashboard/transfers/transferServices/transactionHistory",
            )
          }
        >
          <IoTimeOutline size={24} color={colors.darkBlue} />
        </button>
      </div>

      {step === 2 ? (
        <div className="p-5">
          <div className="flex items-center bg-gray-50 p-4 rounded-[15px] mb-6">
            <IoBusiness size={20} color={colors.primary} />
            <p className="flex-1 text-[14px] font-bold text-blue-900 ml-3">
              {selectedBank?.name}
            </p>
            <button
              onClick={() => setIsBankModalVisible(true)}
              className="text-blue-600 text-[12px] font-bold"
            >
              CHANGE
            </button>
          </div>

          <label className="text-[14px] text-gray-500 font-semibold mb-2 block">
            Account Number
          </label>
          <div className="flex items-center bg-gray-50 rounded-[15px] px-4 h-[55px] border border-gray-200">
            <input
              className="flex-1 bg-transparent outline-none text-[16px] font-bold text-blue-900"
              maxLength={10}
              value={accountNumber}
              // onChange={(e) => setAccountNumber(e.target.value)}
              onChange={(e) => {
                const val = e.target.value.replace(/[^0-9]/g, ""); // Strict Number Only
                setAccountNumber(val);
                if (errors.accountNumber)
                  setErrors({ ...errors, accountNumber: "" });
              }}
              placeholder="0123456789"
            />
            {loading_verify && (
              <div className="animate-spin h-4 w-4 border-2 border-blue-600 border-t-transparent rounded-full" />
            )}

            {errors.accountNumber && (
              <p className="text-red-500 text-[12px] mt-1">
                {errors.accountNumber}
              </p>
            )}
          </div>

          {verifiedName && (
            <div className="mt-3 bg-green-50 p-4 rounded-[12px] border border-green-200">
              <div className="flex items-center">
                <IoCheckmarkCircle size={14} color="#27AE60" />
                <span className="text-[10px] font-bold text-green-600 ml-2">
                  ACCOUNT NAME VERIFIED
                </span>
              </div>
              <p className="text-[16px] font-bold text-blue-900 mt-1 uppercase">
                {verifiedName}
              </p>
            </div>
          )}

          {error && (
            <div className="flex items-center mt-2 text-red-500">
              <IoAlertCircle size={16} />
              <p className="ml-2 text-[13px]">{error}</p>
            </div>
          )}

          <label className="text-[14px] text-gray-500 font-semibold mt-6 mb-2 block">
            Amount
          </label>
          <div className="flex items-center bg-gray-50 rounded-[15px] px-4 h-[55px] border border-gray-200">
            <span className="text-[18px] font-bold text-blue-900 mr-2">₦</span>
            <input
              className="flex-1 bg-transparent outline-none text-[16px] font-bold text-blue-900"
              value={amount}
              // onChange={(e) => setAmount(e.target.value)}
              onChange={(e) => {
                const val = e.target.value.replace(/[^0-9.]/g, ""); // Numbers and decimals only
                setAmount(val);
                if (errors.amount) setErrors({ ...errors, amount: "" });
              }}
              placeholder="0.00"
            />
            {errors.amount && (
              <p className="text-red-500 text-[12px] mt-1">{errors.amount}</p>
            )}
          </div>
          <p className="text-[12px] text-gray-400 mt-2">
            Available: ₦
            {Number(dashboardData?.user?.balance || 0).toLocaleString()}
          </p>

          {/* Description */}
          <label className="text-[14px] text-gray-500 font-semibold mt-6 mb-2 block">
            Description
          </label>
          <div className="flex items-center bg-gray-50 rounded-[15px] px-4 h-[55px] border border-gray-200 mb-6">
            <input
              className="flex-1 bg-transparent outline-none text-[16px] font-bold text-blue-900"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What is this for?"
            />
          </div>

          <button
            // 1. Disable if loading OR if required fields are missing
            disabled={loading_verify || !verifiedName || !amount}
            // 2. The style should just check if it's disabled
            className={`w-full h-[55px] rounded-[18px] mt-10 transition-colors ${loading_verify || !verifiedName || !amount ? "bg-gray-200 cursor-not-allowed" : "bg-blue-600"}`}
            onClick={() => {
              if (validate()) {
                router.push(
                  `/dashboard/transfers/confirm?amount=${amount}&accountNumber=${accountNumber}&recipientName=${verifiedName}&bank=${selectedBank.name}&description=${description}`,
                );
              }
            }}
          >
            {/* <span className="text-white font-bold text-[16px]">Continue</span> */}
            {loading_verify ? (
              <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
            ) : (
              <span className="text-white font-bold text-[16px]">Continue</span>
            )}
          </button>
        </div>
      ) : (
        <div className="px-5 mt-6">
          <h2 className="text-[18px] font-bold text-blue-900 mb-4">
            Transfer Methods
          </h2>
          {BANK_OPTIONS.map((item) => (
            <button
              key={item.id}
              className="flex items-center w-full p-4 bg-white rounded-[20px] mb-3 border border-gray-100 shadow-sm"
              onClick={() => item.id === "1" && setIsBankModalVisible(true)}
            >
              <div className="w-[48px] h-[48px] rounded-[14px] bg-gray-50 flex items-center justify-center">
                {item.icon}
              </div>
              <div className="flex-1 text-left ml-4">
                <p className="text-[16px] font-bold text-blue-900">
                  {item.name}
                </p>
                <p className="text-[12px] text-gray-500">{item.desc}</p>
              </div>
              <IoChevronForward size={20} color="#ccc" />
            </button>
          ))}
        </div>
      )}

      {/* Bank Modal Overlay */}
      {isBankModalVisible && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end">
          <div className="bg-white w-full h-[70vh] rounded-t-[30px] p-6 overflow-y-auto">
            <div className="flex justify-between mb-5">
              <h2 className="text-[20px] font-bold text-blue-900">
                Select Bank
              </h2>
              <button onClick={() => setIsBankModalVisible(false)}>
                <IoCloseCircle size={28} color="#888" />
              </button>
            </div>
            <input
              className="w-full bg-gray-50 p-3 rounded-[10px] mb-4 border border-gray-200"
              placeholder="Search Bank Name..."
              value={searchBank}
              onChange={(e) => setSearchBank(e.target.value)}
            />
            {filteredBanks.map((item, index) => (
              <button
                // key={item.code}
                key={`${item.code}-${index}`}
                className="flex items-center w-full py-4 border-b border-gray-50"
                onClick={() => {
                  setSelectedBank(item);
                  setIsBankModalVisible(false);
                  setStep(2);
                }}
              >
                <div className="w-[40px] h-[40px] rounded-[10px] bg-gray-50 flex items-center justify-center mr-4">
                  <IoBusiness size={20} color={colors.primary} />
                </div>
                <p className="text-[16px] font-semibold text-blue-900">
                  {item.name}
                </p>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TransferScreen;
