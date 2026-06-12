<?php
/**
 * Template Name: About Us
 */

get_header(); ?>

<div class="w-full">
    <!-- Hero Section -->
    <section class="pt-24 pb-16 bg-white relative overflow-hidden">
        <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>
        <div class="container mx-auto px-4 relative z-10 text-center">
            <h1 class="text-4xl md:text-6xl font-bold font-display uppercase italic text-gray-900 mb-6 tracking-tight">
                Our <span class="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Legacy</span>
            </h1>
            <p class="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto font-medium italic">
                Empowering thousands across India to achieve their fitness goals through professional, live online coaching.
            </p>
        </div>
    </section>

    <!-- Coaches Section -->
    <section class="py-20 bg-white">
        <div class="container mx-auto px-4">
            <div class="text-center mb-16">
                <h2 class="text-3xl md:text-5xl font-bold font-display uppercase italic text-gray-900 mb-4">
                    Meet The <span class="text-primary">Coaches</span>
                </h2>
                <p class="text-gray-500 font-medium italic">Experts in giving you the best start.</p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
                <?php
                $coaches = array(
                    array(
                        "name" => "Pankaj Kavle",
                        "role" => "Transformation Coach",
                        "image" => "/assets/coaches/pankaj-kavle.webp",
                        "specializations" => "Strength Training, HIIT, Functional, CrossFit"
                    ),
                    array(
                        "name" => "Puja Vaish",
                        "role" => "Pilates & Aerobics Trainer",
                        "image" => "/assets/coaches/puja-vaish.webp",
                        "specializations" => "Core Strength, Flexibility, Cardio, Body Toning"
                    ),
                    array(
                        "name" => "Nitin Dabhade",
                        "role" => "Yoga & Aerobics Trainer",
                        "image" => "/assets/coaches/nitin-dabhade.webp",
                        "specializations" => "Power Yoga, fat-burning yoga, Choreography"
                    ),
                    array(
                        "name" => "Yashi Tiwari",
                        "role" => "Yoga Trainer",
                        "image" => "/assets/coaches/yashi-tiwari.webp",
                        "specializations" => "Asanas, Meditation, Mindfulness, Flexibility"
                    ),
                    array(
                        "name" => "Jyoti Yadav",
                        "role" => "Yoga Trainer",
                        "image" => "/assets/coaches/Jyoti-yadav.jpeg",
                        "specializations" => "Mudras, Bandha, Face Yoga, Ashtanga Yoga"
                    ),
                    array(
                        "name" => "Geeta Khatri",
                        "role" => "Dance Fitness Instructor",
                        "image" => "/assets/coaches/geeta-khatri.jpeg",
                        "specializations" => "Dance Fitness, Zumba, Choreography"
                    ),
                    array(
                        "name" => "Jurul Thomas Daimari",
                        "role" => "Licensed Zumba® Instructor",
                        "image" => "/assets/coaches/Jurul Thomas.jpeg",
                        "specializations" => "Zumba®, Dance Fitness, High-Energy, Group Fitness"
                    )
                );

                foreach ($coaches as $coach): ?>
                    <div class="group relative bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-xl transition-all duration-500 hover:-translate-y-2">
                        <div class="aspect-[4/5] overflow-hidden">
                            <img src="<?php echo get_template_directory_uri() . $coach['image']; ?>" alt="<?php echo $coach['name']; ?>" class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700">
                        </div>
                        <div class="p-6 text-center">
                            <h3 class="text-xl font-bold font-display uppercase italic text-gray-900 mb-1"><?php echo $coach['name']; ?></h3>
                            <p class="text-primary font-bold text-xs uppercase tracking-widest mb-3"><?php echo $coach['role']; ?></p>
                            <p class="text-gray-500 text-[10px] font-bold uppercase italic leading-tight"><?php echo $coach['specializations']; ?></p>
                        </div>
                    </div>
                <?php endforeach; ?>
            </div>
        </div>
    </section>

    <!-- Values Section -->
    <section class="py-24 bg-gray-50">
        <div class="container mx-auto px-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
                <div>
                    <h2 class="text-4xl font-black font-display uppercase italic text-gray-900 mb-8 leading-tight">
                        We are here to <br><span class="text-primary">Help & Inspire</span>
                    </h2>
                    <p class="text-lg text-gray-800 leading-relaxed mb-8 font-medium italic border-l-4 border-primary pl-6">
                        "Your journey to wellness is not a solo mission. We empower you with the knowledge and motivation to make lasting changes."
                    </p>
                    <p class="text-gray-600 leading-relaxed font-medium">
                        At Studio FIT India, we believe in a holistic approach to fitness. We don't just teach classes; we build communities that support and lift each other up.
                    </p>
                </div>
                <div class="grid grid-cols-2 gap-6">
                    <?php
                    $values = [
                        ["title" => "Inclusive", "desc" => "For everyone"],
                        ["title" => "Responsible", "desc" => "Sustainable health"],
                        ["title" => "Respectful", "desc" => "Diverse bodies"],
                        ["title" => "Collaborative", "desc" => "Team support"]
                    ];
                    foreach ($values as $val): ?>
                        <div class="bg-white p-6 rounded-3xl border border-gray-100 shadow-lg text-center group hover:border-primary/30 transition-colors">
                            <div class="w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary transition-colors">
                                <svg class="text-primary group-hover:text-white transition-colors" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                            </div>
                            <h4 class="font-black text-gray-900 text-xs uppercase tracking-widest mb-1"><?php echo $val['title']; ?></h4>
                            <p class="text-[10px] text-gray-500 font-bold italic"><?php echo $val['desc']; ?></p>
                        </div>
                    <?php endforeach; ?>
                </div>
            </div>
        </div>
    </section>

    <!-- Founder Section -->
    <section class="py-24 bg-white">
        <div class="container mx-auto px-4">
            <div class="flex flex-col md:flex-row items-center gap-16 max-w-5xl mx-auto">
                <div class="w-full md:w-1/2 relative">
                    <div class="relative rounded-[40px] overflow-hidden shadow-2xl border-8 border-gray-50 group">
                        <img src="<?php echo get_template_directory_uri(); ?>/assets/coaches/Subodh.jpg" alt="Subodh Sharma" class="w-full h-auto object-cover transform group-hover:scale-105 transition-all duration-1000">
                        <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div class="absolute bottom-0 left-0 p-10 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                            <h3 class="text-3xl font-black text-white font-display uppercase italic">Subodh Sharma</h3>
                            <p class="text-primary font-black uppercase tracking-[0.2em] text-sm">CEO & Founder</p>
                        </div>
                    </div>
                    <div class="absolute -bottom-6 -right-6 w-32 h-32 bg-secondary rounded-full flex items-center justify-center text-white font-black text-xs text-center p-4 transform rotate-12 shadow-xl z-20">
                        #BUILDING<br>LIVES
                    </div>
                </div>
                <div class="w-full md:w-1/2">
                    <h3 class="text-4xl font-black text-gray-900 mb-8 font-display uppercase italic leading-tight">
                        Building a <span class="text-primary">Life</span>, <br>Not Just a Body
                    </h3>
                    <div class="relative">
                        <svg class="absolute -top-10 -left-6 text-primary/10" width="60" height="60" viewBox="0 0 24 24" fill="currentColor"><path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C20.1216 16 21.017 16.8954 21.017 18V21C21.017 22.1046 20.1216 23 19.017 23H16.017C14.9124 23 14.017 22.1046 14.017 21ZM14.017 14V11C14.017 9.89543 14.9124 9 16.017 9H19.017C20.1216 9 21.017 9.89543 21.017 11V14C21.017 15.1046 20.1216 16 19.017 16H16.017C14.9124 16 14.017 15.1046 14.017 14ZM3.017 21L3.017 18C3.017 16.8954 3.91243 16 5.017 16H8.017C9.12157 16 10.017 16.8954 10.017 18V21C10.017 22.1046 9.12157 23 8.017 23H5.017C3.91243 23 3.017 22.1046 3.017 21ZM3.017 14V11C3.017 9.89543 3.91243 9 5.017 9H8.017C9.12157 9 10.017 9.89543 10.017 11V14C10.017 15.1046 9.12157 16 8.017 16H5.017C3.91243 16 3.017 15.1046 3.017 14Z"/></svg>
                        <p class="text-xl text-gray-800 italic leading-relaxed relative z-10 font-medium">
                            "At Studio FIT India, we believe in empowering you to achieve your best self through discipline, consistency, and holistic wellness. Our mission is to make high-quality fitness coaching accessible to every home in India."
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Bottom CTA -->
    <section class="py-24 bg-gray-900 relative overflow-hidden text-center">
        <div class="absolute inset-0 opacity-20 bg-[url('<?php echo get_template_directory_uri(); ?>/assets/pattern.png')] bg-repeat"></div>
        <div class="container mx-auto px-4 relative z-10">
            <h2 class="text-3xl md:text-5xl font-black font-display uppercase italic text-white mb-6">
                Ready to Join the <span class="text-primary">Family?</span>
            </h2>
            <p class="text-xl text-gray-400 italic mb-10 max-w-2xl mx-auto">
                "More than just online classes — it's a support system built for your success."
            </p>
            <a href="<?php echo home_url('/pricing'); ?>" class="inline-block bg-gradient-to-r from-primary to-secondary text-white font-black py-5 px-12 rounded-2xl uppercase tracking-[0.2em] text-sm shadow-xl shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-1 transition-all active:scale-95">
                Enroll Now
            </a>
        </div>
    </section>
</div>

<?php get_footer(); ?>
