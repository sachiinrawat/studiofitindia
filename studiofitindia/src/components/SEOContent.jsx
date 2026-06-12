import React from "react";
import { Wifi, Star } from "lucide-react";

const SEOContent = () => {
  return (
    <section className="py-16 bg-gray-50/50" aria-label="About Studio FIT India">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left Column — Text */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-gray-900 mb-4 leading-tight">
              India's Premier{" "}
              <span className="text-primary">Online Fitness Studio</span>
            </h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              At Studio FIT India, we've redefined the virtual fitness landscape. Our mission is to bring
              the energy of a premium studio directly to your living room through high-performance{" "}
              <strong>online live workout classes</strong> — including Yoga, HIIT, Zumba, and Strength Training. Experience a complete <strong>online gym</strong> from home.
            </p>

            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-white shadow-sm border border-gray-100 flex items-center justify-center shrink-0">
                  <Star className="text-primary" size={22} />
                </div>
                <div>
                  <h3 className="font-bold font-heading text-gray-900 text-sm mb-1">
                    Live Online Yoga Classes in India
                  </h3>
                  <p className="text-xs text-gray-500">
                    Experience authentic <strong>online live yoga classes</strong> with certified gurus.
                    From Hatha to Power Yoga, our sessions are designed for all levels — beginner to advanced.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-white shadow-sm border border-gray-100 flex items-center justify-center shrink-0">
                  <Wifi className="text-primary" size={22} />
                </div>
                <div>
                  <h3 className="font-bold font-heading text-gray-900 text-sm mb-1">
                    Online HIIT &amp; Zumba Fitness Sessions
                  </h3>
                  <p className="text-xs text-gray-500">
                    Join high-octane <strong>live online fitness sessions</strong> including HIIT, Zumba, and
                    Strength Training. Real-time coaching means real-time results from home.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column — Stats Card */}
          <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-gray-100">
            <h3 className="text-xl font-bold font-heading text-gray-900 mb-8 flex items-center gap-3">
              <span className="w-6 h-1 bg-primary rounded-full inline-block" />
              Why Members Choose Us
            </h3>

            <div className="grid grid-cols-2 gap-8 mb-8">
              <div>
                <p className="text-3xl font-bold text-primary font-heading mb-1">95%</p>
                <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest">
                  Attendance Rate
                </p>
              </div>
              <div>
                <p className="text-3xl font-bold text-primary font-heading mb-1">25,000+</p>
                <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest">
                  Active Members
                </p>
              </div>
            </div>

            <div className="border-t border-gray-100 pt-8">
              <p className="text-sm text-gray-600 leading-relaxed">
                Whether you're looking for <strong>online yoga classes</strong> to find your zen, or{" "}
                <strong>online fitness classes for weight loss</strong>, Studio FIT India provides a
                seamless, live, high-definition experience that keeps you motivated every day.
              </p>
              <div className="mt-6 flex items-center gap-3">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full border-2 border-white bg-gray-100 overflow-hidden"
                    >
                      <img
                        src={`https://i.pravatar.cc/100?u=${i + 10}`}
                        alt={`Studio FIT India member ${i}`}
                        loading="lazy"
                        width={32}
                        height={32}
                      />
                    </div>
                  ))}
                </div>
                <p className="text-[11px] font-bold text-gray-700 uppercase tracking-widest">
                  Join the live community
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default SEOContent;
