
import React, { useState } from "react";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import ModelAvailability from "./ModelAvailability";
import ModelTags from "./ModelTags";
import { ModelType } from "@/types/model";

interface ModelCardProps {
  model: ModelType;
}

const ModelCard: React.FC<ModelCardProps> = ({ model }) => {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    console.error(`Failed to load image for model: ${model.name}`);
    setImageError(true);
  };

  return (
    <div className="snap-item relative rounded-2xl overflow-hidden shadow-lg bg-hookr-muted">
      <div className="relative h-full min-h-[80vh] w-full">
        {imageError ? (
          <div className="w-full h-full bg-hookr-muted flex items-center justify-center">
            <p className="text-hookr-light text-lg">Image unavailable</p>
          </div>
        ) : (
          <img 
            src={model.profileImage} 
            alt={`${model.name} - Model`} 
            className="w-full h-full object-cover object-center"
            onError={handleImageError}
            loading="lazy"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none"></div>
        
        <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h2 className="text-2xl font-bold text-white">{model.name}</h2>
              <div className="flex items-center">
                <Star className="w-4 h-4 text-hookr-accent mr-1 fill-hookr-accent" />
                <span className="text-sm font-medium text-white">
                  {model.rating.toFixed(1)} ({model.reviewCount})
                </span>
                <span className="mx-2 text-white">•</span>
                <span className="text-sm text-white">{model.distance} away</span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xl font-bold text-hookr-accent">${model.price}</p>
              <p className="text-xs text-white opacity-80">per hour</p>
            </div>
          </div>
          
          <ModelTags tags={model.tags} />
          
          <div className="mt-3">
            <ModelAvailability availability={model.availability} />
          </div>
          
          <div className="mt-4 flex justify-between items-center">
            <Button 
              variant="outline"
              size="sm"
              className="rounded-full border-hookr-light text-hookr-light px-4 hover:bg-hookr-light hover:bg-opacity-10"
            >
              View Profile
            </Button>
            <Button 
              className="bg-hookr-accent text-hookr-light font-semibold px-4 py-2 rounded-full hover:bg-opacity-90 transition-colors duration-200"
            >
              Book Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModelCard;
