const express = require("express");
const connectDB = require("./config/db");
const dotenv = require("dotenv").config();
const port = process.env.PORT;
const { errorHandler } = require("./middleware/errorMiddleware");

const app = express();
connectDB();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api/goals", require("./routes/goalRoutes"));
app.use(errorHandler);

app.listen(port, () => console.log(`Server running on Port ${port}`));