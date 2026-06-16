"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../../../hooks/useTypedSelector";
import { getTransactionHistory } from "../../../../store/auth/action/dashboard/walletAction";
import { AppDispatch } from "../../../../store/auth/store";
import { colors } from "../../../../theme/colors";
import {
  IoChevronBack,
  IoSearchOutline,
  IoCloseCircle,
  IoArrowDown,
  IoArrowUp,
  IoReceiptOutline,
} from "react-icons/io5";

const TransactionHistoryScreen = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const { transactions, loading_now } = useAppSelector(
    (state) => state.walletState,
  );

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    dispatch(getTransactionHistory());
  }, [dispatch]);

  const filteredData = (transactions || []).filter((item: any) => {
    const matchesSearch =
      item.participant?.toLowerCase().includes(search.toLowerCase()) ||
      item.description?.toLowerCase().includes(search.toLowerCase());

    if (filter === "All") return matchesSearch;
    return matchesSearch && item.flowType === filter.toUpperCase();
  });

  return (
    <div className="flex-1 bg-white min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center px-4 py-4">
        <button
          onClick={() => router.back()}
          className="w-10 h-10 flex items-center justify-center"
        >
          <IoChevronBack size={24} color={colors.darkBlue} />
        </button>
        <h1 className="text-[18px] font-extrabold text-blue-900">
          Transaction History
        </h1>
        <div className="w-10" />
      </div>

      {/* Search */}
      <div className="flex items-center bg-gray-50 mx-5 px-4 h-[50px] rounded-[15px] border border-gray-200">
        <IoSearchOutline size={20} color="#888" />
        <input
          placeholder="Search name or description..."
          className="flex-1 ml-3 bg-transparent outline-none text-[14px] text-blue-900"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {search.length > 0 && (
          <button onClick={() => setSearch("")}>
            <IoCloseCircle size={18} color="#888" />
          </button>
        )}
      </div>

      {/* Filters */}
      <div className="flex px-5 mt-5 mb-2">
        {["All", "Credit", "Debit"].map((type) => (
          <button
            key={type}
            className={`px-[22px] py-[10px] rounded-[25px] mr-[10px] border ${filter === type ? "bg-blue-900 border-blue-900" : "bg-white border-gray-200"}`}
            onClick={() => setFilter(type)}
          >
            <span
              className={`text-[13px] font-bold ${filter === type ? "text-white" : "text-gray-500"}`}
            >
              {type}
            </span>
          </button>
        ))}
      </div>

      {/* List */}
      {loading_now ? (
        <div className="flex-1 flex flex-col justify-center items-center mt-20">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="mt-3 text-gray-500 text-[14px]">Fetching records...</p>
        </div>
      ) : (
        <div className="px-5 pb-8">
          {filteredData.length > 0 ? (
            filteredData.map((item: any) => {
              const isCredit = item.flowType === "CREDIT";
              const isTransfer = item.category?.toLowerCase() === "transfer";
              const statusColor = isCredit ? "#27AE60" : "#EB5757";
              const statusBg = isCredit ? "#EFFFF4" : "#FFF0F0";

              return (
                <button
                  key={item.id}
                  className="flex items-center w-full py-4 border-b border-gray-100"
                  onClick={() =>
                    // router.push(`/dashboard/transaction-details/${item.id}`)
                    router.push(
                      `/dashboard/transfers/transferServices/transactionDetails/${item.id}`,
                    )
                  }
                >
                  <div
                    className="w-[48px] h-[48px] rounded-[16px] flex items-center justify-center"
                    style={{ backgroundColor: statusBg }}
                  >
                    {isCredit ? (
                      <IoArrowDown size={20} color={statusColor} />
                    ) : (
                      <IoArrowUp size={20} color={statusColor} />
                    )}
                  </div>
                  <div className="flex-1 ml-4 text-left">
                    <p className="text-[15px] font-bold text-blue-900 truncate">
                      {item.participant || "Unknown"}
                    </p>
                    <p className="text-[12px] text-gray-500 mt-0.5 truncate">
                      {item.description}
                    </p>
                    <p className="text-[11px] text-gray-400 mt-1 font-medium">
                      {new Date(item.date).toLocaleDateString("en-NG", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                  <div className="items-end flex flex-col">
                    <p
                      className="text-[16px] font-extrabold"
                      style={{ color: statusColor }}
                    >
                      {isCredit ? "+" : "-"}₦
                      {Number(item.amount).toLocaleString()}
                    </p>
                    <div
                      className="mt-1.5 px-2 py-0.5 rounded-[6px] border border-gray-200"
                      style={{
                        backgroundColor: isTransfer ? "#f0f4ff" : "#f9f9f9",
                      }}
                    >
                      <p
                        className="text-[10px] font-extrabold uppercase"
                        style={{ color: isTransfer ? "#1e3a8a" : "#6b7280" }}
                      >
                        {item.category || "General"}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })
          ) : (
            <div className="flex flex-col items-center mt-20 px-10">
              <IoReceiptOutline size={80} color="#e5e7eb" />
              <p className="text-blue-900 mt-4 text-[18px] font-bold">
                No transactions found
              </p>
              <p className="text-gray-500 mt-2 text-[14px] text-center">
                Your transaction records will appear here as they occur.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TransactionHistoryScreen;
