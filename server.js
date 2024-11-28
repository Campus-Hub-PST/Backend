const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// In-memory database for demonstration
const users = [];

// Register route
app.post("/api/register", (req, res) => {
  const { name, email, password } = req.body;
  if (users.find((user) => user.email === email)) {
    return res.status(400).json({ message: "Email already exists" });
  }
  users.push({ name, email, password });
  res.status(201).json({ message: "User registered successfully!" });
});

// Login route
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;
  const user = users.find((user) => user.email === email && user.password === password);
  if (!user) {
    return res.status(401).json({ message: "Invalid email or password" });
  }
  res.status(200).json({ message: "Login successful!" });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
