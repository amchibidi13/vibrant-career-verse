
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Github, ExternalLink } from "lucide-react";

// Sample data - would come from a database in a real app
const projects = [
  {
    id: "predictive-analytics-dashboard",
    title: "Predictive Analytics Dashboard",
    description: "A powerful dashboard that uses machine learning to predict business trends and visualize key metrics.",
    fullDescription: `
      ## Overview

      This project involved creating a comprehensive predictive analytics dashboard for a retail company to help them forecast sales, inventory needs, and customer behavior trends.

      ## Problem Statement

      The client needed a way to proactively manage inventory and staffing based on predicted sales patterns, as well as understand emerging customer trends to inform marketing decisions.

      ## Solution

      I developed a dashboard that combines multiple machine learning models:
      - Time series forecasting for sales prediction
      - Customer segmentation for targeted marketing
      - Anomaly detection for identifying unusual patterns
      - Product recommendation engine

      ## Technologies Used

      - Python for data processing and modeling
      - Scikit-learn and TensorFlow for machine learning algorithms
      - Tableau for interactive data visualization
      - SQL for database queries
      - GitHub Actions for CI/CD pipeline

      ## Results

      The dashboard successfully predicted sales with 92% accuracy, leading to:
      - 15% reduction in excess inventory
      - 23% improvement in staff scheduling efficiency
      - 18% increase in targeted marketing campaign effectiveness
    `,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
    images: [
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
      "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
      "https://images.unsplash.com/photo-1531297484001-80022131f5a1"
    ],
    tags: ["Python", "Machine Learning", "Tableau"],
    github: "https://github.com",
    demo: "https://example.com",
    date: "June 2023"
  },
  {
    id: "customer-segmentation",
    title: "Customer Segmentation Analysis",
    description: "Using clustering algorithms to segment customers based on purchase behavior and demographics.",
    fullDescription: `
      ## Overview

      This project focused on creating meaningful customer segments for a SaaS company to improve their marketing strategy and product offerings.

      ## Problem Statement

      The client had a large customer base but was using a one-size-fits-all approach to marketing and product development. They needed to understand the different types of customers they had and how to approach each segment differently.

      ## Solution

      I implemented a comprehensive customer segmentation analysis using:
      - K-means clustering for behavioral segmentation
      - RFM (Recency, Frequency, Monetary) analysis
      - Demographic clustering
      - Churn prediction modeling

      ## Technologies Used

      - Python for data analysis and modeling
      - Scikit-learn for clustering algorithms
      - Matplotlib and Seaborn for data visualization
      - SQL for data extraction
      - Jupyter Notebooks for documentation

      ## Results

      The analysis identified 5 distinct customer segments with unique characteristics and needs, leading to:
      - 27% increase in email marketing campaign engagement
      - 12% reduction in customer churn rate
      - 18% improvement in customer lifetime value for targeted segments
    `,
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
    images: [
      "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
      "https://images.unsplash.com/photo-1531297484001-80022131f5a1"
    ],
    tags: ["Python", "Scikit-learn", "Data Visualization"],
    github: "https://github.com",
    demo: "https://example.com",
    date: "April 2023"
  },
  {
    id: "time-series-forecasting",
    title: "Time Series Forecasting Model",
    description: "Building an ARIMA model to forecast sales for a retail company with interactive visualizations.",
    fullDescription: `
      ## Overview

      This project involved developing an advanced time series forecasting model for a retail chain to predict sales across multiple store locations and product categories.

      ## Problem Statement

      The client needed accurate sales forecasts to optimize inventory management, staff scheduling, and financial planning. Traditional methods were not capturing seasonal patterns and special events effectively.

      ## Solution

      I built a comprehensive forecasting solution that included:
      - ARIMA models for baseline forecasting
      - Prophet models for capturing seasonal patterns
      - LSTM neural networks for complex time dependencies
      - Ensemble methods to combine predictions

      ## Technologies Used

      - Python (pandas, numpy)
      - Statsmodels for ARIMA implementation
      - Facebook Prophet
      - TensorFlow/Keras for LSTM models
      - Plotly for interactive visualizations

      ## Results

      The forecasting model achieved:
      - 25% improvement in forecast accuracy compared to previous methods
      - 98% confidence intervals for robust planning
      - Integration with the client's inventory management system
      - 15% reduction in stockouts and 12% reduction in overstock situations
    `,
    image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1",
    images: [
      "https://images.unsplash.com/photo-1531297484001-80022131f5a1",
      "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f"
    ],
    tags: ["Python", "Time Series", "Forecasting"],
    github: "https://github.com",
    demo: "https://example.com",
    date: "March 2023"
  }
];

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  
  const project = projects.find(project => project.id === id);
  
  if (!project) {
    return (
      <div className="container px-6 max-w-7xl mx-auto py-20">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Project Not Found</h1>
          <p className="mb-6">The project you're looking for doesn't exist.</p>
          <Button asChild>
            <Link to="/projects">Back to Projects</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <div className="container px-6 max-w-7xl mx-auto pt-8 pb-20">
        <div className="mb-8">
          <Button variant="ghost" asChild>
            <Link to="/projects" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Projects
            </Link>
          </Button>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold mb-4">{project.title}</h1>
        
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
          <span className="text-sm text-muted-foreground">{project.date}</span>
        </div>
        
        <div className="mb-8 rounded-lg overflow-hidden">
          <img 
            src={project.image} 
            alt={project.title}
            className="w-full h-auto object-cover" 
          />
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="col-span-2">
            <div className="prose-custom">
              {project.fullDescription.split('\n').map((paragraph, index) => {
                if (paragraph.trim().startsWith('##')) {
                  return (
                    <h2 key={index} className="text-2xl font-semibold mt-8 mb-4">
                      {paragraph.replace('##', '').trim()}
                    </h2>
                  );
                } else if (paragraph.trim().startsWith('-')) {
                  return (
                    <ul key={index} className="list-disc pl-6 mb-4">
                      <li>{paragraph.replace('-', '').trim()}</li>
                    </ul>
                  );
                } else if (paragraph.trim()) {
                  return <p key={index} className="mb-4">{paragraph}</p>;
                }
                return null;
              })}
            </div>
          </div>
          
          <div>
            <div className="bg-secondary/50 p-6 rounded-lg mb-6">
              <h3 className="text-xl font-semibold mb-4">Project Details</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Date</h4>
                  <p>{project.date}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Technologies</h4>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="outline">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  {project.github && (
                    <Button variant="outline" className="justify-start" asChild>
                      <a 
                        href={project.github} 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2"
                      >
                        <Github className="h-4 w-4" />
                        View Source Code
                      </a>
                    </Button>
                  )}
                  {project.demo && (
                    <Button variant="outline" className="justify-start" asChild>
                      <a 
                        href={project.demo} 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2"
                      >
                        <ExternalLink className="h-4 w-4" />
                        View Live Demo
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            </div>
            
            {project.images && project.images.length > 1 && (
              <div>
                <h3 className="text-xl font-semibold mb-4">Project Gallery</h3>
                <div className="grid grid-cols-2 gap-4">
                  {project.images.map((image, index) => (
                    <div key={index} className="rounded-lg overflow-hidden">
                      <img 
                        src={image} 
                        alt={`${project.title} screenshot ${index + 1}`}
                        className="w-full h-auto object-cover aspect-video" 
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
