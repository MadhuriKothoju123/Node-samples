// const jwt = require("jsonwebtoken");

const sessionManager = require("./sessionUser");
const sessionHandler = sessionManager();

const isAuthenticatedMiddleware = (req, res, next) => {
  
  if (sessionHandler.isAuthenticated(req)) {
    return next(); // Proceed to the next middleware or route handler
  }
  else if (sessionHandler.isSessionExpired(req)) {
    // Option 1: Redirect to login page
    return res
      .status(401)
      .json({ message: "Session expired. Please log in again." });
  }
  res.redirect("/api/auth/login"); // Redirect to login if not authenticated
};

module.exports = { isAuthenticatedMiddleware };

// function authenticateToken(req, res, next) {
//   const token = req.session?.token;
//   console.log(req.session?.token);
//   console.log(req.session?.user);
//   if (!token) {
//     return res.status(401).json({ error: "No token provided in session" });
//   }

//   jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
//     if (err) {
//       if (err.name === "TokenExpiredError") {
//         return res.status(401).json({ error: "Token expired" });
//       }
//       return res.status(401).json({ error: "Invalid token" });
//     }

//     console.log(decoded, "decoded");
//     req.user = decoded;
//     next();
//   });
// }
// module.exports = authenticateToken;
