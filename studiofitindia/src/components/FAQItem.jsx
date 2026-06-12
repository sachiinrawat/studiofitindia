import { ChevronDown } from "lucide-react";

/**
 * FAQItem — CSS grid accordion (fastest possible open/close)
 * grid-template-rows: 0fr → 1fr  is GPU-composited, no layout thrashing
 * Parent controls open state (accordion: only one open at a time)
 */
const FAQItem = ({ question, answer, isOpen, onToggle }) => {
  return (
    <div className={`border-b border-white/10 last:border-0`}>
      <button
        onClick={onToggle}
        className="w-full flex justify-between items-center py-4 px-1 text-left focus:outline-none group"
        aria-expanded={isOpen}
      >
        <span
          className={`font-semibold pr-6 text-sm md:text-base leading-snug transition-colors duration-150 ${
            isOpen ? "text-primary" : "text-white"
          }`}
        >
          {question}
        </span>
        <ChevronDown
          size={18}
          className={`flex-shrink-0 transition-transform duration-150 ${
            isOpen ? "rotate-180 text-primary" : "text-gray-400"
          }`}
        />
      </button>

      {/*
        CSS grid trick — the SMOOTHEST accordion possible.
        grid-template-rows: 0fr means inner div is hidden (min-content = 0 due to overflow:hidden)
        grid-template-rows: 1fr means inner div expands to full height
        No JS, no layout recalculation, browser-native GPU transition.
      */}
      <div
        style={{
          display: "grid",
          gridTemplateRows: isOpen ? "1fr" : "0fr",
          transition: "grid-template-rows 0.18s ease",
        }}
      >
        <div style={{ overflow: "hidden" }}>
          <p className="text-gray-400 text-sm leading-relaxed pb-4 pl-1 border-l-2 border-primary ml-1 pr-4">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
};

export default FAQItem;
