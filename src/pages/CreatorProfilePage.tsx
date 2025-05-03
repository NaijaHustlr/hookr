
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Post } from "@/types/model";
import { useCreatorData, subscriptionTiers, mockReviews } from "@/hooks/useCreatorData";

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
