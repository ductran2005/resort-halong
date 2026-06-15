import "./globals.css";
import React from "react";

export const metadata = {
  title: "Emerald Cruise - Luxury Halong Bay Cruise",
  description: "Trải nghiệm kỳ nghỉ dưỡng 5 sao thượng lưu giữa lòng di sản kỳ quan thiên nhiên thế giới Vịnh Hạ Long cùng du thuyền siêu sang Emerald Cruise.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body>{children}</body>
    </html>
  );
}
