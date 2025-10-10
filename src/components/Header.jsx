import React, { useState, useEffect } from "react";

const App = () => {
  const [timetable, setTimetable] = useState(
    JSON.parse(localStorage.getItem("timetable")) || defaultTimetable
  );
  const [currentDay, setCurrentDay] = useState("Thursday");
  const [editing, setEditing] = useState(false);
  const [tempData, setTempData] = useState("");

  // Detect current time and mark lectures
  const getLectureStatus = (timeRange) => {
    const [start, end] = timeRange.split(" - ");
    const now = new Date();
    const current = now.getHours() * 60 + now.getMinutes();

    const [startH, startM] = start.split(":").map(Number);
    const [endH, endM] = end.split(":").map(Number);

    const startMinutes = startH * 60 + startM;
    const endMinutes = endH * 60 + endM;

    if (current < startMinutes) return "upcoming";
    if (current >= startMinutes && current <= endMinutes) return "ongoing";
    return "completed";
  };

  // Save edited timetable
  const handleSave = () => {
    try {
      const parsed = JSON.parse(tempData);
      setTimetable(parsed);
      localStorage.setItem("timetable", JSON.stringify(parsed));
      setEditing(false);
    } catch {
      alert("Invalid JSON format. Please fix and try again.");
    }
  };

  useEffect(() => {
    setTempData(JSON.stringify(timetable, null, 2));
  }, [editing]);

  const todayLectures = timetable[currentDay] || [];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-8">
      <Header
        currentDay={currentDay}
        onDayChange={setCurrentDay}
        onEdit={() => setEditing(true)}
      />

      <div className="w-11/12 max-w-md space-y-4">
        {todayLectures.map((lec, index) => (
          <LectureCard
            key={index}
            time={lec.time}
            subject={lec.subject}
            status={getLectureStatus(lec.time)}
          />
        ))}
      </div>

      {/* EDIT MODAL */}
      {editing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-xl p-5 shadow-lg w-11/12 max-w-2xl">
            <h2 className="text-xl font-semibold mb-3 text-center">
              ✏️ Edit Timetable JSON
            </h2>
            <textarea
              value={tempData}
              onChange={(e) => setTempData(e.target.value)}
              rows="15"
              className="w-full border rounded-lg p-3 font-mono text-sm"
            ></textarea>

            <div className="flex justify-end mt-3 gap-3">
              <button
                onClick={() => setEditing(false)}
                className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
