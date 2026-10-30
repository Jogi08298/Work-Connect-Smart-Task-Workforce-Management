const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema(
    {
        employeeName: {
            type: String,
            required: true
        },
        date: {
            type: Date,
            required: true
        },
        status: {
            type: String,
            enum: ["Present", "Absent"],
            default: "Present"
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Attendance", attendanceSchema);