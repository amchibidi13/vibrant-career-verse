
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

interface ArticleFormData {
  title: string;
  summary: string;
  content: string;
  image: string;
  tags: string[];
  date: string;
}

export default function ArticleForm() {
  const { id } = useParams();
  const isEditing = !!id;
  const navigate = useNavigate();
  const { isAdmin, isLoading } = useAuth();
  const [formData, setFormData] = useState<ArticleFormData>({
    title: '',
    summary: '',
    content: '',
    image: '',
    tags: [],
    date: new Date().toISOString().split('T')[0],
  });
  const [loading, setLoading] = useState(false);
  const [currentTag, setCurrentTag] = useState('');
  
  useEffect(() => {
    if (!isLoading && !isAdmin) {
      navigate('/admin/login');
      return;
    }
    
    if (isEditing) {
      fetchArticle();
    }
  }, [id, isAdmin, isLoading, navigate]);

  async function fetchArticle() {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      if (data) {
        setFormData(data);
      }
    } catch (error: any) {
      toast.error(`Error fetching article: ${error.message}`);
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

  const removeTag = (tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const articleData = { ...formData };
      
      if (isEditing) {
        const { error } = await supabase
          .from('articles')
          .update(articleData)
          .eq('id', id);
          
        if (error) throw error;
        toast.success('Article updated successfully');
      } else {
        // Get max display order to put this at the end
        const { data: maxOrderData } = await supabase
          .from('articles')
          .select('display_order')
          .order('display_order', { ascending: false })
          .limit(1);
          
        const maxOrder = maxOrderData && maxOrderData.length > 0 ? maxOrderData[0].display_order : 0;
        articleData.display_order = maxOrder + 1;
        
        const { error } = await supabase
          .from('articles')
          .insert([articleData]);
          
        if (error) throw error;
        toast.success('Article created successfully');
      }
      
      navigate('/admin/articles');
    } catch (error: any) {
      toast.error(`Error saving article: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  if (loading && isEditing) {
    return (
      <div className="container max-w-5xl mx-auto py-10">
        <p>Loading article...</p>
      </div>
    );
  }

  return (
    <div className="container max-w-5xl mx-auto py-10">
      <div className="mb-6">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/admin/articles')}
          className="mb-4"
        >
          <ChevronLeft className="mr-2 h-4 w-4" /> Back to Articles
        </Button>
        <h1 className="text-3xl font-bold">{isEditing ? 'Edit Article' : 'New Article'}</h1>
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
                placeholder="Article Title"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="summary">Summary *</Label>
              <Textarea
                id="summary"
                name="summary"
                value={formData.summary}
                onChange={handleChange}
                required
                placeholder="A brief summary of your article (displayed on cards)"
                className="min-h-[80px]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">Content *</Label>
              <Textarea
                id="content"
                name="content"
                value={formData.content}
                onChange={handleChange}
                required
                placeholder="Full article content in Markdown format"
                className="min-h-[300px] font-mono"
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

            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input 
                id="date"
                name="date"
                type="text"
                value={formData.date}
                onChange={handleChange}
                placeholder="Month Day, Year (e.g., June 15, 2023)"
              />
            </div>

            <div className="flex justify-end space-x-4 pt-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => navigate('/admin/articles')}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? 'Saving...' : isEditing ? 'Update Article' : 'Create Article'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
