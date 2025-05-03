
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Post } from "@/types/model";
import { useCreatorData, subscriptionTiers, mockReviews } from "@/hooks/useCreatorData";

// Import refactored components
import ProfileHeader from "@/components/creator/ProfileHeader";
import ProfileGallery from "@/components/creator/ProfileGallery";
import ProfileServices from "@/components/creator/ProfileServices";
import ProfileReviews from "@/components/creator/ProfileReviews";
import SubscriptionModal from "@/components/creator/SubscriptionModal";
import CommentModal from "@/components/creator/CommentModal";
import SuccessDialog from "@/components/creator/SuccessDialog";

const CreatorProfilePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // State management
  const [selectedTab, setSelectedTab] = useState("gallery");
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  const [selectedTier, setSelectedTier] = useState("monthly");
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [activePost, setActivePost] = useState<Post | null>(null);
  const [likedPosts, setLikedPosts] = useState<string[]>([]);
  const [savedPosts, setSavedPosts] = useState<string[]>([]);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);

  // Fetch creator data
  const { data: creator, isLoading } = useCreatorData(id);

  // Handlers
  const handleBookNow = () => {
    toast({
      title: "Booking Started",
      description: `You're booking time with ${creator?.name}`
    });
    setShowBookingModal(true);
  };

  const handleUnlockContent = () => {
    if (isSubscribed) {
      toast({
        title: "Premium Content",
        description: "You now have access to all content",
        variant: "default"
      });
    } else {
      setShowSubscriptionModal(true);
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleLikePost = (postId: string) => {
    if (likedPosts.includes(postId)) {
      setLikedPosts(likedPosts.filter(id => id !== postId));
    } else {
      setLikedPosts([...likedPosts, postId]);
      toast({
        title: "Post liked",
        description: "Added to your liked posts",
      });
    }
  };

  const handleSavePost = (postId: string) => {
    if (savedPosts.includes(postId)) {
      setSavedPosts(savedPosts.filter(id => id !== postId));
    } else {
      setSavedPosts([...savedPosts, postId]);
      toast({
        title: "Post saved",
        description: "Added to your saved collection",
      });
    }
  };

  const handleOpenComments = (post: Post) => {
    setActivePost(post);
    setShowCommentModal(true);
  };

  const handleSubscribe = () => {
    setIsProcessingPayment(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessingPayment(false);
      setShowSubscriptionModal(false);
      setIsSubscribed(true);
      setShowSuccessDialog(true);
    }, 2000);
  };

  const handleTipCreator = () => {
    toast({
      title: "Tip Sent",
      description: `You've sent a tip to ${creator?.name}. Thank you!`,
      variant: "default"
    });
  };

  if (isLoading) {
    return <div className="min-h-screen bg-hookr-dark flex justify-center items-center">
        <div className="animate-pulse text-hookr-light">Loading profile...</div>
      </div>;
  }

  if (!creator) {
    return <div className="min-h-screen bg-hookr-dark flex flex-col justify-center items-center p-4">
        <h2 className="text-2xl text-hookr-light mb-4">Profile Not Found</h2>
        <Button onClick={handleGoBack} variant="outline" className="text-gray-950">
          Go Back
        </Button>
      </div>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-hookr-dark pb-20">
      {/* Header with back button */}
      <header className="sticky top-0 z-30 bg-hookr-dark bg-opacity-95 backdrop-blur-sm px-4 py-3">
        <div className="flex justify-between items-center">
          <Button variant="ghost" size="icon" className="text-hookr-light" onClick={handleGoBack}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-bold text-hookr-light">Profile</h1>
          <div className="w-10"></div> {/* Spacer for centering */}
        </div>
      </header>

      {/* Profile Header Component */}
      <ProfileHeader 
        creator={creator} 
        isSubscribed={isSubscribed}
        handleBookNow={handleBookNow}
        handleUnlockContent={handleUnlockContent}
        setShowSubscriptionModal={setShowSubscriptionModal}
      />

      {/* Content tabs */}
      <div className="px-4">
        <Tabs defaultValue="gallery" value={selectedTab} onValueChange={setSelectedTab} className="w-full">
          <TabsList className="grid grid-cols-3 bg-hookr-muted w-full">
            <TabsTrigger value="gallery" className="text-hookr-light">Gallery</TabsTrigger>
            <TabsTrigger value="services" className="text-hookr-light">Services</TabsTrigger>
            <TabsTrigger value="reviews" className="text-hookr-light">Reviews</TabsTrigger>
          </TabsList>

          <TabsContent value="gallery" className="mt-4">
            <ProfileGallery 
              posts={creator.posts || []}
              isSubscribed={isSubscribed}
              likedPosts={likedPosts}
              savedPosts={savedPosts}
              handleLikePost={handleLikePost}
              handleSavePost={handleSavePost}
              handleOpenComments={handleOpenComments}
            />
          </TabsContent>

          <TabsContent value="services" className="mt-4">
            <ProfileServices creator={creator} handleBookNow={handleBookNow} />
          </TabsContent>

          <TabsContent value="reviews" className="mt-4">
            <ProfileReviews reviews={mockReviews} />
          </TabsContent>
        </Tabs>
      </div>

      {/* Modals */}
      <SubscriptionModal 
        open={showSubscriptionModal}
        onOpenChange={setShowSubscriptionModal}
        selectedTier={selectedTier}
        setSelectedTier={setSelectedTier}
        subscriptionTiers={subscriptionTiers}
        creatorName={creator.name}
        isProcessingPayment={isProcessingPayment}
        handleSubscribe={handleSubscribe}
      />

      <CommentModal 
        open={showCommentModal}
        onOpenChange={setShowCommentModal}
        activePost={activePost}
        creator={creator}
        likedPosts={likedPosts}
        savedPosts={savedPosts}
        handleLikePost={handleLikePost}
        handleSavePost={handleSavePost}
        handleTipCreator={handleTipCreator}
      />
      
      <SuccessDialog 
        open={showSuccessDialog}
        onOpenChange={setShowSuccessDialog}
        creatorName={creator.name}
      />
    </div>
  );
};

export default CreatorProfilePage;
