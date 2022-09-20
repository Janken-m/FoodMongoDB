const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const token = req.headers["x-auth-token"];
  if (!token) return res.status(401).send("Unauthorized");

  try {
    const user = jwt.decode(token);
    req.user = user;
    next();
  } catch (error) {
    return res.status(400).send("Invalid token.");
  }
};

// or;

// const token = req.header("x-auth-token");
// if (!token) return res.status(401).send("Unauthorized");

// try {
//   const user = jwt.verify(token, process.env.JWT_SECRT);
//   user.req = user;
//   next();
// } catch (error) {
//   res.status(400).send("Invalid token", error);
// }
