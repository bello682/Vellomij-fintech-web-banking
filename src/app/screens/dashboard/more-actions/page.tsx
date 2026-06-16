// "use client";

// import React from "react";
// import { useRouter } from "next/navigation";
// import {
//   IoArrowBack,
//   IoCardOutline,
//   IoStatsChartOutline,
//   IoWalletOutline,
//   IoPeopleOutline,
//   IoChatbubbleEllipsesOutline,
//   IoShieldCheckmarkOutline,
//   IoGiftOutline,
// } from "react-icons/io5";

// const features = [
//   {
//     label: "My Cards",
//     icon: <IoCardOutline size={24} />,
//     path: "/dashboard/cards",
//   },
//   {
//     label: "Analytics",
//     icon: <IoStatsChartOutline size={24} />,
//     path: "/dashboard/analytics",
//   },
//   {
//     label: "Savings",
//     icon: <IoWalletOutline size={24} />,
//     path: "/dashboard/savings",
//   },
//   {
//     label: "Referrals",
//     icon: <IoGiftOutline size={24} />,
//     path: "/dashboard/referrals",
//   },
//   {
//     label: "Support",
//     icon: <IoChatbubbleEllipsesOutline size={24} />,
//     path: "/dashboard/support",
//   },
//   {
//     label: "Security",
//     icon: <IoShieldCheckmarkOutline size={24} />,
//     path: "/dashboard/settings",
//   },
// ];

// export default function MoreActionsScreen() {
//   const router = useRouter();

//   return (
//     <div className="flex-1 bg-white min-h-screen p-5">
//       <div className="max-w-2xl mx-auto">
//         {/* Header */}
//         <div className="flex items-center mb-10">
//           <button onClick={() => router.back()} className="mr-4">
//             <IoArrowBack size={24} className="text-blue-900" />
//           </button>
//           <h1 className="text-[20px] font-extrabold text-blue-900">
//             More Features
//           </h1>
//         </div>

//         {/* Feature Grid */}
//         <div className="grid grid-cols-2 gap-4">
//           {features.map((item, index) => (
//             <button
//               key={index}
//               onClick={() => router.push(item.path)}
//               className="flex flex-col items-center justify-center p-6 bg-gray-50 rounded-[24px] border border-gray-100 hover:border-blue-200 transition-all active:scale-95"
//             >
//               <div className="w-[50px] h-[50px] rounded-full bg-white flex items-center justify-center text-blue-900 mb-4 shadow-sm">
//                 {item.icon}
//               </div>
//               <span className="text-[14px] font-bold text-blue-900">
//                 {item.label}
//               </span>
//             </button>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import React from "react";
import { useRouter } from "next/navigation";
import {
  IoArrowBack,
  IoCardOutline,
  IoStatsChartOutline,
  IoWalletOutline,
  IoGiftOutline,
  IoChatbubbleEllipsesOutline,
  IoShieldCheckmarkOutline,
  IoSwapHorizontalOutline,
  IoDocumentTextOutline,
  IoPhonePortraitOutline,
} from "react-icons/io5";

const features = [
  {
    label: "Transfers",
    icon: <IoSwapHorizontalOutline size={28} />,
    path: "/dashboard/transfers",
    color: "bg-blue-600",
    text: "text-white",
    span: "col-span-2",
  },
  {
    label: "Savings",
    icon: <IoWalletOutline size={24} />,
    path: "/dashboard/savings",
    color: "bg-white",
    text: "text-blue-900",
    span: "col-span-1",
  },
  {
    label: "Bills",
    icon: <IoPhonePortraitOutline size={24} />,
    path: "/dashboard/payments/bills",
    color: "bg-white",
    text: "text-blue-900",
    span: "col-span-1",
  },
  {
    label: "Analytics",
    icon: <IoStatsChartOutline size={24} />,
    path: "/dashboard/analytics",
    color: "bg-white",
    text: "text-blue-900",
    span: "col-span-1",
  },
  {
    label: "Cards",
    icon: <IoCardOutline size={24} />,
    path: "/dashboard/cards",
    color: "bg-white",
    text: "text-blue-900",
    span: "col-span-1",
  },
  {
    label: "Security",
    icon: <IoShieldCheckmarkOutline size={24} />,
    path: "/dashboard/settings",
    color: "bg-emerald-500",
    text: "text-white",
    span: "col-span-2",
  },
  {
    label: "Help",
    icon: <IoChatbubbleEllipsesOutline size={20} />,
    path: "/dashboard/support",
    color: "bg-white",
    text: "text-blue-900",
    span: "col-span-1",
  },
  {
    label: "Docs",
    icon: <IoDocumentTextOutline size={20} />,
    path: "/dashboard/statements",
    color: "bg-white",
    text: "text-blue-900",
    span: "col-span-1",
  },
];

export default function MoreActionsScreen() {
  const router = useRouter();

  return (
    <div className="flex-1 bg-gray-100 min-h-screen">
      <div className="max-w-2xl mx-auto p-5">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => router.back()}
            className="p-3 bg-white rounded-full shadow-sm"
          >
            <IoArrowBack size={24} className="text-blue-900" />
          </button>
          <h1 className="text-[18px] font-extrabold text-blue-900 uppercase tracking-widest">
            Dashboard
          </h1>
          <div className="w-12" /> {/* Spacer for alignment */}
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-2 gap-4 auto-rows-[140px]">
          {features.map((item, i) => (
            <button
              key={i}
              onClick={() => router.push(item.path)}
              className={`${item.span} ${item.color} ${item.text} rounded-[32px] p-6 flex flex-col justify-between shadow-lg shadow-gray-200/50 hover:scale-[1.02] transition-transform`}
            >
              <div className="bg-white/20 w-fit p-3 rounded-2xl backdrop-blur-sm">
                {item.icon}
              </div>
              <span className="text-[16px] font-bold">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ("use client");

// import React from "react";
// import { useRouter } from "next/navigation";
// import {
//   IoArrowBack,
//   IoCardOutline,
//   IoStatsChartOutline,
//   IoWalletOutline,
//   IoGiftOutline,
//   IoChatbubbleEllipsesOutline,
//   IoShieldCheckmarkOutline,
//   IoSwapHorizontalOutline,
//   IoDocumentTextOutline,
//   IoPhonePortraitOutline,
// } from "react-icons/io5";

// const features = [
//   {
//     label: "Transfers",
//     icon: <IoSwapHorizontalOutline size={28} />,
//     path: "/dashboard/transfers",
//     color: "bg-blue-600",
//     text: "text-white",
//     span: "col-span-2",
//   },
//   {
//     label: "Savings",
//     icon: <IoWalletOutline size={24} />,
//     path: "/dashboard/savings",
//     color: "bg-white",
//     text: "text-blue-900",
//     span: "col-span-1",
//   },
//   {
//     label: "Bills",
//     icon: <IoPhonePortraitOutline size={24} />,
//     path: "/dashboard/payments/bills",
//     color: "bg-white",
//     text: "text-blue-900",
//     span: "col-span-1",
//   },
//   {
//     label: "Analytics",
//     icon: <IoStatsChartOutline size={24} />,
//     path: "/dashboard/analytics",
//     color: "bg-white",
//     text: "text-blue-900",
//     span: "col-span-1",
//   },
//   {
//     label: "Cards",
//     icon: <IoCardOutline size={24} />,
//     path: "/dashboard/cards",
//     color: "bg-white",
//     text: "text-blue-900",
//     span: "col-span-1",
//   },
//   {
//     label: "Security",
//     icon: <IoShieldCheckmarkOutline size={24} />,
//     path: "/dashboard/settings",
//     color: "bg-emerald-500",
//     text: "text-white",
//     span: "col-span-2",
//   },
//   {
//     label: "Help",
//     icon: <IoChatbubbleEllipsesOutline size={20} />,
//     path: "/dashboard/support",
//     color: "bg-white",
//     text: "text-blue-900",
//     span: "col-span-1",
//   },
//   {
//     label: "Docs",
//     icon: <IoDocumentTextOutline size={20} />,
//     path: "/dashboard/statements",
//     color: "bg-white",
//     text: "text-blue-900",
//     span: "col-span-1",
//   },
// ];

// export default function MoreActionsScreen() {
//   const router = useRouter();

//   return (
//     <div className="flex-1 bg-gray-100 min-h-screen">
//       <div className="max-w-2xl mx-auto p-5">
//         {/* Header */}
//         <div className="flex items-center justify-between mb-8">
//           <button
//             onClick={() => router.back()}
//             className="p-3 bg-white rounded-full shadow-sm"
//           >
//             <IoArrowBack size={24} className="text-blue-900" />
//           </button>
//           <h1 className="text-[18px] font-extrabold text-blue-900 uppercase tracking-widest">
//             Dashboard
//           </h1>
//           <div className="w-12" /> {/* Spacer for alignment */}
//         </div>

//         {/* Bento Grid Layout */}
//         <div className="grid grid-cols-2 gap-4 auto-rows-[140px]">
//           {features.map((item, i) => (
//             <button
//               key={i}
//               onClick={() => router.push(item.path)}
//               className={`${item.span} ${item.color} ${item.text} rounded-[32px] p-6 flex flex-col justify-between shadow-lg shadow-gray-200/50 hover:scale-[1.02] transition-transform`}
//             >
//               <div className="bg-white/20 w-fit p-3 rounded-2xl backdrop-blur-sm">
//                 {item.icon}
//               </div>
//               <span className="text-[16px] font-bold">{item.label}</span>
//             </button>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }
