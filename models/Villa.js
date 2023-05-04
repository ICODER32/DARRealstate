const mongoose = require("mongoose");
const User = require("./User");

const villaSchema = mongoose.Schema({
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

const Villa = mongoose.model("villa", villaSchema);

module.exports = Villa;
