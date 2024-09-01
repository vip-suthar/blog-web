const mongoose = require("mongoose");
const dbConfig = require("../config/db.config");

const _UserModel = require("../models/user.model");
const _BlogModel = require("../models/blog.model");


let dbConn = null;

const connectDb = async () => {
  try {
    if (dbConn) return dbConn;

    dbConn = await mongoose.connect(dbConfig.MONGO_URI);
    console.log("Connected to MongoDB");
    return dbConn;
  } catch (err) {
    console.log("Error connecting to MongoDB:", err);
    return null;
  }
};

module.exports = connectDb;