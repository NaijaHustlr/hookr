
import React from "react";
import { ModelType } from "@/types/model";
import { ScrollArea } from "@/components/ui/scroll-area";
import ModelCardSmall from "@/components/model/ModelCardSmall";

interface CategoryRowProps {
  title: string;
  models: ModelType[];
  className?: string;
}

const CategoryRow: React.FC<CategoryRowProps> = ({ title, models, className }) => {
  return (
    <div className={`mt-6 ${className || ''}`}>
      <h2 className="text-lg font-semibold text-hookr-light mb-3 px-4">{title}</h2>
      <ScrollArea className="w-full whitespace-nowrap pb-4">
        <div className="flex gap-4 px-4">
          {models.map(model => <ModelCardSmall key={model.id} model={model} />)}
        </div>
      </ScrollArea>
    </div>
  );
};

export default CategoryRow;
