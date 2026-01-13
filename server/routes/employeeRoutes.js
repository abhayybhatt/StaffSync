const express = require("express");
const router = express.Router();
const employeeController = require("../controllers/employeeController");
const { authenticate } = require("../middleware/authMiddleware");
const { requireAdmin } = require("../middleware/authorizeMiddleware");

// Apply authentication middleware to all routes (allows guest access for GET)
router.use(authenticate);

// Public/guest routes (GET - readable by everyone)
router.get("/status", employeeController.getStatus);
router.get("/search/:query", employeeController.searchEmployees);
router.get("/", employeeController.getAllEmployees);
router.get("/:id", employeeController.getEmployeeById);

// Admin-only routes (POST, PUT, DELETE)
router.post("/", requireAdmin, employeeController.createEmployee);
router.put("/:id", requireAdmin, employeeController.updateEmployee);
router.delete("/:id", requireAdmin, employeeController.deleteEmployee);

module.exports = router;
