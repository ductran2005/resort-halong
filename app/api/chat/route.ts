import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

export async function POST(request: Request) {
  try {
    const { message, chatHistory, lang } = await request.json();
    if (!message) {
      return NextResponse.json({ error: "Message is required." }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    
    // System instructions for the Butler in both languages
    const systemInstructionVi = 
      "Bạn là Quản Gia Cao Cấp 'Hoàng', đại diện thương hiệu nghỉ dưỡng siêu sang Emerald Da Nang Resort & Heritage Tours tại Đà Nẵng, Việt Nam. " +
      "Phong cách nói chuyện của bạn cực kỳ lịch thiệp, tinh tế, sang trọng, chu đáo, xưng hô tôn kính ('Quý khách', 'Dạ thưa', 'Tôi là Quản gia Hoàng'). " +
      "Hãy tư vấn hết mình về các kỳ nghỉ di sản (3 ngày 2 đêm, 2 ngày 1 đêm), các hạng phòng và biệt thự xa hoa (Royal Ocean Suite, Presidential Beachfront Villa, Imperial Cliffside Duplex), những đặc quyền thượng lưu (như quản gia cá nhân, hồ bơi tràn bờ, tiệc hoàng hôn bãi biển My Khe sunset champagne, bồn tắm sục đôi ngắm đại dương, trực thăng ngắm cảnh, ẩm thực hải sản Michelin), hoặc các thắc mắc về lịch trình tham quan Bà Nà Hills, Phố cổ Hội An, Ngũ Hành Sơn và ẩm thực vùng miền của quý vị. " +
      "Nếu khách hỏi điều gì khác ngoài du lịch hoặc resort Emerald Da Nang, hãy nhẹ nhàng hướng cuộc hội thoại về kỳ nghỉ dưỡng thượng lưu tại Đà Nẵng một cách khéo léo.";

    const systemInstructionEn = 
      "You are Head Butler 'Hoang', representing the ultra-luxury Emerald Da Nang Resort & Heritage Tours brand in Da Nang, Vietnam. " +
      "Your conversation style is extremely polite, sophisticated, elegant, and attentive, using respectful terms ('Guest', 'I am Butler Hoang', 'Certainly, Sir/Madam'). " +
      "Helpfully consult about our luxury heritage getaways (3 days 2 nights, 2 days 1 night), lavish suites/villas (Royal Ocean Suite, Presidential Beachfront Villa, Imperial Cliffside Duplex), and high-end privileges (such as personal butler, private infinity pool, My Khe beach sunset champagne party, double Jacuzzi bathtub with ocean views, scenic helicopter transfer, Michelin seafood dining cuisine), or any itinerary and dining questions regarding Ba Na Hills, Hoi An, and Marble Mountains. " +
      "If the guest asks about anything unrelated to travel or Emerald Da Nang Resort, politely steer the conversation back to their luxury holiday in Da Nang.";

    const systemInstruction = lang === "en" ? systemInstructionEn : systemInstructionVi;

    if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
      // Simulated concierge responses in both languages
      const responsesVi = [
        "Dạ thưa Quý khách, Quản gia Hoàng rất hân hạnh được hỗ trợ. Emerald Da Nang Resort tự hào mang đến kỳ nghỉ dưỡng đẳng cấp thượng lưu nhất bên bờ biển Mỹ Khê xinh đẹp. Quý khách đang quan tâm đến phòng Royal Ocean Suite hướng biển tuyệt mỹ hay đặc quyền tiệc tối hải sản Michelin của chúng tôi ạ?",
        "Dạ, hành trình nghỉ dưỡng di sản 3 ngày 2 đêm của chúng tôi sẽ đưa Quý khách khám phá đỉnh Bà Nà với Cầu Vàng nổi tiếng, du ngoạn ngắm hoa đăng tại Phố cổ Hội An, kết hợp châm cứu trị liệu Cham Spa hoàng gia. Quý khách muốn đặt lịch tư vấn cho mấy thành viên ạ?",
        "Kính thưa Quý khách, Presidential Beachfront Villa của chúng tôi đi kèm hồ bơi tràn bờ riêng biệt sát biển và dịch vụ Quản gia cá nhân phục vụ 24/7. Đây là sự lựa chọn hoàn hảo cho kỳ nghỉ dưỡng riêng tư tối mật.",
        "Dạ thưa Quý khách, mọi dịch vụ từ đưa đón limousine sân bay tới bữa tối Fine Dining hải sản bên bãi biển và lớp học làm mì Quảng đều đã được trọn gói. Tôi xin phép được ghi nhận thông tin để chuyển chuyên viên liên hệ tư vấn chi tiết hơn ạ."
      ];

      const responsesEn = [
        "Certainly, Sir/Madam, I am Butler Hoang, and it is my utmost honor to assist you. Emerald Da Nang Resort proudly brings the highest standard of luxury vacation to beautiful My Khe Beach. Are you interested in our beautiful Royal Ocean Suite with a private balcony, or our Michelin-starred seafood dining experiences?",
        "Yes, our 3-day 2-night heritage getaway will guide you through the scenic Ba Na Hills with the famous Golden Bridge, a lantern release boat trip in Hoi An, and premium Cham Spa wellness therapies. May I ask how many guests you are planning for?",
        "Dear guest, our Presidential Beachfront Villa includes a private infinity pool right by the white sands and 24/7 personal butler service. It is the perfect choice for absolute privacy and comfort.",
        "Certainly, Sir/Madam, all premium amenities, including airport limousine transfer, fine dining beachfront dinners, and our traditional Quảng noodle cooking masterclass, are fully inclusive. May I record your contact details so our VIP consultant team can contact you shortly?"
      ];

      const responses = lang === "en" ? responsesEn : responsesVi;
      const randomReply = responses[Math.floor(Math.random() * responses.length)];
      
      // Introduce a slight delay for realistic butler service simulation
      await new Promise((resolve) => setTimeout(resolve, 800));
      return NextResponse.json({ text: randomReply, simulated: true });
    }

    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });

    const chat = ai.chats.create({
      model: "gemini-3.5-flash",
      config: {
        systemInstruction,
        temperature: 0.7,
      },
      history: chatHistory && Array.isArray(chatHistory) ? chatHistory : []
    });

    const response = await chat.sendMessage({ message });
    return NextResponse.json({ text: response.text || "" });

  } catch (error: any) {
    console.error("Gemini API error:", error);
    return NextResponse.json({ 
      error: "Butler service was temporarily interrupted.", 
      details: error.message 
    }, { status: 500 });
  }
}
