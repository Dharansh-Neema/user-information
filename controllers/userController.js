const bcrypt = require("bcryptjs");
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
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    //save the user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
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
