// types/navigation.ts

// 1. You can keep your param types for when you pass data through
// URL search params or state (like in your TransactionDetails)
export type TransferDetails = {
  transferData: any;
};

export type Transaction = {
  transaction: any;
};

// 2. Useful for your Next.js Links or router.push() types
export type AuthRoutes =
  | "/screens/auth/LoginScreen"
  | "/screens/auth/SignUpScreen"
  | "/screens/auth/ForgotPasswordScreen";

export type AppRoutes =
  | "/dashboard"
  | "/dashboard/wallet"
  | "/dashboard/transfer"
  | "/dashboard/savings"
  | "/dashboard/profile";
