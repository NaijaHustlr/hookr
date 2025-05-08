export type Profile = {
  id: string;
  username: string | null;
  avatar_url: string | null;
  bio: string | null;
  is_creator: boolean | null;
  creator_status: 'not_applied' | 'pending' | 'approved' | 'rejected';
  gender: string | null;
  applied_at: string | null;
  approved_at: string | null;
  created_at: string | null;
  updated_at: string | null;
};

export type Model = {
  id: string;
  user_id: string | null;
  name: string;
  profile_image_url: string | null;
  fallback_image_url: string | null;
  rating: number;
  review_count: number;
  distance: string | null;
  price: number;
  age: number;
  verified: boolean;
  featured: boolean;
  created_at: string;
  updated_at: string;
};

export type ModelTag = {
  id: string;
  model_id: string;
  tag: string;
};

export type ModelAvailability = {
  id: string;
  model_id: string;
  day: string;
  available: boolean;
};

export type ModelPost = {
  id: string;
  model_id: string;
  content: string | null;
  media_url: string;
  media_type: 'image' | 'video';
  likes: number;
  comments: number;
  is_premium: boolean;
  created_at: string;
};

export type Post = {
  id: string;
  creator_id: string;
  media_url: string;
  media_type: 'image' | 'video';
  caption: string | null;
  tags: string[] | null;
  likes_count: number;
  comments_count: number;
  is_premium: boolean;
  created_at: string;
  updated_at: string;
};

export type Favorite = {
  id: string;
  user_id: string;
  model_id: string;
  created_at: string;
};
