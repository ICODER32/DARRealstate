const mongoose = require("mongoose");
const User = require("./User");

const landSchema = mongoose.Schema({
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
  image: {
    type: String,
  },
  owner_details: {
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
  },
});

const Land = mongoose.model("Land", landSchema);

module.exports = Land;
