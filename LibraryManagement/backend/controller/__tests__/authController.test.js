const {
  registerUser,
  loginPage,
  registrationPage,
    logoutUser,
} = require("../authController");
const User = require("../../model/userModel");
const bcrypt = require("bcrypt");
const { loginUser } = require("../authController");

const sessionManager = require("../../utils/sessionUser");

jest.mock("../../model/userModel");
jest.mock("bcrypt");
jest.mock("../../utils/sessionUser");
jest.mock("connect-flash");

describe("registerUser", () => {
  let req, res;

  beforeEach(() => {
    req = {
      body: {
        username: "testUser",
        email: "test@example.com",
        password: "password",
        userType: "admin",
      },
      flash: jest.fn(),
      render: jest.fn(),
    };
    res = {
      redirect: jest.fn(),
    };
  });

  it("should register a new user successfully", async () => {
    bcrypt.hash.mockResolvedValue("hashedPassword");
    User.mockImplementation(() => ({
      save: jest.fn().mockResolvedValue({}),
    }));

    await registerUser(req, res);

    expect(User).toHaveBeenCalledWith({
      username: "testUser",
      email: "test@example.com",
      password: "hashedPassword",
      userType: "admin",
    });
    expect(req.flash).toHaveBeenCalledWith(
      "success",
      "user successfully registered"
    );
    expect(res.redirect).toHaveBeenCalledWith("/api/auth/login");
  });

  it("should handle errors during registration", async () => {
    bcrypt.hash.mockRejectedValue(new Error("Hashing error"));
    await registerUser(req, res);

    expect(req.render).toHaveBeenCalledWith("register", {
      errorMessage: "Error registering user",
      successMessage: null,
    });
  });

  it("should render the registration page", async () => {
    const req = {};
    const res = { render: jest.fn() };

    await registrationPage(req, res);

    expect(res.render).toHaveBeenCalledWith("register");
  });
});

describe("loginUser", () => {
  let req, res;

  beforeEach(() => {
    req = {
      body: { email: "test@example.com", password: "password" },
      render: jest.fn(), // Mock render here
      flash: jest.fn(),
    };
    res = {
      redirect: jest.fn(),
      render: jest.fn(), // Mock render here
    };
  });

  it("should log in a user with valid credentials", async () => {
    User.findOne.mockResolvedValue({
      email: "test@example.com",
      password: "hashedPassword",
      toObject: jest.fn().mockReturnValue({ email: "test@example.com" }),
    });
    bcrypt.compare.mockResolvedValue(true);
  

    sessionHandler = {
      setSession: jest.fn(),
    };

    // Mock the sessionManager to return the sessionHandler
    sessionManager.mockReturnValue(sessionHandler);

    await loginUser(req, res);

    expect(sessionHandler.setSession).toHaveBeenCalledWith(req, {
      email: "test@example.com",
    });
    expect(req.flash).toHaveBeenCalledWith("success", "Login successfull");
    expect(res.redirect).toHaveBeenCalledWith("/api/library/getAllBooksPage");
  });

  it("should return error if user is not found", async () => {
    User.findOne.mockResolvedValue(null); // Mock that no user is found

    await loginUser(req, res);

    expect(res.render).toHaveBeenCalledWith("login", {
      // Check res.render, not req.render
      errorMessage: "user not found",
      successMessage: null,
    });
  });

  it("should return error if password is invalid", async () => {
    User.findOne.mockResolvedValue({
      email: "test@example.com",
      password: "hashedPassword",
      toObject: jest.fn().mockReturnValue({
        email: "test@example.com",
        userType: "regular",
      }), // Add the toObject method to mock the expected behavior
    });

    bcrypt.compare.mockResolvedValue(false); // Mock the password comparison to return false (invalid password)

    await loginUser(req, res);

    expect(res.render).toHaveBeenCalledWith("login", {
      errorMessage: "Email and password are required.",
      successMessage: null,
    });
  });
  it("should render the login page", async () => {
    const req = {};
    const res = { render: jest.fn() };

    await loginPage(req, res);

    expect(res.render).toHaveBeenCalledWith("login");
  });
});

describe("logoutUser", () => {
  let req, res, sessionHandler;

  beforeEach(() => {
    // Mock the sessionHandler object to simulate session management
    sessionHandler = {
      destroySession: jest.fn().mockImplementation((req, callback) => {
        req.session.destroy(callback); // Mock the session.destroy method here
      }),
    };

    // Mock the sessionManager to return the sessionHandler
    sessionManager.mockReturnValue(sessionHandler);

    // Create mock request and response objects
    req = {
      session: {
        destroy: jest.fn().mockImplementation((callback) => callback(null)), // Mock destroy method
      },
      clearCookie: jest.fn(),
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      redirect: jest.fn(),
      clearCookie: jest.fn(),
    };
  });

  it("should log out a user successfully", async () => {
    // Call the function to test
    await logoutUser(req, res);

    // Check that the destroySession method was called
    expect(sessionHandler.destroySession).toHaveBeenCalledTimes(1);
    // Check that the session destroy method was called
    expect(req.session.destroy).toHaveBeenCalledTimes(1);
    // Check that the session cookie was cleared
    expect(res.clearCookie).toHaveBeenCalledWith("connect.sid");
    // Check that the response status and message are correct
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: "Logout successful" });
  });

  it("should handle session destroy error", async () => {
    // Simulate an error in session destroy
    req.session.destroy.mockImplementationOnce((callback) =>
      callback(new Error("Error destroying session"))
    );

    // Call the function to test
    await logoutUser(req, res);

    // Check that the session destroy method was called
    expect(req.session.destroy).toHaveBeenCalledTimes(1);
    // Check that the response status and error message are correct
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: "Failed to logout" });
  });
  
});
