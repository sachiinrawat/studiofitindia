import { Clock, CalendarDays, CheckCircle } from "lucide-react";

// Representative weekly schedule mapped from live Punchpass data
const scheduleData = [
  { time: "05:00 AM", yoga: "Power Yoga + Pranayam", hiit: "Cardio + Upper Body", zumba: "-", strength: "Tummy Tone-up" },
  { time: "06:00 AM", yoga: "Yoga Salutation Forms", hiit: "Cardio + Lower Body", zumba: "-", strength: "Functional Training" },
  { time: "07:00 AM", yoga: "Abs Pilates + Oblique", hiit: "-", zumba: "Bollywood Dance", strength: "Upper Body Strength" },
  { time: "08:15 AM", yoga: "Asthanga Yoga", hiit: "-", zumba: "-", strength: "Thighs & Hips Strength" },
  { time: "09:00 AM", yoga: "Bikram Yoga", hiit: "Aerobics", zumba: "-", strength: "Belly & Core" },
  { time: "10:30 AM", yoga: "Yoga / Pilates", hiit: "-", zumba: "-", strength: "Arms & Chest" },
  { time: "05:00 PM", yoga: "YOGA, Meditation", hiit: "Belly + Cardio", zumba: "Bollywood Buzz", strength: "Power Yoga" },
  { time: "06:00 PM", yoga: "-", hiit: "Tummy Tone-up", zumba: "Bollywood Beats", strength: "Lower Body" },
  { time: "07:00 PM", yoga: "Yoga", hiit: "Cardio + Upper Body", zumba: "ZUMBA", strength: "Tummy Workout" },
  { time: "08:00 PM", yoga: "Aerobics + Stretching", hiit: "Cardio + Lower Body", zumba: "-", strength: "Bollywood Tadka" },
];

const ClassSchedule = () => {
  return (
    <section className="py-24 bg-navy relative border-t border-white/5">
      <div className="absolute inset-0 bg-gradient-to-t from-navy-mid/30 to-transparent"></div>
      
      <div className="container mx-auto px-4 relative z-10 flex flex-col items-center">
        
        {/* Header Block */}
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 text-primary px-4 py-1.5 rounded-full text-sm font-semibold mb-4 tracking-wider uppercase">
            <CalendarDays size={16} />
            Live Batch Timings
          </div>
          <h2 className="text-4xl md:text-5xl font-bold font-heading text-white mb-6 uppercase italic">
            Fit Workouts Into <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Your Life</span>
          </h2>
          <p className="text-gray-300 text-lg leading-relaxed">
            With 20+ live classes daily from morning to night, you never have to skip a workout again. All classes run Monday through Saturday.
          </p>
        </div>

        {/* Schedule Table Container */}
        <div className="w-full max-w-5xl bg-navy-mid border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="bg-white/5 text-gray-300 text-sm tracking-wider uppercase">
                  <th className="p-5 border-b border-white/10 font-bold w-1/5 flex items-center gap-2 text-white">
                    <Clock size={16} className="text-primary" /> Time (IST)
                  </th>
                  <th className="p-5 border-b border-white/10 font-bold border-l w-1/5">Yoga</th>
                  <th className="p-5 border-b border-white/10 font-bold border-l w-1/5">HIIT</th>
                  <th className="p-5 border-b border-white/10 font-bold border-l w-1/5">Zumba</th>
                  <th className="p-5 border-b border-white/10 font-bold border-l w-1/5">Strength</th>
                </tr>
              </thead>
              <tbody>
                {scheduleData.map((row, index) => (
                  <tr 
                    key={index} 
                    className="group border-b border-white/5 hover:bg-white/5 transition-colors"
                  >
                    <td className="p-5 font-semibold text-primary/90 whitespace-nowrap bg-black/10 group-hover:bg-transparent transition-colors">
                      {row.time}
                    </td>
                    {[row.yoga, row.hiit, row.zumba, row.strength].map((session, i) => (
                      <td key={i} className="p-5 border-l border-white/5 text-gray-300 text-sm">
                        {session !== "-" ? (
                          <div className="flex items-start gap-2">
                            <CheckCircle size={14} className="text-green-500 mt-0.5 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                            <span className="font-medium group-hover:text-white transition-colors">{session}</span>
                          </div>
                        ) : (
                          <span className="text-gray-600 pl-6">-</span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Footer Notice */}
          <div className="p-4 bg-black/20 text-center text-xs text-gray-400">
            * Schedule is subject to minor changes. Sunday relies on special masterclasses.
          </div>
        </div>

        {/* Call to action */}
        <div className="mt-12 text-center">
          <a
             href="https://wa.me/919310666287?text=Hi! I want to check batch availability for a trial at just ₹1."
             target="_blank"
             rel="noopener noreferrer"
             className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-secondary text-white font-bold py-3.5 px-8 rounded-full hover:brightness-110 shadow-lg shadow-primary/20 transition-all uppercase tracking-widest text-sm"
          >
            Check Batch Availability
          </a>
        </div>

      </div>
    </section>
  );
};

export default ClassSchedule;
