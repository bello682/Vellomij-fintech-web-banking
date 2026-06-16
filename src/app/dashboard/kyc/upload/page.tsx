// // # DocumentUploadScreen
// "use client";

// import React, { useState, useRef } from "react";
// import { useRouter } from "next/navigation";
// import {
//   IoArrowBack,
//   IoCameraOutline,
//   IoCalendarOutline,
// } from "react-icons/io5";

// export default function DocumentUploadPage() {
//   const router = useRouter();
//   const fileInputRef = useRef<HTMLInputElement>(null);

//   const [image, setImage] = useState<File | null>(null);
//   const [preview, setPreview] = useState<string | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [form, setForm] = useState({
//     documentType: "idCard",
//     occupation: "",
//     address: "",
//     dateOfBirth: "",
//     bvn: "",
//     phoneNumber: "",
//     placeOfWork: "",
//   });

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//       const file = e.target.files[0];
//       setImage(file);
//       setPreview(URL.createObjectURL(file));
//     }
//   };

//   const handleSubmit = async () => {
//     if (!image || form.bvn.length < 11) {
//       alert("Please upload an image and enter a valid 11-digit BVN");
//       return;
//     }

//     setLoading(true);

//     // Construct FormData exactly like your mobile version
//     const formData = new FormData();
//     Object.entries(form).forEach(([key, value]) => formData.append(key, value));
//     formData.append("documentImage", image);

//     try {
//       // Replace with your actual API call or Redux action
//       // const res = await dispatch(updateKyc(formData));
//       console.log("Submitting form data...");
//       router.push("/dashboard/kyc/facial");
//     } catch (error) {
//       alert("Submission failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-2xl mx-auto p-6 bg-white min-h-screen">
//       <div className="flex items-center mb-8">
//         <button
//           onClick={() => router.back()}
//           className="p-2 hover:bg-gray-100 rounded-full"
//         >
//           <IoArrowBack size={24} className="text-blue-900" />
//         </button>
//         <h2 className="text-2xl font-extrabold text-blue-900 ml-4">
//           Verification Details
//         </h2>
//       </div>

//       {/* Doc Type Selection */}
//       <div className="mb-6">
//         <p className="text-xs font-bold text-blue-600 tracking-wider mb-4">
//           SELECT DOCUMENT TYPE
//         </p>
//         <div className="flex gap-2">
//           {[
//             { id: "idCard", label: "National ID" },
//             { id: "passport", label: "Passport" },
//             { id: "driverLicense", label: "Driver License" },
//           ].map((type) => (
//             <button
//               key={type.id}
//               onClick={() => setForm({ ...form, documentType: type.id })}
//               className={`flex-1 py-3 rounded-xl border ${form.documentType === type.id ? "bg-blue-600 text-white border-blue-600" : "bg-gray-50 border-gray-200"}`}
//             >
//               <span className="text-xs font-bold">{type.label}</span>
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* Inputs */}
//       <div className="space-y-4">
//         <div>
//           <label className="block text-sm font-semibold text-blue-900 mb-2">
//             Phone Number
//           </label>
//           <input
//             className="w-full p-4 bg-gray-50 rounded-xl border border-gray-200"
//             onChange={(e) => setForm({ ...form, phoneNumber: e.target.value })}
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-semibold text-blue-900 mb-2">
//             BVN
//           </label>
//           <input
//             maxLength={11}
//             className="w-full p-4 bg-gray-50 rounded-xl border border-gray-200"
//             onChange={(e) => setForm({ ...form, bvn: e.target.value })}
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-semibold text-blue-900 mb-2">
//             Date of Birth
//           </label>
//           <input
//             type="date"
//             className="w-full p-4 bg-gray-50 rounded-xl border border-gray-200"
//             onChange={(e) => setForm({ ...form, dateOfBirth: e.target.value })}
//           />
//         </div>
//       </div>

//       {/* File Upload */}
//       <div className="mt-8">
//         <p className="text-xs font-bold text-blue-600 tracking-wider mb-4">
//           DOCUMENT UPLOAD
//         </p>
//         <div
//           onClick={() => fileInputRef.current?.click()}
//           className="h-48 border-2 border-dashed border-blue-600 rounded-2xl flex flex-col items-center justify-center cursor-pointer bg-gray-50 overflow-hidden"
//         >
//           <input
//             type="file"
//             ref={fileInputRef}
//             onChange={handleFileChange}
//             className="hidden"
//             accept="image/*"
//           />
//           {preview ? (
//             <img src={preview} alt="preview" className="h-full object-cover" />
//           ) : (
//             <>
//               <IoCameraOutline size={40} className="text-blue-600" />
//               <p className="text-sm font-bold text-blue-600 mt-2">
//                 Tap to select ID
//               </p>
//             </>
//           )}
//         </div>
//       </div>

//       <button
//         disabled={loading}
//         onClick={handleSubmit}
//         className="w-full mt-10 py-5 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 disabled:opacity-50"
//       >
//         {loading ? "Uploading..." : "Submit for Verification"}
//       </button>
//     </div>
//   );
// }

"use client";

import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import {
  IoArrowBack,
  IoCameraOutline,
  IoCalendarOutline,
} from "react-icons/io5";
import { updateKyc } from "../../../store/auth/action/kycUser.Action"; // Adjust path as needed
import { colors } from "../../../theme/colors"; // Adjust path as needed
import LoadingOverlay from "../../../../components/common/AppLoader"; // Adjust path as needed

export default function DocumentUploadPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { loadingKyc } = useSelector((state: any) => state.kyc);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [form, setForm] = useState({
    documentType: "idCard",
    occupation: "",
    address: "",
    dateOfBirth: new Date(),
    bvn: "",
    phoneNumber: "",
    placeOfWork: "",
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const validateForm = () => {
    if (!image) return "Please upload an ID document image.";
    if (!form.phoneNumber) return "Phone number is required.";
    if (!form.bvn || form.bvn.length !== 11)
      return "Please enter a valid 11-digit BVN.";
    if (!form.occupation) return "Occupation is required.";
    if (!form.placeOfWork) return "Place of work is required.";
    if (!form.address) return "Residential address is required.";
    return null;
  };

  const handleSubmit = async () => {
    const errorMessage = validateForm();
    if (errorMessage) {
      alert(errorMessage);
      return;
    }

    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      formData.append(key, value instanceof Date ? value.toISOString() : value);
    });
    formData.append("documentImage", image as any);

    try {
      const success = await dispatch(updateKyc(formData) as any);
      if (success) {
        router.push("/dashboard/kyc/facial");
      }
    } catch (error: any) {
      console.error("Submission failed", error);
      alert("Verification Failed: Check your input and try again.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white min-h-screen">
      <LoadingOverlay
        visible={loadingKyc}
        message="Uploading your documents..."
      />

      <div className="flex items-center mb-8">
        <button
          onClick={() => router.back()}
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          <IoArrowBack size={24} className="text-[#1e3a8a]" />
        </button>
        <h2 className="text-2xl font-extrabold text-[#1e3a8a] ml-4">
          Verification Details
        </h2>
      </div>

      {/* Doc Type Selection */}
      <p className="text-xs font-bold text-blue-600 tracking-wider mb-4">
        SELECT DOCUMENT TYPE
      </p>
      <div className="flex gap-2 mb-8">
        {[
          { id: "idCard", label: "National ID" },
          { id: "passport", label: "Passport" },
          { id: "driverLicense", label: "Driver License" },
        ].map((type) => (
          <button
            key={type.id}
            onClick={() => setForm({ ...form, documentType: type.id })}
            className={`flex-1 py-3 rounded-xl border ${form.documentType === type.id ? "bg-blue-600 text-white border-blue-600" : "bg-gray-50 border-gray-200"}`}
          >
            <span className="text-xs font-bold">{type.label}</span>
          </button>
        ))}
      </div>

      {/* Personal Information Inputs */}
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-[#1e3a8a] mb-2">
            Phone Number
          </label>
          <input
            className="w-full p-4 bg-gray-50 rounded-xl border border-gray-200"
            onChange={(e) => setForm({ ...form, phoneNumber: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-[#1e3a8a] mb-2">
            BVN
          </label>
          <input
            maxLength={11}
            className="w-full p-4 bg-gray-50 rounded-xl border border-gray-200"
            onChange={(e) => setForm({ ...form, bvn: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-[#1e3a8a] mb-2">
            Date of Birth
          </label>
          <input
            type="date"
            className="w-full p-4 bg-gray-50 rounded-xl border border-gray-200"
            onChange={(e) =>
              setForm({ ...form, dateOfBirth: new Date(e.target.value) })
            }
          />
        </div>
      </div>

      {/* Employment Inputs */}
      <div className="space-y-6 mt-6">
        <div>
          <label className="block text-sm font-semibold text-[#1e3a8a] mb-2">
            Occupation
          </label>
          <input
            className="w-full p-4 bg-gray-50 rounded-xl border border-gray-200"
            onChange={(e) => setForm({ ...form, occupation: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-[#1e3a8a] mb-2">
            Residential Address
          </label>
          <input
            className="w-full p-4 bg-gray-50 rounded-xl border border-gray-200"
            onChange={(e) => setForm({ ...form, address: e.target.value })}
          />
        </div>
        {/* NEW: Place of Work Field */}
        <div>
          <label className="block text-sm font-semibold text-[#1e3a8a] mb-2">
            Place of Work
          </label>
          <input
            className="w-full p-4 bg-gray-50 rounded-xl border border-gray-200"
            onChange={(e) => setForm({ ...form, placeOfWork: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-[#1e3a8a] mb-2">
            Residential Address
          </label>
          <input
            className="w-full p-4 bg-gray-50 rounded-xl border border-gray-200"
            onChange={(e) => setForm({ ...form, address: e.target.value })}
          />
        </div>
      </div>

      {/* File Upload */}
      <div className="mt-8">
        <p className="text-xs font-bold text-blue-600 tracking-wider mb-4">
          DOCUMENT UPLOAD
        </p>
        <div
          onClick={() => fileInputRef.current?.click()}
          className="h-48 border-2 border-dashed border-blue-600 rounded-2xl flex flex-col items-center justify-center cursor-pointer bg-gray-50 overflow-hidden"
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            accept="image/*"
          />
          {preview ? (
            <img src={preview} alt="preview" className="h-full object-cover" />
          ) : (
            <>
              <IoCameraOutline size={40} className="text-blue-600" />
              <p className="text-sm font-bold text-blue-600 mt-2">
                Tap to select {form.documentType}
              </p>
            </>
          )}
        </div>
      </div>

      <button
        disabled={loadingKyc}
        onClick={handleSubmit}
        className="w-full mt-10 py-5 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 disabled:opacity-50"
      >
        {loadingKyc ? "Uploading..." : "Submit for Verification"}
      </button>
    </div>
  );
}
