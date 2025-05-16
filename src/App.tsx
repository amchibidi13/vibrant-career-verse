
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { AuthProvider } from "./contexts/AuthContext";

// Pages
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import Articles from "./pages/Articles";
import ArticleDetail from "./pages/ArticleDetail";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import { useAnalytics } from "./hooks/use-analytics";

// Admin Pages
import Login from "./pages/admin/Login";
import Dashboard from "./pages/admin/Dashboard";
import ProjectsAdmin from "./pages/admin/projects/ProjectsAdmin";
import ProjectForm from "./pages/admin/projects/ProjectForm";
import ArticlesAdmin from "./pages/admin/articles/ArticlesAdmin";
import ArticleForm from "./pages/admin/articles/ArticleForm";
import AboutAdmin from "./pages/admin/about/AboutAdmin";

// Analytics wrapper component
function AnalyticsWrapper({ children }: { children: React.ReactNode }) {
  useAnalytics();
  return <>{children}</>;
}

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AnalyticsWrapper>
            <Layout>
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/projects/:id" element={<ProjectDetail />} />
                <Route path="/articles" element={<Articles />} />
                <Route path="/articles/:id" element={<ArticleDetail />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                
                {/* Admin Routes */}
                <Route path="/admin/login" element={<Login />} />
                <Route path="/admin/dashboard" element={<Dashboard />} />
                <Route path="/admin/projects" element={<ProjectsAdmin />} />
                <Route path="/admin/projects/new" element={<ProjectForm />} />
                <Route path="/admin/projects/:id" element={<ProjectForm />} />
                <Route path="/admin/articles" element={<ArticlesAdmin />} />
                <Route path="/admin/articles/new" element={<ArticleForm />} />
                <Route path="/admin/articles/:id" element={<ArticleForm />} />
                <Route path="/admin/about" element={<AboutAdmin />} />
                
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Layout>
          </AnalyticsWrapper>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
