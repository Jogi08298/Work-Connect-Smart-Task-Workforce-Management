import React, { useState } from "react";
import API from "../api";

function EmployeeForm({ onEmployeeAdded }) {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        department: "",
        role: "",
        status: "Active"
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            const response = await API.post(
                "/employees",
                formData
            );

            onEmployeeAdded(response.data);

            setFormData({
                name: "",
                email: "",
                department: "",
                role: "",
                status: "Active"
            });

        } catch (error) {

            console.error(error);

            alert(
                error.response?.data?.message ||
                "Failed to add employee"
            );
        }
    };

    return (
        <form className="employee-form" onSubmit={handleSubmit}>

            <div className="form-group">
                <label>Employee Name</label>

                <input
                    type="text"
                    name="name"
                    placeholder="Enter employee name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-group">
                <label>Email</label>

                <input
                    type="email"
                    name="email"
                    placeholder="Enter email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-group">
                <label>Department</label>

                <select
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select Department</option>
                    <option value="Sales">Sales</option>
                    <option value="HR">HR</option>
                    <option value="IT">IT</option>
                    <option value="Operations">Operations</option>
                    <option value="Finance">Finance</option>
                </select>
            </div>

            <div className="form-group">
                <label>Role</label>

                <input
                    type="text"
                    name="role"
                    placeholder="Example: Developer"
                    value={formData.role}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-group">
                <label>Status</label>

                <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                </select>
            </div>

            <button className="add-btn" type="submit">
                + Add Employee
            </button>

        </form>
    );
}

export default EmployeeForm;