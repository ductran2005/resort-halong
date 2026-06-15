import { SuiteType, ExperienceType, ItineraryDayType } from "./types";

export const SUITES_DATA: SuiteType[] = [
  {
    id: "royal-suite",
    name: "Royal Ocean Suite",
    vietnameseName: "Phòng Hoàng Gia Hướng Biển",
    size: "65m²",
    viewVi: "Toàn Cảnh Biển Mỹ Khê & Ban Công Riêng",
    viewEn: "Panoramic My Khe Beach View & Private Balcony",
    capacityVi: "2 Người Lớn (+1 Trẻ Em)",
    capacityEn: "2 Adults (+1 Child)",
    pricePerPax: 2990000,
    descriptionVi: "Không gian kết hợp hài hòa nét kiến trúc Đông Dương sang trọng và tiện nghi hiện đại, sở hữu ban công lãng mạn ngắm hoàng hôn biển Mỹ Khê và bồn tắm dát vàng mở rộng hướng đại dương.",
    descriptionEn: "A harmonious blend of luxurious Indochine architecture and modern comforts, featuring a romantic private balcony overlooking My Khe Beach and a gold-plated bathtub opening to panoramic ocean views.",
    featuresVi: [
      "Ban công riêng biệt với bàn trà sang trọng hướng biển",
      "Bồn tắm nằm view kính toàn cảnh vịnh biển Đà Nẵng",
      "Giường ngủ King-size cao cấp bọc nhung hoàng gia",
      "Hệ thống thiết bị vệ sinh nhập khẩu Châu Âu",
      "Trà sâm dứa thượng hạng và Giỏ hoa quả tươi đón chào"
    ],
    featuresEn: [
      "Private balcony with luxury tea table facing the ocean",
      "Bathtub with panoramic floor-to-ceiling glass views of Da Nang Bay",
      "Premium King-size bed with royal velvet upholstery",
      "European imported luxury sanitary wares",
      "Premium welcome pineapple-ginseng tea and fresh fruit basket"
    ],
    images: [
      "/images/danang_luxury_suite.png",
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=1200",
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=1200"
    ]
  },
  {
    id: "presidential-suite",
    name: "Presidential Beachfront Villa",
    vietnameseName: "Biệt Thự Tổng Thống Trước Biển",
    size: "185m²",
    viewVi: "Góc Nhìn Khép Kín 180 Độ Toàn Cảnh Biển Mỹ Khê",
    viewEn: "180-Degree Panoramic View of My Khe Beach",
    capacityVi: "4 Người Lớn (+2 Trẻ Em)",
    capacityEn: "4 Adults (+2 Children)",
    pricePerPax: 5990000,
    descriptionVi: "Biệt thự trước biển thiết kế tinh xảo, sở hữu hồ bơi tràn bờ riêng biệt sát mép sóng, hiên tắm nắng rộng lớn và dịch vụ quản gia cá nhân túc trực phục vụ các bữa tiệc nướng BBQ lãng mạn.",
    descriptionEn: "Exquisitely designed beachfront villa, featuring a private infinity pool right by the shoreline, a spacious sun deck, and a personal butler serving custom romantic BBQ dinners.",
    featuresVi: [
      "Hồ bơi tràn bờ ngoài trời (Private Pool) tiếp giáp bãi cát",
      "Hệ thống Quản gia cá nhân (Butler Service) 24/7",
      "Phòng khách biệt lập trang bị dàn loa Hi-End thượng đẳng",
      "Welcome Champagne và trứng cá tầm Caviar lúc nhận phòng",
      "Liệu trình massage body 60 phút miễn phí hằng ngày tại resort"
    ],
    featuresEn: [
      "Spacious private beachfront infinity swimming pool",
      "24/7 Personal Butler Service",
      "Separate living room with Hi-End premium sound system",
      "Welcome Champagne and Caviar upon check-in",
      "Complimentary 60-minute daily body massage treatment at resort spa"
    ],
    images: [
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1200",
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=1200",
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=1200"
    ]
  },
  {
    id: "imperial-duplex",
    name: "Imperial Cliffside Duplex Suite",
    vietnameseName: "Căn Hộ Thông Tầng Vách Đá Đế Vương",
    size: "120m²",
    viewVi: "Góc Nhìn Điện Ảnh 270 Độ Ôm Trọn Vịnh Đà Nẵng",
    viewEn: "270-Degree Cinematic View of Da Nang Bay",
    capacityVi: "4 Người Lớn (+2 Trẻ Em)",
    capacityEn: "4 Adults (+2 Children)",
    pricePerPax: 7990000,
    descriptionVi: "Tuyệt tác biệt thự thông tầng siêu sang tựa lưng vào bán đảo Sơn Trà. Sở hữu hồ bơi sục hơi Jacuzzi riêng tư trực diện đại dương và hầm rượu vang độc bản phục vụ các bữa tiệc thượng lưu.",
    descriptionEn: "A magnificent duplex masterpiece resting on the cliffside of Son Tra Peninsula. Featuring a private outdoor Jacuzzi directly facing the ocean and an exclusive wine cellar for premium private dining.",
    featuresVi: [
      "Cấu trúc biệt thự thông tầng (Duplex) trần cao lộng lẫy vách đá",
      "Hồ Jacuzzi sục nước ấm ngoài trời ngắm hoàng hôn vịnh biển",
      "Tủ bảo quản xì-gà và vang hảo hạng tuyển chọn quốc tế",
      "Hải trình bay trực thăng ngắm toàn cảnh Đèo Hải Vân và Đà Nẵng",
      "Tiệc tối Fine Dining hải sản cá nhân hóa phục vụ ngay tại suite"
    ],
    featuresEn: [
      "Magnificent cliffside duplex structure with soaring high ceilings",
      "Private heated outdoor Jacuzzi facing the panoramic bay sunset",
      "Cigar humidor and internationally curated fine wine cellar",
      "20-minute scenic helicopter flight over Da Nang and Hai Van Pass",
      "Personalized seafood Fine Dining dinners served inside the suite"
    ],
    images: [
      "/images/danang_luxury_suite.png",
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=1200",
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=1200"
    ]
  }
];

export const EXPERIENCES_DATA: ExperienceType[] = [
  {
    id: "son-tra",
    title: "Son Tra Wild Exploration",
    vietnameseTitle: "Khám Phá Bán Đảo Sơn Trà",
    descriptionVi: "Hành trình ngắm động vật hoang dã quý hiếm - Voọc chà vá chân nâu, vãn cảnh Chùa Linh Ứng uy nghiêm với bức tượng Phật Bà Quan Âm cao nhất Việt Nam.",
    descriptionEn: "Spot rare Red-shanked douc langurs in their natural habitat, and visit the serene Linh Ung Pagoda featuring the tallest Lady Buddha statue in Vietnam.",
    image: "/images/danang_beach_activity.png",
    timeVi: "14:30 - Ngày 1",
    timeEn: "14:30 - Day 1"
  },
  {
    id: "spa",
    title: "Cham Royal Spa",
    vietnameseTitle: "Trị Liệu Thảo Mộc Cham Spa",
    descriptionVi: "Nhắm mắt lắng nghe tiếng sóng vỗ rì rào, tận hưởng liệu trình massage bằng xông tinh dầu thảo mộc Chăm Pa giúp phục hồi tâm trí và tiếp thêm sinh lực.",
    descriptionEn: "Close your eyes to the sound of soft waves, enjoying a massage treatment with Champa essential oils to restore your mind and revitalize your body.",
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=1200",
    timeVi: "Phục vụ 09:00 - 21:00 hằng ngày",
    timeEn: "Served 09:00 - 21:00 daily"
  },
  {
    id: "sunset-party",
    title: "My Khe Golden Sunset Champagne",
    vietnameseTitle: "Tiệc Champagne Hoàng Hôn Mỹ Khê",
    descriptionVi: "Khoảnh khắc kỳ diệu khi hoàng hôn dát vàng mặt biển Mỹ Khê. Cùng nâng ly rượu vang nổ sủi bọt bên bờ cát mịn, thưởng thức nhạc violin cổ điển du dương.",
    descriptionEn: "A magical moment when the setting sun turns My Khe beach to gold. Raise a glass of sparkling champagne on the fine sand, accompanied by live classical violin.",
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=1200",
    timeVi: "17:30 - Ngày 1 & Ngày 2",
    timeEn: "17:30 - Day 1 & Day 2"
  },
  {
    id: "private-dinner",
    title: "Candlelit Seafood Fine Dining",
    vietnameseTitle: "Mỹ Vị Hải Sản Dưới Ánh Nến",
    descriptionVi: "Tiệc tối hải sản chuẩn Michelin lãng mạn trên bãi biển cát trắng. Tôm hùm đá, cua tuyết vàng nướng phô mai được chế biến tài hoa bởi siêu đầu bếp hàng đầu.",
    descriptionEn: "A beachfront fine dining experience crafted in Michelin style. Fresh local rock lobster and snow crab cooked to perfection by top master chefs under candlelight.",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=1200",
    timeVi: "19:30 - Hằng đêm",
    timeEn: "19:30 - Nightly"
  }
];

export const ITINERARY_DATA: ItineraryDayType[] = [
  {
    day: 1,
    titleVi: "Nghi Thức Đón Chào & Hoàng Hôn Sơn Trà",
    titleEn: "Welcoming Ceremony & Son Tra Sunset",
    subtitleVi: "Đón tiễn VIP - Nhận Villa nghỉ dưỡng - Chiêm ngưỡng Lady Buddha",
    subtitleEn: "VIP Welcome - Villa Check-in - Lady Buddha Visit",
    image: "/images/danang_resort_sunrise.png",
    activities: [
      {
        time: "11:30 - 12:15",
        activityVi: "Check-in Nhà chờ VIP & Xe Đón",
        activityEn: "VIP Lounge Check-in & Transfer",
        descriptionVi: "Đại diện resort đón chào Quý khách bằng xe Limousine hạng sang, thưởng thức nước ép sâm dứa đá mát lạnh và hoàn tất nhanh thủ tục.",
        descriptionEn: "Resort representatives welcome you with a luxury Limousine transfer, serving cold pineapple-ginseng tea and completing check-in."
      },
      {
        time: "12:30",
        activityVi: "Chào mừng nồng nhiệt & Nhận phòng",
        activityEn: "Welcome Ceremony & Check-in",
        descriptionVi: "Nghi thức rải hoa tươi chào đón quý khách tại sảnh chính. Quản gia cá nhân hướng dẫn nhận biệt thự trước biển.",
        descriptionEn: "Welcome flower ceremony at the lobby. Your personal butler directs you to your beachfront villa.",
        highlight: true
      },
      {
        time: "13:00",
        activityVi: "Bữa trưa Hải vị Bản địa",
        activityEn: "Authentic Seafood Lunch",
        descriptionVi: "Thực đơn hải sản thơm lừng khai vị tại nhà hàng Grand Panorama với góc nhìn biển Mỹ Khê vô cực tuyệt đẹp.",
        descriptionEn: "A fresh local seafood lunch menu served at the Grand Panorama restaurant with infinite beach views."
      },
      {
        time: "14:30",
        activityVi: "Tham quan Chùa Linh Ứng & Bán đảo Sơn Trà",
        activityEn: "Son Tra Peninsula & Linh Ung Pagoda Tour",
        descriptionVi: "Xe riêng đưa quý khách lên đỉnh Sơn Trà, vãn cảnh chùa tôn nghiêm và ngắm nhìn toàn cảnh thành phố biển từ chân Lady Buddha.",
        descriptionEn: "Private transfer takes you to Son Tra Peninsula, visiting the peaceful pagoda and enjoying views from Lady Buddha statue.",
        highlight: true
      },
      {
        time: "17:30",
        activityVi: "Sunset Premium Party trên bãi biển",
        activityEn: "Premium Sunset Party on the Beach",
        descriptionVi: "Tiệc sâm-panh và canapé ngắm hoàng hôn buông xuống Mỹ Khê thơ mộng, hòa cùng âm điệu violin cổ điển tinh tế.",
        descriptionEn: "Sunset beach party featuring cheese platters, canapés, and champagne. Live violin starts your luxury holiday."
      },
      {
        time: "19:30",
        activityVi: "Đại tiệc hải sản Michelin dưới ánh nến",
        activityEn: "Michelin-style Seafood Candlelit Dinner",
        descriptionVi: "Tiệc tối lãng mạn bên tiếng sóng vỗ với thực đơn Tôm Hùm đá nướng, súp bào ngư vây cá thượng hạng.",
        descriptionEn: "High-end beachfront dinner featuring grilled rock lobster, premium abalone soup, and fine wine pairings."
      }
    ]
  },
  {
    day: 2,
    titleVi: "Đỉnh Bà Nà Hills - Cầu Vàng & Phố Cổ Hội An Lộng Lẫy",
    titleEn: "Ba Na Hills & Golden Bridge - Magic Hoi An Lanterns",
    subtitleVi: "Yoga bình minh - Check-in Cầu Vàng - Thả hoa đăng sông Hoài",
    subtitleEn: "Sunrise Yoga - Golden Bridge VIP Tour - Hoi An Lantern Boat Ride",
    image: "/images/danang_golden_bridge.png",
    activities: [
      {
        time: "06:15",
        activityVi: "Yoga & Thiền định trên bãi cát trắng",
        activityEn: "Morning Beach Yoga & Meditation",
        descriptionVi: "Lớp học Yoga đón bình minh nhô lên từ biển Đông, giúp điều hòa hơi thở và tái tạo năng lượng thể chất tốt lành.",
        descriptionEn: "Gentle beach yoga session to welcome the sunrise over the East Sea and refresh your mind."
      },
      {
        time: "07:00",
        activityVi: "Bữa sáng Buffet Hoàng Gia",
        activityEn: "Royal Buffet Breakfast",
        descriptionVi: "Thưởng thức bánh ngọt Pháp, trái cây tươi nhiệt đới dồi dào, phở bò đặc sản miền Trung cùng cà phê phin đậm đà.",
        descriptionEn: "Enjoy freshly baked pastries, tropical fruits, local beef Pho, and traditional Vietnamese filter coffee."
      },
      {
        time: "08:30",
        activityVi: "Tour VIP Bà Nà Hills & Cầu Vàng",
        activityEn: "Ba Na Hills & Golden Bridge VIP Tour",
        descriptionVi: "Di chuyển bằng cáp treo cabin VIP vượt qua làn sương mây, tham quan Cầu Vàng biểu tượng held by giant hands và Làng Pháp cổ kính.",
        descriptionEn: "Take a VIP cable car cabin through the clouds, walk on the iconic Golden Bridge held by giant stone-like hands.",
        highlight: true
      },
      {
        time: "12:30",
        activityVi: "Bữa trưa BBQ hải sản nướng bên bờ biển",
        activityEn: "Beachside Seafood BBQ Lunch",
        descriptionVi: "Thưởng thức tiệc nướng hải sản phong phú cua huỳnh đế, hàu sữa nướng mỡ hành thơm nức tại bãi biển riêng của resort.",
        descriptionEn: "Savor a beachside BBQ grill lunch featuring king crab and grilled local oysters."
      },
      {
        time: "15:30",
        activityVi: "Bách bộ Phố cổ Hội An & Thả hoa đăng",
        activityEn: "Excursion to Hoi An Ancient Town",
        descriptionVi: "Xe đưa Quý khách tham quan phố cổ đèn lồng rực rỡ, đi thuyền gỗ thả đèn hoa đăng lung linh cầu an trên dòng sông Hoài.",
        descriptionEn: "Explore the ancient town illuminated by lanterns, ride a wooden boat and release floating candle lanterns on Hoai River.",
        highlight: true
      },
      {
        time: "19:30",
        activityVi: "Dạ tiệc ẩm thực sông nước Hội An",
        activityEn: "Hoi An Riverside Gala Dinner",
        descriptionVi: "Thực đơn tối thưởng thức món ăn đặc sản truyền thống Cao Lầu, cơm gà Phố Hội bên bờ sông rực rỡ sắc màu.",
        descriptionEn: "Enjoy a special riverside dinner featuring traditional local dishes like Cao Lau and Hoi An chicken rice."
      }
    ]
  },
  {
    day: 3,
    titleVi: "Danh Thắng Ngũ Hành Sơn - Mì Quảng Truyền Thống",
    titleEn: "Marble Mountains Sanctuary - Traditional Cooking Masterclass",
    subtitleVi: "Thăm Động Huyền Không - Lớp học đổ bánh xèo & Mì Quảng - Tiễn khách",
    subtitleEn: "Huyen Khong Cave Visit - Quảng Noodle Masterclass - Farewell",
    image: "/images/danang_beach_activity.png",
    activities: [
      {
        time: "06:30",
        activityVi: "Ngắm bình minh muộn & Trà sen ban công",
        activityEn: "Late Sunrise & Lotus Tea on Balcony",
        descriptionVi: "Đón ngày mới thảnh thơi bên ly trà sen Tây Hồ thanh tao phục vụ tận hiên phòng nghỉ.",
        descriptionEn: "Awaken your senses with a freshly brewed cup of lotus tea served right on your suite balcony."
      },
      {
        time: "08:00",
        activityVi: "Khám phá Danh thắng Ngũ Hành Sơn",
        activityEn: "Explore Marble Mountains",
        descriptionVi: "Bách bộ tham quan các hang động huyền ảo như Động Huyền Không, Chùa Tam Thai cổ kính ngàn năm tuổi.",
        descriptionEn: "Walk up the scenic marble steps, exploring spiritual caves like Huyen Khong and ancient Tam Thai pagoda."
      },
      {
        time: "10:00",
        activityVi: "Lớp học nấu Mì Quảng & Bánh Xèo truyền thống",
        activityEn: "Quảng Noodle & Banh Xeo Cooking Masterclass",
        descriptionVi: "Bếp trưởng resort chia sẻ bí quyết làm sợi mì Quảng mềm dai thơm mùi củ nén và đĩa bánh xèo giòn rụm màu nghệ.",
        descriptionEn: "Our Head Chef shares secrets to making traditional Quảng noodles and crispy golden Vietnamese Banh Xeo.",
        highlight: true
      },
      {
        time: "11:30",
        activityVi: "Check-out thảnh thơi",
        activityEn: "Leisure Check-out",
        descriptionVi: "Hoàn tất thủ tục trả phòng thong thả tại quầy lễ tân sang trọng, lưu lại những bức ảnh kỷ niệm cùng đội ngũ phục vụ.",
        descriptionEn: "Leisurely complete check-out procedures and settle personal bills at the cozy reception desk."
      },
      {
        time: "12:00",
        activityVi: "Brunch buffet tiễn đoàn thịnh soạn",
        activityEn: "Sumptuous Farewell Brunch",
        descriptionVi: "Bữa trưa sớm nhiều dinh dưỡng nạp đầy năng lượng cho chặng bay trở về nhà suôn sẻ.",
        descriptionEn: "Enjoy a rich farewell brunch buffet to recharge before your flight back home."
      },
      {
        time: "13:30",
        activityVi: "Tiễn sân bay Đà Nẵng",
        activityEn: "Transfer to Da Nang Airport",
        descriptionVi: "Quản gia tiễn đoàn ra xe Limousine riêng đưa tiễn thẳng ra sân bay Đà Nẵng. Chào tạm biệt Thượng khách.",
        descriptionEn: "Your butler bids farewell as you board the private Limousine for a smooth transfer to Da Nang International Airport."
      }
    ]
  }
];

export const GALLERY_DATA = [
  { url: "/images/danang_golden_bridge.png", title: "Cầu Vàng Bà Nà Hills ẩn hiện trong sương mây" },
  { url: "/images/danang_resort_sunrise.png", title: "Bình minh rực sắc rạng ngời tại hồ vô cực resort" },
  { url: "/images/danang_luxury_suite.png", title: "Không gian biệt thự phòng ngủ Imperial Duplex tráng lệ" },
  { url: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=900", title: "Hồ Jacuzzi sục nước ấm tựa vách núi Sơn Trà" },
  { url: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=900", title: "Ẩm thực hải sản Michelin bên bờ đại dương" },
  { url: "/images/danang_beach_activity.png", title: "Thư giãn thảnh thơi đón gió biển trên cát trắng Mỹ Khê" }
];
