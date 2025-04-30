
import React, { useState, useEffect } from "react";
import { getFeaturedModels, getNewModels, getTopRatedModels } from "@/services/mockData";
import { ModelType } from "@/types/model";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Star } from "lucide-react";

interface ModelCardSmallProps {
  model: ModelType;
}

const ModelCardSmall: React.FC<ModelCardSmallProps> = ({ model }) => {
  return (
    <div className="relative flex-shrink-0 w-40 bg-hookr-muted rounded-lg overflow-hidden shadow-md">
      <div className="relative h-52">
        <img 
          src={model.profileImage} 
          alt={model.name} 
          className="w-full h-full object-cover object-center"
        />
        {model.verified && (
          <div className="absolute top-2 left-2 bg-hookr-accent rounded-full p-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        )}
      </div>
      <div className="p-3">
        <h3 className="font-semibold text-hookr-light">{model.name}</h3>
        <div className="flex items-center mt-1">
          <Star className="w-3 h-3 text-hookr-accent fill-hookr-accent" />
          <span className="text-xs ml-1 text-hookr-light">{model.rating.toFixed(1)}</span>
          <span className="text-xs ml-2 text-hookr-light opacity-70">${model.price}</span>
        </div>
      </div>
    </div>
  );
};

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
  const [featuredModels, setFeaturedModels] = useState<ModelType[]>([]);
  const [newModels, setNewModels] = useState<ModelType[]>([]);
  const [topRatedModels, setTopRatedModels] = useState<ModelType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API calls
    setLoading(true);
    setTimeout(() => {
      setFeaturedModels(getFeaturedModels(8));
      setNewModels(getNewModels(8));
      setTopRatedModels(getTopRatedModels(8));
      setLoading(false);
    }, 500);
  }, []);

  return (
    <div className="flex flex-col min-h-screen pb-16">
      <header className="sticky top-0 z-30 bg-hookr-dark bg-opacity-95 backdrop-blur-sm px-4 py-3">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-hookr-light">Explore</h1>
        </div>
      </header>
      
      <Tabs defaultValue="all" className="w-full mt-2">
        <div className="px-4">
          <TabsList className="grid grid-cols-4 bg-hookr-muted w-full">
            <TabsTrigger value="all" className="text-hookr-light">All</TabsTrigger>
            <TabsTrigger value="verified" className="text-hookr-light">Verified</TabsTrigger>
            <TabsTrigger value="nearby" className="text-hookr-light">Nearby</TabsTrigger>
            <TabsTrigger value="new" className="text-hookr-light">New</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="all" className="mt-3">
          {loading ? (
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
        
        <TabsContent value="verified">
          <div className="flex items-center justify-center h-60 text-hookr-light opacity-70">
            Coming soon
          </div>
        </TabsContent>
        
        <TabsContent value="nearby">
          <div className="flex items-center justify-center h-60 text-hookr-light opacity-70">
            Coming soon
          </div>
        </TabsContent>
        
        <TabsContent value="new">
          <div className="flex items-center justify-center h-60 text-hookr-light opacity-70">
            Coming soon
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ExplorePage;
