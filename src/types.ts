export interface SuiteType {
  id: string;
  name: string;
  vietnameseName: string;
  size: string;
  view: string;
  capacity: string;
  pricePerPax: number;
  description: string;
  features: string[];
  images: string[];
}

export interface ExperienceType {
  id: string;
  title: string;
  vietnameseTitle: string;
  description: string;
  image: string;
  time: string;
}

export interface ItineraryDayType {
  day: number;
  title: string;
  subtitle: string;
  activities: {
    time: string;
    activity: string;
    highlight?: boolean;
    description: string;
  }[];
  image: string;
}

export interface ChatMessageType {
  role: "user" | "model";
  parts: { text: string }[];
}
