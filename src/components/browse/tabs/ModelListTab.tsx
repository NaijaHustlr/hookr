
import React from "react";
import { ModelType } from "@/types/model";
import ModelCard from "@/components/model/ModelCard";

interface ModelListTabProps {
  models: ModelType[];
  loading: boolean;
  emptyMessage?: string;
}

const ModelListTab: React.FC<ModelListTabProps> = ({ 
  models, 
  loading,
  emptyMessage = "No models found" 
}) => {
  if (loading) {
    return (
      <div className="flex items-center justify-center h-60">
        <div className="animate-pulse-slow text-hookr-accent">Loading...</div>
      </div>
    );
  }

  if (models.length === 0) {
    return (
      <div className="flex items-center justify-center h-60 text-hookr-light opacity-70">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className="snap-y snap-mandatory overflow-y-auto h-[calc(100vh-10rem)] scroll-pt-4 pb-20">
      {models.map(model => (
        <div key={model.id} className="snap-start min-h-[calc(100vh-10rem)] p-4">
          <ModelCard model={model} />
        </div>
      ))}
    </div>
  );
};

export default ModelListTab;
