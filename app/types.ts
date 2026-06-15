export interface SuiteType {
  id: string;
  name: string;
  vietnameseName: string;
  size: string;
  viewVi: string;
  viewEn: string;
  capacityVi: string;
  capacityEn: string;
  pricePerPax: number;
  descriptionVi: string;
  descriptionEn: string;
  featuresVi: string[];
  featuresEn: string[];
  images: string[];
}

export interface ExperienceType {
  id: string;
  title: string;
  vietnameseTitle: string;
  descriptionVi: string;
  descriptionEn: string;
  image: string;
  timeVi: string;
  timeEn: string;
}

export interface ItineraryDayType {
  day: number;
  titleVi: string;
  titleEn: string;
  subtitleVi: string;
  subtitleEn: string;
  activities: {
    time: string;
    activityVi: string;
    activityEn: string;
    highlight?: boolean;
    descriptionVi: string;
    descriptionEn: string;
  }[];
  image: string;
}

export interface ChatMessageType {
  role: "user" | "model";
  parts: { text: string }[];
}
