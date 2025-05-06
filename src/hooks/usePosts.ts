
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ModelPost } from "@/types/supabase";
import { Post } from "@/types/model";

interface FetchPostsOptions {
  modelId?: string;
  isPremium?: boolean;
  limit?: number;
}

export const fetchPosts = async (options: FetchPostsOptions = {}): Promise<Post[]> => {
  try {
    // Build the query
    let query = supabase
      .from('model_posts')
      .select('*');
    
    // Apply filters
    if (options.modelId) {
      query = query.eq('model_id', options.modelId);
    }
    
    if (options.isPremium !== undefined) {
      query = query.eq('is_premium', options.isPremium);
    }
    
    if (options.limit) {
      query = query.limit(options.limit);
    }
    
    // Order by most recent
    query = query.order('created_at', { ascending: false });
    
    const { data, error } = await query;
    
    if (error) {
      console.error('Error fetching posts:', error);
      throw error;
    }
    
    // Transform database posts to our Post format
    return data.map((post: ModelPost) => ({
      id: post.id,
      modelId: post.model_id,
      content: post.content || '',
      mediaUrl: post.media_url,
      mediaType: post.media_type,
      likes: post.likes,
      comments: post.comments,
      timestamp: new Date(post.created_at),
      isPremium: post.is_premium
    }));
  } catch (error) {
    console.error("Error in fetchPosts:", error);
    return [];
  }
};

export const usePosts = (options: FetchPostsOptions = {}) => {
  return useQuery({
    queryKey: ['posts', options],
    queryFn: () => fetchPosts(options),
  });
};

export const useModelPosts = (modelId: string | undefined) => {
  return useQuery({
    queryKey: ['posts', 'model', modelId],
    queryFn: () => fetchPosts({ modelId }),
    enabled: !!modelId
  });
};

export const useRecentPosts = (limit: number = 10) => {
  return useQuery({
    queryKey: ['posts', 'recent', limit],
    queryFn: () => fetchPosts({ limit }),
  });
};
