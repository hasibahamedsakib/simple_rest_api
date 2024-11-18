// import user schema
const User = require("../models/user.model");

// get all users
const getAllUsers = async (req, res) => {
  try {
    const allUsers = await User.find();
    res.status(200).json(allUsers);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// get user by email
const getSingleUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email });
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(200).json({ message: "User not found for this Email" });
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// create new user
const createUser = async (req, res) => {
  try {
    const { name, email, age } = req.body;
    if (!email) {
      return res.status(400).json({ message: "You Must have and email" });
    }
    const existingUser = await User.findOne({ email: req.body.email });

    if (existingUser) {
      return res.status(400).send({
        message: "user are already created",
      });
    }

    const newUser = new User({
      id: uuidv4(),
      name: name,
      email: email,
      age: +age,
    });

    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// update existing user by id
const updateUser = async (req, res) => {
  try {
    const { name, age } = req.body;
    const user = await User.findOne({ email: req.params.email });
    if (name) {
      user.name = name;
    }
    if (age) {
      user.age = +age;
    }
    await user.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// delete user by email
const deleteUser = async (req, res) => {
  try {
    const deleteUser = await User.findOneAndDelete({ email: req.params.email });
    if (!deleteUser) {
      return res
        .status(400)
        .send({ message: "user not found.Cannot delete non-existing user." });
    } else {
      res.status(200).json({ message: "user deleted successful" });
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = {
  getAllUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
};
