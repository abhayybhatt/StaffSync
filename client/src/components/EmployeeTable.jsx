import { ChevronLeft, Edit, Trash2, ChevronRight } from "lucide-react";
import React from "react";

const EmployeeTable = ({
  employees,
  onEdit,
  onDelete,
  currentPage,
  totalPages,
  onPageChange,
  isAdmin,
}) => {
  const showActions = isAdmin;

  return (
    <div className="bg-gray-900 rounded-lg overflow-hidden border border-gray-800">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-800 border-b border-gray-700">
            <tr>
              <th className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-gray-300">
                Name
              </th>
              <th className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-gray-300">
                Email
              </th>
              <th className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-gray-300">
                Phone
              </th>
              <th className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-gray-300">
                Status
              </th>
              <th className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-gray-300 hidden sm:table-cell">
                Created
              </th>
              {showActions && (
                <th className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-center text-xs sm:text-sm font-semibold text-gray-300">
                  Action
                </th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {employees.map((employee, indx) => (
              <tr key={employee._id || indx} className="hover:bg-gray-800 transition-colors">
                <td className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-xs sm:text-sm text-white font-medium">
                  {employee.name}
                </td>
                <td className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-xs sm:text-sm text-white font-medium break-words">
                  {employee.email}
                </td>
                <td className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-xs sm:text-sm text-white font-medium">
                  {employee.phone}
                </td>
                <td className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-xs sm:text-sm">
                  <span
                    className={`px-2 sm:px-3 py-1 rounded-full text-xs font-semibold ${
                      employee.status === "Active"
                        ? "bg-green-500 text-gray-900"
                        : "bg-red-500 text-white"
                    }`}
                  >
                    {employee.status}
                  </span>
                </td>
                <td className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-400 hidden sm:table-cell">
                  {new Date(employee.createdAt).toLocaleDateString()}
                </td>
                {showActions && (
                  <td className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-center">
                    <div className="flex justify-center gap-1 sm:gap-2">
                      <button
                        className="flex items-center gap-1 bg-green-500 text-gray-900 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg hover:bg-green-400 transition-all text-xs sm:text-sm font-semibold"
                        onClick={() => onEdit(employee)}
                        title="Edit"
                      >
                        <Edit size={14} className="sm:w-4 sm:h-4" /> <span className="hidden sm:inline">Edit</span>
                      </button>
                      <button
                        className="flex items-center gap-1 bg-red-500 text-gray-900 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg hover:bg-red-400 transition-all text-xs sm:text-sm font-semibold"
                        onClick={() => onDelete(employee._id)}
                        title="Delete"
                      >
                        <Trash2 size={14} className="sm:w-4 sm:h-4" /> <span className="hidden sm:inline">Delete</span>
                      </button>
                    </div>
                  </td>
                )}
              </tr>
            ))}
            {/* Conditional Rendering */}
            {employees.length === 0 && (
              <tr>
                <td colSpan={showActions ? 6 : 5} className="text-center py-12 text-gray-400">
                  No employees found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {/* Pagination */}
      {/* Conditional Rendering */}
      {employees.length > 0 && (
        <div className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-center gap-3 bg-gray-800">
          <div className="text-xs sm:text-sm text-gray-400">
            Page {currentPage} of {totalPages}
          </div>
          <div className="flex items-center gap-1 sm:gap-2">
            <button
              className="flex items-center gap-1 px-2 sm:px-3 py-1.5 sm:py-2 bg-gray-700 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-600 disabled:opacity-50 text-xs sm:text-sm"
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <ChevronLeft size={14} className="sm:w-4 sm:h-4" /> <span className="hidden sm:inline">Prev</span>
            </button>
            {/* Desktop: Show page numbers */}
            <div className="hidden md:flex gap-1 sm:gap-2">
              {[...Array(totalPages)].map((_, i) => {
                const p = i + 1;
                if (
                  p === 1 ||
                  p === totalPages ||
                  (p >= currentPage - 1 && p <= currentPage + 1)
                ) {
                  return (
                    <button
                      key={p}
                      className={`px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm ${
                        currentPage === p
                          ? "bg-green-500 text-gray-900 font-semibold"
                          : "bg-gray-600 text-gray-300 hover:bg-gray-600"
                      }`}
                      onClick={() => onPageChange(p)}
                    >
                      {p}
                    </button>
                  );
                } else if (p === currentPage - 2 || p === currentPage + 2) {
                  return <span key={p} className="px-1 sm:px-2 py-1.5 sm:py-2 text-gray-500 text-xs sm:text-sm">...</span>;
                }
                return null;
              })}
            </div>
            {/* Mobile: Show current page only */}
            <div className="md:hidden">
              <span className="px-2 sm:px-3 py-1.5 sm:py-2 bg-green-500 text-gray-900 font-semibold rounded-lg text-xs sm:text-sm">
                {currentPage}
              </span>
            </div>
            <button
              className="flex items-center gap-1 px-2 sm:px-3 py-1.5 sm:py-2 bg-gray-700 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-600 disabled:opacity-50 text-xs sm:text-sm"
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <span className="hidden sm:inline">Next</span> <ChevronRight size={14} className="sm:w-4 sm:h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeTable;
