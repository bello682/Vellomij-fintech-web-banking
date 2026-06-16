// "use client";

// import React, { useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { useAppSelector } from "../../app/hooks/useTypedSelector"; // Adjust path if needed

// interface KYCGuardProps {
//   children: React.ReactNode;
// }

// const KYCGuard = ({ children }: KYCGuardProps) => {
//   const router = useRouter();
//   const { data: dashboardData } = useAppSelector((state) => state.dashboard);
//   const kyc_status = dashboardData?.user?.verificationStatus || "pending";

//   useEffect(() => {
//     // On the web, we check this as soon as the component mounts
//     if (kyc_status !== "verified") {
//       const confirmVerify = window.confirm(
//         "Verification Required\n\nPlease complete your KYC to access transfer features and secure your account.",
//       );

//       if (confirmVerify) {
//         // "Verify Now"
//         router.push("/dashboard/kyc/intro");
//       } else {
//         // "Later"
//         router.push("/dashboard");
//       }
//     }
//   }, [kyc_status, router]);

//   return (
//     <div style={{ position: "relative", minHeight: "100%" }}>
//       {/* Always render the children */}
//       {children}

//       {/* Visual Overlay if not verified */}
//       {kyc_status !== "verified" && (
//         <div
//           style={{
//             position: "absolute",
//             top: 0,
//             left: 0,
//             right: 0,
//             bottom: 0,
//             backgroundColor: "rgba(0,0,0,0.3)",
//             zIndex: 1000,
//             pointerEvents: "none", // Allows user to interact with the alert
//           }}
//         />
//       )}
//     </div>
//   );
// };

// export default KYCGuard;

"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "../../app/hooks/useTypedSelector";

interface KYCGuardProps {
  children: React.ReactNode;
}

const KYCGuard = ({ children }: KYCGuardProps) => {
  const router = useRouter();
  const { data: dashboardData } = useAppSelector((state) => state.dashboard);
  const kyc_status = dashboardData?.user?.verificationStatus || "pending";

  // We don't need window.confirm anymore, the UI will handle the choice
  const isUnverified = kyc_status !== "verified";

  return (
    <div style={{ position: "relative", minHeight: "100vh" }}>
      {children}

      {/* Persistent Modal Overlay */}
      {isUnverified && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.7)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "24px",
              borderRadius: "16px",
              maxWidth: "350px",
              width: "90%",
              textAlign: "center",
              boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
            }}
          >
            <h2
              style={{
                fontSize: "18px",
                fontWeight: "bold",
                marginBottom: "15px",
              }}
            >
              Verification Required
            </h2>
            <p
              style={{ fontSize: "14px", color: "#666", marginBottom: "25px" }}
            >
              Please complete your KYC to access transfer features and secure
              your account.
            </p>

            <button
              onClick={() => router.push("/dashboard/kyc/intro")}
              style={{
                display: "block",
                width: "100%",
                padding: "12px",
                backgroundColor: "#007AFF",
                color: "white",
                borderRadius: "8px",
                fontWeight: "bold",
                marginBottom: "10px",
              }}
            >
              Verify Now
            </button>

            <button
              onClick={() => router.push("/dashboard")}
              style={{
                display: "block",
                width: "100%",
                padding: "12px",
                backgroundColor: "#F2F2F7",
                color: "#333",
                borderRadius: "8px",
              }}
            >
              Later
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default KYCGuard;
