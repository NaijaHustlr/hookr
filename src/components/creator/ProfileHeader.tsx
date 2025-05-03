
import React, { useState } from "react";
import { Shield, Star, DollarSign } from "lucide-react";
import ModelAvailability from "@/components/model/ModelAvailability";
import ModelTags from "@/components/model/ModelTags";
import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";
import { ModelType } from "@/types/model";
import { Badge } from "@/components/ui/badge";

interface ProfileHeaderProps {
  creator: ModelType;
  isSubscribed: boolean;
  handleBookNow: () => void;
  handleUnlockContent?: () => void;
  setShowSubscriptionModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ 
  creator, 
  isSubscribed,
  handleBookNow,
  handleUnlockContent,
  setShowSubscriptionModal
}) => {
  const [showMore, setShowMore] = useState(false);
  
  const bioText = "Hi there! I'm a passionate and professional model offering premium companionship services. I love creating memorable experiences and connecting with amazing people. Let's make some magic happen!";
  
  const displayBio = showMore ? bioText : bioText.substring(0, 100) + (bioText.length > 100 ? "..." : "");
  
  return (
    <div className="relative">
      {/* Cover Photo */}
      <div className="h-40 bg-gradient-to-r from-hookr-accent/30 to-hookr-accent/10 overflow-hidden">
        {creator.fallbackImage && (
          <img 
            src={creator.fallbackImage} 
            alt={`${creator.name}'s cover`}
            className="w-full h-full object-cover opacity-60"
          />
        )}
      </div>
      
      {/* Profile Info */}
      <div className="px-4 pt-0 pb-4 relative">
        {/* Profile Image */}
        <div className="relative -mt-16 mb-4 flex justify-between items-end">
          <div className="z-10">
            <div className="w-28 h-28 rounded-full border-4 border-hookr-dark overflow-hidden">
              <img 
                src={creator.profileImage} 
                alt={creator.name} 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button onClick={handleBookNow} className="book-now-btn">
              Book Now
            </Button>
            
            <Button 
              variant="outline" 
              className="text-hookr-light bg-hookr-muted border-hookr-light/20"
              onClick={() => setShowSubscriptionModal(true)}
            >
              <Lock className="mr-1 h-4 w-4" /> 
              Subscribe
            </Button>
          </div>
        </div>
        
        {/* Name & Basic Info */}
        <div className="mb-3">
          <div className="flex items-center">
            <h2 className="text-xl font-bold text-hookr-light mr-2">{creator.name}</h2>
            {creator.verified && (
              <Shield className="h-4 w-4 text-hookr-accent" fill="currentColor" />
            )}
            {creator.featured && (
              <Badge variant="outline" className="ml-2 text-xs border-hookr-accent text-hookr-accent">
                Featured
              </Badge>
            )}
          </div>
          
          <div className="flex items-center mt-1 text-sm text-hookr-light/70">
            <span>{creator.age} years</span>
            <span className="mx-2">•</span>
            <span>{creator.distance}</span>
          </div>
          
          <div className="mt-1 flex items-center">
            <div className="flex items-center">
              <Star className="h-4 w-4 text-yellow-500 fill-current" />
              <span className="ml-1 text-sm">{creator.rating}</span>
            </div>
            <span className="mx-2 text-xs text-hookr-light/50">|</span>
            <span className="text-xs text-hookr-light/70">{creator.reviewCount} reviews</span>
          </div>
        </div>
        
        {/* Bio */}
        <div className="mb-4">
          <p className="text-sm text-hookr-light/90">
            {displayBio}
            {bioText.length > 100 && (
              <button 
                className="ml-1 text-hookr-accent font-medium"
                onClick={() => setShowMore(!showMore)}
              >
                {showMore ? "Show less" : "Show more"}
              </button>
            )}
          </p>
        </div>
        
        {/* Tags */}
        <div className="mb-4">
          <ModelTags tags={creator.tags} />
        </div>
        
        {/* Price */}
        <div className="bg-hookr-muted/70 rounded-lg p-3 flex justify-between items-center">
          <div>
            <p className="text-sm text-hookr-light/70">Starting from</p>
            <div className="flex items-center">
              <DollarSign className="h-4 w-4 text-hookr-light" />
              <span className="text-xl font-bold text-hookr-light">{creator.price}</span>
              <span className="text-sm text-hookr-light/70 ml-1">/ hr</span>
            </div>
          </div>
          
          <ModelAvailability availability={creator.availability} />
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
