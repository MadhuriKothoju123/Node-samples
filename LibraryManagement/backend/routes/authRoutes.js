const express = require("express");
const { registerUser, loginUser, registrationPage, loginPage, logoutUser } = require("../controller/authController");

const router = express.Router();
router.use(express.urlencoded({ extended: true }));

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/register", registrationPage);
router.get("/login", loginPage);
router.post("/logout", logoutUser)

module.exports = router;
