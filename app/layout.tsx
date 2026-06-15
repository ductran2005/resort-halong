import "./globals.css";
import React from "react";

export const metadata = {
  title: "Emerald Da Nang Resort & Villas - Luxury Da Nang Tour & Getaway",
  description: "Trải nghiệm kỳ nghỉ dưỡng 5 sao thượng lưu giữa lòng di sản miền Trung cùng resort siêu sang và các tour du lịch Đà Nẵng độc quyền tại Emerald Da Nang Resort.",
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
