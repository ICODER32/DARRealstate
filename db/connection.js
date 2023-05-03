const mongoose = require("mongoose");

const connectDb = () => {
  mongoose
    .connect(
      "mongodb+srv://m001-student:Ibtisam@sandbox.xuwkkn8.mongodb.net/DAR-REALSTATE?retryWrites=true&w=majority"
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
