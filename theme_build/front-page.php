<?php
/**
 * Studio FIT India - Front Page Template
 */

get_header(); ?>

<!-- React SPA Mount Point -->
<div id="root"></div>
<div id="sfi-seo-content">
    <?php echo sfi_get_crawlable_html(); ?>
</div>
<script>
  window.addEventListener('DOMContentLoaded', function() {
    var el = document.getElementById('sfi-seo-content');
    if (el) setTimeout(function(){ el.style.display = 'none'; }, 100);
  });
</script>

<?php get_footer(); ?>
