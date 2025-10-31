import React, { useEffect, useState } from "react";

const DaySchedule = ({ day, schedule }) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  // update time every minute
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  // helper to calculate % of time passed in slot
  const getProgress = (timeRange) => {
    const [start, end] = timeRange.split(" - ");
    const parse = (t) => {
      const [h, m] = t.split(":").map(Number);
      return h * 60 + (m || 0);
    };
    const now = currentTime.getHours() * 60 + currentTime.getMinutes();
    const startMin = parse(start);
    const endMin = parse(end);

    if (now < startMin) return 0;
    if (now > endMin) return 100;
    return ((now - startMin) / (endMin - startMin)) * 100;
  };

  return (
    <div className="bg-white p-4 rounded-2xl shadow-md w-full">
      <header className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold">{day}</h1>
          <p className="text-sm text-gray-500">
            {currentTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </p>
        </div>
      </header>

      {schedule.map((item, index) => (
        <div key={index} className="mb-4 relative">
          {item.break ? (
            <div className="flex justify-center">
              <div className="bg-black text-white px-4 py-1 rounded-full text-sm font-medium">
                {item.break}
              </div>
            </div>
          ) : (
            <div className="relative overflow-hidden bg-gray-50 border-2 border-blue-300 rounded-xl shadow-sm p-4 text-center">
              {/* Animated fill */}
              <div
                className="absolute bottom-0 left-0 bg-blue-200 opacity-50 transition-all duration-700"
                style={{
                  width: "100%",
                  height: `${getProgress(item.time)}%`,
                }}
              ></div>

              {/* Content */}
              <div className="relative z-10 text-lg font-semibold text-gray-700 leading-snug">
                {item.title.map((subject, i) => (
                  <p key={i}>{subject}</p>
                ))}
              </div>
              <p className="relative z-10 text-xs text-gray-500 mt-2">{item.time}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default DaySchedule;
