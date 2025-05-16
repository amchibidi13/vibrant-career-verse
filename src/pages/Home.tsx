
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/SectionHeading";
import { ProjectCard, Project } from "@/components/ProjectCard";
import { ArticleCard, Article } from "@/components/ArticleCard";
import { ArrowDown } from "lucide-react";
import { AnimatedSection } from "@/components/AnimatedSection";

// Sample data - would come from a database in a real app
const featuredProjects: Project[] = [
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
  }
];

const featuredArticles: Article[] = [
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
  }
];

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <AnimatedSection animation="fade-in" className="relative h-screen flex items-center">
        <div className="container px-6 max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
              <span className="text-primary">Data Scientist</span> & <span className="text-primary">Analyst</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8">
              Transforming complex data into actionable insights and elegant solutions.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg">
                <Link to="/projects">View My Work</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/contact">Get In Touch</Link>
              </Button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <Button variant="ghost" size="icon" className="rounded-full">
            <ArrowDown className="h-6 w-6" />
          </Button>
        </div>
      </AnimatedSection>

      {/* About Section */}
      <AnimatedSection animation="slide-up" className="py-20">
        <div className="container px-6 max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <SectionHeading 
                title="About Me" 
                subtitle="Hello! I'm a data scientist and analyst passionate about turning data into meaningful insights that drive decisions."
              />
              <p className="text-muted-foreground mb-6">
                With expertise in statistical analysis, machine learning, and data visualization, 
                I help organizations leverage their data to solve complex problems. My approach combines 
                technical skills with business acumen to deliver actionable results.
              </p>
              <Button asChild>
                <Link to="/about">More About Me</Link>
              </Button>
            </div>
            <div className="bg-muted rounded-lg p-8 border">
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium">Data Analysis</h3>
                  <div className="h-2 w-full bg-secondary rounded-full mt-2">
                    <div className="h-2 bg-primary rounded-full" style={{ width: "95%" }}></div>
                  </div>
                </div>
                <div>
                  <h3 className="font-medium">Machine Learning</h3>
                  <div className="h-2 w-full bg-secondary rounded-full mt-2">
                    <div className="h-2 bg-primary rounded-full" style={{ width: "90%" }}></div>
                  </div>
                </div>
                <div>
                  <h3 className="font-medium">Data Visualization</h3>
                  <div className="h-2 w-full bg-secondary rounded-full mt-2">
                    <div className="h-2 bg-primary rounded-full" style={{ width: "85%" }}></div>
                  </div>
                </div>
                <div>
                  <h3 className="font-medium">Statistical Analysis</h3>
                  <div className="h-2 w-full bg-secondary rounded-full mt-2">
                    <div className="h-2 bg-primary rounded-full" style={{ width: "92%" }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Recent Projects Section */}
      <AnimatedSection animation="slide-up" delay={200} className="py-20 bg-secondary/50">
        <div className="container px-6 max-w-7xl mx-auto">
          <SectionHeading 
            title="Recent Projects" 
            subtitle="Explore some of my recent data science and analytics projects."
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project, index) => (
              <AnimatedSection key={project.id} animation="fade-in" delay={300 + index * 100}>
                <ProjectCard project={project} />
              </AnimatedSection>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Button asChild>
              <Link to="/projects">View All Projects</Link>
            </Button>
          </div>
        </div>
      </AnimatedSection>

      {/* Recent Articles Section */}
      <AnimatedSection animation="slide-up" delay={400} className="py-20">
        <div className="container px-6 max-w-7xl mx-auto">
          <SectionHeading 
            title="Recent Articles" 
            subtitle="Dive into my latest articles on data science, analytics, and visualization."
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredArticles.map((article, index) => (
              <AnimatedSection key={article.id} animation="fade-in" delay={500 + index * 100}>
                <ArticleCard article={article} />
              </AnimatedSection>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Button asChild>
              <Link to="/articles">View All Articles</Link>
            </Button>
          </div>
        </div>
      </AnimatedSection>

      {/* CTA Section */}
      <AnimatedSection animation="fade-in" delay={600} className="py-20 bg-accent text-accent-foreground">
        <div className="container px-6 max-w-7xl mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Let's Work Together</h2>
            <p className="text-lg mb-8">
              Looking for data science expertise for your next project? I'd love to hear from you and discuss how we can collaborate.
            </p>
            <Button size="lg" variant="secondary" className="w-full md:w-auto" asChild>
              <Link to="/contact">Get In Touch</Link>
            </Button>
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
}
