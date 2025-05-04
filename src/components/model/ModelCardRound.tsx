
import React from "react";
import { Star } from "lucide-react";
import { ModelType } from "@/types/model";

interface ModelCardRoundProps {
  model: ModelType;
}

const ModelCardRound: React.FC<ModelCardRoundProps> = ({ model }) => {
  return (
    <div className="flex flex-col items-center w-28">
      <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-hookr-accent mb-2">
        <img 
          src={model.profileImage} 
          alt={model.name} 
          className="w-full h-full object-cover" 
        />
        {model.verified && (
          <div className="absolute bottom-0 right-0 bg-hookr-accent rounded-full p-1">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-2 w-2 text-white" 
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
      <h4 className="text-xs font-medium text-hookr-light text-center">{model.name}</h4>
      <div className="flex items-center mt-1">
        <Star className="w-2 h-2 text-hookr-accent fill-hookr-accent" />
        <span className="text-xs ml-1 text-hookr-light opacity-80">{model.rating.toFixed(1)}</span>
      </div>
      <span className="text-xs text-hookr-light opacity-70">{model.distance}</span>
    </div>
  );
};

export default ModelCardRound;
