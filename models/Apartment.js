const mongoose = require("mongoose");
const User = require("./User");

const apartmentSchema = mongoose.Schema({
  apartment_number: {
    type: Number,
    required: true,
  },
  apartment_type: {
    type: String,
    required: true,
  },
  bed_rooms: {
    type: Number,
    required: true,
  },
  apartment_level: {
    type: Number,
    required: true,
  },
  apartment_building: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
    required: true,
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

const Apartment = mongoose.model("apartment", apartmentSchema);

module.exports = Apartment;
