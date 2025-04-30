
import React from "react";
import { cn } from "@/lib/utils";

interface AvailabilitySlot {
  day: string;
  available: boolean;
}

interface ModelAvailabilityProps {
  availability: AvailabilitySlot[];
}

const ModelAvailability: React.FC<ModelAvailabilityProps> = ({ availability }) => {
  return (
    <div className="flex gap-1.5 items-center">
      {availability.map((slot, index) => (
        <div 
          key={index}
          className="flex flex-col items-center"
        >
          <span className="text-xs text-white opacity-70">{slot.day}</span>
          <div 
            className={cn(
              "w-6 h-1.5 rounded-full mt-1",
              slot.available ? "bg-hookr-accent" : "bg-gray-500 opacity-40"
            )}
          ></div>
        </div>
      ))}
    </div>
  );
};

export default ModelAvailability;
