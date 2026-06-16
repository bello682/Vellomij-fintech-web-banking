//# HelpCenterScreen
"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { IoChevronBack, IoAdd } from "react-icons/io5";

// Import your existing hooks, actions and theme
import { useAppSelector } from "../../../hooks/useTypedSelector";
import { getUserTickets } from "../../../store/auth/action/dashboard/supportAction";
import { colors } from "../../../theme/colors";

const HelpCenterScreen = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { tickets, loading } = useAppSelector((state) => state.supportState);

  useEffect(() => {
    dispatch(getUserTickets() as any);
  }, [dispatch]);

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "RESOLVED":
        return { bg: "bg-[#EFFFF4]", text: "text-[#27AE60]" };
      case "OPEN":
        return { bg: "bg-[#FFF9E6]", text: "text-[#F2994A]" };
      default:
        return { bg: "bg-gray-100", text: "text-gray-500" };
    }
  };

  return (
    <div className="flex-1 bg-white min-h-screen">
      {/* Header */}
      <div className="flex flex-row justify-between p-5 items-center">
        <button onClick={() => router.back()}>
          <IoChevronBack size={28} className="text-blue-900" />
        </button>
        <h1 className="text-[20px] font-extrabold text-blue-900">
          Support Tickets
        </h1>
        <div style={{ width: 28 }} />
      </div>

      {loading ? (
        <div className="flex justify-center mt-[50px]">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600" />
        </div>
      ) : (
        <div className="p-5">
          {tickets && tickets.length > 0 ? (
            tickets.map((item: any) => {
              const status = getStatusStyle(item.status);
              return (
                <div
                  key={item.id}
                  className="p-[15px] rounded-[15px] bg-white mb-[15px] border border-gray-200"
                >
                  <div className="flex flex-row justify-between mb-[10px]">
                    <p className="text-[16px] font-bold text-blue-900 flex-1">
                      {item.subject}
                    </p>
                    <div
                      className={`px-[10px] py-[4px] rounded-[8px] ${status.bg}`}
                    >
                      <p
                        className={`text-[10px] font-extrabold ${status.text}`}
                      >
                        {item.status}
                      </p>
                    </div>
                  </div>

                  <p className="text-[14px] text-gray-500 mb-[10px] line-clamp-2">
                    {item.message}
                  </p>

                  {item.adminReply && (
                    <div className="bg-gray-50 p-[10px] rounded-[10px] mt-[5px]">
                      <p className="text-[12px] font-bold text-blue-600">
                        Support Reply:
                      </p>
                      <p className="text-[13px] text-blue-900">
                        {item.adminReply}
                      </p>
                    </div>
                  )}

                  <p className="text-[11px] text-gray-300 mt-[10px]">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </p>
                </div>
              );
            })
          ) : (
            <p className="text-center mt-[50px] text-gray-500">
              You have no support tickets.
            </p>
          )}
        </div>
      )}

      {/* FAB */}
      <button
        className="fixed bottom-[30px] right-[30px] w-[60px] h-[60px] rounded-full bg-blue-600 flex justify-center items-center shadow-lg"
        onClick={() => router.push("/dashboard/support/chat")}
      >
        <IoAdd size={30} color="white" />
      </button>
    </div>
  );
};

export default HelpCenterScreen;
