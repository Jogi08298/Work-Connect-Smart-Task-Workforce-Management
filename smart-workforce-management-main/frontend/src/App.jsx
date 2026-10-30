import React, { useEffect, useState } from "react";
import API from "./api";

import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";

import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employees";
import Tasks from "./pages/Tasks";
import Attendance from "./pages/Attendance";
import "./App.css";

function App() {
    const [activePage, setActivePage] = useState("dashboard");

    const [employees, setEmployees] = useState([]);

    const [tasks, setTasks] = useState([]);

    // Fetch tasks from backend
    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await API.get("/tasks");
                setTasks(response.data);
            } catch (error) {
                console.error("Error fetching tasks:", error);
            }
        };

        fetchTasks();
    }, []);

    return (
        <div className="app">

            <Sidebar
                activePage={activePage}
                setActivePage={setActivePage}
            />

            <div className="main">

                <Navbar
                    activePage={activePage}
                />

                <div className="content">

                    {/* Dashboard */}
                    {activePage === "dashboard" && (
                        <Dashboard
                            employees={employees}
                            tasks={tasks}
                        />
                    )}

                    {/* Employees */}
                    {activePage === "employees" && (
                        <Employees
                            employees={employees}
                            setEmployees={setEmployees}
                        />
                    )}

                    {/* Tasks */}
                    {activePage === "tasks" && (
                        <Tasks />
                    )}

                    {/* Attendance */}
                    {activePage === "attendance" && (
    <Attendance />
)}

                </div>

            </div>

        </div>
    );
}

export default App;