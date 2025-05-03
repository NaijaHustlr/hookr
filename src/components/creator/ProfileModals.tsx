
import React from "react";
import { Post } from "@/types/model";
import SubscriptionModal from "@/components/creator/SubscriptionModal";
import CommentModal from "@/components/creator/CommentModal";
import SuccessDialog from "@/components/creator/SuccessDialog";

interface ProfileModalsProps {
  showSubscriptionModal: boolean;
  setShowSubscriptionModal: React.Dispatch<React.SetStateAction<boolean>>;
  selectedTier: string;
  setSelectedTier: React.Dispatch<React.SetStateAction<string>>;
  subscriptionTiers: any[];
  creatorName: string;
  isProcessingPayment: boolean;
  handleSubscribe: () => void;
  showCommentModal: boolean;
  setShowCommentModal: React.Dispatch<React.SetStateAction<boolean>>;
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
  showSuccessDialog: boolean;
  setShowSuccessDialog: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProfileModals: React.FC<ProfileModalsProps> = ({
  showSubscriptionModal,
  setShowSubscriptionModal,
  selectedTier,
  setSelectedTier,
  subscriptionTiers,
  creatorName,
  isProcessingPayment,
  handleSubscribe,
  showCommentModal,
  setShowCommentModal,
  activePost,
  creator,
  likedPosts,
  savedPosts,
  handleLikePost,
  handleSavePost,
  handleTipCreator,
  showSuccessDialog,
  setShowSuccessDialog
}) => {
  return (
    <>
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
    </>
  );
};

export default ProfileModals;
