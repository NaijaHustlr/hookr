import React, { useState, useEffect, useRef } from "react";
import { Bell, SlidersHorizontal, Star, MapPin, CheckCircle, Clock, Heart } from "lucide-react";
import ModelCard from "@/components/model/ModelCard";
import FilterDropdown from "@/components/filters/FilterDropdown";
import { generateMockModels, filterOptions, getFeaturedModels, getNewModels, getTopRatedModels } from "@/services/mockData";
import { ModelType } from "@/types/model";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useNavigate } from "react-router-dom";

// Small model card component for horizontal scrolling sections
const ModelCardSmall: React.FC<{
  model: ModelType;
}> = ({
  model
}) => {
  return <div className="relative flex-shrink-0 w-40 bg-hookr-muted rounded-lg overflow-hidden shadow-md">
      <div className="relative h-52">
        <img src={model.profileImage} alt={model.name} className="w-full h-full object-cover object-center" />
        {model.verified && <div className="absolute top-2 left-2 bg-hookr-accent rounded-full p-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>}
      </div>
      <div className="p-3">
        <h3 className="font-semibold text-hookr-light">{model.name}</h3>
        <div className="flex items-center mt-1">
          <Star className="w-3 h-3 text-hookr-accent fill-hookr-accent" />
          <span className="text-xs ml-1 text-hookr-light">{model.rating.toFixed(1)}</span>
          <span className="text-xs ml-2 text-hookr-light opacity-70">${model.price}</span>
        </div>
      </div>
    </div>;
};

// Round model card component for the carousel
const ModelCardRound: React.FC<{
  model: ModelType;
}> = ({
  model
}) => {
  return <div className="flex flex-col items-center w-28">
      <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-hookr-accent mb-2">
        <img src={model.profileImage} alt={model.name} className="w-full h-full object-cover" />
        {model.verified && <div className="absolute bottom-0 right-0 bg-hookr-accent rounded-full p-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-2 w-2 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>}
      </div>
      <h4 className="text-xs font-medium text-hookr-light text-center">{model.name}</h4>
      <div className="flex items-center mt-1">
        <Star className="w-2 h-2 text-hookr-accent fill-hookr-accent" />
        <span className="text-xs ml-1 text-hookr-light opacity-80">{model.rating.toFixed(1)}</span>
      </div>
      <span className="text-xs text-hookr-light opacity-70">{model.distance}</span>
    </div>;
};

// Category row component for horizontal scrolling sections
const CategoryRow: React.FC<{
  title: string;
  models: ModelType[];
}> = ({
  title,
  models
}) => {
  return <div className="mt-6">
      <h2 className="text-lg font-semibold text-hookr-light mb-3 px-4">{title}</h2>
      <ScrollArea className="w-full whitespace-nowrap pb-4">
        <div className="flex gap-4 px-4">
          {models.map(model => <ModelCardSmall key={model.id} model={model} />)}
        </div>
      </ScrollArea>
    </div>;
};
const BrowsePage: React.FC = () => {
  const [models, setModels] = useState<ModelType[]>([]);
  const [verifiedModels, setVerifiedModels] = useState<ModelType[]>([]);
  const [nearbyModels, setNearbyModels] = useState<ModelType[]>([]);
  const [newModels, setNewModels] = useState<ModelType[]>([]);
  const [suggestedModels, setSuggestedModels] = useState<ModelType[]>([]);
  const [featuredModels, setFeaturedModels] = useState<ModelType[]>([]);
  const [topRatedModels, setTopRatedModels] = useState<ModelType[]>([]);
  const [loading, setLoading] = useState(true);
  const [reachedBottom, setReachedBottom] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  
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

  // Set up intersection observer to detect when user scrolls to bottom
  useEffect(() => {
    if (!bottomRef.current) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setReachedBottom(true);
      }
    }, {
      threshold: 0.5
    });
    observer.observe(bottomRef.current);
    return () => {
      if (bottomRef.current) {
        observer.unobserve(bottomRef.current);
      }
    };
  }, []);
  const handleFilterChange = (filters: Record<string, string>) => {
    console.log("Applied filters:", filters);
    // In a real app, this would filter the models based on the selected filters
  };
  return <div className="flex flex-col min-h-screen">
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
            <FilterDropdown filters={filterOptions} onFilterChange={handleFilterChange} />
          </div>
        </div>
      </header>

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
          {loading ? <div className="flex-1 flex items-center justify-center">
              <div className="animate-pulse text-hookr-accent">Loading models...</div>
            </div> : <>
              <div className="snap-y snap-mandatory overflow-y-auto h-[calc(100vh-10rem)] scroll-pt-4">
                {models.map(model => <div key={model.id} className="snap-start min-h-[calc(100vh-10rem)] p-4">
                    <ModelCard model={model} />
                  </div>)}
                <div ref={bottomRef} className="h-4"></div>
              </div>

              {/* Featured sections that appear after reaching bottom */}
              {reachedBottom && <div className="pt-8 pb-20">
                  <div className="px-4 mb-6">
                    <h2 className="text-xl font-bold text-hookr-light">Explore More</h2>
                    <p className="text-hookr-light opacity-70 text-sm">Discover top models and new faces</p>
                  </div>
                  
                  <CategoryRow title="Featured Models" models={featuredModels} />
                  <CategoryRow title="New In Town" models={newModels} />
                  <CategoryRow title="Top Rated" models={topRatedModels} />
                </div>}
            </>}
        </TabsContent>

        <TabsContent value="discover" className="mt-3 px-4">
          {loading ? <div className="flex items-center justify-center h-60">
              <div className="animate-pulse-slow text-hookr-accent">Loading...</div>
            </div> : <div className="pb-20">
              <h2 className="text-lg font-semibold text-hookr-light mb-3">Suggested For You</h2>
              <div className="mb-8">
                <Carousel className="w-full">
                  <CarouselContent>
                    {suggestedModels.map(model => <CarouselItem key={model.id} className="basis-1/3 md:basis-1/4 lg:basis-1/5 pl-2">
                        <ModelCardRound model={model} />
                      </CarouselItem>)}
                  </CarouselContent>
                  <div className="flex justify-end gap-2 mt-2">
                    <CarouselPrevious className="static transform-none h-6 w-6 bg-hookr-muted text-hookr-light border-hookr-light border-opacity-20" />
                    <CarouselNext className="static transform-none h-6 w-6 bg-hookr-muted text-hookr-light border-hookr-light border-opacity-20" />
                  </div>
                </Carousel>
              </div>
              
              <CategoryRow title="Featured Models" models={featuredModels} />
              <CategoryRow title="New In Town" models={newModels} />
            </div>}
        </TabsContent>
        
        <TabsContent value="verified" className="mt-3">
          {loading ? <div className="flex items-center justify-center h-60">
              <div className="animate-pulse-slow text-hookr-accent">Loading...</div>
            </div> : verifiedModels.length > 0 ? <div className="snap-y snap-mandatory overflow-y-auto h-[calc(100vh-10rem)] scroll-pt-4 pb-20">
              {verifiedModels.map(model => <div key={model.id} className="snap-start min-h-[calc(100vh-10rem)] p-4">
                  <ModelCard model={model} />
                </div>)}
            </div> : <div className="flex items-center justify-center h-60 text-hookr-light opacity-70">
              No verified models found
            </div>}
        </TabsContent>
        
        <TabsContent value="nearby" className="mt-3">
          {loading ? <div className="flex items-center justify-center h-60">
              <div className="animate-pulse-slow text-hookr-accent">Loading...</div>
            </div> : nearbyModels.length > 0 ? <div className="snap-y snap-mandatory overflow-y-auto h-[calc(100vh-10rem)] scroll-pt-4 pb-20">
              {nearbyModels.map(model => <div key={model.id} className="snap-start min-h-[calc(100vh-10rem)] p-4">
                  <ModelCard model={model} />
                </div>)}
            </div> : <div className="flex items-center justify-center h-60 text-hookr-light opacity-70">
              No nearby models found
            </div>}
        </TabsContent>
        
        <TabsContent value="new" className="mt-3">
          {loading ? <div className="flex items-center justify-center h-60">
              <div className="animate-pulse-slow text-hookr-accent">Loading...</div>
            </div> : newModels.length > 0 ? <div className="snap-y snap-mandatory overflow-y-auto h-[calc(100vh-10rem)] scroll-pt-4 pb-20">
              {newModels.map(model => <div key={model.id} className="snap-start min-h-[calc(100vh-10rem)] p-4">
                  <ModelCard model={model} />
                </div>)}
            </div> : <div className="flex items-center justify-center h-60 text-hookr-light opacity-70">
              No new models found
            </div>}
        </TabsContent>
      </Tabs>
    </div>;
};
export default BrowsePage;
