import React, { useEffect, useState } from "react";
import { Check, Plus, Users, X, LogOut, Download, User, Settings, Menu } from "lucide-react";
import { AuthProvider, useAuth } from "./context/AuthContext";
import StatsCard from "./components/StatsCard";
import SearchBar from "./components/SearchBar";
import EmployeeTable from "./components/EmployeeTable";
import EmployeeModal from "./components/EmployeeModal";
import ChangePasswordModal from "./components/ChangePasswordModal";
import Login from "./components/Login";
import Register from "./components/Register";
import {
  getEmployees,
  getStatus,
  searchEmployees,
  addEmployee,
  updateEmployee,
  deleteEmployee,
} from "./api/employeeApi";
import { changePassword } from "./api/authApi";
import { exportToCSV } from "./utils/exportToCSV";

const Dashboard = () => {
  const { user, logout, isAdmin, isAuthenticated, isGuest, token } = useAuth();
  const [employees, setEmployees] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [stats, setStats] = useState({ userCount: 0, active: 0, inactive: 0 });
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    status: "Active",
  });

  const [editingItem, setEditingItem] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [totalPages, setTotalPages] = useState(0);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const status = ["Active", "Inactive"];

  //fetch employees
  useEffect(() => {
    fetchEmployees();
  }, [currentPage, itemsPerPage]);

  useEffect(() => {
    if (searchTerm) handleSearch();
    else fetchEmployees();
  }, [searchTerm]);

  //fetch status
  const fetchStatus = async () => {
    try {
      const data = await getStatus();
      setStats(data);
    } catch (error) {
      console.error("Error fetching status:", error);
    }
  };

  //fetch employees
  const fetchEmployees = async () => {
    try {
      const data = await getEmployees(currentPage, itemsPerPage);
      setEmployees(data.users);
      setTotalUsers(data.totalUsers);
      setTotalPages(data.totalPages);
      fetchStatus();
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  //search employees
  const handleSearch = async () => {
    try {
      const data = await searchEmployees(searchTerm, currentPage, itemsPerPage);
      setEmployees(data.users);
      setTotalUsers(data.totalUsers);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Error searching employees:", error);
    }
  };

  //handle submit
  const handleSubmit = async () => {
    if (!formData.name || !formData.email || !formData.phone)
      return alert("Please fill all fields");
    setLoading(true);
    try {
      if (editingItem) await updateEmployee(editingItem._id, formData);
      else await addEmployee(formData);
      fetchEmployees();
      closeModal();
    } catch (error) {
      alert(error.message);
    }
    setLoading(false);
  };

  //handle delete
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      try {
        await deleteEmployee(id);
        fetchEmployees();
      } catch (error) {
        alert(error.message);
      }
    }
  };

  const openModal = (item = null) => {
    if (!isAdmin()) {
      alert("Admin access required to add or edit employees.");
      return;
    }
    if (item) {
      setEditingItem(item);
      setFormData(item);
    } else {
      setEditingItem(null);
      setFormData({ name: "", email: "", phone: "", status: "Active" });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
    setFormData({ name: "", email: "", phone: "", status: "Active" });
  };

  const handleLogout = () => {
    logout();
  };

  const handleExport = () => {
    if (isGuest()) {
      alert("Please login to export data");
      return;
    }
    // Export all employees from current view
    exportToCSV(employees, "employees");
  };

  const handleChangePassword = async (currentPassword, newPassword) => {
    setPasswordLoading(true);
    try {
      await changePassword(currentPassword, newPassword, token);
      alert("Password changed successfully!");
      setIsPasswordModalOpen(false);
    } catch (error) {
      alert(error.message || "Failed to change password");
    } finally {
      setPasswordLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950">
      {/*Header*/}
      <header className="bg-gray-900 shadow-xl border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="p-1.5 sm:p-2 bg-green-500 rounded-lg">
                <Users size={20} className="sm:w-7 sm:h-7 text-gray-900" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">
                  Employee Management
                </h1>
                <p className="text-gray-400 mt-0.5 text-xs sm:text-sm hidden sm:block">
                  MERN Stack Application
                </p>
              </div>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center gap-4">
              {isAuthenticated() && (
                <div className="text-white">
                  <span className="text-gray-400 text-sm">Logged in as: </span>
                  <span className="font-semibold text-sm">
                    {isGuest() ? "Guest" : user?.email}
                  </span>
                  {isAdmin() && (
                    <span className="ml-2 px-2 py-1 bg-green-500 text-gray-900 text-xs font-semibold rounded">
                      Admin
                    </span>
                  )}
                  {isGuest() && (
                    <span className="ml-2 px-2 py-1 bg-gray-600 text-gray-200 text-xs font-semibold rounded">
                      Guest
                    </span>
                  )}
                </div>
              )}
              {!isGuest() && (
                <button
                  className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-400 transition-colors font-semibold text-sm"
                  onClick={handleExport}
                  title="Export to CSV"
                >
                  <Download size={18} /> <span className="hidden xl:inline">Export</span>
                </button>
              )}
              {!isGuest() && (
                <button
                  className="flex items-center gap-2 bg-gray-800 text-gray-300 px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors text-sm"
                  onClick={() => setIsPasswordModalOpen(true)}
                  title="Change Password"
                >
                  <Settings size={18} /> <span className="hidden xl:inline">Settings</span>
                </button>
              )}
              {isAuthenticated() && (
                <button
                  className="flex items-center gap-2 bg-gray-800 text-gray-300 px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors text-sm"
                  onClick={handleLogout}
                >
                  <LogOut size={18} /> <span className="hidden xl:inline">Logout</span>
                </button>
              )}
              {isAdmin() && (
                <button
                  className="flex items-center gap-2 bg-green-500 text-gray-900 px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg hover:bg-green-400 transition-colors shadow-lg font-semibold text-sm"
                  onClick={() => openModal()}
                >
                  <Plus size={18} /> <span className="hidden xl:inline">Add Employee</span>
                </button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <Menu size={24} />
            </button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="lg:hidden mt-4 pt-4 border-t border-gray-800 space-y-2">
              {isAuthenticated() && (
                <div className="text-white pb-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-gray-400 text-sm">Logged in as: </span>
                    <span className="font-semibold text-sm break-all">
                      {isGuest() ? "Guest" : user?.email}
                    </span>
                    {isAdmin() && (
                      <span className="px-2 py-1 bg-green-500 text-gray-900 text-xs font-semibold rounded">
                        Admin
                      </span>
                    )}
                    {isGuest() && (
                      <span className="px-2 py-1 bg-gray-600 text-gray-200 text-xs font-semibold rounded">
                        Guest
                      </span>
                    )}
                  </div>
                </div>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {!isGuest() && (
                  <button
                    className="flex items-center justify-center gap-2 bg-blue-500 text-white px-4 py-2.5 rounded-lg hover:bg-blue-400 transition-colors font-semibold text-sm w-full"
                    onClick={() => {
                      handleExport();
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    <Download size={18} /> Export
                  </button>
                )}
                {!isGuest() && (
                  <button
                    className="flex items-center justify-center gap-2 bg-gray-800 text-gray-300 px-4 py-2.5 rounded-lg hover:bg-gray-700 transition-colors text-sm w-full"
                    onClick={() => {
                      setIsPasswordModalOpen(true);
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    <Settings size={18} /> Settings
                  </button>
                )}
                {isAdmin() && (
                  <button
                    className="flex items-center justify-center gap-2 bg-green-500 text-gray-900 px-4 py-2.5 rounded-lg hover:bg-green-400 transition-colors font-semibold text-sm w-full"
                    onClick={() => {
                      openModal();
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    <Plus size={18} /> Add Employee
                  </button>
                )}
                {isAuthenticated() && (
                  <button
                    className="flex items-center justify-center gap-2 bg-gray-800 text-gray-300 px-4 py-2.5 rounded-lg hover:bg-gray-700 transition-colors text-sm w-full"
                    onClick={() => {
                      handleLogout();
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    <LogOut size={18} /> Logout
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </header>

      {/*Main Content*/}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Stats Content */}
          <StatsCard
            title="Total Employees"
            value={{ number: stats.userCount }}
            icon={<Users />}
            bgIcon="bg-indigo-500"
            iconColor="text-white"
            gradient="from-indigo-900 to-indigo-700"
          />
          <StatsCard
            title="Active Employees"
            value={{ number: stats.active }}
            icon={<Check />}
            bgIcon="bg-green-500"
            iconColor="text-white"
            gradient="from-green-900 to-green-700"
          />
          <StatsCard
            title="Inactive Employees"
            value={{ number: stats.inactive }}
            icon={<X />}
            bgIcon="bg-red-500"
            iconColor="text-white"
            gradient="from-red-900 to-red-700"
          />
        </div>
        {/* Search */}
        <SearchBar
          value={searchTerm}
          onChange={setSearchTerm}
          onClear={() => {
            setSearchTerm("");
            setCurrentPage(1);
          }}
          itemsPerPage={itemsPerPage}
          onitemsPerPageChange={(val) => {
            setItemsPerPage(Number(val));
            setCurrentPage(1);
          }}
          currentPage={currentPage}
          totalUsers={totalUsers}
        />
        {/* Employee Table */}
        <EmployeeTable
          employees={employees}
          onEdit={openModal}
          onDelete={handleDelete}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          isAdmin={isAdmin()}
        />
        <EmployeeModal
          isOpen={isModalOpen}
          onClose={closeModal}
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleSubmit}
          loading={loading}
          status={status}
        />
        <ChangePasswordModal
          isOpen={isPasswordModalOpen}
          onClose={() => setIsPasswordModalOpen(false)}
          onSubmit={handleChangePassword}
          loading={passwordLoading}
        />
      </main>
    </div>
  );
};

const AppContent = () => {
  const [showLogin, setShowLogin] = useState(true);
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated()) {
    return showLogin ? (
      <Login onToggleMode={() => setShowLogin(false)} />
    ) : (
      <Register onToggleMode={() => setShowLogin(true)} />
    );
  }

  return <Dashboard />;
};

const App = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;
