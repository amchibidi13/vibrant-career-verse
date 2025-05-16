// Simple analytics implementation
// In a production environment, replace this with actual Google Analytics or other tracking solution

export function trackPageView(path: string) {
  // In a real implementation, this would send data to Google Analytics
  if (typeof window !== 'undefined') {
    console.log(`[Analytics] Page view: ${path}`);
    localStorage.setItem('last_page_view', path);
    // Google Analytics implementation would go here
    // Example: window.gtag('config', 'GA-MEASUREMENT-ID', { page_path: path });
  }
}

export function trackEvent(category: string, action: string, label?: string, value?: number) {
  // In a real implementation, this would send event data to Google Analytics
  if (typeof window !== 'undefined') {
    console.log(`[Analytics] Event: ${category} - ${action} - ${label || ''} - ${value || ''}`);
    // Google Analytics implementation would go here
    // Example: window.gtag('event', action, { event_category: category, event_label: label, value: value });
  }
}

// Admin events
export function trackAdminAction(action: string, details?: string) {
  trackEvent('Admin', action, details);
  
  // Store admin actions in localStorage for debugging/audit
  const adminActions = JSON.parse(localStorage.getItem('admin_actions') || '[]');
  adminActions.push({
    action,
    details,
    timestamp: new Date().toISOString()
  });
  
  // Keep only last 100 actions
  if (adminActions.length > 100) {
    adminActions.shift();
  }
  
  localStorage.setItem('admin_actions', JSON.stringify(adminActions));
}
