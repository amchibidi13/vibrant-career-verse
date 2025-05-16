
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/sonner';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowDown, ArrowUp, Edit, Plus, Trash } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  display_order: number;
  date: string;
}

export default function ProjectsAdmin() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const { isAdmin, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !isAdmin) {
      navigate('/admin/login');
      return;
    }

    fetchProjects();
  }, [isAdmin, isLoading, navigate]);

  async function fetchProjects() {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) throw error;
      setProjects(data || []);
    } catch (error: any) {
      toast.error(`Error fetching projects: ${error.message}`);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete() {
    if (!deleteId) return;
    
    try {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', deleteId);
        
      if (error) throw error;
      
      setProjects((prev) => prev.filter(project => project.id !== deleteId));
      toast.success('Project deleted successfully');
    } catch (error: any) {
      toast.error(`Error deleting project: ${error.message}`);
    } finally {
      setDeleteId(null);
    }
  }

  async function handleReorder(id: string, direction: 'up' | 'down') {
    const projectIndex = projects.findIndex(p => p.id === id);
    if (projectIndex === -1) return;
    
    // Can't move up if already at the top
    if (direction === 'up' && projectIndex === 0) return;
    // Can't move down if already at the bottom
    if (direction === 'down' && projectIndex === projects.length - 1) return;

    const swapIndex = direction === 'up' ? projectIndex - 1 : projectIndex + 1;
    
    // Get the two projects being swapped
    const currentProject = projects[projectIndex];
    const swapProject = projects[swapIndex];
    
    try {
      // Update the display_order of both projects in the database
      const updates = [
        supabase.from('projects')
          .update({ display_order: swapProject.display_order })
          .eq('id', currentProject.id),
        supabase.from('projects')
          .update({ display_order: currentProject.display_order })
          .eq('id', swapProject.id)
      ];
      
      const results = await Promise.all(updates);
      
      // Check for errors
      const hasError = results.some(result => result.error);
      if (hasError) {
        throw new Error('Failed to update project order');
      }
      
      // Update the local state
      const newProjects = [...projects];
      newProjects[projectIndex] = { ...newProjects[projectIndex], display_order: swapProject.display_order };
      newProjects[swapIndex] = { ...newProjects[swapIndex], display_order: currentProject.display_order };
      newProjects.sort((a, b) => a.display_order - b.display_order);
      
      setProjects(newProjects);
      toast.success('Project order updated');
    } catch (error: any) {
      toast.error(`Error updating order: ${error.message}`);
    }
  }

  if (loading) {
    return (
      <div className="container max-w-7xl mx-auto py-10">
        <p>Loading projects...</p>
      </div>
    );
  }

  return (
    <div className="container max-w-7xl mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Manage Projects</h1>
          <p className="text-muted-foreground">Add, edit, delete and reorder your projects</p>
        </div>
        <Button asChild>
          <Link to="/admin/projects/new">
            <Plus className="mr-2 h-4 w-4" /> Add Project
          </Link>
        </Button>
      </div>

      {projects.length === 0 ? (
        <Card>
          <CardContent className="py-10">
            <div className="text-center">
              <p className="text-muted-foreground">No projects found. Create your first project!</p>
              <Button asChild className="mt-4">
                <Link to="/admin/projects/new">
                  <Plus className="mr-2 h-4 w-4" /> Add Project
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {projects.map((project) => (
            <Card key={project.id}>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl flex items-start justify-between">
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-md overflow-hidden mr-4">
                      <img 
                        src={project.image} 
                        alt={project.title} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      {project.title}
                      <div className="flex flex-wrap gap-1 mt-1">
                        {project.tags.slice(0, 3).map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
                        ))}
                        {project.tags.length > 3 && (
                          <Badge variant="outline" className="text-xs">+{project.tags.length - 3}</Badge>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => handleReorder(project.id, 'up')}
                      disabled={projects.indexOf(project) === 0}
                    >
                      <ArrowUp className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => handleReorder(project.id, 'down')}
                      disabled={projects.indexOf(project) === projects.length - 1}
                    >
                      <ArrowDown className="h-4 w-4" />
                    </Button>
                  </div>
                </CardTitle>
                <CardDescription>{project.description.slice(0, 100)}{project.description.length > 100 ? '...' : ''}</CardDescription>
              </CardHeader>
              <CardFooter>
                <div className="flex justify-between w-full">
                  <div>
                    <span className="text-sm text-muted-foreground">{project.date}</span>
                  </div>
                  <div className="space-x-2">
                    <Button 
                      variant="destructive" 
                      size="sm"
                      onClick={() => setDeleteId(project.id)}
                    >
                      <Trash className="h-4 w-4 mr-1" /> Delete
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      asChild
                    >
                      <Link to={`/admin/projects/${project.id}`}>
                        <Edit className="h-4 w-4 mr-1" /> Edit
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      <AlertDialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this project
              from your portfolio.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
