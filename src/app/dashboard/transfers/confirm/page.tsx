// app/dashboard/transfers/confirm/page.tsx
import { Suspense } from "react";
import ConfirmTransferScreen from "./ConfirmTransferScreen"; // Point to your file

export default function ConfirmPage() {
  return (
    <Suspense fallback={<div>Loading transaction details...</div>}>
      <ConfirmTransferScreen />
    </Suspense>
  );
}
