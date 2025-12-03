const express = require("express");
const connectDB = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors"); // ✅ import cors

// Routers
const authRouter = require("./routes/authRouter");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter = require("./routes/userRouter");

const app = express();

// ✅ CORS middleware (allow frontend to communicate)
app.use(cors({
  origin: "http://localhost:8082", // frontend URL
  credentials: true                // allow cookies/JWT
}));

// Middleware
app.use(express.json());
app.use(cookieParser());

// ✅ Root route for browser testing
app.get("/", (req, res) => {
  res.send("DevTinder Backend is running!");
});

// Mount routers with proper base paths
app.use("/auth", authRouter);       // full route example: POST /auth/register
app.use("/profile", profileRouter); // full route example: GET /profile
app.use("/request", requestRouter); // full route example: POST /request
app.use("/user", userRouter);       // full route example: GET /user

// Connect to MongoDB and start server
connectDB()
  .then(() => {
    console.log("Database connection established...");
    app.listen(process.env.PORT || 4500, () => {
      console.log(`Server is successfully listening on port ${process.env.PORT || 4500}...`);
    });
  })
  .catch((err) => {
    console.error("Database cannot be connected", err);
  });

