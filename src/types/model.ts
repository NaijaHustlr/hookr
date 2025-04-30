
export interface ModelType {
  id: string;
  name: string;
  profileImage: string;
  rating: number;
  reviewCount: number;
  distance: string;
  price: number;
  tags: string[];
  availability: { day: string; available: boolean }[];
  bio?: string;
  age?: number;
  location?: string;
  verified?: boolean;
  featured?: boolean;
}
