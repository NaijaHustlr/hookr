
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Model, ModelTag, ModelAvailability, Post } from "@/types/supabase";
import { ModelType } from "@/types/model";

interface FetchModelsOptions {
  featured?: boolean;
  verified?: boolean;
  tags?: string[];
  minRating?: number;
  maxDistance?: number;
  limit?: number;
}

export const fetchModels = async (options: FetchModelsOptions = {}): Promise<ModelType[]> => {
  try {
    // Fetch approved creators from profiles table
    let query = supabase
      .from('profiles')
      .select(`
        id,
        username,
        avatar_url,
        bio,
        gender,
        creator_status
      `)
      .eq('creator_status', 'approved');
    
    if (options.limit) {
      query = query.limit(options.limit);
    }
    
    const { data, error } = await query;
    
    if (error) {
      console.error('Error fetching creators:', error);
      throw error;
    }
    
    // Transform database creators to our ModelType format
    const creatorIds = data.map(creator => creator.id);
    
    // Fetch posts for all creators
    const { data: posts } = await supabase
      .from('posts')
      .select('*')
      .in('creator_id', creatorIds)
      .order('created_at', { ascending: false });
    
    // Transform the profiles into ModelType objects
    return data.map(profile => {
      const creatorPosts = posts?.filter(post => post.creator_id === profile.id) || [];
      
      return {
        id: profile.id,
        name: profile.username || 'Anonymous Creator',
        profileImage: profile.avatar_url || '/placeholder.svg',
        fallbackImage: creatorPosts[0]?.media_url || '/placeholder.svg',
        rating: 4.5, // Default rating
        reviewCount: Math.floor(Math.random() * 50) + 1, // Random for now
        distance: Math.floor(Math.random() * 10) + 1 + ' miles away', // Random for now
        price: Math.floor(Math.random() * 300) + 50, // Random for now
        tags: ['Model', profile.gender || 'Unknown'],
        availability: [
          { day: "Mon", available: true },
          { day: "Tue", available: true },
          { day: "Wed", available: true },
          { day: "Thu", available: true },
          { day: "Fri", available: true },
          { day: "Sat", available: true },
          { day: "Sun", available: true }
        ],
        age: Math.floor(Math.random() * 10) + 21, // Random for now
        verified: true,
        featured: Math.random() > 0.5, // Random for now
        isCreator: true,
        posts: creatorPosts.map(post => ({
          id: post.id,
          modelId: profile.id,
          content: post.caption || '',
          mediaUrl: post.media_url,
          mediaType: post.media_type,
          likes: post.likes_count,
          comments: post.comments_count,
          timestamp: new Date(post.created_at),
          isPremium: post.is_premium
        }))
      };
    });
  } catch (error) {
    console.error("Error in fetchModels:", error);
    return [];
  }
};

export const useModels = (options: FetchModelsOptions = {}) => {
  return useQuery({
    queryKey: ['models', options],
    queryFn: () => fetchModels(options),
  });
};

export const useFeaturedModels = (limit: number = 8) => {
  return useQuery({
    queryKey: ['models', 'featured', limit],
    queryFn: async () => {
      const allModels = await fetchModels({ limit: 20 });
      return allModels.filter(model => model.featured).slice(0, limit);
    },
  });
};

export const useNewModels = (limit: number = 8) => {
  return useQuery({
    queryKey: ['models', 'new', limit],
    queryFn: async () => {
      const models = await fetchModels({ limit });
      return models.sort((a, b) => 0.5 - Math.random());
    },
  });
};

export const useTopRatedModels = (limit: number = 8) => {
  return useQuery({
    queryKey: ['models', 'topRated', limit],
    queryFn: async () => {
      const models = await fetchModels({ limit: 20 });
      return models.sort((a, b) => b.rating - a.rating).slice(0, limit);
    },
  });
};

export const useVerifiedModels = (limit: number = 8) => {
  return useQuery({
    queryKey: ['models', 'verified', limit],
    queryFn: () => fetchModels({ verified: true, limit }),
  });
};

export const useNearbyModels = (limit: number = 8) => {
  return useQuery({
    queryKey: ['models', 'nearby', limit],
    queryFn: async () => {
      const models = await fetchModels({ limit: 20 });
      // Sort by the distance field which has miles as a string
      return models.sort((a, b) => {
        const aDistance = parseInt(a.distance.split(' ')[0]) || 0;
        const bDistance = parseInt(b.distance.split(' ')[0]) || 0;
        return aDistance - bDistance;
      }).slice(0, limit);
    },
  });
};
