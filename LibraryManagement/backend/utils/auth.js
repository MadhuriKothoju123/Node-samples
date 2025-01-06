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







