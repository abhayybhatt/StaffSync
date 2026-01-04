const express = require("express");
const cors = require("cors");
const app = express();
const userRouter = require("./routes/userRoutes");

const corsOptions = {
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  };

// Middleware and route configurations would go here

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Routes
app.use("/api/v1/users", userRouter);
module.exports = app;
