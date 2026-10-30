import React from "react";

function Sidebar({ activePage, setActivePage }) {
    return (
        <div className="sidebar">

            <div className="logo">
                <h2>WorkForce</h2>
                <span>Management System</span>
            </div>

            <div className="menu">

                <button
                    className={activePage === "dashboard" ? "active" : ""}
                    onClick={() => setActivePage("dashboard")}
                >
                    📊 Dashboard
                </button>

                <button
                    className={activePage === "employees" ? "active" : ""}
                    onClick={() => setActivePage("employees")}
                >
                    👥 Employees
                </button>

                <button
                    className={activePage === "tasks" ? "active" : ""}
                    onClick={() => setActivePage("tasks")}
                >
                    📋 Tasks
                </button>

                <button
                    className={activePage === "attendance" ? "active" : ""}
                    onClick={() => setActivePage("attendance")}
                >
                    🕒 Attendance
                </button>

            </div>

            <div className="sidebar-bottom">
                <p>Admin Panel</p>
                <small>Workforce Management</small>
            </div>

        </div>
    );
}

export default Sidebar;