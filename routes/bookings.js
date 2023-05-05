const LandBooking = require("../models/LandBooking");
const ApartmentBooking = require("../models/ApartmentBooked");
// const VillaBooking = require("../models/VillaBooking");
const express = require("express");
const VillaBooking = require("../models/VillaBooking");
const router = express.Router();

router.post("/land", async (req, res) => {
  const user_id = req.cookies.user_id;
  const { location, area, totalPrice, pricePerSquareMeter } = req.body;
  try {
    let newBooking = new LandBooking({
      location,
      area,
      totalPrice,
      pricePerSquareMeter,
      user_id,
    });
    await newBooking.save();
    res.status(201).redirect("/");
  } catch (error) {
    console.log(error);
    res.status(400).render("error", {
      error: "Something went wrong",
    });
  }
});

router.post("/apartment", async (req, res) => {
  const user_id = req.cookies.user_id;
  console.log(req.body);
  const {
    apartment_number,
    apartment_type,
    apartment_level,
    apartment_building,
    bed_rooms,
  } = req.body;
  try {
    let newBooking = new ApartmentBooking({
      apartment_number,
      apartment_type,
      apartment_level,
      apartment_building,
      bed_rooms,
      user_id,
    });
    await newBooking.save();
    res.status(201).redirect("/");
  } catch (error) {
    console.log(error);
    res.status(400).render("error", {
      error: "Something went wrong",
    });
  }
});

router.post("/villa", async (req, res) => {
  const user_id = req.cookies.user_id;

  const {
    villa_number,
    villa_door_number,
    stories_number,
    garage,
    serventRoom,
  } = req.body;
  try {
    let newBooking = new VillaBooking({
      villa_number,
      villa_door_number,
      stories_number,
      garage,
      serventRoom,
      user_id,
    });
    await newBooking.save();
    res.status(201).redirect("/");
  } catch (error) {
    console.log(error);
    res.status(400).render("error", {
      error: "Something went wrong",
    });
  }
});
module.exports = router;
