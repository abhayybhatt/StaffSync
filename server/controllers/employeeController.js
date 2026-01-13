const Employee = require("../models/employeeModel");

//get status
exports.getStatus = async (req, res) => {
  try {
    const userCount = await Employee.countDocuments();
    const active = await Employee.countDocuments({ status: "Active" });
    const inactive = await Employee.countDocuments({ status: "Inactive" });

    res.json({ userCount, active, inactive });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

//search employees
exports.searchEmployees = async (req, res) => {
  try {
    const query = req.params.query;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const skip = (page - 1) * limit;
    const searchQuery = {
      $or: [
        { name: { $regex: query, $options: "i" } },
        { email: { $regex: query, $options: "i" } },
        { phone: { $regex: query, $options: "i" } },
        { status: { $regex: query, $options: "i" } },
      ],
    };

    const employees = await Employee.find(searchQuery)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Employee.countDocuments(searchQuery);

    res.json({
      users: employees,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalUsers: total,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

//get all employees
exports.getAllEmployees = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const skip = (page - 1) * limit;
    const employees = await Employee.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Employee.countDocuments();

    res.json({
      users: employees,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalUsers: total,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching employees", error: error.message });
  }
};

//get single employee by ID
exports.getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.json(employee);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching employee", error: error.message });
  }
};

//Create Employee
exports.createEmployee = async (req, res) => {
  try {
    const { name, email, phone, status } = req.body;
    if (!name || !email || !phone) {
      return res
        .status(400)
        .json({ message: "Name, Email and Phone are required" });
    }

    const existingEmployee = await Employee.findOne({ email });
    if (existingEmployee) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const employee = new Employee({
      name,
      email,
      phone,
      status: status || "Active",
    });
    await employee.save();
    res.status(201).json(employee);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating employee", error: error.message });
  }
};

//Update Employee
exports.updateEmployee = async (req, res) => {
  try {
    const { name, email, phone, status } = req.body;

    if (email) {
      const employeeExists = await Employee.find({
        email,
        _id: { $ne: req.params.id },
      });
      if (employeeExists.length > 0) {
        return res
          .status(400)
          .json({ message: "Email already in use by another employee" });
      }
    }

    const employee = await Employee.findByIdAndUpdate(
      req.params.id,
      { name, email, phone, status },
      { new: true, runValidators: true }
    );
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.json(employee);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating employee", error: error.message });
  }
};

//Delete Employee
exports.deleteEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.json({ message: "Employee deleted successfully", success: true });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting employee", error: error.message });
  }
};
