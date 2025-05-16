
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { Laptop, LogOut, Menu, X } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export function AdminNav() {
  const { isAdmin, signOut, user } = useAuth();
  const location = useLocation();
  const [isAdminPage, setIsAdminPage] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setIsAdminPage(location.pathname.startsWith('/admin') && location.pathname !== '/admin/login');
  }, [location]);

  if (!isAdmin || !isAdminPage) return null;

  return (
    <div className="bg-primary/10 border-b">
      <div className="container mx-auto px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/admin/dashboard" className="font-medium flex items-center">
            <Laptop className="mr-2 h-5 w-5" />
            Admin Panel
          </Link>
          
          {/* Desktop nav */}
          <nav className="hidden md:flex items-center space-x-4">
            <Link to="/admin/projects" className="text-sm hover:text-primary transition">
              Projects
            </Link>
            <Link to="/admin/articles" className="text-sm hover:text-primary transition">
              Articles
            </Link>
            <Link to="/admin/about" className="text-sm hover:text-primary transition">
              About
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" asChild>
            <Link to="/" target="_blank">
              View Site
            </Link>
          </Button>
          
          {/* Mobile menu */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold">Admin Menu</h2>
                  <Button variant="ghost" size="icon" onClick={() => setOpen(false)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                
                <nav className="flex flex-col space-y-4">
                  <Link 
                    to="/admin/dashboard" 
                    className="p-2 hover:bg-accent rounded-md transition"
                    onClick={() => setOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Link 
                    to="/admin/projects" 
                    className="p-2 hover:bg-accent rounded-md transition"
                    onClick={() => setOpen(false)}
                  >
                    Projects
                  </Link>
                  <Link 
                    to="/admin/articles" 
                    className="p-2 hover:bg-accent rounded-md transition"
                    onClick={() => setOpen(false)}
                  >
                    Articles
                  </Link>
                  <Link 
                    to="/admin/about" 
                    className="p-2 hover:bg-accent rounded-md transition"
                    onClick={() => setOpen(false)}
                  >
                    About
                  </Link>
                </nav>
                
                <div className="mt-auto">
                  <Button 
                    variant="destructive" 
                    className="w-full"
                    onClick={() => {
                      signOut();
                      setOpen(false);
                    }}
                  >
                    <LogOut className="mr-2 h-4 w-4" /> Sign Out
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
          
          {/* User dropdown - desktop only */}
          <div className="hidden md:block">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  {user?.email?.split('@')[0] || 'User'} <span className="ml-2">▼</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Admin Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/admin/dashboard">Dashboard</Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={signOut} className="text-destructive">
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </div>
  );
}
