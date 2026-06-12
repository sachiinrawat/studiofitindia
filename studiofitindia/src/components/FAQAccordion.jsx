import { faqs } from "../data/faqs";

const FAQAccordion = () => {
  return (
    <section className="py-16 bg-gray-50 border-t border-gray-100" id="faq">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-heading text-gray-900 mb-3">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-500 text-base max-w-2xl mx-auto">
            Everything you need to know about Studio FIT India's online fitness classes, pricing, and membership.
          </p>
        </div>

        {/* 2-column open card grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-gray-200 bg-white hover:border-primary/40 hover:shadow-md transition-all duration-300 p-6 shadow-sm"
            >
              {/* Number + Question */}
              <div className="flex items-start gap-3 mb-3">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center mt-0.5">
                  {idx + 1}
                </span>
                <h3 className="text-gray-900 font-bold font-heading text-base md:text-[15px] leading-snug">
                  {faq.q}
                </h3>
              </div>

              {/* Answer */}
              <p className="text-gray-600 text-sm leading-relaxed pl-10 border-l-2 border-primary/20 ml-3">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQAccordion;
