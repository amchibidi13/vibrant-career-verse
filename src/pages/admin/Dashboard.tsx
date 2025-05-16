
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { ChevronRight, FileText, FolderKanban, UserCircle } from 'lucide-react';

export default function Dashboard() {
  const { isAdmin, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !isAdmin) {
      navigate('/admin/login');
    }
  }, [isAdmin, isLoading, navigate]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="container px-6 max-w-7xl mx-auto py-10">
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage your portfolio content</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FolderKanban className="h-5 w-5 mr-2" />
                Projects
              </CardTitle>
              <CardDescription>Manage your portfolio projects</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Add, edit, delete and reorder your projects</p>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <Link to="/admin/projects">
                  Manage Projects <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="h-5 w-5 mr-2" />
                Articles
              </CardTitle>
              <CardDescription>Manage your articles</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Add, edit, delete and reorder your articles</p>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <Link to="/admin/articles">
                  Manage Articles <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <UserCircle className="h-5 w-5 mr-2" />
                About
              </CardTitle>
              <CardDescription>Manage your personal information</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Update your bio, skills, experience and education</p>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <Link to="/admin/about">
                  Manage About <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
