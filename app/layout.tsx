import Navbar from "@/components/Navbar";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster"
import { cn } from "@/lib/utils";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Inherited Games Admin Dashboard",
  description: "Efficiently manage and oversee all aspects of our game development projects with our intuitive and powerful admin dashboard.",
  keywords: ["admin dashboard", "game development management", "project oversight", "startup tools", "Inherited Games"],
  icons: { icon: '/icon.png' }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(inter.className,'flex flex-col bg-slate-100') }>
          <Navbar />
          <main className="h-full ">
            {children}
            <Toaster />
          </main>
      </body>
    </html>
  );
}
