import { useState, useEffect } from "react";

/**
 * Returns the full asset URL using the WordPress theme URL injected
 * by functions.php via window.siteSettings.themeUrl.
 * Falls back to the bare path if siteSettings is not yet available
 * (e.g. during local development).
 */
export const getAssetUrl = (path) => {
    // If it's already an absolute URL (like Cloudinary), return it as-is
    if (path.startsWith("http") || path.startsWith("data:")) {
        if (path.includes("res.cloudinary.com") && !path.includes("f_auto,q_auto")) {
            return path.replace("/upload/", "/upload/f_auto,q_auto/");
        }
        return path;
    }

    if (typeof window !== "undefined" && window.siteSettings?.themeUrl) {
        const baseUrl = window.siteSettings.themeUrl;
        const cleanPath = path.startsWith("/") ? path : `/${path}`;
        return `${baseUrl}${cleanPath}`;
    }
    return path;
};

/**
 * React hook version of getAssetUrl.
 * Re-evaluates after mount (and again after 300ms) so that if
 * window.siteSettings.themeUrl is injected by WordPress slightly
 * after React's first paint, images still resolve correctly.
 */
export const useAssetUrl = (path) => {
    const [url, setUrl] = useState(() => getAssetUrl(path));

    useEffect(() => {
        // Immediate re-check after mount
        setUrl(getAssetUrl(path));

        // Delayed re-check — catches WordPress themeUrl injected after React mounts
        const timer = setTimeout(() => {
            setUrl(getAssetUrl(path));
        }, 300);

        return () => clearTimeout(timer);
    }, [path]);

    return url;
};
