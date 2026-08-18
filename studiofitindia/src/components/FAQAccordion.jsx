import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { faqs } from "../data/faqs";

const FAQAccordion = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 md:py-24 bg-gray-50 border-t border-gray-100" id="faq">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-heading text-gray-900 mb-3">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-500 text-base max-w-2xl mx-auto">
            Everything you need to know about Studio FIT India's online fitness classes, pricing, and membership.
          </p>
        </div>

        {/* Accordion List */}
        <div className="flex flex-col border-t border-gray-200">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div key={idx} className="border-b border-gray-200">
                <button
                  onClick={() => toggle(idx)}
                  className="w-full flex items-center justify-between py-5 md:py-6 text-left focus:outline-none group"
                >
                  <span className="text-gray-900 font-bold font-heading text-[15px] md:text-lg group-hover:text-primary transition-colors pr-4">
                    {faq.q}
                  </span>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0 text-gray-400 group-hover:text-primary transition-colors"
                  >
                    <ChevronDown size={20} />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p className="text-gray-600 text-sm md:text-base leading-relaxed pb-6 pr-8">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQAccordion;
