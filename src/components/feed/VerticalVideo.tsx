
import React, { useState, useRef, useEffect } from "react";
import { Heart, MessageSquare, Save, User, ChevronUp, DollarSign } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ModelType, Post } from "@/types/model";
import { useToast } from "@/hooks/use-toast";

interface VerticalVideoProps {
  post: Post;
  model: ModelType;
  onVideoEnd: () => void;
  currentIndex: number;
  totalVideos: number;
}

export const VerticalVideo: React.FC<VerticalVideoProps> = ({
  post,
  model,
  onVideoEnd,
  currentIndex,
  totalVideos
}) => {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [showScrollPrompt, setShowScrollPrompt] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { toast } = useToast();
  
  // Timer to show scroll prompt after video plays
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowScrollPrompt(true);
    }, 15000); // 15 seconds
    
    return () => clearTimeout(timer);
  }, [currentIndex]);
  
  // Handle video end
  const handleVideoEnd = () => {
    setShowScrollPrompt(true);
  };
  
  const handleLike = () => {
    setLiked(!liked);
    if (!liked) {
      toast({
        title: "Post liked",
        description: "Added to your liked posts",
      });
    }
  };
  
  const handleSave = () => {
    setSaved(!saved);
    if (!saved) {
      toast({
        title: "Post saved",
        description: "Added to your saved collection",
      });
    }
  };
  
  const handleFollow = () => {
    toast({
      title: "Following",
      description: `You're now following ${model.name}`,
    });
  };
  
  const handleTip = () => {
    toast({
      title: "Tip",
      description: `Send a tip to ${model.name}`,
    });
  };
  
  return (
    <div className="h-full w-full relative">
      {/* Video */}
      <video
        ref={videoRef}
        src={post.mediaUrl || "/lovable-uploads/video-placeholder.mp4"}
        className="h-full w-full object-cover"
        autoPlay
        loop
        playsInline
        muted
        onEnded={handleVideoEnd}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/40 pointer-events-none" />
      
      {/* Progress indicator */}
      <div className="absolute top-12 left-0 right-0 flex justify-center">
        <div className="flex gap-1">
          {Array.from({ length: totalVideos }).map((_, index) => (
            <div 
              key={index} 
              className={`h-1 rounded-full ${
                index === currentIndex ? 'bg-white w-6' : 'bg-white/40 w-4'
              }`}
            />
          ))}
        </div>
      </div>
      
      {/* Content */}
      <div className="absolute bottom-20 left-4 right-32">
        <h3 className="text-white font-medium mb-1 flex items-center">
          @{model.name}
          {model.verified && (
            <span className="ml-1 bg-blue-500 rounded-full p-0.5">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </span>
          )}
        </h3>
        <p className="text-white/90 text-sm line-clamp-2 mb-3">{post.content}</p>
      </div>
      
      {/* Right sidebar actions */}
      <div className="absolute right-4 bottom-28 flex flex-col items-center gap-6">
        <div className="flex flex-col items-center">
          <Button 
            variant="outline" 
            size="icon" 
            className="h-10 w-10 rounded-full bg-black/30 border-none text-white" 
            onClick={handleLike}
          >
            <Heart className={`h-6 w-6 ${liked ? 'fill-red-500 text-red-500' : ''}`} />
          </Button>
          <span className="text-white text-xs mt-1">{liked ? post.likes + 1 : post.likes}</span>
        </div>
        
        <div className="flex flex-col items-center">
          <Button 
            variant="outline" 
            size="icon" 
            className="h-10 w-10 rounded-full bg-black/30 border-none text-white"
          >
            <MessageSquare className="h-6 w-6" />
          </Button>
          <span className="text-white text-xs mt-1">{post.comments}</span>
        </div>
        
        <div className="flex flex-col items-center">
          <Button 
            variant="outline" 
            size="icon" 
            className="h-10 w-10 rounded-full bg-black/30 border-none text-white" 
            onClick={handleSave}
          >
            <Save className={`h-6 w-6 ${saved ? 'fill-hookr-accent text-hookr-accent' : ''}`} />
          </Button>
          <span className="text-white text-xs mt-1">Save</span>
        </div>
        
        <div className="flex flex-col items-center">
          <Button 
            variant="outline" 
            size="icon"
            className="h-10 w-10 rounded-full bg-black/30 border-none text-white"
            onClick={handleFollow}
          >
            <User className="h-6 w-6" />
          </Button>
          <span className="text-white text-xs mt-1">Follow</span>
        </div>
        
        <div className="flex flex-col items-center">
          <Button 
            variant="outline" 
            size="icon"
            className="h-10 w-10 rounded-full bg-hookr-accent border-none text-white"
            onClick={handleTip}
          >
            <DollarSign className="h-6 w-6" />
          </Button>
          <span className="text-white text-xs mt-1">Tip</span>
        </div>
      </div>
      
      {/* User info */}
      <div className="absolute left-4 bottom-4 flex items-center">
        <Avatar className="h-10 w-10 border-2 border-white">
          <img src={model.profileImage} alt={model.name} className="object-cover" />
        </Avatar>
        <div className="ml-2">
          <Button variant="outline" size="sm" className="text-xs bg-hookr-accent border-none text-white h-7 px-3">
            Follow
          </Button>
        </div>
      </div>
      
      {/* Scroll prompt */}
      {showScrollPrompt && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center animate-pulse">
          <ChevronUp className="h-10 w-10 text-white" />
          <span className="text-white font-medium mt-2">Swipe up for next</span>
        </div>
      )}
    </div>
  );
};
