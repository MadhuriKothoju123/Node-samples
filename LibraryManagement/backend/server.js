// backend/server.js
const express = require("express");
const session = require("express-session");
const flash = require("connect-flash");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const library = require("./routes/library");
const authRoutes = require("./routes/authRoutes");
const path = require("path");
const connectDB = require("./config/db");
const sessionManager = require("./utils/sessionUser");
const sessionHandler = sessionManager();
dotenv.config();
const app = express();
app.use((req, res, next) => {
  console.log(`${req.method} request to ${req.url}`);
  next(); // Pass control to the next middleware
});
app.use(
  session({
    secret: process.env.SESSION_SECRET, // Secret key for signing sessions
    resave: false, // Don't save session if unmodified
    saveUninitialized: true, // Save session even if unmodified
    cookie: {
      secure: false, // Set to true if using https
      maxAge: 1000 * 60 * 15, // Session expires in 15 minutes
      rolling: true, // Reset expiration time with each request
    },
  })
);
app.use(flash());
// Middleware to pass flash messages to all EJS templates

app.use(express.static(path.join(__dirname, "public")));

app.use("/files", express.static(path.join(__dirname, "files")));

app.use((req, res, next) => {
  const { user } = sessionHandler.getUserSession(req);
  res.locals.successMessage = req.flash("success") || [];
  res.locals.errorMessage = req.flash("error") || [];
  res.locals.user = user || null; // Pass session user to templates
  console.log("Flash in res.locals:", res.locals, "hi");
  next();
});

// Third-Party Middleware:

app.use(bodyParser.json());
// app.use(express.json());  //Built-In Middleware:

// Set up view engine for templating (EJS)
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// MongoDB connection
connectDB();
// Routes
app.use("/api/auth", authRoutes);
app.use("/api/library", library);
app.get("/about", (req, res) => {
  res.send("About Us page");
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
