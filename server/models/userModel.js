const mongoose = require("mongoose");

// Schema
const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    password: { type: String, required: true },
    firstName: { type: String, default: "" },
    lastName: { type: String, default: "" },
    email: { type: String, default: "" },
    mobileNumber: { type: String, default: "" },
    portfolio: { type: String, default: "" },
    linkedIn: { type: String, default: "" },
    github: { type: String, default: "" },
    education: { type: Array, default: [] },
    skills: { type: Array, default: [] },
    experience: { type: Array, default: [] },
    projects: { type: Array, default: [] },
    achievements: { type: Array, default: [] },
    address: { type: String, default: "" },
  },
  {
    // Mongoose adds two properties of type Date to the schema:
    // createdAt: a date representing when this document was created
    // updatedAt: a date representing when this document was last updated
    timestamps: true,
  }
);

// Model
const userModel = mongoose.model("users", userSchema);

module.exports = userModel;