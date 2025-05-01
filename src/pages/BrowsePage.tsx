
import React, { useState, useEffect } from "react";
import { Bell, SlidersHorizontal } from "lucide-react";
import ModelCard from "@/components/model/ModelCard";
import FilterDropdown from "@/components/filters/FilterDropdown";
import { generateMockModels, filterOptions } from "@/services/mockData";
import { ModelType } from "@/types/model";
import { Button } from "@/components/ui/button";

const BrowsePage: React.FC = () => {
  const [models, setModels] = useState<ModelType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load exactly 10 models to match our 10 images
    setLoading(true);
    setTimeout(() => {
      const generatedModels = generateMockModels(10);
      setModels(generatedModels);
      setLoading(false);
      
      // Log to help debugging
      console.log("Loaded models with images:", generatedModels.map(m => m.profileImage));
    }, 300);
  }, []);

  const handleFilterChange = (filters: Record<string, string>) => {
    console.log("Applied filters:", filters);
    // In a real app, this would filter the models based on the selected filters
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-30 bg-hookr-dark bg-opacity-95 backdrop-blur-sm px-4 py-3">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-hookr-light">Hookr</h1>
          <div className="flex gap-3">
            <Button variant="outline" size="icon" className="rounded-full bg-transparent border-hookr-light border-opacity-20">
              <Bell className="h-5 w-5 text-hookr-light" />
            </Button>
            <FilterDropdown filters={filterOptions} onFilterChange={handleFilterChange} />
          </div>
        </div>
      </header>

      {loading ? (
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-pulse text-hookr-accent">Loading models...</div>
        </div>
      ) : models.length === 0 ? (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-hookr-light">No models found</div>
        </div>
      ) : (
        <div className="snap-y snap-mandatory overflow-y-auto h-[calc(100vh-4rem)] scroll-pt-4">
          {models.map((model) => (
            <div key={model.id} className="snap-start min-h-[calc(100vh-5rem)] p-4">
              <ModelCard model={model} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BrowsePage;
