
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
          <img 
            src="/lovable-uploads/40953b5d-4ef4-4309-9bb4-d8b68d5584c5.png" 
            alt="Hookr Logo" 
            className="w-24 h-auto"
          />
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
