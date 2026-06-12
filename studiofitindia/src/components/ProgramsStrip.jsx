import { Link } from "react-router-dom";
import SectionHeader from "./SectionHeader";
import ProgramCard from "./ProgramCard";
import { programs } from "../data/programs";

const ProgramsStrip = () => {
  // Show first 4 programs
  const displayedPrograms = programs.slice(0, 4);

  return (
    <section className="py-16 bg-white relative">
      <div className="container mx-auto px-4">
        <SectionHeader
          heading="Online Fitness Programs in India — Yoga, HIIT, Zumba & More"
          subheading="Find the perfect live online fitness class for your goals — weight loss, strength, flexibility or stress relief."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {displayedPrograms.map((program) => (
            <div key={program.id} className="h-full">
              <ProgramCard program={program} />
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link
            to="/programs"
            className="inline-flex items-center text-primary font-bold hover:text-gray-900 transition-colors text-lg"
          >
            View All Programs <span className="ml-2">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProgramsStrip;
