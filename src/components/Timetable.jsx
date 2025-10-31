import React, { useState, useEffect } from "react";
import DaySchedule from "./DaySchedule";

const Timetable = () => {
  const timetable = {
    Monday: [
      { title: ["T1-ML (C610A)", "T2-OSL (C607B)"], time: "10:00 - 12:00", color: "border-blue-400" },
      { break: "Lunch Break (12:00 - 12:45)" },
      { title: ["ML (C601)"], time: "12:45 - 01:45", color: "border-pink-400" },
      { title: ["OS (C601)"], time: "01:45 - 02:45", color: "border-pink-400" },
      { break: "Short Break (02:45 - 03:00)" },
      { title: ["Seminar","Mentoring"], time: "03:00 - 04:00", color: "border-yellow-400" },
      { title: ["Mentoring"], time: "04:00 - 05:00", color: "border-yellow-400" },
    
    ],
    Tuesday: [
      { title: ["OS (601)", "MLL (602)"], time: "10:00 - 12:00", color: "border-green-400" },
      { break: "Lunch Break (12:00 - 12:45)" },
      { title: ["Elective-I (AI/IoT/CyberSec) (603)"], time: "12:45 - 02:45", color: "border-orange-400" },
      { break: "Short Break (02:45 - 03:00)" },
      { title: ["HCI (604)"], time: "03:00 - 05:00", color: "border-yellow-400" },
    ],
    Wednesday: [
      { title: ["ML (601)", "OSL (602)"], time: "10:00 - 12:00", color: "border-blue-400" },
      { break: "Lunch Break (12:00 - 12:45)" },
      { title: ["TOC (603)"], time: "12:45 - 02:45", color: "border-pink-400" },
      { break: "Short Break (02:45 - 03:00)" },
      { title: ["Elective-I (604)"], time: "03:00 - 05:00", color: "border-orange-400" },
    ],
    Thursday: [
      { title: ["OS (601)", "MLL (602)"], time: "10:00 - 12:00", color: "border-green-400" },
      { break: "Lunch Break (12:00 - 12:45)" },
      { title: ["HCI (604)"], time: "12:45 - 02:45", color: "border-yellow-400" },
      { break: "Short Break (02:45 - 03:00)" },
      { title: ["TOC (603)"], time: "03:00 - 05:00", color: "border-pink-400" },
    ],
    Friday: [
      { title: ["Elective-I (601)", "TOC Lab (602)"], time: "10:00 - 12:00", color: "border-orange-400" },
      { break: "Lunch Break (12:00 - 12:45)" },
      { title: ["ML (603)"], time: "12:45 - 02:45", color: "border-blue-400" },
      { break: "Short Break (02:45 - 03:00)" },
      { title: ["OS (604)"], time: "03:00 - 05:00", color: "border-green-400" },
    ],
    Saturday: [
      { title: ["Seminar / Activity (601)"], time: "10:00 - 12:00", color: "border-indigo-400" },
      { break: "Lunch Break (12:00 - 12:45)" },
      { title: ["Project / Practical Work (603)"], time: "12:45 - 02:45", color: "border-gray-400" },
      { break: "Short Break (02:45 - 03:00)" },
      { title: ["Guest Lecture / Workshop (605)"], time: "03:00 - 05:00", color: "border-purple-400" },
    ],
  };

  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const today = days[new Date().getDay()];
  const [selectedDay, setSelectedDay] = useState(today === "Sunday" ? "Monday" : today);

  useEffect(() => {
    setSelectedDay(today === "Sunday" ? "Monday" : today);
  }, [today]);

  return (
    <div className="w-full max-w-md">
      {/* Day Selector Buttons */}
      <div className="flex justify-center gap-2 mb-4 flex-wrap">
        {Object.keys(timetable).map((day) => (
          <button
            key={day}
            onClick={() => setSelectedDay(day)}
            className={`px-3 py-1 rounded-full text-sm font-medium transition ${
              selectedDay === day
                ? "bg-black text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {day}
          </button>
        ))}
      </div>

      {/* Dynamic Schedule Display */}
      <DaySchedule day={selectedDay} schedule={timetable[selectedDay]} />
    </div>
  );
};

export default Timetable;
