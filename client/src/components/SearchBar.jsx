import React from "react";
import { Search, X } from "lucide-react";

const SearchBar = ({
  value,
  onChange,
  onClear,
  itemsPerPage,
  onitemsPerPageChange,
  currentPage,
  totalUsers,
}) => {
  const startUser = totalUsers === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
  const endUser = Math.min(currentPage * itemsPerPage, totalUsers);

  return (
    <div className="bg-gray-900 rounded-lg shadow-lg p-3 sm:p-4 border border-gray-800 flex flex-col md:flex-row md:items-center md:justify-between gap-3 sm:gap-4">
      {/* Search Input */}
      <div className="relative flex-1 w-full">
        <Search
          size={16}
          className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
        />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search by name, email, phone or status..."
          className="w-full pl-8 sm:pl-10 pr-8 sm:pr-10 py-2 sm:py-2.5 bg-gray-800 border border-gray-700 text-white placeholder-gray-500 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none text-sm sm:text-base"
        />
        {/* Conditional Rendering */}
        {value && (
          <button
            onClick={onClear}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white hover:bg-gray-700 p-1 rounded-full transition-all cursor-pointer"
            type="button"
          >
            <X size={14} className="sm:w-4 sm:h-4" />
          </button>
        )}
      </div>

      {/* Rows per page and Info */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
        <span className="text-xs sm:text-sm text-gray-400 whitespace-nowrap">
          Showing {startUser} to {endUser} of {totalUsers}
        </span>
        <div className="flex items-center gap-2">
          <label className="text-xs sm:text-sm text-gray-400">Rows</label>
          <select
            className="px-2 sm:px-3 py-1 sm:py-1.5 bg-gray-800 border border-gray-700 text-white rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none text-xs sm:text-sm"
            value={itemsPerPage}
            onChange={(e) => onitemsPerPageChange(Number(e.target.value))}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
