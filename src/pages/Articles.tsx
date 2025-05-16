
import { useState, useMemo } from "react";
import { SectionHeading } from "@/components/SectionHeading";
import { ArticleCard, Article } from "@/components/ArticleCard";
import { TagFilter } from "@/components/TagFilter";

// Sample data - would come from a database in a real app
const articles: Article[] = [
  {
    id: "machine-learning-fundamentals",
    title: "Machine Learning Fundamentals for Data Scientists",
    summary: "An in-depth guide to the core concepts of machine learning that every data scientist should understand.",
    date: "June 15, 2023",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    tags: ["Machine Learning", "Data Science", "Tutorial"],
    url: "/articles/machine-learning-fundamentals"
  },
  {
    id: "data-visualization-best-practices",
    title: "Data Visualization Best Practices",
    summary: "How to create effective data visualizations that communicate insights clearly and avoid common pitfalls.",
    date: "May 22, 2023",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
    tags: ["Data Visualization", "Design", "Tutorial"],
    url: "/articles/data-visualization-best-practices"
  },
  {
    id: "sql-for-data-analysis",
    title: "Advanced SQL Techniques for Data Analysis",
    summary: "Take your SQL skills to the next level with these advanced techniques specifically for data analysis tasks.",
    date: "April 10, 2023",
    image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04",
    tags: ["SQL", "Data Analysis", "Database"],
    url: "/articles/sql-for-data-analysis"
  },
  {
    id: "python-data-cleaning",
    title: "Efficient Data Cleaning in Python",
    summary: "A comprehensive guide to data cleaning techniques in Python that will save you time and improve your analysis.",
    date: "March 5, 2023",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
    tags: ["Python", "Data Preprocessing", "Tutorial"],
    url: "/articles/python-data-cleaning"
  },
  {
    id: "time-series-analysis",
    title: "Introduction to Time Series Analysis",
    summary: "Learn the fundamentals of time series analysis and how to apply it to real-world forecasting problems.",
    date: "February 18, 2023",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
    tags: ["Time Series", "Forecasting", "Statistics"],
    url: "/articles/time-series-analysis"
  },
  {
    id: "nlp-techniques",
    title: "Natural Language Processing Techniques for Beginners",
    summary: "A beginner-friendly introduction to NLP concepts and techniques with practical examples.",
    date: "January 30, 2023",
    image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1",
    tags: ["NLP", "Machine Learning", "Python"],
    url: "/articles/nlp-techniques"
  }
];

export default function Articles() {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [visibleArticles, setVisibleArticles] = useState(6);

  // Extract all unique tags
  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    articles.forEach(article => article.tags.forEach(tag => tagSet.add(tag)));
    return Array.from(tagSet);
  }, []);

  // Filter articles based on selected tags
  const filteredArticles = useMemo(() => {
    if (selectedTags.length === 0) return articles;
    
    return articles.filter(article => 
      selectedTags.some(tag => article.tags.includes(tag))
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
    setVisibleArticles(prev => Math.min(prev + 3, filteredArticles.length));
  };

  return (
    <div className="animate-fade-in">
      <section className="pt-16 pb-8">
        <div className="container px-6 max-w-7xl mx-auto">
          <SectionHeading 
            title="Articles" 
            subtitle="Read my latest articles and tutorials on data science, machine learning, and analytics."
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
            {filteredArticles.slice(0, visibleArticles).map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
          
          {visibleArticles < filteredArticles.length && (
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
