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
  Menu,
  ChevronDown,
  Facebook,
  Instagram,
  Youtube,
  Mail
} from "lucide-react";
import { SUITES_DATA, EXPERIENCES_DATA, ITINERARY_DATA, GALLERY_DATA } from "./data";
import { SuiteType, ChatMessageType } from "./types";
import { TRANSLATIONS } from "./translations";

export default function App() {
  // Language switcher state (defaults to Vietnamese)
  const [lang, setLang] = useState<"vi" | "en">("vi");
  const t = TRANSLATIONS[lang];

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
  const [expandedActivityIndex, setExpandedActivityIndex] = useState<number | null>(null);

  // Gallery lightbox state
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [mobileGalleryIndex, setMobileGalleryIndex] = useState(0);
  const [mobileGalleryDirection, setMobileGalleryDirection] = useState(1);

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
      parts: [{ text: TRANSLATIONS.vi.chat_welcome }]
    }
  ]);
  const [chatInput, setChatInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Custom dropdown states & refs
  const [suiteOpen, setSuiteOpen] = useState(false);
  const [guestsOpen, setGuestsOpen] = useState(false);
  const suiteDropdownRef = useRef<HTMLDivElement>(null);
  const guestsDropdownRef = useRef<HTMLDivElement>(null);

  // Click outside listener for custom dropdowns
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (suiteDropdownRef.current && !suiteDropdownRef.current.contains(event.target as Node)) {
        setSuiteOpen(false);
      }
      if (guestsDropdownRef.current && !guestsDropdownRef.current.contains(event.target as Node)) {
        setGuestsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Synchronize chat welcome message with current language selection if it's the first message
  useEffect(() => {
    if (chatMessages.length === 1) {
      setChatMessages([
        {
          role: "model",
          parts: [{ text: t.chat_welcome }]
        }
      ]);
    }
  }, [lang]);

  // Experiences slider horizontal position state
  const experienceTrackRef = useRef<HTMLDivElement>(null);

  // Scroll handler to monitor active section & apply header styling
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
      discountPercent = 10;
    } else if (numGuests >= 4) {
      discountPercent = 5;
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
      alert(lang === "vi" ? "Quý khách vui lòng cung cấp Họ tên và Số điện thoại liên lạc." : "Please provide your Full Name and Contact Phone Number.");
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
        throw new Error(data.error || "Connection error");
      }
    } catch (err: any) {
      console.error(err);
      // Fallback response for offline status
      setBookingSuccessMsg(
        lang === "vi"
          ? `Kính thưa Quý khách ${bookingForm.name}, yêu cầu tư vấn chuyến đi đã được Quản gia tiếp nhận thành công. Chuyên viên dịch vụ của Intercoin Resort sẽ chủ động gọi lại cho Quý khách qua số điện thoại ${bookingForm.phone} trong vòng 10 phút.`
          : `Dear Guest ${bookingForm.name}, your request has been successfully logged by our Butler. Intercoin Resort service representative will call you back at ${bookingForm.phone} within 10 minutes.`
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
          chatHistory: formattedHistory,
          lang: lang // Pass selected language down to backend
        })
      });

      const data = await response.json();
      
      const butlerReply: ChatMessageType = {
        role: "model",
        parts: [{ text: data.text || (lang === "vi" ? "Kết nối đang gián đoạn. Bạn có thể thử gửi lại câu hỏi hoặc để lại yêu cầu tư vấn để đội ngũ Intercoin hỗ trợ." : "The connection was interrupted. Please try again or leave a consultation request for the Intercoin team.") }]
      };
      setChatMessages((prev) => [...prev, butlerReply]);
    } catch (error) {
      console.error("Chat Error:", error);
      const errorReply: ChatMessageType = {
        role: "model",
        parts: [{ text: t.chat_err_butler }]
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
          className={`flex items-center justify-between px-3 sm:px-6 py-2.5 sm:py-4 rounded-full backdrop-blur-xl transition-all duration-500 ${
            isLightHeader 
              ? "bg-white/60 border border-[#030811]/10 shadow-[0_15px_35px_rgba(3,8,17,0.12)]" 
              : "bg-[#030811]/35 border border-white/10 shadow-[0_15px_35px_rgba(0,0,0,0.6)]"
          }`}
        >
          <a href="#hero" className="flex items-center gap-1.5 sm:gap-3 group flex-shrink-0">
            {/* Intercoin monogram */}
            <svg className="w-9 h-7 sm:w-12 sm:h-10 transition-transform duration-500 group-hover:-translate-y-0.5" viewBox="0 0 90 70" fill="none">
              <circle cx="45" cy="35" r="25" stroke="#D7B56D" strokeWidth="3" />
              <path d="M34 21V49" stroke="#D7B56D" strokeWidth="5" strokeLinecap="round" />
              <path d="M58 24C54 20 47 20 43 24C37 30 37 40 43 46C47 50 54 50 58 46" stroke={isLightHeader ? "#030811" : "#F4D187"} strokeWidth="5" strokeLinecap="round" className="transition-all duration-500" />
              <path d="M16 59C31 55 58 55 74 59" stroke="#D7B56D" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <div className="flex flex-col leading-none">
              <strong className={`font-serif text-base sm:text-xl tracking-[0.16em] font-bold transition-colors duration-500 ${isLightHeader ? "text-[#030811]" : "text-[#f7f1e5]"}`}>INTERCOIN</strong>
              <span className="text-[7px] sm:text-[8px] tracking-[0.35em] text-[#d7b56d] font-semibold mt-0.5 sm:mt-1">RESORT • DA NANG</span>
            </div>
          </a>

          {/* Desktop Links */}
          <nav className="hidden xl:flex items-center gap-8 flex-shrink-0">
            {[
              { id: "story", label: t.story },
              { id: "itinerary", label: t.itinerary },
              { id: "suites", label: t.suites },
              { id: "experiences", label: t.experiences },
              { id: "gallery", label: t.gallery }
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

          {/* Action CTA, Lang Switcher & Mobile trigger */}
          <div className="flex items-center gap-1.5 sm:gap-3 flex-shrink-0">
            <a 
              href="#booking" 
              className="hidden sm:inline-block whitespace-nowrap flex-shrink-0 px-5 py-2.5 rounded-full bg-[#d7b56d] text-[#030811] text-[10px] uppercase font-bold tracking-[0.2em] hover:-translate-y-0.5 transition-all duration-300 hover:shadow-[0_8px_25px_rgba(215,181,109,0.35)]"
            >
              {t.book_now}
            </a>

            {/* Language Switcher Button (Single toggle) */}
            <button 
              onClick={() => setLang(prev => prev === "vi" ? "en" : "vi")}
              className={`px-2 py-1 sm:px-3.5 sm:py-2 rounded-full border text-[9px] sm:text-[10px] font-bold tracking-wider cursor-pointer transition-all duration-300 flex-shrink-0 ${
                isLightHeader 
                  ? "bg-[#030811]/5 border-[#030811]/15 text-[#030811] hover:bg-[#030811]/10 hover:text-[#d7b56d]" 
                  : "bg-white/5 border-white/10 text-[#d7b56d] hover:bg-white/10 hover:text-white"
              }`}
            >
              {lang === "vi" ? "VI" : "EN"}
            </button>

            <button 
              onClick={() => setMobileMenuOpen(prev => !prev)}
              className={`xl:hidden p-1.5 sm:p-2 rounded-full transition-colors flex-shrink-0 ${isLightHeader ? "text-[#030811] hover:bg-black/5" : "text-white hover:bg-white/5"}`}
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
              className="absolute top-20 left-0 w-full bg-[#050f1e]/95 border border-white/10 backdrop-blur-2xl rounded-3xl p-6 flex flex-col gap-4 shadow-2xl xl:hidden"
            >
              {[
                { id: "story", label: t.story },
                { id: "itinerary", label: t.itinerary },
                { id: "suites", label: t.suites },
                { id: "experiences", label: t.experiences },
                { id: "gallery", label: t.gallery },
                { id: "booking", label: t.book_now }
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
                <span>{t.chat_mobile_butler}</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* 2. Hero Section */}
      <section id="hero" className="relative min-h-screen lg:h-screen flex items-end justify-between overflow-hidden pt-28 lg:pt-0">
        {/* Dynamic slow zoom backdrop */}
        <div className="absolute inset-0 z-0">
          <motion.img 
            initial={{ scale: 1.12 }}
            animate={{ scale: 1.0 }}
            transition={{ duration: 15, ease: "easeOut" }}
            src="/images/danang_golden_bridge.png"
            className="w-full h-full object-cover" 
            alt="Intercoin Resort Da Nang"
            referrerPolicy="no-referrer"
          />
          {/* Immersive overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#030811] via-[#030811]/30 to-[#030811]/60" />
        </div>

        <div className="relative z-10 w-full max-w-[1536px] xl:max-w-[1600px] mx-auto px-6 lg:px-16 xl:px-24 pb-16 md:pb-24 grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-20 xl:gap-32 items-center">
          
          {/* Hero Left Content */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2 }}
            className="flex flex-col items-start lg:-ml-8 xl:-ml-16"
          >
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6">
              <Compass className="w-4 h-4 text-[#d7b56d] animate-spin-slow" />
              <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#d7b56d]">{t.hero_badge}</span>
            </div>
            
            <h1 className="font-serif text-5xl sm:text-6xl md:text-8xl lg:text-[7.5rem] font-bold leading-[1.1] tracking-tight text-[#f7f1e5]">
              {t.hero_title_line1}
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f7f1e5] via-[#efd398] to-[#d7b56d]">{t.hero_title_line2}</span>
              <br />
              {t.hero_title_line3}
            </h1>
            
            <p className="mt-8 text-white/75 text-base md:text-lg max-w-lg leading-relaxed font-light">
              {t.hero_desc}
            </p>

            {/* Premium action buttons in Left Content */}
            <div className="mt-10 flex flex-wrap gap-4 items-center">
              <a 
                href="#booking"
                className="px-8 py-4 rounded-full bg-gradient-to-r from-[#d7b56d] to-[#f4d187] text-[#030811] text-xs font-bold uppercase tracking-[0.2em] transition-all hover:translate-y-[-2px] hover:shadow-[0_12px_28px_rgba(215,181,109,0.3)]"
              >
                {t.hero_card_cta}
              </a>
              <a 
                href="#itinerary"
                className="px-8 py-4 rounded-full border border-white/20 hover:border-white/50 text-[#f7f1e5] text-xs font-bold uppercase tracking-[0.2em] transition-all hover:bg-white/5"
              >
                {lang === "vi" ? "Lịch Trình Chi Tiết" : "View Itinerary"}
              </a>
            </div>
          </motion.div>

          {/* Hero Desktop Image Collage (Arch & Wave Layout) */}
          <motion.div 
            initial={{ opacity: 0, x: 50, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.5 }}
            className="hidden lg:grid grid-cols-2 gap-5 items-center w-full max-w-lg xl:max-w-[640px] mx-auto"
          >
            {/* Left Column - Arched Top Image */}
            <div className="h-[380px] sm:h-[480px] lg:h-[600px] rounded-t-[160px] sm:rounded-t-[200px] rounded-b-[24px] sm:rounded-b-[32px] overflow-hidden border border-white/10 shadow-[0_20px_45px_rgba(0,0,0,0.5)] relative group">
              <img 
                src="/images/danang_golden_bridge.png" 
                className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-110" 
                alt="Cầu Vàng Bà Nà Hills, biểu tượng nổi tiếng của Đà Nẵng"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 border-[2px] border-transparent group-hover:border-[#d7b56d]/25 rounded-t-[160px] sm:rounded-t-[200px] rounded-b-[24px] sm:rounded-b-[32px] transition-all duration-700 pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Right Column - Stack of 2 Images */}
            <div className="flex flex-col gap-4 lg:gap-5">
              {/* Top Right - Rounded Corner Beach Image */}
              <div className="h-[180px] sm:h-[230px] lg:h-[290px] rounded-[24px] sm:rounded-[32px] overflow-hidden border border-white/10 shadow-[0_20px_45px_rgba(0,0,0,0.5)] relative group">
                <img 
                  src="/images/danang_my_khe_beach.jpg" 
                  className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-110" 
                  alt="Bãi biển Mỹ Khê, Đà Nẵng"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 border-[2px] border-transparent group-hover:border-[#d7b56d]/25 rounded-[24px] sm:rounded-[32px] transition-all duration-700 pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Bottom Right - Arched Bottom Pool Image */}
              <div className="h-[180px] sm:h-[230px] lg:h-[290px] rounded-b-[160px] sm:rounded-b-[200px] rounded-t-[24px] sm:rounded-t-[32px] overflow-hidden border border-white/10 shadow-[0_20px_45px_rgba(0,0,0,0.5)] relative group">
                <img 
                  src="/images/danang_dragon_bridge.jpg" 
                  className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-110" 
                  alt="Cầu Rồng Đà Nẵng rực sáng về đêm"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 border-[2px] border-transparent group-hover:border-[#d7b56d]/25 rounded-b-[160px] sm:rounded-b-[200px] rounded-t-[24px] sm:rounded-t-[32px] transition-all duration-700 pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* 3. The Story Section */}
      <section id="story" className="relative py-24 sm:py-32 bg-[#f4efe4] text-[#030811] transition-colors duration-500 overflow-hidden">
        {/* Decorative pattern */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#030811_1px,transparent_1px)] [background-size:16px_16px]" />
        
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#d7b56d]">{t.story_badge}</span>
            <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-[1.15] mt-4">
              {t.story_title}
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-16 mt-16 items-center">
            {/* Left Image */}
            <motion.div 
              whileInView={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
              initial={{ clipPath: "polygon(10% 10%, 90% 10%, 90% 90%, 10% 90%)" }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              viewport={{ once: true }}
              className="h-[400px] md:h-[580px] rounded-[40px] overflow-hidden shadow-2xl relative group"
            >
              <img 
                src="/images/danang_resort_sunrise.png" 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                alt="Intercoin Resort Horizon pool"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-8 text-[#f7f1e5] opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <span className="text-[10px] uppercase tracking-widest text-[#d7b56d]">Cảm Hứng Thiết Kế</span>
                <p className="font-serif text-lg mt-1 italic">
                  {lang === "vi" 
                    ? "Hòa quyện kiến trúc Pháp cổ kính và dấu ấn nghệ thuật Champa quyến rũ bên bờ sóng Thái Bình Dương." 
                    : "Merging elegant French colonial architecture with the enchanting charm of Champa art by the Pacific waves."}
                </p>
              </div>
            </motion.div>

            {/* Right Text */}
            <div className="flex flex-col gap-8 justify-center">
              <p className="font-serif text-2xl md:text-3.5xl leading-relaxed text-[#263247] font-medium italic">
                {t.story_quote}
              </p>
              <div className="h-[1px] bg-[#030811]/10 w-full" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-[#263247]">
                <div>
                  <h4 className="font-bold text-sm tracking-wider uppercase mb-2 flex items-center gap-2">
                    <Shield className="w-4 h-4 text-[#d7b56d]" /> {t.story_privacy_title}
                  </h4>
                  <p className="text-sm font-light leading-relaxed">
                    {t.story_privacy_desc}
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-sm tracking-wider uppercase mb-2 flex items-center gap-2">
                    <Utensils className="w-4 h-4 text-[#d7b56d]" /> {t.story_taste_title}
                  </h4>
                  <p className="text-sm font-light leading-relaxed">
                    {t.story_taste_desc}
                  </p>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 p-6 rounded-2xl bg-[#030811]/5 border border-[#030811]/10 mt-6">
                <div>
                  <div className="font-sans text-3xl sm:text-4xl font-bold">12</div>
                  <div className="text-[10px] uppercase tracking-wider text-black/60 mt-1">{t.story_stat_suites}</div>
                </div>
                <div>
                  <div className="font-sans text-3xl sm:text-4xl font-bold">24/7</div>
                  <div className="text-[10px] uppercase tracking-wider text-black/60 mt-1">{t.story_stat_butlers}</div>
                </div>
                <div>
                  <div className="font-sans text-3xl sm:text-4xl font-bold">100%</div>
                  <div className="text-[10px] uppercase tracking-wider text-black/60 mt-1">{t.story_stat_privacy}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Interactive Itinerary Day-by-Day Journey Planner */}
      <section id="itinerary" className="relative py-24 sm:py-32 bg-[#050f1e]/80 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#d7b56d] flex items-center gap-1.5 justify-start">
                <Compass className="w-4 h-4 text-[#d7b56d] animate-spin-slow" /> {t.itinerary_badge}
              </span>
              <h2 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight mt-3 text-[#f7f1e5]">
                {t.itinerary_title}
              </h2>
              <p className="text-white/60 text-sm mt-3 max-w-xl">
                {t.itinerary_desc}
              </p>
            </div>

            {/* Interactive Day Toggle Buttons */}
            <div className="flex w-fit max-w-full self-center md:self-auto bg-white/5 border border-white/10 rounded-full p-1 mt-8 md:mt-0 gap-0.5 sm:gap-1">
              {[1, 2, 3].map((day) => (
                <button
                  key={day}
                  onClick={() => {
                    setActiveDay(day);
                    setExpandedActivityIndex(null);
                  }}
                  className={`px-4 sm:px-6 py-2.5 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all duration-300 ${
                    activeDay === day 
                      ? "bg-[#d7b56d] text-[#030811] shadow-lg shadow-[#d7b56d]/25" 
                      : "text-white/80 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {t.itinerary_day} 0{day}
                </button>
              ))}
            </div>
          </div>

          {/* Details of Selected Day */}
          <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-12 items-start mt-12">
            
            {/* Visual banner for selected Day */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl h-[350px] lg:h-[550px] group">
              <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-108">
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
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none" />
              
              <div className="absolute bottom-8 left-8 right-8 pointer-events-none">
                <div className="text-[10px] uppercase font-bold text-[#d7b56d] tracking-widest">{t.itinerary_focus}</div>
                <h3 className="font-serif text-2xl font-bold mt-1 text-[#f7f1e5] pr-4">
                  {lang === "vi" ? ITINERARY_DATA[activeDay - 1].titleVi : ITINERARY_DATA[activeDay - 1].titleEn}
                </h3>
                <p className="text-white/70 text-xs mt-3 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#d7b56d]" /> {lang === "vi" ? ITINERARY_DATA[activeDay - 1].subtitleVi : ITINERARY_DATA[activeDay - 1].subtitleEn}
                </p>
              </div>
            </div>

            {/* Timeline Activities for selected Day */}
            <div className="space-y-6">
              {ITINERARY_DATA[activeDay - 1].activities.map((act, index) => {
                const activityText = lang === "vi" ? act.activityVi : act.activityEn;
                const descriptionText = lang === "vi" ? act.descriptionVi : act.descriptionEn;

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    onMouseEnter={() => setHoveredActivityIndex(index)}
                    onMouseLeave={() => setHoveredActivityIndex(null)}
                    className={`p-5 sm:p-6 rounded-2xl border transition-all duration-300 relative ${
                      act.highlight 
                        ? "bg-gradient-to-r from-[#d7b56d]/15 to-transparent border-[#d7b56d]/30 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]" 
                        : hoveredActivityIndex === index 
                          ? "bg-white/5 border-white/20" 
                          : "bg-white/[0.02] border-white/5"
                    }`}
                  >
                    {act.highlight && (
                      <span className="absolute top-4 right-12 sm:right-4 flex items-center gap-1 text-[8px] font-bold tracking-widest text-[#d7b56d] bg-[#d7b56d]/15 px-2 py-0.5 rounded-full uppercase border border-[#d7b56d]/20">
                        <Sparkles className="w-2.5 h-2.5" /> {t.itinerary_highlight}
                      </span>
                    )}

                    <button
                      type="button"
                      onClick={() => setExpandedActivityIndex((current) => current === index ? null : index)}
                      className="w-full text-left sm:pointer-events-none"
                      aria-expanded={expandedActivityIndex === index}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-[#d7b56d]" />
                            <span className="font-mono text-sm text-[#d7b56d] font-semibold">{act.time}</span>
                          </div>
                          <span className="hidden sm:inline-block text-white/30">•</span>
                          <h4 className="font-serif text-lg font-bold text-white tracking-wide pr-5 sm:pr-0">
                            {activityText}
                          </h4>
                        </div>
                        <ChevronDown
                          className={`mt-1 h-5 w-5 flex-shrink-0 text-[#d7b56d] transition-transform sm:hidden ${
                            expandedActivityIndex === index ? "rotate-180" : ""
                          }`}
                        />
                      </div>
                    </button>

                    <p className="mt-2 hidden text-xs sm:block sm:text-sm text-white/70 leading-relaxed pl-1">
                      {descriptionText}
                    </p>

                    <AnimatePresence initial={false}>
                      {expandedActivityIndex === index && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                          className="overflow-hidden sm:hidden"
                        >
                          <p className="pt-3 text-xs text-white/70 leading-relaxed pl-1">
                            {descriptionText}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>

          </div>
        </div>
      </section>

      {/* 5. Luxury Suites Showroom & Interactive Quote Calculator */}
      <section id="suites" className="relative py-24 sm:py-32 bg-[#030811] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#d7b56d] block mb-2">{t.suites_badge}</span>
            <h2 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight text-[#f7f1e5]">
              {t.suites_title}
            </h2>
            <p className="text-white/60 text-sm mt-3 max-w-xl mx-auto">
              {t.suites_desc}
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
                    <span className="text-[10px] tracking-widest text-[#d7b56d] uppercase font-bold">
                      {selectedSuite.size} • {lang === "vi" ? selectedSuite.capacityVi : selectedSuite.capacityEn}
                    </span>
                    <h3 className="font-serif text-3xl sm:text-4.5xl font-bold mt-1 text-white">{selectedSuite.name}</h3>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-white/50 block">{lang === "vi" ? "Hải trình 3D2N trọn gói" : "3D2N All-inclusive Fare"}</span>
                    <span className="font-sans text-xl sm:text-2xl text-[#d7b56d] font-bold block">
                      {formatVND(selectedSuite.pricePerPax)} <span className="text-xs font-sans text-white/50 font-light">{t.suites_pax}</span>
                    </span>
                  </div>
                </div>

                <p className="text-sm text-white/70 leading-relaxed my-5">
                  {lang === "vi" ? selectedSuite.descriptionVi : selectedSuite.descriptionEn}
                </p>

                <div className="mb-6">
                  <h5 className="text-[10px] font-bold tracking-widest text-white/70 uppercase mb-3">{t.suites_privileges}</h5>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-white/85">
                    {(lang === "vi" ? selectedSuite.featuresVi : selectedSuite.featuresEn).map((feat, idx) => (
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
                  <Sparkles className="w-3.5 h-3.5" /> {t.calc_title}
                </h5>
                
                <div className="space-y-4">
                  {/* Number of Pax */}
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-white/60">{t.calc_guests}</span>
                      <span className="font-mono text-[#d7b56d] font-bold">{numGuests} {t.calc_guests_unit}</span>
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
                      <span className="text-white/50 block mb-1">{t.calc_date}</span>
                      <CustomDatePicker
                        value={travelDate}
                        onChange={setTravelDate}
                        lang={lang}
                        className="w-full flex items-center justify-between bg-white/5 border border-white/10 rounded-lg p-2 text-white outline-none focus:border-[#d7b56d] text-left text-xs cursor-pointer"
                      />
                    </div>
                    <div>
                      <span className="text-white/50 block mb-1">{t.calc_offer}</span>
                      <div className="p-2 rounded-lg bg-[#d7b56d]/5 border border-[#d7b56d]/15 text-[#d7b56d] font-bold select-none text-[10px] uppercase text-center tracking-wider">
                        {t.calc_offer_val}
                      </div>
                    </div>
                  </div>

                  {/* Total calculation breakdown */}
                  <div className="border-t border-white/5 pt-3 mt-3 text-xs space-y-1.5 text-white/70">
                    <div className="flex justify-between">
                      <span>{t.calc_base_price}</span>
                      <span>{formatVND(subtotal)}</span>
                    </div>
                    
                    {discountPercent > 0 && (
                      <div className="flex justify-between text-[#d55f5f]">
                        <span>{t.calc_discount} ({discountPercent}%):</span>
                        <span>-{formatVND(discountAmount)}</span>
                      </div>
                    )}
                    
                    <div className="flex justify-between text-white/90">
                      <span>{t.calc_transfer}</span>
                      <span className="text-[#a1df93]">{t.calc_transfer_val}</span>
                    </div>

                    <div className="flex justify-between text-white/90">
                      <span>{t.calc_tax}</span>
                      <span className="text-[#a1df93]">{t.calc_tax_val}</span>
                    </div>

                    <div className="flex justify-between items-end border-t border-white/10 pt-3 mt-1.5 text-sm">
                      <span className="text-white font-serif font-semibold text-base">{t.calc_total}</span>
                      <span className="text-[#d7b56d] font-sans text-xl font-bold">{formatVND(finalPrice)}</span>
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
                      const bookSection = document.getElementById("booking");
                      if (bookSection) bookSection.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="w-full py-3 rounded-lg border border-[#d7b56d]/30 text-[#d7b56d] text-[10px] uppercase font-bold tracking-widest hover:bg-[#d7b56d] hover:text-[#030811] transition-colors mt-2"
                  >
                    {t.calc_cta}
                  </button>
                </div>

              </div>

            </div>

          </div>

        </div>
      </section>

      {/* 6. Luxury Experiences VIP */}
      <section id="experiences" className="relative py-24 bg-[#0a1424] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#d7b56d] block mb-2">{t.exp_badge}</span>
              <h2 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight text-white leading-none">
                {t.exp_title}
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
            {EXPERIENCES_DATA.map((exp) => {
              const expTitle = lang === "vi" ? exp.vietnameseTitle : exp.title;
              const expTime = lang === "vi" ? exp.timeVi : exp.timeEn;
              const expDesc = lang === "vi" ? exp.descriptionVi : exp.descriptionEn;

              return (
                <div 
                  key={exp.id}
                  className="flex-shrink-0 w-[300px] sm:w-[420px] h-[550px] rounded-[36px] overflow-hidden relative group snap-start shadow-xl border border-white/5"
                >
                  <img 
                    src={exp.image} 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-108"
                    alt={expTitle}
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />
                  
                  <div className="absolute bottom-8 left-8 right-8 text-white">
                    <span className="px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider bg-white/10 border border-white/15 text-[#d7b56d] backdrop-blur-md">
                      {expTime}
                    </span>
                    
                    <h3 className="font-serif text-3xl font-bold mt-4 mb-2 text-[#f7f1e5]">
                      {exp.title}
                    </h3>
                    <h4 className="text-xs uppercase tracking-widest text-[#d7b56d] font-semibold mb-3">
                      {exp.vietnameseTitle}
                    </h4>
                    
                    <p className="text-xs text-white/70 leading-relaxed font-light line-clamp-3">
                      {expDesc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Extra information banner */}
          <div className="mt-8 p-6 rounded-2xl bg-white/[0.02] border border-white/5 max-w-xl mx-auto text-center">
            <p className="text-xs text-white/50 leading-relaxed italic">
              {t.exp_info}
            </p>
          </div>

        </div>
      </section>

      {/* 7. Bento Photo Gallery & Lightbox */}
      <section id="gallery" className="relative py-24 sm:py-32 bg-[#f4efe4] text-[#030811] transition-colors duration-500">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="max-w-3xl mb-16">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#d7b56d]">{t.gallery_badge}</span>
            <h2 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight text-[#030811] mt-2">
              {t.gallery_title}
            </h2>
            <p className="text-[#263247] text-sm mt-3 max-w-xl">
              {t.gallery_desc}
            </p>
          </div>

          {/* Mobile and tablet featured image with thumbnail selector */}
          <div className="lg:hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={GALLERY_DATA[mobileGalleryIndex].url}
                initial={{ opacity: 0, x: mobileGalleryDirection * 70 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: mobileGalleryDirection * -70 }}
                transition={{ duration: 0.35 }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.16}
                onDragEnd={(_, info) => {
                  if (Math.abs(info.offset.x) < 55) return;
                  const direction = info.offset.x < 0 ? 1 : -1;
                  setMobileGalleryDirection(direction);
                  setMobileGalleryIndex((current) => (current + direction + GALLERY_DATA.length) % GALLERY_DATA.length);
                }}
                className="relative block aspect-[4/3] w-full touch-pan-y cursor-grab overflow-hidden rounded-[24px] border border-[#030811]/10 bg-[#030811] text-left shadow-[0_18px_45px_rgba(3,8,17,0.18)] active:cursor-grabbing"
              >
                <img
                  src={GALLERY_DATA[mobileGalleryIndex].url}
                  className="h-full w-full object-cover"
                  alt={GALLERY_DATA[mobileGalleryIndex].title}
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3 text-white">
                  <div>
                    <p className="font-serif text-lg font-bold">{GALLERY_DATA[mobileGalleryIndex].title}</p>
                    <span className="mt-1 block text-[9px] uppercase tracking-[0.2em] text-white/70">{t.gallery_zoom}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setLightboxIndex(mobileGalleryIndex)}
                    aria-label={t.gallery_zoom}
                    className="rounded-full border border-white/20 bg-black/30 p-2.5 backdrop-blur-md"
                  >
                    <Image className="h-4 w-4 text-[#d7b56d]" />
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="no-scrollbar mt-4 flex justify-start sm:justify-center gap-3 overflow-x-auto pb-2">
              {GALLERY_DATA.map((item, index) => (
                <button
                  type="button"
                  key={item.url}
                  onClick={() => {
                    setMobileGalleryDirection(index > mobileGalleryIndex ? 1 : -1);
                    setMobileGalleryIndex(index);
                  }}
                  aria-label={`Chọn ảnh ${item.title}`}
                  className={`relative h-16 flex-shrink-0 overflow-hidden rounded-xl border transition-all ${
                    mobileGalleryIndex === index
                      ? "w-20 border-[#d7b56d] ring-2 ring-[#d7b56d]/35"
                      : "w-16 border-[#030811]/10 opacity-65"
                  }`}
                >
                  <img
                    src={item.url}
                    className="h-full w-full object-cover"
                    alt={item.title}
                    referrerPolicy="no-referrer"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Beautiful desktop bento mesh block */}
          <div className="hidden lg:grid lg:grid-cols-3 gap-6">
            {GALLERY_DATA.map((item, index) => {
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
                      <span className="text-[9px] uppercase tracking-widest text-white/60">{t.gallery_zoom}</span>
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
                  <span className="text-[10px] tracking-widest text-[#d7b56d] uppercase block">{t.gallery_album}</span>
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

              {/* Bottom indicators */}
              <div className="text-center text-xs text-white/50">
                {t.gallery_image_counter} {lightboxIndex + 1} {t.gallery_image_of} {GALLERY_DATA.length}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* 8. Registration Booking & Consultations Form */}
      <section id="booking" className="relative py-24 sm:py-32 bg-[#050f1e] overflow-hidden">
        {/* Decorative spotlights */}
        <div className="absolute top-1/4 left-1/4 w-[350px] h-[350px] rounded-full bg-[#d7b56d]/5 blur-[120px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Form Left intro text */}
          <div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 w-fit mb-6">
              <Phone className="w-3.5 h-3.5 text-[#d7b56d] animate-pulse" />
              <span className="text-[9px] uppercase font-bold tracking-[0.2em] text-[#d7b56d]">{t.book_badge}</span>
            </div>
            
            <h2 className="font-serif text-4.5xl sm:text-6xl font-bold tracking-tight text-[#f7f1e5] leading-[1.15]">
              {t.book_title}
            </h2>
            <p className="mt-6 text-white/70 text-sm max-w-md leading-relaxed font-light">
              {t.book_desc}
            </p>

            <div className="space-y-6 mt-12 max-w-sm">
              <div className="flex gap-4">
                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-[#d7b56d] h-fit">
                  <Shield className="w-5 h-5 animate-pulse" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold tracking-wide text-white">{t.book_sec_title}</h4>
                  <p className="text-xs text-white/60 leading-relaxed mt-1">{t.book_sec_desc}</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-[#d7b56d] h-fit">
                  <Heart className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold tracking-wide text-white">{t.book_custom_title}</h4>
                  <p className="text-xs text-white/60 leading-relaxed mt-1">{t.book_custom_desc}</p>
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
                <h3 className="font-serif text-2xl font-bold text-white mb-4">{t.form_success_title}</h3>
                <p className="text-white/70 text-xs sm:text-sm leading-relaxed max-w-sm mx-auto">
                  {bookingSuccessMsg}
                </p>
                <button
                  onClick={() => setBookingSuccessMsg("")}
                  className="mt-8 px-6 py-2.5 rounded-full border border-white/10 text-white/80 hover:text-white hover:bg-white/5 text-xs font-bold uppercase tracking-wider"
                >
                  {t.form_success_cta}
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleBookingSubmit} className="space-y-4">
                <div>
                  <label className="text-[10px] uppercase font-bold tracking-widest text-[#d7b56d] block mb-2">{t.form_name_label}</label>
                  <input
                    type="text"
                    required
                    placeholder={t.form_name_placeholder}
                    value={bookingForm.name}
                    onChange={(e) => setBookingForm(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-white/30 text-sm outline-none focus:border-[#d7b56d] focus:bg-white/[0.08] transition-all"
                  />
                </div>

                <div>
                  <label className="text-[10px] uppercase font-bold tracking-widest text-[#d7b56d] block mb-2 font-mono">{t.form_phone_label}</label>
                  <input
                    type="tel"
                    required
                    placeholder={t.form_phone_placeholder}
                    value={bookingForm.phone}
                    onChange={(e) => setBookingForm(prev => ({ ...prev, phone: e.target.value }))}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-white/30 text-sm outline-none focus:border-[#d7b56d] focus:bg-white/[0.08] transition-all"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {/* Suite Custom Dropdown */}
                  <div className="relative" ref={suiteDropdownRef}>
                    <label className="text-[10px] uppercase font-bold tracking-widest text-[#d7b56d] block mb-2">{t.form_suite_label}</label>
                    <button
                      type="button"
                      onClick={() => {
                        setSuiteOpen(!suiteOpen);
                        setGuestsOpen(false);
                      }}
                      className="w-full flex items-center justify-between bg-[#050f1e]/80 border border-white/10 rounded-xl px-4 py-3.5 text-white text-sm outline-none focus:border-[#d7b56d] focus:bg-white/[0.08] transition-all text-left cursor-pointer"
                    >
                      <span>
                        {SUITES_DATA.find(s => s.id === bookingForm.suite)?.name || "Select suite"}
                      </span>
                      <ChevronDown className={`w-4 h-4 text-white/50 transition-transform duration-300 ${suiteOpen ? "rotate-180" : ""}`} />
                    </button>
                    
                    <AnimatePresence>
                      {suiteOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="absolute z-50 left-0 right-0 mt-2 rounded-xl bg-[#091527] border border-white/10 shadow-2xl overflow-hidden backdrop-blur-xl"
                        >
                          {SUITES_DATA.map(suite => (
                            <button
                              key={suite.id}
                              type="button"
                              onClick={() => {
                                setBookingForm(prev => ({ ...prev, suite: suite.id }));
                                setSuiteOpen(false);
                              }}
                              className={`w-full text-left px-4 py-3 text-sm transition-colors cursor-pointer ${
                                bookingForm.suite === suite.id 
                                  ? "bg-[#d7b56d] text-[#030811] font-bold" 
                                  : "text-white/80 hover:bg-white/5 hover:text-white"
                              }`}
                            >
                              {suite.name}
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Guests Custom Dropdown */}
                  <div className="relative" ref={guestsDropdownRef}>
                    <label className="text-[10px] uppercase font-bold tracking-widest text-[#d7b56d] block mb-2">{t.form_guests_label}</label>
                    <button
                      type="button"
                      onClick={() => {
                        setGuestsOpen(!guestsOpen);
                        setSuiteOpen(false);
                      }}
                      className="w-full flex items-center justify-between bg-[#050f1e]/80 border border-white/10 rounded-xl px-4 py-3.5 text-white text-sm outline-none focus:border-[#d7b56d] focus:bg-white/[0.08] transition-all text-left cursor-pointer"
                    >
                      <span>
                        {bookingForm.guests} {lang === "vi" ? "khách" : "guests"}
                      </span>
                      <ChevronDown className={`w-4 h-4 text-white/50 transition-transform duration-300 ${guestsOpen ? "rotate-180" : ""}`} />
                    </button>
                    
                    <AnimatePresence>
                      {guestsOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="absolute z-50 left-0 right-0 mt-2 max-h-60 overflow-y-auto rounded-xl bg-[#091527] border border-white/10 shadow-2xl backdrop-blur-xl no-scrollbar"
                        >
                          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => (
                            <button
                              key={n}
                              type="button"
                              onClick={() => {
                                setBookingForm(prev => ({ ...prev, guests: n }));
                                setGuestsOpen(false);
                              }}
                              className={`w-full text-left px-4 py-3 text-sm transition-colors cursor-pointer ${
                                bookingForm.guests === n 
                                  ? "bg-[#d7b56d] text-[#030811] font-bold" 
                                  : "text-white/80 hover:bg-white/5 hover:text-white"
                              }`}
                            >
                              {n} {lang === "vi" ? "khách" : "guests"}
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                <div>
                  <label className="text-[10px] uppercase font-bold tracking-widest text-[#d7b56d] block mb-2">{t.form_date_label}</label>
                  <CustomDatePicker
                    value={bookingForm.date}
                    onChange={(dateStr) => setBookingForm(prev => ({ ...prev, date: dateStr }))}
                    lang={lang}
                    className="w-full flex items-center justify-between bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white text-sm outline-none focus:border-[#d7b56d] focus:bg-white/[0.08] transition-all text-left cursor-pointer"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={bookingLoading}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-[#d7b56d] to-[#f5d590] text-[#030811] text-xs uppercase font-bold tracking-[0.25em] transition-all hover:translate-y-[-2px] hover:shadow-[0_12px_30px_rgba(215,181,109,0.35)] active:translate-y-0 disabled:opacity-50"
                  >
                    {bookingLoading ? t.form_submitting : t.form_submit}
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
            className="fixed inset-x-3 bottom-3 h-[min(680px,calc(100dvh-24px))] sm:inset-x-auto sm:bottom-5 sm:right-5 sm:w-[400px] sm:h-[min(680px,calc(100dvh-40px))] rounded-[28px] bg-[#050f1e]/98 border border-white/10 shadow-[0_24px_70px_rgba(0,0,0,0.85)] backdrop-blur-2xl z-[200] overflow-hidden flex flex-col"
          >
            {/* Chat header area */}
            <div className="p-4 bg-gradient-to-r from-[#0a1424] to-[#050f1e] border-b border-white/10 flex justify-between items-center flex-shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-full bg-[#d7b56d]/15 border border-[#d7b56d]/30 flex items-center justify-center text-[#d7b56d] relative">
                  <svg className="h-7 w-7" viewBox="0 0 90 70" fill="none" aria-hidden="true">
                    <circle cx="45" cy="35" r="25" stroke="currentColor" strokeWidth="4" />
                    <path d="M34 21V49" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
                    <path d="M58 24C54 20 47 20 43 24C37 30 37 40 43 46C47 50 54 50 58 46" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
                  </svg>
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-[#050f1e]" />
                </div>
                <div>
                  <span className="text-[9px] uppercase tracking-[0.18em] text-[#d7b56d] block font-semibold leading-none">{t.chat_role}</span>
                  <span className="font-serif font-bold text-base text-white block mt-1">{t.chat_name}</span>
                </div>
              </div>
              <button 
                onClick={() => setChatOpen(false)}
                aria-label={lang === "vi" ? "Đóng trợ lý" : "Close assistant"}
                className="p-2 rounded-full text-white/50 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat messages list */}
            <div className="flex-1 min-h-0 overflow-y-auto p-4 space-y-4 font-light text-sm">
              {chatMessages.map((msg, index) => (
                <div 
                  key={index} 
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className={`px-4 py-3.5 rounded-2xl max-w-[88%] leading-relaxed ${
                    msg.role === "user" 
                      ? "bg-[#d7b56d] text-[#030811] rounded-br-md font-medium" 
                      : "bg-white/[0.06] border border-white/10 text-white/90 rounded-bl-md"
                  }`}>
                    {msg.parts[0].text}
                  </div>
                </div>
              ))}
              
              {/* Typing indicator */}
              {chatLoading && (
                <div className="flex justify-start">
                  <div className="bg-white/5 border border-white/5 p-4 rounded-2xl rounded-tl-none text-white/40 flex items-center gap-1">
                    <span>{t.chat_typing}</span>
                    <span className="inline-block w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce delay-100" />
                    <span className="inline-block w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce delay-200" />
                    <span className="inline-block w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce delay-300" />
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Suggest questions presets */}
            <div className="px-4 py-3 bg-black/20 border-t border-white/5 flex-shrink-0">
              <span className="text-[8px] uppercase tracking-[0.16em] text-white/40 block mb-2">{t.chat_suggest}</span>
              <div className="flex gap-2 pb-1 overflow-x-auto no-scrollbar scroll-smooth">
                {(lang === "vi" 
                  ? [
                      "Lịch trình Đà Nẵng 3 ngày 2 đêm",
                      "Tư vấn phòng hướng biển",
                      "Đi Cầu Vàng khi nào đẹp?",
                      "Đặt lịch tư vấn"
                    ]
                  : [
                      "Da Nang 3-day itinerary",
                      "Recommend an ocean-view room",
                      "Best time to visit Golden Bridge",
                      "Request a consultation"
                    ]
                ).map((txt, idx) => (
                  <button
                    key={idx}
                    onClick={() => sendChatMessage(txt)}
                    className="flex-shrink-0 text-[10px] px-3 py-2 rounded-full border border-white/10 bg-white/5 text-white/75 hover:text-[#d7b56d] hover:border-[#d7b56d]/30 transition-all"
                  >
                    {txt}
                  </button>
                ))}
              </div>
            </div>

            {/* Chat text box input */}
            <div className="p-3 pb-[max(12px,env(safe-area-inset-bottom))] bg-gradient-to-r from-[#050f1e] to-[#0a1424] border-t border-white/10 flex items-center gap-2 flex-shrink-0">
              <input
                type="text"
                placeholder={t.chat_placeholder}
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendChatMessage()}
                className="min-w-0 flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder-white/30 outline-none focus:border-[#d7b56d]/50"
              />
              <button 
                onClick={() => sendChatMessage()}
                disabled={!chatInput.trim() || chatLoading}
                aria-label={lang === "vi" ? "Gửi tin nhắn" : "Send message"}
                className="p-3.5 bg-[#d7b56d] text-[#030811] rounded-xl hover:bg-[#ebd29c] transition-colors disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Persistent Chat Concierge Bubble helper */}
      {!chatOpen && (
        <motion.button
          onClick={() => setChatOpen(true)}
          whileHover={{ scale: 1.05 }}
          className="fixed bottom-6 right-6 p-3.5 rounded-full bg-[#d7b56d] text-[#030811] shadow-2xl z-[150] hidden sm:flex items-center gap-2 font-bold cursor-pointer group"
        >
          <div className="relative">
            <svg className="h-7 w-7 flex-shrink-0" viewBox="0 0 90 70" fill="none" aria-hidden="true">
              <circle cx="45" cy="35" r="25" stroke="currentColor" strokeWidth="4" />
              <path d="M34 21V49" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
              <path d="M58 24C54 20 47 20 43 24C37 30 37 40 43 46C47 50 54 50 58 46" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
            </svg>
            <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 rounded-full border border-[#d7b56d] animate-pulse" />
          </div>
          <span className="max-w-0 overflow-hidden group-hover:max-w-[120px] transition-all duration-300 text-xs uppercase tracking-wider whitespace-nowrap leading-none">
            {t.chat_bubble}
          </span>
        </motion.button>
      )}

      {/* 10. Footer */}
      <footer className="bg-[#030811] text-white/50 text-[11px] pt-12 md:pt-16 pb-8 md:pb-12 border-t border-white/5 font-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Compact Mobile Footer */}
          <div className="md:hidden">
            <div className="rounded-[28px] border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] p-5 shadow-[0_20px_50px_rgba(0,0,0,0.25)]">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl border border-[#d7b56d]/25 bg-[#d7b56d]/10">
                  <svg className="h-9 w-9" viewBox="0 0 90 70" fill="none">
                    <circle cx="45" cy="35" r="25" stroke="#D7B56D" strokeWidth="3" />
                    <path d="M34 21V49" stroke="#D7B56D" strokeWidth="5" strokeLinecap="round" />
                    <path d="M58 24C54 20 47 20 43 24C37 30 37 40 43 46C47 50 54 50 58 46" stroke="#F4D187" strokeWidth="5" strokeLinecap="round" />
                    <path d="M16 59C31 55 58 55 74 59" stroke="#D7B56D" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </div>
                <div className="min-w-0">
                  <strong className="block font-serif text-base font-bold tracking-[0.12em] text-white">INTERCOIN DA NANG</strong>
                  <span className="mt-1 block text-[8px] font-semibold tracking-[0.16em] text-[#d7b56d]">
                    {lang === "vi" ? "BIỂN XANH • DI SẢN • NGHỈ DƯỠNG" : "OCEAN • HERITAGE • RETREAT"}
                  </span>
                </div>
              </div>

              <p className="mt-4 text-xs leading-relaxed text-white/60">{t.footer_about}</p>

              <div className="mt-5 grid grid-cols-2 gap-2">
                <a href="tel:+84912345678" className="flex items-center justify-center gap-2 rounded-xl bg-[#d7b56d] px-3 py-3 text-[10px] font-bold uppercase tracking-wider text-[#030811]">
                  <Phone className="h-3.5 w-3.5" /> {t.footer_hotline}
                </a>
                <a href="mailto:butler@intercoinresort.com" className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-3 text-[10px] font-bold uppercase tracking-wider text-white">
                  <Mail className="h-3.5 w-3.5 text-[#d7b56d]" /> {t.footer_email}
                </a>
              </div>

              <div className="mt-5 divide-y divide-white/10 border-y border-white/10">
                <details className="group py-1">
                  <summary className="flex cursor-pointer list-none items-center justify-between py-3 text-xs font-bold uppercase tracking-wider text-white">
                    {lang === "vi" ? "Thông Tin Liên Hệ" : "Contact Information"}
                    <ChevronDown className="h-4 w-4 text-[#d7b56d] transition-transform group-open:rotate-180" />
                  </summary>
                  <div className="space-y-2 pb-4 text-xs leading-relaxed text-white/65">
                    <a href="tel:+84912345678" className="block text-white">+84 (0) 912 345 678</a>
                    <span className="block">+84 (0) 24 3999 8888</span>
                    <a href="mailto:butler@intercoinresort.com" className="block text-white">butler@intercoinresort.com</a>
                  </div>
                </details>

                <details className="group py-1">
                  <summary className="flex cursor-pointer list-none items-center justify-between py-3 text-xs font-bold uppercase tracking-wider text-white">
                    {lang === "vi" ? "Hệ Thống Văn Phòng" : "Our Offices"}
                    <ChevronDown className="h-4 w-4 text-[#d7b56d] transition-transform group-open:rotate-180" />
                  </summary>
                  <div className="space-y-3 pb-4 text-xs leading-relaxed text-white/65">
                    <div className="flex gap-2"><MapPin className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-[#d7b56d]" /><p>{t.footer_office_hn_val}</p></div>
                    <div className="flex gap-2"><MapPin className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-[#d7b56d]" /><p>{t.footer_office_hl_val}</p></div>
                  </div>
                </details>

                <details className="group py-1">
                  <summary className="flex cursor-pointer list-none items-center justify-between py-3 text-xs font-bold uppercase tracking-wider text-white">
                    {t.footer_newsletter_title}
                    <ChevronDown className="h-4 w-4 text-[#d7b56d] transition-transform group-open:rotate-180" />
                  </summary>
                  <div className="pb-4">
                    <p className="mb-3 text-xs leading-relaxed text-white/60">{t.footer_newsletter_desc}</p>
                    <div className="flex gap-2">
                      <input type="email" placeholder={t.footer_newsletter_placeholder} className="min-w-0 flex-1 rounded-xl border border-white/10 bg-white/5 px-3 py-3 text-xs text-white outline-none focus:border-[#d7b56d]/50" />
                      <button className="rounded-xl bg-[#d7b56d] px-4 text-[10px] font-bold uppercase text-[#030811]">{t.footer_newsletter_btn}</button>
                    </div>
                  </div>
                </details>
              </div>

              <div className="mt-5 flex items-center justify-between">
                <div className="flex gap-2">
                  {[Facebook, Instagram, Youtube].map((SocialIcon, index) => (
                    <a key={index} href={index === 0 ? "#facebook" : index === 1 ? "#instagram" : "#youtube"} className="rounded-full border border-white/10 bg-white/5 p-2.5 text-white/70">
                      <SocialIcon className="h-3.5 w-3.5" />
                    </a>
                  ))}
                </div>
                <a href="#hero" className="rounded-full border border-white/10 bg-white/5 p-2.5 text-[#d7b56d]" aria-label="Về đầu trang">
                  <ChevronDown className="h-4 w-4 rotate-180" />
                </a>
              </div>
            </div>
          </div>

          {/* Top Grid */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/5">
            {/* Column 1: Brand Info */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <svg className="w-8 h-8 opacity-90" viewBox="0 0 90 70" fill="none">
                  <circle cx="45" cy="35" r="25" stroke="#D7B56D" strokeWidth="3" />
                  <path d="M34 21V49" stroke="#D7B56D" strokeWidth="5" strokeLinecap="round" />
                  <path d="M58 24C54 20 47 20 43 24C37 30 37 40 43 46C47 50 54 50 58 46" stroke="#F4D187" strokeWidth="5" strokeLinecap="round" />
                  <path d="M16 59C31 55 58 55 74 59" stroke="#D7B56D" strokeWidth="2" strokeLinecap="round" />
                </svg>
                <div className="flex flex-col select-none">
                  <strong className="font-serif tracking-[0.12em] font-bold text-white text-sm">INTERCOIN DA NANG</strong>
                  <span className="text-[9px] tracking-wider text-[#d7b56d] font-semibold mt-0.5">
                    {lang === "vi" ? "BIỂN XANH • DI SẢN • NGHỈ DƯỠNG" : "OCEAN • HERITAGE • RETREAT"}
                  </span>
                </div>
              </div>
              <p className="text-white/60 leading-relaxed text-[11px] pr-2">
                {t.footer_about}
              </p>
              {/* Social Icons */}
              <div className="flex items-center gap-3 pt-2">
                <a href="#facebook" className="p-2 rounded-full bg-white/5 border border-white/10 hover:border-[#d7b56d] hover:text-[#d7b56d] transition-all">
                  <Facebook className="w-3.5 h-3.5" />
                </a>
                <a href="#instagram" className="p-2 rounded-full bg-white/5 border border-white/10 hover:border-[#d7b56d] hover:text-[#d7b56d] transition-all">
                  <Instagram className="w-3.5 h-3.5" />
                </a>
                <a href="#youtube" className="p-2 rounded-full bg-white/5 border border-white/10 hover:border-[#d7b56d] hover:text-[#d7b56d] transition-all">
                  <Youtube className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Column 2: Contact Info */}
            <div className="space-y-4">
              <h4 className="text-white font-serif font-bold text-xs uppercase tracking-wider">{lang === "vi" ? "Thông Tin Liên Hệ" : "Contact Information"}</h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-2.5">
                  <Phone className="w-3.5 h-3.5 text-[#d7b56d] mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-white/40 block text-[9px] uppercase tracking-wider">{t.footer_hotline}</span>
                    <a href="tel:+84912345678" className="text-white hover:text-[#d7b56d] transition-colors font-medium">+84 (0) 912 345 678</a>
                    <span className="text-white/30 block text-[10px]">+84 (0) 24 3999 8888</span>
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <Mail className="w-3.5 h-3.5 text-[#d7b56d] mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-white/40 block text-[9px] uppercase tracking-wider">{t.footer_email}</span>
                    <a href="mailto:butler@intercoinresort.com" className="text-white hover:text-[#d7b56d] transition-colors">butler@intercoinresort.com</a>
                  </div>
                </li>
              </ul>
            </div>

            {/* Column 3: Office Addresses */}
            <div className="space-y-4">
              <h4 className="text-white font-serif font-bold text-xs uppercase tracking-wider">{lang === "vi" ? "Hệ Thống Văn Phòng" : "Our Offices"}</h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-2.5">
                  <MapPin className="w-3.5 h-3.5 text-[#d7b56d] mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-white/40 block text-[9px] uppercase tracking-wider">{t.footer_office_hn}</span>
                    <p className="text-white/80 leading-relaxed">{t.footer_office_hn_val}</p>
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <MapPin className="w-3.5 h-3.5 text-[#d7b56d] mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-white/40 block text-[9px] uppercase tracking-wider">{t.footer_office_hl}</span>
                    <p className="text-white/80 leading-relaxed">{t.footer_office_hl_val}</p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Column 4: Newsletter */}
            <div className="space-y-4">
              <h4 className="text-white font-serif font-bold text-xs uppercase tracking-wider">{t.footer_newsletter_title}</h4>
              <p className="text-white/60 leading-relaxed">
                {t.footer_newsletter_desc}
              </p>
              <div className="flex flex-col sm:flex-row gap-2 pt-1">
                <input
                  type="email"
                  placeholder={t.footer_newsletter_placeholder}
                  className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder-white/30 outline-none focus:border-[#d7b56d]/50 w-full"
                />
                <button className="px-4 py-2 bg-[#d7b56d] hover:bg-[#ebd29c] text-[#030811] text-[10px] uppercase font-bold rounded-lg transition-colors whitespace-nowrap">
                  {t.footer_newsletter_btn}
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Row */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-2 md:gap-4 pt-6 md:pt-8 text-center text-white/40 text-[9px] md:text-[10px]">
            <div className="flex flex-col items-center lg:items-start gap-1">
              <p>{t.footer_copyright}</p>
              <p>{t.footer_operator}</p>
            </div>
            <div className="text-center lg:text-right">
              <p className="font-mono text-white/25 text-[9px]">{t.footer_ai_studio}</p>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}

// Premium Custom Date Picker Component with Luxury Indochine Style
interface CustomDatePickerProps {
  value: string;
  onChange: (dateStr: string) => void;
  lang: "vi" | "en";
  className?: string;
}

function CustomDatePicker({ value, onChange, lang, className }: CustomDatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const parseDate = (str: string) => {
    if (!str) return new Date();
    const parts = str.split("-");
    return new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
  };

  const selectedDate = parseDate(value);
  const [viewDate, setViewDate] = useState(selectedDate);

  useEffect(() => {
    setViewDate(parseDate(value));
  }, [value]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();

  const firstDayOfMonth = new Date(year, month, 1);
  const startDayOfWeek = firstDayOfMonth.getDay();
  const adjustedStartDay = startDayOfWeek === 0 ? 6 : startDayOfWeek - 1;
  const numDaysInMonth = new Date(year, month + 1, 0).getDate();
  const numDaysInPrevMonth = new Date(year, month, 0).getDate();

  const days = [];
  
  // Prev month tail
  for (let i = adjustedStartDay - 1; i >= 0; i--) {
    const d = numDaysInPrevMonth - i;
    const prevMonth = month === 0 ? 11 : month - 1;
    const prevYear = month === 0 ? year - 1 : year;
    const dateStr = `${prevYear}-${String(prevMonth + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
    days.push({ dayNum: d, isCurrentMonth: false, dateStr });
  }
  
  // Current month
  for (let d = 1; d <= numDaysInMonth; d++) {
    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
    days.push({ dayNum: d, isCurrentMonth: true, dateStr });
  }
  
  // Next month head
  const totalSlots = 42;
  const remainingSlots = totalSlots - days.length;
  for (let d = 1; d <= remainingSlots; d++) {
    const nextMonth = month === 11 ? 0 : month + 1;
    const nextYear = month === 11 ? year + 1 : year;
    const dateStr = `${nextYear}-${String(nextMonth + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
    days.push({ dayNum: d, isCurrentMonth: false, dateStr });
  }

  const handlePrevMonth = () => {
    setViewDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setViewDate(new Date(year, month + 1, 1));
  };

  const handleSelectDay = (dateStr: string) => {
    onChange(dateStr);
    setIsOpen(false);
  };

  const handleToday = () => {
    const today = new Date();
    const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
    onChange(todayStr);
    setViewDate(today);
    setIsOpen(false);
  };

  const formatDisplay = (str: string) => {
    if (!str) return "";
    const parts = str.split("-");
    return `${parts[2]}/${parts[1]}/${parts[0]}`;
  };

  const monthNamesVi = ["Tháng Một", "Tháng Hai", "Tháng Ba", "Tháng Tư", "Tháng Năm", "Tháng Sáu", "Tháng Bảy", "Tháng Tám", "Tháng Chín", "Tháng Mười", "Tháng Mười Một", "Tháng Mười Hai"];
  const monthNamesEn = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const weekDaysVi = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"];
  const weekDaysEn = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

  const monthName = lang === "vi" ? monthNamesVi[month] : monthNamesEn[month];
  const weekDays = lang === "vi" ? weekDaysVi : weekDaysEn;

  return (
    <div className="relative w-full" ref={containerRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={className || "w-full flex items-center justify-between bg-[#050f1e]/80 border border-white/10 rounded-xl px-4 py-3.5 text-white text-sm outline-none focus:border-[#d7b56d] focus:bg-white/[0.08] transition-all text-left cursor-pointer"}
      >
        <span>{formatDisplay(value)}</span>
        <Calendar className="w-4 h-4 text-white/50" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute z-[100] right-0 sm:left-0 mt-2 p-4 w-[280px] rounded-xl bg-[#091527] border border-white/10 shadow-2xl backdrop-blur-xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <button
                type="button"
                onClick={handlePrevMonth}
                className="p-1 rounded-lg hover:bg-white/5 text-white/70 hover:text-white cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-xs font-bold text-white tracking-wide">{monthName} {year}</span>
              <button
                type="button"
                onClick={handleNextMonth}
                className="p-1 rounded-lg hover:bg-white/5 text-white/70 hover:text-white cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Week days */}
            <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-bold text-white/40 mb-2">
              {weekDays.map(wd => (
                <div key={wd}>{wd}</div>
              ))}
            </div>

            {/* Days grid */}
            <div className="grid grid-cols-7 gap-1">
              {days.map((d, index) => {
                const isSelected = d.dateStr === value;
                return (
                  <button
                    key={index}
                    type="button"
                    onClick={() => handleSelectDay(d.dateStr)}
                    className={`h-7 w-7 text-xs flex items-center justify-center rounded-lg transition-all cursor-pointer ${
                      isSelected
                        ? "bg-[#d7b56d] text-[#030811] font-bold"
                        : d.isCurrentMonth
                          ? "text-white/80 hover:bg-white/10 hover:text-white"
                          : "text-white/25 hover:bg-white/5 hover:text-white/50"
                    }`}
                  >
                    {d.dayNum}
                  </button>
                );
              })}
            </div>

            {/* Footer */}
            <div className="border-t border-white/5 mt-3 pt-2 flex justify-between">
              <button
                type="button"
                onClick={handleToday}
                className="text-[10px] font-bold text-[#d7b56d] hover:underline cursor-pointer"
              >
                {lang === "vi" ? "Hôm nay" : "Today"}
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="text-[10px] font-bold text-white/50 hover:text-white cursor-pointer"
              >
                {lang === "vi" ? "Đóng" : "Close"}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
