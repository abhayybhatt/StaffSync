const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = require("./app");

dotenv.config();

//MongoDB Connection
mongoose
  .connect(
    process.env.MONGO_URI.replace(
      "<DB_PASSWORD>",
      process.env.DATABASE_PASSWORD
    )
  )
  .then(() => console.log("MongoDB connected successfully"))
  .catch((error) => console.log("MongoDB connection failed: ", error));

const port = process.env.PORT || 5001;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
