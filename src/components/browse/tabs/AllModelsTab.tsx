
import React, { useRef, useState, useEffect } from "react";
import { ModelType } from "@/types/model";
import ModelCard from "@/components/model/ModelCard";
import CategoryRow from "@/components/browse/CategoryRow";

interface AllModelsTabProps {
  models: ModelType[];
  loading: boolean;
  featuredModels: ModelType[];
  newModels: ModelType[];
  topRatedModels: ModelType[];
}

const AllModelsTab: React.FC<AllModelsTabProps> = ({
  models,
  loading,
  featuredModels,
  newModels,
  topRatedModels
}) => {
  const [reachedBottom, setReachedBottom] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

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

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="animate-pulse text-hookr-accent">Loading models...</div>
      </div>
    );
  }

  return (
    <>
      <div className="snap-y snap-mandatory overflow-y-auto h-[calc(100vh-10rem)] scroll-pt-4">
        {models.map(model => (
          <div key={model.id} className="snap-start min-h-[calc(100vh-10rem)] p-4">
            <ModelCard model={model} />
          </div>
        ))}
        <div ref={bottomRef} className="h-4"></div>
      </div>

      {/* Featured sections that appear after reaching bottom */}
      {reachedBottom && (
        <div className="pt-8 pb-20">
          <div className="px-4 mb-6">
            <h2 className="text-xl font-bold text-hookr-light">Explore More</h2>
            <p className="text-hookr-light opacity-70 text-sm">
              Discover top models and new faces
            </p>
          </div>
          
          <CategoryRow title="Featured Models" models={featuredModels} />
          <CategoryRow title="New In Town" models={newModels} />
          <CategoryRow title="Top Rated" models={topRatedModels} />
        </div>
      )}
    </>
  );
};

export default AllModelsTab;
