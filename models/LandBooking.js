const mongoose = require("mongoose");
const User = require("./User");

const landBookSchema = mongoose.Schema({
  location: {
    type: String,
    required: true,
  },
  area: {
    type: Number,
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  pricePerSquareMeter: {
    type: Number,
    required: true,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
    required: true,
  },
});

const LandBooking = mongoose.model("landBooking", landBookSchema);

module.exports = LandBooking;
