import { ChevronLeft, Edit, Trash2, ChevronRight } from "lucide-react";
import React from "react";

const UserTable = ({
  users,
  onEdit,
  onDelete,
  currentPage,
  totalPages,
  onPageChange,
}) => {
  return (
    <div className="bg-gray-900 rounded-lg overflow-hidden border border-gray-800">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-800 border-b border-gray-700">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                Name
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                Email
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                Phone
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                Status
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                Created
              </th>
              <th className="px-6 py-4 text-center text-sm font-semibold text-gray-300">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {users.map((u, indx) => (
              <tr className="hover:bg-gray-800 transition-colors">
                <td className="px-6 py-4 text-sm text-white font-medium">
                  {u.name}
                </td>
                <td className="px-6 py-4 text-sm text-white font-medium">
                  {u.email}
                </td>
                <td className="px-6 py-4 text-sm text-white font-medium">
                  {u.phone}
                </td>
                <td className="px-6 py-4 text-sm">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      u.status === "Active"
                        ? "bg-green-500 text-gray-900"
                        : "bg-red-500 text-white"
                    }`}
                  >
                    {u.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-400">
                  {new Date(u.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 text-center">
                  <div className="flex justify-center gap-2">
                    <button
                      className="flex items-center gap-1 bg-green-500 text-gray-900 px-3 py-1.5 rounded-lg hover:bg-green-400 transition-all text-sm font-semibold"
                      onClick={() => onEdit(u)}
                    >
                      <Edit size={16} /> Edit
                    </button>
                    <button
                      className="flex items-center gap-1 bg-red-500 text-gray-900 px-3 py-1.5 rounded-lg hover:bg-red-400 transition-all text-sm font-semibold"
                      onClick={() => onDelete(u._id)}
                    >
                      <Trash2 size={16} /> Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {/* Conditional Rendering */}
            {users.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center py-12 text-gray-400">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {/* Pagination */}
      {/* Conditional Rendering */}
      {users.length > 0 && (
        <div className="px-6 py-4 border-t border-gray-800 flex justify-between items-center bg-gray-800">
          <div className="text-sm text-gray-400">
            Page {currentPage} of {totalPages}
          </div>
          <div className="flex gap-2">
            <button
              className="flex items-center gap-1 px-3 py-2 bg-gray-700 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-600 disabled:opacity-50"
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <ChevronLeft size={16} /> Prev
            </button>
            {[...Array(totalPages)].map((_, i) => {
              const p = i + 1;
              if (
                p === 1 ||
                p === totalPages ||
                (p >= currentPage - 1 && p <= currentPage + 1)
              ) {
                return (
                  <button
                    className={`px-3 py-2 rounded-lg ${
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
                return <span className="px-2 py-2 text-gray-500">...</span>;
              }
              return null;
            })}
            <button
              className="flex items-center gap-1 px-3 py-2 bg-gray-700 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-600 disabled:opacity-50"
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserTable;
