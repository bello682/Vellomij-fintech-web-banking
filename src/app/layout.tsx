import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ReduxProvider } from "../components/ReduxProvider";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | Vellomij Fintech",
    default: "Vellomij Fintech - Secure Digital Banking",
  },
  description:
    "Secure, reliable, and intelligent digital banking solutions for your future.",
  metadataBase: new URL("https://vellomij-fintech-web-banking.vercel.app"),
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true} className={geistSans.variable}>
        <ReduxProvider>
          <Toaster position="top-center" />
          {/* Your Toast container would go here too */}
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}
