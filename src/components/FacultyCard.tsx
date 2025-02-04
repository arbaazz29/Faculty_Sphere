import React, { useState } from 'react';
import { Mail, Edit, Calendar } from 'lucide-react';
import type { Faculty } from '../data/faculty';
import { useAuth } from '../hooks/useAuth';
import { EditProfileModal } from './EditProfileModal';
import { TimeTable } from './TimeTable';

interface FacultyCardProps {
  faculty: Faculty;
}

export const FacultyCard: React.FC<FacultyCardProps> = ({ faculty }) => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [showTimetable, setShowTimetable] = useState(false);
  const canEdit = user?.email === faculty.email;

  return (
    <>
      <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg">
        <div className="aspect-square overflow-hidden relative">
          <img
            src={faculty.image}
            alt={faculty.name}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
          {canEdit && (
            <button
              onClick={() => setIsEditing(true)}
              className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors"
            >
              <Edit className="w-4 h-4 text-gray-600" />
            </button>
          )}
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-lg text-gray-800 mb-1">{faculty.name}</h3>
          <div className="flex items-center text-gray-600 mb-3">
            <Mail className="w-4 h-4 mr-2" />
            <a
              href={`mailto:${faculty.email}`}
              className="text-sm hover:text-blue-600 transition-colors"
            >
              {faculty.email}
            </a>
          </div>
          {faculty.department === 'Computer Engineering' && (
            <button
              onClick={() => setShowTimetable(true)}
              className="flex items-center justify-center w-full text-sm text-blue-600 hover:text-blue-700 transition-colors"
            >
              <Calendar className="w-4 h-4 mr-1" />
              View Timetable
            </button>
          )}
        </div>
      </div>

      <EditProfileModal
        isOpen={isEditing}
        onClose={() => setIsEditing(false)}
        faculty={faculty}
      />

      <TimeTable
        isOpen={showTimetable}
        onClose={() => setShowTimetable(false)}
        facultyName={faculty.name}
      />
    </>
  );
};