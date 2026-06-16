"use client";

import React from "react";
import { useRouter } from "next/navigation";
import {
  IoClose,
  IoShareOutline,
  IoCheckmarkCircle,
  IoCloseCircle,
  IoTime,
} from "react-icons/io5";
import QRCode from "react-qr-code";
import { colors } from "../../../../theme/colors";

const TransactionDetailsScreen = ({ transaction }: { transaction: any }) => {
  const router = useRouter();
  const isCredit = transaction.flowType === "CREDIT";

  /* ================== MASKING ================== */
  const maskAccountNumber = (acc: string, shouldMask: boolean = true) => {
    if (!acc || acc === "---") return "**********";
    if (!shouldMask) return acc;
    return acc.length > 4 ? `**** **** ${acc.slice(-4)}` : acc;
  };

  /* ================== STATUS ================== */
  const getStatusDetails = () => {
    const status = transaction.status?.toUpperCase() || "SUCCESSFUL";
    switch (status) {
      case "FAILED":
        return {
          color: "#EB5757",
          icon: <IoCloseCircle size={40} color="#fff" />,
        };
      case "PENDING":
        return { color: "#F2994A", icon: <IoTime size={40} color="#fff" /> };
      default:
        return {
          color: "#27AE60",
          icon: <IoCheckmarkCircle size={40} color="#fff" />,
        };
    }
  };

  const statusStyle = getStatusDetails();

  /* ================== WEB PRINT/PDF ================== */
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex-1 min-h-screen bg-[#F5F7FA] p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 print:hidden">
        <button onClick={() => router.back()}>
          <IoClose size={26} color={colors.primary} />
        </button>
        <h1 className="font-bold text-[16px]">Transaction Receipt</h1>
        <button onClick={handlePrint}>
          <IoShareOutline size={24} color={colors.primary} />
        </button>
      </div>

      <div className="max-w-md mx-auto">
        {/* Receipt Card */}
        <div className="bg-white rounded-[28px] overflow-hidden shadow-sm receipt-to-print">
          {/* Header */}
          <div
            className="p-8 flex flex-col items-center"
            style={{ backgroundColor: statusStyle.color }}
          >
            {statusStyle.icon}
            <p className="text-[34px] font-extrabold text-white mt-4">
              ₦{Number(transaction.amount).toLocaleString()}
            </p>
            <p className="text-white mt-2 font-semibold">
              {transaction.status || "Successful"}
            </p>
          </div>

          {/* Details */}
          <div className="py-4">
            <DetailRow
              label="From"
              value={`${transaction.senderName}\n${maskAccountNumber(transaction.senderAccount, isCredit)}`}
            />
            <DetailRow
              label="To"
              value={`${transaction.recipientName}\n${maskAccountNumber(transaction.recipientAccount, !isCredit)}`}
            />
            <DetailRow label="Type" value={transaction.transactionType} />
            <DetailRow label="Description" value={transaction.description} />
            <DetailRow
              label="Reference"
              value={transaction.id?.split("-")[0]}
            />
          </div>

          {/* QR Code */}
          <div className="flex flex-col items-center py-6">
            <QRCode
              value={`https://vellomij.com/verify/${transaction.id}`}
              size={120}
            />
            <p className="text-[11px] text-gray-400 mt-2">
              Scan to verify transaction
            </p>
          </div>

          <div className="p-4 border-t border-gray-100 text-center">
            <p className="text-[10px] text-gray-400">
              Official receipt — Vellomij Bank
            </p>
          </div>
        </div>

        <button
          className="w-full mt-6 text-center font-bold text-[#27AE60] print:hidden"
          onClick={handlePrint}
        >
          Export as PDF
        </button>
      </div>
    </div>
  );
};

const DetailRow = ({ label, value }: { label: string; value: string }) => (
  <div className="px-6 py-3">
    <p className="text-[12px] text-gray-400">{label}</p>
    <p className="text-[14px] font-semibold text-gray-800 whitespace-pre-line">
      {value}
    </p>
  </div>
);

export default TransactionDetailsScreen;
