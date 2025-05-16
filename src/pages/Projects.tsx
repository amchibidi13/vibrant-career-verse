
import { useState, useMemo } from "react";
import { SectionHeading } from "@/components/SectionHeading";
import { ProjectCard } from "@/components/ProjectCard";
import { TagFilter } from "@/components/TagFilter";
import { useProjects } from "@/hooks/use-content";
import type { Project } from "@/hooks/use-content";

export default function Projects() {
  const { data: allProjects = [], isLoading } = useProjects();
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [visibleProjects, setVisibleProjects] = useState(6);

  // Extract all unique tags
  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    allProjects.forEach(project => project.tags.forEach(tag => tagSet.add(tag)));
    return Array.from(tagSet);
  }, [allProjects]);

  // Filter projects based on selected tags
  const filteredProjects = useMemo(() => {
    if (selectedTags.length === 0) return allProjects;
    
    return allProjects.filter(project => 
      selectedTags.some(tag => project.tags.includes(tag))
    );
  }, [selectedTags, allProjects]);

  const handleTagSelect = (tag: string) => {
    if (tag === "all") {
      setSelectedTags([]);
    } else {
      setSelectedTags(prev => 
        prev.includes(tag) 
          ? prev.filter(t => t !== tag) 
          : [...prev, tag]
      );
    }
  };

  const loadMore = () => {
    setVisibleProjects(prev => Math.min(prev + 3, filteredProjects.length));
  };

  return (
    <div className="animate-fade-in">
      <section className="pt-16 pb-8">
        <div className="container px-6 max-w-7xl mx-auto">
          <SectionHeading 
            title="Projects" 
            subtitle="Explore my data science and analytics projects, ranging from predictive modeling to data visualization and machine learning applications."
          />
        </div>
      </section>

      <section className="py-8">
        <div className="container px-6 max-w-7xl mx-auto">
          {isLoading ? (
            <p>Loading projects...</p>
          ) : (
            <>
              <TagFilter 
                tags={allTags} 
                selectedTags={selectedTags} 
                onTagSelect={handleTagSelect}
              />
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProjects.slice(0, visibleProjects).map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
              
              {visibleProjects < filteredProjects.length && (
                <div className="mt-12 text-center">
                  <button
                    onClick={loadMore}
                    className="px-6 py-3 rounded-md bg-secondary hover:bg-secondary/80 transition-colors"
                  >
                    Load More
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
}
