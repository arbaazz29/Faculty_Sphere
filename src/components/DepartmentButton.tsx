import React from 'react';

interface DepartmentButtonProps {
  department: string;
  isActive: boolean;
  onClick: () => void;
}

export const DepartmentButton: React.FC<DepartmentButtonProps> = ({
  department,
  isActive,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={`
        ${isActive 
          ? 'bg-blue-600 text-white shadow-lg scale-105' 
          : 'bg-white text-gray-800 hover:bg-blue-50'
        }
        transition-all duration-300 ease-in-out
        px-6 py-4 rounded-lg shadow-md
        font-semibold text-sm md:text-base
        w-full md:w-64
        border border-gray-200
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50
      `}
    >
      {department}
    </button>
  );
};