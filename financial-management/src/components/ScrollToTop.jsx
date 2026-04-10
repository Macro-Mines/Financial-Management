import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * ScrollToTop - Utility component that resets the scroll position to the top
 * of the viewport whenever the route (pathname) changes.
 */
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Disable browser default scroll restoration to avoid interference
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    // Use scrollTo top on every route change
    // Using a tiny delay ensures the DOM has updated and browser isn't overriding the scroll
    const scrollHandler = () => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'instant' // Instant is better for route jumps to avoid "sliding" feel
      });
    };

    // Trigger immediately
    scrollHandler();
    
    // And again on next frame just in case
    const frameId = requestAnimationFrame(scrollHandler);
    
    return () => cancelAnimationFrame(frameId);
  }, [pathname]);

  return null;
};

export default ScrollToTop;
