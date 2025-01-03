const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();  // Load environment variables from .env file

/**
 * Connects to the MongoDB database.
 * @returns {Promise} A promise that resolves if the connection is successful, or rejects with an error.
 */
const connectDB = () => {
  return mongoose
    .connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => {
      console.log("Error connecting to MongoDB:", err);
      process.exit(1);  // Exit the process if MongoDB connection fails
    });
};

module.exports = connectDB;
