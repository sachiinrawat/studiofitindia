<?php
/**
 * Studio FIT India - Main Template
 * Renders the React SPA root element + SEO-friendly content for crawlers
 */
?><!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
  <!-- Google tag (gtag.js) -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=AW-17925563887"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());

    gtag('config', 'AW-17925563887');
  </script>
  <meta charset="<?php bloginfo('charset'); ?>">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0">
  <?php wp_head(); ?>
  <style>
    /* Noscript fallback styles */
    #sfi-noscript-content {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      font-size: 16px;
      line-height: 1.6;
      color: #111827;
      background: #ffffff;
      max-width: 900px;
      margin: 0 auto;
      padding: 24px 16px;
      box-sizing: border-box;
    }
    #sfi-noscript-content h1, #sfi-noscript-content h2 {
      color: #111827;
      margin-bottom: 16px;
    }
    #sfi-noscript-content p, #sfi-noscript-content li {
      font-size: clamp(15px, 2.5vw, 18px);
      margin-bottom: 12px;
    }
    #sfi-noscript-content ul {
      padding-left: 20px;
    }
    #sfi-noscript-content a {
      color: #cf1e4c;
      text-decoration: none;
      font-weight: 600;
      padding: 2px 0;
      display: inline-block;
    }
    #sfi-noscript-content .cta-button {
      display: inline-block;
      background: #cf1e4c;
      color: #fff !important;
      padding: 16px 32px;
      border-radius: 8px;
      font-size: 18px;
      font-weight: 700;
      margin: 16px 0;
      min-width: 44px;
      min-height: 44px;
      text-align: center;
    }
    #sfi-noscript-content .nav-links {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
      margin-bottom: 24px;
    }
    #sfi-noscript-content .nav-links a {
      background: rgba(0,0,0,0.05);
      color: #111827;
      border-radius: 6px;
      padding: 12px 20px;
      font-size: 16px;
      min-height: 44px;
      line-height: 20px;
      display: inline-flex;
      align-items: center;
    }
    #sfi-noscript-content .address-block {
      background: rgba(0,0,0,0.02);
      border-left: 4px solid #cf1e4c;
      padding: 16px;
      border-radius: 0 8px 8px 0;
      margin: 16px 0;
      font-size: 16px;
    }
    @media (max-width: 480px) {
      #sfi-noscript-content { padding: 16px 12px; }
      #sfi-noscript-content .nav-links a { padding: 10px 14px; }
    }
  </style>
  <?php echo sfi_get_structured_data(); ?>
</head>
<body <?php body_class(); ?>>

  <!-- React SPA Mount Point -->
  <div id="root"></div><!-- #root -->
  <div id="sfi-seo-content">
    <?php echo sfi_get_crawlable_html(); ?>
  </div>
  <script>
    window.addEventListener('DOMContentLoaded', function() {
      var el = document.getElementById('sfi-seo-content');
      if (el) setTimeout(function(){ el.style.display = 'none'; }, 100);
    });
  </script>

  <?php wp_footer(); ?>
</body>
</html>
