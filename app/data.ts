import { SuiteType, ExperienceType, ItineraryDayType } from "./types";

export const SUITES_DATA: SuiteType[] = [
  {
    id: "royal-suite",
    name: "Royal Suite",
    vietnameseName: "Phòng Hoàng Gia",
    size: "65m²",
    view: "Toàn Cảnh Hướng Vịnh & Ban Công Riêng",
    capacity: "2 Người Lớn (+1 Trẻ Em)",
    pricePerPax: 29900000,
    description: "Không gian kết hợp hài hòa nét kiến trúc Đông Dương sang trọng và tiện nghi hiện đại, sở hữu ban công lãng mạn ngắm vịnh và bồn tắm dát vàng mở rộng hướng đại dương.",
    features: [
      "Ban công riêng biệt với bàn trà sang trọng",
      "Bồn tắm nằm view kính toàn cảnh vịnh biển",
      "Giường ngủ King-size cao cấp bọc nhung hoàng gia",
      "Hệ thống thiết bị vệ sinh nhập khẩu Châu Âu",
      "Trà thượng hạng và Giỏ hoa tươi đón chào"
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
    view: "Góc Nhìn Khép Kín 180 Độ Toàn Hệ Sinh Thái",
    capacity: "2 Người Lớn (+2 Trẻ Em)",
    pricePerPax: 49900000,
    description: "Được thiết kế tinh tế tinh xảo tối cao tại vị trí đầu du thuyền, trang bị sàn gỗ quý, ban công tắm nắng chuyên biệt và quản gia cá nhân túc trực phục vụ bữa ăn lãng mạn bất kỳ lúc nào.",
    features: [
      "Sân tắm nắng ngoài trời (Private Deck) rộng rãi",
      "Hệ thống Quản gia cá nhân (Butler Service) 24/7",
      "Phòng khách biệt lập trang bị dàn loa Hi-End thượng đẳng",
      "Welcome Champagne và trứng cá tầm Caviar lúc nhận phòng",
      "Liệu trình massage body 60 phút miễn phí hằng ngày"
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
    view: "Góc Nhìn Điện Ảnh 270 Độ Ôm Trọn Kỳ Quan",
    capacity: "4 Người Lớn (+2 Trẻ Em)",
    pricePerPax: 79900000,
    description: "Tuyệt tác phòng thông tầng siêu sang đầu tiên trên vịnh biển Hạ Long. Thừa hưởng hồ bơi sục hơi Jacuzzi riêng tư trực diện mặt nước và hầm rượu vang độc bản phục vụ các bữa tiệc thượng đẳng.",
    features: [
      "Cấu trúc biệt thự thông tầng (Duplex) trần cao lộng lẫy",
      "Hồ Jacuzzi sục nước ấm ngoài trời tiếp giáp mặt biển",
      "Tủ bảo quản xì-gà và vang hảo hạng tuyển chọn quốc tế",
      "Hải trình bay trực thăng ngắm vịnh 20 phút cho mọi hành khách",
      "Tiệc tối Fine Dining cá nhân hóa phục vụ ngay tại suite"
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
    description: "Tự tay lướt mái chèo gỗ qua những hang luồn kỳ bí, chiêm ngưỡng thế giới núi đá vôi nghìn năm trầm mặc dưới ánh nắng ngọc bích rực rỡ.",
    image: "/images/halong_kayaking.png",
    time: "15:00 - Ngày 1 & Ngày 2"
  },
  {
    id: "spa",
    title: "Aqua Royal Spa",
    vietnameseTitle: "Trị Liệu Thảo Mộc Thượng Uyển",
    description: "Nhắm mắt lắng nghe tiếng sóng vỗ, tận hưởng liệu trình massage bằng xông tinh dầu hoa sen tươi giúp phục hồi tâm trí và căng tràn sức sống.",
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=1200",
    time: "Phục vụ 09:00 - 21:00 hằng ngày"
  },
  {
    id: "sunset-party",
    title: "Golden Hour Sunset Champagne",
    vietnameseTitle: "Tiệc Champagne Hoàng Hôn",
    description: "Khoảnh khắc kỳ diệu khi ánh tà dương dát vàng mặt nước. Cùng nâng ly rượu vang nổ sủi bọt, trò chuyện lãng mạn bên nền nhạc violin cổ điển du dương.",
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=1200",
    time: "17:30 - Ngày 1"
  },
  {
    id: "private-dinner",
    title: "Candlelit Fine Dining",
    vietnameseTitle: "Mỹ Vị Dương Gian Dưới Ánh Nến",
    description: "Tiệc tối chuẩn ẩm thực Michelin đầy nghệ thuật. Hải sản bơi tươi rói khai thác trực tiếp được chế biến tài hoa bởi những siêu đầu bếp hàng đầu.",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=1200",
    time: "19:30 - Hằng đêm"
  }
];

export const ITINERARY_DATA: ItineraryDayType[] = [
  {
    day: 1,
    title: "Nghi Thức Đón Chào & Ánh Hoàng Hôn Đầu Tiên",
    subtitle: "Cảng tàu Tuần Châu - Đón khách lên du thuyền - Tiệc trà chiều ngắm vịnh",
    image: "https://images.unsplash.com/photo-1528127269322-539801943592?q=80&w=1200",
    activities: [
      {
        time: "11:30 - 12:15",
        activity: "Check-in Nhà chờ VIP",
        description: "Chào đón quý khách bằng thảm đỏ thượng lưu, thưởng thức cold press juice và hoàn tất thủ tục lên du thuyền."
      },
      {
        time: "12:30",
        activity: "Chào mừng & Nhận phòng",
        description: "Đội ngũ hoa tiêu rải cánh hoa hồng chào mừng Quý khách lên ngọc tàu Emerald. Quản Gia cá nhân hướng dẫn nhận suite.",
        highlight: true
      },
      {
        time: "13:00",
        activity: "Bữa trưa Mỹ vị Bản địa",
        description: "Thực đơn trưa Hải vị đặc tuyển mộc mạc thơm lừng phục vụ tại nhà hàng Grand Panorama với góc nhìn vịnh biển vô cực."
      },
      {
        time: "15:30",
        activity: "Kayak khám phá vụng hoang Lan Hạ",
        description: "Tham gia chèo thuyền hoặc tự do nghỉ ngơi ngâm mình dưới bồn tắm sục Jacuzzi của du thuyền giữa không gian tĩnh lặng."
      },
      {
        time: "17:30",
        activity: "Sunset Premium Party",
        description: "Tiệc dâu tây, phô mai lát và sâm-panh hoàng hôn. Tiếng nhạc hòa tấu mượt mà khởi nguyên cho kỳ nghỉ xa xỉ.",
        highlight: true
      },
      {
        time: "19:30",
        activity: "Đại tiệc nến Michelin",
        description: "Tiệc tối sang trọng đẳng cấp cao với Tôm Hùm đá nướng, sườn cừu đút lò cùng súp bào ngư thượng hạng."
      }
    ]
  },
  {
    day: 2,
    title: "Vùng Biển Ngọc Sương - Hang Sáng Tối bí ẩn",
    subtitle: "Thái Cực Quyền - Thăm Làng nổi chài lưới xưa - Trị liệu thư giãn chuyên biệt",
    image: "https://images.unsplash.com/photo-1552083375-1447ce886485?q=80&w=1200",
    activities: [
      {
        time: "06:15",
        activity: "Khởi tạo Năng lượng Taichi",
        description: "Bài tập dưỡng sinh Thái Cực Quyền đón ánh bình minh vàng dịu nhẹ nhất lọc tinh khí đất trời."
      },
      {
        time: "07:00",
        activity: "Bữa sáng Hoàng Gia",
        description: "Thưởng thức bánh sừng bò nóng hổi nướng lò, ngũ cốc, phở bò tươi hảo hạng và cà phê thủ công tuyệt vời."
      },
      {
        time: "08:30",
        activity: "Khám phá Làng cổ trên vịnh",
        description: "Gặp gỡ dân chài địa phương hoài cổ, tham gia tìm hiểu phương thức ngọc trai quý báu đắt giá bậc nhất Đông Dương.",
        highlight: true
      },
      {
        time: "12:00",
        activity: "Bữa trưa Khơi Xa lãng mạn",
        description: "Ẩm thực nướng BBQ ngoài trời cực kỳ sảng khoái với cua tuyết vàng nướng phô mai đút lò thơm nức mũi."
      },
      {
        time: "14:30",
        activity: "Cano bọc da tham quan Hang Sáng Tối",
        description: "Tàu tốc hành đưa quý khách vào quần thể đầm phá khép kín ngoạn mục nhất, thỏa mãn mọi tín đồ đam mê nhiếp ảnh tự nhiên."
      },
      {
        time: "16:30",
        activity: "Nghi thức trà chiều hoàng kim",
        description: "Tận hưởng ưu đãi liệu trình Spa tẩm quất hoàng gia kéo dài 60 phút tái tạo toàn diện năng cơ cột sống mệt nhọc."
      },
      {
        time: "19:30",
        activity: "Dạ tiệc mặt trăng lộng lẫy",
        description: "Tiệc khiêu vũ nhẹ nhàng dưới ánh đèn nghệ thuật lãng mạn trên sân thượng Sky Lounge ngọc.",
        highlight: true
      }
    ]
  },
  {
    day: 3,
    title: "Tịnh Tâm Đầu Thu - Khứ Hồi Cảng Ngọc",
    subtitle: "Tắm nắng ban mai - Trải nghiệm lớp học nấu ăn nghệ thuật - Tiễn đoàn",
    image: "/images/aodai_mic_halong.png",
    activities: [
      {
        time: "06:30",
        activity: "Ngắm bình minh muộn trên ban công",
        description: "Khơi gợi giác quan bằng tách trà sen thanh tao tươi mới được phục vụ ngay tầng hiên phòng nghỉ ngơi."
      },
      {
        time: "08:00",
        activity: "Bữa sáng dinh dưỡng cao",
        description: "Khởi động ngày cuối thanh dã nhẹ nhàng cùng trái cây vùng nhiệt đới, nước ép detox giàu vitamin dồi dào."
      },
      {
        time: "09:30",
        activity: "Lớp học bánh xèo truyền thống",
        description: "Bếp trưởng hướng dẫn bí quyết đổ đĩa bánh xèo giòn tan vàng ươm trứ danh hồn cốt dân tộc.",
        highlight: true
      },
      {
        time: "10:30",
        activity: "Check-out thảnh thơi",
        description: "Hành khách thong thả làm thủ tục trả phòng, thanh toán chi phí phụ thu nếu có tại quầy tiếp tân ấm cúng."
      },
      {
        time: "11:00",
        activity: "Brunch buffet thịnh soạn",
        description: "Bữa trưa sớm thịnh soạn nạp đầy sinh lực cho chặng đường trở về đất liền thuận buồm xuôi gió."
      },
      {
        time: "12:00",
        activity: "Trở về Cảng tàu Tuần Châu",
        description: "Đại lễ vẫy tay chào tạm biệt của thủy thủ đoàn. Xe Limousine cao cấp đón quý khách hồi gia an toàn."
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
  { url: "/images/halong_kayak_experience.png", title: "Hoạt động chèo xuồng yên ả" }
];
