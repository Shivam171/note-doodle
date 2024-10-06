import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ConvexClientProvider } from "./ConvexClientProvider";
import { Toaster } from "@/components/ui/sonner"
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Note Doodle | Welcome",
  description: "Streamline content refinement and idea visualization through both writing and drawing",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Toaster />
        <ConvexClientProvider>
          {children}
        </ConvexClientProvider>
      </body>
    </html>
  );
}
