
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, MessageSquare, Save, Lock, Play } from "lucide-react";
import { Post } from "@/types/model";
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

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
  const [showLongFormContent, setShowLongFormContent] = useState(false);
  const [showSubscriptionDialog, setShowSubscriptionDialog] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  // Sample long-form video post
  const longFormPost = {
    id: 'long-form-1',
    title: 'My Trip to Bali',
    duration: '12:45',
    thumbnailUrl: '/lovable-uploads/767cbf5f-b796-41a6-a945-21b054d14d4b.png',
    isPinned: true,
    isPremium: true
  };

  const handleWatchVideo = (post: Post) => {
    setSelectedPost(post);
    if (post.isPremium && !isSubscribed) {
      setShowSubscriptionDialog(true);
    } else {
      setShowLongFormContent(true);
    }
  };

  return (
    <>
      {/* Long-form video section */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-hookr-light font-medium">Featured Content</h3>
          {longFormPost.isPinned && (
            <span className="text-xs text-hookr-accent bg-hookr-accent/10 px-2 py-1 rounded-full">
              Pinned
            </span>
          )}
        </div>
        
        <div className="relative aspect-video rounded-lg overflow-hidden bg-hookr-muted/50">
          <img 
            src={longFormPost.thumbnailUrl} 
            alt={longFormPost.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60">
            <Play className="h-12 w-12 text-white mb-2" />
            <h3 className="text-white font-medium">{longFormPost.title}</h3>
            <p className="text-white/70 text-sm">{longFormPost.duration}</p>
            
            <Button 
              className="mt-3 bg-hookr-accent text-white hover:bg-hookr-accent/90 rounded-full"
              onClick={() => handleWatchVideo({
                id: longFormPost.id,
                modelId: '',
                content: longFormPost.title,
                mediaUrl: '',
                mediaType: 'video',
                likes: 0,
                comments: 0,
                timestamp: new Date(),
                isPremium: longFormPost.isPremium
              })}
            >
              {longFormPost.isPremium ? (
                <>
                  <Lock className="h-4 w-4 mr-1" />
                  {isSubscribed ? "Watch Now" : "Unlock Video"}
                </>
              ) : (
                "Watch Now"
              )}
            </Button>
          </div>
        </div>
      </div>
      
      {/* Regular gallery grid */}
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
              {post.mediaType === 'video' && (
                <button 
                  className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/40 transition-colors"
                  onClick={() => handleWatchVideo(post)}
                >
                  <Play className="h-10 w-10 text-white" />
                </button>
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
      
      {/* Subscription Dialog */}
      <Dialog open={showSubscriptionDialog} onOpenChange={setShowSubscriptionDialog}>
        <DialogContent className="bg-hookr-dark border-hookr-muted text-hookr-light">
          <DialogTitle className="text-hookr-light">Premium Content</DialogTitle>
          <DialogDescription className="text-hookr-light/70">
            This content is available only to subscribers.
          </DialogDescription>
          
          <div className="mt-4 flex flex-col items-center">
            <div className="bg-hookr-muted rounded-lg p-4 w-full mb-4">
              <h3 className="font-medium mb-2 text-center">Subscription Benefits</h3>
              <ul className="space-y-2">
                <li className="flex items-center text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-hookr-accent mr-2"></div>
                  Access to all premium photos and videos
                </li>
                <li className="flex items-center text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-hookr-accent mr-2"></div>
                  Exclusive long-form content
                </li>
                <li className="flex items-center text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-hookr-accent mr-2"></div>
                  Priority messaging and booking
                </li>
                <li className="flex items-center text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-hookr-accent mr-2"></div>
                  Behind the scenes content
                </li>
              </ul>
            </div>
          </div>
          
          <DialogFooter>
            <Button 
              variant="outline" 
              className="border-hookr-light text-hookr-light" 
              onClick={() => setShowSubscriptionDialog(false)}
            >
              Cancel
            </Button>
            <Button 
              className="bg-hookr-accent text-white rounded-full"
              onClick={() => setShowSubscriptionDialog(false)}
            >
              Subscribe Now
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Long-form Content Dialog */}
      <Dialog open={showLongFormContent && !showSubscriptionDialog} onOpenChange={setShowLongFormContent}>
        <DialogContent className="max-w-3xl bg-black border-none p-0 overflow-hidden">
          <div className="aspect-video">
            <video 
              src="/lovable-uploads/video-placeholder.mp4" 
              controls 
              autoPlay 
              className="w-full h-full object-contain bg-black"
              poster={selectedPost?.mediaUrl}
            />
          </div>
          <div className="bg-hookr-dark p-4">
            <h2 className="text-hookr-light text-lg font-medium">{selectedPost?.content}</h2>
            <div className="flex justify-between items-center mt-3">
              <div className="flex items-center gap-3">
                <button className="flex items-center gap-1 text-hookr-light">
                  <Heart className="h-5 w-5" />
                  <span className="text-sm">{selectedPost?.likes}</span>
                </button>
                <button className="flex items-center gap-1 text-hookr-light">
                  <MessageSquare className="h-5 w-5" />
                  <span className="text-sm">{selectedPost?.comments}</span>
                </button>
              </div>
              <Button className="bg-hookr-accent text-white rounded-full">
                Support Creator
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProfileGallery;
