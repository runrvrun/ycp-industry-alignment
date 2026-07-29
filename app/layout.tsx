import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "One YCP — Industry Practice Alignment",
  description: "MSD Global Practice — One YCP Industry Practice Alignment survey",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
