import React, { useEffect, useState } from "react";
import API from "../api";
import EmployeeForm from "../components/EmployeeForm";

function Employees({ employees, setEmployees }) {

    const [showForm, setShowForm] = useState(false);
    const [search, setSearch] = useState("");

    useEffect(() => {

        const fetchEmployees = async () => {

            try {

                const response = await API.get("/employees");

                setEmployees(response.data);

            } catch (error) {

                console.error("Error fetching employees:", error);

            }

        };

        fetchEmployees();

    }, [setEmployees]);

    const handleEmployeeAdded = (employee) => {

        setEmployees(prev => [
            employee,
            ...prev
        ]);

        setShowForm(false);
    };

    const deleteEmployee = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this employee?"
        );

        if (!confirmDelete) return;

        try {

            await API.delete(`/employees/${id}`);

            setEmployees(prev =>
                prev.filter(employee => employee._id !== id)
            );

        } catch (error) {

            console.error(error);

            alert("Failed to delete employee");
        }
    };

    const filteredEmployees = employees.filter(employee =>
        employee.name
            .toLowerCase()
            .includes(search.toLowerCase())
    );

    return (
        <div className="employees-page">

            <div className="page-header">

                <div>
                    <h2>Employee Management</h2>

                    <p>
                        Manage your workforce information
                    </p>
                </div>

                <button
                    className="add-main-btn"
                    onClick={() => setShowForm(!showForm)}
                >
                    + Add Employee
                </button>

            </div>

            {showForm && (
                <div className="form-container">

                    <h3>Add New Employee</h3>

                    <EmployeeForm
                        onEmployeeAdded={handleEmployeeAdded}
                    />

                </div>
            )}

            <div className="employee-table-container">

                <div className="table-header">

                    <h3>Employees</h3>

                    <input
                        type="text"
                        placeholder="Search employee..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />

                </div>

                <table>

                    <thead>

                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Department</th>
                            <th>Role</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>

                    </thead>

                    <tbody>

                        {filteredEmployees.length === 0 ? (

                            <tr>
                                <td colSpan="6">
                                    No employees found
                                </td>
                            </tr>

                        ) : (

                            filteredEmployees.map(employee => (

                                <tr key={employee._id}>

                                    <td>
                                        <strong>
                                            {employee.name}
                                        </strong>
                                    </td>

                                    <td>
                                        {employee.email}
                                    </td>

                                    <td>
                                        {employee.department}
                                    </td>

                                    <td>
                                        {employee.role}
                                    </td>

                                    <td>

                                        <span
                                            className={
                                                employee.status === "Active"
                                                    ? "status active-status"
                                                    : "status inactive-status"
                                            }
                                        >
                                            {employee.status}
                                        </span>

                                    </td>

                                    <td>

                                        <button
                                            className="delete-btn"
                                            onClick={() =>
                                                deleteEmployee(employee._id)
                                            }
                                        >
                                            Delete
                                        </button>

                                    </td>

                                </tr>

                            ))

                        )}

                    </tbody>

                </table>

            </div>

        </div>
    );
}

export default Employees;