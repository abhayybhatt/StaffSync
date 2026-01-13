const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("../models/userModel");

dotenv.config();

const seedAdmin = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(
      process.env.MONGO_URI.replace(
        "<DB_PASSWORD>",
        process.env.DATABASE_PASSWORD
      )
    );
    console.log("Connected to MongoDB");

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: "admin@staffsync.com" });
    if (existingAdmin) {
      console.log("Admin user already exists");
      await mongoose.connection.close();
      return;
    }

    // Create admin user
    const admin = new User({
      email: "admin@staffsync.com",
      password: "admin123", // Change this in production!
      role: "admin",
    });

    await admin.save();
    console.log("Admin user created successfully!");
    console.log("Email: admin@staffsync.com");
    console.log("Password: admin123");
    console.log("⚠️  Please change the password after first login!");

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error("Error seeding admin:", error);
    await mongoose.connection.close();
    process.exit(1);
  }
};

seedAdmin();
