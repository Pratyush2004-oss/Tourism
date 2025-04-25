export interface PACKAGETYPE {
  __id: string;
  name: string;
  image: string;
  days: number;
  nights: number;
  Overview: string | undefined; 
  Highlight?: string[] | undefined;
  Inclusion: string[] | undefined;
  Exclusion: string[] | undefined;
  Itinerary: Itinerary[] | undefined;
  FAQs: Itinerary[] | undefined ;
}

export type Itinerary = {
  name: string;
  description?: string;
};
