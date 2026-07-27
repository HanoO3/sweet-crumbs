// Fallback SVG data URL for bakery delicacies
export const DEFAULT_PASTRY_IMAGE = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="400" height="300"><rect width="400" height="300" fill="%23FFE5F0"/><circle cx="200" cy="140" r="80" fill="%23FF7FB4"/><circle cx="200" cy="140" r="28" fill="%23FFFDFE"/><path d="M150 140 C150 180 250 180 250 140" stroke="%23E05B91" stroke-width="6" fill="none" stroke-linecap="round"/><circle cx="170" cy="110" r="7" fill="%2300C8D7"/><circle cx="230" cy="105" r="7" fill="%23FFF3C4"/><circle cx="200" cy="85" r="7" fill="%23FFFFFF"/><circle cx="150" cy="130" r="6" fill="%23FFF3C4"/><circle cx="250" cy="135" r="6" fill="%2300C8D7"/><text x="50%" y="245" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-weight="bold" font-size="20" fill="%232C1810">Sweet Crumbs Delicacy</text></svg>`;

export const getImageUrl = (img) => {
  if (!img) return DEFAULT_PASTRY_IMAGE;
  if (typeof img !== 'string') return DEFAULT_PASTRY_IMAGE;
  
  if (img.startsWith('http://') || img.startsWith('https://') || img.startsWith('data:')) {
    return img;
  }
  
  const envApi = import.meta.env.VITE_API_URL;
  let baseUrl = '';
  
  if (envApi) {
    baseUrl = envApi.replace(/\/api\/?$/, '');
  } else if (typeof window !== 'undefined' && window.location.hostname !== 'localhost') {
    baseUrl = window.location.origin;
  } else {
    baseUrl = 'http://localhost:5000';
  }
  
  const cleanPath = img.startsWith('/') ? img : `/${img}`;
  return `${baseUrl}${cleanPath}`;
};

export const handleImageError = (e, customFallback = DEFAULT_PASTRY_IMAGE) => {
  if (e.currentTarget.src !== customFallback) {
    e.currentTarget.onerror = null;
    e.currentTarget.src = customFallback;
  }
};
