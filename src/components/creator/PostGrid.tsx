
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, MessageSquare, Lock } from "lucide-react";
import { Post } from "@/types/supabase";
import { Link } from "react-router-dom";

interface PostGridProps {
  posts: Post[];
  onPostClick?: (post: Post) => void;
}

const PostGrid: React.FC<PostGridProps> = ({ posts, onPostClick }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
      {posts.map((post) => (
        <Card 
          key={post.id} 
          className="bg-hookr-muted border-hookr-muted overflow-hidden hover:border-hookr-accent/40 transition-colors cursor-pointer"
          onClick={onPostClick ? () => onPostClick(post) : undefined}
        >
          <Link to={`/post/${post.id}`} className="block relative aspect-square">
            {post.media_type === 'image' ? (
              <img 
                src={post.media_url} 
                alt={post.caption || "Post"} 
                className="object-cover w-full h-full" 
              />
            ) : (
              <div className="relative w-full h-full">
                <video 
                  src={post.media_url}
                  className="object-cover w-full h-full"
                  loop
                  muted
                  onMouseOver={(e) => e.currentTarget.play()}
                  onMouseOut={(e) => {
                    e.currentTarget.pause();
                    e.currentTarget.currentTime = 0;
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                  <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <div className="w-0 h-0 border-t-4 border-t-transparent border-l-8 border-l-white border-b-4 border-b-transparent ml-1"></div>
                  </div>
                </div>
              </div>
            )}
            
            {post.is_premium && (
              <div className="absolute top-2 right-2 bg-hookr-accent/90 text-white p-1 rounded-full">
                <Lock className="h-3 w-3" />
              </div>
            )}
          </Link>
          
          <CardContent className="p-2">
            <div className="flex justify-between items-center">
              <div className="flex space-x-3 text-hookr-light/80">
                <div className="flex items-center">
                  <Heart className="h-3 w-3 mr-1" />
                  <span className="text-xs">{post.likes_count}</span>
                </div>
                <div className="flex items-center">
                  <MessageSquare className="h-3 w-3 mr-1" />
                  <span className="text-xs">{post.comments_count}</span>
                </div>
              </div>
              
              <div className="text-xs text-hookr-light/60">
                {new Date(post.created_at).toLocaleDateString()}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default PostGrid;
