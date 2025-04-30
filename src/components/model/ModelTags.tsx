
import React from "react";

interface ModelTagsProps {
  tags: string[];
}

const ModelTags: React.FC<ModelTagsProps> = ({ tags }) => {
  return (
    <div className="flex flex-wrap gap-1.5 mt-2">
      {tags.slice(0, 3).map((tag, index) => (
        <span
          key={index}
          className="px-2 py-0.5 bg-hookr-muted rounded-full text-xs font-medium text-white"
        >
          {tag}
        </span>
      ))}
      {tags.length > 3 && (
        <span className="px-2 py-0.5 bg-transparent text-xs font-medium text-white">
          +{tags.length - 3} more
        </span>
      )}
    </div>
  );
};

export default ModelTags;
