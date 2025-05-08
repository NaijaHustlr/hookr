
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Post } from "@/types/supabase";
import { Avatar } from "@/components/ui/avatar";
import { Heart, MessageSquare, User, Lock, Play } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface ContentFeedProps {
  posts: Post[];
  isLoading: boolean;
  hasNextPage: boolean;
  fetchNextPage: () => void;
  isFetchingNextPage: boolean;
}

const ContentFeed: React.FC<ContentFeedProps> = ({ 
  posts,
  isLoading,
  hasNextPage,
  fetchNextPage,
  isFetchingNextPage
}) => {
  if (isLoading) {
    return (
      <div className="py-10 flex justify-center">
        <div className="animate-spin text-hookr-accent">●</div>
      </div>
    );
  }
  
  if (posts.length === 0) {
    return (
      <div className="py-10 text-center text-hookr-light/70">
        <p>No posts to show.</p>
      </div>
    );
  }
  
  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <Card key={post.id} className="bg-hookr-muted border-hookr-muted overflow-hidden">
          {/* Header with creator info */}
          <div className="flex items-center p-3">
            <Avatar className="h-8 w-8 mr-2">
              <img 
                src={post.profiles?.avatar_url || "/placeholder.svg"} 
                alt={post.profiles?.username || "Creator"} 
              />
            </Avatar>
            <div className="flex-1">
              <Link to={`/profile/${post.creator_id}`} className="text-hookr-light font-medium text-sm hover:underline">
                {post.profiles?.username || "Unknown Creator"}
              </Link>
              <p className="text-xs text-hookr-light/60">
                {new Date(post.created_at).toLocaleDateString()}
              </p>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              className="text-xs border-hookr-accent text-hookr-accent h-8"
            >
              <User className="h-3 w-3 mr-1" />
              Follow
            </Button>
          </div>
          
          {/* Post content */}
          <Link to={`/post/${post.id}`} className="block relative">
            {post.is_premium ? (
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
            ) : post.media_type === 'image' ? (
              <img 
                src={post.media_url} 
                alt={post.caption || "Post"} 
                className="w-full aspect-square object-contain bg-black" 
              />
            ) : (
              <div className="relative aspect-square bg-black">
                <video 
                  src={post.media_url}
                  className="w-full h-full object-contain"
                  loop
                  muted
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <Play className="h-8 w-8 text-white ml-1" />
                  </div>
                </div>
              </div>
            )}
          </Link>
          
          {/* Actions and caption */}
          <CardContent className="p-3">
            <div className="flex justify-between mb-2">
              <div className="flex gap-4">
                <div className="flex items-center text-hookr-light">
                  <Heart className="h-5 w-5 mr-1" />
                  <span className="text-sm">{post.likes_count}</span>
                </div>
                <div className="flex items-center text-hookr-light">
                  <MessageSquare className="h-5 w-5 mr-1" />
                  <span className="text-sm">{post.comments_count}</span>
                </div>
              </div>
            </div>
            
            {post.caption && (
              <p className="text-sm text-hookr-light">{post.caption}</p>
            )}
            
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-1">
                {post.tags.map((tag) => (
                  <span key={tag} className="text-hookr-accent text-xs">
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      ))}
      
      {hasNextPage && (
        <div className="py-4 flex justify-center">
          <Button 
            onClick={() => fetchNextPage()} 
            disabled={isFetchingNextPage}
            variant="outline"
            className="text-hookr-light border-hookr-light/20"
          >
            {isFetchingNextPage ? "Loading..." : "Load More"}
          </Button>
        </div>
      )}
    </div>
  );
};

export default ContentFeed;
