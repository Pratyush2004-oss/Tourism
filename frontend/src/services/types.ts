export interface PACKAGETYPE {
  __id: string;
  name: string;
  image: string;
  days: number;
  nights: number;
  Overview: string[] | undefined;
  Highlights?: string[] | undefined;
  Inclusion: string[] | undefined;
  Exclusion: string[] | undefined;
  Itinerary: Itinerary[] | undefined;
  FAQs: Itinerary[] | undefined;
}

export type Itinerary = {
  name: string;
  description?: string;
};

export interface User {
  _id: string;
  fullname: string;
  mobile: string;
  isVerified: boolean;
}

export type UserInput = {
  fullname: string;
  mobile: string;
  password: string;
  isoCode: string;
};

export type LoginInput = {
  mobile: string;
  password: string;
  isoCode: string;
};

export type HotelType = {
  __id: string;
  city: string;
  hotels: HotelData[];
};

export type HotelData = {
  name: string;
  image: string;
  desc: string;
};

export type CarouselImage = {
  image: string;
  content: string;
};

export type ServiceType = {
  __id: string;
  name: string;
  Overview: string;
  image: CarouselImage[];
};
