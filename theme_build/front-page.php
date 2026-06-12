<?php
/**
 * Studio FIT India - Front Page Template
 */

get_header(); ?>

<!-- React SPA Mount Point -->
<div id="root">
    <?php echo sfi_get_crawlable_html(); ?>
</div>

<?php get_footer(); ?>
