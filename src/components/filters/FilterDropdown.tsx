
import React, { useState } from "react";
import { Filter, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

interface FilterOption {
  label: string;
  value: string;
}

interface FilterDropdownProps {
  filters: {
    [key: string]: FilterOption[];
  };
  onFilterChange: (filters: Record<string, string>) => void;
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({ filters, onFilterChange }) => {
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string>>({});
  
  const handleFilterSelect = (category: string, value: string) => {
    const newFilters = { ...selectedFilters, [category]: value };
    setSelectedFilters(newFilters);
    onFilterChange(newFilters);
  };
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="bg-hookr-muted border-hookr-light border-opacity-20 text-hookr-light">
          <Filter className="h-4 w-4 mr-2" />
          <span>Filters</span>
          <ChevronDown className="h-4 w-4 ml-2" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-hookr-muted text-hookr-light border-hookr-light border-opacity-20">
        {Object.entries(filters).map(([category, options], index) => (
          <React.Fragment key={category}>
            {index > 0 && <DropdownMenuSeparator className="bg-hookr-light bg-opacity-10" />}
            <DropdownMenuLabel className="text-hookr-light">{category}</DropdownMenuLabel>
            <DropdownMenuGroup>
              {options.map((option) => (
                <DropdownMenuItem 
                  key={option.value}
                  className={`cursor-pointer ${selectedFilters[category] === option.value ? 'text-hookr-accent' : 'text-hookr-light'}`}
                  onClick={() => handleFilterSelect(category, option.value)}
                >
                  {option.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
          </React.Fragment>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default FilterDropdown;
