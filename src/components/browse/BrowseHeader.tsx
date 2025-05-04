
import React from "react";
import { Bell, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import FilterDropdown from "@/components/filters/FilterDropdown";
import { useNavigate } from "react-router-dom";

interface BrowseHeaderProps {
  onFilterChange: (filters: Record<string, string>) => void;
  filterOptions: any;
}

const BrowseHeader: React.FC<BrowseHeaderProps> = ({ onFilterChange, filterOptions }) => {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-30 bg-hookr-dark bg-opacity-95 backdrop-blur-sm px-4 py-3">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <img src="/lovable-uploads/b04f73b0-d394-4695-84c1-c0ac8672ca3c.png" alt="Hookr Logo" className="h-8" />
        </div>
        <div className="flex gap-3">
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-hookr-light"
            onClick={() => navigate('/favorites')}
          >
            <Heart className="h-5 w-5 text-hookr-light" />
          </Button>
          <Button 
            variant="ghost"
            size="icon"
            className="relative text-hookr-light"
            onClick={() => navigate('/notifications')}
          >
            <Bell className="h-5 w-5 text-hookr-light" />
          </Button>
          <FilterDropdown filters={filterOptions} onFilterChange={onFilterChange} />
        </div>
      </div>
    </header>
  );
};

export default BrowseHeader;
