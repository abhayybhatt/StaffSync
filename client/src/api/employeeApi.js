const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5001/api/v1";

// Helper function to get auth headers
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  const headers = { "Content-Type": "application/json" };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  return headers;
};

// get employees with pagination
export const getEmployees = async (page = 1, limit = 5) => {
  const res = await fetch(
    `${API_URL}/users?page=${page}&limit=${limit}`,
    {
      headers: getAuthHeaders(),
    }
  );
  if (!res.ok) {
    if (res.status === 401) {
      throw new Error("Unauthorized");
    }
    throw new Error("Failed to fetch employees");
  }
  return res.json();
};

// search employees
export const searchEmployees = async (term = "", page = 1, limit = 5) => {
  const res = await fetch(
    `${API_URL}/users/search/${encodeURIComponent(term)}?page=${page}&limit=${limit}`,
    {
      headers: getAuthHeaders(),
    }
  );
  if (!res.ok) {
    if (res.status === 401) {
      throw new Error("Unauthorized");
    }
    throw new Error("Failed to search employees");
  }
  return res.json();
};

// get status
export const getStatus = async () => {
  const res = await fetch(`${API_URL}/users/status`, {
    headers: getAuthHeaders(),
  });
  if (!res.ok) {
    if (res.status === 401) {
      throw new Error("Unauthorized");
    }
    throw new Error("Failed to fetch status");
  }
  return res.json();
};

// add employee
export const addEmployee = async (data) => {
  const res = await fetch(`${API_URL}/users`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    if (res.status === 401) {
      throw new Error("Authentication required");
    }
    if (res.status === 403) {
      throw new Error("Admin access required");
    }
    const error = await res.json();
    throw new Error(error.message || "Failed to add employee");
  }
  return res.json();
};

// update employee
export const updateEmployee = async (id, data) => {
  const res = await fetch(`${API_URL}/users/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    if (res.status === 401) {
      throw new Error("Authentication required");
    }
    if (res.status === 403) {
      throw new Error("Admin access required");
    }
    const error = await res.json();
    throw new Error(error.message || "Failed to update employee");
  }
  return res.json();
};

// delete employee
export const deleteEmployee = async (id) => {
  const res = await fetch(`${API_URL}/users/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });
  if (!res.ok) {
    if (res.status === 401) {
      throw new Error("Authentication required");
    }
    if (res.status === 403) {
      throw new Error("Admin access required");
    }
    throw new Error("Failed to delete employee");
  }
  return res.json();
};
