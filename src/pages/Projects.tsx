
import { useState, useMemo } from "react";
import { SectionHeading } from "@/components/SectionHeading";
import { ProjectCard, Project } from "@/components/ProjectCard";
import { TagFilter } from "@/components/TagFilter";

// Sample data - would come from a database in a real app
const projects: Project[] = [
  {
    id: "predictive-analytics-dashboard",
    title: "Predictive Analytics Dashboard",
    description: "A powerful dashboard that uses machine learning to predict business trends and visualize key metrics.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
    tags: ["Python", "Machine Learning", "Tableau"],
    url: "/projects/predictive-analytics-dashboard"
  },
  {
    id: "customer-segmentation",
    title: "Customer Segmentation Analysis",
    description: "Using clustering algorithms to segment customers based on purchase behavior and demographics.",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
    tags: ["Python", "Scikit-learn", "Data Visualization"],
    url: "/projects/customer-segmentation"
  },
  {
    id: "time-series-forecasting",
    title: "Time Series Forecasting Model",
    description: "Building an ARIMA model to forecast sales for a retail company with interactive visualizations.",
    image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1",
    tags: ["Python", "Time Series", "Forecasting"],
    url: "/projects/time-series-forecasting"
  },
  {
    id: "nlp-text-analyzer",
    title: "NLP Text Analysis Tool",
    description: "A natural language processing tool that analyzes sentiment, extracts entities, and categorizes text.",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    tags: ["Python", "NLP", "Machine Learning"],
    url: "/projects/nlp-text-analyzer"
  },
  {
    id: "sql-database-optimization",
    title: "SQL Database Optimization",
    description: "Optimizing database queries and structure for improved performance in a large-scale system.",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
    tags: ["SQL", "Database", "Optimization"],
    url: "/projects/sql-database-optimization"
  },
  {
    id: "recommendation-system",
    title: "Product Recommendation System",
    description: "A collaborative filtering recommendation system for an e-commerce platform to improve user engagement.",
    image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04",
    tags: ["Python", "Recommendation Systems", "Machine Learning"],
    url: "/projects/recommendation-system"
  }
];

export default function Projects() {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [visibleProjects, setVisibleProjects] = useState(6);

  // Extract all unique tags
  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    projects.forEach(project => project.tags.forEach(tag => tagSet.add(tag)));
    return Array.from(tagSet);
  }, []);

  // Filter projects based on selected tags
  const filteredProjects = useMemo(() => {
    if (selectedTags.length === 0) return projects;
    
    return projects.filter(project => 
      selectedTags.some(tag => project.tags.includes(tag))
    );
  }, [selectedTags]);

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
        </div>
      </section>
    </div>
  );
}
