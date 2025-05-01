
/**
 * Platform detection utilities for mobile/web adaptation
 */

// Detect iOS platform
export const isIOS = (): boolean => {
  return /iPad|iPhone|iPod/.test(navigator.userAgent) || 
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
};

// Detect Android platform
export const isAndroid = (): boolean => {
  return /Android/.test(navigator.userAgent);
};

// Check if running as a mobile app (via Capacitor)
export const isMobileApp = (): boolean => {
  return window.location.href.includes('capacitor://') || 
         isAndroid() || 
         isIOS();
};

// Check if running on a mobile device (could be browser or app)
export const isMobileDevice = (): boolean => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
         (window.innerWidth <= 768);
};

// Get the safe area insets for notched devices
export const getSafeAreaInsets = (): {top: string, bottom: string} => {
  if (!isIOS()) {
    return { top: '0px', bottom: '0px' };
  }
  
  return { 
    top: 'env(safe-area-inset-top, 0px)',
    bottom: 'env(safe-area-inset-bottom, 0px)'
  };
};
