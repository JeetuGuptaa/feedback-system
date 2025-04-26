const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const databaseConnectionUser = process.env.DATABASE_CONNECTION_USER;
const databaseConnectionPassword = process.env.DATABASE_CONNECTION_PASSWORD;

const URL = `mongodb+srv://${databaseConnectionUser}:${databaseConnectionPassword}@cluster0.ihzeg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const databaseConnection = async () => {
  try {
    await mongoose.connect(URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("🗄️  Database connected successfully!");
  } catch (error) {
    console.log("Error connecting MongoDB", error);
  }
};

module.exports = databaseConnection;