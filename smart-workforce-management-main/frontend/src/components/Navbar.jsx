import React from "react";

function Navbar({ activePage }) {
    return (
        <div className="navbar">

            <div>
                <h2>
                    {activePage === "dashboard"
                        ? "Dashboard"
                        : activePage === "employees"
                        ? "Employees"
                        : activePage === "tasks"
                        ? "Tasks"
                        : "Attendance"}
                </h2>

                <p>Welcome back, Admin 👋</p>
            </div>

            <div className="admin-profile">
                <div className="profile-circle">
                    A
                </div>

                <div>
                    <strong>Admin</strong>
                    <small>Administrator</small>
                </div>
            </div>

        </div>
    );
}

export default Navbar;