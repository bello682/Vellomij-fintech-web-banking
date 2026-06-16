"use client";

import React, { useEffect } from "react";
import { useParams } from "next/navigation";
import { useAppSelector } from "@/app/hooks/useTypedSelector";
import { useDispatch } from "react-redux";
import { getTransactionHistory } from "../../../../../store/auth/action/dashboard/walletAction";
import TransactionDetailsScreen from "../TransactionDetailsScreen";
import LoadingOverlay from "@/components/common/AppLoader";

export default function TransactionPage() {
  const { id } = useParams();

  const dispatch = useDispatch();

  // Accessing the data from walletState as you confirmed this is where the transactions live
  const { transactions, loading_now: isLoading } = useAppSelector(
    (state) => state.walletState,
  );

  // ADD THIS: Fetch if transactions are missing (handle page refresh)
  useEffect(() => {
    if (!transactions || transactions.length === 0) {
      dispatch(getTransactionHistory() as any);
    }
  }, [dispatch, transactions]);

  // Find the specific transaction by ID
  const transaction = transactions?.find((t: any) => t.id === id);

  // If the data is currently loading from the API, show the overlay
  if (isLoading) {
    return <LoadingOverlay visible={true} message="Loading receipt..." />;
  }

  // If loading is finished and we still haven't found the transaction,
  // it might be missing or the ID is invalid
  if (!transaction) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-gray-600">
          Transaction not found. Please go back to the dashboard.
        </p>
      </div>
    );
  }

  return <TransactionDetailsScreen transaction={transaction} />;
}

// "use client";

// import React, { useEffect } from "react";
// import { useSearchParams } from "next/navigation"; // Only need this
// import { useAppSelector } from "@/app/hooks/useTypedSelector";
// import { useDispatch } from "react-redux";
// import { getTransactionHistory } from "../../../../../store/auth/action/dashboard/walletAction";
// import TransactionDetailsScreen from "../TransactionDetailsScreen";
// import LoadingOverlay from "@/components/common/AppLoader";

// export default function TransactionPage() {
//   const searchParams = useSearchParams();
//   const id = searchParams.get("id"); // This safely retrieves the 'id' from the URL

//   const dispatch = useDispatch();

//   const { transactions, loading_now: isLoading } = useAppSelector(
//     (state) => state.walletState,
//   );

//   useEffect(() => {
//     if (!transactions || transactions.length === 0) {
//       dispatch(getTransactionHistory() as any);
//     }
//   }, [dispatch, transactions]);

//   // Find the specific transaction
//   const transaction = transactions?.find((t: any) => t.id === id);

//   if (isLoading) {
//     return <LoadingOverlay visible={true} message="Loading receipt..." />;
//   }

//   if (!transaction) {
//     return (
//       <div className="flex h-screen items-center justify-center">
//         <p className="text-gray-600">Transaction not found. ID: {id}</p>
//       </div>
//     );
//   }

//   return <TransactionDetailsScreen transaction={transaction} />;
// }
