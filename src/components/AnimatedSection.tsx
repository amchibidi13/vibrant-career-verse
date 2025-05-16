
import { useRef, useEffect, useState, ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  animation?: 'fade-in' | 'slide-up' | 'slide-in';
}

export function AnimatedSection({
  children,
  className,
  delay = 0,
  animation = 'fade-in'
}: AnimatedSectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, delay);
          observer.unobserve(entry.target);
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1,
      }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [delay]);

  const animationClasses = {
    'fade-in': 'transition-opacity duration-1000 opacity-0 data-[visible=true]:opacity-100',
    'slide-up': 'transition-all duration-1000 opacity-0 translate-y-10 data-[visible=true]:opacity-100 data-[visible=true]:translate-y-0',
    'slide-in': 'transition-all duration-1000 opacity-0 -translate-x-10 data-[visible=true]:opacity-100 data-[visible=true]:translate-x-0',
  };

  return (
    <div 
      ref={sectionRef} 
      className={cn(animationClasses[animation], className)}
      data-visible={isVisible}
    >
      {children}
    </div>
  );
}
