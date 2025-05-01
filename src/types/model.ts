
export interface ModelAvailabilityDay {
  day: string;
  available: boolean;
}

export interface ModelType {
  id: string;
  name: string;
  profileImage: string;
  fallbackImage?: string;
  rating: number;
  reviewCount: number;
  distance: string;
  price: number;
  tags: string[];
  availability: ModelAvailabilityDay[];
  age: number;
  verified: boolean;
  featured: boolean;
}
