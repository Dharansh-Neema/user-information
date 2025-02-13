const mongoose = require("mongoose");

const connectWithDB = () => {
  mongoose.set("strictQuery", false);
  mongoose
    .connect(process.env.MONGO_URL)
    .then(console.log("Connected to MongoDB users Database"))
    .catch((err) => {
      console.error(`DB connection issues ${err}`);
      process.exit(1);
    });
};

module.exports = connectWithDB;
