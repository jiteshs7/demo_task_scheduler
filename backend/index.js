const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const { errorHandler, notFound } = require("./src/middleware/ErrorHandler");

const connectDb = require("./src/utility/Database");

const UserRoutes = require("./src/routes/UserRoutes");
const TaskRoutes = require("./src/routes/TaskRoutes");

const app = express();

// Body parser
app.use(express.json());

// Env
dotenv.config({ path: ".env" });

// Setting header
app.use(cors());
app.options("*", cors());

// Connect to DB
connectDb();

// Routes
app.use("/auth", UserRoutes);
app.use("/task", TaskRoutes);
// Error handler
app.use("*", notFound);
app.use(errorHandler);

// Set PORT
const DEFAULT_PORT = process.env.DEFAULT_PORT || 8080;

// Start server
const server = app.listen(DEFAULT_PORT, () => {
  console.log(`Server start @${DEFAULT_PORT}`);
});

//Handle unhandled rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Unhandled Error: ${err}`);
  // close server and exit process
  server.close(() => process.exit(1));
});
