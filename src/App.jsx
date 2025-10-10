import React from "react";
import Header from "./components/Header";
import LectureCard from "./components/LectureCard";

const lectures = [
  { subject: "JPR\nGAD\nMIC", startTime: "12:45", endTime: "02:45", color: "bg-yellow-50 border-yellow-400" },
  { subject: "SEN", startTime: "03:00", endTime: "04:00", color: "bg-blue-50 border-blue-400" },
  { subject: "DCC", startTime: "04:00", endTime: "05:00", color: "bg-green-50 border-green-400" },
];

const App = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-8">
      <Header />
      
      <div className="w-11/12 max-w-md space-y-6 mt-8">
        {lectures.map((lecture, index) => (
          <LectureCard key={index} lecture={lecture} />
        ))}
      </div>
    </div>
  );
};

export default App;
