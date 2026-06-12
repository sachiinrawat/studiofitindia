<?php
/**
 * Template Name: Pricing
 */

get_header(); ?>

<div class="w-full bg-white">
    <!-- Header Section -->
    <section class="pt-24 pb-16 bg-white relative">
        <div class="container mx-auto px-4 relative z-10 text-center">
            <h1 class="text-4xl md:text-6xl font-black font-display uppercase italic mb-6 text-gray-900 tracking-tight">
                Premium <span class="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Memberships</span>
            </h1>
            <p class="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto font-medium italic">
                "Your journey to a healthier, stronger, and more confident version of yourself starts with the right plan."
            </p>
        </div>
    </section>

    <!-- Alternating Pricing Rows -->
    <section class="bg-white">
        <?php
        $pricing_plans = array(
            array(
                "name" => "Starter",
                "duration" => "1 Month",
                "price" => 1499,
                "originalPrice" => 1600,
                "badge" => "Beginner Friendly",
                "features" => ["30 Live Classes", "Core Workouts", "Nutrition Basics", "Group Support"]
            ),
            array(
                "name" => "Standard",
                "duration" => "3 Months + 15 Days",
                "price" => 2900,
                "originalPrice" => 3000,
                "badge" => "Best for Weight Loss",
                "features" => ["90+ Live Classes", "15 Days Extra", "10 Days Pause Option"]
            ),
            array(
                "name" => "PRO",
                "duration" => "6+1 Months",
                "price" => 4600,
                "originalPrice" => 6999,
                "badge" => "Most Popular",
                "features" => ["Unlimited Live Classes", "15 Days Pause Option", "+1 Month Free", "Recorded Library Access"]
            ),
            array(
                "name" => "ELITE",
                "duration" => "1 Year",
                "price" => 6500,
                "originalPrice" => 8000,
                "badge" => "Total Commitment",
                "features" => ["Unlimited Classes", "30 Days Pause Option", "Full Recorded Library", "Progress Monitoring"]
            ),
            array(
                "name" => "1 Month Transformation Plan",
                "duration" => "1 Month",
                "price" => 2499,
                "originalPrice" => 3499,
                "badge" => "Highly Popular",
                "features" => ["30 Day Intense Program", "Unlimited Classes", "Customized Diet Plan", "Weekly Tracking", "Priority Support"]
            ),
            array(
                "name" => "Transformation Elite",
                "duration" => "90 Days",
                "price" => 7900,
                "originalPrice" => 10500,
                "badge" => "Best Results",
                "features" => ["90 Day Intense Program", "Unlimited Classes", "Customized Diet Plan", "Weekly Tracking", "Priority Support"]
            ),
            array(
                "name" => "Personal Training (1 Month)",
                "duration" => "1 Month",
                "price" => 16000,
                "originalPrice" => 20000,
                "badge" => "1-on-1 Focus",
                "features" => ["1-on-1 Personal Training", "16 Sessions", "Daily Progress Monitoring", "Direct WhatsApp Support"]
            ),
            array(
                "name" => "Personal Training (3 Months)",
                "duration" => "3 Months",
                "price" => 38000,
                "originalPrice" => 48000,
                "badge" => "Maximum Transformation",
                "features" => ["1-on-1 Personal Training", "48 Sessions", "Long-term Goal Planning", "Priority Coach Support"]
            )
        );

        $index = 0;
        foreach ($pricing_plans as $plan): 
            $isEven = $index % 2 === 0;
            $index++;
        ?>
            <div class="py-20 <?php echo !$isEven ? 'bg-gray-50/50' : 'bg-white'; ?>">
                <div class="container mx-auto px-4">
                    <div class="flex flex-col <?php echo $isEven ? 'md:flex-row' : 'md:flex-row-reverse'; ?> items-center gap-12 md:gap-20 max-w-6xl mx-auto">
                        
                        <!-- Pricing Side -->
                        <div class="w-full md:w-5/12">
                            <div class="relative p-10 rounded-[40px] border border-gray-100 shadow-2xl bg-white overflow-hidden transition-all duration-500 hover:shadow-primary/10">
                                <?php if ($plan['badge']): ?>
                                    <div class="mb-6">
                                        <span class="bg-gradient-to-r from-primary to-secondary text-white text-[10px] font-black px-4 py-2 rounded-full uppercase tracking-[0.2em] shadow-lg shadow-primary/20">
                                            <?php echo $plan['badge']; ?>
                                        </span>
                                    </div>
                                <?php endif; ?>

                                <h3 class="text-4xl font-black font-display uppercase italic text-gray-900 mb-2"><?php echo $plan['name']; ?></h3>
                                <p class="text-gray-400 font-black uppercase tracking-widest text-xs mb-8"><?php echo $plan['duration']; ?></p>

                                <div class="mb-10">
                                    <?php if ($plan['originalPrice']): ?>
                                        <div class="flex items-center gap-3 mb-2">
                                            <span class="text-gray-400 line-through text-xl font-bold">₹<?php echo number_format($plan['originalPrice']); ?></span>
                                            <span class="text-[10px] bg-green-50 text-green-600 border border-green-200 font-black px-2 py-0.5 rounded-md">SAVE ₹<?php echo number_format($plan['originalPrice'] - $plan['price']); ?></span>
                                        </div>
                                    <?php endif; ?>
                                    <div class="flex items-baseline gap-2">
                                        <span class="text-6xl font-black text-gray-900 font-display italic">₹<?php echo number_format($plan['price']); ?></span>
                                        <span class="text-gray-400 font-black uppercase text-xs">/ <?php echo explode(' ', $plan['duration'])[0]; ?></span>
                                    </div>
                                </div>

                                <?php 
                                $isPT = strpos($plan['name'], 'Personal Training') !== false;
                                $targetLink = $isPT ? (strpos($plan['name'], '1 Month') !== false ? 'https://rzp.io/rzp/personal-training-1month' : 'https://rzp.io/rzp/personal-training-3months') : "https://wa.me/919310666287?text=Hi! I just visited your website and I want to book a trial at just ₹1.";
                                ?>
                                <a href="<?php echo $targetLink; ?>" target="_blank" class="block w-full bg-gradient-to-r from-primary to-secondary text-white text-center font-black py-5 rounded-2xl uppercase tracking-[0.2em] text-sm shadow-xl shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-1 transition-all">
                                    Enroll Now
                                </a>
                            </div>
                        </div>

                        <!-- Features Side -->
                        <div class="w-full md:w-7/12">
                            <div class="space-y-8">
                                <h4 class="text-3xl font-black font-display uppercase italic text-gray-900 mb-6 flex items-center gap-4">
                                    <span class="w-12 h-1 bg-primary rounded-full"></span>
                                    What's Included
                                </h4>
                                <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <?php foreach ($plan['features'] as $feature): ?>
                                        <div class="flex items-start gap-4 group">
                                            <div class="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-primary transition-colors">
                                                <svg class="text-primary group-hover:text-white transition-colors" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                            </div>
                                            <span class="text-gray-700 font-bold text-sm leading-snug"><?php echo $feature; ?></span>
                                        </div>
                                    <?php endforeach; ?>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        <?php endforeach; ?>
    </section>
</div>

<?php get_footer(); ?>
