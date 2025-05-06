
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Model, ModelTag, ModelAvailability } from "@/types/supabase";
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
    // Build the query
    let query = supabase
      .from('models')
      .select(`
        *,
        model_tags(tag),
        model_availability(day, available)
      `);
    
    // Apply filters
    if (options.featured !== undefined) {
      query = query.eq('featured', options.featured);
    }
    
    if (options.verified !== undefined) {
      query = query.eq('verified', options.verified);
    }
    
    if (options.minRating !== undefined) {
      query = query.gte('rating', options.minRating);
    }
    
    if (options.limit) {
      query = query.limit(options.limit);
    }
    
    const { data, error } = await query;
    
    if (error) {
      console.error('Error fetching models:', error);
      throw error;
    }
    
    // Transform database models to our ModelType format
    return data.map((item: any) => {
      const model: Model = item;
      const modelTags: ModelTag[] = item.model_tags || [];
      const modelAvailability: ModelAvailability[] = item.model_availability || [];
      
      return {
        id: model.id,
        name: model.name,
        profileImage: model.profile_image_url || '/placeholder.svg',
        fallbackImage: model.fallback_image_url,
        rating: model.rating,
        reviewCount: model.review_count,
        distance: model.distance || 'Unknown',
        price: model.price,
        tags: modelTags.map(tag => tag.tag),
        availability: modelAvailability.map(avail => ({
          day: avail.day,
          available: avail.available
        })),
        age: model.age,
        verified: model.verified,
        featured: model.featured,
        isCreator: true // All models in our system are creators
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
    queryFn: () => fetchModels({ featured: true, limit }),
  });
};

export const useNewModels = (limit: number = 8) => {
  return useQuery({
    queryKey: ['models', 'new', limit],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from('models')
          .select(`
            *,
            model_tags(tag),
            model_availability(day, available)
          `)
          .order('created_at', { ascending: false })
          .limit(limit);
        
        if (error) throw error;
        
        return data.map((item: any) => {
          const model: Model = item;
          const modelTags: ModelTag[] = item.model_tags || [];
          const modelAvailability: ModelAvailability[] = item.model_availability || [];
          
          return {
            id: model.id,
            name: model.name,
            profileImage: model.profile_image_url || '/placeholder.svg',
            fallbackImage: model.fallback_image_url,
            rating: model.rating,
            reviewCount: model.review_count,
            distance: model.distance || 'Unknown',
            price: model.price,
            tags: modelTags.map(tag => tag.tag),
            availability: modelAvailability.map(avail => ({
              day: avail.day,
              available: avail.available
            })),
            age: model.age,
            verified: model.verified,
            featured: model.featured,
            isCreator: true
          };
        });
      } catch (error) {
        console.error("Error in useNewModels:", error);
        return [];
      }
    },
  });
};

export const useTopRatedModels = (limit: number = 8) => {
  return useQuery({
    queryKey: ['models', 'topRated', limit],
    queryFn: () => fetchModels({ minRating: 4.5, limit }),
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
      try {
        // In a real app, we would use geolocation and sort by actual distance
        // For now, we'll just sort by the distance field which is a string
        const { data, error } = await supabase
          .from('models')
          .select(`
            *,
            model_tags(tag),
            model_availability(day, available)
          `)
          .order('distance', { ascending: true })
          .limit(limit);
        
        if (error) throw error;
        
        return data.map((item: any) => {
          const model: Model = item;
          const modelTags: ModelTag[] = item.model_tags || [];
          const modelAvailability: ModelAvailability[] = item.model_availability || [];
          
          return {
            id: model.id,
            name: model.name,
            profileImage: model.profile_image_url || '/placeholder.svg',
            fallbackImage: model.fallback_image_url,
            rating: model.rating,
            reviewCount: model.review_count,
            distance: model.distance || 'Unknown',
            price: model.price,
            tags: modelTags.map(tag => tag.tag),
            availability: modelAvailability.map(avail => ({
              day: avail.day,
              available: avail.available
            })),
            age: model.age,
            verified: model.verified,
            featured: model.featured,
            isCreator: true
          };
        });
      } catch (error) {
        console.error("Error in useNearbyModels:", error);
        return [];
      }
    },
  });
};
