
import React from "react";
import { ModelType } from "@/types/model";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Star } from "lucide-react";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";
import { useFeaturedModels, useNewModels, useTopRatedModels, useVerifiedModels, useNearbyModels } from "@/hooks/useModels";
import ModelCardSmall from "@/components/model/ModelCardSmall";
import ModelCardRound from "@/components/model/ModelCardRound";

interface CategoryRowProps {
  title: string;
  models: ModelType[];
}

const CategoryRow: React.FC<CategoryRowProps> = ({ title, models }) => {
  return (
    <div className="mt-6">
      <h2 className="text-lg font-semibold text-hookr-light mb-3 px-4">{title}</h2>
      <ScrollArea className="w-full whitespace-nowrap pb-4">
        <div className="flex gap-4 px-4">
          {models.map((model) => (
            <ModelCardSmall key={model.id} model={model} />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

const ExplorePage: React.FC = () => {
  // Use our real data hooks
  const { data: featuredModels = [], isLoading: isLoadingFeatured } = useFeaturedModels(8);
  const { data: newModels = [], isLoading: isLoadingNew } = useNewModels(8);
  const { data: topRatedModels = [], isLoading: isLoadingTopRated } = useTopRatedModels(8);
  const { data: suggestedModels = [], isLoading: isLoadingSuggested } = useTopRatedModels(10);
  const { data: verifiedModels = [], isLoading: isLoadingVerified } = useVerifiedModels(12);
  const { data: nearbyModels = [], isLoading: isLoadingNearby } = useNearbyModels(12);
  
  // Combined loading state
  const isLoading = isLoadingFeatured || isLoadingNew || isLoadingTopRated || isLoadingSuggested;

  return (
    <div className="flex flex-col min-h-screen pb-16">
      <header className="sticky top-0 z-30 bg-hookr-dark bg-opacity-95 backdrop-blur-sm px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <img src="/lovable-uploads/b04f73b0-d394-4695-84c1-c0ac8672ca3c.png" alt="Hookr Logo" className="h-8" />
          </div>
        </div>
      </header>
      
      <Tabs defaultValue="all" className="w-full mt-2">
        <div className="px-4">
          <TabsList className="grid grid-cols-5 bg-hookr-muted w-full">
            <TabsTrigger value="all" className="text-hookr-light">All</TabsTrigger>
            <TabsTrigger value="discover" className="text-hookr-light">Discover</TabsTrigger>
            <TabsTrigger value="verified" className="text-hookr-light">Verified</TabsTrigger>
            <TabsTrigger value="nearby" className="text-hookr-light">Nearby</TabsTrigger>
            <TabsTrigger value="new" className="text-hookr-light">New</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="all" className="mt-3">
          {isLoading ? (
            <div className="flex items-center justify-center h-60">
              <div className="animate-pulse-slow text-hookr-accent">Loading...</div>
            </div>
          ) : (
            <div className="pb-4">
              <CategoryRow title="Featured Models" models={featuredModels} />
              <CategoryRow title="New In Town" models={newModels} />
              <CategoryRow title="Top Rated" models={topRatedModels} />
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="discover" className="mt-3 px-4">
          {isLoading ? (
            <div className="flex items-center justify-center h-60">
              <div className="animate-pulse-slow text-hookr-accent">Loading...</div>
            </div>
          ) : (
            <div className="pb-4">
              <h2 className="text-lg font-semibold text-hookr-light mb-3">Suggested For You</h2>
              <div className="mb-8">
                <Carousel className="w-full">
                  <CarouselContent>
                    {suggestedModels.map((model) => (
                      <CarouselItem key={model.id} className="basis-1/3 md:basis-1/4 lg:basis-1/5 pl-2">
                        <ModelCardRound model={model} />
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <div className="flex justify-end gap-2 mt-2">
                    <CarouselPrevious className="static transform-none h-6 w-6 bg-hookr-muted text-hookr-light border-hookr-light border-opacity-20" />
                    <CarouselNext className="static transform-none h-6 w-6 bg-hookr-muted text-hookr-light border-hookr-light border-opacity-20" />
                  </div>
                </Carousel>
              </div>
              
              <CategoryRow title="Featured Models" models={featuredModels} />
              <CategoryRow title="New In Town" models={newModels} />
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="verified">
          {isLoadingVerified ? (
            <div className="flex items-center justify-center h-60">
              <div className="animate-pulse-slow text-hookr-accent">Loading...</div>
            </div>
          ) : verifiedModels.length > 0 ? (
            <div className="p-4 grid grid-cols-2 gap-4">
              {verifiedModels.map(model => (
                <ModelCardSmall key={model.id} model={model} />
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center h-60 text-hookr-light opacity-70">
              No verified models found
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="nearby">
          {isLoadingNearby ? (
            <div className="flex items-center justify-center h-60">
              <div className="animate-pulse-slow text-hookr-accent">Loading...</div>
            </div>
          ) : nearbyModels.length > 0 ? (
            <div className="p-4 grid grid-cols-2 gap-4">
              {nearbyModels.map(model => (
                <ModelCardSmall key={model.id} model={model} />
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center h-60 text-hookr-light opacity-70">
              No nearby models found
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="new">
          {isLoadingNew ? (
            <div className="flex items-center justify-center h-60">
              <div className="animate-pulse-slow text-hookr-accent">Loading...</div>
            </div>
          ) : newModels.length > 0 ? (
            <div className="p-4 grid grid-cols-2 gap-4">
              {newModels.map(model => (
                <ModelCardSmall key={model.id} model={model} />
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center h-60 text-hookr-light opacity-70">
              No new models found
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ExplorePage;
