const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
<<<<<<< HEAD
=======
  const token = req.header("x-auth-token");
  if (!token) return res.status(401).send("Unauthorized");

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    next();
  } catch (error) {
    return res.status(400).send("Invalid token.");
  }
};

/* module.exports = (req, res, next) => {
>>>>>>> 1fe148f9c1ed202aa9fe7a82ea1bc9b2cf2cf822
  const token = req.headers["x-auth-token"];
  if (!token) return res.status(401).send("Unauthorized");

  try {
    const user = jwt.decode(token);
    req.user = user;
    next();
  } catch (error) {
    return res.status(400).send("Invalid token.");
  }
<<<<<<< HEAD
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
=======
  next();
}; */
>>>>>>> 1fe148f9c1ed202aa9fe7a82ea1bc9b2cf2cf822
