/**
 * sessionManager - A closure that manages session functionality.
 *
 * @returns {Object} An object containing session management methods.
 */
const sessionManager = () => {
  
  return {
    /**
     * Set user session.
     *
     * @param {Object} req - The request object that holds the session data.
     * @param {Object} user - The user object containing user details.
     * @param {string} user.username - The username of the logged-in user.
     */
    setSession: (req, user) => {
      req.session.loggedIn = true;
      req.session.user = { ...user }; // Store user details or any other info in session
    },

    /**
     * Get user session details.
     *
     * @param {Object} req - The request object that holds the session data.
     * @returns {Object} An object containing session data: loggedIn status and username.
     */
    getUserSession: (req) => {
      return {
        loggedIn: req.session.loggedIn,
        user: req.session.user,
      };
    },

    /**
     * Check if the user is authenticated.
     *
     * @param {Object} req - The request object that holds the session data.
     * @returns {boolean} Returns true if the user is logged in, otherwise false.
     */
    isAuthenticated: (req) => {
      console.log(req.session);
      return req.session.loggedIn || false;
    },
    isSessionExpired: (req) => {
      console.log(req.session.cookie._expires, "req.session.cookie._expires");
      if (req.session && req.session.cookie && req.session.cookie._expires) {
        const currentTime = new Date(); // Get the current time as a Date object
        const expiresTime = new Date(req.session.cookie._expires); 
        // Convert _expires to a Date object
        console.log(expiresTime,"expiresTime");
        console.log(currentTime, "currentTime");
        
        console.log(currentTime > expiresTime, "currentTime > expiresTime");
        
        return currentTime > expiresTime; // Check if current time is past the expiration time
      }
      return true; // If no session or cookie, consider it expired
    },

    /**
     * Destroy session (logout user).
     *
     * @param {Object} req - The request object that holds the session data.
     * @param {function} callback - A callback function to be called after session destruction.
     */
    destroySession: (req, callback) => {
      req.session.destroy((err) => {
        if (err) {
          console.log("Error destroying session:", err);
        }
        callback(err); // Call the provided callback function after session destruction
      });
    },
  };
};

module.exports = sessionManager;
