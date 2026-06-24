# 🚀 Vellomij Fintech Dashboard

A secure, mobile-first fintech dashboard built to provide users with seamless financial management, real-time transaction tracking, and secure fund transfers.

## 🌟 Key Features

- **Secure Authentication**: Robust user access and session management.
- **Real-time Transfers**: Instant bank account and @Tag (peer-to-peer) transfers.
- **Paystack Integration**: Automated, reliable bank verification and processing.
- **Transaction History**: Comprehensive ledger with search, filtering, and status tracking.
- **Digital Receipts**: Shareable, printable transaction receipts with QR verification.
- **Responsive UI**: Optimized for mobile and desktop viewing.

## 🛠 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **State Management**: Redux Toolkit
- **Styling**: Tailwind CSS
- **Language**: TypeScript

## 📂 Project Structure

```text
app/dashboard/
├── layout.tsx            # Main Dashboard Layout
├── wallet/               # WalletScreen
├── notifications/        # NotificationsScreen
├── transactions/         # TransactionHistoryScreen
│   └── [id]/             # TransactionDetailsScreen
├── transfers/            # TransferScreen
│   ├── confirm/          # TransferConfirmScreen
│   └── success/          # TransferSuccessScreen
├── savings/              # SavingsScreen
├── kyc/                  # KYC & Identity Verification
├── payments/             # Airtime, Bills, Data
├── profile/              # Profile Management
├── settings/             # Security, Pin, Delete Account
└── support/              # Chat & Help Center
```

## 📂 Note: 🛠️ Development & Deployment Notes

Email Services: Due to Render's free tier restrictions, automated emails may experience delays or be blocked.

OTP Verification: For testing purposes, if you are not receiving the verification email, the OTP is currently being logged to the server console. In the development build, the OTP is also returned in the registration response to allow for seamless testing on mobile devices.
