import SectionHeader from "../components/SectionHeader";
import CoachCard from "../components/CoachCard";
import { coaches } from "../data/coaches";
import { Heart, Globe, Users, Smile } from "lucide-react";
import { useState } from "react";
import CoachModal from "../components/CoachModal";
import EventGallery from "../components/EventGallery";

import SEO from "../components/SEO";
import { useAssetUrl } from "../utils/assets";

const About = () => {
  const subodhImageUrl = useAssetUrl("/assets/coaches/Subodh.jpg");
  const [selectedCoach, setSelectedCoach] = useState(null);

  const values = [
    {
      title: "Inclusive",
      desc: "Fitness programs designed for everyone.",
      icon: Heart,
    },
    {
      title: "Responsible",
      desc: "Promoting sustainability and health.",
      icon: Globe,
    },
    {
      title: "Respectful",
      desc: "Embracing diverse bodies and abilities.",
      icon: Smile,
    },
    {
      title: "Collaborative",
      desc: "Teamwork, support, and shared goals.",
      icon: Users,
    },
  ];

  return (
    <div className="w-full">
      <SEO 
        title="About Studio FIT India — Certified Online Fitness Coaches"
        description="Meet Studio FIT India's certified fitness coaches with 4-15 years of experience in Yoga, HIIT, Zumba and Strength Training. India's most trusted live online fitness studio."
        keywords={[
          "certified online fitness coach India",
          "yoga instructor online India",
          "Studio FIT India",
          "online fitness studio India",
          "certified online fitness coach India",
          "online yoga instructor India",
          "best online gym India",
          "about Studio FIT India",
          "online fitness community India",
        ]}
      />
      {/* Hero */}
      {/* Coaches Section */}
      <section className="pt-6 pb-24 bg-white">
        <div className="container mx-auto px-4">
          <SectionHeader
            heading="Meet The Coaches"
            subheading="Experts in giving you the best start."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {coaches.map((coach) => (
              <div key={coach.id}>
                <CoachCard coach={coach} onSelect={setSelectedCoach} />
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Intro Section */}
      <section className="py-16 bg-gray-50 border-y border-gray-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold font-heading text-gray-900 mb-6">
                We are here to help and inspire
              </h2>
              <p className="text-base text-secondary mb-6 font-semibold">
                "Crucial for overall health and well-being."
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                At our core, we're committed to being a guiding light on the
                journey to wellness, offering both support and inspiration. We
                understand that embracing a healthier lifestyle and achieving
                fitness goals can be a challenging endeavor.
              </p>
              <p className="text-gray-600 leading-relaxed font-normal">
                That's why we're here, ready to empower individuals with the
                knowledge, tools, and encouragement they need to make lasting,
                positive changes.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl border-l-4 border-secondary shadow-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {values.map((val, idx) => (
                  <div key={idx} className="text-center">
                    <div className="bg-secondary/5 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                      <val.icon className="text-secondary" size={24} />
                    </div>
                    <h4 className="font-bold text-gray-900 mb-1">{val.title}</h4>
                    <p className="text-xs text-gray-600">{val.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Coach Modal */}

      {selectedCoach && (
        <CoachModal
          coach={selectedCoach}
          onClose={() => setSelectedCoach(null)}
        />
      )}
      {/* Founder Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <SectionHeader
            heading="Meet Our Founder"
            subheading="The visionary behind Studio FIT India."
          />
          <div className="flex flex-col md:flex-row items-center gap-12 max-w-5xl mx-auto">
            <div className="w-full md:w-1/2">
              <div className="relative rounded-2xl overflow-hidden shadow-sm border border-gray-200 group">
                <img
                  src={subodhImageUrl}
                  alt="Subodh Sharma, Founder"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-102"
                />
                <div className="absolute inset-0 bg-gray-900/5"></div>
                <div className="absolute bottom-0 left-0 p-6">
                  <h3 className="text-xl font-bold text-gray-900 font-heading">
                    Subodh Sharma
                  </h3>
                  <p className="text-secondary text-sm font-semibold">CEO & Founder</p>
                </div>
              </div>
            </div>

            <div className="w-full md:w-1/2 text-center md:text-left">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 font-heading">
                Building a <span className="text-secondary">Life</span>, Not Just a Body
              </h3>
              <div className="relative">
                <span className="absolute -top-6 -left-4 text-6xl text-secondary/5 font-serif">
                  “
                </span>
                <p className="text-lg text-gray-600 leading-relaxed relative z-10 font-normal">
                  Fitness is not just about building a body, it's about building
                  a life. At Studio FIT India, we believe in empowering you to
                  achieve your best self through discipline, consistency, and
                  holistic wellness.
                </p>
                <div className="mt-6 w-12 h-1 bg-secondary mx-auto md:mx-0 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Studio Moments */}
      <EventGallery />

      {/* Bottom CTA */}
      <section className="py-16 bg-gray-50 border-t border-gray-200 text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold font-heading text-gray-900 mb-3">
            More than just online classes
          </h2>
          <p className="text-gray-500 text-base mb-8 max-w-xl mx-auto">
            Welcome to our fitness family, where sweat, support, and success intertwine.
          </p>
          <a
            href="/pricing"
            className="bg-secondary hover:bg-secondary/95 text-white font-bold py-3.5 px-8 rounded-full transition-all inline-block shadow-sm uppercase tracking-wider text-sm"
          >
            Enroll Now
          </a>
        </div>
      </section>
    </div>
  );
};

export default About;
