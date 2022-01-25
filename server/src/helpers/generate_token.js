const jwt = require("jsonwebtoken");

const generateToken = (data) => {
  return jwt.sign({ _id, username, password, role }, process.env.JWT_KEY);
};

module.exports = generateToken;
