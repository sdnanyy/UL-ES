import React, { useState, useRef, useEffect } from 'react';
import { getOptimizedImageUrl, generatePlaceholder } from '../utils/imageOptimization';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  placeholder?: string;
  width?: number;
  height?: number;
  quality?: number;
  priority?: boolean;
}

export default function LazyImage({ 
  src, 
  alt, 
  className = '', 
  placeholder,
  width,
  height,
  quality = 80,
  priority = false
}: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  
  // Para mobile, usar qualidade menor e tamanhos otimizados
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const mobileQuality = isMobile ? Math.max(60, quality - 20) : quality;
  const mobileWidth = isMobile && width ? Math.min(width, 400) : width;
  const mobileHeight = isMobile && height ? Math.min(height, 300) : height;
  
  const optimizedSrc = getOptimizedImageUrl(src, mobileWidth, mobileHeight, mobileQuality);
  const defaultPlaceholder = width && height 
    ? generatePlaceholder(width, height)
    : 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMSIgaGVpZ2h0PSIxIiB2aWV3Qm94PSIwIDAgMSAxIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiNmM2Y0ZjYiLz48L3N2Zz4=';

  useEffect(() => {
    // Para imagens prioritárias, carregar imediatamente
    if (priority) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { 
        threshold: 0.1,
        rootMargin: '50px' // Carregar imagens 50px antes de aparecerem
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [priority]);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Placeholder */}
      <div 
        className={`absolute inset-0 bg-gray-200 animate-pulse transition-opacity duration-300 ${
          isLoaded ? 'opacity-0' : 'opacity-100'
        }`}
      />
      
      {/* Actual image */}
      <img
        ref={imgRef}
        src={isInView ? optimizedSrc : placeholder || defaultPlaceholder}
        alt={alt}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        onLoad={() => setIsLoaded(true)}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        width={mobileWidth || width}
        height={mobileHeight || height}
      />
    </div>
  );
}
