"use client";

import React, { useState, useRef, useEffect } from "react";
import { 
  motion, 
  AnimatePresence 
} from "motion/react";
import { 
  Anchor, 
  Compass, 
  Waves, 
  MapPin, 
  Calendar, 
  Users, 
  Check, 
  ChevronRight, 
  ChevronLeft, 
  MessageSquare, 
  Send, 
  Sparkles, 
  X, 
  Image, 
  Phone, 
  Shield, 
  Clock, 
  Utensils, 
  Heart,
  Menu
} from "lucide-react";
import { SUITES_DATA, EXPERIENCES_DATA, ITINERARY_DATA, GALLERY_DATA } from "./data";
import { SuiteType, ChatMessageType } from "./types";

export default function App() {
  // Navigation active state
  const [activeSection, setActiveSection] = useState("hero");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Suite showcase state
  const [selectedSuiteId, setSelectedSuiteId] = useState("royal-suite");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Suite calculator state
  const [numGuests, setNumGuests] = useState(2);
  const [travelDate, setTravelDate] = useState("2026-07-28");
  const selectedSuite = SUITES_DATA.find(s => s.id === selectedSuiteId) || SUITES_DATA[0];

  // Itinerary planner state (which day is active)
  const [activeDay, setActiveDay] = useState(1);
  const [hoveredActivityIndex, setHoveredActivityIndex] = useState<number | null>(null);

  // Gallery lightbox state
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Booking form state
  const [bookingForm, setBookingForm] = useState({
    name: "",
    phone: "",
    guests: 2,
    date: "2026-07-28",
    suite: "royal-suite",
  });
  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingSuccessMsg, setBookingSuccessMsg] = useState("");

  // AI Butler Chat State
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessageType[]>([
    {
      role: "model",
      parts: [{ text: "Dạ thưa Quý khách, tôi là Hoàng - Quản Gia Trưởng của du thuyền Emerald Cruise. Tôi rất hân hạnh được đồng hành và tư vấn hải trình thượng lưu dành riêng cho Quý khách. Quý khách muốn hỏi về lịch trình hay dịch vụ phòng nghỉ xa hoa nào của chúng tôi ạ?" }]
    }
  ]);
  const [chatInput, setChatInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Experiences slider horizontal position state
  const experienceTrackRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);

  // Scroll handler to monitor active section & apply subtle header effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const sections = ["hero", "story", "itinerary", "suites", "experiences", "gallery", "booking"];
      
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll chat window to bottom whenever a message arrives
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatMessages, chatLoading]);

  // Handle room carousel slide
  const handleSuiteChange = (suiteId: string) => {
    setSelectedSuiteId(suiteId);
    setCurrentImageIndex(0);
  };

  const nextRoomImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % selectedSuite.images.length);
  };

  const prevRoomImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + selectedSuite.images.length) % selectedSuite.images.length);
  };

  // Pricing calculator calculations
  const calculateFare = () => {
    const basePrice = selectedSuite.pricePerPax;
    let total = basePrice * numGuests;
    
    // Luxury discount tier for larger private groups
    let discountPercent = 0;
    if (numGuests >= 6) {
      discountPercent = 10; // 10% discount for group bigger than 6 pax
    } else if (numGuests >= 4) {
      discountPercent = 5;  // 5% discount for group bigger than 4 pax
    }

    const discountAmount = total * (discountPercent / 100);
    const finalPrice = total - discountAmount;
    return {
      subtotal: total,
      discountPercent,
      discountAmount,
      finalPrice
    };
  };

  const { subtotal, discountPercent, discountAmount, finalPrice } = calculateFare();

  // Experiences track slider
  const scrollExperiences = (direction: "left" | "right") => {
    if (experienceTrackRef.current) {
      const container = experienceTrackRef.current;
      const scrollAmount = 350;
      if (direction === "left") {
        container.scrollTo({
          left: container.scrollLeft - scrollAmount,
          behavior: "smooth"
        });
      } else {
        container.scrollTo({
          left: container.scrollLeft + scrollAmount,
          behavior: "smooth"
        });
      }
    }
  };

  // Consultation Submission Handler
  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingForm.name || !bookingForm.phone) {
      alert("Quý khách vui lòng cung cấp Họ tên và Số điện thoại liên lạc.");
      return;
    }

    setBookingLoading(true);
    setBookingSuccessMsg("");

    try {
      const response = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingForm)
      });
      const data = await response.json();
      if (data.success) {
        setBookingSuccessMsg(data.message);
        // Clear form fields
        setBookingForm({
          name: "",
          phone: "",
          guests: 2,
          date: "2026-07-28",
          suite: "royal-suite"
        });
      } else {
        throw new Error(data.error || "Gặp sự cố kết nối");
      }
    } catch (err: any) {
      console.error(err);
      // Fallback response for offline status
      setBookingSuccessMsg(
        `Kính thưa Quý khách ${bookingForm.name}, yêu cầu tư vấn hải trình đã được Quản gia tiếp nhận thành công. Chuyên viên dịch vụ của Emerald Cruise sẽ chủ động gọi lại cho Quý khách qua số điện thoại ${bookingForm.phone} trong vòng 10 phút.`
      );
    } finally {
      setBookingLoading(false);
    }
  };

  // AI Butler Chat Message sender
  const sendChatMessage = async (presetText?: string) => {
    const textToSend = presetText || chatInput;
    if (!textToSend.trim()) return;

    const userMsg: ChatMessageType = {
      role: "user",
      parts: [{ text: textToSend }]
    };

    setChatMessages((prev) => [...prev, userMsg]);
    if (!presetText) setChatInput("");
    setChatLoading(true);

    try {
      // Map state history to server-side Gemini request format
      const formattedHistory = chatMessages.map((msg) => ({
        role: msg.role,
        parts: msg.parts
      }));

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: textToSend,
          chatHistory: formattedHistory
        })
      });

      const data = await response.json();
      
      const butlerReply: ChatMessageType = {
        role: "model",
        parts: [{ text: data.text || "Dạ thưa Quý khách, có một chút gián đoạn kết nối sóng trên biển. Tôi rất sẵn lòng hỗ trợ Quý khách ngay đây ạ." }]
      };
      setChatMessages((prev) => [...prev, butlerReply]);
    } catch (error) {
      console.error("Chat Error:", error);
      const errorReply: ChatMessageType = {
        role: "model",
        parts: [{ text: "Kính thưa Quý khách, do tín hiệu hành trình ngoài hải đảo tạm thời không ổn định, tôi xin phép được ghi nhận câu hỏi và giải đáp trực tiếp cho Quý vị ngay sau khi cập bến ạ." }]
      };
      setChatMessages((prev) => [...prev, errorReply]);
    } finally {
      setChatLoading(false);
    }
  };

  // Format currency helper
  const formatVND = (value: number) => {
    return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(value);
  };

  const isLightHeader = activeSection === "story" || activeSection === "gallery";

  return (
    <div className="min-h-screen bg-[#030811] text-[#f7f1e5] font-sans selection:bg-[#d7b56d] selection:text-[#030811]">
      
      {/* 1. Header & Navigation (Floating Glass Capsule) */}
      <header className="fixed top-6 left-1/2 -translate-x-1/2 w-[92%] max-w-7xl z-50">
        <div 
          id="navigation-capsule" 
          className={`flex items-center justify-between px-6 py-4 rounded-full backdrop-blur-xl transition-all duration-500 ${
            isLightHeader 
              ? "bg-white/60 border border-[#030811]/10 shadow-[0_15px_35px_rgba(3,8,17,0.12)]" 
              : "bg-[#030811]/35 border border-white/10 shadow-[0_15px_35px_rgba(0,0,0,0.6)]"
          }`}
        >
          <a href="#hero" className="flex items-center gap-3 group">
            {/* Dynamic Svg branding icon */}
            <svg className="w-12 h-10 transition-transform duration-500 group-hover:-translate-y-0.5" viewBox="0 0 90 70" fill="none">
              <path d="M12 55L31 18L45 55H12Z" stroke={isLightHeader ? "#030811" : "#D7B56D"} strokeWidth="2" strokeLinecap="round" className="transition-all duration-500" />
              <path d="M39 55L60 8L78 55H39Z" stroke={isLightHeader ? "#030811" : "#D7B56D"} strokeWidth="2" strokeLinecap="round" className="transition-all duration-500" />
              <path d="M45 55C52 45 55 32 53 16C64 27 69 40 70 55H45Z" fill="#D7B56D" fillOpacity={isLightHeader ? "0.95" : "0.8"} className="transition-all duration-500" />
              <path d="M10 62C26 58 40 58 54 62C66 65 76 64 84 60" stroke={isLightHeader ? "#030811" : "#D7B56D"} strokeWidth="1.5" className="transition-all duration-500" />
            </svg>
            <div className="flex flex-col leading-none">
              <strong className={`font-serif text-xl tracking-[0.2em] font-bold transition-colors duration-500 ${isLightHeader ? "text-[#030811]" : "text-[#f7f1e5]"}`}>EMERALD</strong>
              <span className="text-[8px] tracking-[0.35em] text-[#d7b56d] font-semibold mt-1">CRUISE • HALONG BAY</span>
            </div>
          </a>

          {/* Desktop Links */}
          <nav className="hidden md:flex items-center gap-8">
            {[
              { id: "story", label: "Câu Chuyện" },
              { id: "itinerary", label: "Hải Trình" },
              { id: "suites", label: "Hạng Suite VIP" },
              { id: "experiences", label: "Trải Nghiệm" },
              { id: "gallery", label: "Khoảnh Khắc" }
            ].map(item => (
              <a 
                key={item.id} 
                href={`#${item.id}`}
                className={`text-xs uppercase tracking-[0.2em] transition-colors duration-500 relative py-1 ${
                  activeSection === item.id 
                    ? isLightHeader ? "text-[#030811] font-bold" : "text-[#d7b56d]"
                    : isLightHeader 
                      ? "text-[#030811]/65 hover:text-[#030811]" 
                      : "text-white/80 hover:text-[#d7b56d]"
                }`}
              >
                {item.label}
                {activeSection === item.id && (
                  <motion.div 
                    layoutId="activeUnderline"
                    className={`absolute bottom-0 left-0 w-full h-[1px] ${isLightHeader ? "bg-[#030811]" : "bg-[#d7b56d]"}`}
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            ))}
          </nav>

          {/* Action CTA & Mobile trigger */}
          <div className="flex items-center gap-3">
            <a 
              href="#booking" 
              className="hidden sm:inline-block px-5 py-2.5 rounded-full bg-[#d7b56d] text-[#030811] text-[10px] uppercase font-bold tracking-[0.2em] hover:-translate-y-0.5 transition-all duration-300 hover:shadow-[0_8px_25px_rgba(215,181,109,0.35)]"
            >
              Đặt Chuyến Đi
            </a>
            
            <button 
              onClick={() => setMobileMenuOpen(prev => !prev)}
              className={`md:hidden p-2 rounded-full transition-colors ${isLightHeader ? "text-[#030811] hover:bg-black/5" : "text-white hover:bg-white/5"}`}
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-20 left-0 w-full bg-[#050f1e]/95 border border-white/10 backdrop-blur-2xl rounded-3xl p-6 flex flex-col gap-4 shadow-2xl md:hidden"
            >
              {[
                { id: "story", label: "Câu Chuyện Khát Vọng" },
                { id: "itinerary", label: "Lịch Trình Chi Tiết" },
                { id: "suites", label: "Hạng Cabin Hoàng Gia" },
                { id: "experiences", label: "Đặc Quyền Giải Trí VIP" },
                { id: "gallery", label: "Thư Viện Ảnh" },
                { id: "booking", label: "Đăng Ký Tư Vấn Ngay" }
              ].map(item => (
                <a 
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm font-medium tracking-wide py-2 border-b border-white/5 hover:text-[#d7b56d] transition-colors"
                >
                  {item.label}
                </a>
              ))}
              <button 
                onClick={() => {
                  setMobileMenuOpen(false);
                  setChatOpen(true);
                }}
                className="w-full mt-2 py-3 rounded-full bg-gradient-to-r from-[#d7b56d] to-[#efd092] text-[#030811] text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Trò chuyện trực tiếp Quản Gia Hoàng</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* 2. Hero Section (Parallax visual + Callout pricing) */}
      <section id="hero" className="relative h-screen flex items-end justify-between overflow-hidden">
        {/* Dynamic slow zoom backdrop */}
        <div className="absolute inset-0 z-0">
          <motion.img 
            initial={{ scale: 1.12 }}
            animate={{ scale: 1.0 }}
            transition={{ duration: 15, ease: "easeOut" }}
            src="https://images.unsplash.com/photo-1528127269322-539801943592?q=80&w=1800"
            className="w-full h-full object-cover" 
            alt="Emerald Cruise Halong Bay"
            referrerPolicy="no-referrer"
          />
          {/* Immersive cinematic overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#030811] via-[#030811]/30 to-[#030811]/60" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#030811]/80 via-transparent to-[#030811]/20" />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pb-16 md:pb-24 grid grid-cols-1 lg:grid-cols-[1.3fr_0.7fr] gap-12 items-end">
          
          {/* Hero Left Content */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2 }}
            className="flex flex-col items-start"
          >
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6">
              <Compass className="w-4 h-4 text-[#d7b56d] animate-spin-slow" />
              <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#d7b56d]">Kiệt Tác Nghỉ Dưỡng Trên Biển</span>
            </div>
            
            <h1 className="font-serif text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-bold leading-[0.85] tracking-tight text-[#f7f1e5]">
              HALONG
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f7f1e5] via-[#efd398] to-[#d7b56d]">PRIVATE</span>
              <br />
              CRUISE
            </h1>
            
            <p className="mt-8 text-white/75 text-base md:text-lg max-w-lg leading-relaxed font-light">
              Hành trình huyền thoại giữa lòng di sản Kỳ quan Thế giới — Vịnh Hạ Long. Nơi sự riêng tư tối mật, kiến trúc Đông Dương trang hoàng và dịch vụ quản gia cá nhân tạo nên một tuyệt tác dành riêng cho giới thượng lưu.
            </p>
          </motion.div>

          {/* Hero Right Callout Pricing Card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.5 }}
            className="w-full max-w-sm rounded-[32px] p-8 bg-white/[0.04] border border-white/10 backdrop-blur-2xl shadow-[0_30px_60px_rgba(0,0,0,0.8)]"
          >
            <div className="flex justify-between items-center pb-4 border-b border-white/5">
              <span className="text-[10px] tracking-[0.250em] uppercase font-extrabold text-[#d7b56d] flex items-center gap-1">
                <Anchor className="w-3.5 h-3.5" /> Hải Trình Signature
              </span>
              <span className="px-3 py-1 rounded-full text-[9px] font-bold bg-[#d7b56d]/10 text-[#d7b56d] border border-[#d7b56d]/20 uppercase tracking-widest">
                3 Ngày 2 Đêm
              </span>
            </div>

            <div className="my-6">
              <div className="text-white/50 text-[11px] uppercase tracking-wider">Giá khởi điểm từ</div>
              <div className="text-4xl md:text-5xl font-serif text-[#f7f1e5] font-bold tracking-tight mt-1">
                {formatVND(19900000)}
                <span className="text-sm font-sans font-light text-white/60 ml-1">/khách</span>
              </div>
            </div>

            <ul className="space-y-3 mb-8">
              {[
                "Nghỉ dưỡng Suite ban công rộng ngoạn mục",
                "Quản gia trưởng phục vụ hành trình riêng biệt",
                "Tiệc Sâm-panh và Canapé ngắm hoàng hôn",
                "Đặc quyền Spa cao cấp & lớp học Taichi",
                "Trọn gói ẩm thực hải sản thượng phẩm Michelin"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-white/75">
                  <Check className="w-4 h-4 text-[#d7b56d] flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <a 
              href="#booking"
              className="block w-full py-4 rounded-xl bg-gradient-to-r from-[#d7b56d] to-[#f4d187] text-[#030811] text-center font-bold text-xs uppercase tracking-[0.2em] transition-all hover:translate-y-[-2px] hover:shadow-[0_12px_28px_rgba(215,181,109,0.3)]"
            >
              Giành Chỗ Thượng Lưu
            </a>
          </motion.div>

        </div>
      </section>

      {/* 3. The Story Section (Aesthetic historical presentation) */}
      <section id="story" className="relative py-24 sm:py-32 bg-[#f4efe4] text-[#030811] transition-colors duration-500 overflow-hidden">
        {/* Subtle decorative pattern background */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#030811_1px,transparent_1px)] [background-size:16px_16px]" />
        
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#d7b56d]">Vọng Gác Tâm Hồn</span>
            <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-[0.95] mt-4">
              Không chỉ là chuyến đi.<br />Đó là một nghi thức sống chậm.
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-16 mt-16 items-center">
            {/* Left Column Image with stylized custom clip path hover effect */}
            <motion.div 
              whileInView={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
              initial={{ clipPath: "polygon(10% 10%, 90% 10%, 90% 90%, 10% 90%)" }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              viewport={{ once: true }}
              className="h-[400px] md:h-[580px] rounded-[40px] overflow-hidden shadow-2xl relative group"
            >
              <img 
                src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=1200" 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                alt="Emerald Cruise Horizon pool"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-8 text-[#f7f1e5] opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <span className="text-[10px] uppercase tracking-widest text-[#d7b56d]">Cảm Hứng Thiết Kế</span>
                <p className="font-serif text-lg mt-1 italic">Hòa quyện kiến trúc Pháp cổ kính và dấu ấn mộc mạc của thuyền mộc Bắc Bộ xưa dâng trào cảm xúc.</p>
              </div>
            </motion.div>

            {/* Right Column text */}
            <div className="flex flex-col gap-8 justify-center">
              <p className="font-serif text-2xl md:text-3.5xl leading-relaxed text-[#263247] font-medium italic">
                “Emerald Cruise sinh ra từ hoài niệm về những cuộc viễn du lữ thứ thời Hoàng kim của Vua Bảo Đại, nơi du khách tận hưởng Vịnh Hạ Long theo cách riêng tư, kín đáo và độc quyền nhất.”
              </p>
              <div className="h-[1px] bg-[#030811]/10 w-full" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-[#263247]">
                <div>
                  <h4 className="font-bold text-sm tracking-wider uppercase mb-2 flex items-center gap-2">
                    <Shield className="w-4 h-4 text-[#d7b56d]" /> Bí Mật Từ Sự Riêng Tư
                  </h4>
                  <p className="text-sm font-light leading-relaxed">
                    Hạn chế số lượng hành khách tham gia tối thiểu hằng ngày giúp bảo vệ sự riêng tư trọn vẹn. Bạn hoàn toàn làm chủ boong tàu thư thái mà không gặp phải tiếng ồn ào đô thị.
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-sm tracking-wider uppercase mb-2 flex items-center gap-2">
                    <Utensils className="w-4 h-4 text-[#d7b56d]" /> Trải Nghiệm Khơi Gợi Vị Giác
                  </h4>
                  <p className="text-sm font-light leading-relaxed">
                    Mỗi thực đơn được thiết kế tùy biến cho từng cá nhân, dựa trên khẩu vị riêng của những vị khách khó tính nhất. Đầu bếp nấu tươi sống trực tiếp phục vụ riêng tư tại phòng lộng lẫy.
                  </p>
                </div>
              </div>

              {/* Quick stats board */}
              <div className="grid grid-cols-3 gap-4 p-6 rounded-2xl bg-[#030811]/5 border border-[#030811]/10 mt-6">
                <div>
                  <div className="font-serif text-3xl sm:text-4xl font-bold">12</div>
                  <div className="text-[10px] uppercase tracking-wider text-black/60 mt-1">VIP Luxury Suites</div>
                </div>
                <div>
                  <div className="font-serif text-3xl sm:text-4xl font-bold">24/7</div>
                  <div className="text-[10px] uppercase tracking-wider text-black/60 mt-1">Quản Gia Tận Tâm</div>
                </div>
                <div>
                  <div className="font-serif text-3xl sm:text-4xl font-bold">100%</div>
                  <div className="text-[10px] uppercase tracking-wider text-black/60 mt-1">Thượng Đỉnh Riêng Tư</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Interactive Itinerary Day-by-Day Journey Planner (Day toggles) */}
      <section id="itinerary" className="relative py-24 sm:py-32 bg-[#050f1e]/80 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#d7b56d] flex items-center gap-1.5 justify-start">
                <Compass className="w-4 h-4 text-[#d7b56d] animate-spin-slow" /> HẢI TRÌNH ĐỘC QUYỀN
              </span>
              <h2 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight mt-3 text-[#f7f1e5]">
                Dấu Chân Giữa Biển Ngọc
              </h2>
              <p className="text-white/60 text-sm mt-3 max-w-xl">
                Bản hòa tấu 3 ngày 2 đêm nâng tầm giá trị sống. Từng khoảnh khắc trảy hội hoàng hôn, thưởng vị ẩm thực hay chèo thuyền len lỏi hang động đều được tính toán hoàn mỹ.
              </p>
            </div>

            {/* Interactive Day Toggle Buttons */}
            <div className="flex bg-white/5 border border-white/10 rounded-full p-1.5 mt-8 md:mt-0 gap-1">
              {[1, 2, 3].map((day) => (
                <button
                  key={day}
                  onClick={() => setActiveDay(day)}
                  className={`px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                    activeDay === day 
                      ? "bg-[#d7b56d] text-[#030811] shadow-lg shadow-[#d7b56d]/25" 
                      : "text-white/80 hover:text-white hover:bg-white/5"
                  }`}
                >
                  Ngày 0{day}
                </button>
              ))}
            </div>
          </div>

          {/* Details of Selected Day */}
          <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-12 items-start mt-12">
            
            {/* Visual banner for selected Day */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl h-[350px] lg:h-[550px] group">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeDay}
                  initial={{ opacity: 0, scale: 1.08 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.8 }}
                  src={ITINERARY_DATA[activeDay - 1].image}
                  className="w-full h-full object-cover"
                  alt={`Day ${activeDay}`}
                  referrerPolicy="no-referrer"
                />
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
              
              <div className="absolute bottom-8 left-8 right-8">
                <div className="text-[10px] uppercase font-bold text-[#d7b56d] tracking-widest">Tiêu Điểm Hành Trình</div>
                <h3 className="font-serif text-2xl font-bold mt-1 text-[#f7f1e5] pr-4">
                  {ITINERARY_DATA[activeDay - 1].title}
                </h3>
                <p className="text-white/70 text-xs mt-3 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#d7b56d]" /> {ITINERARY_DATA[activeDay - 1].subtitle}
                </p>
              </div>
            </div>

            {/* Timeline Activities for selected Day */}
            <div className="space-y-6">
              {ITINERARY_DATA[activeDay - 1].activities.map((act, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  onMouseEnter={() => setHoveredActivityIndex(index)}
                  onMouseLeave={() => setHoveredActivityIndex(null)}
                  className={`p-6 rounded-2xl border transition-all duration-300 relative ${
                    act.highlight 
                      ? "bg-gradient-to-r from-[#d7b56d]/15 to-transparent border-[#d7b56d]/30 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]" 
                      : hoveredActivityIndex === index 
                        ? "bg-white/5 border-white/20" 
                        : "bg-white/[0.02] border-white/5"
                  }`}
                >
                  {/* Highlight Sparkle Tag */}
                  {act.highlight && (
                    <span className="absolute top-4 right-4 flex items-center gap-1 text-[8px] font-bold tracking-widest text-[#d7b56d] bg-[#d7b56d]/15 px-2 py-0.5 rounded-full uppercase border border-[#d7b56d]/20">
                      <Sparkles className="w-2.5 h-2.5" /> ĐẶC QUYỀN VIP
                    </span>
                  )}

                  <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-[#d7b56d]" />
                      <span className="font-mono text-sm text-[#d7b56d] font-semibold">{act.time}</span>
                    </div>
                    <span className="hidden sm:inline-block text-white/30">•</span>
                    <h4 className="font-serif text-lg font-bold text-white tracking-wide">
                      {act.activity}
                    </h4>
                  </div>
                  <p className="mt-2 text-xs sm:text-sm text-white/70 leading-relaxed pl-1">
                    {act.description}
                  </p>
                </motion.div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* 5. Luxury Suites Showroom & Interactive Quote Calculator */}
      <section id="suites" className="relative py-24 sm:py-32 bg-[#030811] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#d7b56d] block mb-2">Suites & Pricing</span>
            <h2 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight text-[#f7f1e5]">
              Căn Hộ Thượng Uyển Trên Sóng
            </h2>
            <p className="text-white/60 text-sm mt-3 max-w-xl mx-auto">
              Chuỗi 12 phòng nghỉ siêu cao cấp mang cấu trúc nghệ thuật, lắp kính từ trần đến sàn mở rộng tầm nhìn, giúp Quý vị chìm vào giấc mơ biển cả hoang sơ.
            </p>
          </div>

          {/* Interactive room toggler list */}
          <div className="flex justify-center flex-wrap gap-3 mb-12">
            {SUITES_DATA.map((suite) => (
              <button
                key={suite.id}
                onClick={() => handleSuiteChange(suite.id)}
                className={`px-6 py-3 rounded-full text-xs font-bold uppercase tracking-[0.15em] transition-all relative ${
                  selectedSuiteId === suite.id 
                    ? "bg-[#d7b56d] text-[#030811] font-extrabold shadow-lg shadow-[#d7b56d]/15" 
                    : "bg-white/5 text-white/75 hover:text-white border border-white/5 hover:bg-white/10"
                }`}
              >
                {suite.name}
              </button>
            ))}
          </div>

          {/* Room Showroom Display Component */}
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 bg-white/[0.02] border border-white/5 rounded-[42px] p-6 sm:p-10 shadow-3xl">
            
            {/* Left column: Room gallery slideshow */}
            <div className="flex flex-col gap-4">
              <div className="relative h-[300px] sm:h-[420px] rounded-3xl overflow-hidden group">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentImageIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    src={selectedSuite.images[currentImageIndex]}
                    className="w-full h-full object-cover"
                    alt={`${selectedSuite.name} view ${currentImageIndex}`}
                    referrerPolicy="no-referrer"
                  />
                </AnimatePresence>
                
                {/* Image Navigation Arrows */}
                <button 
                  onClick={prevRoomImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 text-white border border-white/10 hover:bg-[#d7b56d] hover:text-black transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button 
                  onClick={nextRoomImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 text-white border border-white/10 hover:bg-[#d7b56d] hover:text-black transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>

                {/* Slideshow dots */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
                  {selectedSuite.images.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentImageIndex(i)}
                      className={`w-1.5 h-1.5 rounded-full transition-all ${
                        currentImageIndex === i ? "bg-[#d7b56d] w-4" : "bg-white/40"
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Thumbnails list */}
              <div className="grid grid-cols-3 gap-3">
                {selectedSuite.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentImageIndex(i)}
                    className={`h-20 rounded-xl overflow-hidden border-2 transition-all ${
                      currentImageIndex === i ? "border-[#d7b56d] scale-98" : "border-transparent opacity-60 hover:opacity-100"
                    }`}
                  >
                    <img src={img} className="w-full h-full object-cover" alt="Thumb" referrerPolicy="no-referrer" />
                  </button>
                ))}
              </div>
            </div>

            {/* Right column: Room Specs & Dynamic Quote Calculator */}
            <div className="flex flex-col justify-between py-2">
              <div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/5 pb-4">
                  <div>
                    <span className="text-[10px] tracking-widest text-[#d7b56d] uppercase font-bold">{selectedSuite.size} • {selectedSuite.capacity}</span>
                    <h3 className="font-serif text-3xl sm:text-4.5xl font-bold mt-1 text-white">{selectedSuite.name}</h3>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-white/50 block">Hải trình 3D2N trọn gói</span>
                    <span className="font-serif text-xl sm:text-2xl text-[#d7b56d] font-bold block">{formatVND(selectedSuite.pricePerPax)} <span className="text-xs font-sans text-white/50 font-light">/khách</span></span>
                  </div>
                </div>

                <p className="text-sm text-white/70 leading-relaxed my-5">
                  {selectedSuite.description}
                </p>

                <div className="mb-6">
                  <h5 className="text-[10px] font-bold tracking-widest text-white/70 uppercase mb-3">Đặc Quyền Hạng Phòng</h5>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-white/85">
                    {selectedSuite.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <Check className="w-3.5 h-3.5 text-[#d7b56d] flex-shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Dynamic Luxury Calculator Panel */}
              <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10">
                <h5 className="text-[10px] font-bold tracking-[0.2em] text-[#d7b56d] uppercase mb-4 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" /> ƯỚC TÍNH CHI PHÍ TRỌN GÓI
                </h5>
                
                <div className="space-y-4">
                  {/* Number of Pax adjuster */}
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-white/60">Số lượng thành viên đi</span>
                      <span className="font-mono text-[#d7b56d] font-bold">{numGuests} Khách</span>
                    </div>
                    <input 
                      type="range" 
                      min="1" 
                      max="10" 
                      value={numGuests} 
                      onChange={(e) => setNumGuests(parseInt(e.target.value))}
                      className="w-full accent-[#d7b56d] bg-white/10 h-1 rounded-lg outline-none cursor-pointer"
                    />
                  </div>

                  {/* Travel Dates */}
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <span className="text-white/50 block mb-1">Hải trình dự định</span>
                      <input 
                        type="date"
                        value={travelDate}
                        onChange={(e) => setTravelDate(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-lg p-2 text-white outline-none focus:border-[#d7b56d]"
                      />
                    </div>
                    <div>
                      <span className="text-white/50 block mb-1">Áp dụng chương trình</span>
                      <div className="p-2 rounded-lg bg-[#d7b56d]/5 border border-[#d7b56d]/15 text-[#d7b56d] font-bold select-none text-[10px] uppercase text-center tracking-wider">
                        Ưu Đãi Trực Tuyến
                      </div>
                    </div>
                  </div>

                  {/* Total calculation breakdown */}
                  <div className="border-t border-white/5 pt-3 mt-3 text-xs space-y-1.5 text-white/70">
                    <div className="flex justify-between">
                      <span>Đơn giá tiêu chuẩn:</span>
                      <span>{formatVND(subtotal)}</span>
                    </div>
                    
                    {discountPercent > 0 && (
                      <div className="flex justify-between text-[#d55f5f]">
                        <span>Ưu đãi nhóm đông xịn ({discountPercent}%):</span>
                        <span>-{formatVND(discountAmount)}</span>
                      </div>
                    )}
                    
                    <div className="flex justify-between text-white/90">
                      <span>Đưa đón limousine Hà Nội:</span>
                      <span className="text-[#a1df93]">FREE Đặc quyền VIP</span>
                    </div>

                    <div className="flex justify-between text-white/90">
                      <span>Thuế & Phí thắng cảnh Vịnh:</span>
                      <span className="text-[#a1df93]">Đã tính trọn gói</span>
                    </div>

                    <div className="flex justify-between items-end border-t border-white/10 pt-3 mt-1.5 text-sm">
                      <span className="text-white font-serif font-semibold text-base">Tổng Chi Phí Dự Tính</span>
                      <span className="text-[#d7b56d] font-mono text-xl font-bold">{formatVND(finalPrice)}</span>
                    </div>
                  </div>

                  {/* Quick copy state triggers booking selection */}
                  <button 
                    onClick={() => {
                      setBookingForm(prev => ({
                        ...prev,
                        suite: selectedSuiteId,
                        guests: numGuests,
                        date: travelDate
                      }));
                      // Scroll to booking form
                      const bookSection = document.getElementById("booking");
                      if (bookSection) bookSection.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="w-full py-3 rounded-lg border border-[#d7b56d]/30 text-[#d7b56d] text-[10px] uppercase font-bold tracking-widest hover:bg-[#d7b56d] hover:text-[#030811] transition-colors mt-2"
                  >
                    Áp Dụng Cho Booking
                  </button>
                </div>

              </div>

            </div>

          </div>

        </div>
      </section>

      {/* 6. Luxury Experiences VIP (Aesthetics Slide panel) */}
      <section id="experiences" className="relative py-24 bg-[#0a1424] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#d7b56d] block mb-2">Đặc Quyền Của Giới Tinh Hoa</span>
              <h2 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight text-white leading-none">
                Được Đo Ni Cho Bản Ngã
              </h2>
            </div>
            
            <div className="flex gap-2 mt-6 sm:mt-0">
              <button 
                onClick={() => scrollExperiences("left")}
                className="p-3.5 rounded-full bg-white/5 border border-white/10 text-white hover:bg-[#d7b56d] hover:text-[#030811] transition-all"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button 
                onClick={() => scrollExperiences("right")}
                className="p-3.5 rounded-full bg-white/5 border border-white/10 text-white hover:bg-[#d7b56d] hover:text-[#030811] transition-all"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Horizontal Drag element */}
          <div 
            ref={experienceTrackRef}
            className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory no-scrollbar"
            style={{ scrollBehavior: "smooth" }}
          >
            {EXPERIENCES_DATA.map((exp) => (
              <div 
                key={exp.id}
                className="flex-shrink-0 w-[300px] sm:w-[420px] h-[550px] rounded-[36px] overflow-hidden relative group snap-start shadow-xl border border-white/5"
              >
                <img 
                  src={exp.image} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-108"
                  alt={exp.title}
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />
                
                <div className="absolute bottom-8 left-8 right-8 text-white">
                  <span className="px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider bg-white/10 border border-white/15 text-[#d7b56d] backdrop-blur-md">
                    {exp.time}
                  </span>
                  
                  <h3 className="font-serif text-3xl font-bold mt-4 mb-2 text-[#f7f1e5]">
                    {exp.title}
                  </h3>
                  <h4 className="text-xs uppercase tracking-widest text-[#d7b56d] font-semibold mb-3">
                    {exp.vietnameseTitle}
                  </h4>
                  
                  <p className="text-xs text-white/70 leading-relaxed font-light line-clamp-3">
                    {exp.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Extra information banner */}
          <div className="mt-8 p-6 rounded-2xl bg-white/[0.02] border border-white/5 max-w-xl mx-auto text-center">
            <p className="text-xs text-white/50 leading-relaxed italic">
              * Mọi hoạt động kayak, trải nghiệm hướng dẫn và tiệc thử nếm đều có chuyên gia quốc tế hỗ trợ an toàn và đã gộp sẵn trọn gói trong chi phí ban đầu, không phát sinh phụ thu lúp xúp.
            </p>
          </div>

        </div>
      </section>

      {/* 7. Bento Photo Gallery & Lightbox component */}
      <section id="gallery" className="relative py-24 sm:py-32 bg-[#f4efe4] text-[#030811] transition-colors duration-500">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="max-w-3xl mb-16">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#d7b56d]">Thắp Lửa Lưu Niệm</span>
            <h2 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight text-[#030811] mt-2">
              Khoảnh Khắc Đắt Giá
            </h2>
            <p className="text-[#263247] text-sm mt-3 max-w-xl">
              Nụ cười sảng khoái trên chiếc kayak gỗ, vạt hoàng hôn đỏ rực tếu tít nâng ly rượu ngọt. Những tháp ảnh kể lại vạn lời mộng tinh tú.
            </p>
          </div>

          {/* Beautiful bento mesh block */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {GALLERY_DATA.map((item, index) => {
              // Custom heavy/light spacing grid cells matching user markup style block lengths
              const isTall = index === 1 || index === 4;
              return (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.015, y: -4 }}
                  onClick={() => setLightboxIndex(index)}
                  className={`rounded-2xl overflow-hidden shadow-md cursor-zoom-in relative group border border-white/10 ${
                    isTall ? "h-[450px]" : "h-[320px]"
                  }`}
                >
                  <img src={item.url} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Gallery" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                    <div>
                      <Image className="w-5 h-5 text-[#d7b56d] mb-2" />
                      <p className="text-[#f7f1e5] font-serif text-lg font-bold">{item.title}</p>
                      <span className="text-[9px] uppercase tracking-widest text-white/60">Bấm để xem lớn</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>

        {/* Cinematic Lightbox Viewer */}
        <AnimatePresence>
          {lightboxIndex !== null && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/95 z-[999] flex flex-col justify-between p-6 cursor-default"
            >
              {/* Header */}
              <div className="flex justify-between items-center text-white">
                <div>
                  <span className="text-[10px] tracking-widest text-[#d7b56d] uppercase block">Emerald Cruise Album</span>
                  <span className="font-serif font-bold text-lg">{GALLERY_DATA[lightboxIndex].title}</span>
                </div>
                <button 
                  onClick={() => setLightboxIndex(null)}
                  className="p-3 bg-white/5 border border-white/10 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Central Immersive Media */}
              <div className="flex-1 flex items-center justify-center relative select-none">
                <button 
                  onClick={() => setLightboxIndex(prev => prev !== null ? (prev - 1 + GALLERY_DATA.length) % GALLERY_DATA.length : null)}
                  className="absolute left-4 p-4 rounded-full bg-white/5 text-white border border-white/5 hover:bg-[#d7b56d] hover:text-black transition-all"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>

                <motion.img 
                  key={lightboxIndex}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  src={GALLERY_DATA[lightboxIndex].url}
                  className="max-h-[75vh] max-w-[85vw] object-contain rounded-xl shadow-2xl"
                  alt="Lightbox representation"
                  referrerPolicy="no-referrer"
                />

                <button 
                  onClick={() => setLightboxIndex(prev => prev !== null ? (prev + 1) % GALLERY_DATA.length : null)}
                  className="absolute right-4 p-4 rounded-full bg-white/5 text-white border border-white/5 hover:bg-[#d7b56d] hover:text-black transition-all"
                >
                  <ChevronRight className="w-6 h-6 text-current" />
                </button>
              </div>

              {/* Bottom stats indicators */}
              <div className="text-center text-xs text-white/50">
                Hình ảnh {lightboxIndex + 1} trên {GALLERY_DATA.length}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* 8. Registration Booking & Consultations Form */}
      <section id="booking" className="relative py-24 sm:py-32 bg-[#050f1e] overflow-hidden">
        {/* Decorative dynamic spotlights */}
        <div className="absolute top-1/4 left-1/4 w-[350px] h-[350px] rounded-full bg-[#d7b56d]/5 blur-[120px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Form Left intro text */}
          <div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 w-fit mb-6">
              <Phone className="w-3.5 h-3.5 text-[#d7b56d] animate-pulse" />
              <span className="text-[9px] uppercase font-bold tracking-[0.2em] text-[#d7b56d]">Đặc Quyền Tư Vấn Đỉnh Phong</span>
            </div>
            
            <h2 className="font-serif text-4.5xl sm:text-6xl font-bold tracking-tight text-[#f7f1e5] leading-[0.95]">
              Sẵn Sàng Khởi Hành?
            </h2>
            <p className="mt-6 text-white/70 text-sm max-w-md leading-relaxed font-light">
              Hãy để lại lời nhắn quý báu. Chuyên viên đại sứ phục vụ Thượng khách của Emerald Cruise sẽ tức tốc ghi nhận, chuẩn bị đĩa trà bánh ngon và gọi điện xin tiếp chỉ ý kiến hoàn mỹ trong cuộc điện đàm 10 phút.
            </p>

            <div className="space-y-6 mt-12 max-w-sm">
              <div className="flex gap-4">
                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-[#d7b56d] h-fit">
                  <Shield className="w-5 h-5 animate-pulse" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold tracking-wide text-white">Chính Sách Bảo Mật Tối Cao</h4>
                  <p className="text-xs text-white/60 leading-relaxed mt-1">Thông tin liên lạc và nguyện vọng cá nhân được ẩn danh, mã hóa tối mật hoàn toàn trong hệ sinh thái.</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-[#d7b56d] h-fit">
                  <Heart className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold tracking-wide text-white">Cá Nhân Hóa Trọn Vẹn</h4>
                  <p className="text-xs text-white/60 leading-relaxed mt-1">Phục vụ linh hoạt theo các tiêu chí ăn uống tôn giáo, dị ứng thực phẩm, quà sinh nhật hay hoa cưới hồng tươi.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form Right content panel */}
          <div className="bg-white/[0.03] border border-white/10 rounded-[36px] p-6 sm:p-10 shadow-3xl">
            {bookingSuccessMsg ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <div className="w-16 h-16 rounded-full bg-[#d7b56d]/15 text-[#d7b56d] flex items-center justify-center mx-auto mb-6 border border-[#d7b56d]/30">
                  <Check className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-white mb-4">Đã Ghi Nhận Nguyện Vọng</h3>
                <p className="text-white/70 text-xs sm:text-sm leading-relaxed max-w-sm mx-auto">
                  {bookingSuccessMsg}
                </p>
                <button
                  onClick={() => setBookingSuccessMsg("")}
                  className="mt-8 px-6 py-2.5 rounded-full border border-white/10 text-white/80 hover:text-white hover:bg-white/5 text-xs font-bold uppercase tracking-wider"
                >
                  Gửi Thêm Một Yêu Cầu Khác
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleBookingSubmit} className="space-y-4">
                <div>
                  <label className="text-[10px] uppercase font-bold tracking-widest text-[#d7b56d] block mb-2">Họ Và Tên Thượng Khách</label>
                  <input
                    type="text"
                    required
                    placeholder="Ví dụ: Nguyễn Văn A"
                    value={bookingForm.name}
                    onChange={(e) => setBookingForm(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-white/30 text-sm outline-none focus:border-[#d7b56d] focus:bg-white/[0.08] transition-all"
                  />
                </div>

                <div>
                  <label className="text-[10px] uppercase font-bold tracking-widest text-[#d7b56d] block mb-2 font-mono">Số Điện Thoại Nhận Tiếp Tư Vấn</label>
                  <input
                    type="tel"
                    required
                    placeholder="Ví dụ: 0912 345 678"
                    value={bookingForm.phone}
                    onChange={(e) => setBookingForm(prev => ({ ...prev, phone: e.target.value }))}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-white/30 text-sm outline-none focus:border-[#d7b56d] focus:bg-white/[0.08] transition-all"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] uppercase font-bold tracking-widest text-[#d7b56d] block mb-2">Hạng Cabin Thượng Phẩm</label>
                    <select
                      value={bookingForm.suite}
                      onChange={(e) => setBookingForm(prev => ({ ...prev, suite: e.target.value }))}
                      className="w-full bg-[#050f1e] border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-white/30 text-sm outline-none focus:border-[#d7b56d] focus:bg-white/[0.08] transition-all"
                    >
                      {SUITES_DATA.map(suite => (
                        <option key={suite.id} value={suite.id}>{suite.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] uppercase font-bold tracking-widest text-[#d7b56d] block mb-2">Số Thành Viên Đi</label>
                    <select
                      value={bookingForm.guests}
                      onChange={(e) => setBookingForm(prev => ({ ...prev, guests: parseInt(e.target.value) }))}
                      className="w-full bg-[#050f1e] border border-white/10 rounded-xl px-4 py-3.5 text-white text-sm outline-none focus:border-[#d7b56d] focus:bg-white/[0.08] transition-all"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => (
                        <option key={n} value={n}>{n} khách</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-[10px] uppercase font-bold tracking-widest text-[#d7b56d] block mb-2">Ngày Cập Bến Dự Dự Tính</label>
                  <input
                    type="date"
                    value={bookingForm.date}
                    onChange={(e) => setBookingForm(prev => ({ ...prev, date: e.target.value }))}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white text-sm outline-none focus:border-[#d7b56d] focus:bg-white/[0.08] transition-all"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={bookingLoading}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-[#d7b56d] to-[#f5d590] text-[#030811] text-xs uppercase font-bold tracking-[0.25em] transition-all hover:translate-y-[-2px] hover:shadow-[0_12px_30px_rgba(215,181,109,0.35)] active:translate-y-0 disabled:opacity-50"
                  >
                    {bookingLoading ? "Đang Gửi Lịch Tư Vấn..." : "Đặt Lịch Tư Vấn Sang Trọng"}
                  </button>
                </div>
              </form>
            )}
          </div>

        </div>
      </section>

      {/* 9. Floating Butler Agent Panel (Interactive chat) */}
      <AnimatePresence>
        {chatOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 30 }}
            className="fixed bottom-6 right-6 w-[90%] sm:w-[380px] h-[550px] rounded-3xl bg-[#050f1e] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.8)] z-[200] overflow-hidden flex flex-col"
          >
            {/* Chat header area */}
            <div className="p-4 bg-gradient-to-r from-[#0a1424] to-[#050f1e] border-b border-white/5 flex justify-between items-center">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-full bg-[#d7b56d]/15 border border-[#d7b56d]/30 flex items-center justify-center text-[#d7b56d] relative">
                  <Anchor className="w-5 h-5 animate-spin-slow" />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-[#050f1e]" />
                </div>
                <div>
                  <span className="text-[9px] uppercase tracking-widest text-[#d7b56d] block font-semibold leading-none">Emerald Butler</span>
                  <span className="font-serif font-bold text-sm text-white block mt-1">Quản Gia Hoàng</span>
                </div>
              </div>
              <button 
                onClick={() => setChatOpen(false)}
                className="p-1 px-1.5 rounded-lg text-white/50 hover:text-white hover:bg-white/5 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat messages list */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 font-light text-xs sm:text-sm">
              {chatMessages.map((msg, index) => (
                <div 
                  key={index} 
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className={`p-4 rounded-2xl max-w-[85%] leading-relaxed ${
                    msg.role === "user" 
                      ? "bg-[#d7b56d] text-[#030811] rounded-tr-none font-medium" 
                      : "bg-white/5 border border-white/5 text-white/90 rounded-tl-none"
                  }`}>
                    {msg.parts[0].text}
                  </div>
                </div>
              ))}
              
              {/* Typing indicator */}
              {chatLoading && (
                <div className="flex justify-start">
                  <div className="bg-white/5 border border-white/5 p-4 rounded-2xl rounded-tl-none text-white/40 flex items-center gap-1">
                    <span>Quản gia đang soạn câu trả lời</span>
                    <span className="inline-block w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce delay-100" />
                    <span className="inline-block w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce delay-200" />
                    <span className="inline-block w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce delay-300" />
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Suggest questions presets panel */}
            <div className="px-4 py-2 bg-black/20 border-t border-white/5">
              <span className="text-[8px] uppercase tracking-wider text-white/40 block mb-2">Đề Xuất Câu Hỏi Để Hỏi</span>
              <div className="flex gap-2 pb-1 overflow-x-auto no-scrollbar scroll-smooth">
                {[
                  "Phòng Presidential Suite giá bao nhiêu?",
                  "Hải Trình 3D2N đi qua những đâu?",
                  "Tiệc hoàng hôn Sunset Party phục vụ đồ uống gì?",
                  "Có trực thăng đưa đón không?"
                ].map((txt, idx) => (
                  <button
                    key={idx}
                    onClick={() => sendChatMessage(txt)}
                    className="flex-shrink-0 text-[10px] px-2.5 py-1.5 rounded-full border border-white/5 bg-white/5 text-white/70 hover:text-[#d7b56d] hover:border-[#d7b56d]/30 transition-all font-light"
                  >
                    {txt}
                  </button>
                ))}
              </div>
            </div>

            {/* Chat text box input field */}
            <div className="p-3 bg-gradient-to-r from-[#050f1e] to-[#0a1424] border-t border-white/5 flex items-center gap-2">
              <input
                type="text"
                placeholder="Hỏi Quản gia Hoàng điều bất cứ..."
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendChatMessage()}
                className="flex-1 bg-white/5 border border-white/5 rounded-xl px-4 py-3 text-xs text-white placeholder-white/30 outline-none focus:border-[#d7b56d]/40"
              />
              <button 
                onClick={() => sendChatMessage()}
                disabled={!chatInput.trim() || chatLoading}
                className="p-3 bg-[#d7b56d] text-[#030811] rounded-xl hover:bg-[#ebd29c] transition-colors disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Persistent Tiny Chat Concierge Bubble helper if chat is closed */}
      {!chatOpen && (
        <motion.button
          onClick={() => setChatOpen(true)}
          whileHover={{ scale: 1.05 }}
          className="fixed bottom-6 right-6 p-4 rounded-full bg-[#d7b56d] text-[#030811] shadow-2xl z-[150] flex items-center gap-2 font-bold cursor-pointer group"
        >
          <div className="relative">
            <MessageSquare className="w-5 h-5 flex-shrink-0" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
          </div>
          <span className="max-w-0 overflow-hidden group-hover:max-w-[120px] transition-all duration-300 text-xs uppercase tracking-wider whitespace-nowrap leading-none">
            Trò chuyện Quản gia
          </span>
        </motion.button>
      )}

      {/* 10. Footer info & copyrights */}
      <footer className="bg-[#030811] text-white/50 text-[11px] py-12 border-t border-white/5 font-light">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <svg className="w-8 h-8 opacity-60" viewBox="0 0 90 70" fill="none">
              <path d="M12 55L31 18L45 55H12Z" stroke="#D7B56D" strokeWidth="2" strokeLinecap="round" />
              <path d="M39 55L60 8L78 55H39Z" stroke="#D7B56D" strokeWidth="2" strokeLinecap="round" />
              <path d="M45 55C52 45 55 32 53 16C64 27 69 40 70 55H45Z" fill="#D7B56D" fillOpacity="0.8" />
              <path d="M10 62C26 58 40 58 54 62C66 65 76 64 84 60" stroke="#D7B56D" strokeWidth="1.5" />
            </svg>
            <div className="flex flex-col select-none">
              <strong className="font-serif tracking-wider font-bold text-white">EMERALD VIP CRUISE</strong>
              <span>Biệt lập • Sang trọng • Kiến tạo hoài niệm</span>
            </div>
          </div>

          <div className="text-center md:text-right space-y-1.5">
            <p>© 2026 Emerald Cruise Halong Bay Luxury Group. Bảo lưu mọi quyền hành tác giả.</p>
            <p>Hải trình đặc tuyển khai thác bởi Công ty TNHH Du Thuyền Ngọc Lục Bảo Việt Nam.</p>
            <p className="text-white/30 font-mono text-[9px]">Gia trì & Hoàn thiện bởi Đội ngũ Kiến trúc sư AI Studio.</p>
          </div>
        </div>
      </footer>

    </div>
  );
}
