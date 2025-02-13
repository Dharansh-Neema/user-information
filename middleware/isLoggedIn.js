const jwt = require("jsonwebtoken");
const User = require("../model/user");
const isLoggendIn = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res
      .status(401)
      .json({ message: "Unauthorized. No token provided. Please Login " });
  }
  try {
    const decode = jwt.verify(token, process.env.JWT_SECERT);
    console.log(decode);
    user = await User.findById(decode.id).select("-password");
    req.users = user; // Attach user info to request
    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};

module.exports = isLoggendIn;
