import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";

dotenv.config();

const app = express();
const PORT = 3000;

// Initialize Server-Side Gemini API Client
let ai: GoogleGenAI | null = null;
try {
  const apiKey = process.env.GEMINI_API_KEY;
  if (apiKey && apiKey !== "MY_GEMINI_API_KEY") {
    ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
    console.log("Gemini API Client initialized successfully.");
  } else {
    console.warn("GEMINI_API_KEY is not defined or is placeholder. Chat will operate in simulated butler mode.");
  }
} catch (error) {
  console.error("Failed to initialize Gemini API Client:", error);
}

// Global Middleware
app.use(express.json());

// API: Butler Interactive Chat Concierge
app.post("/api/chat", async (req, res) => {
  const { message, chatHistory } = req.body;
  if (!message) {
    return res.status(400).json({ error: "Message is required." });
  }

  // System instructions to maintain luxury branding and high-end tone
  const systemInstruction = 
    "Bạn là Quản Gia Cao Cấp 'Hoàng', đại diện thương hiệu du thuyền siêu sang Emerald Cruise tại Vịnh Hạ Long, Việt Nam. " +
    "Phong cách nói chuyện của bạn cực kỳ lịch thiệp, tinh tế, sang trọng, chu đáo, xưng hô tôn kính ('Quý khách', 'Dạ thưa', 'Tôi là Quản gia Hoàng'). " +
    "Hãy tư vấn hết mình về các hải trình (3 ngày 2 đêm, 2 ngày 1 đêm), các hạng phòng xa hoa (Royal Suite, Presidential Suite), những đặc quyền thượng lưu (như quản gia cá nhân, tiệc hoàng hôn Sunset Party champagne, bồn tắm sục đôi ngắm vịnh, trực thăng đưa đón, ẩm thực Michelin), hoặc các thắc mắc về lịch trình, ẩm thực của quý vị. " +
    "Nếu khách hỏi điều gì khác ngoài du lịch hoặc du thuyền Emerald Cruise, hãy nhẹ nhàng hướng cuộc hội thoại về kỳ nghỉ dưỡng thượng lưu tại Vịnh Hạ Long một cách khéo léo.";

  if (!ai) {
    // Elegant simulation mode in case key is missing so user experience remains pristine
    setTimeout(() => {
      const responses = [
        "Dạ thưa Quý khách, Quản gia Hoàng rất hân hạnh được hỗ trợ. Emerald Cruise tự hào mang đến hải trình đẳng cấp thượng lưu nhất giữa lòng di sản Vịnh Hạ Long. Quý khách đang quan tâm đến phòng Royal Suite có ban công riêng tuyệt mỹ hay đặc quyền ẩm thực Michelin của chúng tôi ạ?",
        "Dạ, hành trình 3 ngày 2 đêm của Emerald Cruise sẽ đưa Quý khách len lỏi qua những vùng biển hoang sơ nhất của Vịnh Lan Hạ và Vịnh Hạ Long, kết hợp liệu trình trị liệu Spa hoàng gia và chèo thuyền Kayak ngắm hoàng hôn vàng. Quý khách muốn đặt lịch tư vấn cho mấy người ạ?",
        "Kính thưa Quý khách, Presidential Suite (85m²) của chúng tôi đi kèm đặc quyền Quản gia cá nhân phục vụ 24/7 và bữa tối lãng mạn cùng rượu sâm-panh ngay trên boong riêng. Đây là sự lựa chọn hoàn hảo cho kỳ nghỉ thượng lưu hoàn toàn riêng tư.",
        "Dạ thưa Quý khách, mọi dịch vụ từ bữa tối Fine Dining ánh nến tới lớp học nấu ăn buổi sáng và sunset cocktail đều đã trọn gói. Tôi xin phép được ghi nhận thông tin của Quý khách để điều phối nhân viên liên hệ tư vấn chi tiết hơn ạ."
      ];
      const randomReply = responses[Math.floor(Math.random() * responses.length)];
      return res.json({ text: randomReply, simulated: true });
    }, 800);
    return;
  }

  try {
    // Format chat history to include prompt properly or start a new chat
    const chat = ai.chats.create({
      model: "gemini-3.5-flash",
      config: {
        systemInstruction,
        temperature: 0.7,
      },
      history: chatHistory && Array.isArray(chatHistory) ? chatHistory : []
    });

    const response = await chat.sendMessage({ message });
    res.json({ text: response.text || "" });
  } catch (error: any) {
    console.error("Gemini API error:", error);
    res.status(500).json({ 
      error: "Butler service was temporarily interrupted.", 
      details: error.message 
    });
  }
});

// Mock/API route for contact submission to save leads if required (can be logged or stored)
app.post("/api/booking", (req, res) => {
  const { name, phone, guests, date, suite } = req.body;
  if (!name || !phone) {
    return res.status(400).json({ error: "Vui lòng nhập Tên và Số điện thoại liên hệ." });
  }
  // Simulate successful leads database storage
  console.log("New VIP Consultation lead received:", { name, phone, guests, date, suite });
  return res.json({ 
    success: true, 
    message: `Kính thưa Quý khách ${name}, yêu cầu tư vấn cho chuyến đi ngày ${date || "gần nhất"} đã được Quản gia Hoàng tiếp nhận. Đội ngũ đại sứ của Emerald Cruise sẽ liên hệ lại qua số điện thoại ${phone} trong vòng 15 phút.` 
  });
});

// Setup Vite Dev Middleware / Production Static Assets Router
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    console.log("Starting server in DEVELOPMENT mode with Vite...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Starting server in PRODUCTION mode...");
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Emerald Cruise Server is sailing live on http://localhost:${PORT}`);
  });
}

startServer();
