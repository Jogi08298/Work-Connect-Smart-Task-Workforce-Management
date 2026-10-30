const express = require("express");

const {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser
} = require("../controllers/userController");

const router = express.Router();

// GET all users
router.get("/", getUsers);

// GET one user
router.get("/:id", getUser);

// CREATE user
router.post("/", createUser);

// UPDATE user
router.put("/:id", updateUser);

// DELETE user
router.delete("/:id", deleteUser);

module.exports = router;