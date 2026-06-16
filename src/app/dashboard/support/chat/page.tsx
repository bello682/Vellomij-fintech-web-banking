// // # ChatSupportScreen
// "use client";

// import React, { useState } from "react";
// import { useRouter } from "next/navigation";
// import { useDispatch } from "react-redux";
// import { IoClose } from "react-icons/io5";

// // Import your existing actions and types
// import {
//   createTicket,
//   getUserTickets,
// } from "../../../store/auth/action/dashboard/supportAction";
// import { colors } from "../../../theme/colors";

// const ChatSupportScreen = () => {
//   const router = useRouter();
//   const dispatch = useDispatch();

//   const [subject, setSubject] = useState("");
//   const [message, setMessage] = useState("");
//   const [priority, setPriority] = useState("MEDIUM");
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const handleCreateTicket = async () => {
//     if (!subject || !message) {
//       alert("Please provide both a subject and a message.");
//       return;
//     }

//     setIsSubmitting(true);
//     const res: any = await dispatch(
//       createTicket({ subject, message, priority }) as any,
//     );

//     if (res.success) {
//       dispatch(getUserTickets() as any);
//       alert(res.message);
//       router.push("/dashboard/support/help");
//     } else {
//       alert(res.message);
//     }
//     setIsSubmitting(false);
//   };

//   return (
//     <div className="flex-1 bg-white min-h-screen">
//       {/* Header */}
//       <div className="flex flex-row justify-between p-5 items-center">
//         <button onClick={() => router.back()}>
//           <IoClose size={28} className="text-blue-900" />
//         </button>
//         <h1 className="text-[18px] font-extrabold text-blue-900">
//           New Support Ticket
//         </h1>
//         <div style={{ width: 28 }} />
//       </div>

//       {/* Form */}
//       <div className="p-5">
//         <p className="text-[14px] font-bold text-blue-900 mb-2.5 mt-2.5">
//           What is the issue about?
//         </p>
//         <input
//           className="w-full bg-gray-50 rounded-[12px] p-4 text-[15px] border border-gray-200 outline-none focus:border-blue-500"
//           placeholder="e.g. Transaction Delay"
//           value={subject}
//           onChange={(e) => setSubject(e.target.value)}
//         />

//         <p className="text-[14px] font-bold text-blue-900 mb-2.5 mt-2.5">
//           Priority Level
//         </p>
//         <div className="flex flex-row mb-5">
//           {["LOW", "MEDIUM", "HIGH"].map((p) => (
//             <button
//               key={p}
//               className={`flex-1 p-2.5 items-center rounded-[8px] border border-gray-200 mr-1.5 ${
//                 priority === p ? "bg-blue-900 border-blue-900" : ""
//               }`}
//               onClick={() => setPriority(p)}
//             >
//               <p
//                 className={`text-[12px] font-bold ${priority === p ? "text-white" : "text-gray-500"}`}
//               >
//                 {p}
//               </p>
//             </button>
//           ))}
//         </div>

//         <p className="text-[14px] font-bold text-blue-900 mb-2.5 mt-2.5">
//           Detailed Description
//         </p>
//         <textarea
//           className="w-full bg-gray-50 rounded-[12px] p-4 text-[15px] border border-gray-200 h-[150px] outline-none focus:border-blue-500"
//           placeholder="Tell us more so we can help you faster..."
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//         />

//         <button
//           className={`w-full bg-blue-600 p-[18px] rounded-[15px] items-center justify-center mt-[30px] ${
//             isSubmitting ? "opacity-60" : ""
//           }`}
//           onClick={handleCreateTicket}
//           disabled={isSubmitting}
//         >
//           {isSubmitting ? (
//             <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
//           ) : (
//             <p className="text-white font-extrabold text-[16px]">
//               Submit Request
//             </p>
//           )}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ChatSupportScreen;

"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { IoClose, IoCheckmarkCircle, IoAlertCircle } from "react-icons/io5";

import {
  createTicket,
  getUserTickets,
} from "../../../store/auth/action/dashboard/supportAction";

const ChatSupportScreen = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [priority, setPriority] = useState("MEDIUM");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Modal State
  const [modal, setModal] = useState<{
    show: boolean;
    title: string;
    message: string;
    type: "success" | "error" | null;
  }>({
    show: false,
    title: "",
    message: "",
    type: null,
  });

  const handleCreateTicket = async () => {
    if (!subject || !message) {
      setModal({
        show: true,
        title: "Missing Fields",
        message: "Please provide both a subject and a message.",
        type: "error",
      });
      return;
    }

    setIsSubmitting(true);
    const res: any = await dispatch(
      createTicket({ subject, message, priority }) as any,
    );

    if (res.success) {
      dispatch(getUserTickets() as any);
      setModal({
        show: true,
        title: "Ticket Created",
        message: res.message,
        type: "success",
      });
    } else {
      setModal({
        show: true,
        title: "Error",
        message: res.message,
        type: "error",
      });
    }
    setIsSubmitting(false);
  };

  return (
    <div className="flex-1 bg-white min-h-screen">
      {/* --- MODAL OVERLAY --- */}
      {modal.show && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-5">
          <div className="bg-white p-8 rounded-[24px] max-w-sm w-full text-center shadow-2xl">
            {modal.type === "success" ? (
              <IoCheckmarkCircle
                size={60}
                className="text-green-500 mx-auto mb-4"
              />
            ) : (
              <IoAlertCircle size={60} className="text-red-500 mx-auto mb-4" />
            )}
            <h2 className="text-[20px] font-extrabold text-blue-900 mb-2">
              {modal.title}
            </h2>
            <p className="text-gray-500 mb-8">{modal.message}</p>
            <button
              className="w-full bg-blue-900 text-white py-4 rounded-[15px] font-bold"
              onClick={() => {
                setModal({ ...modal, show: false });
                if (modal.type === "success")
                  router.push("/dashboard/support/help");
              }}
            >
              {modal.type === "success" ? "View Tickets" : "Try Again"}
            </button>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-row justify-between p-5 items-center">
        <button onClick={() => router.back()}>
          <IoClose size={28} className="text-blue-900" />
        </button>
        <h1 className="text-[18px] font-extrabold text-blue-900">
          New Support Ticket
        </h1>
        <div style={{ width: 28 }} />
      </div>

      {/* Form */}
      <div className="p-5">
        <p className="text-[14px] font-bold text-blue-900 mb-2.5 mt-2.5">
          What is the issue about?
        </p>
        <input
          className="w-full bg-gray-50 rounded-[12px] p-4 text-[15px] border border-gray-200 outline-none focus:border-blue-500"
          placeholder="e.g. Transaction Delay"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />

        <p className="text-[14px] font-bold text-blue-900 mb-2.5 mt-2.5">
          Priority Level
        </p>
        <div className="flex flex-row mb-5">
          {["LOW", "MEDIUM", "HIGH"].map((p) => (
            <button
              key={p}
              className={`flex-1 p-2.5 items-center rounded-[8px] border border-gray-200 mr-1.5 ${priority === p ? "bg-blue-900 border-blue-900" : ""}`}
              onClick={() => setPriority(p)}
            >
              <p
                className={`text-[12px] font-bold ${priority === p ? "text-white" : "text-gray-500"}`}
              >
                {p}
              </p>
            </button>
          ))}
        </div>

        <p className="text-[14px] font-bold text-blue-900 mb-2.5 mt-2.5">
          Detailed Description
        </p>
        <textarea
          className="w-full bg-gray-50 rounded-[12px] p-4 text-[15px] border border-gray-200 h-[150px] outline-none focus:border-blue-500"
          placeholder="Tell us more so we can help you faster..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <button
          className={`w-full bg-blue-600 p-[18px] rounded-[15px] items-center justify-center mt-[30px] ${isSubmitting ? "opacity-60" : ""}`}
          onClick={handleCreateTicket}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
          ) : (
            <p className="text-white font-extrabold text-[16px]">
              Submit Request
            </p>
          )}
        </button>
      </div>
    </div>
  );
};

export default ChatSupportScreen;
