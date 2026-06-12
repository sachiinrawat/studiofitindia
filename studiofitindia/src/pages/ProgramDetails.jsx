import { Link } from "react-router-dom";
import {
  CheckCircle,
  Clock,
  Users,
  Star,
  MessageCircle,
  ArrowLeft,
  ChevronRight,
} from "lucide-react";
import { programs } from "../data/programs";
import SEO from "../components/SEO";
import { useLocation, Navigate } from "react-router-dom";

const ProgramDetails = () => {
  const location = useLocation();
  const slug = location.pathname.replace(/^\/?/, "").replace(/\/$/, "");
  const program = programs.find((p) => p.slug === slug);

  // If slug doesn't match any program, redirect to /programs
  if (!program) return <Navigate to="/programs" replace />;

  const { seo } = program;

  const courseSchema = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: seo.title,
    description: seo.description,
    provider: {
      "@type": "Organization",
      name: "Studio FIT India",
      url: "https://studiofitindia.com",
      logo: "https://res.cloudinary.com/dvrwadsfh/image/upload/v1777445549/image_ks0v7p.png",
    },
    url: `https://studiofitindia.com/${program.slug}`,
    image: program.image,
    offers: {
      "@type": "Offer",
      price: "999",
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
      category: "Online Fitness Course",
    },
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: "online",
      courseWorkload: "PT1H",
      instructor: {
        "@type": "Person",
        name: "Studio FIT India Coach",
        affiliation: "Studio FIT India",
      },
    },
  };

  const whatsappUrl = `https://wa.me/919310666287?text=${encodeURIComponent(
    `Hi! I'm interested in the ${program.name} program. Can I book a trial at just ₹1?`,
  )}`;

  const handleConversion = () => {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "conversion", {
        send_to: "AW-17925563887/NUd8CJnlipEcEO_LyeNC",
      });
    }
  };

  return (
    <div className="w-full bg-white min-h-screen">
      <SEO title={seo.title} description={seo.description} keywords={seo.keywords} schema={courseSchema} />
      {/* Hero Section */}
      <section className="relative pt-12 pb-16 overflow-hidden border-b border-gray-100 bg-gray-50/50">
        <div className="container mx-auto px-4 relative z-10">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-gray-500 mb-8 uppercase tracking-wider">
            <Link to="/" className="hover:text-secondary transition-colors font-semibold">
              Home
            </Link>
            <ChevronRight size={12} />
            <Link
              to="/programs"
              className="hover:text-secondary transition-colors font-semibold"
            >
              Programs
            </Link>
            <ChevronRight size={12} />
            <span className="text-secondary font-bold">{program.name}</span>
          </nav>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-secondary/5 border border-secondary/10 text-secondary px-4 py-1.5 rounded-full text-xs font-bold mb-6">
              <Star size={12} fill="currentColor" />
              Live Online Classes · Certified Coaches
            </div>

            <h1 className="text-3xl md:text-5xl font-extrabold font-heading text-gray-900 mb-6 leading-tight">
              {seo.h1}
            </h1>

            <p className="text-base md:text-lg text-gray-600 mb-8 leading-relaxed max-w-2xl font-normal">
              {seo.description}
            </p>

            {/* Quick Stats */}
            <div className="flex flex-wrap gap-6 mb-10">
              {[
                { icon: Users, label: "2,000+ Members" },
                { icon: Star, label: "4.9 ★ Rating" },
                { icon: Clock, label: "5am–9pm Batches" },
              ].map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-2 text-gray-700 text-sm font-semibold"
                >
                  <Icon size={16} className="text-secondary" />
                  {label}
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleConversion}
                className="bg-secondary text-white font-bold py-3.5 px-8 rounded-full hover:bg-secondary/95 transition-all shadow-sm flex items-center gap-2 text-sm uppercase tracking-wider"
              >
                <MessageCircle size={16} />
                Book a Trial at Just ₹1
              </a>
              <Link
                to="/programs"
                className="border border-gray-300 text-gray-700 font-bold py-3.5 px-8 rounded-full hover:bg-gray-50 transition-all flex items-center gap-2 text-sm uppercase tracking-wider"
              >
                <ArrowLeft size={16} />
                All Programs
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Best For Tags */}
      <section className="py-6 bg-white border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center gap-3 justify-center md:justify-start">
            <span className="text-gray-400 text-xs font-bold uppercase tracking-wider">
              Best For:
            </span>
            {program.bestFor.map((tag, i) => (
              <span
                key={i}
                className="bg-gray-100 border border-gray-200 text-gray-700 px-3.5 py-1 rounded-full text-xs font-semibold"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left: Detailed Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Why Choose Section */}
              <div>
                <h2 className="text-2xl font-bold font-heading text-gray-900 mb-4">
                  {seo.h2s[0]}
                </h2>
                <div className="h-1 w-12 bg-secondary mb-6 rounded-full" />
                <p className="text-gray-600 leading-relaxed text-base mb-6 font-normal">
                  At Studio FIT India, our{" "}
                  <strong className="text-gray-900">{program.name}</strong> classes
                  are led by certified coaches with years of hands-on
                  experience. Every session is designed to be live, interactive,
                  and personalized — so you get results faster than training
                  alone.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {program.features.map((f, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 bg-gray-50 p-4 border border-gray-200 rounded-xl"
                    >
                      <CheckCircle
                        size={18}
                        className="text-secondary mt-0.5 shrink-0"
                      />
                      <span className="text-gray-700 text-sm font-semibold">
                        {f}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* What You Learn */}
              <div>
                <h2 className="text-2xl font-bold font-heading text-gray-900 mb-4">
                  {seo.h2s[1]}
                </h2>
                <div className="h-1 w-12 bg-secondary mb-6 rounded-full" />
                <div className="prose prose-slate max-w-none text-gray-600 leading-relaxed space-y-4 font-normal">
                  {program.details.split("\n").map((line, i) => {
                    const trimmed = line.trim();
                    if (!trimmed) return null;
                    if (trimmed.startsWith("**") && trimmed.endsWith("**")) {
                      return (
                        <h3
                          key={i}
                          className="text-lg font-bold text-gray-900 mt-6 mb-2 font-heading"
                        >
                          {trimmed.replace(/\*\*/g, "")}
                        </h3>
                      );
                    }
                    if (trimmed.startsWith("- **")) {
                      const [boldPart, ...rest] = trimmed.slice(4).split(":**");
                      return (
                        <div key={i} className="flex items-start gap-3">
                          <CheckCircle
                            size={16}
                            className="text-secondary mt-1 shrink-0"
                          />
                          <p className="text-sm">
                            <strong className="text-gray-900">{boldPart}:</strong>{" "}
                            {rest.join(":").trim()}
                          </p>
                        </div>
                      );
                    }
                    return <p key={i} className="text-sm">{trimmed}</p>;
                  })}
                </div>
              </div>

              {/* Who Can Join */}
              <div>
                <h2 className="text-2xl font-bold font-heading text-gray-900 mb-4">
                  {seo.h2s[2]}
                </h2>
                <div className="h-1 w-12 bg-secondary mb-6 rounded-full" />
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {[
                    "Complete Beginners",
                    "Working Professionals",
                    "Homemakers",
                    "College Students",
                    "Seniors 60+",
                    "Intermediate Athletes",
                  ].map((who) => (
                    <div
                      key={who}
                      className="flex items-center gap-2.5 bg-gray-50 p-4 border border-gray-200 rounded-xl"
                    >
                      <div className="w-1.5 h-1.5 bg-secondary rounded-full shrink-0" />
                      <span className="text-gray-700 text-sm font-semibold">
                        {who}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Class Timings */}
              <div>
                <h2 className="text-2xl font-bold font-heading text-gray-900 mb-4">
                  {seo.h2s[3]}
                </h2>
                <div className="h-1 w-12 bg-secondary mb-6 rounded-full" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-lg">
                  {[
                    { time: "5:00am – 10:00am", label: "Morning Batch" },
                    { time: "4:00pm – 9:00pm", label: "Evening Batch" },
                  ].map(({ time, label }) => (
                    <div
                      key={label}
                      className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-center"
                    >
                      <div className="text-gray-500 font-bold text-xs mb-1.5 uppercase tracking-wider">
                        {label}
                      </div>
                      <div className="text-secondary font-bold text-sm">
                        {time}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Sticky Sidebar CTA */}
            <div className="lg:col-span-1">
              <div className="sticky top-28 bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
                <img
                  src={program.image}
                  alt={program.name}
                  className="w-full h-44 object-cover"
                />
                <div className="p-6">
                  <div className="text-secondary text-xs font-bold mb-4 uppercase tracking-wider">
                    Book a Trial at Just ₹1 — No Card Needed
                  </div>

                  <div className="h-px bg-gray-100 mb-4" />

                  <div className="space-y-3 mb-6">
                    {[
                      "Live interactive sessions",
                      "Certified expert coaches",
                      "All fitness levels welcome",
                      "Morning, evening & weekend batches",
                      "Cancel anytime",
                    ].map((feat) => (
                      <div
                        key={feat}
                        className="flex items-center gap-2.5 text-gray-700 text-xs font-medium"
                      >
                        <CheckCircle
                          size={15}
                          className="text-secondary shrink-0"
                        />
                        {feat}
                      </div>
                    ))}
                  </div>

                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={handleConversion}
                    className="block w-full text-center bg-secondary hover:bg-secondary/95 text-white font-bold py-3.5 rounded-full transition-all shadow-sm mb-3 text-xs uppercase tracking-wider"
                  >
                    Book a Trial at Just ₹1 on WhatsApp
                  </a>
                  <Link
                    to="/pricing"
                    className="block w-full text-center border border-gray-300 text-gray-700 font-bold py-3 rounded-full hover:bg-gray-50 transition-all text-xs uppercase tracking-wider"
                  >
                    View All Pricing Plans
                  </Link>

                  <p className="text-center text-gray-400 text-[10px] mt-4 font-semibold">
                    Call us:{" "}
                    <a
                      href="tel:+919310666287"
                      className="text-gray-600 hover:text-secondary font-bold"
                    >
                      +91 93106 66287
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Other Programs Strip */}
      <section className="py-12 bg-gray-50 border-t border-gray-200">
        <div className="container mx-auto px-4">
          <h2 className="text-xl font-bold text-gray-900 mb-6 text-center">
            Explore Our Other Programs
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {programs
              .filter((p) => p.slug !== slug)
              .map((p) => (
                <Link
                  key={p.id}
                  to={`/${p.slug}`}
                  className="bg-white border border-gray-200 hover:border-secondary text-gray-700 hover:text-secondary px-4 py-2 rounded-full text-xs font-bold transition-all shadow-sm"
                >
                  {p.name}
                </Link>
              ))}
          </div>
        </div>
      </section>

      {/* Final CTA Banner */}
      <section className="py-16 bg-gray-50 border-t border-gray-200 text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-extrabold font-heading text-gray-900 mb-4">
            Ready to Start Your <span className="text-secondary">Journey?</span>
          </h2>
          <p className="text-base text-gray-600 mb-8 max-w-xl mx-auto">
            Join 2,000+ members who transformed their lives with Studio FIT India.
          </p>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleConversion}
            className="bg-secondary text-white font-bold py-3.5 px-8 rounded-full hover:bg-secondary/95 transition-all inline-block shadow-sm uppercase tracking-wider text-sm"
          >
            Book a Trial at Just ₹1 Now
          </a>
        </div>
      </section>
    </div>
  );
};

export default ProgramDetails;
