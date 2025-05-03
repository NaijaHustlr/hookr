
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, MessageSquare, Save, Lock } from "lucide-react";
import { Post } from "@/types/model";

interface ProfileGalleryProps {
  posts: Post[];
  isSubscribed: boolean;
  likedPosts: string[];
  savedPosts: string[];
  handleLikePost: (postId: string) => void;
  handleSavePost: (postId: string) => void;
  handleOpenComments: (post: Post) => void;
}

const ProfileGallery: React.FC<ProfileGalleryProps> = ({
  posts,
  isSubscribed,
  likedPosts,
  savedPosts,
  handleLikePost,
  handleSavePost,
  handleOpenComments
}) => {
  return (
    <div className="grid grid-cols-2 gap-2">
      {posts?.map(post => (
        <Card 
          key={post.id} 
          className={`bg-hookr-muted border-hookr-muted overflow-hidden relative ${post.isPremium && !isSubscribed ? "opacity-60" : ""}`}
        >
          <div className="relative aspect-square">
            <img 
              src={post.mediaUrl} 
              alt={post.content} 
              className="object-cover w-full h-full" 
            />
            {post.isPremium && !isSubscribed && (
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <Lock className="w-8 h-8 text-white" />
              </div>
            )}
          </div>
          <CardContent className="p-3">
            <p className="text-xs text-hookr-light truncate mb-2">
              {post.content}
            </p>
            <div className="flex justify-between items-center">
              <div className="flex space-x-3">
                <button 
                  className={`flex items-center ${likedPosts.includes(post.id) ? 'text-red-500' : 'text-hookr-light'}`}
                  onClick={() => handleLikePost(post.id)}
                >
                  <Heart className={`h-4 w-4 ${likedPosts.includes(post.id) ? 'fill-current' : ''}`} />
                  <span className="text-xs ml-1">
                    {likedPosts.includes(post.id) ? post.likes + 1 : post.likes}
                  </span>
                </button>
                <button 
                  className="flex items-center text-hookr-light"
                  onClick={() => handleOpenComments(post)}
                >
                  <MessageSquare className="h-4 w-4" />
                  <span className="text-xs ml-1">{post.comments}</span>
                </button>
              </div>
              <button 
                className={`text-hookr-light ${savedPosts.includes(post.id) ? 'text-hookr-accent' : ''}`}
                onClick={() => handleSavePost(post.id)}
              >
                <Save className={`h-4 w-4 ${savedPosts.includes(post.id) ? 'fill-current' : ''}`} />
              </button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ProfileGallery;
