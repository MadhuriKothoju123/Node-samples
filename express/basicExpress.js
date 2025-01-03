const express = require("express");
const app = express();

const PORT = 9000;

// Define a simple route
app.get("/", (req, res) => {
    console.log(req, res);
  res.send("Hello, Express!");
  console.log(req, res);

});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
