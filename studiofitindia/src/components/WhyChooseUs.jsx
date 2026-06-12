import { Heart, ShieldCheck, Zap, Users } from "lucide-react";
import SectionHeader from "./SectionHeader";

const values = [
  {
    title: "Inclusive",
    desc: "Fitness programs for every body and every age.",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=600&q=80",
    icon: Heart,
  },
  {
    title: "Responsible",
    desc: "Promoting long-term sustainability and real health.",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=600&q=80",
    icon: ShieldCheck,
  },
  {
    title: "High-Energy",
    desc: "Sessions that leave you energized and motivated.",
    image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=600&q=80",
    icon: Zap,
  },
  {
    title: "Collaborative",
    desc: "Teamwork, support, and shared goals — always.",
    image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=600&q=80",
    icon: Users,
  },
];

const WhyChooseUs = () => {
  return (
    <section className="py-16 bg-white border-b border-gray-100">
      <div className="container mx-auto px-4">
        <SectionHeader
          heading="Why Studio FIT India?"
          subheading="The most trusted name in live online fitness. A community built for your total virtual transformation."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {values.map((val, idx) => (
            <div
              key={idx}
              className="bg-white border border-gray-200 rounded-none transition-all shadow-sm hover:shadow-md duration-300 relative flex flex-col h-full"
            >
              {/* Image Container */}
              <div className="h-52 w-full relative">
                <img
                  src={val.image}
                  alt={val.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>

              {/* Overlapping Icon Badge */}
              <div className="absolute top-[184px] left-6 z-10 w-12 h-12 bg-primary rounded-none flex items-center justify-center shadow-md border border-white">
                <val.icon size={22} className="text-white" />
              </div>

              {/* Text Container */}
              <div className="p-6 pt-8 flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-extrabold uppercase tracking-wider text-primary font-heading mb-2">
                    {val.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {val.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
