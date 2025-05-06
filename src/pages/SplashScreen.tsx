
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
        <h1 className="text-4xl font-serif-custom font-bold mb-6">Hookr</h1>
        
        {/* Tagline */}
        <div className="text-center mb-8">
          <p className="text-lg font-medium">OnlyFans meets Uber for Hookup</p>
          <p className="text-sm mt-2 opacity-80">Find, connect, and book models in your area</p>
        </div>
        
        {/* Features */}
        <div className="flex flex-col gap-3 mb-10 w-full max-w-xs">
          <div className="flex items-center">
            <div className="w-2 h-2 bg-black rounded-full mr-2"></div>
            <p>Browse verified models near you</p>
          </div>
          <div className="flex items-center">
            <div className="w-2 h-2 bg-black rounded-full mr-2"></div>
            <p>See availability and book instantly</p>
          </div>
          <div className="flex items-center">
            <div className="w-2 h-2 bg-black rounded-full mr-2"></div>
            <p>Subscribe for premium content</p>
          </div>
        </div>
      </div>
      
      {/* CTA Buttons */}
      <div className="w-full mb-8 flex flex-col gap-4">
        <Button 
          onClick={handleGetStarted}
          className="w-full bg-black hover:bg-black/80 text-white font-medium rounded-full"
        >
          Get Started
        </Button>
        
        <Button 
          variant="outline"
          onClick={() => navigate("/browse")} 
          className="w-full border-black text-black hover:bg-black/10 rounded-full"
        >
          Explore Models
        </Button>
      </div>
    </div>
  );
};

export default SplashScreen;
