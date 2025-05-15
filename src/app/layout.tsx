import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "HGS Digital Assistants",
  description: "A app from HGS.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>{children}</body>
    </html>
  );
}
