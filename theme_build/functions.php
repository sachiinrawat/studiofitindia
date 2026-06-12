<?php
// =====================================================================
// SEO: REDIRECTS (301 Moved Permanently)
// =====================================================================
function studiofitindia_handle_redirects() {
    $path = parse_url($_SERVER['REQUEST_URI'] ?? '', PHP_URL_PATH);
    $path = rtrim($path, '/') ?: '/';

    // Catch legacy /prices-page and redirect to canonical /pricing
    if ($path === '/prices-page') {
        wp_redirect(home_url('/pricing'), 301);
        exit;
    }
}
add_action('template_redirect', 'studiofitindia_handle_redirects');

// =====================================================================
// SPA ROUTES: Helper to detect if a path is an SPA route
// =====================================================================
function sfi_is_spa_route($path) {
    $path = rtrim($path, '/') ?: '/';
    
    // Core dynamic pages from our config
    $pages = array(
        '/', '/pricing', '/programs', '/about', '/contact', '/blog',
        '/schedule', '/reviews', 
        '/yoga-classes-online', '/hiit-training-online',
        '/zumba-classes-online', '/strength-training-online',
        '/weight-loss-program-online', '/personal-training-online',
        '/privacy-policy', '/terms-and-condition', '/shipping-policy',
        '/cancellation-and-refund'
    );
    
    if (in_array($path, $pages)) {
        return true;
    }
    
    // Legacy / typo redirects or variations
    $aliases = array();
    if (in_array($path, $aliases)) {
        return true;
    }

    // Blog posts
    if (preg_match('#^/blog(/.*)?$#', $path)) {
        return true;
    }
    
    return false;
}

// =====================================================================
// SPA ROUTES: Explicitly register routes in WordPress rewrite table
// This prevents 404s at the server/engine level for bots
// =====================================================================
function studiofitindia_add_spa_rewrite_rules() {
    $spa_paths = array(
        'pricing', 'programs', 'about', 'contact', 'schedule', 'reviews', 'blog',
        'yoga-classes-online', 'hiit-training-online',
        'zumba-classes-online', 'strength-training-online',
        'weight-loss-program-online', 'personal-training-online',
        'privacy-policy', 'terms-and-condition', 'shipping-policy',
        'cancellation-and-refund'
    );

    foreach ($spa_paths as $path) {
        add_rewrite_rule('^' . $path . '/?$', 'index.php', 'top');
    }

    // Dynamic catch-all for blog posts
    add_rewrite_rule('^blog(/.*)?$', 'index.php', 'top');
}
add_action('init', 'studiofitindia_add_spa_rewrite_rules');

// =====================================================================
// SPA ROUTES: Programmatic Permalink Flush
// Forces the server to "Save Changes" and recognize new routes
// =====================================================================
function studiofitindia_force_flush_rules() {
    if (get_option('sfi_rewrite_flushed_v4') !== 'done') {
        studiofitindia_add_spa_rewrite_rules();
        flush_rewrite_rules(true); // true = hard flush .htaccess if possible
        update_option('sfi_rewrite_flushed_v4', 'done');
    }
}
add_action('init', 'studiofitindia_force_flush_rules', 20);

// =====================================================================
// SPA ROUTES: Prevent WordPress 404 for React SPA routes
// =====================================================================
function studiofitindia_spa_routes() {
    $path = parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH);
    
    if (sfi_is_spa_route($path)) {
        global $wp_query;
        $wp_query->is_404 = false;
        $wp_query->is_singular = true; // Pretend it's a page
        status_header(200);
    }
}
add_action('template_redirect', 'studiofitindia_spa_routes', 1); // Run as early as possible

// =====================================================================
// SPA ROUTES: Disable WordPress Canonical Redirect Guessing
// Prevents WP from forcefully redirecting /pricing to /prices-page
// =====================================================================
function studiofitindia_disable_canonical_redirect($redirect_url) {
    $path = parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH);
    if (sfi_is_spa_route($path)) {
        return false;
    }
    return $redirect_url;
}
add_filter('redirect_canonical', 'studiofitindia_disable_canonical_redirect', 10, 1);

// =====================================================================
// SPA ROUTES: Prevent 404 for SPA routes (Pre-handle filter)
// =====================================================================
function studiofitindia_pre_handle_404($preempt, $wp_query) {
    if ($preempt) return $preempt;
    
    $path = parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH);
    
    if (sfi_is_spa_route($path)) {
        $wp_query->is_404 = false;
        $wp_query->is_singular = true;
        status_header(200);
        return true;
    }
    
    return $preempt;
}
add_filter('pre_handle_404', 'studiofitindia_pre_handle_404', 10, 2);

// =====================================================================
// ASSET ENQUEUING
// =====================================================================
function studiofitindia_enqueue_scripts() {
  $theme_dir = get_template_directory();
  $theme_uri = get_template_directory_uri();

  // Dynamically find the CSS file hash
  $css_files = glob($theme_dir . '/assets/index--_sENOfy.css');
  $css_path = !empty($css_files) ? $css_files[0] : '';
  $css_uri  = !empty($css_path) ? $theme_uri . '/assets/' . basename($css_path) : '';
  $css_ver  = !empty($css_path) && file_exists($css_path) ? filemtime($css_path) : '1.0.0';
  
  if ($css_uri) {
    wp_enqueue_style('studiofitindia-style-main', $css_uri, array(), $css_ver);
  }

  // Dynamically find the JS file hash
  $js_files = glob($theme_dir . '/assets/index-B0e-z27c.js');
  $js_path = !empty($js_files) ? $js_files[0] : '';
  $js_uri  = !empty($js_path) ? $theme_uri . '/assets/' . basename($js_path) : '';
  $js_ver  = !empty($js_path) && file_exists($js_path) ? filemtime($js_path) : '1.0.0';

  if ($js_uri) {
    wp_enqueue_script('studiofitindia-app', $js_uri, array(), $js_ver, true);
  }

  // Pass PHP variables to JS
  wp_localize_script('studiofitindia-app', 'siteSettings', array(
    'themeUrl' => $theme_uri,
    'siteUrl'  => home_url(),
  ));
}
add_action('wp_enqueue_scripts', 'studiofitindia_enqueue_scripts');

// =====================================================================
// PERFORMANCE: RESOURCE HINTS
// =====================================================================
function studiofitindia_resource_hints() {
  echo '<link rel="preconnect" href="https://www.youtube.com">' . "\n";
  echo '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>' . "\n";
  echo '<link rel="dns-prefetch" href="https://www.youtube.com">' . "\n";
  echo '<link rel="dns-prefetch" href="https://fonts.googleapis.com">' . "\n";
  echo '<link rel="dns-prefetch" href="https://api.whatsapp.com">' . "\n";
  echo '<link rel="dns-prefetch" href="https://rzp.io">' . "\n";
}
add_action('wp_head', 'studiofitindia_resource_hints', 1);

// =====================================================================
// PERFORMANCE: BROWSER CACHE HEADERS FOR STATIC ASSETS
// =====================================================================
function studiofitindia_add_cache_headers() {
  if (is_admin()) return;
  $uri = $_SERVER['REQUEST_URI'] ?? '';
  if (preg_match('/\.(?:js|css|woff2?|ttf|eot|png|jpg|jpeg|gif|svg|webp|ico)$/', $uri)) {
    header('Cache-Control: public, max-age=31536000, immutable');
  }
}
add_action('send_headers', 'studiofitindia_add_cache_headers');

// =====================================================================
// ADD type="module" TO REACT SCRIPT
// =====================================================================
function studiofitindia_add_module_type($tag, $handle, $src) {
  if ('studiofitindia-app' !== $handle) {
    return $tag;
  }
  $tag = preg_replace('/type=[\'"]text\/javascript[\'"]/', '', $tag);
  return str_replace('<script ', '<script type="module" crossorigin ', $tag);
}
add_filter('script_loader_tag', 'studiofitindia_add_module_type', 10, 3);


// =====================================================================
// ROUTE-AWARE SEO: Get page config based on current URL path
// =====================================================================
function sfi_get_page_config() {
  $path = parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH);
  $path = rtrim($path, '/') ?: '/';

  $pages = array(
    '/' => array(
      'title'       => 'Online Fitness Classes in India — Live Yoga, HIIT, Zumba | Studio FIT India',
      'description' => 'Join India\'s #1 online live fitness classes — Yoga, HIIT, Zumba, Strength Training & Personal Training. Certified coaches, flexible timings. Starting ₹1,499/month. Book a trial at just ₹1 today!',
      'keywords'    => 'online fitness classes India, live yoga classes India, online live yoga classes, live online fitness sessions, studio fit india, online gym India',
    ),
    '/pricing' => array(
      'title'       => 'Pricing & Membership Plans | Studio FIT India — Starting ₹1,499/Month',
      'description' => 'View all Studio FIT India membership plans. Starter at ₹1,499 | Standard at ₹2,900 | PRO at ₹4,600 | Elite at ₹6,500 | 1 Month Transformation at ₹2,499 | Transformation Elite at ₹7,900. Also offering 1-on-1 Personal Training starting at ₹16,000.',
      'keywords'    => 'studio fit india pricing, online fitness class price India, yoga class subscription India, monthly fitness plan India, personal training price India',
    ),
    '/programs' => array(
      'title'       => 'Online Fitness Programs | Yoga, HIIT, Zumba & More | Studio FIT India',
      'description' => 'Explore Studio FIT India\'s online fitness programs: Yoga, HIIT, Zumba, Strength Training, Pilates, Weight Loss & Personal Training. All classes are live with certified coaches.',
      'keywords'    => 'online yoga classes, HIIT training online India, zumba classes online, strength training online, pilates online India',
    ),
    '/yoga-classes-online' => array(
      'title'       => 'Online Yoga Classes India — Live Yoga Sessions | Studio FIT India',
      'description' => 'Join live online yoga classes in India with certified yoga instructors. Hatha, Ashtanga, Power Yoga, Pranayama & Meditation. Morning & evening batches available.',
      'keywords'    => 'online yoga classes India, live yoga classes, yoga from home India, hatha yoga online, power yoga online',
    ),
    '/hiit-training-online' => array(
      'title'       => 'Online HIIT Training India — Live HIIT Classes | Studio FIT India',
      'description' => 'Join live HIIT training classes online in India. Burn fat faster with High-Intensity Interval Training from certified coaches. Flexible morning & evening batches.',
      'keywords'    => 'HIIT training online India, live HIIT classes, high intensity interval training India, fat burning workout online',
    ),
    '/zumba-classes-online' => array(
      'title'       => 'Online Zumba Classes India — Live Dance Fitness | Studio FIT India',
      'description' => 'Join fun live Zumba dance fitness classes online in India. Burn calories with Bollywood & Latin dance moves with certified Zumba instructors.',
      'keywords'    => 'zumba classes online India, live zumba classes, dance fitness online India, bollywood fitness classes',
    ),
    '/strength-training-online' => array(
      'title'       => 'Online Strength Training India — Live Classes | Studio FIT India',
      'description' => 'Build muscle and strength with live online strength training classes in India. Functional training, CrossFit & bodyweight programs with certified coaches.',
      'keywords'    => 'strength training online India, muscle building online, functional training India, online weight training',
    ),
    '/weight-loss-program-online' => array(
      'title'       => 'Online Weight Loss Program India — Lose Weight Fast | Studio FIT India',
      'description' => 'Achieve your weight loss goals with Studio FIT India\'s structured online weight loss program. Combination of live workouts, diet consultation & progress monitoring.',
      'keywords'    => 'weight loss program online India, lose weight from home India, online diet and exercise program India',
    ),
    '/personal-training-online' => array(
      'title'       => 'Online Personal Training India — 1-on-1 Fitness Coaching | Studio FIT India',
      'description' => 'Get personalized 1-on-1 online personal training sessions in India. Customized fitness plans, progress tracking & direct coach interaction.',
      'keywords'    => 'online personal trainer India, 1 on 1 fitness coaching India, personal training online India',
    ),
    '/blog' => array(
      'title'       => 'Fitness Blog — Yoga, HIIT, Weight Loss Tips | Studio FIT India',
      'description' => 'Read expert fitness tips, workout guides and health advice from Studio FIT India\'s certified coaches. Topics include yoga, HIIT, weight loss, motivation & more.',
      'keywords'    => 'fitness blog India, yoga tips, HIIT workout tips, weight loss blog India, online fitness advice',
    ),
    '/reviews' => array(
      'title'       => 'Member Reviews & Results | Studio FIT India — Real Transformations',
      'description' => 'Read real reviews from Studio FIT India members. 4.9 stars on Google. Hundreds of success stories — weight loss, strength gains, yoga transformations & more.',
      'keywords'    => 'studio fit india reviews, online fitness class reviews India, fitness transformation India, studio fit india testimonials',
    ),
    '/about' => array(
      'title'       => 'About Us — Certified Fitness Coaches | Studio FIT India',
      'description' => 'Meet the certified coaches at Studio FIT India. Expert trainers in Yoga, HIIT, Zumba, Strength Training with 4-15 years of experience each.',
      'keywords'    => 'studio fit india coaches, certified online fitness trainer India, about studio fit india',
    ),
    '/contact' => array(
      'title'       => 'Contact Studio FIT India — WhatsApp, Email & Location',
      'description' => 'Get in touch with Studio FIT India. WhatsApp: +91 93106 66287. Email: info@studiofitindia.com. Office: Greater Noida, Uttar Pradesh.',
      'keywords'    => 'contact studio fit india, studio fit india phone number, studio fit india location',
    ),
    '/schedule' => array(
      'title'       => 'Class Schedule & Batch Timings | Studio FIT India',
      'description' => 'View the live class schedule for Studio FIT India. Morning & evening batches in Yoga, HIIT, Zumba, Strength Training & more. Book your preferred time slot.',
      'keywords'    => 'studio fit india schedule, online fitness class timing India, live class timetable',
    ),

    '/privacy-policy' => array(
      'title'       => 'Privacy Policy | Studio FIT India',
      'description' => 'Your privacy is important to us. Read the Studio FIT India privacy policy to understand how we collect, use and protect your personal information.',
      'keywords'    => 'privacy policy studio fit india',
    ),
    '/terms-and-condition' => array(
      'title'       => 'Terms & Conditions | Studio FIT India',
      'description' => 'Read the terms and conditions for using Studio FIT India online fitness services, membership rules, and user conduct.',
      'keywords'    => 'terms and conditions studio fit india',
    ),
    '/shipping-policy' => array(
      'title'       => 'Shipping & Delivery Policy | Studio FIT India',
      'description' => 'Detailed information about shipping and delivery for Studio FIT India physical goods and digital service access.',
      'keywords'    => 'shipping policy studio fit india',
    ),
    '/cancellation-and-refund' => array(
      'title'       => 'Cancellation & Refund Policy | Studio FIT India',
      'description' => 'Information regarding cancellations and refunds for Studio FIT India memberships and programs.',
      'keywords'    => 'refund policy studio fit india',
    ),
  );

  // Blog post pages — match /blog/any-slug
  if (preg_match('#^/blog/(.+)$#', $path, $matches)) {
    return array(
      'title'       => 'Fitness Article | Studio FIT India Blog',
      'description' => 'Read expert fitness and wellness articles from Studio FIT India\'s certified coaches. Tips on yoga, HIIT, weight loss and home workouts.',
      'keywords'    => 'fitness article India, yoga tips, weight loss guide, HIIT workout India',
      'path'        => $path,
    );
  }

  $config = isset($pages[$path]) ? $pages[$path] : $pages['/'];
  $config['path'] = $path;
  return $config;
}


// =====================================================================
// ROUTE-AWARE SEO META TAGS (Title, Description, Canonical, OG)
// =====================================================================
// =====================================================================
// ROUTE-AWARE SEO META TAGS (Title, Description, Canonical, OG)
// =====================================================================
function studiofitindia_seo_meta_tags() {
  $cfg         = sfi_get_page_config();
  $site_url    = home_url();
  
  // Normalize canonical URL: strip trailing slash except for root "/"
  $canonical_path = $cfg['path'] === '/' ? '/' : rtrim($cfg['path'], '/');
  $current_url = rtrim($site_url, '/') . $canonical_path;
  
  $og_image    = "https://res.cloudinary.com/dvrwadsfh/image/upload/v1777445549/image_ks0v7p.png";

  echo '<meta name="description" content="' . esc_attr($cfg['description']) . '">' . "\n";
  echo '<meta name="keywords" content="' . esc_attr($cfg['keywords']) . '">' . "\n";
  echo '<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">' . "\n";
  echo '<link rel="canonical" href="' . esc_url($current_url) . '">' . "\n";

  echo '<meta property="og:type" content="website">' . "\n";
  echo '<meta property="og:site_name" content="Studio FIT India">' . "\n";
  echo '<meta property="og:title" content="' . esc_attr($cfg['title']) . '">' . "\n";
  echo '<meta property="og:description" content="' . esc_attr($cfg['description']) . '">' . "\n";
  echo '<meta property="og:url" content="' . esc_url($current_url) . '">' . "\n";
  echo '<meta property="og:image" content="' . esc_url($og_image) . '">' . "\n";
  echo '<meta property="og:locale" content="en_IN">' . "\n";

  echo '<meta name="twitter:card" content="summary_large_image">' . "\n";
  echo '<meta name="twitter:title" content="' . esc_attr($cfg['title']) . '">' . "\n";
  echo '<meta name="twitter:description" content="' . esc_attr($cfg['description']) . '">' . "\n";
  echo '<meta name="twitter:image" content="' . esc_url($og_image) . '">' . "\n";
}
add_action('wp_head', 'studiofitindia_seo_meta_tags', 1);

// =====================================================================
// ROUTE-AWARE STRUCTURED DATA (JSON-LD)
// Returns route-specific Schema.org markup for Google
// =====================================================================
function sfi_get_structured_data() {
  $path = parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH);
  $path = rtrim($path, '/') ?: '/';
  $site_url = rtrim(home_url(), '/');
  $logo = "https://res.cloudinary.com/dvrwadsfh/image/upload/v1777445549/image_ks0v7p.png";
  $cfg = sfi_get_page_config();

  if (preg_match('#^/blog/(.+)$#', $path, $matches)) {
    return '<script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": "' . esc_attr($cfg['title']) . '",
      "author": { "@type": "Organization", "name": "Studio FIT India" },
      "publisher": { "@type": "Organization", "name": "Studio FIT India", "url": "https://studiofitindia.com" },
      "datePublished": "2024-10-12",
      "url": "https://studiofitindia.com' . $path . '"
    }
    </script>';
  }

  // ── DEFAULT / HOME PAGE ───────────────────────────────────────────
  return '
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Studio FIT India",
    "description": "India\'s leading online live fitness studio offering Yoga, HIIT, Zumba, Strength Training and Pilates.",
    "url": "' . $site_url . '",
    "logo": "' . $logo . '",
    "telephone": "+91 93106 66287",
    "email": "studiofitindiahelpdesk@gmail.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "6th Floor, Office No. 61, I-Thum\'s, Galleria Mall",
      "addressLocality": "Greater Noida",
      "addressRegion": "Uttar Pradesh",
      "postalCode": "201310",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 28.4744,
      "longitude": 77.5040
    },
    "openingHours": ["Mo-Su 06:00-21:00"],
    "priceRange": "₹₹",
    "sameAs": [
      "https://www.facebook.com/studiofitindia1/",
      "https://www.instagram.com/studiofitindia1/"
    ]
  }
  </script>';
}



// =====================================================================
// PAGE-SPECIFIC TITLE TAG
// =====================================================================
function studiofitindia_page_title($title) {
  $cfg = sfi_get_page_config();
  return $cfg['title'];
}
add_filter('pre_get_document_title', 'studiofitindia_page_title');


// =====================================================================
// ROUTE-AWARE CRAWLABLE STATIC HTML (Bot / Noscript Content)
// Returns rich, route-specific HTML for Googlebot and noscript users
// =====================================================================
function sfi_get_crawlable_html() {
  $path = parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH);
  $path = rtrim($path, '/') ?: '/';

  // Global Footer helper for SEO
  $footer_html = '
  <hr style="margin-top: 40px; border: 0; border-top: 1px solid #eee;">
  <div id="sfi-footer-seo" style="padding: 24px 0; text-align: center; background: #fff;">
    <h3 style="font-size: 18px; margin-bottom: 16px; font-family: sans-serif;">Connect with Studio FIT India</h3>
    <div style="display: flex; justify-content: center; gap: 16px; margin-bottom: 20px;">
      <a href="https://www.instagram.com/studiofitindia1/" target="_blank" style="display: inline-block; width: 40px; height: 40px; border-radius: 50%; overflow: hidden; background: rgba(225,48,108,0.1);">
        <img src="https://cdn-icons-png.flaticon.com/512/3955/3955024.png" alt="Instagram" style="width: 100%; height: 100%; object-fit: cover;">
      </a>
      <a href="https://www.facebook.com/p/Studio-FIT-India-61554292632666/" target="_blank" style="display: inline-block; width: 40px; height: 40px; border-radius: 50%; overflow: hidden; background: rgba(24,119,242,0.1);">
        <img src="https://cdn-icons-png.flaticon.com/512/5968/5968764.png" alt="Facebook" style="width: 100%; height: 100%; object-fit: cover;">
      </a>
      <a href="https://www.youtube.com/@STUDIOFITINDIA-xc8wv/" target="_blank" style="display: inline-block; width: 40px; height: 40px; border-radius: 50%; overflow: hidden; background: rgba(255,0,0,0.1);">
        <img src="https://cdn-icons-png.flaticon.com/512/4494/4494485.png" alt="YouTube" style="width: 100%; height: 100%; object-fit: cover;">
      </a>
    </div>
    <p style="font-size: 14px; color: #666; font-family: sans-serif;">&copy; 2026 Studio Fit India. All Rights Reserved.</p>
  </div>';

  // ── PRICING PAGE ──────────────────────────────────────────────────
  if ($path === '/pricing') {
    return '
<div id="sfi-noscript-content">
  <h1>Studio FIT India — Membership Plans &amp; Pricing</h1>
  <p>Choose a membership plan that fits your fitness goals and budget. All plans include access to <strong>live online classes</strong> with certified coaches in Yoga, HIIT, Zumba, Strength Training and more.</p>
  <nav aria-label="Main Navigation"><a href="/">Home</a> <a href="/programs">Programs</a> <a href="/about">About</a> <a href="/reviews">Reviews</a> <a href="/contact">Contact</a></nav>
  <h2>Starter Plan — ₹1,499 / 1 Month</h2>
  <ul><li>30 Live Classes per month</li><li>Access to all batch timings</li><li>No pause facility</li><li>No recorded library access</li></ul>
  <h2>Standard Plan — ₹2,900 / 3 Months + 15 Days</h2>
  <ul><li>90 Live Classes</li><li>10 Days pause facility</li><li>+15 Days Free Extension</li></ul>
  <h2>PRO Plan — ₹4,600 / 6+1 Months</h2>
  <ul><li>Unlimited Live Classes</li><li>15 Days pause facility</li><li>Recorded class library access</li><li>+1 Month Completely Free</li></ul>
  <h2>Elite Plan — ₹6,500 / 1 Year</h2>
  <ul><li>Unlimited Live Classes</li><li>30 Days pause facility</li><li>Full Recorded Library access</li><li>Progress Monitoring</li></ul>
  <h2>1 Month Transformation Plan — ₹2,499 / 1 Month</h2>
  <ul><li>Unlimited Live Classes</li><li>Full Recorded Library access</li><li>Customized Diet Plan</li><li>Weekly Progress Monitoring</li><li>No pause facility</li><li>Priority Support</li></ul>
  <h2>Transformation Elite — ₹7,900 / 90 Days</h2>
  <ul><li>Unlimited Live Classes</li><li>Full Recorded Library access</li><li>Customized Diet Plan</li><li>Weekly Progress Monitoring</li><li>15 Days pause facility</li><li>Priority Support</li></ul>
  <h2>Personal Training (1 Month) — ₹16,000</h2>
  <ul><li>1-on-1 Personal Training</li><li>16 sessions in a month</li><li>WhatsApp Chat Support</li><li><a href="https://rzp.io/rzp/personal-training-1month">Pay Now</a></li></ul>
  <h2>Personal Training (3 Months) — ₹38,000</h2>
  <ul><li>1-on-1 Personal Training</li><li>48 sessions in 3 months</li><li>WhatsApp Chat Support</li><li><a href="https://rzp.io/rzp/personal-training-3months">Pay Now</a></li></ul>
  <p><a href="https://wa.me/919310666287?text=Hi!%20I%20want%20to%20join%20Studio%20FIT%20India.">Join Now on WhatsApp — +91 93106 66287</a></p>
</div>' . $footer_html;
  }

  // ── PROGRAMS PAGE ─────────────────────────────────────────────────
  if ($path === '/programs') {
    return '
<div id="sfi-noscript-content">
  <h1>Online Fitness Programs — Studio FIT India</h1>
  <p>Studio FIT India offers a wide range of live online fitness programs led by certified coaches. Train from home with structured, goal-oriented classes every day.</p>
  <nav aria-label="Main Navigation"><a href="/">Home</a> <a href="/pricing">Pricing</a> <a href="/about">About</a> <a href="/contact">Contact</a></nav>
  <h2>Yoga &amp; Mindfulness Classes Online</h2>
  <p>Live online yoga classes including Hatha Yoga, Ashtanga Yoga, Power Yoga, Pranayama, and Meditation. Suitable for beginners and advanced practitioners. <a href="/yoga-classes-online">Learn more about Yoga Classes</a>.</p>
  <h2>HIIT &amp; Functional Training Online</h2>
  <p>High-Intensity Interval Training (HIIT) classes designed for maximum fat burn, cardiovascular health and muscle conditioning. <a href="/hiit-training-online">Learn more about HIIT Training</a>.</p>
  <h2>Zumba &amp; Dance Fitness Online</h2>
  <p>Fun, high-energy Zumba and Bollywood dance fitness classes that make cardio feel like a party. <a href="/zumba-classes-online">Learn more about Zumba Classes</a>.</p>
  <h2>Strength Training Online</h2>
  <p>Functional strength training, CrossFit-style workouts and bodyweight training programs with expert coaches. <a href="/strength-training-online">Learn more about Strength Training</a>.</p>
  <h2>Weight Loss Program Online</h2>
  <p>A structured online weight loss program that combines live exercise classes, diet consultation and weekly progress monitoring. <a href="/weight-loss-program-online">Learn more about Weight Loss Program</a>.</p>
  <h2>Personal Training Online (1-on-1)</h2>
  <p>One-on-one online personal training sessions with a dedicated certified coach, customized to your specific fitness goals. <a href="/personal-training-online">Learn more about Personal Training</a>.</p>
  <p><a href="https://wa.me/919310666287?text=Hi!%20I%20want%20to%20book%20a%20trial%20at%20just%20₹1.">Book a Trial at Just ₹1 — WhatsApp +91 93106 66287</a></p>
</div>';
  }

  // ── YOGA LANDING PAGE ─────────────────────────────────────────────
  if ($path === '/yoga-classes-online') {
    return '
<div id="sfi-noscript-content">
  <h1>Online Yoga Classes in India — Live Sessions | Studio FIT India</h1>
  <p>Join India\'s top online yoga classes led by certified yoga instructors. Studio FIT India offers live Hatha Yoga, Ashtanga Yoga, Power Yoga, Pranayama, and Meditation sessions that you can attend from the comfort of your home.</p>
  <h2>Why Choose Online Yoga with Studio FIT India?</h2>
  <ul><li>Certified instructors with 4-10 years of experience</li><li>Live interactive sessions — not pre-recorded videos</li><li>Flexible morning and evening batch timings</li><li>Suitable for all levels: beginners to advanced practitioners</li><li>Affordable monthly and quarterly membership plans</li></ul>
  <h2>Yoga Programs Offered</h2>
  <ul><li>Hatha Yoga — classical postures for flexibility and balance</li><li>Ashtanga Yoga — dynamic, strength-building sequences</li><li>Power Yoga — intense, calorie-burning yoga flow</li><li>Pranayama &amp; Breathwork — respiratory health and stress relief</li><li>Meditation — mindfulness and mental clarity</li><li>Face Yoga — natural facial toning exercises</li></ul>
  <p>Plans start at just ₹1,499/month. <a href="/pricing">Compare All Plans*</a>.</p>
  <p><a href="https://wa.me/919310666287?text=Hi!%20I%20want%20to%20join%20online%20Yoga%20classes.">Join Yoga Classes — WhatsApp +91 93106 66287</a></p>
</div>' . $footer_html;
  }

  // ── HIIT LANDING PAGE ─────────────────────────────────────────────
  if ($path === '/hiit-training-online') {
    return '
<div id="sfi-noscript-content">
  <h1>Online HIIT Training in India — Live Classes | Studio FIT India</h1>
  <p>Burn maximum calories and build stamina with live HIIT (High-Intensity Interval Training) classes online in India. Studio FIT India\'s certified coaches guide you through explosive, result-driven workouts from home.</p>
  <h2>Benefits of Online HIIT Training</h2>
  <ul><li>Burns 2-3x more calories than steady-state cardio</li><li>Afterburn effect — keeps burning calories 24 hours after workout</li><li>Builds lean muscle while shedding fat</li><li>No equipment needed — bodyweight-based</li><li>30-45 minute sessions — efficient and effective</li></ul>
  <h2>HIIT Programs Available</h2>
  <ul><li>Functional HIIT Training</li><li>Cardio HIIT Circuits</li><li>Strength &amp; HIIT Combination</li><li>Beginner-Friendly HIIT</li></ul>
  <p>Plans start at ₹1,499/month. <a href="/pricing">Compare All Plans*</a>.</p>
  <p><a href="https://wa.me/919310666287?text=Hi!%20I%20want%20to%20join%20HIIT%20training%20classes.">Join HIIT Classes — WhatsApp +91 93106 66287</a></p>
</div>' . $footer_html;
  }

  // ── ZUMBA LANDING PAGE ────────────────────────────────────────────
  if ($path === '/zumba-classes-online') {
    return '
<div id="sfi-noscript-content">
  <h1>Online Zumba Classes in India — Live Dance Fitness | Studio FIT India</h1>
  <p>Join energetic, fun-filled live Zumba and dance fitness classes online in India. Studio FIT India\'s certified Zumba instructors lead sessions in Bollywood dance, Latin Zumba and Aerobics that make fitness feel effortless.</p>
  <h2>Why Zumba at Studio FIT India?</h2>
  <ul><li>Burns 400-600 calories per session</li><li>No prior dance experience needed</li><li>Bollywood, Latin &amp; International dance styles</li><li>High-energy, motivating live sessions</li><li>Morning and evening batch options</li></ul>
  <p>Plans start at ₹1,499/month. <a href="/pricing">Compare All Plans*</a>.</p>
  <p><a href="https://wa.me/919310666287?text=Hi!%20I%20want%20to%20join%20Zumba%20classes.">Join Zumba Classes — WhatsApp +91 93106 66287</a></p>
</div>' . $footer_html;
  }

  // ── STRENGTH TRAINING LANDING PAGE ────────────────────────────────
  if ($path === '/strength-training-online') {
    return '
<div id="sfi-noscript-content">
  <h1>Online Strength Training in India — Live Classes | Studio FIT India</h1>
  <p>Build functional strength and muscle with live online strength training classes in India. Studio FIT India\'s certified coaches guide you through bodyweight training, CrossFit-style workouts and progressive overload programs from home.</p>
  <h2>Strength Training Programs</h2>
  <ul><li>Bodyweight Functional Training</li><li>CrossFit-Style Circuit Training</li><li>Progressive Muscle Building</li><li>Core Strength &amp; Stability</li><li>Mobility and Flexibility Training</li></ul>
  <p>Plans start at ₹1,499/month. <a href="/pricing">Compare All Plans*</a>.</p>
  <p><a href="https://wa.me/919310666287?text=Hi!%20I%20want%20to%20join%20Strength%20Training%20classes.">Join Strength Training — WhatsApp +91 93106 66287</a></p>
</div>' . $footer_html;
  }

  // ── WEIGHT LOSS LANDING PAGE ──────────────────────────────────────
  if ($path === '/weight-loss-program-online') {
    return '
<div id="sfi-noscript-content">
  <h1>Online Weight Loss Program in India | Studio FIT India</h1>
  <p>Lose weight sustainably with Studio FIT India\'s structured online weight loss program. A combination of live workout classes, personalized diet consultation and weekly progress monitoring — all from home.</p>
  <h2>What\'s Included in the Weight Loss Program?</h2>
  <ul><li>Daily live workout sessions (HIIT, Yoga, Zumba or Strength)</li><li>Diet consultation with certified nutrition coaches</li><li>Weekly progress monitoring and check-ins</li><li>Customized meal planning guidance</li><li>Ongoing coach support via WhatsApp</li></ul>
  <h2>Real Results from Real Members</h2>
  <p>Plans start at ₹1,499/month. <a href="/reviews">Read member transformation stories</a>.</p>
  <p>Plans start at ₹1,499/month. <a href="/pricing">Compare All Plans*</a>.</p>
  <p><a href="https://wa.me/919310666287?text=Hi!%20I%20want%20to%20join%20the%20Weight%20Loss%20Program.">Join Weight Loss Program — WhatsApp +91 93106 66287</a></p>
</div>' . $footer_html;
  }

  // ── PERSONAL TRAINING LANDING PAGE ───────────────────────────────
  if ($path === '/personal-training-online') {
    return '
<div id="sfi-noscript-content">
  <h1>Online Personal Training in India — 1-on-1 Coaching | Studio FIT India</h1>
  <p>Get personalized 1-on-1 online personal training sessions with a dedicated certified coach. Studio FIT India\'s personal trainers create customized fitness plans for faster, focused results — all from the comfort of your home.</p>
  <h2>Benefits of Online Personal Training</h2>
  <ul><li>100% personalized workout plan built for your goals</li><li>Direct 1-on-1 attention from your dedicated coach</li><li>Real-time posture correction and feedback</li><li>Flexible scheduling — choose your preferred time</li><li>Diet guidance included in premium plans</li></ul>
  <p><a href="/pricing">Compare All Plans* and pricing</a>.</p>
  <p><a href="https://wa.me/919310666287?text=Hi!%20I%20want%20to%20join%20Personal%20Training.">Book Personal Training — WhatsApp +91 93106 66287</a></p>
</div>' . $footer_html;
  }

  // ── BLOG INDEX PAGE ───────────────────────────────────────────────
  if ($path === '/blog') {
    return '
<div id="sfi-noscript-content">
  <h1>Fitness Blog — Expert Tips &amp; Workout Guides | Studio FIT India</h1>
  <p>Read expert fitness tips, workout guides and health advice from Studio FIT India\'s certified coaches. We cover yoga, HIIT, weight loss, home workouts and fitness motivation.</p>
  <nav aria-label="Main Navigation"><a href="/">Home</a> <a href="/programs">Programs</a> <a href="/pricing">Pricing</a> <a href="/contact">Contact</a></nav>
  <h2><a href="/blog/benefits-of-online-yoga-classes">5 Hidden Benefits of Taking Yoga Classes Online</a></h2>
  <p>Discover why practicing yoga from the comfort of your home might actually yield better fitness results than commuting to a crowded studio. Topics: zero commute anxiety, personalized posture correction, post-yoga relaxation.</p>
  <h2><a href="/blog/hiit-training-for-weight-loss">How HIIT Training Actually Melts Fat Faster</a></h2>
  <p>The science behind High-Intensity Interval Training and why 30 minutes of HIIT outperforms 60 minutes of jogging on the treadmill. Learn about the Afterburn Effect (EPOC) and muscle preservation.</p>
  <h2><a href="/blog/home-workout-motivation-tips">How to Build an Unbreakable Home Workout Routine</a></h2>
  <p>Struggling to stay consistent with home workouts? Use these 3 psychological tricks — the 5-Minute Bargain, live class accountability, and habit triggers — to build a routine that sticks.</p>
  <p>A comprehensive review of why Studio FIT India is leading the digital fitness revolution in 2026 with personal interaction and live coaching.</p>
  <h2><a href="/blog/online-yoga-classes-india-beginners-guide">Online Yoga Classes India: Beginner\'s Guide</a></h2>
  <p>Starting your yoga journey from home? Learn how to choose the best online yoga classes in India and what equipment you really need.</p>
</div>' . $footer_html;
  }

  // ── INDIVIDUAL BLOG POST PAGES ────────────────────────────────────
  if ($path === '/blog/benefits-of-online-yoga-classes') {
    return '
<div id="sfi-noscript-content">
  <h1>5 Hidden Benefits of Taking Yoga Classes Online | Studio FIT India</h1>
  <p>Yoga is an ancient practice, but modern technology has revolutionized how we access it. Since 2020, millions of Indians have shifted to online yoga classes. Here are 5 compelling reasons why online yoga might be better than going to a studio.</p>
  <h2>1. Zero Commute Anxiety</h2>
  <p>By the time you fight through traffic to reach a physical studio, your stress levels have already peaked. Online yoga allows you to roll out your mat and immediately begin practicing in a calm, distraction-free state.</p>
  <h2>2. Personalized Correction</h2>
  <p>A live online class where the instructor can see you via webcam often provides more direct 1-on-1 correction than a crowded studio class where the teacher manages 30 students at once.</p>
  <h2>3. Immediate Post-Yoga Relaxation</h2>
  <p>Savasana (Corpse Pose) is the most important part of yoga. At home, you can linger in relaxation without being thrust back into street noise.</p>
  <p><a href="/blog">Read more fitness articles</a> | <a href="/yoga-classes-online">Join online yoga classes</a></p>
</div>' . $footer_html;
  }

  if ($path === '/blog/hiit-training-for-weight-loss') {
    return '
<div id="sfi-noscript-content">
  <h1>How HIIT Training Actually Melts Fat Faster | Studio FIT India Blog</h1>
  <p>High-Intensity Interval Training (HIIT) is the most time-efficient fat-burning workout method available. Here is the science behind why 30 minutes of HIIT beats 60 minutes of steady-state jogging.</p>
  <h2>The Afterburn Effect (EPOC)</h2>
  <p>When you run on a treadmill at a steady pace, you burn calories only while running. HIIT is different. By spiking your heart rate near its maximum for short intervals, you create an oxygen debt in your body. Your body takes up to 24 hours to recover, meaning you continue burning calories while sitting at your desk or sleeping.</p>
  <h2>Preserving Muscle Mass</h2>
  <p>Crash diets and excessive cardio lead to muscle loss. HIIT incorporates explosive, resistance-based movements like squat jumps and mountain climbers that signal your body to preserve muscle while shedding fat.</p>
  <p><a href="/blog">Read more fitness articles</a> | <a href="/hiit-training-online">Join live HIIT classes</a></p>
</div>' . $footer_html;
  }

  if ($path === '/blog/home-workout-motivation-tips') {
    return '
<div id="sfi-noscript-content">
  <h1>How to Build an Unbreakable Home Workout Routine | Studio FIT India Blog</h1>
  <p>Working out from home is incredibly convenient, but a lack of motivation is the #1 reason people fall off the wagon. When your couch is five feet from your workout mat, the couch usually wins. Here is how to beat it.</p>
  <h2>1. The 5-Minute Bargain</h2>
  <p>Tell yourself: "I will only work out for 5 minutes. If I still want to quit, I can." 90% of the friction is simply starting. Once endorphins kick in, you will naturally want to finish the full class.</p>
  <h2>2. Live Classes Beat Pre-Recorded Videos</h2>
  <p>When you click play on YouTube, nobody knows if you pause. When you log into a live Studio FIT India class, the coach greets you by name. Social accountability forces you to show up and give it your all.</p>
  <h2>3. Create a Daily Trigger</h2>
  <p>Always work out immediately after a specific daily event — "I will log into my Zoom workout immediately after I close my laptop from work." This chains habits together powerfully.</p>
  <p><a href="/blog">Read more fitness articles</a> | <a href="/programs">View all programs</a></p>
</div>' . $footer_html;
  }

  if ($path === '/blog/best-online-fitness-classes-india-2026') {
    return '
<div id="sfi-noscript-content">
  <h1>Best Online Fitness Classes in India 2026 | Studio FIT India Blog</h1>
  <p>The fitness landscape in India has shifted permanently towards digital. But as we enter 2026, the demand for "live" interaction has replaced static, pre-recorded videos.</p>
  <h2>Why Studio FIT India Leads the Way</h2>
  <p>Unlike CultFit or other major players that often rely on pre-recorded content, Studio FIT India prioritizes live, two-way interaction.</p>
  <h2>Personalization at Scale</h2>
  <p>Our coaches don\'t just demonstrate; they observe. Using high-definition streaming, they correct your form in real-time, ensuring that your home workout is as safe and effective as a physical gym session.</p>
  <p><a href="/blog">Read more fitness articles</a> | <a href="/pricing">Compare All Plans*</a></p>
</div>' . $footer_html;
  }

  if ($path === '/blog/online-yoga-classes-india-beginners-guide') {
    return '
<div id="sfi-noscript-content">
  <h1>Online Yoga Classes India: Beginner\'s Guide | Studio FIT India Blog</h1>
  <p>Yoga is for everyone, regardless of flexibility or age. If you\'re looking to start online yoga classes in India, here is everything you need to know.</p>
  <h2>Choosing the Right Style</h2>
  <p>For beginners, Hatha or Yin yoga is excellent for building a foundation. At Studio FIT India, our live sessions cater specifically to those just starting out.</p>
  <h2>The Live Advantage</h2>
  <p>The biggest hurdle for beginners is correct alignment. In our live sessions, our certified yoga gurus guide you through every asana, preventing injury and accelerating your progress.</p>
  <p><a href="/blog">Read more fitness articles</a> | <a href="/yoga-classes-online">Join live yoga classes</a></p>
</div>' . $footer_html;
  }

  // ── REVIEWS PAGE ──────────────────────────────────────────────────
  if ($path === '/reviews') {
    return '
<div id="sfi-noscript-content">
  <h1>Member Reviews &amp; Transformations | Studio FIT India</h1>
  <p>Studio FIT India has a 4.9-star rating on Google based on real member reviews. Thousands of members across India have transformed their health and fitness with our live online classes.</p>
  <nav aria-label="Main Navigation"><a href="/">Home</a> <a href="/programs">Programs</a> <a href="/pricing">Pricing</a> <a href="/contact">Contact</a></nav>
  <h2>What Our Members Say</h2>
  <blockquote><p>"I truly enjoy doing my sessions with Studio FIT India. The coaches are well versed with their art." — Mandeep Kaur</p></blockquote>
  <blockquote><p>"Losing weight and staying fit is almost everyone\'s dream. No crash diet, no difficult exercises. Just a daily routine with balanced diet plan and light physical workout is giving me results." — Shwetha Farsinavis</p></blockquote>
  <blockquote><p>"Studio FIT offers a wide range of workout options that cater to different fitness levels. I\'ve noticed significant improvements in my strength and stamina since joining." — Haritha Mandavilli</p></blockquote>
  <blockquote><p>"It\'s a very amazing online fitness studio where housewives especially can do exercises at home. Instructors are very helpful." — Jyoti Yadav</p></blockquote>
  <p><a href="https://wa.me/919310666287?text=Hi!%20I%20want%20to%20book%20a%20trial%20at%20just%20₹1.">Start Your Transformation — Book a Trial at Just ₹1</a></p>
</div>' . $footer_html;
  }

  // ── ABOUT PAGE ────────────────────────────────────────────────────
  if ($path === '/about') {
    return '
<div id="sfi-noscript-content">
  <h1>About Studio FIT India — Our Certified Coaches &amp; Mission</h1>
  <p>Studio FIT India is India\'s leading online live fitness studio, founded with the mission to make professional fitness coaching accessible to everyone across India — from their homes.</p>
  <nav aria-label="Main Navigation"><a href="/">Home</a> <a href="/programs">Programs</a> <a href="/pricing">Pricing</a> <a href="/contact">Contact</a></nav>
  <h2>Our Certified Coaches</h2>
  <ul>
    <li><strong>Pankaj Kavle</strong> — Strength Training, HIIT, CrossFit (15+ years experience)</li>
    <li><strong>Puja Vaish</strong> — Pilates, Aerobics (9 years experience)</li>
    <li><strong>Nitin Dabhade</strong> — Yoga, Zumba (10+ years experience)</li>
    <li><strong>Yashi Tiwari</strong> — Women\'s Yoga, Rishikesh certified</li>
    <li><strong>Jyoti Yadav</strong> — Hatha Yoga, Ashtanga, Face Yoga (6 years experience)</li>
    <li><strong>Geeta Khatri</strong> — Bollywood Dance, Zumba (2 years experience)</li>
    <li><strong>Jurul Thomas Daimari</strong> — Licensed Zumba® Instructor (8+ years experience)</li>
  </ul>
  <p><a href="https://wa.me/919310666287">Connect with our coaches — WhatsApp +91 93106 66287</a></p>
</div>' . $footer_html;
  }

  // ── CONTACT PAGE ──────────────────────────────────────────────────
  if ($path === '/contact') {
    return '
<div id="sfi-noscript-content">
  <h1>Contact Studio FIT India</h1>
  <p>Get in touch with Studio FIT India for membership enquiries, trial classes at just ₹1, or any questions about our online fitness programs.</p>
  <h2>Contact Details</h2>
  <ul>
    <li><strong>WhatsApp:</strong> <a href="https://wa.me/919310666287">+91 93106 66287</a></li>
    <li><strong>Email:</strong> <a href="mailto:info@studiofitindia.com">info@studiofitindia.com</a></li>
    <li><strong>Instagram:</strong> <a href="https://instagram.com/studiofitindia1">@studiofitindia1</a></li>
    <li><strong>Website:</strong> <a href="https://studiofitindia.com">studiofitindia.com</a></li>
  </ul>
  <h2>Office Address</h2>
  <address>6th Floor, Office No. 61, I-Thum\'s, Galleria Mall,<br>Greater Noida, Uttar Pradesh 201310, India</address>
  <p>We are available Monday to Sunday, 6:00 AM to 9:00 PM IST.</p>
</div>' . $footer_html;
  }

  // ── SCHEDULE PAGE ─────────────────────────────────────────────────
  if ($path === '/schedule') {
    return '
<div id="sfi-noscript-content">
  <h1>Class Schedule &amp; Batch Timings | Studio FIT India</h1>
  <p>Studio FIT India offers live online fitness classes with flexible morning and evening batch timings. View the current class schedule below or WhatsApp us to confirm your preferred time slot.</p>
  <h2>Morning Batches</h2>
  <p>Classes available from 6:00 AM to 11:00 AM IST. Programs include Yoga, HIIT, Pilates and Strength Training.</p>
  <h2>Evening Batches</h2>
  <p>Classes available from 5:00 PM to 9:00 PM IST. Programs include Zumba, HIIT, Yoga and Aerobics.</p>
  <p><a href="https://wa.me/919310666287?text=Hi!%20Please%20share%20the%20current%20class%20schedule.">Get the Latest Schedule on WhatsApp</a> | <a href="/pricing">Compare All Plans*</a></p>
</div>' . $footer_html;
  }




  // ── HOME PAGE (DEFAULT) ───────────────────────────────────────────
  return '
<div id="sfi-noscript-content">
  <nav aria-label="Main Navigation">
    <a href="/programs">Programs</a>
    <a href="/pricing">Pricing</a>
    <a href="/about">About Us</a>
    <a href="/reviews">Reviews</a>
    <a href="/blog">Blog</a>
    <a href="/contact">Contact</a>
    <a href="/schedule" style="color: #FFAD00; font-weight: bold;">Schedule</a>
  </nav>
  <h1>Studio FIT India — Online Live Fitness Classes</h1>
  <p>Studio FIT India is India\'s #1 online live fitness studio. Join thousands of members across India who train live every day from home with certified coaches. We offer Yoga, HIIT, Zumba, Strength Training, Pilates, Weight Loss programs and Personal Training.</p>
  
  <h2>Membership Plans</h2>
  <ul>
    <li><strong>Starter:</strong> ₹1,499/Month — 30 Live Classes</li>
    <li><strong>Standard:</strong> ₹2,900/3 Months — 90+ Live Classes</li>
    <li><strong>PRO:</strong> ₹4,600/6 Months — Unlimited Classes + 1 Month FREE</li>
    <li><strong>ELITE:</strong> ₹6,500/Year — Unlimited Classes + 30 Days Pause</li>
    <li><strong>1 Month Transformation Plan:</strong> ₹2,499/1 Month — Unlimited Classes + Customized Diet</li>
    <li><strong>Transformation Elite:</strong> ₹7,900/90 Days — Intense Weight Loss Coaching</li>
    <li><strong>Personal Training:</strong> ₹16,000/Month — 1-on-1 Direct Coaching</li>
  </ul>
  
  <a href="https://wa.me/919310666287?text=Hi!%20I%20want%20to%20book%20a%20trial%20at%20just%20₹1.">Book a Trial at Just ₹1 — WhatsApp +91 93106 66287</a>

  <h2>Studio FIT Moments</h2>
  <p>Explore the energy and community of Studio FIT India. Our gallery showcases official moments from live online sessions, special workshops, and community events. Trusted by <strong>20,000+ Members</strong> with <strong>8+ Certified Coaches</strong> leading the way.</p>
  
  <h2>Latest Member Transformation Results</h2>
  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin: 20px 0;">
    <img src="https://res.cloudinary.com/dvrwadsfh/image/upload/f_auto,q_auto,fl_progressive/v1776756930/ChatGPT_Image_Apr_21_2026_12_54_54_PM_n9khvg.png" alt="Transformation Result 1" style="width: 100%; border-radius: 8px;">
    <img src="https://res.cloudinary.com/dvrwadsfh/image/upload/f_auto,q_auto,fl_progressive/v1776756930/ChatGPT_Image_Apr_21_2026_12_48_23_PM_kr56p8.png" alt="Transformation Result 2" style="width: 100%; border-radius: 8px;">
  </div>
  
  <h2>Our Online Fitness Programs</h2>
  <ul>
    <li><a href="/yoga-classes-online">Yoga Classes Online</a> — Hatha, Ashtanga, Power Yoga, Pranayama &amp; Meditation</li>
    <li><a href="/hiit-training-online">HIIT Training Online</a> — High-intensity interval training for fat loss and stamina</li>
    <li><a href="/zumba-classes-online">Zumba Classes Online</a> — Bollywood &amp; Latin dance fitness</li>
    <li><a href="/strength-training-online">Strength Training Online</a> — Functional training &amp; muscle building</li>
    <li><a href="/weight-loss-program-online">Weight Loss Program Online</a> — Structured program with diet consultation</li>
    <li><a href="/personal-training-online">Personal Training Online</a> — 1-on-1 coaching with a dedicated trainer</li>
  </ul>
  <h2>Membership Plans</h2>
  <p>Starting at just ₹1,499/month for 30 live classes. <a href="/pricing">Compare All Plans*</a> including 3-month, 6-month, yearly and 90-day transformation packages.</p>
  <h2>Why Studio FIT India?</h2>
  <ul>
    <li>Certified coaches with 4 to 15 years of experience</li>
    <li>Live, interactive classes — not pre-recorded videos</li>
    <li>Programs for all fitness levels: beginners to advanced</li>
    <li>Flexible morning and evening batch timings</li>
    <li>4.9 stars on Google with hundreds of verified reviews</li>
    <li>Train from any device: phone, tablet or laptop</li>
  </ul>
  <h2>Contact Us</h2>
  <p>WhatsApp: <a href="https://wa.me/919310666287">+91 93106 66287</a> | Email: <a href="mailto:info@studiofitindia.com">info@studiofitindia.com</a><br>
  Address: 6th Floor, I-Thum\'s Galleria Mall, Greater Noida, Uttar Pradesh 201310</p>
</div>' . $footer_html;
}


// =====================================================================
// FORCE REMOVE NATIVE WORDPRESS NOINDEX TAGS
// =====================================================================
remove_action('wp_head', 'noindex', 1);
add_filter('wp_robots', function($robots) {
    unset($robots['noindex']);
    unset($robots['nofollow']);
    $robots['index'] = true;
    $robots['follow'] = true;
    return $robots;
}, 999);


// =====================================================================
// THEME SUPPORT
// =====================================================================
add_theme_support('title-tag');
add_theme_support('html5', array('search-form', 'comment-form', 'gallery', 'caption'));


// =====================================================================
// PERFORMANCE: BROWSER CACHING HEADERS
// =====================================================================
function studiofitindia_cache_headers() {
  if (!is_admin()) {
    header('Cache-Control: public, max-age=31536000, immutable');
    header('Vary: Accept-Encoding');
  }
}
add_action('send_headers', 'studiofitindia_cache_headers');


// =====================================================================
// PERFORMANCE: PRELOAD CRITICAL ASSETS
// =====================================================================
function studiofitindia_preload_assets() {
  $theme_uri = get_template_directory_uri();
  $theme_dir = get_template_directory();

  $css_files = glob($theme_dir . '/assets/index--_sENOfy.css');
  if (!empty($css_files)) {
    echo '<link rel="preload" href="' . esc_url($theme_uri . '/assets/' . basename($css_files[0])) . '" as="style">' . "\n";
  }

  $js_files = glob($theme_dir . '/assets/index-B0e-z27c.js');
  if (!empty($js_files)) {
    echo '<link rel="modulepreload" href="' . esc_url($theme_uri . '/assets/' . basename($js_files[0])) . '">' . "\n";
  }

  $vendor_files = glob($theme_dir . '/assets/vendor-*.js');
  if (!empty($vendor_files)) {
    echo '<link rel="modulepreload" href="' . esc_url($theme_uri . '/assets/' . basename($vendor_files[0])) . '">' . "\n";
  }

  echo '<link rel="dns-prefetch" href="//fonts.googleapis.com">' . "\n";
  echo '<link rel="dns-prefetch" href="//fonts.gstatic.com">' . "\n";
  echo '<link rel="preconnect" href="https://fonts.googleapis.com" crossorigin>' . "\n";
  echo '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>' . "\n";
}
add_action('wp_head', 'studiofitindia_preload_assets', 2);


// =====================================================================
// PERFORMANCE: REMOVE WORDPRESS BLOAT
// =====================================================================
remove_action('wp_head', 'wp_generator');
remove_action('wp_head', 'rsd_link');
remove_action('wp_head', 'wlwmanifest_link');
remove_action('wp_head', 'wp_shortlink_wp_head', 10, 0);
remove_action('wp_head', 'print_emoji_detection_script', 7);
remove_action('wp_print_styles', 'print_emoji_styles');
remove_filter('the_content', 'wpautop');


// =====================================================================
// PERFORMANCE: DEFER NON-CRITICAL SCRIPTS
// =====================================================================
function studiofitindia_defer_scripts($tag, $handle) {
  $no_defer = array('studiofitindia-app', 'jquery');
  if (in_array($handle, $no_defer)) {
    return $tag;
  }
  if (strpos($tag, ' defer') === false && strpos($tag, 'type="module"') === false) {
    $tag = str_replace('<script ', '<script defer ', $tag);
  }
  return $tag;
}
add_filter('script_loader_tag', 'studiofitindia_defer_scripts', 10, 2);


// =====================================================================
// SITEMAP: Add sitemap_xml rewrite rule so WordPress serves it
// =====================================================================
function sfi_sitemap_rewrite() {
  add_rewrite_rule('^sitemap\.xml$', 'index.php?sfi_sitemap=1', 'top');
}
add_action('init', 'sfi_sitemap_rewrite');

function sfi_sitemap_query_var($vars) {
  $vars[] = 'sfi_sitemap';
  return $vars;
}
add_filter('query_vars', 'sfi_sitemap_query_var');

function sfi_sitemap_output() {
  if (!get_query_var('sfi_sitemap')) return;

  $base = rtrim(home_url(), '/');
  $today = date('Y-m-d');

  header('Content-Type: application/xml; charset=UTF-8');
  header('X-Robots-Tag: noindex');

  $urls = array(
    array('loc' => $base . '/',                            'priority' => '1.0', 'freq' => 'weekly'),
    array('loc' => $base . '/programs',                    'priority' => '0.9', 'freq' => 'weekly'),
    array('loc' => $base . '/pricing',                     'priority' => '0.9', 'freq' => 'weekly'),
    array('loc' => $base . '/reviews',                     'priority' => '0.8', 'freq' => 'monthly'),
    array('loc' => $base . '/about',                       'priority' => '0.7', 'freq' => 'monthly'),
    array('loc' => $base . '/contact',                     'priority' => '0.7', 'freq' => 'monthly'),
    array('loc' => $base . '/schedule',                    'priority' => '0.7', 'freq' => 'weekly'),
    array('loc' => $base . '/blog',                        'priority' => '0.8', 'freq' => 'weekly'),
    array('loc' => $base . '/blog/benefits-of-online-yoga-classes',   'priority' => '0.7', 'freq' => 'monthly'),
    array('loc' => $base . '/blog/hiit-training-for-weight-loss',     'priority' => '0.7', 'freq' => 'monthly'),
    array('loc' => $base . '/blog/home-workout-motivation-tips',      'priority' => '0.7', 'freq' => 'monthly'),
    array('loc' => $base . '/yoga-classes-online',         'priority' => '0.9', 'freq' => 'monthly'),
    array('loc' => $base . '/hiit-training-online',        'priority' => '0.9', 'freq' => 'monthly'),
    array('loc' => $base . '/zumba-classes-online',        'priority' => '0.9', 'freq' => 'monthly'),
    array('loc' => $base . '/strength-training-online',    'priority' => '0.9', 'freq' => 'monthly'),
    array('loc' => $base . '/weight-loss-program-online',  'priority' => '0.9', 'freq' => 'monthly'),
    array('loc' => $base . '/personal-training-online',    'priority' => '0.9', 'freq' => 'monthly'),

    array('loc' => $base . '/terms-and-condition',         'priority' => '0.3', 'freq' => 'yearly'),
    array('loc' => $base . '/privacy-policy',              'priority' => '0.3', 'freq' => 'yearly'),
    array('loc' => $base . '/cancellation-and-refund',     'priority' => '0.3', 'freq' => 'yearly'),
  );

  echo '<?xml version="1.0" encoding="UTF-8"?>' . "\n";
  echo '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' . "\n";
  foreach ($urls as $url) {
    echo "  <url>\n";
    echo "    <loc>" . esc_url($url['loc']) . "</loc>\n";
    echo "    <lastmod>{$today}</lastmod>\n";
    echo "    <changefreq>{$url['freq']}</changefreq>\n";
    echo "    <priority>{$url['priority']}</priority>\n";
    echo "  </url>\n";
  }
  echo '</urlset>';
  exit;
}
add_action('template_redirect', 'sfi_sitemap_output');
?>
