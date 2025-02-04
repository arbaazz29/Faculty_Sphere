import React, { useState } from 'react';
import { GraduationCap } from 'lucide-react';
import { departments, facultyData } from './data/faculty';
import { DepartmentButton } from './components/DepartmentButton';
import { FacultyCard } from './components/FacultyCard';
import { AuthButtons } from './components/AuthButtons';
import { SearchBar } from './components/SearchBar';
import { Toaster } from 'react-hot-toast';

function App() {
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);
  const [searchResults, setSearchResults] = useState<typeof facultyData | null>(null);

  const displayedFaculty = searchResults || (selectedDepartment
    ? facultyData.filter(faculty => faculty.department === selectedDepartment)
    : []);

  const handleSearch = (results: typeof facultyData) => {
    setSearchResults(results);
    setSelectedDepartment(null);
  };

  const clearSearch = () => {
    setSearchResults(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-right" />
      
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <GraduationCap className="w-8 h-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">
                Faculty Sphere
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <SearchBar onSearch={handleSearch} onClose={clearSearch} />
              <AuthButtons />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Department Buttons */}
        {!searchResults && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8 sticky top-24 bg-gray-50 pt-4 pb-6 z-10">
            {departments.map((department) => (
              <DepartmentButton
                key={department}
                department={department}
                isActive={selectedDepartment === department}
                onClick={() => setSelectedDepartment(department)}
              />
            ))}
          </div>
        )}

        {/* Faculty Grid */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            {searchResults 
              ? `Search Results (${displayedFaculty.length} found)`
              : selectedDepartment
                ? `${selectedDepartment} Faculty (${displayedFaculty.length} members)`
                : 'Select a department to view its faculty members'}
          </h2>
          {displayedFaculty.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {displayedFaculty.map((faculty) => (
                <FacultyCard key={faculty.id} faculty={faculty} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600">
                {searchResults ? 'No matching faculty found' : 'Select a department to view its faculty members'}
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;