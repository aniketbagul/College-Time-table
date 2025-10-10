import React from "react";

const LectureCard = ({ time, subject, status }) => {
  const statusColor =
    status === "completed"
      ? "bg-green-100 border-green-400 text-green-800"
      : status === "ongoing"
      ? "bg-blue-100 border-blue-400 text-blue-800 animate-pulse"
      : "bg-white border-gray-200 text-gray-700";

  return (
    <div className={`border rounded-2xl shadow-sm p-6 transition-all ${statusColor}`}>
      <h2 className="text-lg font-medium whitespace-pre-line text-center">
        {subject}
      </h2>
      <div className="flex justify-end mt-3 text-sm opacity-70">{time}</div>
    </div>
  );
};

export default LectureCard;
