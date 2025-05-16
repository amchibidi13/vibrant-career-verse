
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { trackPageView } from '@/lib/analytics';

export function useAnalytics() {
  const location = useLocation();
  
  useEffect(() => {
    // Track page view on route change
    trackPageView(location.pathname);
    
    // Add metadata for admin vs frontend pages
    const isAdminPage = location.pathname.startsWith('/admin');
    document.body.setAttribute('data-page-type', isAdminPage ? 'admin' : 'frontend');
    
    return () => {
      document.body.removeAttribute('data-page-type');
    };
  }, [location]);
}
