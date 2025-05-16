
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface TagFilterProps {
  tags: string[];
  selectedTags: string[];
  onTagSelect: (tag: string) => void;
}

export function TagFilter({ tags, selectedTags, onTagSelect }: TagFilterProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-8">
      <Badge 
        variant={selectedTags.length === 0 ? "default" : "outline"} 
        className={cn(
          "cursor-pointer",
          selectedTags.length === 0 && "bg-primary text-primary-foreground"
        )}
        onClick={() => onTagSelect("all")}
      >
        All
      </Badge>
      
      {tags.map((tag) => (
        <Badge 
          key={tag}
          variant={selectedTags.includes(tag) ? "default" : "outline"} 
          className={cn(
            "cursor-pointer",
            selectedTags.includes(tag) && "bg-primary text-primary-foreground"
          )}
          onClick={() => onTagSelect(tag)}
        >
          {tag}
        </Badge>
      ))}
    </div>
  );
}
