const User = require("../model/userModel");
const bcrypt = require("bcrypt");

const sessionManager = require("../utils/sessionUser");


exports.registerUser = async (req, res) => {
  try {
    const { username, email, password, userType } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      username,
      email,
      password: hashedPassword,
      userType,
    });
    await user.save();
    req.flash("success", "user successfully registered");
    res.redirect("/api/auth/login");
    // res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    req.render("register", {
      errorMessage: "Error registering user",
      successMessage: null,
    });
  }
};

exports.loginUser = async (req, res) => {
  const sessionHandler = sessionManager();
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    const userData = user ? user.toObject() : null;
    if (!user)
      return res.render("login", {
        errorMessage: "user not found",
        successMessage: null,
      });
    //  res.status(404).json({ error: "User not found" });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.render("login", {
        errorMessage: "Email and password are required.",
        successMessage: null,
      });
      // res.status(401).json({ error: "Unauthorized! Invalid Pasword" });
    }
    sessionHandler.setSession(req, { ...userData });
    req.flash("success", "Login successfull");
    res.redirect("/api/library/getAllBooksPage");
  } catch (error) {
    console.error(error, "error");
    res.render("login", { errorMessage: error });
  }
};

exports.loginPage = async (req, res) => {
  res.render("login");
};

exports.registrationPage = async (req, res) => {
  res.render("register");
};

exports.logoutUser = async (req, res) => {
  const sessionHandler = sessionManager();
  sessionHandler.destroySession(req, (err) => {
    if (err) {
      console.error(err, "error");
      return res.status(500).json({ message: "Failed to logout" });
    }
    res.clearCookie("connect.sid"); // Clear the session cookie
    res.status(200).json({ message: "Logout successful" });
  });
};
