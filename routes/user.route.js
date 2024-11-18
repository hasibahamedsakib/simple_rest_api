const express = require("express");
const router = express.Router();

// import all controllers
const {
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
  createUser,
} = require("../controllers/user.controller");

// get all users
router.get("/", getAllUsers);

// get single user
router.get("/:email", getSingleUser);

// create user
router.post("/", createUser);

// update user
router.patch("/:email", updateUser);

// delete user
router.delete("/:email", deleteUser);

module.exports = router;
