
import React, { useState } from "react";
import { CheckCircle, MapPin, Clock } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { filterOptions } from "@/services/mockData";
import { ModelType } from "@/types/model";

// Import our components and new hooks
import BrowseHeader from "@/components/browse/BrowseHeader";
import AllModelsTab from "@/components/browse/tabs/AllModelsTab";
import DiscoverTab from "@/components/browse/tabs/DiscoverTab";
import ModelListTab from "@/components/browse/tabs/ModelListTab";
import { useModels, useFeaturedModels, useNewModels, useTopRatedModels, useVerifiedModels, useNearbyModels } from "@/hooks/useModels";

const BrowsePage: React.FC = () => {
  const [appliedFilters, setAppliedFilters] = useState<Record<string, string>>({});
  
  // Use our new hooks to fetch real data
  const { data: allModels = [], isLoading: isLoadingAll } = useModels();
  const { data: verifiedModels = [], isLoading: isLoadingVerified } = useVerifiedModels();
  const { data: nearbyModels = [], isLoading: isLoadingNearby } = useNearbyModels();
  const { data: newModels = [], isLoading: isLoadingNew } = useNewModels();
  const { data: featuredModels = [], isLoading: isLoadingFeatured } = useFeaturedModels();
  const { data: topRatedModels = [], isLoading: isLoadingTopRated } = useTopRatedModels();
  const { data: suggestedModels = [], isLoading: isLoadingSuggested } = useTopRatedModels(10);
  
  // Function to handle filter changes
  const handleFilterChange = (filters: Record<string, string>) => {
    console.log("Applied filters:", filters);
    setAppliedFilters(filters);
    // In a production app, we'd update our queries based on these filters
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
            models={allModels}
            loading={isLoadingAll}
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
            loading={isLoadingSuggested || isLoadingFeatured || isLoadingNew}
          />
        </TabsContent>
        
        <TabsContent value="verified" className="mt-3">
          <ModelListTab 
            models={verifiedModels}
            loading={isLoadingVerified}
            emptyMessage="No verified models found"
          />
        </TabsContent>
        
        <TabsContent value="nearby" className="mt-3">
          <ModelListTab 
            models={nearbyModels}
            loading={isLoadingNearby}
            emptyMessage="No nearby models found"
          />
        </TabsContent>
        
        <TabsContent value="new" className="mt-3">
          <ModelListTab 
            models={newModels}
            loading={isLoadingNew}
            emptyMessage="No new models found"
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BrowsePage;
