import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Draggable } from 'gsap/Draggable';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, Draggable);

const FITNESS_IMAGES = [
    {
        src: "https://res.cloudinary.com/dvrwadsfh/image/upload/v1784811005/5be07b3c-1dd5-4b6e-bab3-40e10647a65b.png",
        name: "Neha T.",
        result: "Lost 12kg in 90 Days"
    },
    {
        src: "https://res.cloudinary.com/dvrwadsfh/image/upload/v1777446568/WhatsApp_Image_2026-04-29_at_12.34.33_PM_igdral.jpg",
        name: "Riya K.",
        result: "Lost 8kg in 45 Days"
    },
    {
        src: "https://res.cloudinary.com/dvrwadsfh/image/upload/v1777446568/WhatsApp_Image_2026-04-29_at_12.34.33_PM_2_lxdqdo.jpg",
        name: "Simran S.",
        result: "Lost 10kg in 90 Days"
    },
    {
        src: "https://res.cloudinary.com/dvrwadsfh/image/upload/v1777446568/WhatsApp_Image_2026-04-29_at_12.34.32_PM_qsnh4s.jpg",
        name: "Pooja M.",
        result: "Complete Recomposition"
    },
    {
        src: "https://res.cloudinary.com/dvrwadsfh/image/upload/v1777446567/WhatsApp_Image_2026-04-29_at_12.34.33_PM_1_umnvjz.jpg",
        name: "Anjali D.",
        result: "Lost 14kg in 90 Days"
    },
    {
        src: "https://res.cloudinary.com/dvrwadsfh/image/upload/v1777446567/WhatsApp_Image_2026-04-29_at_12.34.32_PM_1_rltu0l.jpg",
        name: "Kirti V.",
        result: "Lost 9kg, 4 inches"
    },
    {
        src: "https://res.cloudinary.com/dvrwadsfh/image/upload/v1777449106/new_aezcxf.jpg",
        name: "Megha P.",
        result: "Lost 15kg in 90 Days"
    }
];

// Double images so there are enough items for seamless loop
const CARDS = [...FITNESS_IMAGES, ...FITNESS_IMAGES];

const InfiniteSlider = () => {
    const sectionRef = useRef(null);
    const galleryRef = useRef(null);

    useGSAP(() => {
        const gallery = galleryRef.current;
        if (!gallery) return;

        let iteration = 0;
        const liEls = gallery.querySelectorAll('li');

        gsap.set(liEls, { xPercent: 400, opacity: 0, scale: 0 });

        const spacing = 0.1;
        const snapTime = gsap.utils.snap(spacing);
        const cards = Array.from(liEls);

        const animateFunc = (element) => {
            const tl = gsap.timeline();
            tl.fromTo(element,
                { scale: 0, opacity: 0 },
                { scale: 1, opacity: 1, zIndex: 100, duration: 0.5, yoyo: true, repeat: 1, ease: "power1.in", immediateRender: false }
            ).fromTo(element,
                { xPercent: 400 },
                { xPercent: -400, duration: 1, ease: "none", immediateRender: false },
                0
            );
            return tl;
        };

        const seamlessLoop = buildSeamlessLoop(cards, spacing, animateFunc);

        const playhead = { offset: 0 };
        const wrapTime = gsap.utils.wrap(0, seamlessLoop.duration());

        const scrub = gsap.to(playhead, {
            offset: 0,
            onUpdate() {
                seamlessLoop.time(wrapTime(playhead.offset));
            },
            duration: 0.5,
            ease: "power3",
            paused: true
        });

        // SAFE FIX: Removed the infinite scroll trap (wrap logic) that snapped the page.
        // Now it simply pins, scrubs through the seamless loop as the user scrolls,
        // and unpins smoothly so they can continue to the Coaches section.
        const trigger = ScrollTrigger.create({
            trigger: gallery,
            start: "top top",
            end: "+=3000",
            pin: true,
            pinSpacing: true,
            onUpdate(self) {
                scrub.vars.offset = self.progress * seamlessLoop.duration();
                scrub.invalidate().restart();
            },
        });

        // Convert progress (0-1) to an actual scroll Y position
        const progressToScroll = (progress) =>
            gsap.utils.clamp(trigger.start, trigger.end, trigger.start + progress * (trigger.end - trigger.start));

        function scrollToOffset(offset) {
            const snappedTime = snapTime(offset);
            // Wrap time between 0 and duration to handle infinite drag
            const wrappedTime = gsap.utils.wrap(0, seamlessLoop.duration(), snappedTime);
            const progress = wrappedTime / seamlessLoop.duration();
            const scroll = progressToScroll(progress);
            trigger.scroll(scroll);
        }

        function handleScrollEnd() {
            // ONLY snap to the closest item if the user is currently inside the slider section
            if (trigger.isActive) {
                scrollToOffset(scrub.vars.offset);
            }
        }
        ScrollTrigger.addEventListener("scrollEnd", handleScrollEnd);

        // Prev / Next buttons scoped inside sectionRef
        const nextBtn = sectionRef.current?.querySelector(".slider-next");
        const prevBtn = sectionRef.current?.querySelector(".slider-prev");
        const handleNext = () => scrollToOffset(scrub.vars.offset + spacing);
        const handlePrev = () => scrollToOffset(scrub.vars.offset - spacing);
        if (nextBtn) nextBtn.addEventListener("click", handleNext);
        if (prevBtn) prevBtn.addEventListener("click", handlePrev);

        // Drag (mobile-friendly)
        const dragProxy = sectionRef.current?.querySelector(".slider-drag-proxy");
        if (dragProxy) {
            Draggable.create(dragProxy, {
                type: "x",
                trigger: gallery.querySelector("ul"),
                onPress() { this.startOffset = scrub.vars.offset; },
                onDrag() {
                    scrub.vars.offset = this.startOffset + (this.startX - this.x) * 0.001;
                    scrub.invalidate().restart();
                },
                onDragEnd() { scrollToOffset(scrub.vars.offset); }
            });
        }

        function buildSeamlessLoop(items, spacing, animateFunc) {
            const overlap = Math.ceil(1 / spacing);
            const startTime = items.length * spacing + 0.5;
            const loopTime = (items.length + overlap) * spacing + 1;
            const rawSequence = gsap.timeline({ paused: true });
            const seamlessLoop = gsap.timeline({
                paused: true,
                repeat: -1,
                onRepeat() {
                    this._time === this._dur && (this._tTime += this._dur - 0.01);
                }
            });
            const l = items.length + overlap * 2;

            for (let i = 0; i < l; i++) {
                const index = i % items.length;
                const time = i * spacing;
                rawSequence.add(animateFunc(items[index]), time);
                if (i <= items.length) seamlessLoop.add("label" + i, time);
            }

            rawSequence.time(startTime);
            seamlessLoop.to(rawSequence, {
                time: loopTime,
                duration: loopTime - startTime,
                ease: "none"
            }).fromTo(rawSequence, { time: overlap * spacing + 1 }, {
                time: startTime,
                duration: startTime - (overlap * spacing + 1),
                immediateRender: false,
                ease: "none"
            });
            return seamlessLoop;
        }

        return () => {
            ScrollTrigger.removeEventListener("scrollEnd", handleScrollEnd);
            if (nextBtn) nextBtn.removeEventListener("click", handleNext);
            if (prevBtn) prevBtn.removeEventListener("click", handlePrev);
            trigger.kill();
        };
    }, { scope: sectionRef });

    return (
        <section ref={sectionRef} className="w-full bg-[#0a0a0a]">
            {/* Section header above the pinned gallery */}
            <div className="text-center py-16 px-6 bg-[#0a0a0a]">
                <span className="inline-block text-[#D3365F] text-xs font-bold uppercase tracking-widest mb-3">
                    Transformations
                </span>
                <h2 className="text-4xl md:text-5xl font-extrabold font-heading text-white">
                    Real Members.{" "}
                    <span className="text-[#D3365F]">Real Results.</span>
                </h2>
                <p className="text-white/50 mt-4 text-lg max-w-xl mx-auto">
                    Scroll through or drag to see the stories of members who committed to the 90-day program.
                </p>
            </div>

            {/* Pinned slider gallery — full viewport height */}
            <div
                ref={galleryRef}
                className="relative w-full overflow-hidden bg-[#0a0a0a]"
                style={{ height: "100vh" }}
            >
                <ul
                    className="absolute p-0 m-0 list-none"
                    style={{
                        width: "min(90vw, 36rem)",
                        height: "min(90vw, 36rem)",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)"
                    }}
                >
                    {CARDS.map((card, idx) => (
                        <li
                            key={idx}
                            className="absolute top-0 left-0 rounded-2xl overflow-hidden shadow-2xl shadow-black/80 list-none"
                            style={{ width: "min(90vw, 36rem)", height: "min(90vw, 36rem)" }}
                        >
                            <img
                                src={card.src}
                                alt={card.name}
                                className="w-full h-full object-cover pointer-events-none"
                                draggable={false}
                            />
                        </li>
                    ))}
                </ul>

                {/* Prev / Next buttons */}
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-4 z-20">
                    <button className="slider-prev bg-white/10 hover:bg-[#D3365F] text-white backdrop-blur-md px-7 py-3 rounded-full font-bold text-sm transition-all border border-white/10 hover:border-transparent">
                        ← Prev
                    </button>
                    <button className="slider-next bg-white/10 hover:bg-[#D3365F] text-white backdrop-blur-md px-7 py-3 rounded-full font-bold text-sm transition-all border border-white/10 hover:border-transparent">
                        Next →
                    </button>
                </div>
            </div>

            {/* Drag proxy (invisible) */}
            <div className="slider-drag-proxy" style={{ visibility: "hidden", position: "absolute" }} />
        </section>
    );
};

export default InfiniteSlider;
