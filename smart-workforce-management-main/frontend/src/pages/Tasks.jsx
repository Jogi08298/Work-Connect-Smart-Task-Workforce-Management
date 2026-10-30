import React, { useEffect, useState } from "react";
import API from "../api";

function Tasks() {
    const [tasks, setTasks] = useState([]);
    const [showForm, setShowForm] = useState(false);

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        assignedTo: "",
        priority: "Medium",
        dueDate: ""
    });

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const response = await API.get("/tasks");
            setTasks(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const addTask = async (e) => {
        e.preventDefault();

        try {
            const response = await API.post("/tasks", formData);

            setTasks(prev => [response.data, ...prev]);

            setFormData({
                title: "",
                description: "",
                assignedTo: "",
                priority: "Medium",
                dueDate: ""
            });

            setShowForm(false);
        } catch (error) {
            alert("Failed to create task");
        }
    };

    const updateStatus = async (id, status) => {
        try {
            const response = await API.put(`/tasks/${id}`, {
                status
            });

            setTasks(prev =>
                prev.map(task =>
                    task._id === id ? response.data : task
                )
            );
        } catch (error) {
            alert("Failed to update status");
        }
    };

    const deleteTask = async (id) => {
        if (!window.confirm("Delete this task?")) return;

        try {
            await API.delete(`/tasks/${id}`);

            setTasks(prev =>
                prev.filter(task => task._id !== id)
            );
        } catch (error) {
            alert("Failed to delete task");
        }
    };

    return (
        <div>

            <div className="page-header">
                <div>
                    <h2>Task Management</h2>
                    <p>Create and track employee tasks</p>
                </div>

                <button
                    className="add-main-btn"
                    onClick={() => setShowForm(!showForm)}
                >
                    + Create Task
                </button>
            </div>

            {showForm && (
                <div className="form-container">

                    <h3>Create New Task</h3>

                    <form
                        className="employee-form"
                        onSubmit={addTask}
                    >

                        <div className="form-group">
                            <label>Task Title</label>

                            <input
                                name="title"
                                placeholder="Enter task title"
                                value={formData.title}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Assigned To</label>

                            <input
                                name="assignedTo"
                                placeholder="Employee name"
                                value={formData.assignedTo}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Description</label>

                            <input
                                name="description"
                                placeholder="Task description"
                                value={formData.description}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label>Priority</label>

                            <select
                                name="priority"
                                value={formData.priority}
                                onChange={handleChange}
                            >
                                <option>Low</option>
                                <option>Medium</option>
                                <option>High</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Due Date</label>

                            <input
                                type="date"
                                name="dueDate"
                                value={formData.dueDate}
                                onChange={handleChange}
                            />
                        </div>

                        <button className="add-btn">
                            Create Task
                        </button>

                    </form>

                </div>
            )}

            <div className="employee-table-container">

                <div className="table-header">
                    <h3>All Tasks</h3>
                </div>

                <table>

                    <thead>
                        <tr>
                            <th>Task</th>
                            <th>Assigned To</th>
                            <th>Priority</th>
                            <th>Status</th>
                            <th>Due Date</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>

                        {tasks.length === 0 ? (
                            <tr>
                                <td colSpan="6">
                                    No tasks available
                                </td>
                            </tr>
                        ) : (

                            tasks.map(task => (

                                <tr key={task._id}>

                                    <td>
                                        <strong>{task.title}</strong>
                                    </td>

                                    <td>
                                        {task.assignedTo}
                                    </td>

                                    <td>
                                        {task.priority}
                                    </td>

                                    <td>
                                        <select
                                            value={task.status}
                                            onChange={(e) =>
                                                updateStatus(
                                                    task._id,
                                                    e.target.value
                                                )
                                            }
                                        >
                                            <option>Pending</option>
                                            <option>In Progress</option>
                                            <option>Completed</option>
                                        </select>
                                    </td>

                                    <td>
                                        {task.dueDate
                                            ? new Date(task.dueDate)
                                                .toLocaleDateString()
                                            : "-"}
                                    </td>

                                    <td>
                                        <button
                                            className="delete-btn"
                                            onClick={() =>
                                                deleteTask(task._id)
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

export default Tasks;