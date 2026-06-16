import { Suspense } from "react";
import ResendOtpContent from "./ResendOtpContent"; // You will create this file

export default function ResendOtpPage() {
  return (
    // The Suspense boundary acts as a "wait" zone for the browser URL
    <Suspense fallback={<div>Loading...</div>}>
      <ResendOtpContent />
    </Suspense>
  );
}
