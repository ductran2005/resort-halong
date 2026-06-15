import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

export async function POST(request: Request) {
  try {
    const { message, chatHistory } = await request.json();
    if (!message) {
      return NextResponse.json({ error: "Message is required." }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    const systemInstruction = 
      "Bạn là Quản Gia Cao Cấp 'Hoàng', đại diện thương hiệu du thuyền siêu sang Emerald Cruise tại Vịnh Hạ Long, Việt Nam. " +
      "Phong cách nói chuyện của bạn cực kỳ lịch thiệp, tinh tế, sang trọng, chu đáo, xưng hô tôn kính ('Quý khách', 'Dạ thưa', 'Tôi là Quản gia Hoàng'). " +
      "Hãy tư vấn hết mình về các hải trình (3 ngày 2 đêm, 2 ngày 1 đêm), các hạng phòng xa hoa (Royal Suite, Presidential Suite), những đặc quyền thượng lưu (như quản gia cá nhân, tiệc hoàng hôn Sunset Party champagne, bồn tắm sục đôi ngắm vịnh, trực thăng đưa đón, ẩm thực Michelin), hoặc các thắc mắc về lịch trình, ẩm thực của quý vị. " +
      "Nếu khách hỏi điều gì khác ngoài du lịch hoặc du thuyền Emerald Cruise, hãy nhẹ nhàng hướng cuộc hội thoại về kỳ nghỉ dưỡng thượng lưu tại Vịnh Hạ Long một cách khéo léo.";

    if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
      // Simulated concierge responses
      const responses = [
        "Dạ thưa Quý khách, Quản gia Hoàng rất hân hạnh được hỗ trợ. Emerald Cruise tự hào mang đến hải trình đẳng cấp thượng lưu nhất giữa lòng di sản Vịnh Hạ Long. Quý khách đang quan tâm đến phòng Royal Suite có ban công riêng tuyệt mỹ hay đặc quyền ẩm thực Michelin của chúng tôi ạ?",
        "Dạ, hành trình 3 ngày 2 đêm của Emerald Cruise sẽ đưa Quý khách len lỏi qua những vùng biển hoang sơ nhất của Vịnh Lan Hạ và Vịnh Hạ Long, kết hợp liệu trình trị liệu Spa hoàng gia và chèo thuyền Kayak ngắm hoàng hôn vàng. Quý khách muốn đặt lịch tư vấn cho mấy người ạ?",
        "Kính thưa Quý khách, Presidential Suite (85m²) của chúng tôi đi kèm đặc quyền Quản gia cá nhân phục vụ 24/7 và bữa tối lãng mạn cùng rượu sâm-panh ngay trên boong riêng. Đây là sự lựa chọn hoàn hảo cho kỳ nghỉ thượng lưu hoàn toàn riêng tư.",
        "Dạ thưa Quý khách, mọi dịch vụ từ bữa tối Fine Dining ánh nến tới lớp học nấu ăn buổi sáng và sunset cocktail đều đã trọn gói. Tôi xin phép được ghi nhận thông tin của Quý khách để điều phối nhân viên liên hệ tư vấn chi tiết hơn ạ."
      ];
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
