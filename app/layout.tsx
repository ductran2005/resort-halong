import "./globals.css";
import React from "react";

export const metadata = {
  title: "InterContinental Danang Sun Peninsula Resort - Luxury Da Nang Tour & Getaway",
  description: "Trải nghiệm kỳ nghỉ dưỡng 5 sao thượng lưu giữa lòng di sản miền Trung cùng resort siêu sang và các tour du lịch Đà Nẵng độc quyền tại InterContinental Danang Resort.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <head>
        <link rel="icon" href="/favicon.png" type="image/png" />
      </head>
      <body>{children}</body>
    </html>
  );
}
