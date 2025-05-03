
import React from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProfileNavHeaderProps {
  handleGoBack: () => void;
}

const ProfileNavHeader: React.FC<ProfileNavHeaderProps> = ({
  handleGoBack
}) => {
  return (
    <header className="sticky top-0 z-30 bg-hookr-dark bg-opacity-95 backdrop-blur-sm px-4 py-3">
      <div className="flex justify-between items-center">
        <Button variant="ghost" size="icon" className="text-hookr-light" onClick={handleGoBack}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-bold text-hookr-light">Profile</h1>
        <div className="w-10"></div> {/* Spacer for centering */}
      </div>
    </header>
  );
};

export default ProfileNavHeader;
