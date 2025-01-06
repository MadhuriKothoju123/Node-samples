const mongoose = require("mongoose");
const dotenv = require("dotenv");
const connectDB = require("../../config/db");

jest.mock("mongoose"); // Mock mongoose to avoid making an actual connection
jest.mock("dotenv", () => ({
  config: jest.fn(),
}));
jest.spyOn(process, 'exit').mockImplementation((code) => {
    throw new Error(`process.exit called with "${code}"`);
  });

describe("connectDB", () => {
  beforeEach(() => {
    dotenv.config.mockClear();
    mongoose.connect.mockClear();
  });

  beforeAll(() => {
    jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterAll(() => {
    console.log.mockRestore();
  });

  it("should connect to MongoDB successfully", async () => {
    mongoose.connect.mockResolvedValueOnce();

    await connectDB();

    expect(console.log).toHaveBeenCalledWith("Connected to MongoDB");
    expect(mongoose.connect).toHaveBeenCalledWith(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });
  it("should handle MongoDB connection errors", async () => {
    const mockError = new Error("Error connecting to MongoDB: Mock connection error");
    mongoose.connect.mockRejectedValueOnce(mockError); // Mock failed connection

    try {
      await connectDB();
    } catch (e) {
      // Test the error message
      expect(e.message).toContain("process.exit called with \"1\"");

      // Ensure process.exit was called with code 1
      expect(process.exit).toHaveBeenCalledWith(1);
    }

    expect(mongoose.connect).toHaveBeenCalledWith(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });
});
