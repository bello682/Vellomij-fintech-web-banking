// # KycIntroScreen
"use client";

import { useRouter } from "next/navigation";
import {
  IoShieldCheckmark,
  IoDocumentTextOutline,
  IoCameraOutline,
} from "react-icons/io5";

export default function KycIntroPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6">
      <div className="max-w-md w-full flex flex-col items-center text-center">
        {/* Header Icon */}
        <div className="w-20 h-20 rounded-full bg-blue-50 flex items-center justify-center mb-6">
          <IoShieldCheckmark size={40} className="text-blue-600" />
        </div>

        <h1 className="text-2xl font-extrabold text-blue-900 mb-4">
          Verify your identity
        </h1>
        <p className="text-gray-500 mb-10 leading-relaxed">
          To protect your account and follow regulations, we need a few more
          details.
        </p>

        {/* Steps */}
        <div className="w-full space-y-6 mb-10 text-left">
          <div className="flex items-center bg-gray-50 p-5 rounded-2xl">
            <IoDocumentTextOutline size={24} className="text-blue-600" />
            <div className="ml-4">
              <p className="font-bold text-blue-900">Personal Information</p>
              <p className="text-xs text-gray-500">
                Provide your BVN and employment details.
              </p>
            </div>
          </div>

          <div className="flex items-center bg-gray-50 p-5 rounded-2xl">
            <IoCameraOutline size={24} className="text-blue-600" />
            <div className="ml-4">
              <p className="font-bold text-blue-900">Document Upload</p>
              <p className="text-xs text-gray-500">
                Take a clear photo of your Government ID.
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={() => router.push("/dashboard/kyc/upload")}
          className="w-full h-14 bg-blue-600 rounded-2xl text-white font-bold hover:bg-blue-700 transition-colors"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
