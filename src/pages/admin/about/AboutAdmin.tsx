
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/sonner';
import { Badge } from '@/components/ui/badge';
import { X, Upload } from 'lucide-react';

interface AboutData {
  id?: string;
  bio: string;
  education: string[];
  experience: string[];
  skills: string[];
  resume_url: string;
}

export default function AboutAdmin() {
  const navigate = useNavigate();
  const { isAdmin, isLoading } = useAuth();
  const [formData, setFormData] = useState<AboutData>({
    bio: '',
    education: [],
    experience: [],
    skills: [],
    resume_url: '',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [currentEducation, setCurrentEducation] = useState('');
  const [currentExperience, setCurrentExperience] = useState('');
  const [currentSkill, setCurrentSkill] = useState('');
  const [uploadingResume, setUploadingResume] = useState(false);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  
  useEffect(() => {
    if (!isLoading && !isAdmin) {
      navigate('/admin/login');
      return;
    }
    
    fetchAboutData();
  }, [isAdmin, isLoading, navigate]);

  async function fetchAboutData() {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('about')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (error && error.code !== 'PGRST116') {
        // PGRST116 is the error code for no rows returned
        throw error;
      }
      
      if (data) {
        setFormData(data);
      }
    } catch (error: any) {
      toast.error(`Error fetching about data: ${error.message}`);
    } finally {
      setLoading(false);
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleResumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setResumeFile(e.target.files[0]);
    }
  };

  const uploadResume = async () => {
    if (!resumeFile) return;
    
    try {
      setUploadingResume(true);
      
      // Upload the file to Supabase storage
      const fileExt = resumeFile.name.split('.').pop();
      const fileName = `resume_${Date.now()}.${fileExt}`;
      
      const { error: uploadError } = await supabase.storage
        .from('portfolio')
        .upload(fileName, resumeFile);
        
      if (uploadError) throw uploadError;
      
      // Get public URL for the uploaded file
      const { data: urlData } = supabase.storage
        .from('portfolio')
        .getPublicUrl(fileName);
        
      if (urlData) {
        setFormData(prev => ({
          ...prev,
          resume_url: urlData.publicUrl
        }));
        
        toast.success('Resume uploaded successfully');
      }
    } catch (error: any) {
      toast.error(`Error uploading resume: ${error.message}`);
    } finally {
      setUploadingResume(false);
    }
  };

  const handleEducationKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && currentEducation.trim()) {
      e.preventDefault();
      setFormData((prev) => ({
        ...prev,
        education: [...prev.education, currentEducation.trim()]
      }));
      setCurrentEducation('');
    }
  };

  const handleExperienceKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && currentExperience.trim()) {
      e.preventDefault();
      setFormData((prev) => ({
        ...prev,
        experience: [...prev.experience, currentExperience.trim()]
      }));
      setCurrentExperience('');
    }
  };

  const handleSkillKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && currentSkill.trim()) {
      e.preventDefault();
      if (!formData.skills.includes(currentSkill.trim())) {
        setFormData((prev) => ({
          ...prev,
          skills: [...prev.skills, currentSkill.trim()]
        }));
      }
      setCurrentSkill('');
    }
  };

  const removeEducation = (itemToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      education: prev.education.filter(item => item !== itemToRemove)
    }));
  };

  const removeExperience = (itemToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      experience: prev.experience.filter(item => item !== itemToRemove)
    }));
  };

  const removeSkill = (itemToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter(item => item !== itemToRemove)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    
    try {
      const aboutData = { ...formData };
      delete aboutData.id; // Remove id for upsert operation
      
      if (formData.id) {
        // Update existing record
        const { error } = await supabase
          .from('about')
          .update(aboutData)
          .eq('id', formData.id);
          
        if (error) throw error;
      } else {
        // Insert new record
        const { error } = await supabase
          .from('about')
          .insert([aboutData]);
          
        if (error) throw error;
      }
      
      toast.success('About information saved successfully');
      fetchAboutData(); // Refresh data
    } catch (error: any) {
      toast.error(`Error saving about information: ${error.message}`);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="container max-w-5xl mx-auto py-10">
        <p>Loading about information...</p>
      </div>
    );
  }

  return (
    <div className="container max-w-5xl mx-auto py-10">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Manage About Information</h1>
        <p className="text-muted-foreground">Update your bio, skills, experience and education</p>
      </div>

      <Card>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="bio">Bio *</Label>
              <Textarea
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                required
                placeholder="Tell visitors about yourself..."
                className="min-h-[150px]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="education">Education</Label>
              <div className="flex mb-2">
                <Input 
                  id="education"
                  value={currentEducation}
                  onChange={(e) => setCurrentEducation(e.target.value)}
                  placeholder="Add education (press Enter to add)"
                  onKeyDown={handleEducationKeyDown}
                />
              </div>
              {formData.education.length > 0 && (
                <div className="space-y-2 mt-2">
                  {formData.education.map((item, index) => (
                    <div key={index} className="flex items-center justify-between bg-secondary/50 px-3 py-2 rounded-md">
                      <span>{item}</span>
                      <Button 
                        type="button" 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => removeEducation(item)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="experience">Experience</Label>
              <div className="flex mb-2">
                <Input 
                  id="experience"
                  value={currentExperience}
                  onChange={(e) => setCurrentExperience(e.target.value)}
                  placeholder="Add experience (press Enter to add)"
                  onKeyDown={handleExperienceKeyDown}
                />
              </div>
              {formData.experience.length > 0 && (
                <div className="space-y-2 mt-2">
                  {formData.experience.map((item, index) => (
                    <div key={index} className="flex items-center justify-between bg-secondary/50 px-3 py-2 rounded-md">
                      <span>{item}</span>
                      <Button 
                        type="button" 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => removeExperience(item)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="skills">Skills</Label>
              <div className="flex mb-2">
                <Input 
                  id="skills"
                  value={currentSkill}
                  onChange={(e) => setCurrentSkill(e.target.value)}
                  placeholder="Add skill (press Enter to add)"
                  onKeyDown={handleSkillKeyDown}
                />
              </div>
              {formData.skills.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.skills.map(skill => (
                    <Badge key={skill} variant="secondary" className="flex items-center gap-1">
                      {skill}
                      <Button 
                        type="button" 
                        variant="ghost" 
                        size="icon" 
                        className="h-4 w-4 p-0"
                        onClick={() => removeSkill(skill)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="resume">Resume URL</Label>
              <div className="flex items-center gap-4">
                <Input 
                  id="resume"
                  name="resume_url"
                  value={formData.resume_url}
                  onChange={handleChange}
                  placeholder="URL to your resume (PDF)"
                  className="flex-1"
                />
                {formData.resume_url && (
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm"
                    onClick={() => window.open(formData.resume_url, '_blank')}
                  >
                    View
                  </Button>
                )}
              </div>
              
              <div className="mt-4">
                <Label htmlFor="resumeUpload">Or upload a new resume</Label>
                <div className="flex items-center gap-2 mt-1">
                  <Input 
                    id="resumeUpload"
                    type="file"
                    accept=".pdf"
                    onChange={handleResumeChange}
                  />
                  <Button 
                    type="button"
                    onClick={uploadResume}
                    disabled={!resumeFile || uploadingResume}
                    className="whitespace-nowrap"
                  >
                    {uploadingResume ? 'Uploading...' : 'Upload'} <Upload className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-4 pt-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => navigate('/admin/dashboard')}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={saving}>
                {saving ? 'Saving...' : 'Save About Info'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
