
export interface ModelAvailabilityDay {
  day: string;
  available: boolean;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: Date;
  read: boolean;
}

export interface Post {
  id: string;
  modelId: string;
  content: string;
  mediaUrl: string;
  mediaType: 'image' | 'video';
  likes: number;
  comments: number;
  timestamp: Date;
  isPremium: boolean;
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
  isCreator?: boolean;
  posts?: Post[];
}
