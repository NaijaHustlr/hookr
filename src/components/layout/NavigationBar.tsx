
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Search, Heart, User } from "lucide-react";
import { cn } from "@/lib/utils";

const NavigationBar: React.FC = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  
  const navItems = [
    {
      label: "Browse",
      icon: Home,
      path: "/",
    },
    {
      label: "Explore",
      icon: Search,
      path: "/explore",
    },
    {
      label: "Favorites",
      icon: Heart,
      path: "/favorites",
    },
    {
      label: "Profile",
      icon: User,
      path: "/profile",
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-hookr-muted border-t border-hookr-light border-opacity-10 shadow-lg z-50">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={cn(
              "flex flex-col items-center justify-center px-4 py-2 w-full",
              currentPath === item.path
                ? "text-hookr-accent"
                : "text-hookr-light text-opacity-70 hover:text-hookr-accent"
            )}
          >
            <item.icon className="w-6 h-6 mb-1" />
            <span className="text-xs font-medium">{item.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default NavigationBar;
