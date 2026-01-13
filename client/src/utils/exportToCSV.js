// Export employees data to CSV
export const exportToCSV = (employees, filename = "employees") => {
  if (!employees || employees.length === 0) {
    alert("No data to export");
    return;
  }

  // Define CSV headers
  const headers = ["Name", "Email", "Phone", "Status", "Created At"];

  // Convert employees to CSV rows
  const rows = employees.map((employee) => {
    const createdAt = employee.createdAt
      ? new Date(employee.createdAt).toLocaleDateString()
      : "N/A";
    return [
      employee.name || "",
      employee.email || "",
      employee.phone || "",
      employee.status || "",
      createdAt,
    ];
  });

  // Combine headers and rows
  const csvContent = [headers, ...rows]
    .map((row) => row.map((field) => `"${field}"`).join(","))
    .join("\n");

  // Create blob and download
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);

  link.setAttribute("href", url);
  link.setAttribute("download", `${filename}_${new Date().toISOString().split("T")[0]}.csv`);
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
