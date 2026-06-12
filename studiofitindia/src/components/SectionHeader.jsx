

const SectionHeader = ({ heading, subheading, centered = true }) => {
  return (
    <div className={`mb-12 ${centered ? "text-center" : "text-left"} relative`}>
      <div className={`relative inline-block ${centered ? "mx-auto" : ""}`}>
        <h2 className="text-3xl md:text-4xl font-bold font-heading text-gray-900 tracking-tight mb-3">
          {heading}
        </h2>
        <div className={`h-1 w-12 bg-secondary ${centered ? "mx-auto" : ""} rounded-full`} />
      </div>

      {subheading && (
        <p className="text-gray-500 text-base md:text-lg max-w-2xl mx-auto font-body mt-4 leading-relaxed">
          {subheading}
        </p>
      )}
    </div>
  );
};

export default SectionHeader;
