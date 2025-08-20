import React, { ReactNode } from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  animation?: 'fadeIn' | 'slideUp' | 'slideLeft' | 'slideRight';
  disabled?: boolean;
}

export default function AnimatedSection({ 
  children, 
  className = '', 
  animation = 'fadeIn',
  disabled = false
}: AnimatedSectionProps) {
  const { targetRef, isIntersecting } = useIntersectionObserver({
    threshold: 0.1,
    triggerOnce: true,
    disabled
  });

  // Desabilitar animações em dispositivos com preferência por movimento reduzido
  const prefersReducedMotion = typeof window !== 'undefined' && 
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (disabled || prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  const animationClasses = {
    fadeIn: isIntersecting 
      ? 'opacity-100 transform translate-y-0' 
      : 'opacity-0 transform translate-y-8',
    slideUp: isIntersecting 
      ? 'opacity-100 transform translate-y-0' 
      : 'opacity-0 transform translate-y-12',
    slideLeft: isIntersecting 
      ? 'opacity-100 transform translate-x-0' 
      : 'opacity-0 transform translate-x-8',
    slideRight: isIntersecting 
      ? 'opacity-100 transform translate-x-0' 
      : 'opacity-0 transform -translate-x-8'
  };

  return (
    <div
      ref={targetRef}
      className={`transition-all duration-500 ease-out ${animationClasses[animation]} ${className}`}
    >
      {children}
    </div>
  );
}
