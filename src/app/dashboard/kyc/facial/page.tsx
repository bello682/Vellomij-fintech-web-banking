// # FacialVerificationScreen
"use client";

import { useRouter } from "next/navigation";
import { IoTimeOutline } from "react-icons/io5";

export default function FacialVerificationPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-6 text-center">
      <IoTimeOutline size={100} className="text-orange-500" />

      <h1 className="text-2xl font-extrabold text-blue-900 mt-5">
        Review in Progress
      </h1>

      <p className="text-gray-500 mt-2 max-w-sm leading-relaxed">
        We are verifying your documents. This usually takes between 1 to 24
        hours. We will notify you once it's done!
      </p>

      <button
        onClick={() => router.push("/dashboard")}
        className="mt-10 px-10 h-[50px] bg-blue-900 text-white font-bold rounded-xl hover:bg-blue-800 transition-colors"
      >
        Back to Dashboard
      </button>
    </div>
  );
}

// ("use client");

// import React, { useRef, useEffect } from "react";
// import { useRouter } from "next/navigation";

// export default function FacialVerificationPage() {
//   const videoRef = useRef<HTMLVideoElement>(null);
//   const router = useRouter();

//   useEffect(() => {
//     // Request access to the user's camera
//     async function startCamera() {
//       try {
//         const stream = await navigator.mediaDevices.getUserMedia({
//           video: true,
//         });
//         if (videoRef.current) {
//           videoRef.current.srcObject = stream;
//         }
//       } catch (err) {
//         console.error("Camera access denied", err);
//       }
//     }
//     startCamera();
//   }, []);

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-black p-6">
//       <h2 className="text-white text-xl font-bold mb-8">
//         Position your face in the circle
//       </h2>

//       {/* The Camera Feed */}
//       <div className="relative w-72 h-72 rounded-full overflow-hidden border-4 border-blue-500">
//         <video
//           ref={videoRef}
//           autoPlay
//           playsInline
//           className="w-full h-full object-cover scale-x-[-1]"
//         />
//       </div>

//       <button
//         onClick={() => router.push("/dashboard/kyc/status")}
//         className="mt-12 px-8 py-4 bg-blue-600 text-white rounded-full font-bold"
//       >
//         Capture Selfie
//       </button>
//     </div>
//   );
// }
