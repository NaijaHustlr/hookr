
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Heart, MessageSquare, Share, Lock, User } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const PostPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const [liked, setLiked] = useState(false);
  
  // Fetch post data
  const { data: post, isLoading } = useQuery({
    queryKey: ['post', id],
    queryFn: async () => {
      if (!id) return null;
      
      const { data, error } = await supabase
        .from('posts')
        .select(`
          *,
          creator:creator_id (
            id,
            username,
            avatar_url,
            creator_status
          )
        `)
        .eq('id', id)
        .single();
        
      if (error) {
        console.error("Error fetching post:", error);
        throw new Error("Error fetching post");
      }
      
      return data;
    },
    enabled: !!id
  });
  
  // Functions
  const handleGoBack = () => navigate(-1);
  
  const handleLike = () => {
    if (!user) {
      toast({
        title: "Not logged in",
        description: "Please sign in to like posts",
        variant: "destructive"
      });
      return;
    }
    
    setLiked(!liked);
    // In a real app, we would update the likes count in the database here
    toast({
      title: liked ? "Post unliked" : "Post liked",
      description: liked ? "Removed from your liked posts" : "Added to your liked posts"
    });
  };
  
  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link copied",
      description: "Post link copied to clipboard"
    });
  };
  
  const handleFollow = () => {
    if (!user) {
      toast({
        title: "Not logged in",
        description: "Please sign in to follow creators",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Following",
      description: `You're now following ${post?.creator?.username}`
    });
  };
  
  // Loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-hookr-dark">
        <div className="animate-spin text-hookr-accent">●</div>
      </div>
    );
  }
  
  // Post not found state
  if (!post) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-hookr-dark p-4">
        <h2 className="text-2xl text-hookr-light mb-4">Post Not Found</h2>
        <p className="text-hookr-light/70 mb-6 text-center">
          This post may have been removed or is not available.
        </p>
        <Button onClick={handleGoBack} variant="outline" className="text-hookr-light">
          Go Back
        </Button>
      </div>
    );
  }
  
  // Premium content check
  const isPremium = post.is_premium;
  const hasAccess = true; // TODO: Replace with actual subscription check
  
  return (
    <div className="flex flex-col min-h-screen bg-hookr-dark pb-20">
      {/* Header with back button */}
      <header className="sticky top-0 z-30 bg-hookr-dark bg-opacity-95 backdrop-blur-sm px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" onClick={handleGoBack} className="mr-2">
              <ArrowLeft className="h-5 w-5 text-hookr-light" />
            </Button>
            <h1 className="text-xl font-serif-custom text-hookr-light">Post</h1>
          </div>
        </div>
      </header>
      
      <div className="flex-1 px-4 py-6">
        <Card className="bg-hookr-muted border-hookr-muted overflow-hidden">
          {/* Creator info */}
          <div className="flex items-center p-3 border-b border-hookr-light/10">
            <Avatar className="h-8 w-8 mr-2">
              <img src={post.creator?.avatar_url || "/placeholder.svg"} alt={post.creator?.username || "Creator"} />
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center">
                <span className="text-hookr-light font-medium text-sm">{post.creator?.username || "Unknown Creator"}</span>
                {post.creator?.creator_status === 'approved' && (
                  <span className="ml-1 bg-blue-500 rounded-full p-0.5 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                )}
              </div>
              <p className="text-xs text-hookr-light/60">
                {new Date(post.created_at).toLocaleDateString()}
              </p>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              className="text-xs border-hookr-accent text-hookr-accent h-8"
              onClick={handleFollow}
            >
              <User className="h-3 w-3 mr-1" />
              Follow
            </Button>
          </div>
          
          {/* Media content */}
          <div className="relative">
            {isPremium && !hasAccess ? (
              <div className="aspect-square bg-black flex flex-col items-center justify-center">
                <Lock className="h-12 w-12 text-hookr-accent mb-4" />
                <h3 className="text-hookr-light text-xl mb-2">Premium Content</h3>
                <p className="text-hookr-light/70 mb-4 text-center px-8">
                  Subscribe to unlock this exclusive content
                </p>
                <Button className="bg-hookr-accent text-white">
                  Subscribe Now
                </Button>
              </div>
            ) : (
              post.media_type === 'image' ? (
                <img 
                  src={post.media_url} 
                  alt={post.caption || "Post"} 
                  className="w-full aspect-square object-contain bg-black" 
                />
              ) : (
                <video 
                  src={post.media_url}
                  className="w-full aspect-square object-contain bg-black"
                  controls
                  autoPlay
                  muted
                  loop
                />
              )
            )}
          </div>
          
          {/* Post caption and actions */}
          <div className="p-4">
            {/* Action buttons */}
            <div className="flex justify-between mb-4">
              <div className="flex gap-4">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className={`text-hookr-light ${liked ? 'text-red-500' : ''}`} 
                  onClick={handleLike}
                >
                  <Heart className={`h-6 w-6 ${liked ? 'fill-red-500' : ''}`} />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="text-hookr-light"
                >
                  <MessageSquare className="h-6 w-6" />
                </Button>
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-hookr-light"
                onClick={handleShare}
              >
                <Share className="h-6 w-6" />
              </Button>
            </div>
            
            {/* Caption */}
            {post.caption && (
              <p className="text-hookr-light mb-3">{post.caption}</p>
            )}
            
            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mb-3">
                {post.tags.map((tag: string) => (
                  <span key={tag} className="text-hookr-accent text-sm">
                    #{tag}
                  </span>
                ))}
              </div>
            )}
            
            {/* Comments (placeholder) */}
            <div className="mt-6 border-t border-hookr-light/10 pt-4">
              <h3 className="text-hookr-light/80 text-sm mb-4">Comments</h3>
              <div className="text-center py-4 text-hookr-light/60 text-sm">
                No comments yet
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default PostPage;
