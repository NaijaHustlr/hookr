
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Search, MessageSquare, User, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useAuth } from "@/context/AuthContext";

const NavigationBar: React.FC = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const [showCreatorDialog, setShowCreatorDialog] = React.useState(false);
  
  const { isCreator, profile } = useAuth();
  
  const handleCreateClick = () => {
    if (isCreator) {
      // If user is an approved creator, navigate to content creation
      window.location.href = "/creator-dashboard";
    } else if (profile?.creator_status === 'pending') {
      // If user has a pending application, show pending dialog
      setShowCreatorDialog(true);
    } else {
      // If user is not a creator, redirect to profile page
      window.location.href = "/profile";
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
      className: cn(
        "bg-hookr-accent text-white rounded-full",
        !isCreator && profile?.creator_status !== 'pending' && "opacity-50"
      ),
      // Show for creators, pending creators, or if on profile page
      hide: !isCreator && profile?.creator_status !== 'pending' && location.pathname !== "/profile", 
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
              key={item.label}
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
      
      {/* Creator Status Dialog */}
      <Dialog open={showCreatorDialog} onOpenChange={setShowCreatorDialog}>
        <DialogContent className="bg-hookr-dark border-hookr-light border-opacity-20 text-hookr-light">
          <DialogHeader>
            <DialogTitle className="text-hookr-light">Application Pending</DialogTitle>
            <DialogDescription className="text-hookr-light text-opacity-70">
              Your creator application is currently under review.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="bg-hookr-muted p-3 rounded-lg">
              <h3 className="font-medium mb-2">What's Next?</h3>
              <ul className="list-disc pl-5 text-sm space-y-2 text-hookr-light text-opacity-80">
                <li>Our team is reviewing your application</li>
                <li>You'll receive a notification when approved</li>
                <li>Most applications are processed within 48 hours</li>
                <li>Feel free to contact support with any questions</li>
              </ul>
            </div>
            
            <div className="flex justify-end gap-3 mt-4">
              <Link to="/profile" className="px-4 py-2 bg-hookr-accent text-white rounded-md">
                View Status
              </Link>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default NavigationBar;
