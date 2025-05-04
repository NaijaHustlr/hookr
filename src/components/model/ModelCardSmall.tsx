
import React from "react";
import { Star } from "lucide-react";
import { ModelType } from "@/types/model";

interface ModelCardSmallProps {
  model: ModelType;
}

const ModelCardSmall: React.FC<ModelCardSmallProps> = ({ model }) => {
  return (
    <div className="relative flex-shrink-0 w-40 bg-hookr-muted rounded-lg overflow-hidden shadow-md">
      <div className="relative h-52">
        <img 
          src={model.profileImage} 
          alt={model.name} 
          className="w-full h-full object-cover object-center" 
        />
        {model.verified && (
          <div className="absolute top-2 left-2 bg-hookr-accent rounded-full p-1">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-3 w-3 text-white" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={3} 
                d="M5 13l4 4L19 7" 
              />
            </svg>
          </div>
        )}
      </div>
      <div className="p-3">
        <h3 className="font-semibold text-hookr-light">{model.name}</h3>
        <div className="flex items-center mt-1">
          <Star className="w-3 h-3 text-hookr-accent fill-hookr-accent" />
          <span className="text-xs ml-1 text-hookr-light">{model.rating.toFixed(1)}</span>
          <span className="text-xs ml-2 text-hookr-light opacity-70">${model.price}</span>
        </div>
      </div>
    </div>
  );
};

export default ModelCardSmall;
