const Attendance = require("../models/Attendance");

const getAttendance = async (req, res) => {
    try {
        const attendance = await Attendance.find().sort({ date: -1 });

        res.status(200).json(attendance);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const createAttendance = async (req, res) => {
    try {
        const attendance = await Attendance.create(req.body);

        res.status(201).json(attendance);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const deleteAttendance = async (req, res) => {
    try {
        await Attendance.findByIdAndDelete(req.params.id);

        res.status(200).json({
            message: "Attendance deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = {
    getAttendance,
    createAttendance,
    deleteAttendance
};