import { useState } from "react";
import { ArrowDown } from "lucide-react";
import SectionHeader from "../components/SectionHeader";
import ProgramCard from "../components/ProgramCard";
import ProgramModal from "../components/ProgramModal";
import { programs } from "../data/programs";
import FAQAccordion from "../components/FAQAccordion";
import SEO from "../components/SEO";

const Programs = () => {
  const [selectedProgram, setSelectedProgram] = useState(null);

  return (
    <div className="w-full">
      <SEO 
        title="Online Fitness Programs — Yoga, HIIT, Zumba & More"
        description="Explore 5+ live online fitness programs led by certified coaches. Choose from Yoga, HIIT, Zumba, Strength Training and Pilates. Flexible timings, beginner to advanced levels."
        keywords={[
          "online fitness programs India",
          "live yoga HIIT zumba classes",
          "online yoga classes",
          "online fitness classes",
          "HIIT classes online India",
          "online gym programs",
          "fitness classes India",
          "online strength training",
          "Zumba classes online",
          "online weight loss program India",
          "online personal trainer India",
          "Studio FIT India programs",
        ]}
      />
      {/* Page Hero */}

      {/* Main Content */}
      <section className="pt-16 pb-24 bg-white relative">
        <div className="container mx-auto px-4">
          <SectionHeader
            heading="Explore Our Programs"
            subheading="Find the perfect fit for your fitness journey."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {programs.map((program) => (
              <div key={program.id} className="h-full">
                <ProgramCard program={program} onSelect={setSelectedProgram} />
              </div>
            ))}
          </div>

          <ProgramModal
            program={selectedProgram}
            onClose={() => setSelectedProgram(null)}
          />

          {/* Who Can Join Section */}
          <div className="bg-gray-50 rounded-2xl p-8 md:p-12 border border-gray-200 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-bold font-heading text-gray-900 mb-6">
                  Who Can Join?
                </h3>
                <ul className="space-y-4">
                  {[
                    "Beginners",
                    "Working Professionals",
                    "College Students",
                    "Homemakers",
                    "Anyone Serious About Fitness",
                  ].map((item, idx) => (
                    <li
                      key={idx}
                      className="flex items-center text-gray-700 text-base font-medium"
                    >
                      <span className="w-2 h-2 bg-secondary rounded-full mr-4"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="text-center md:text-right">
                <blockquote className="text-xl md:text-3xl font-heading font-extrabold text-gray-900 leading-tight">
                  "No age limit. <br />
                  No judgement. <br />
                  Just <span className="text-secondary">progress</span>."
                </blockquote>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="container mx-auto px-4">
          <SectionHeader
            heading="Frequently Asked Questions"
            subheading="Got questions? We've got answers to help you get started."
          />
          <FAQAccordion />
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 bg-gray-50 border-t border-gray-200 text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-extrabold font-heading text-gray-900 mb-4">
            Start Your <span className="text-secondary">Transformation</span>
          </h2>
          <p className="text-base md:text-lg text-gray-600 mb-8 max-w-xl mx-auto">
            Join our fitness family today and unleash your potential.
          </p>
          <a
            href="/pricing"
            className="bg-secondary text-white font-bold py-3.5 px-8 rounded-full hover:bg-secondary/95 transition-all inline-block shadow-sm uppercase tracking-wider text-sm"
          >
            Enroll Now
          </a>
        </div>
      </section>
    </div>
  );
};

export default Programs;
