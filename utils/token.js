const jwt = require("jsonwebtoken");

const cookieToken = (user, res) => {
  /* This function generate token and store it on browser cookie so that 
  user can get signed in automatically
  */
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECERT, {
    expiresIn: "1d",
  });
  const options = {
    expire: new Date(Date.now() + 24 * 60 * 60 * 1000),
    httpOnly: true,
  };
  res
    .status(200)
    .cookie("token", token, options)
    .json({
      success: true,
      token,
      user: {
        username: user.username,
        email: user.email,
      },
    });
};

module.exports = cookieToken;
