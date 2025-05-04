
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Post } from "@/types/model";
import { useCreatorData, subscriptionTiers, mockReviews } from "@/hooks/useCreatorData";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

// Import refactored components
import ProfileHeader from "@/components/creator/ProfileHeader";
import ProfileNavHeader from "@/components/creator/ProfileNavHeader";
import ProfileTabs from "@/components/creator/ProfileTabs";
import ProfileModals from "@/components/creator/ProfileModals";

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
  const [loadAttempts, setLoadAttempts] = useState(0);

  // Fetch creator data with retry mechanism
  const { data: creator, isLoading, refetch } = useCreatorData(id);

  // Retry loading if profile not found
  useEffect(() => {
    if (!isLoading && !creator && loadAttempts < 3) {
      const timer = setTimeout(() => {
        console.log("Retrying profile data fetch, attempt:", loadAttempts + 1);
        refetch();
        setLoadAttempts(prev => prev + 1);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [isLoading, creator, loadAttempts, refetch]);

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
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-8 w-8 text-hookr-accent animate-spin" />
          <div className="text-hookr-light">Loading profile...</div>
        </div>
      </div>;
  }

  // After multiple attempts, if creator is still not found
  if (!creator && loadAttempts >= 3) {
    return <div className="min-h-screen bg-hookr-dark flex flex-col justify-center items-center p-4">
        <h2 className="text-2xl text-hookr-light mb-4">Profile Not Found</h2>
        <p className="text-hookr-light/70 text-center mb-6">
          This profile may have been removed or is currently unavailable.
        </p>
        <Button onClick={handleGoBack} variant="outline" className="text-gray-950">
          Go Back
        </Button>
      </div>;
  }

  // Default fallback case
  if (!creator) {
    return <div className="min-h-screen bg-hookr-dark flex justify-center items-center">
        <div className="flex flex-col items-center gap-3">
          <p className="text-hookr-light/70">Loading profile data...</p>
          <Button onClick={() => refetch()} className="bg-hookr-accent text-white mt-2">
            Retry
          </Button>
        </div>
      </div>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-hookr-dark pb-20">
      {/* Header with back button */}
      <ProfileNavHeader handleGoBack={handleGoBack} />

      {/* Profile Header Component */}
      <ProfileHeader 
        creator={creator} 
        isSubscribed={isSubscribed}
        handleBookNow={handleBookNow}
        handleUnlockContent={handleUnlockContent}
        setShowSubscriptionModal={setShowSubscriptionModal}
      />

      {/* Content tabs */}
      <ProfileTabs
        creator={creator}
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
        isSubscribed={isSubscribed}
        likedPosts={likedPosts}
        savedPosts={savedPosts}
        handleLikePost={handleLikePost}
        handleSavePost={handleSavePost}
        handleOpenComments={handleOpenComments}
        handleBookNow={handleBookNow}
        reviews={mockReviews}
      />

      {/* Modals */}
      <ProfileModals
        showSubscriptionModal={showSubscriptionModal}
        setShowSubscriptionModal={setShowSubscriptionModal}
        selectedTier={selectedTier}
        setSelectedTier={setSelectedTier}
        subscriptionTiers={subscriptionTiers}
        creatorName={creator.name}
        isProcessingPayment={isProcessingPayment}
        handleSubscribe={handleSubscribe}
        showCommentModal={showCommentModal}
        setShowCommentModal={setShowCommentModal}
        activePost={activePost}
        creator={creator}
        likedPosts={likedPosts}
        savedPosts={savedPosts}
        handleLikePost={handleLikePost}
        handleSavePost={handleSavePost}
        handleTipCreator={handleTipCreator}
        showSuccessDialog={showSuccessDialog}
        setShowSuccessDialog={setShowSuccessDialog}
      />
    </div>
  );
};

export default CreatorProfilePage;
