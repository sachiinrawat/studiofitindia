import { useEffect, useRef } from "react";

/**
 * useAutoRefresh — Version-based instant auto-refresh
 *
 * How it works:
 * 1. On every `npm run build`, Vite writes a `dist/version.json` containing
 *    the current build timestamp: { "buildTime": 1720000000000 }
 *
 * 2. This hook fetches `/version.json` from the live server:
 *    - Once on page load (catches users who have a cached old tab open)
 *    - Every time the user returns to the tab (catches background tabs)
 *
 * 3. If the server's buildTime is newer than what was loaded → instant reload.
 *    If same version → no reload (prevents infinite loops).
 *
 * Result: Every user always sees the latest pricing, trainers, and content
 * the moment they visit or return to the site — with zero manual refresh needed.
 */

// Capture the build time at the moment this JS bundle was first executed.
// After a reload, the new bundle will have a different BUILD_TIME baked in.
let serverBuildTime = null;

const fetchVersion = async () => {
  try {
    // cache-busting query param ensures we never get a stale cached version.json
    const res = await fetch(`/version.json?t=${Date.now()}`, {
      cache: "no-store",
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data?.buildTime ?? null;
  } catch {
    return null;
  }
};

const checkAndRefresh = async () => {
  const latestBuildTime = await fetchVersion();
  if (!latestBuildTime) return; // network error — skip silently

  if (serverBuildTime === null) {
    // First check: store the current server version as baseline
    serverBuildTime = latestBuildTime;
    return;
  }

  if (latestBuildTime > serverBuildTime) {
    // A newer build is available — reload instantly
    window.location.reload();
  }
};

const useAutoRefresh = () => {
  const checkedOnMount = useRef(false);

  useEffect(() => {
    // ── Check 1: On page load ──────────────────────────────────────────
    // Runs once per mount. If the server has a newer version than what's
    // cached in this tab, the page reloads immediately.
    if (!checkedOnMount.current) {
      checkedOnMount.current = true;
      checkAndRefresh();
    }

    // ── Check 2: On tab focus / return ────────────────────────────────
    // Every time the user comes back to this tab, re-check the server version.
    // Handles: switching back from another app, returning after hours, etc.
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        checkAndRefresh();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);
};

export default useAutoRefresh;
