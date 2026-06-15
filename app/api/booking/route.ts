import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { name, phone, guests, date, suite } = await request.json();

    if (!name || !phone) {
      return NextResponse.json(
        { error: "Vui lòng nhập Tên và Số điện thoại liên hệ." },
        { status: 400 }
      );
    }

    // Log the new VIP Consultation lead details in the server environment
    console.log("New VIP Consultation lead received:", { name, phone, guests, date, suite });

    return NextResponse.json({
      success: true,
      message: `Kính thưa Quý khách ${name}, yêu cầu tư vấn cho chuyến đi ngày ${
        date || "gần nhất"
      } đã được Quản gia Hoàng tiếp nhận. Đội ngũ đại sứ của Emerald Da Nang Resort sẽ liên hệ lại qua số điện thoại ${phone} trong vòng 15 phút.`
    });

  } catch (error: any) {
    console.error("Booking handler error:", error);
    return NextResponse.json(
      { error: "Booking service encountered an error.", details: error.message },
      { status: 500 }
    );
  }
}
