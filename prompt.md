# Studio FIT India — SEO Problem & Solution PRD

**Prepared after full code audit of:** `github.com/sachiinrawat/studiofitindia`
**Date:** June 2026

---

## Context

Your site is a **React + Vite SPA** running inside a **WordPress theme** on Hostinger. When a page loads, WordPress serves a PHP shell, React boots via JavaScript, then renders the UI. Google crawls your URLs — but what it *actually* reads is very different from what users see.

---

## Problem 1 — Crawlable HTML is hidden with `display:none`

**File:** `index.html` (the Vite build)

**What's happening:**
You added fallback SEO content blocks as a smart workaround, but wrapped them in `style="display:none"`. Google's documentation explicitly states it **ignores** `display:none` content during indexing. It also sees this as cloaking-adjacent, which can trigger ranking penalties.

```html
<!-- THIS IS INVISIBLE TO GOOGLE -->
<div class="seo-content" style="display: none">
  <h2>India's Leading Online Fitness Studio</h2>
  ...
</div>
```

**What Google sees on your homepage:** Just the hero shell with one H1 and a paragraph. No programs, no pricing, no proof of relevance.

**Fix:**
Remove `display:none`. Use CSS to visually hide it for users after React loads, **not** `display:none`. The standard approach is:

```css
/* Applied by React after it mounts: */
.seo-content { position: absolute; left: -9999px; }
```

Or better — since you already have `sfi_get_crawlable_html()` in `functions.php` (which is excellent), make the React `index.html` static shell content visible to crawlers by default and hidden only after JS runs.

---

## Problem 2 — Canonical tag hardcoded to homepage on every page

**File:** `studiofitindia/dist/index.html`

**What's happening:**
Every single page on your site has this in its static HTML head:

```html
<link rel="canonical" href="https://studiofitindia.com/" />
```

This tells Google: *"This page is a duplicate of the homepage."* Google then deindexes or ignores all inner pages — `/pricing`, `/yoga-classes-online`, `/blog/*` — because they self-declare as duplicates of `/`.

Your `SEO.jsx` tries to set the correct canonical using `window.location.href`, but that only runs client-side after JS loads. The static HTML that Googlebot reads first always has the homepage canonical.

**Fix:**
The canonical in `index.html` should either be removed entirely, or your `functions.php` already has `studiofitindia_seo_meta_tags()` that outputs the correct per-route canonical — verify it is running **before** `wp_head()` outputs anything and that WordPress's own canonical filter is suppressed (you already have `studiofitindia_disable_canonical_redirect` — confirm it's working).

---

## Problem 3 — SEO content in `functions.php` is not being rendered correctly

**File:** `theme_build/functions.php` — `sfi_get_crawlable_html()`

**What's happening:**
You have a very well-written `sfi_get_crawlable_html()` function in PHP that returns full, rich HTML for every route — home, pricing, programs, all 6 program landing pages, blog posts, reviews, etc. This is the right idea. However, `front-page.php` renders it inside `<div id="root">` and React overwrites it on mount, which means:

1. When React boots, it calls `ReactDOM.createRoot(document.getElementById('root')).render(...)` which **deletes** the PHP HTML.
2. If `#root` is the React mount point, the crawlable content disappears the moment JS runs.
3. More critically — for routes other than `/` (e.g. `/pricing`, `/yoga-classes-online`), WordPress may be loading `index.php` (the fallback template) instead of `front-page.php`, meaning the crawlable HTML function may not be called at all.

**Fix:**
Render crawlable HTML in a **separate `<div>` outside `#root`**, and use JavaScript to remove it after React mounts. This way crawlers always see the content, and users never see the duplicate:

```php
<!-- index.php / front-page.php -->
<div id="root"></div>
<div id="sfi-seo-content">
  <?php echo sfi_get_crawlable_html(); ?>
</div>

<script>
  // Remove after React mounts so users don't see duplicate content
  window.addEventListener('DOMContentLoaded', function() {
    var el = document.getElementById('sfi-seo-content');
    if (el) setTimeout(function(){ el.style.display = 'none'; }, 100);
  });
</script>
```

---

## Problem 4 — `.htaccess` routes to `index.php` instead of `index.html`

**File:** `theme_build/.htaccess`

**What's happening:**
```apache
RewriteRule . /index.php [L]
```

This is WordPress's default routing — it sends all unmatched URLs to `index.php`. That's correct for a WordPress site. But the issue is that `index.php` (your React template) must then correctly handle every SPA route and return a 200 status with the right HTML. If WordPress's template loading logic has any gaps, crawlers hitting `/pricing` or `/yoga-classes-online` directly could get a 404 or wrong template.

You already handle this in `functions.php` with `sfi_is_spa_route()` — but this needs to be verified live. A single route failing silently costs you an indexed page.

**Fix:**
Test every route using Google Search Console's URL Inspection tool. Specifically test:
- `https://studiofitindia.com/yoga-classes-online`
- `https://studiofitindia.com/pricing`
- `https://studiofitindia.com/blog/hiit-training-for-weight-loss`

If any returns a 404 or empty page, add explicit WordPress rewrite rules for that path.

---

## Problem 5 — Sitemap has a dead URL (`/fat-to-fit`)

**File:** `studiofitindia/public/sitemap.xml`

**What's happening:**
```xml
<loc>https://studiofitindia.com/fat-to-fit</loc>
```

This URL is in your sitemap but has **no route in `App.jsx`** and is **not handled in `sfi_is_spa_route()`** in `functions.php`. Google crawls it, gets a blank/error page, and marks it as a **soft 404** — wasting crawl budget and signaling low site quality.

**Fix:**
Either:
- Add a `/fat-to-fit` route in `App.jsx`, or
- Remove it from the sitemap immediately.

---

## Problem 6 — Blog post schema is generic for all posts

**File:** `theme_build/functions.php` — `sfi_get_structured_data()`

**What's happening:**
The function currently only returns a generic `LocalBusiness` schema regardless of the current route. For blog posts, the structured data should be `Article` schema with `headline`, `author`, `datePublished`, and `image`. This is a missed opportunity for Google's rich results (article carousels, knowledge panels).

**Fix:**
Add route-specific schema in `sfi_get_structured_data()` for blog posts:

```php
if (preg_match('#^/blog/(.+)$#', $path, $matches)) {
  return '<script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "' . $cfg['title'] . '",
    "author": { "@type": "Organization", "name": "Studio FIT India" },
    "publisher": { "@type": "Organization", "name": "Studio FIT India", "url": "https://studiofitindia.com" },
    "datePublished": "2024-10-12",
    "url": "https://studiofitindia.com' . $path . '"
  }
  </script>';
}
```

---

## What You Got Right (Do Not Change)

| What | Why it's good |
|---|---|
| `sfi_get_crawlable_html()` in PHP | Correct pattern — unique rich HTML per route served server-side |
| `sfi_get_page_config()` in PHP | Per-route title, description, keywords, canonical — exactly what's needed |
| `studiofitindia_seo_meta_tags()` | PHP-level meta tags so Google sees them without waiting for JS |
| Schema.org on homepage | `LocalBusiness` + `FitnessCenter` with address, phone, offers — solid |
| URL structure | `/yoga-classes-online`, `/hiit-training-online` etc. are keyword-rich and correct |
| `robots.txt` | Clean, allows all crawlers, links to sitemap |
| Blog content | 5 blog posts with real content, correct slugs, internal linking |
| `sfi_sitemap_output()` | Dynamic PHP sitemap that rebuilds on every request — great |

---

## Priority Order to Fix

| # | Fix | Effort | SEO Impact |
|---|---|---|---|
| 1 | Move crawlable HTML outside `#root`, remove `display:none` | 30 min | Very High |
| 2 | Remove or fix the hardcoded `canonical` in `index.html` | 10 min | Very High |
| 3 | Remove `/fat-to-fit` from sitemap | 5 min | Medium |
| 4 | Test all routes via GSC URL Inspection tool | 1 hour | High |
| 5 | Add `Article` schema for blog post routes | 1 hour | Medium |
| 6 | Submit updated sitemap to Google Search Console | 5 min | Medium |

---

## One-Line Summary

Your PHP backend (`functions.php`) is well-built for SEO. Your React frontend is fighting it. The fix is not a rewrite — it's making sure the PHP-rendered HTML is **visible to Google** and not overwritten or hidden before the crawler has a chance to read it.