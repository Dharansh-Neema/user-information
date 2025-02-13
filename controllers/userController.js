const bcrypt = require("bcrypt");
const User = require("../model/user.js");
const cookieToken = require("../utils/token.js");

//register end-point
exports.register = async (req, res, next) => {
  try {
    const {
      username,
      email,
      password,
      fullName,
      gender,
      dateOfBirth,
      country,
    } = req.body;

    if (
      !username ||
      !email ||
      !password ||
      !fullName ||
      !gender ||
      !dateOfBirth ||
      !country
    ) {
      return res.status(400).json({ error: "Incomplete signup information." });
    }
    //check for existing user
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res
        .status(400)
        .json({ error: "Username or Email already exists" });
    }

    //save the user
    const newUser = new User({
      username,
      email,
      password,
      fullName,
      gender,
      dateOfBirth,
      country,
    });
    await newUser.save();

    // assign token and save it to cookies
    cookieToken(newUser, res);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

// Login end-point

exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      res.status(404).json({
        message: "Username and password is required",
      });
    }
    const user = await User.findOne({ username });
    if (!user) {
      res.status(404).json({
        message: "Invalid username or password",
      });
    }
    const comparePassword = await bcrypt.compare(password, user.password);
    console.log(comparePassword);
    console.log(user.password);
    console.log(password);
    if (!comparePassword) {
      res.status(404).json({
        message: "Invalid username or password",
      });
    }

    cookieToken(user, res);
  } catch {}
};
