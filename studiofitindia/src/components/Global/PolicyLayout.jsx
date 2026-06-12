import AnimatedPage from "./AnimatedPage";

const PolicyLayout = ({ title, children }) => {
  return (
    <AnimatedPage>
      <section className="pt-32 pb-16 bg-white min-h-screen">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1
            className="text-3xl md:text-4xl font-bold font-heading text-gray-900 mb-12 text-center"
          >
            {title}
          </h1>

          <div
            className="prose prose-lg max-w-none prose-headings:font-heading prose-headings:text-secondary prose-p:text-gray-700 prose-li:text-gray-700 prose-a:text-secondary hover:prose-a:text-secondary/80"
          >
            {children}
          </div>
        </div>
      </section>
    </AnimatedPage>
  );
};

export default PolicyLayout;
