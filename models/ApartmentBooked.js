const mongoose = require("mongoose");
const User = require("./User");

const apartmentBookingSchema = mongoose.Schema({
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

  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
    required: true,
  },
});

const ApartmentBook = mongoose.model(
  "apartmentbooking",
  apartmentBookingSchema
);

module.exports = ApartmentBook;
