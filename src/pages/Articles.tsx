
import { useState, useMemo } from "react";
import { SectionHeading } from "@/components/SectionHeading";
import { ArticleCard } from "@/components/ArticleCard";
import { TagFilter } from "@/components/TagFilter";
import { useArticles } from "@/hooks/use-content";
import type { Article } from "@/hooks/use-content";

export default function Articles() {
  const { data: allArticles = [], isLoading } = useArticles();
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [visibleArticles, setVisibleArticles] = useState(6);

  // Extract all unique tags
  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    allArticles.forEach(article => article.tags.forEach(tag => tagSet.add(tag)));
    return Array.from(tagSet);
  }, [allArticles]);

  // Filter articles based on selected tags
  const filteredArticles = useMemo(() => {
    if (selectedTags.length === 0) return allArticles;
    
    return allArticles.filter(article => 
      selectedTags.some(tag => article.tags.includes(tag))
    );
  }, [selectedTags, allArticles]);

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
          {isLoading ? (
            <p>Loading articles...</p>
          ) : (
            <>
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
            </>
          )}
        </div>
      </section>
    </div>
  );
}
