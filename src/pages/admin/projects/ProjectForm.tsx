
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/sonner';
import { ChevronLeft } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';

interface ProjectFormData {
  title: string;
  description: string;
  full_description: string;
  image: string;
  images: string[];
  tags: string[];
  github: string;
  demo: string;
  date: string;
}

export default function ProjectForm() {
  const { id } = useParams();
  const isEditing = !!id;
  const navigate = useNavigate();
  const { isAdmin, isLoading } = useAuth();
  const [formData, setFormData] = useState<ProjectFormData>({
    title: '',
    description: '',
    full_description: '',
    image: '',
    images: [],
    tags: [],
    github: '',
    demo: '',
    date: new Date().toISOString().split('T')[0],
  });
  const [loading, setLoading] = useState(false);
  const [currentTag, setCurrentTag] = useState('');
  const [additionalImage, setAdditionalImage] = useState('');
  
  useEffect(() => {
    if (!isLoading && !isAdmin) {
      navigate('/admin/login');
      return;
    }
    
    if (isEditing) {
      fetchProject();
    }
  }, [id, isAdmin, isLoading, navigate]);

  async function fetchProject() {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      if (data) {
        setFormData(data);
      }
    } catch (error: any) {
      toast.error(`Error fetching project: ${error.message}`);
    } finally {
      setLoading(false);
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTagKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && currentTag.trim()) {
      e.preventDefault();
      if (!formData.tags.includes(currentTag.trim())) {
        setFormData((prev) => ({
          ...prev,
          tags: [...prev.tags, currentTag.trim()]
        }));
      }
      setCurrentTag('');
    }
  };

  const handleImageKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && additionalImage.trim()) {
      e.preventDefault();
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, additionalImage.trim()]
      }));
      setAdditionalImage('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const removeImage = (imageToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter(image => image !== imageToRemove)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const projectData = { ...formData };
      
      if (isEditing) {
        const { error } = await supabase
          .from('projects')
          .update(projectData)
          .eq('id', id);
          
        if (error) throw error;
        toast.success('Project updated successfully');
      } else {
        // Get max display order to put this at the end
        const { data: maxOrderData } = await supabase
          .from('projects')
          .select('display_order')
          .order('display_order', { ascending: false })
          .limit(1);
          
        const maxOrder = maxOrderData && maxOrderData.length > 0 ? maxOrderData[0].display_order : 0;
        projectData.display_order = maxOrder + 1;
        
        const { error } = await supabase
          .from('projects')
          .insert([projectData]);
          
        if (error) throw error;
        toast.success('Project created successfully');
      }
      
      navigate('/admin/projects');
    } catch (error: any) {
      toast.error(`Error saving project: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  if (loading && isEditing) {
    return (
      <div className="container max-w-5xl mx-auto py-10">
        <p>Loading project...</p>
      </div>
    );
  }

  return (
    <div className="container max-w-5xl mx-auto py-10">
      <div className="mb-6">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/admin/projects')}
          className="mb-4"
        >
          <ChevronLeft className="mr-2 h-4 w-4" /> Back to Projects
        </Button>
        <h1 className="text-3xl font-bold">{isEditing ? 'Edit Project' : 'New Project'}</h1>
      </div>

      <Card>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input 
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                placeholder="Project Title"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Short Description *</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                placeholder="A brief description of your project (displayed on cards)"
                className="min-h-[80px]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="full_description">Full Description *</Label>
              <Textarea
                id="full_description"
                name="full_description"
                value={formData.full_description}
                onChange={handleChange}
                required
                placeholder="Full project description in Markdown format"
                className="min-h-[200px] font-mono"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="image">Featured Image URL *</Label>
              <Input 
                id="image"
                name="image"
                value={formData.image}
                onChange={handleChange}
                required
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="additionalImages">Additional Images</Label>
              <div className="flex mb-2">
                <Input 
                  id="additionalImages"
                  value={additionalImage}
                  onChange={(e) => setAdditionalImage(e.target.value)}
                  placeholder="https://example.com/image.jpg (press Enter to add)"
                  onKeyDown={handleImageKeyDown}
                />
              </div>
              {formData.images.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.images.map((image, index) => (
                    <div key={index} className="flex items-center gap-2 bg-secondary px-3 py-1 rounded-md">
                      <span className="text-sm truncate max-w-[200px]">{image.split('/').pop()}</span>
                      <Button 
                        type="button" 
                        variant="ghost" 
                        size="icon" 
                        className="h-5 w-5 p-0"
                        onClick={() => removeImage(image)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="tags">Tags</Label>
              <div className="flex mb-2">
                <Input 
                  id="tags"
                  value={currentTag}
                  onChange={(e) => setCurrentTag(e.target.value)}
                  placeholder="Add tag (press Enter to add)"
                  onKeyDown={handleTagKeyDown}
                />
              </div>
              {formData.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.tags.map(tag => (
                    <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                      {tag}
                      <Button 
                        type="button" 
                        variant="ghost" 
                        size="icon" 
                        className="h-4 w-4 p-0"
                        onClick={() => removeTag(tag)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="github">GitHub URL</Label>
                <Input 
                  id="github"
                  name="github"
                  value={formData.github}
                  onChange={handleChange}
                  placeholder="https://github.com/username/repo"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="demo">Demo URL</Label>
                <Input 
                  id="demo"
                  name="demo"
                  value={formData.demo}
                  onChange={handleChange}
                  placeholder="https://demo.example.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input 
                id="date"
                name="date"
                type="text"
                value={formData.date}
                onChange={handleChange}
                placeholder="Month Year (e.g., June 2023)"
              />
            </div>

            <div className="flex justify-end space-x-4 pt-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => navigate('/admin/projects')}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? 'Saving...' : isEditing ? 'Update Project' : 'Create Project'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
