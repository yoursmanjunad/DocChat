import type { Metadata } from "next";
import { Source_Sans_3 as FontSans } from "next/font/google";
import "./globals.css";
import Header from "@/components/common/header";
import Footer from "@/components/common/footer";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";
const fontSans = FontSans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "DocChat.ai - AI Powered Documentation Chat",
  description:
    "DocChat.ai is an AI-powered documentation chat tool that helps you find answers in your documentation quickly and efficiently.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className={fontSans.variable}>
        <body className="font-sans antialiased">
          <div className="relative flex min-h-screen flex-col">
            <Header />
            {/* Main content area */}
            <main className="flex-1">{children}</main>
            <Toaster />
            <Footer />
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
