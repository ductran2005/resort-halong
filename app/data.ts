import { SuiteType, ExperienceType, ItineraryDayType } from "./types";

export const SUITES_DATA: SuiteType[] = [
  {
    id: "royal-suite",
    name: "Royal Suite",
    vietnameseName: "Phòng Hoàng Gia",
    size: "65m²",
    viewVi: "Toàn Cảnh Hướng Vịnh & Ban Công Riêng",
    viewEn: "Panoramic Bay View & Private Balcony",
    capacityVi: "2 Người Lớn (+1 Trẻ Em)",
    capacityEn: "2 Adults (+1 Child)",
    pricePerPax: 29900000,
    descriptionVi: "Không gian kết hợp hài hòa nét kiến trúc Đông Dương sang trọng và tiện nghi hiện đại, sở hữu ban công lãng mạn ngắm vịnh và bồn tắm dát vàng mở rộng hướng đại dương.",
    descriptionEn: "A harmonious blend of luxurious Indochine architecture and modern comforts, featuring a romantic private balcony and a gold-plated bathtub opening to panoramic ocean views.",
    featuresVi: [
      "Ban công riêng biệt với bàn trà sang trọng",
      "Bồn tắm nằm view kính toàn cảnh vịnh biển",
      "Giường ngủ King-size cao cấp bọc nhung hoàng gia",
      "Hệ thống thiết bị vệ sinh nhập khẩu Châu Âu",
      "Trà thượng hạng và Giỏ hoa tươi đón chào"
    ],
    featuresEn: [
      "Private balcony with luxury tea table",
      "Bathtub with panoramic floor-to-ceiling glass views",
      "Premium King-size bed with royal velvet upholstery",
      "European imported luxury sanitary wares",
      "Premium welcome tea and fresh flower basket"
    ],
    images: [
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=1200",
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=1200",
      "https://images.unsplash.com/photo-1540518614846-7eded433c457?q=80&w=1200"
    ]
  },
  {
    id: "presidential-suite",
    name: "Presidential Suite",
    vietnameseName: "Phòng Tổng Thống",
    size: "85m²",
    viewVi: "Góc Nhìn Khép Kín 180 Độ Toàn Hệ Sinh Thái",
    viewEn: "180-Degree Panoramic View of the Ecosystem",
    capacityVi: "2 Người Lớn (+2 Trẻ Em)",
    capacityEn: "2 Adults (+2 Children)",
    pricePerPax: 49900000,
    descriptionVi: "Được thiết kế tinh tế tinh xảo tối cao tại vị trí đầu du thuyền, trang bị sàn gỗ quý, ban công tắm nắng chuyên biệt và quản gia cá nhân túc trực phục vụ bữa ăn lãng mạn bất kỳ lúc nào.",
    descriptionEn: "Exquisitely designed at the yacht's bow, featuring precious hardwood floors, a private sunbathing deck, and a personal butler ready to serve romantic dinners at any time.",
    featuresVi: [
      "Sân tắm nắng ngoài trời (Private Deck) rộng rãi",
      "Hệ thống Quản gia cá nhân (Butler Service) 24/7",
      "Phòng khách biệt lập trang bị dàn loa Hi-End thượng đẳng",
      "Welcome Champagne và trứng cá tầm Caviar lúc nhận phòng",
      "Liệu trình massage body 60 phút miễn phí hằng ngày"
    ],
    featuresEn: [
      "Spacious private outdoor sun deck",
      "24/7 Personal Butler Service",
      "Separate living room with Hi-End premium sound system",
      "Welcome Champagne and Caviar upon check-in",
      "Complimentary 60-minute daily body massage treatment"
    ],
    images: [
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1200",
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=1200",
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=1200"
    ]
  },
  {
    id: "imperial-duplex",
    name: "Imperial Duplex Suite",
    vietnameseName: "Căn Hộ Thông Tầng Đế Vương",
    size: "120m²",
    viewVi: "Góc Nhìn Điện Ảnh 270 Độ Ôm Trọn Kỳ Quan",
    viewEn: "270-Degree Cinematic View of the Wonder",
    capacityVi: "4 Người Lớn (+2 Trẻ Em)",
    capacityEn: "4 Adults (+2 Children)",
    pricePerPax: 79900000,
    descriptionVi: "Tuyệt tác phòng thông tầng siêu sang đầu tiên trên vịnh biển Hạ Long. Thừa hưởng hồ bơi sục hơi Jacuzzi riêng tư trực diện mặt nước và hầm rượu vang độc bản phục vụ các bữa tiệc thượng đẳng.",
    descriptionEn: "The first duplex masterpiece in Halong Bay. Featuring a private outdoor Jacuzzi directly touching the sea surface and an exclusive wine cellar for premium private dining.",
    featuresVi: [
      "Cấu trúc biệt thự thông tầng (Duplex) trần cao lộng lẫy",
      "Hồ Jacuzzi sục nước ấm ngoài trời tiếp giáp mặt biển",
      "Tủ bảo quản xì-gà và vang hảo hạng tuyển chọn quốc tế",
      "Hải trình bay trực thăng ngắm vịnh 20 phút cho mọi hành khách",
      "Tiệc tối Fine Dining cá nhân hóa phục vụ ngay tại suite"
    ],
    featuresEn: [
      "Magnificent duplex structure with high ceilings",
      "Private heated outdoor Jacuzzi next to the sea",
      "Cigar humidor and internationally curated fine wine cellar",
      "20-minute scenic helicopter flight over the bay for all guests",
      "Personalized Fine Dining dinners served inside the suite"
    ],
    images: [
      "https://images.unsplash.com/photo-1611891404114-50907903642a?q=80&w=1200",
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=1200",
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=1200"
    ]
  }
];

export const EXPERIENCES_DATA: ExperienceType[] = [
  {
    id: "kayak",
    title: "Eco Kayaking",
    vietnameseTitle: "Khám Phá Hang Sáng Tối",
    descriptionVi: "Tự tay lướt mái chèo gỗ qua những hang luồn kỳ bí, chiêm ngưỡng thế giới núi đá vôi nghìn năm trầm mặc dưới ánh nắng ngọc bích rực rỡ.",
    descriptionEn: "Paddle through mysterious caves and discover the quiet, thousand-year-old limestone karsts emerging from the glowing emerald water.",
    image: "/images/halong_kayaking.png",
    timeVi: "15:00 - Ngày 1 & Ngày 2",
    timeEn: "15:00 - Day 1 & Day 2"
  },
  {
    id: "spa",
    title: "Aqua Royal Spa",
    vietnameseTitle: "Trị Liệu Thảo Mộc Thượng Uyển",
    descriptionVi: "Nhắm mắt lắng nghe tiếng sóng vỗ, tận hưởng liệu trình massage bằng xông tinh dầu hoa sen tươi giúp phục hồi tâm trí và căng tràn sức sống.",
    descriptionEn: "Close your eyes to the sound of soft waves, enjoying a massage treatment with fresh lotus essential oils to restore your mind and revitalize your body.",
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=1200",
    timeVi: "Phục vụ 09:00 - 21:00 hằng ngày",
    timeEn: "Served 09:00 - 21:00 daily"
  },
  {
    id: "sunset-party",
    title: "Golden Hour Sunset Champagne",
    vietnameseTitle: "Tiệc Champagne Hoàng Hôn",
    descriptionVi: "Khoảnh khắc kỳ diệu khi ánh tà dương dát vàng mặt nước. Cùng nâng ly rượu vang nổ sủi bọt, trò chuyện lãng mạn bên nền nhạc violin cổ điển du dương.",
    descriptionEn: "A magical moment when the setting sun turns the water to gold. Raise a glass of sparkling champagne, and share a romantic talk accompanied by classical violin music.",
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=1200",
    timeVi: "17:30 - Ngày 1",
    timeEn: "17:30 - Day 1"
  },
  {
    id: "private-dinner",
    title: "Candlelit Fine Dining",
    vietnameseTitle: "Mỹ Vị Dương Gian Dưới Ánh Nến",
    descriptionVi: "Tiệc tối chuẩn ẩm thực Michelin đầy nghệ thuật. Hải sản bơi tươi rói khai thác trực tiếp được chế biến tài hoa bởi những siêu đầu bếp hàng đầu.",
    descriptionEn: "A fine dining dinner crafted in artistic Michelin style. Fresh seafood caught directly from the bay, cooked by top master chefs.",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=1200",
    timeVi: "19:30 - Hằng đêm",
    timeEn: "19:30 - Nightly"
  }
];

export const ITINERARY_DATA: ItineraryDayType[] = [
  {
    day: 1,
    titleVi: "Nghi Thức Đón Chào & Ánh Hoàng Hôn Đầu Tiên",
    titleEn: "Welcoming Ceremony & The First Sunset",
    subtitleVi: "Cảng tàu Tuần Châu - Đón khách lên du thuyền - Tiệc trà chiều ngắm vịnh",
    subtitleEn: "Tuan Chau Harbor - Boarding Ceremony - Sunset Tea Party",
    image: "https://images.unsplash.com/photo-1528127269322-539801943592?q=80&w=1200",
    activities: [
      {
        time: "11:30 - 12:15",
        activityVi: "Check-in Nhà chờ VIP",
        activityEn: "VIP Lounge Check-in",
        descriptionVi: "Chào đón quý khách bằng thảm đỏ thượng lưu, thưởng thức cold press juice và hoàn tất thủ tục lên du thuyền.",
        descriptionEn: "Welcome guests with a VIP red carpet, cold-pressed juices, and complete boarding procedures."
      },
      {
        time: "12:30",
        activityVi: "Chào mừng & Nhận phòng",
        activityEn: "Boarding Ceremony & Check-in",
        descriptionVi: "Đội ngũ hoa tiêu rải cánh hoa hồng chào mừng Quý khách lên ngọc tàu Emerald. Quản Gia cá nhân hướng dẫn nhận suite.",
        descriptionEn: "Our team welcomes you on board with rose petals. Your personal butler directs you to your suite.",
        highlight: true
      },
      {
        time: "13:00",
        activityVi: "Bữa trưa Mỹ vị Bản địa",
        activityEn: "Authentic Local Lunch",
        descriptionVi: "Thực đơn trưa Hải vị đặc tuyển mộc mạc thơm lừng phục vụ tại nhà hàng Grand Panorama với góc nhìn vịnh biển vô cực.",
        descriptionEn: "A rustic seafood lunch menu served at Grand Panorama restaurant with infinite bay views."
      },
      {
        time: "15:30",
        activityVi: "Kayak khám phá vụng hoang Lan Hạ",
        activityEn: "Eco Kayaking in Lan Ha Bay",
        descriptionVi: "Tham gia chèo thuyền hoặc tự do nghỉ ngơi ngâm mình dưới bồn tắm sục Jacuzzi của du thuyền giữa không gian tĩnh lặng.",
        descriptionEn: "Join kayaking or relax inside our outdoor heated Jacuzzi in a peaceful atmosphere."
      },
      {
        time: "17:30",
        activityVi: "Sunset Premium Party",
        activityEn: "Premium Sunset Party",
        descriptionVi: "Tiệc dâu tây, phô mai lát và sâm-panh hoàng hôn. Tiếng nhạc hòa tấu mượt mà khởi nguyên cho kỳ nghỉ xa xỉ.",
        descriptionEn: "Sunset party featuring fresh strawberries, cheese platters, and champagne. Soft live music starts your luxury holiday.",
        highlight: true
      },
      {
        time: "19:30",
        activityVi: "Đại tiệc nến Michelin",
        activityEn: "Michelin-style Candlelit Dinner",
        descriptionVi: "Tiệc tối sang trọng đẳng cấp cao với Tôm Hùm đá nướng, sườn cừu đút lò cùng súp bào ngư thượng hạng.",
        descriptionEn: "High-end luxury dinner featuring grilled rock lobster, baked lamb rack, and premium abalone soup."
      }
    ]
  },
  {
    day: 2,
    titleVi: "Vùng Biển Ngọc Sương - Hang Sáng Tối bí ẩn",
    titleEn: "Misty Pearl Sea - Mysterious Dark & Light Cave",
    subtitleVi: "Thái Cực Quyền - Thăm Làng nổi chài lưới xưa - Trị liệu thư giãn chuyên biệt",
    subtitleEn: "Taichi Session - Floating Fishing Village Visit - Royal Spa Therapy",
    image: "https://images.unsplash.com/photo-1552083375-1447ce886485?q=80&w=1200",
    activities: [
      {
        time: "06:15",
        activityVi: "Khởi tạo Năng lượng Taichi",
        activityEn: "Morning Taichi Session",
        descriptionVi: "Bài tập dưỡng sinh Thái Cực Quyền đón ánh bình minh vàng dịu nhẹ nhất lọc tinh khí đất trời.",
        descriptionEn: "Gentle Taichi exercises on the sundeck to welcome the morning sunrise and refresh your mind."
      },
      {
        time: "07:00",
        activityVi: "Bữa sáng Hoàng Gia",
        activityEn: "Royal Breakfast",
        descriptionVi: "Thưởng thức bánh sừng bò nóng hổi nướng lò, ngũ cốc, phở bò tươi hảo hạng và cà phê thủ công tuyệt vời.",
        descriptionEn: "Enjoy freshly baked croissants, cereals, traditional beef Pho, and hand-brewed coffee."
      },
      {
        time: "08:30",
        activityVi: "Khám phá Làng cổ trên vịnh",
        activityEn: "Explore Ancient Floating Village",
        descriptionVi: "Gặp gỡ dân chài địa phương hoài cổ, tham gia tìm hiểu phương thức ngọc trai quý báu đắt giá bậc nhất Đông Dương.",
        descriptionEn: "Meet local fishermen and learn about pearl harvesting methods, historically prized across Indochina.",
        highlight: true
      },
      {
        time: "12:00",
        activityVi: "Bữa trưa Khơi Xa lãng mạn",
        activityEn: "Romantic Ocean BBQ Lunch",
        descriptionVi: "Ẩm thực nướng BBQ ngoài trời cực kỳ sảng khoái với cua tuyết vàng nướng phô mai đút lò thơm nức mũi.",
        descriptionEn: "Savor a refreshing outdoor BBQ grill lunch featuring baked golden snow crab with cheese."
      },
      {
        time: "14:30",
        activityVi: "Cano bọc da tham quan Hang Sáng Tối",
        activityEn: "Leather Speedboat to Dark & Light Cave",
        descriptionVi: "Tàu tốc hành đưa quý khách vào quần thể đầm phá khép kín ngoạn mục nhất, thỏa mãn mọi tín đồ đam mê nhiếp ảnh tự nhiên.",
        descriptionEn: "A high-speed boat takes you to the most stunning enclosed lagoon, perfect for natural photography enthusiasts."
      },
      {
        time: "16:30",
        activityVi: "Nghi thức trà chiều hoàng kim",
        activityEn: "Golden Hour Afternoon Tea & Spa",
        descriptionVi: "Tận hưởng ưu đãi liệu trình Spa tẩm quất hoàng gia kéo dài 60 phút tái tạo toàn diện năng cơ cột sống mệt nhọc.",
        descriptionEn: "Enjoy a complimentary 60-minute royal massage therapy to fully rejuvenate your muscles."
      },
      {
        time: "19:30",
        activityVi: "Dạ tiệc mặt trăng lộng lẫy",
        activityEn: "Splendid Moonlight Gala",
        descriptionVi: "Tiệc khiêu vũ nhẹ nhàng dưới ánh đèn nghệ thuật lãng mạn trên sân thượng Sky Lounge ngọc.",
        descriptionEn: "A gentle social dance party under romantic artistic lighting on the sundeck of Sky Lounge.",
        highlight: true
      }
    ]
  },
  {
    day: 3,
    titleVi: "Tịnh Tâm Đầu Thu - Khứ Hồi Cảng Ngọc",
    titleEn: "Autumn Meditation - Return to Harbor",
    subtitleVi: "Tắm nắng ban mai - Trải nghiệm lớp học nấu ăn nghệ thuật - Tiễn đoàn",
    subtitleEn: "Morning Sunbathing - Cooking Masterclass - Farewell",
    image: "/images/aodai_mic_halong.png",
    activities: [
      {
        time: "06:30",
        activityVi: "Ngắm bình minh muộn trên ban công",
        activityEn: "Late Sunrise View on Balcony",
        descriptionVi: "Khơi gợi giác quan bằng tách trà sen thanh tao tươi mới được phục vụ ngay tầng hiên phòng nghỉ ngơi.",
        descriptionEn: "Awaken your senses with a freshly brewed cup of lotus tea served right on your suite balcony."
      },
      {
        time: "08:00",
        activityVi: "Bữa sáng dinh dưỡng cao",
        activityEn: "Nutritious Breakfast",
        descriptionVi: "Khởi động ngày cuối thanh dã nhẹ nhàng cùng trái cây vùng nhiệt đới, nước ép detox giàu vitamin dồi dào.",
        descriptionEn: "Start your final day gently with tropical fruits and vitamin-rich detox juices."
      },
      {
        time: "09:30",
        activityVi: "Lớp học bánh xèo truyền thống",
        activityEn: "Traditional Banh Xeo Cooking Class",
        descriptionVi: "Bếp trưởng hướng dẫn bí quyết đổ đĩa bánh xèo giòn tan vàng ươm trứ danh hồn cốt dân tộc.",
        descriptionEn: "Our Head Chef shares secrets to making crispy, golden traditional Vietnamese Banh Xeo.",
        highlight: true
      },
      {
        time: "10:30",
        activityVi: "Check-out thảnh thơi",
        activityEn: "Leisure Check-out",
        descriptionVi: "Hành khách thong thả làm thủ tục trả phòng, thanh toán chi phí phụ thu nếu có tại quầy tiếp tân ấm cúng.",
        descriptionEn: "Leisurely complete check-out procedures and settle personal tabs at the cozy reception desk."
      },
      {
        time: "11:00",
        activityVi: "Brunch buffet thịnh soạn",
        activityEn: "Sumptuous Farewell Brunch",
        descriptionVi: "Bữa trưa sớm thịnh soạn nạp đầy sinh lực cho chặng đường trở về đất liền thuận buồm xuôi gió.",
        descriptionEn: "Enjoy a rich farewell brunch buffet to recharge before returning to the mainland."
      },
      {
        time: "12:00",
        activityVi: "Trở về Cảng tàu Tuần Châu",
        activityEn: "Return to Tuan Chau Harbor",
        descriptionVi: "Đại lễ vẫy tay chào tạm biệt của thủy thủ đoàn. Xe Limousine cao cấp đón quý khách hồi gia an toàn.",
        descriptionEn: "Farewell wave ceremony from the crew. Premium Limousine transfer picks you up safely."
      }
    ]
  }
];

export const GALLERY_DATA = [
  { url: "https://images.unsplash.com/photo-1528127269322-539801943592?q=80&w=900", title: "Làn nước xanh trong như ngọc bích" },
  { url: "/images/halong_sunrise.png", title: "Đón nắng ban mai rực rỡ" },
  { url: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=900", title: "Không gian Hoàng Gia tráng lệ" },
  { url: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=900", title: "Hồ Jacuzzi sục nước ấm ngoài trời tiếp sườn núi" },
  { url: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=900", title: "Thực đơn tối Fine Dining" },
  { url: "/images/halong_kayaking.png", title: "Hoạt động chèo xuồng yên ả" }
];
