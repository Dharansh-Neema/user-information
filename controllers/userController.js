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
    res
      .status(500)
      .json({ message: "Server Error while signing in", error: err.message });
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
    if (!comparePassword) {
      res.status(404).json({
        message: "Invalid username or password",
      });
    }

    cookieToken(user, res);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Server Error while logging in", error: err.message });
  }
};

//Search end-point
exports.search = async (req, res) => {
  try {
    const { username, email } = req.body;
    if (!username && !email) {
      res.status(403).json({
        message: "Either username or email is required to search",
      });
    }
    const user = await User.findOne({
      $or: [{ username }, { email }],
    }).select("-password"); // Exclude password from response

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(201).json({ user });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Server Error while searching", error: err.message });
  }
};
