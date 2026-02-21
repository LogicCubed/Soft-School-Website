import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import { ClerkProvider } from '@clerk/nextjs'
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";
import { ExitModal } from "@/components/modals/exit-modal";
import { DeleteProgressModal } from "@/components/modals/delete-progress-modal";
import { LoadingScreen } from "@/components/loading-screen";
import { ElectronHeader } from "@/components/electron/electron-header";

const font = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Soft School",
  description: "Soft School teaches real-world soft skills through interactive lessons and challenges. Practice communication, leadership, and decision-making",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      signInFallbackRedirectUrl="/learn"
      afterSignOutUrl="/"
    >
      <html lang="en">
        <body
          className={`${font.variable} antialiased`}
          style={{
            margin: 0,
            padding: 0,
            height: "100%",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <ElectronHeader />

          <div
            style={{
              flex: 1,
              overflowY: "auto",
              minHeight: 0,
            }}
          >
            <Toaster />
            <ExitModal />
            <DeleteProgressModal />
            {children}
            <LoadingScreen />
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
