import React from 'react';
import { Clock } from 'lucide-react';

interface TimeTableProps {
  isOpen: boolean;
  onClose: () => void;
  facultyName: string;
}

export const TimeTable: React.FC<TimeTableProps> = ({ isOpen, onClose, facultyName }) => {
  if (!isOpen) return null;

  const timeSlots = [
    "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
    "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"
  ];

  const subjects = [
    "Data Structures", "Computer Networks", "Operating Systems",
    "Database Management", "Software Engineering", "Computer Architecture",
    "Web Development", "Machine Learning"
  ];

  const getRandomSubject = () => subjects[Math.floor(Math.random() * subjects.length)];
  const getRandomRoom = () => `Lab ${Math.floor(Math.random() * 5) + 1}`;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-4xl w-full p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-3">
            <Clock className="w-6 h-6 text-blue-600" />
            <h2 className="text-2xl font-bold text-gray-900">
              {facultyName}'s Timetable
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-sm font-medium"
          >
            Close
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="border p-3 bg-gray-50">Time</th>
                <th className="border p-3 bg-gray-50">Monday</th>
                <th className="border p-3 bg-gray-50">Tuesday</th>
                <th className="border p-3 bg-gray-50">Wednesday</th>
                <th className="border p-3 bg-gray-50">Thursday</th>
                <th className="border p-3 bg-gray-50">Friday</th>
              </tr>
            </thead>
            <tbody>
              {timeSlots.map((time, index) => (
                <tr key={time}>
                  <td className="border p-3 font-medium bg-gray-50">{time}</td>
                  {Array.from({ length: 5 }).map((_, dayIndex) => {
                    if (time === "12:00 PM") {
                      return (
                        <td
                          key={dayIndex}
                          className="border p-3 bg-gray-100 text-center font-medium text-gray-500"
                          colSpan={5}
                        >
                          Lunch Break (1:00 PM - 2:00 PM)
                        </td>
                      );
                    }
                    return (
                      <td key={dayIndex} className="border p-3">
                        {Math.random() > 0.3 ? (
                          <div>
                            <div className="font-medium text-blue-600">
                              {getRandomSubject()}
                            </div>
                            <div className="text-sm text-gray-500">
                              {getRandomRoom()}
                            </div>
                          </div>
                        ) : (
                          <div className="text-gray-400 italic">Free Period</div>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 text-sm text-gray-500">
          Note: This is a sample timetable. The actual schedule may vary.
        </div>
      </div>
    </div>
  );
};