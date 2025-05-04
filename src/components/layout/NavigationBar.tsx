
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Search, MessageSquare, User, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const NavigationBar: React.FC = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const [isCreator, setIsCreator] = useState(false);
  const [showCreatorDialog, setShowCreatorDialog] = useState(false);
  
  const handleCreateClick = () => {
    if (isCreator) {
      // If user is already a creator, navigate to content creation
      console.log("Navigate to content creation");
    } else {
      // If user is not a creator, show the dialog
      setShowCreatorDialog(true);
    }
  };
  
  const navItems = [
    {
      label: "Home",
      icon: Home,
      path: "/",
    },
    {
      label: "Search",
      icon: Search,
      path: "/feed",
    },
    {
      label: "Create",
      icon: Plus,
      path: "#", // Placeholder, handled by onClick
      onClick: handleCreateClick,
      className: "bg-hookr-accent text-white rounded-full",
      hide: !isCreator && location.pathname !== "/profile", // Only show if user is creator or on profile page
    },
    {
      label: "Messages",
      icon: MessageSquare,
      path: "/chat",
    },
    {
      label: "Profile",
      icon: User,
      path: "/profile",
    },
  ].filter(item => !item.hide);

  return (
    <>
      <nav className="fixed bottom-0 left-0 right-0 bg-hookr-muted border-t border-hookr-light border-opacity-10 shadow-lg z-50">
        <div className="flex justify-around items-center h-16">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.onClick ? "#" : item.path}
              onClick={item.onClick}
              className={cn(
                "flex flex-col items-center justify-center px-4 py-2 w-full",
                item.className,
                currentPath === item.path
                  ? "text-hookr-accent"
                  : "text-hookr-light text-opacity-70 hover:text-hookr-accent"
              )}
            >
              <item.icon className="w-6 h-6" />
            </Link>
          ))}
        </div>
      </nav>
      
      {/* Become a Creator Dialog */}
      <Dialog open={showCreatorDialog} onOpenChange={setShowCreatorDialog}>
        <DialogContent className="bg-hookr-dark border-hookr-light border-opacity-20 text-hookr-light">
          <DialogHeader>
            <DialogTitle className="text-hookr-light">Become a Hookr Creator</DialogTitle>
            <DialogDescription className="text-hookr-light text-opacity-70">
              Join our exclusive network of premium models.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="bg-hookr-muted p-3 rounded-lg">
              <h3 className="font-medium mb-2">Our Platform Standards</h3>
              <ul className="list-disc pl-5 text-sm space-y-2 text-hookr-light text-opacity-80">
                <li>Professional quality photos and videos</li>
                <li>Verified identity and background checks</li>
                <li>Strict adherence to platform guidelines</li>
                <li>Reliable scheduling and communication</li>
                <li>Consistent client satisfaction</li>
              </ul>
            </div>
            
            <div className="bg-hookr-muted p-3 rounded-lg">
              <h3 className="font-medium mb-2">Benefits</h3>
              <ul className="list-disc pl-5 text-sm space-y-2 text-hookr-light text-opacity-80">
                <li>Premium visibility on the platform</li>
                <li>Higher booking rates and income potential</li>
                <li>Content monetization options</li>
                <li>Priority customer support</li>
                <li>Exclusive creator community access</li>
              </ul>
            </div>
            
            <div className="flex justify-end gap-3 mt-4">
              <Link to="/profile" className="text-hookr-light">
                Apply in Profile
              </Link>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default NavigationBar;
