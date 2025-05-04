
import React from "react";
import { ModelType } from "@/types/model";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import ModelCardRound from "@/components/model/ModelCardRound";
import CategoryRow from "@/components/browse/CategoryRow";

interface DiscoverTabProps {
  suggestedModels: ModelType[];
  featuredModels: ModelType[];
  newModels: ModelType[];
  loading: boolean;
}

const DiscoverTab: React.FC<DiscoverTabProps> = ({
  suggestedModels,
  featuredModels,
  newModels,
  loading
}) => {
  if (loading) {
    return (
      <div className="flex items-center justify-center h-60">
        <div className="animate-pulse-slow text-hookr-accent">Loading...</div>
      </div>
    );
  }

  return (
    <div className="pb-20">
      <h2 className="text-lg font-semibold text-hookr-light mb-3">Suggested For You</h2>
      <div className="mb-8">
        <Carousel className="w-full">
          <CarouselContent>
            {suggestedModels.map(model => (
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
  );
};

export default DiscoverTab;
