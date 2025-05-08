
import React, { useState, useEffect, useRef } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Post as PostType } from "@/types/supabase";
import { useToast } from "@/hooks/use-toast";
import ContentFeed from "@/components/feed/ContentFeed";

const POSTS_PER_PAGE = 5;

const FeedPage: React.FC = () => {
  const { toast } = useToast();
  const observerTarget = useRef(null);

  const fetchPosts = async ({ pageParam = 0 }) => {
    const from = pageParam * POSTS_PER_PAGE;
    const to = from + POSTS_PER_PAGE - 1;
    
    const { data, error, count } = await supabase
      .from('posts')
      .select(`
        *,
        profiles:creator_id (
          username, 
          avatar_url
        )
      `, { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(from, to);
    
    if (error) {
      console.error('Error fetching posts:', error);
      throw error;
    }
    
    return {
      posts: data as (PostType & { profiles: { username: string, avatar_url: string } })[],
      nextCursor: data.length < POSTS_PER_PAGE ? undefined : pageParam + 1,
      count
    };
  };

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error
  } = useInfiniteQuery({
    queryKey: ['feed-posts'],
    queryFn: fetchPosts,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    initialPageParam: 0 // Add the missing initialPageParam property
  });

  // Show error if present
  useEffect(() => {
    if (isError) {
      toast({
        title: "Error loading feed",
        description: error instanceof Error ? error.message : "Something went wrong",
        variant: "destructive"
      });
    }
  }, [isError, error, toast]);

  // Set up intersection observer for infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0]?.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1.0 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  // Flatten the pages array
  const posts = data?.pages.flatMap(page => page.posts) || [];

  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-30 bg-hookr-dark bg-opacity-95 backdrop-blur-sm px-4 py-3">
        <h1 className="text-2xl font-serif-custom text-hookr-light">Feed</h1>
      </header>

      <div className="px-4 py-4 pb-20">
        <ContentFeed
          posts={posts}
          isLoading={isLoading}
          hasNextPage={!!hasNextPage}
          fetchNextPage={fetchNextPage}
          isFetchingNextPage={isFetchingNextPage}
        />
        <div ref={observerTarget} className="h-4" />
      </div>
    </div>
  );
};

export default FeedPage;
