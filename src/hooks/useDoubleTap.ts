import { useEffect, useRef, useCallback } from 'react';

interface DoubleTapOptions {
  onDoubleTap: () => void;
  maxDelay?: number;
}

export function useDoubleTap(options: DoubleTapOptions) {
  const { onDoubleTap, maxDelay = 300 } = options;
  
  const lastTap = useRef<number>(0);
  const timer = useRef<number | null>(null);

  const handleTap = useCallback(() => {
    const now = Date.now();
    const timeDiff = now - lastTap.current;
    
    if (timeDiff < maxDelay && timeDiff > 0) {
      if (timer.current) {
        window.clearTimeout(timer.current);
        timer.current = null;
      }
      onDoubleTap();
    } else {
      lastTap.current = now;
      // Clear previous timeout
      if (timer.current) {
        window.clearTimeout(timer.current);
      }
      // Set new timeout to reset lastTap
      timer.current = window.setTimeout(() => {
        lastTap.current = 0;
      }, maxDelay);
    }
  }, [maxDelay, onDoubleTap]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (timer.current) {
        window.clearTimeout(timer.current);
      }
    };
  }, []);

  return {
    onTap: handleTap,
  };
}