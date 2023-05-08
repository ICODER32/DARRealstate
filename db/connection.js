const mongoose = require("mongoose");

const connectDb = () => {
  mongoose
    .connect(
      "mongodb+srv://anouds40:12341234@cluster0.kwkpmb1.mongodb.net/?retryWrites=true&w=majority"
    )
    .then(() => {
      console.log("Database Connected");
    })
    .catch((err) => {
      console.log(err);
      process.exit(1);
    });
};
module.exports = connectDb;
