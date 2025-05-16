
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

interface Article {
  id: string;
  title: string;
  summary: string;
  image: string;
  tags: string[];
  display_order: number;
  date: string;
}

export default function ArticlesAdmin() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const { isAdmin, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !isAdmin) {
      navigate('/admin/login');
      return;
    }

    fetchArticles();
  }, [isAdmin, isLoading, navigate]);

  async function fetchArticles() {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) throw error;
      setArticles(data || []);
    } catch (error: any) {
      toast.error(`Error fetching articles: ${error.message}`);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete() {
    if (!deleteId) return;
    
    try {
      const { error } = await supabase
        .from('articles')
        .delete()
        .eq('id', deleteId);
        
      if (error) throw error;
      
      setArticles((prev) => prev.filter(article => article.id !== deleteId));
      toast.success('Article deleted successfully');
    } catch (error: any) {
      toast.error(`Error deleting article: ${error.message}`);
    } finally {
      setDeleteId(null);
    }
  }

  async function handleReorder(id: string, direction: 'up' | 'down') {
    const articleIndex = articles.findIndex(a => a.id === id);
    if (articleIndex === -1) return;
    
    // Can't move up if already at the top
    if (direction === 'up' && articleIndex === 0) return;
    // Can't move down if already at the bottom
    if (direction === 'down' && articleIndex === articles.length - 1) return;

    const swapIndex = direction === 'up' ? articleIndex - 1 : articleIndex + 1;
    
    // Get the two articles being swapped
    const currentArticle = articles[articleIndex];
    const swapArticle = articles[swapIndex];
    
    try {
      // Update the display_order of both articles in the database
      const updates = [
        supabase.from('articles')
          .update({ display_order: swapArticle.display_order })
          .eq('id', currentArticle.id),
        supabase.from('articles')
          .update({ display_order: currentArticle.display_order })
          .eq('id', swapArticle.id)
      ];
      
      const results = await Promise.all(updates);
      
      // Check for errors
      const hasError = results.some(result => result.error);
      if (hasError) {
        throw new Error('Failed to update article order');
      }
      
      // Update the local state
      const newArticles = [...articles];
      newArticles[articleIndex] = { ...newArticles[articleIndex], display_order: swapArticle.display_order };
      newArticles[swapIndex] = { ...newArticles[swapIndex], display_order: currentArticle.display_order };
      newArticles.sort((a, b) => a.display_order - b.display_order);
      
      setArticles(newArticles);
      toast.success('Article order updated');
    } catch (error: any) {
      toast.error(`Error updating order: ${error.message}`);
    }
  }

  if (loading) {
    return (
      <div className="container max-w-7xl mx-auto py-10">
        <p>Loading articles...</p>
      </div>
    );
  }

  return (
    <div className="container max-w-7xl mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Manage Articles</h1>
          <p className="text-muted-foreground">Add, edit, delete and reorder your articles</p>
        </div>
        <Button asChild>
          <Link to="/admin/articles/new">
            <Plus className="mr-2 h-4 w-4" /> Add Article
          </Link>
        </Button>
      </div>

      {articles.length === 0 ? (
        <Card>
          <CardContent className="py-10">
            <div className="text-center">
              <p className="text-muted-foreground">No articles found. Create your first article!</p>
              <Button asChild className="mt-4">
                <Link to="/admin/articles/new">
                  <Plus className="mr-2 h-4 w-4" /> Add Article
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {articles.map((article) => (
            <Card key={article.id}>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl flex items-start justify-between">
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-md overflow-hidden mr-4">
                      <img 
                        src={article.image} 
                        alt={article.title} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      {article.title}
                      <div className="flex flex-wrap gap-1 mt-1">
                        {article.tags.slice(0, 3).map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
                        ))}
                        {article.tags.length > 3 && (
                          <Badge variant="outline" className="text-xs">+{article.tags.length - 3}</Badge>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => handleReorder(article.id, 'up')}
                      disabled={articles.indexOf(article) === 0}
                    >
                      <ArrowUp className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => handleReorder(article.id, 'down')}
                      disabled={articles.indexOf(article) === articles.length - 1}
                    >
                      <ArrowDown className="h-4 w-4" />
                    </Button>
                  </div>
                </CardTitle>
                <CardDescription>{article.summary.slice(0, 100)}{article.summary.length > 100 ? '...' : ''}</CardDescription>
              </CardHeader>
              <CardFooter>
                <div className="flex justify-between w-full">
                  <div>
                    <span className="text-sm text-muted-foreground">{article.date}</span>
                  </div>
                  <div className="space-x-2">
                    <Button 
                      variant="destructive" 
                      size="sm"
                      onClick={() => setDeleteId(article.id)}
                    >
                      <Trash className="h-4 w-4 mr-1" /> Delete
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      asChild
                    >
                      <Link to={`/admin/articles/${article.id}`}>
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
              This action cannot be undone. This will permanently delete this article
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
