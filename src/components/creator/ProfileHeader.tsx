
import React from "react";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Shield, Star } from "lucide-react";
import { ModelAvailability } from "@/components/model/ModelAvailability";
import { ModelTags } from "@/components/model/ModelTags";
import { Button } from "@/components/ui/button";
import { Calendar, Lock } from "lucide-react";
import { ModelType } from "@/types/model";

interface ProfileHeaderProps {
  creator: ModelType;
  isSubscribed: boolean;
  handleBookNow: () => void;
  handleUnlockContent: () => void;
  setShowSubscriptionModal: (show: boolean) => void;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  creator,
  isSubscribed,
  handleBookNow,
  handleUnlockContent,
  setShowSubscriptionModal
}) => {
  // Determine subscription button text based on subscription status
  const subscribeButtonText = isSubscribed ? "Subscribed ✓" : "Subscribe";

  return (
    <>
      {/* Hero section with profile image */}
      <div className="relative h-60 md:h-80">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-hookr-dark z-10"></div>
        <img 
          src={creator.profileImage} 
          alt={creator.name} 
          className="w-full h-full object-cover" 
          onError={e => {
            const target = e.target as HTMLImageElement;
            if (creator.fallbackImage) {
              target.src = creator.fallbackImage;
            }
          }} 
        />
      </div>

      {/* Profile info section */}
      <div className="px-4 -mt-16 relative z-20">
        <div className="flex items-end mb-4">
          <Avatar className="h-24 w-24 border-4 border-hookr-dark">
            <img src={creator.profileImage} alt={creator.name} className="object-cover" />
          </Avatar>
          <div className="ml-4 mb-2">
            <div className="flex items-center">
              <h2 className="text-2xl font-bold text-hookr-light">
                {creator.name}
              </h2>
              {creator.verified && <Badge className="ml-2 bg-hookr-accent">
                  <Shield className="h-3 w-3 mr-1" />
                  Verified
                </Badge>}
              {isSubscribed && <Badge className="ml-2 bg-green-500 text-white">
                  Subscribed
                </Badge>}
            </div>
            <p className="text-hookr-light text-opacity-70">
              Age: {creator.age} • {creator.distance} away
            </p>
          </div>
        </div>

        <div className="flex items-center mb-4">
          <div className="flex items-center">
            <Star className="w-4 h-4 text-hookr-accent mr-1 fill-hookr-accent" />
            <span className="text-sm font-medium text-hookr-light">
              {creator.rating.toFixed(1)} ({creator.reviewCount})
            </span>
          </div>
          <div className="ml-auto">
            <p className="text-xl font-bold text-hookr-accent">
              ${creator.price}
              <span className="text-xs text-hookr-light opacity-80 ml-1">
                per hour
              </span>
            </p>
          </div>
        </div>

        <div className="mb-6">
          <ModelTags tags={creator.tags} />
        </div>

        <div className="mb-6">
          <h3 className="text-hookr-light mb-2 font-medium">Availability</h3>
          <ModelAvailability availability={creator.availability} />
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          <Button className="bg-hookr-accent text-hookr-light font-semibold flex-1 rounded-full hover:bg-opacity-90 transition-colors duration-200" onClick={handleBookNow}>
            <Calendar className="w-4 h-4 mr-2" />
            Book Now
          </Button>
          
          <Button 
            variant="outline" 
            className={`border-hookr-accent text-hookr-accent flex-1 rounded-full hover:bg-hookr-accent hover:bg-opacity-10 ${isSubscribed ? 'bg-hookr-accent bg-opacity-10' : ''}`} 
            onClick={handleUnlockContent}
          >
            <Lock className="w-4 h-4 mr-2" />
            Unlock All Content
          </Button>
          
          <Button 
            variant={isSubscribed ? "outline" : "default"}
            className={`flex-1 rounded-full ${isSubscribed 
              ? 'border-green-500 text-green-500 hover:bg-green-500 hover:bg-opacity-10' 
              : 'bg-green-500 text-white hover:bg-green-600'}`} 
            onClick={() => setShowSubscriptionModal(true)}
          >
            <DollarSign className="h-4 w-4 mr-2" />
            {subscribeButtonText}
          </Button>
        </div>
      </div>
    </>
  );
};

export default ProfileHeader;
