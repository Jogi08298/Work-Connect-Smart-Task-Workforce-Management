const Employee = require("../models/employee");

// GET all employees
const getEmployees = async (req, res) => {
    try {
        const employees = await Employee.find().sort({ createdAt: -1 });

        res.status(200).json(employees);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// CREATE employee
const createEmployee = async (req, res) => {
    try {
        const { name, email, department, role, status } = req.body;

        const employee = await Employee.create({
            name,
            email,
            department,
            role,
            status
        });

        res.status(201).json(employee);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// UPDATE employee
const updateEmployee = async (req, res) => {
    try {
        const employee = await Employee.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!employee) {
            return res.status(404).json({
                message: "Employee not found"
            });
        }

        res.status(200).json(employee);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// DELETE employee
const deleteEmployee = async (req, res) => {
    try {
        const employee = await Employee.findByIdAndDelete(req.params.id);

        if (!employee) {
            return res.status(404).json({
                message: "Employee not found"
            });
        }

        res.status(200).json({
            message: "Employee deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = {
    getEmployees,
    createEmployee,
    updateEmployee,
    deleteEmployee
};