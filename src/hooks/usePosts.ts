
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Post } from "@/types/supabase";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";

// Fetch all posts (with optional filters)
export const fetchPosts = async (options: { 
  creatorId?: string;
  isPremium?: boolean;
  limit?: number;
  tags?: string[];
} = {}): Promise<Post[]> => {
  try {
    let query = supabase
      .from('posts')
      .select(`
        *,
        profiles:creator_id (username, avatar_url)
      `)
      .order('created_at', { ascending: false });
    
    if (options.creatorId) {
      query = query.eq('creator_id', options.creatorId);
    }
    
    if (options.isPremium !== undefined) {
      query = query.eq('is_premium', options.isPremium);
    }
    
    if (options.tags && options.tags.length > 0) {
      query = query.contains('tags', options.tags);
    }
    
    if (options.limit) {
      query = query.limit(options.limit);
    }
    
    const { data, error } = await query;
    
    if (error) throw error;
    
    return data as Post[];
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
};

// Create a new post
export const createPost = async (post: {
  media_url: string;
  media_type: 'image' | 'video';
  caption?: string;
  tags?: string[];
  is_premium: boolean;
}): Promise<Post | null> => {
  try {
    const { data, error } = await supabase
      .from('posts')
      .insert({
        creator_id: (await supabase.auth.getUser()).data.user?.id,
        ...post
      })
      .select('*')
      .single();

    if (error) throw error;
    
    return data as Post;
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
};

// Upload media to storage
export const uploadMedia = async (file: File, creatorId: string): Promise<string> => {
  try {
    // Create a unique file path with creator ID, timestamp and file extension
    const fileExt = file.name.split('.').pop();
    const filePath = `${creatorId}/${Date.now()}.${fileExt}`;
    
    const { error } = await supabase.storage
      .from('creator_content')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (error) throw error;
    
    // Get the public URL
    const { data } = supabase.storage
      .from('creator_content')
      .getPublicUrl(filePath);
    
    return data.publicUrl;
  } catch (error) {
    console.error("Error uploading media:", error);
    throw error;
  }
};

// Hook for managing posts
export const usePosts = (options: {
  creatorId?: string;
  isPremium?: boolean;
  limit?: number;
  tags?: string[];
} = {}) => {
  return useQuery({
    queryKey: ['posts', options],
    queryFn: () => fetchPosts(options),
  });
};

// Hook for creator posts
export const useCreatorPosts = (creatorId: string | undefined) => {
  return useQuery({
    queryKey: ['posts', 'creator', creatorId],
    queryFn: () => fetchPosts({ creatorId }),
    enabled: !!creatorId
  });
};

// Hook for creating posts
export const useCreatePost = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { user } = useAuth();
  
  return useMutation({
    mutationFn: async (data: {
      file: File;
      caption?: string;
      tags?: string[];
      isPremium: boolean;
    }) => {
      if (!user) throw new Error("User must be logged in to upload");
      
      // 1. Upload the file to storage
      const mediaUrl = await uploadMedia(data.file, user.id);
      
      // 2. Determine media type
      const mediaType = data.file.type.startsWith('image/') ? 'image' : 'video';
      
      // 3. Create the post
      return createPost({
        media_url: mediaUrl,
        media_type: mediaType,
        caption: data.caption,
        tags: data.tags,
        is_premium: data.isPremium
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      toast({
        title: "Post created",
        description: "Your post has been successfully created."
      });
    },
    onError: (error) => {
      toast({
        title: "Error creating post",
        description: error instanceof Error ? error.message : "Something went wrong",
        variant: "destructive"
      });
    }
  });
};
