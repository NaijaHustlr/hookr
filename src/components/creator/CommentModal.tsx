
import React from "react";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Heart, Save, DollarSign } from "lucide-react";
import { Post } from "@/types/model";

interface CommentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  activePost: Post | null;
  creator: {
    name: string;
    profileImage: string;
  };
  likedPosts: string[];
  savedPosts: string[];
  handleLikePost: (postId: string) => void;
  handleSavePost: (postId: string) => void;
  handleTipCreator: () => void;
}

const CommentModal: React.FC<CommentModalProps> = ({
  open,
  onOpenChange,
  activePost,
  creator,
  likedPosts,
  savedPosts,
  handleLikePost,
  handleSavePost,
  handleTipCreator,
}) => {
  if (!activePost) return null;
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-hookr-dark border-hookr-muted text-hookr-light">
        <DialogHeader>
          <DialogTitle className="text-hookr-light">Comments</DialogTitle>
        </DialogHeader>
        
        <div className="mt-4 max-h-[60vh] overflow-y-auto">
          <div className="mb-4">
            <div className="flex items-start gap-3">
              <Avatar className="h-10 w-10">
                <img src={creator.profileImage} alt={creator.name} className="object-cover" />
              </Avatar>
              <div>
                <p className="font-medium text-hookr-light">{creator.name}</p>
                <p className="text-sm text-hookr-light">{activePost.content}</p>
                <p className="text-xs text-hookr-light text-opacity-50 mt-1">
                  {new Date(activePost.timestamp).toLocaleDateString()}
                </p>
              </div>
            </div>
            
            <div className="border-t border-b border-hookr-light border-opacity-10 py-4 my-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <button 
                    className={`flex items-center ${likedPosts.includes(activePost.id) ? 'text-red-500' : 'text-hookr-light'}`}
                    onClick={() => handleLikePost(activePost.id)}
                  >
                    <Heart className={`h-5 w-5 ${likedPosts.includes(activePost.id) ? 'fill-current' : ''}`} />
                    <span className="text-sm ml-1">
                      {likedPosts.includes(activePost.id) ? activePost.likes + 1 : activePost.likes}
                    </span>
                  </button>
                  <button
                    className="flex items-center text-hookr-light"
                    onClick={handleTipCreator}
                  >
                    <DollarSign className="h-5 w-5" />
                    <span className="text-sm ml-1">Tip</span>
                  </button>
                </div>
                <button 
                  className={`text-hookr-light ${savedPosts.includes(activePost.id) ? 'text-hookr-accent' : ''}`}
                  onClick={() => handleSavePost(activePost.id)}
                >
                  <Save className={`h-5 w-5 ${savedPosts.includes(activePost.id) ? 'fill-current' : ''}`} />
                </button>
              </div>
            </div>
            
            {/* Sample comments */}
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-hookr-accent rounded-full flex items-center justify-center text-white text-sm font-bold">
                  J
                </div>
                <div>
                  <p className="font-medium text-hookr-light text-sm">JohnDoe</p>
                  <p className="text-sm text-hookr-light">Absolutely stunning! Can't wait to see more content.</p>
                  <p className="text-xs text-hookr-light text-opacity-50 mt-1">2 hours ago</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                  M
                </div>
                <div>
                  <p className="font-medium text-hookr-light text-sm">MikeBrown</p>
                  <p className="text-sm text-hookr-light">Looking forward to our next meeting!</p>
                  <p className="text-xs text-hookr-light text-opacity-50 mt-1">5 hours ago</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                  D
                </div>
                <div>
                  <p className="font-medium text-hookr-light text-sm">DavidSmith</p>
                  <p className="text-sm text-hookr-light">You're the best!</p>
                  <p className="text-xs text-hookr-light text-opacity-50 mt-1">1 day ago</p>
                </div>
              </div>
            </div>
            
            {/* Comment input */}
            <div className="mt-6 flex items-center gap-2">
              <input
                type="text"
                placeholder="Add a comment..."
                className="flex-1 p-2 rounded-full bg-hookr-muted text-hookr-light focus:outline-none focus:ring-1 focus:ring-hookr-accent"
              />
              <Button size="sm" className="bg-hookr-accent text-white rounded-full">Post</Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CommentModal;
