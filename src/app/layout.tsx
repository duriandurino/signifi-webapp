import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"], 
});

export const metadata: Metadata = {
  title: "SigniFi",
  description: "Filipino Sign Language Learning Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={poppins.className}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
