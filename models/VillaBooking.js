const mongoose = require("mongoose");
const User = require("./User");

const villaBookingSchema = mongoose.Schema({
  villa_number: {
    type: Number,
    required: true,
  },
  villa_door_number: {
    type: String,
    required: true,
  },
  stories_number: {
    type: Number,
    required: true,
  },
  garage: {
    type: Boolean,
    required: true,
  },
  serventRoom: {
    type: Boolean,
    required: true,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
    required: true,
  },
});

const VillaBooking = mongoose.model("villaBooking", villaBookingSchema);

module.exports = VillaBooking;
