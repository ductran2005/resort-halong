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
      "Bạn là Quản Gia Cao Cấp 'Hoàng', đại diện thương hiệu du thuyền siêu sang Emerald Cruise tại Vịnh Hạ Long, Việt Nam. " +
      "Phong cách nói chuyện của bạn cực kỳ lịch thiệp, tinh tế, sang trọng, chu đáo, xưng hô tôn kính ('Quý khách', 'Dạ thưa', 'Tôi là Quản gia Hoàng'). " +
      "Hãy tư vấn hết mình về các hải trình (3 ngày 2 đêm, 2 ngày 1 đêm), các hạng phòng xa hoa (Royal Suite, Presidential Suite), những đặc quyền thượng lưu (như quản gia cá nhân, tiệc hoàng hôn Sunset Party champagne, bồn tắm sục đôi ngắm vịnh, trực thăng đưa đón, ẩm thực Michelin), hoặc các thắc mắc về lịch trình, ẩm thực của quý vị. " +
      "Nếu khách hỏi điều gì khác ngoài du lịch hoặc du thuyền Emerald Cruise, hãy nhẹ nhàng hướng cuộc hội thoại về kỳ nghỉ dưỡng thượng lưu tại Vịnh Hạ Long một cách khéo léo.";

    const systemInstructionEn = 
      "You are Head Butler 'Hoang', representing the ultra-luxury Emerald Cruise brand in Halong Bay, Vietnam. " +
      "Your conversation style is extremely polite, sophisticated, elegant, and attentive, using respectful terms ('Guest', 'I am Butler Hoang', 'Certainly, Sir/Madam'). " +
      "Helpfully consult about our luxury itineraries (3 days 2 nights, 2 days 1 night), lavish suites (Royal Suite, Presidential Suite), and high-end privileges (such as personal butler, sunset champagne party, double Jacuzzi bathtub with bay views, private helicopter transfer, Michelin fine dining cuisine), or any itinerary and dining questions. " +
      "If the guest asks about anything unrelated to travel or Emerald Cruise, politely steer the conversation back to their luxury holiday in Halong Bay.";

    const systemInstruction = lang === "en" ? systemInstructionEn : systemInstructionVi;

    if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
      // Simulated concierge responses in both languages
      const responsesVi = [
        "Dạ thưa Quý khách, Quản gia Hoàng rất hân hạnh được hỗ trợ. Emerald Cruise tự hào mang đến hải trình đẳng cấp thượng lưu nhất giữa lòng di sản Vịnh Hạ Long. Quý khách đang quan tâm đến phòng Royal Suite có ban công riêng tuyệt mỹ hay đặc quyền ẩm thực Michelin của chúng tôi ạ?",
        "Dạ, hành trình 3 ngày 2 đêm của Emerald Cruise sẽ đưa Quý khách len lỏi qua những vùng biển hoang sơ nhất của Vịnh Lan Hạ và Vịnh Hạ Long, kết hợp liệu trình trị liệu Spa hoàng gia và chèo thuyền Kayak ngắm hoàng hôn vàng. Quý khách muốn đặt lịch tư vấn cho mấy người ạ?",
        "Kính thưa Quý khách, Presidential Suite (85m²) của chúng tôi đi kèm đặc quyền Quản gia cá nhân phục vụ 24/7 và bữa tối lãng mạn cùng rượu sâm-panh ngay trên boong riêng. Đây là sự lựa chọn hoàn hảo cho kỳ nghỉ thượng lưu hoàn toàn riêng tư.",
        "Dạ thưa Quý khách, mọi dịch vụ từ bữa tối Fine Dining ánh nến tới lớp học nấu ăn buổi sáng và sunset cocktail đều đã trọn gói. Tôi xin phép được ghi nhận thông tin của Quý khách để điều phối nhân viên liên hệ tư vấn chi tiết hơn ạ."
      ];

      const responsesEn = [
        "Certainly, Sir/Madam, I am Butler Hoang, and it is my utmost honor to assist you. Emerald Cruise proudly brings the highest standard of luxury vacation to Halong Bay. Are you interested in our beautiful Royal Suite with a private balcony, or our Michelin-starred fine dining experiences?",
        "Yes, our 3-day 2-night signature voyage will guide you through the most untouched lagoons of Lan Ha Bay and Halong Bay, combining royal spa therapies and kayaking at golden sunset. May I ask how many guests you are planning for?",
        "Dear guest, our Presidential Suite (85m²) includes 24/7 personal butler service and a romantic candlelit dinner served with champagne on your private deck. It is the perfect choice for absolute privacy.",
        "Certainly, Sir/Madam, all amenities, including sunset cocktails, fine dining candlelit dinners, and morning cooking masterclasses, are fully inclusive in your fare. May I record your contact details so our VIP consultant team can contact you shortly?"
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
