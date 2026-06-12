<?php
/**
 * Studio FIT India - Front Page Template
 */

get_header(); ?>

<!-- React SPA Mount Point -->
<div id="root"></div>
<div id="sfi-seo-content" style="position: absolute; left: -9999px; top: -9999px;">
    <?php echo sfi_get_crawlable_html(); ?>
</div>

<?php get_footer(); ?>
