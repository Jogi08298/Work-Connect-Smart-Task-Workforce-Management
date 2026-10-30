import React, { useEffect, useState } from "react";
import API from "../api";

function Attendance() {
    const [attendance, setAttendance] = useState([]);

    const [formData, setFormData] = useState({
        employeeName: "",
        date: "",
        status: "Present"
    });

    useEffect(() => {
        fetchAttendance();
    }, []);

    const fetchAttendance = async () => {
        try {
            const response = await API.get("/attendance");
            setAttendance(response.data);
        } catch (error) {
            console.error("Error fetching attendance:", error);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const markAttendance = async (e) => {
        e.preventDefault();

        try {
            const response = await API.post(
                "/attendance",
                formData
            );

            setAttendance((prev) => [
                response.data,
                ...prev
            ]);

            setFormData({
                employeeName: "",
                date: "",
                status: "Present"
            });

        } catch (error) {
            console.error(error);
            alert("Failed to mark attendance");
        }
    };

    const deleteAttendance = async (id) => {
        if (!window.confirm("Delete this attendance record?")) {
            return;
        }

        try {
            await API.delete(`/attendance/${id}`);

            setAttendance((prev) =>
                prev.filter((item) => item._id !== id)
            );

        } catch (error) {
            console.error(error);
            alert("Failed to delete attendance");
        }
    };

    const presentCount = attendance.filter(
        (item) => item.status === "Present"
    ).length;

    const absentCount = attendance.filter(
        (item) => item.status === "Absent"
    ).length;

    return (
        <div>

            <div className="page-header">

                <div>
                    <h2>Attendance Management</h2>
                    <p>Track employee attendance</p>
                </div>

            </div>

            {/* Attendance Form */}

            <div className="form-container">

                <h3>Mark Attendance</h3>

                <form
                    className="employee-form"
                    onSubmit={markAttendance}
                >

                    <div className="form-group">

                        <label>Employee Name</label>

                        <input
                            type="text"
                            name="employeeName"
                            placeholder="Enter employee name"
                            value={formData.employeeName}
                            onChange={handleChange}
                            required
                        />

                    </div>

                    <div className="form-group">

                        <label>Date</label>

                        <input
                            type="date"
                            name="date"
                            value={formData.date}
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

                            <option value="Present">
                                Present
                            </option>

                            <option value="Absent">
                                Absent
                            </option>

                        </select>

                    </div>

                    <button
                        type="submit"
                        className="add-btn"
                    >
                        Mark Attendance
                    </button>

                </form>

            </div>

            {/* Attendance Summary */}

            <div className="cards">

                <div className="card">

                    <div>
                        <p>Total Records</p>
                        <h1>{attendance.length}</h1>
                    </div>

                    <div className="card-icon">
                        📋
                    </div>

                </div>

                <div className="card">

                    <div>
                        <p>Present</p>
                        <h1>{presentCount}</h1>
                    </div>

                    <div className="card-icon">
                        ✅
                    </div>

                </div>

                <div className="card">

                    <div>
                        <p>Absent</p>
                        <h1>{absentCount}</h1>
                    </div>

                    <div className="card-icon">
                        ❌
                    </div>

                </div>

            </div>

            {/* Attendance Table */}

            <div
                className="employee-table-container"
                style={{ marginTop: "25px" }}
            >

                <div className="table-header">

                    <h3>Attendance Records</h3>

                </div>

                <table>

                    <thead>

                        <tr>
                            <th>Employee</th>
                            <th>Date</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>

                    </thead>

                    <tbody>

                        {attendance.length === 0 ? (

                            <tr>

                                <td colSpan="4">
                                    No attendance records found
                                </td>

                            </tr>

                        ) : (

                            attendance.map((item) => (

                                <tr key={item._id}>

                                    <td>
                                        <strong>
                                            {item.employeeName}
                                        </strong>
                                    </td>

                                    <td>
                                        {new Date(
                                            item.date
                                        ).toLocaleDateString()}
                                    </td>

                                    <td>

                                        <span
                                            className={
                                                item.status === "Present"
                                                    ? "status active-status"
                                                    : "status inactive-status"
                                            }
                                        >
                                            {item.status}
                                        </span>

                                    </td>

                                    <td>

                                        <button
                                            className="delete-btn"
                                            onClick={() =>
                                                deleteAttendance(
                                                    item._id
                                                )
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

export default Attendance;