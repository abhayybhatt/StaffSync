const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("../models/userModel");

dotenv.config();

const changeAdminPassword = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(
      process.env.MONGO_URI.replace(
        "<DB_PASSWORD>",
        process.env.DATABASE_PASSWORD
      )
    );
    console.log("Connected to MongoDB");

    // Get new password from command line arguments
    const newPassword = process.argv[2];

    if (!newPassword) {
      console.error("❌ Error: Please provide a new password");
      console.log("Usage: node scripts/changeAdminPassword.js <new-password>");
      await mongoose.connection.close();
      process.exit(1);
    }

    if (newPassword.length < 6) {
      console.error("❌ Error: Password must be at least 6 characters long");
      await mongoose.connection.close();
      process.exit(1);
    }

    // Find admin user
    const admin = await User.findOne({ email: "admin@staffsync.com" });
    
    if (!admin) {
      console.error("❌ Error: Admin user not found");
      console.log("Please run 'npm run seed:admin' first to create the admin user");
      await mongoose.connection.close();
      process.exit(1);
    }

    // Update password (will be hashed automatically by the pre-save hook)
    admin.password = newPassword;
    await admin.save();

    console.log("✅ Admin password changed successfully!");
    console.log("Email: admin@staffsync.com");
    console.log("New password has been set (password is hashed in database)");

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error("❌ Error changing admin password:", error.message);
    await mongoose.connection.close();
    process.exit(1);
  }
};

changeAdminPassword();
