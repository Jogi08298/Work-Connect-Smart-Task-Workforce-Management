import React from "react";

function Dashboard({ employees = [], tasks = [] }) {
    const totalEmployees = employees.length;

    const activeEmployees = employees.filter(
        (employee) => employee.status === "Active"
    ).length;

    const inactiveEmployees = employees.filter(
        (employee) => employee.status === "Inactive"
    ).length;

    const completedTasks = tasks.filter(
        (task) => task.status === "Completed"
    ).length;

    const pendingTasks = tasks.filter(
        (task) => task.status === "Pending"
    ).length;

    return (
        <div className="dashboard">

            <div className="cards">

                <div className="card">
                    <div>
                        <p>Total Employees</p>
                        <h1>{totalEmployees}</h1>
                    </div>
                    <div className="card-icon">👥</div>
                </div>

                <div className="card">
                    <div>
                        <p>Active Employees</p>
                        <h1>{activeEmployees}</h1>
                    </div>
                    <div className="card-icon">✅</div>
                </div>

                <div className="card">
                    <div>
                        <p>Inactive Employees</p>
                        <h1>{inactiveEmployees}</h1>
                    </div>
                    <div className="card-icon">⏸️</div>
                </div>

                <div className="card">
                    <div>
                        <p>Tasks Completed</p>
                        <h1>{completedTasks}</h1>
                    </div>
                    <div className="card-icon">📋</div>
                </div>

            </div>

            <div className="welcome-box">

                <h2>Welcome to Smart Workforce Management</h2>

                <p>
                    Manage employees, tasks and field activities from one place.
                </p>

                <div className="overview-items">

                    <div>
                        <strong>{totalEmployees}</strong>
                        <span>Total Employees</span>
                    </div>

                    <div>
                        <strong>{activeEmployees}</strong>
                        <span>Active Employees</span>
                    </div>

                    <div>
                        <strong>{completedTasks}</strong>
                        <span>Tasks Completed</span>
                    </div>

                    <div>
                        <strong>{pendingTasks}</strong>
                        <span>Pending Tasks</span>
                    </div>

                </div>

            </div>

        </div>
    );
}

export default Dashboard;