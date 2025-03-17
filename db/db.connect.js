const mongoose = require("mongoose");
require("dotenv").config();

const mongoUri = process.env.MONGODB;

async function initializeDatabase() {
  await mongoose
    .connect(mongoUri)
    .then(() => {
      console.log("Database Connected Successfully.");
    })
    .catch((error) => {
      console.log(error);
    });
}

module.exports = { initializeDatabase };
