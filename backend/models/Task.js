const { DataTypes } = require("sequelize");

const sequelize = require("../config/db");

const Task = sequelize.define("Task", {

  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  description: {
    type: DataTypes.TEXT,
  },

  status: {
    type: DataTypes.ENUM(
      "Pending",
      "In Progress",
      "Completed"
    ),
    defaultValue: "Pending",
  },

  assignedTo: {
    type: DataTypes.INTEGER,
  },

  projectId: {
    type: DataTypes.INTEGER,
  },

  deadline: {
    type: DataTypes.DATE,
  },


});

module.exports = Task;