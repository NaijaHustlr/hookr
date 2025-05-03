
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ModelType, Post } from "@/types/model";
import ProfileGallery from "@/components/creator/ProfileGallery";
import ProfileServices from "@/components/creator/ProfileServices";
import ProfileReviews from "@/components/creator/ProfileReviews";

interface ProfileTabsProps {
  creator: ModelType;
  selectedTab: string;
  setSelectedTab: React.Dispatch<React.SetStateAction<string>>;
  isSubscribed: boolean;
  likedPosts: string[];
  savedPosts: string[];
  handleLikePost: (postId: string) => void;
  handleSavePost: (postId: string) => void;
  handleOpenComments: (post: Post) => void;
  handleBookNow: () => void;
  reviews: any[];
}

const ProfileTabs: React.FC<ProfileTabsProps> = ({
  creator,
  selectedTab,
  setSelectedTab,
  isSubscribed,
  likedPosts,
  savedPosts,
  handleLikePost,
  handleSavePost,
  handleOpenComments,
  handleBookNow,
  reviews
}) => {
  return (
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
          <ProfileReviews reviews={reviews} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProfileTabs;
