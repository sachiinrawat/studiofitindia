import { useEffect, useRef } from "react";

/**
 * useAutoRefresh
 *
 * Automatically reloads the page when the user returns to a browser tab
 * that has been hidden (background / minimised) for longer than `thresholdMs`.
 *
 * This guarantees that after a new deployment, any user who was away from the
 * tab for at least 1 minute will silently get the fresh version the moment
 * they come back — no manual refresh needed.
 *
 * @param {number} thresholdMs  Inactivity duration before reload is triggered.
 *                              Default: 60 000 ms (1 minute).
 */
const useAutoRefresh = (thresholdMs = 60_000) => {
  const hiddenAtRef = useRef(null);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // Tab just went to background — record the time
        hiddenAtRef.current = Date.now();
      } else {
        // Tab just became visible again
        if (hiddenAtRef.current !== null) {
          const elapsed = Date.now() - hiddenAtRef.current;
          if (elapsed >= thresholdMs) {
            // User was away long enough — reload to pick up any new deployment
            window.location.reload();
          }
          hiddenAtRef.current = null;
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [thresholdMs]);
};

export default useAutoRefresh;
