// // # WalletScreen
// "use client";

// import React, { useState, useEffect } from "react";
// import { useDispatch } from "react-redux";
// import {
//   IoAdd,
//   IoWifi,
//   IoCopyOutline,
//   IoCart,
//   IoFastFood,
//   IoBus,
//   IoBulb,
//   IoLockClosedOutline,
//   IoGlobeOutline,
// } from "react-icons/io5";

// // Import your hooks and components
// import { useAppSelector } from "../../hooks/useTypedSelector";
// import { getWalletDetails } from "../../store/auth/action/dashboard/walletAction";
// import { AppDispatch } from "../../store/auth/store";
// import { showToast } from "@/components/common/toastMessage";
// import KYCGuard from "@/components/kyc/KYCGuard";

// const WalletScreen = () => {
//   const dispatch = useDispatch<AppDispatch>();
//   const { walletData } = useAppSelector((state) => state.walletState);
//   const { data: dashboardData } = useAppSelector((state) => state.dashboard);
//   const { user } = useAppSelector((state) => state.loginState);

//   useEffect(() => {
//     dispatch(getWalletDetails());
//   }, [dispatch]);

//   const copyToClipboard = (text: string) => {
//     navigator.clipboard.writeText(text);
//     showToast("success", "Account number copied!");
//   };

//   return (
//     <KYCGuard>
//       <div className="flex-1 bg-white min-h-screen">
//         {/* Header */}
//         <div className="flex justify-between items-center p-5">
//           <h1 className="text-[22px] font-extrabold text-blue-900">
//             My Wallet
//           </h1>
//           <button
//             onClick={() => showToast("info", "Funding feature opening...")}
//             className="bg-blue-600 w-[38px] h-[38px] rounded-[12px] flex items-center justify-center"
//           >
//             <IoAdd size={24} className="text-white" />
//           </button>
//         </div>

//         <div className="p-5">
//           {/* Virtual Card */}
//           <div className="h-[210px] bg-[#121212] rounded-[24px] p-6 flex flex-col justify-between shadow-2xl">
//             <div className="flex justify-between">
//               <span className="text-white opacity-70 font-medium text-[14px]">
//                 Virtual Debit Card
//               </span>
//               <IoWifi size={22} className="text-white rotate-90" />
//             </div>

//             <p className="text-white text-[24px] font-bold tracking-[3px] my-5">
//               **** **** **** {dashboardData?.accountNumber?.slice(-4) || "8821"}
//             </p>

//             <div className="flex justify-between items-end">
//               <div>
//                 <p className="text-white opacity-40 text-[10px] font-bold mb-1">
//                   BALANCE
//                 </p>
//                 <p className="text-white text-[18px] font-bold">
//                   ₦{dashboardData?.wallet?.balance || "0.00"}
//                 </p>
//               </div>
//               <div className="flex">
//                 <div className="w-[28px] h-[28px] rounded-full bg-[#EB5757] -mr-2" />
//                 <div className="w-[28px] h-[28px] rounded-full bg-[#F2C94C] opacity-80" />
//               </div>
//             </div>
//           </div>

//           {/* Funding Info */}
//           <h2 className="text-[18px] font-extrabold text-blue-900 mt-[30px] mb-[15px]">
//             Receive Money
//           </h2>
//           <div className="bg-gray-50 p-[18px] rounded-[20px] border border-gray-200">
//             <div className="flex justify-between items-center">
//               <span className="text-[14px] font-semibold text-blue-900">
//                 Virtual Account
//               </span>
//               <button
//                 onClick={() =>
//                   copyToClipboard(dashboardData?.accountNumber || "")
//                 }
//               >
//                 <span className="text-[14px] font-bold text-blue-600">
//                   {dashboardData?.accountNumber || "---"}{" "}
//                   <IoCopyOutline size={14} className="inline" />
//                 </span>
//               </button>
//             </div>
//             <p className="text-[12px] text-gray-500 mt-[6px]">
//               Bank: Wema Bank • Name: {user?.fullName}
//             </p>
//           </div>

//           {/* Analytics */}
//           <h2 className="text-[18px] font-extrabold text-blue-900 mt-[30px] mb-[15px]">
//             Spending Analytics
//           </h2>
//           <div className="flex flex-wrap justify-between">
//             <CategoryItem
//               icon={<IoCart />}
//               label="Shopping"
//               amount="₦0.00"
//               color="bg-red-50"
//               iconColor="text-red-500"
//             />
//             <CategoryItem
//               icon={<IoFastFood />}
//               label="Food"
//               amount="₦0.00"
//               color="bg-blue-50"
//               iconColor="text-blue-500"
//             />
//             <CategoryItem
//               icon={<IoBus />}
//               label="Transport"
//               amount="₦0.00"
//               color="bg-green-50"
//               iconColor="text-green-500"
//             />
//             <CategoryItem
//               icon={<IoBulb />}
//               label="Utilities"
//               amount="₦0.00"
//               color="bg-orange-50"
//               iconColor="text-orange-500"
//             />
//           </div>

//           {/* Settings */}
//           <div className="mt-2 mb-10">
//             <h2 className="text-[18px] font-extrabold text-blue-900 mb-[15px]">
//               Security Settings
//             </h2>
//             <SettingsToggle
//               icon={<IoLockClosedOutline />}
//               label="Freeze Card"
//               value={false}
//             />
//             <SettingsToggle
//               icon={<IoGlobeOutline />}
//               label="International Spend"
//               value={true}
//             />
//           </div>
//         </div>
//       </div>
//     </KYCGuard>
//   );
// };

// const CategoryItem = ({ icon, label, amount, color, iconColor }: any) => (
//   <div className="w-[48%] bg-gray-50 p-[15px] rounded-[20px] mb-[15px] border border-gray-100">
//     <div
//       className={`w-[42px] h-[42px] rounded-[14px] ${color} flex items-center justify-center mb-[10px]`}
//     >
//       <div className={iconColor}>{icon}</div>
//     </div>
//     <p className="text-[12px] text-gray-500 font-medium">{label}</p>
//     <p className="text-[16px] font-extrabold text-blue-900 mt-1">{amount}</p>
//   </div>
// );

// const SettingsToggle = ({ icon, label, value }: any) => (
//   <div className="flex items-center py-[15px]">
//     <div className="text-blue-900">{icon}</div>
//     <span className="flex-1 ml-[15px] text-[15px] text-blue-900 font-medium">
//       {label}
//     </span>
//     <div
//       className={`w-[44px] h-[24px] rounded-full p-[2px] flex ${value ? "bg-blue-600" : "bg-gray-200"}`}
//     >
//       <div
//         className={`w-[20px] h-[20px] rounded-full bg-white ${value ? "ml-auto" : ""}`}
//       />
//     </div>
//   </div>
// );

// export default WalletScreen;

"use client";

import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  IoAdd,
  IoWifi,
  IoCopyOutline,
  IoCart,
  IoFastFood,
  IoBus,
  IoBulb,
  IoLockClosedOutline,
  IoGlobeOutline,
} from "react-icons/io5";

import { useAppSelector } from "../../hooks/useTypedSelector";
import { AppDispatch } from "../../store/auth/store";
import { showToast } from "@/components/common/toastMessage";
import KYCGuard from "@/components/kyc/KYCGuard";

// --- MOCK SERVICE DATA ---
const getMockWalletData = (isFunded: boolean) => ({
  balance: isFunded ? "125,500.00" : "0.00",
  accountNumber: "0098765432",
  spending: {
    shopping: isFunded ? "25,000.00" : "0.00",
    food: isFunded ? "12,500.00" : "0.00",
    transport: isFunded ? "8,200.00" : "0.00",
    utilities: isFunded ? "5,000.00" : "0.00",
  },
  cardSettings: { isFrozen: false, internationalSpend: true },
});

const WalletScreen = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useAppSelector((state) => state.loginState);

  // Local state to simulate wallet status
  const [isFunded, setIsFunded] = useState(false);
  const [wallet, setWallet] = useState(getMockWalletData(false));

  useEffect(() => {
    setWallet(getMockWalletData(isFunded));
  }, [isFunded]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    showToast("success", "Account number copied!");
  };

  return (
    <KYCGuard>
      <div className="flex-1 bg-white min-h-screen">
        <div className="flex justify-between items-center p-5">
          <h1 className="text-[22px] font-extrabold text-blue-900">
            My Wallet
          </h1>
          <div className="flex gap-2">
            <button
              onClick={() => setIsFunded(!isFunded)}
              className="text-[10px] bg-gray-100 px-2 rounded border"
            >
              Test: {isFunded ? "Funded" : "Empty"}
            </button>
            <button
              onClick={() => showToast("info", "Funding feature opening...")}
              className="bg-blue-600 w-[38px] h-[38px] rounded-[12px] flex items-center justify-center"
            >
              <IoAdd size={24} className="text-white" />
            </button>
          </div>
        </div>

        <div className="p-5">
          <div className="h-[210px] bg-[#121212] rounded-[24px] p-6 flex flex-col justify-between shadow-2xl">
            <div className="flex justify-between">
              <span className="text-white opacity-70 font-medium text-[14px]">
                Virtual Debit Card
              </span>
              <IoWifi size={22} className="text-white rotate-90" />
            </div>
            <p className="text-white text-[24px] font-bold tracking-[3px] my-5">
              **** **** **** {wallet.accountNumber.slice(-4)}
            </p>
            <div className="flex justify-between items-end">
              <div>
                <p className="text-white opacity-40 text-[10px] font-bold mb-1">
                  BALANCE
                </p>
                <p className="text-white text-[18px] font-bold">
                  ₦{wallet.balance}
                </p>
              </div>
            </div>
          </div>

          <h2 className="text-[18px] font-extrabold text-blue-900 mt-[30px] mb-[15px]">
            Receive Money
          </h2>
          <div className="bg-gray-50 p-[18px] rounded-[20px] border border-gray-200">
            <div className="flex justify-between items-center">
              <span className="text-[14px] font-semibold text-blue-900">
                Virtual Account
              </span>
              <button onClick={() => copyToClipboard(wallet.accountNumber)}>
                <span className="text-[14px] font-bold text-blue-600">
                  {wallet.accountNumber}{" "}
                  <IoCopyOutline size={14} className="inline" />
                </span>
              </button>
            </div>
            <p className="text-[12px] text-gray-500 mt-[6px]">
              Bank: Wema Bank • Name: {user?.fullName || "User"}
            </p>
          </div>

          <h2 className="text-[18px] font-extrabold text-blue-900 mt-[30px] mb-[15px]">
            Spending Analytics
          </h2>
          <div className="flex flex-wrap justify-between">
            <CategoryItem
              icon={<IoCart />}
              label="Shopping"
              amount={`₦${wallet.spending.shopping}`}
              color="bg-red-50"
              iconColor="text-red-500"
            />
            <CategoryItem
              icon={<IoFastFood />}
              label="Food"
              amount={`₦${wallet.spending.food}`}
              color="bg-blue-50"
              iconColor="text-blue-500"
            />
            <CategoryItem
              icon={<IoBus />}
              label="Transport"
              amount={`₦${wallet.spending.transport}`}
              color="bg-green-50"
              iconColor="text-green-500"
            />
            <CategoryItem
              icon={<IoBulb />}
              label="Utilities"
              amount={`₦${wallet.spending.utilities}`}
              color="bg-orange-50"
              iconColor="text-orange-500"
            />
          </div>

          <div className="mt-2 mb-10">
            <h2 className="text-[18px] font-extrabold text-blue-900 mb-[15px]">
              Security Settings
            </h2>
            <SettingsToggle
              icon={<IoLockClosedOutline />}
              label="Freeze Card"
              value={wallet.cardSettings.isFrozen}
            />
            <SettingsToggle
              icon={<IoGlobeOutline />}
              label="International Spend"
              value={wallet.cardSettings.internationalSpend}
            />
          </div>
        </div>
      </div>
    </KYCGuard>
  );
};

const CategoryItem = ({ icon, label, amount, color, iconColor }: any) => (
  <div className="w-[48%] bg-gray-50 p-[15px] rounded-[20px] mb-[15px] border border-gray-100">
    <div
      className={`w-[42px] h-[42px] rounded-[14px] ${color} flex items-center justify-center mb-[10px]`}
    >
      <div className={iconColor}>{icon}</div>
    </div>
    <p className="text-[12px] text-gray-500 font-medium">{label}</p>
    <p className="text-[16px] font-extrabold text-blue-900 mt-1">{amount}</p>
  </div>
);

const SettingsToggle = ({ icon, label, value }: any) => (
  <div className="flex items-center py-[15px]">
    <div className="text-blue-900">{icon}</div>
    <span className="flex-1 ml-[15px] text-[15px] text-blue-900 font-medium">
      {label}
    </span>
    <div
      className={`w-[44px] h-[24px] rounded-full p-[2px] flex ${value ? "bg-blue-600" : "bg-gray-200"}`}
    >
      <div
        className={`w-[20px] h-[20px] rounded-full bg-white ${value ? "ml-auto" : ""}`}
      />
    </div>
  </div>
);

export default WalletScreen;
