import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

export async function POST(request: Request) {
  try {
    const { message, chatHistory, lang } = await request.json();
    if (!message) {
      return NextResponse.json({ error: "Message is required." }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    
    // System instructions for the InterContinental travel assistant in both languages
    const systemInstructionVi = 
      "Bạn là Trợ lý Du lịch InterContinental, chuyên tư vấn kỳ nghỉ và lịch trình tại Đà Nẵng. " +
      "Trả lời bằng tiếng Việt tự nhiên, thân thiện, lịch sự và súc tích; ưu tiên 2-5 câu hoặc danh sách ngắn. " +
      "Bạn có thể tư vấn lịch trình 3 ngày 2 đêm, Bà Nà Hills và Cầu Vàng, Hội An, Ngũ Hành Sơn, Sơn Trà, biển Mỹ Khê, phòng nghỉ và trải nghiệm trong website. " +
      "Không tự bịa giá, tình trạng phòng, tiện ích hoặc cam kết dịch vụ. Nếu website không cung cấp thông tin chính xác, hãy nói rõ cần nhân viên xác nhận. " +
      "Khi phù hợp, hãy hỏi số khách, ngày đi, sở thích hoặc ngân sách; kết thúc bằng một bước tiếp theo hữu ích như xem lịch trình hoặc gửi yêu cầu tư vấn. " +
      "Không dùng ngôn ngữ du thuyền, không tự xưng là quản gia Hoàng và không nhắc thương hiệu Emerald.";

    const systemInstructionEn = 
      "You are the InterContinental Travel Assistant, specializing in Da Nang holidays and itineraries. " +
      "Reply in clear, friendly, concise English, usually in 2-5 sentences or a short list. " +
      "You can advise on 3-day itineraries, Ba Na Hills and Golden Bridge, Hoi An, Marble Mountains, Son Tra, My Khe Beach, rooms, and experiences shown on the website. " +
      "Never invent prices, availability, amenities, or service guarantees. When exact information is unavailable, clearly say that a team member must confirm it. " +
      "When helpful, ask for guest count, travel date, interests, or budget, and finish with a useful next step. " +
      "Do not use cruise language, do not claim to be Butler Hoang, and do not mention the Emerald brand.";

    const systemInstruction = lang === "en" ? systemInstructionEn : systemInstructionVi;

    if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
      // Simulated concierge responses in both languages
      const responsesVi = [
        "InterContinental có thể giúp bạn lên lịch trình Đà Nẵng theo ngày đi, số khách và sở thích. Bạn muốn ưu tiên Cầu Vàng, Hội An, biển Mỹ Khê hay trải nghiệm nghỉ dưỡng?",
        "Gợi ý lịch trình 3 ngày 2 đêm: ngày 1 khám phá Sơn Trà và biển Mỹ Khê, ngày 2 tham quan Bà Nà Hills - Cầu Vàng, ngày 3 ghé Ngũ Hành Sơn hoặc Hội An. Bạn đi cùng bao nhiêu người?",
        "Bạn có thể xem các hạng phòng hướng biển trong mục Biệt thự & Suite. Giá và tình trạng phòng cần được đội ngũ InterContinental xác nhận theo ngày đi cụ thể.",
        "Mình có thể chuyển yêu cầu để đội ngũ InterContinental tư vấn chi tiết. Bạn cho mình biết ngày dự kiến và số lượng khách nhé."
      ];

      const responsesEn = [
        "InterContinental can help plan your Da Nang trip around your dates, group size, and interests. Would you like to focus on Golden Bridge, Hoi An, My Khe Beach, or resort experiences?",
        "A balanced 3-day itinerary could include Son Tra and My Khe Beach on day one, Ba Na Hills and Golden Bridge on day two, then Marble Mountains or Hoi An on day three. How many guests are traveling?",
        "You can explore the ocean-view room options in the Villas & Suites section. Pricing and availability must be confirmed by the InterContinental team for your travel dates.",
        "I can help send a consultation request to the InterContinental team. Please share your preferred travel date and number of guests."
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
