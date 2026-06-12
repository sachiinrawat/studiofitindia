

const Schedule = () => {
  return (
    <div className="w-full">
      <section className="pt-12 pb-16 bg-white min-h-screen">
        <div className="container mx-auto px-4">
          <h1
            className="text-3xl md:text-4xl font-bold font-heading text-gray-900 mb-8 text-center"
          >
            Class Schedule
          </h1>

          <div
            className="w-full max-w-5xl mx-auto bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm h-[800px]"
          >
            <iframe
              src="https://studiogx-online-fitness.punchpass.com/classes?embed=true"
              title="Studio Fit India Schedule"
              className="w-full h-full border-0"
              allowFullScreen
            ></iframe>
          </div>

          <div className="text-center mt-6">
            <p className="text-gray-500">
              Having trouble viewing the schedule?{" "}
              <a
                href="https://studiogx-online-fitness.punchpass.com/classes"
                target="_blank"
                rel="noopener noreferrer"
                className="text-secondary hover:underline font-bold"
              >
                Open in new tab
              </a>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Schedule;
