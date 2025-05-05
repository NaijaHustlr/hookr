
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const SplashScreen: React.FC = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/auth");
  };

  return (
    <div className="flex flex-col items-center justify-between h-screen bg-hookr-accent p-8 text-black">
      {/* Logo and branding */}
      <div className="flex-1"></div>
      
      <div className="flex flex-col items-center justify-center flex-1">
        {/* Logo */}
        <div className="mb-6">
          <div className="flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-black rounded-full mr-[-8px]"></div>
            <div className="w-12 h-12 border-4 border-black rounded-full ml-[-8px]"></div>
          </div>
        </div>
        
        {/* App name */}
        <h1 className="text-4xl font-serif-custom font-bold mb-16">Hookr</h1>
        
        {/* Welcome text */}
        <div className="text-center mb-20">
          <p className="text-lg">Welcome to Hookr</p>
          <p className="text-lg">OnlyFans meets Uber for Hookup</p>
        </div>
      </div>
      
      {/* CTA Button */}
      <div className="w-full mb-8">
        <Button 
          onClick={handleGetStarted}
          className="w-full bg-black hover:bg-black/80 text-white font-medium rounded-full"
        >
          wow
        </Button>
      </div>
    </div>
  );
};

export default SplashScreen;
