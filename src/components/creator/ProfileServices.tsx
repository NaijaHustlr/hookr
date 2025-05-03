
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ModelType } from "@/types/model";

interface ProfileServicesProps {
  creator: ModelType;
  handleBookNow: () => void;
}

const ProfileServices: React.FC<ProfileServicesProps> = ({
  creator,
  handleBookNow
}) => {
  return (
    <Card className="bg-hookr-muted border-hookr-muted">
      <CardContent className="p-4">
        <ul className="space-y-4">
          <li className="flex justify-between items-center text-hookr-light p-2 hover:bg-hookr-dark hover:bg-opacity-20 rounded-lg transition-colors">
            <div>
              <h4 className="font-medium">1 Hour</h4>
              <p className="text-xs text-hookr-light text-opacity-70">Standard session</p>
            </div>
            <span className="font-bold">${creator.price}</span>
          </li>
          <li className="flex justify-between items-center text-hookr-light p-2 hover:bg-hookr-dark hover:bg-opacity-20 rounded-lg transition-colors">
            <div>
              <h4 className="font-medium">2 Hours</h4>
              <p className="text-xs text-hookr-light text-opacity-70">Extended session with drinks</p>
            </div>
            <span className="font-bold">
              ${Math.round(creator.price * 1.8)}
            </span>
          </li>
          <li className="flex justify-between items-center text-hookr-light p-2 hover:bg-hookr-dark hover:bg-opacity-20 rounded-lg transition-colors">
            <div>
              <h4 className="font-medium">Dinner Date (4 hours)</h4>
              <p className="text-xs text-hookr-light text-opacity-70">Fine dining and quality time</p>
            </div>
            <span className="font-bold">
              ${Math.round(creator.price * 3.5)}
            </span>
          </li>
          <li className="flex justify-between items-center text-hookr-light p-2 hover:bg-hookr-dark hover:bg-opacity-20 rounded-lg transition-colors">
            <div>
              <h4 className="font-medium">Overnight (10 hours)</h4>
              <p className="text-xs text-hookr-light text-opacity-70">Full evening and morning</p>
            </div>
            <span className="font-bold">
              ${Math.round(creator.price * 8)}
            </span>
          </li>
          <li className="flex justify-between items-center text-hookr-light p-2 hover:bg-hookr-dark hover:bg-opacity-20 rounded-lg transition-colors">
            <div>
              <h4 className="font-medium">Weekend Getaway</h4>
              <p className="text-xs text-hookr-light text-opacity-70">48 hours exclusive companionship</p>
            </div>
            <span className="font-bold">
              ${Math.round(creator.price * 15)}
            </span>
          </li>
        </ul>
        
        <div className="mt-6 bg-hookr-dark bg-opacity-30 p-3 rounded-lg">
          <h4 className="font-medium text-hookr-light mb-2">Special Requests</h4>
          <p className="text-sm text-hookr-light text-opacity-70">
            Custom arrangements available upon discussion. Contact directly for special requests.
          </p>
          <Button 
            className="mt-3 bg-hookr-accent text-hookr-light w-full"
            onClick={handleBookNow}
          >
            Inquire Now
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileServices;
