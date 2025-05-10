const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const fileUpload = require("express-fileupload");

dotenv.config();
const app = express();

// Middleware
// app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(fileUpload());
app.use(
  cors({
    origin: ['http://localhost:5173', 'http://localhost:3000'], // Allow multiple origins
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
  })
);
// app.use(
//   rateLimit({
//     windowMs: 15 * 60 * 1000, // 15 minutes
//     max: 100, // Limit each IP to 100 requests per windowMs
//   })
// );

// Routes
app.use("/api/auth", require("./src/routes/auth"));
app.use("/api/students", require("./src/routes/students"));
app.use("/api/jobs", require("./src/routes/jobs"));
app.use("/api/analytics", require("./src/routes/analytics"));

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});