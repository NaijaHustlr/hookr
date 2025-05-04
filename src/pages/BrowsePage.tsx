
import React, { useState, useEffect } from "react";
import { CheckCircle, MapPin, Clock } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { generateMockModels, filterOptions, getFeaturedModels, getNewModels, getTopRatedModels } from "@/services/mockData";
import { ModelType } from "@/types/model";

// Import our new components
import BrowseHeader from "@/components/browse/BrowseHeader";
import AllModelsTab from "@/components/browse/tabs/AllModelsTab";
import DiscoverTab from "@/components/browse/tabs/DiscoverTab";
import ModelListTab from "@/components/browse/tabs/ModelListTab";

const BrowsePage: React.FC = () => {
  const [models, setModels] = useState<ModelType[]>([]);
  const [verifiedModels, setVerifiedModels] = useState<ModelType[]>([]);
  const [nearbyModels, setNearbyModels] = useState<ModelType[]>([]);
  const [newModels, setNewModels] = useState<ModelType[]>([]);
  const [suggestedModels, setSuggestedModels] = useState<ModelType[]>([]);
  const [featuredModels, setFeaturedModels] = useState<ModelType[]>([]);
  const [topRatedModels, setTopRatedModels] = useState<ModelType[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Load models for all tabs
    setLoading(true);
    setTimeout(() => {
      const allModels = generateMockModels(10);
      setModels(allModels);

      // Filter verified models
      setVerifiedModels(allModels.filter(model => model.verified));

      // Sort by distance for nearby models
      setNearbyModels([...allModels].sort((a, b) => {
        const distA = parseInt(a.distance.split(' ')[0]);
        const distB = parseInt(b.distance.split(' ')[0]);
        return distA - distB;
      }));

      // Featured and top rated models
      setFeaturedModels(getFeaturedModels(8));
      setNewModels(getNewModels(8));
      setTopRatedModels(getTopRatedModels(8));
      setSuggestedModels(getTopRatedModels(10));
      setLoading(false);
    }, 300);
  }, []);

  const handleFilterChange = (filters: Record<string, string>) => {
    console.log("Applied filters:", filters);
    // In a real app, this would filter the models based on the selected filters
  };

  return (
    <div className="flex flex-col min-h-screen">
      <BrowseHeader 
        onFilterChange={handleFilterChange} 
        filterOptions={filterOptions}
      />

      <Tabs defaultValue="all" className="w-full mt-2">
        <div className="px-4">
          <TabsList className="grid grid-cols-5 bg-hookr-muted w-full">
            <TabsTrigger value="all" className="text-hookr-light">All</TabsTrigger>
            <TabsTrigger value="discover" className="text-hookr-light">Discover</TabsTrigger>
            <TabsTrigger value="verified" className="text-hookr-light">
              <CheckCircle className="w-3 h-3 mr-1" />
              Verified
            </TabsTrigger>
            <TabsTrigger value="nearby" className="text-hookr-light">
              <MapPin className="w-3 h-3 mr-1" />
              Nearby
            </TabsTrigger>
            <TabsTrigger value="new" className="text-hookr-light">
              <Clock className="w-3 h-3 mr-1" />
              New
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="all" className="mt-3">
          <AllModelsTab 
            models={models}
            loading={loading}
            featuredModels={featuredModels}
            newModels={newModels}
            topRatedModels={topRatedModels}
          />
        </TabsContent>

        <TabsContent value="discover" className="mt-3 px-4">
          <DiscoverTab 
            suggestedModels={suggestedModels}
            featuredModels={featuredModels}
            newModels={newModels}
            loading={loading}
          />
        </TabsContent>
        
        <TabsContent value="verified" className="mt-3">
          <ModelListTab 
            models={verifiedModels}
            loading={loading}
            emptyMessage="No verified models found"
          />
        </TabsContent>
        
        <TabsContent value="nearby" className="mt-3">
          <ModelListTab 
            models={nearbyModels}
            loading={loading}
            emptyMessage="No nearby models found"
          />
        </TabsContent>
        
        <TabsContent value="new" className="mt-3">
          <ModelListTab 
            models={newModels}
            loading={loading}
            emptyMessage="No new models found"
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BrowsePage;
