// Utility functions for image optimization

export const getOptimizedImageUrl = (url: string, width?: number, height?: number, quality = 80) => {
  // For Pexels images, we can add query parameters for optimization
  if (url.includes('pexels.com')) {
    const urlObj = new URL(url);
    if (width) urlObj.searchParams.set('w', width.toString());
    if (height) urlObj.searchParams.set('h', height.toString());
    urlObj.searchParams.set('auto', 'compress');
    urlObj.searchParams.set('cs', 'tinysrgb');
    
    // Detectar densidade de pixel do dispositivo
    const dpr = typeof window !== 'undefined' ? Math.min(window.devicePixelRatio || 1, 2) : 1;
    urlObj.searchParams.set('dpr', dpr.toString());
    
    // Ajustar qualidade baseado no tipo de conexão
    if (typeof navigator !== 'undefined' && 'connection' in navigator) {
      const connection = (navigator as any).connection;
      if (connection && connection.effectiveType) {
        if (connection.effectiveType === '2g' || connection.effectiveType === 'slow-2g') {
          quality = Math.max(40, quality - 30);
        } else if (connection.effectiveType === '3g') {
          quality = Math.max(50, quality - 20);
        }
      }
    }
    
    urlObj.searchParams.set('q', quality.toString());
    return urlObj.toString();
  }
  return url;
};

export const preloadImage = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = src;
  });
};

export const preloadCriticalImages = () => {
  const criticalImages = [
    'https://images.pexels.com/photos/4050315/pexels-photo-4050315.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1',
    'https://images.pexels.com/photos/1008155/pexels-photo-1008155.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1',
    'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&dpr=1'
  ];
  
  criticalImages.forEach(src => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;
    document.head.appendChild(link);
  });
};

export const generatePlaceholder = (width: number, height: number, color = '#f3f4f6') => {
  return `data:image/svg+xml;base64,${btoa(
    `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="${width}" height="${height}" fill="${color}"/>
    </svg>`
  )}`;
};
