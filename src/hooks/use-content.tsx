
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/sonner';

// Types based on Supabase database schema
export interface Project {
  id: string;
  title: string;
  description: string;
  full_description: string;
  image: string;
  images: string[];
  tags: string[];
  github: string | null;
  demo: string | null;
  date: string;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface Article {
  id: string;
  title: string;
  summary: string;
  content: string;
  date: string;
  image: string;
  tags: string[];
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface AboutInfo {
  id: string;
  bio: string;
  education: string[];
  experience: string[];
  skills: string[];
  resume_url: string | null;
  created_at: string;
  updated_at: string;
}

// Fetch projects
export function useProjects() {
  return useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('display_order', { ascending: true });
        
      if (error) {
        toast.error(`Error loading projects: ${error.message}`);
        throw error;
      }
      
      return data as Project[];
    }
  });
}

// Fetch a specific project
export function useProject(id: string | undefined) {
  return useQuery({
    queryKey: ['project', id],
    queryFn: async () => {
      if (!id) throw new Error('Project ID is required');
      
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('id', id)
        .single();
        
      if (error) {
        toast.error(`Error loading project: ${error.message}`);
        throw error;
      }
      
      return data as Project;
    },
    enabled: !!id,
  });
}

// Fetch articles
export function useArticles() {
  return useQuery({
    queryKey: ['articles'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .order('display_order', { ascending: true });
        
      if (error) {
        toast.error(`Error loading articles: ${error.message}`);
        throw error;
      }
      
      return data as Article[];
    }
  });
}

// Fetch a specific article
export function useArticle(id: string | undefined) {
  return useQuery({
    queryKey: ['article', id],
    queryFn: async () => {
      if (!id) throw new Error('Article ID is required');
      
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('id', id)
        .single();
        
      if (error) {
        toast.error(`Error loading article: ${error.message}`);
        throw error;
      }
      
      return data as Article;
    },
    enabled: !!id,
  });
}

// Fetch about info
export function useAboutInfo() {
  return useQuery({
    queryKey: ['about'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('about')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(1)
        .single();
        
      if (error) {
        // Don't show error for no data found
        if (error.code !== 'PGRST116') {
          toast.error(`Error loading about info: ${error.message}`);
          throw error;
        }
        return null;
      }
      
      return data as AboutInfo;
    }
  });
}

// Fetch all available tags from projects and articles
export function useAllTags() {
  const [tags, setTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    async function fetchTags() {
      try {
        setLoading(true);
        
        // Fetch projects and articles
        const [projectsResponse, articlesResponse] = await Promise.all([
          supabase.from('projects').select('tags'),
          supabase.from('articles').select('tags')
        ]);
        
        if (projectsResponse.error) throw projectsResponse.error;
        if (articlesResponse.error) throw articlesResponse.error;
        
        // Extract tags from both sources
        const projectTags = projectsResponse.data?.flatMap(p => p.tags) || [];
        const articleTags = articlesResponse.data?.flatMap(a => a.tags) || [];
        
        // Combine and deduplicate
        const combinedTags = Array.from(new Set([...projectTags, ...articleTags]));
        setTags(combinedTags.sort());
        
      } catch (error: any) {
        console.error('Error fetching tags:', error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchTags();
  }, []);
  
  return { tags, loading };
}
