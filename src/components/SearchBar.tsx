import React, { useState } from 'react';
import { Search, X } from 'lucide-react';
import { facultyData } from '../data/faculty';

interface SearchBarProps {
  onSearch: (results: typeof facultyData) => void;
  onClose: () => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch, onClose }) => {
  const [query, setQuery] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery);
    const filtered = facultyData.filter(faculty =>
      faculty.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    onSearch(filtered);
  };

  const handleClose = () => {
    setQuery('');
    setIsExpanded(false);
    onClose();
  };

  return (
    <div className="relative">
      <div className={`flex items-center ${isExpanded ? 'w-64 md:w-96' : 'w-10'} transition-all duration-300`}>
        <div className="relative flex items-center w-full">
          {isExpanded && (
            <input
              type="text"
              value={query}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search teachers..."
              className="w-full pl-10 pr-8 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              autoFocus
            />
          )}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className={`${isExpanded ? 'absolute left-3' : ''} text-gray-600 hover:text-gray-800`}
          >
            <Search className="w-5 h-5" />
          </button>
          {isExpanded && query && (
            <button
              onClick={handleClose}
              className="absolute right-2 text-gray-500 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};