const express = require("express");
const cors = require("cors");
require("dotenv").config();

const sequelize = require("./config/db");

const User = require("./models/User");
const Task = require("./models/Task");

const authRoutes = require("./routes/authRoutes");
const projectRoutes = require("./routes/projectRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);

app.get("/", (req, res) => {
  res.send("API Running");
});

sequelize.sync()
  .then(() => console.log("Database Synced"))
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});