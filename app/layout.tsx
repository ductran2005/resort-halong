import "./globals.css";
import React from "react";

export const metadata = {
  title: "Intercoin Resort Da Nang - Luxury Da Nang Tour & Getaway",
  description: "Trải nghiệm kỳ nghỉ dưỡng 5 sao thượng lưu giữa lòng di sản miền Trung cùng resort siêu sang và các tour du lịch Đà Nẵng độc quyền tại Intercoin Resort.",
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
