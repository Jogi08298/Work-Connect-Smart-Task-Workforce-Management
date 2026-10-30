const express = require("express");

const {
    getAttendance,
    createAttendance,
    deleteAttendance
} = require("../controllers/attendanceController");

const router = express.Router();

router.get("/", getAttendance);
router.post("/", createAttendance);
router.delete("/:id", deleteAttendance);

module.exports = router;