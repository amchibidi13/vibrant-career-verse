
import { useParams, Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Github, ExternalLink } from "lucide-react";
import { useProject } from "@/hooks/use-content";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect } from "react";

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: project, isLoading, isError } = useProject(id);
  
  useEffect(() => {
    // Redirect to projects page if there's an error or no project found
    if (isError || (!isLoading && !project)) {
      navigate('/projects');
    }
  }, [isError, isLoading, project, navigate]);

  // Show loading state
  if (isLoading) {
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

          <Skeleton className="h-12 w-3/4 mb-4" />
          
          <div className="flex flex-wrap gap-2 mb-6">
            <Skeleton className="h-6 w-20 rounded-full" />
            <Skeleton className="h-6 w-24 rounded-full" />
            <Skeleton className="h-6 w-16 rounded-full" />
          </div>
          
          <Skeleton className="w-full aspect-video rounded-lg mb-8" />
          
          <div className="space-y-4">
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-5/6" />
            <Skeleton className="h-6 w-4/6" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-3/4" />
          </div>
        </div>
      </div>
    );
  }
  
  // If no project is found, this will redirect via the useEffect above
  if (!project) return null;

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
          <div className="md:col-span-2">
            <div className="prose max-w-none">
              <p className="text-lg mb-6">{project.description}</p>
              <div dangerouslySetInnerHTML={{ __html: project.full_description.replace(/\n/g, '<br />') }} />
            </div>
          </div>
          <div>
            <div className="bg-card rounded-lg p-6 sticky top-20">
              <h3 className="text-xl font-semibold mb-4">Project Details</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-1">Date</h4>
                  <p>{project.date}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-1">Technologies</h4>
                  <div className="flex flex-wrap gap-1">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
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
          </div>
        </div>
      </div>
    </div>
  );
}
