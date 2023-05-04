const express = require("express");
const router = express.Router();
const Land = require("../models/Land");
const User = require("../models/User");
const Apartment = require("../models/Apartment");
const Villa = require("../models/Villa");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const fileExtension = file.originalname.split(".").pop(); // Get the file extension
    cb(null, file.fieldname + "-" + uniqueSuffix + "." + fileExtension);
  },
});

const upload = multer({ storage: storage });

router.post("/", upload.single("image"), async (req, res) => {
  const user_id = req.cookies.user_id;
  const role = req.cookies.role;
  const { propertytype } = req.body;
  const image = req.file.filename;
  try {
    const { fullName, email, address } = await User.findById(user_id);
    if (propertytype === "land") {
      const { location, area, totalPrice, pricePerSquareMeter } = req.body;
      let land = new Land({
        user_id,
        location,
        area,
        totalPrice,
        pricePerSquareMeter,
        image,
        owner_details: {
          name: fullName,
          email,
          address,
        },
      });
      land = await land.save();
      return res.status(201).redirect("/");
    } else if (propertytype === "apartment") {
      const {
        apartment_number,
        apartment_type,
        apartment_building,
        bed_rooms,
        apartment_level,
      } = req.body;
      let apartment = new Apartment({
        user_id,
        apartment_number,
        apartment_type,
        apartment_building,
        bed_rooms,
        apartment_level,
        image,
        owner_details: {
          name: fullName,
          email,
          address,
        },
      });
      apartment = await apartment.save();
      return res.status(201).redirect("/");
    } else if (propertytype === "villa") {
      const {
        villa_number,
        villa_door_number,
        stories_number,
        garage,
        serventRoom,
      } = req.body;
      let villa = new Villa({
        user_id,
        villa_number,
        villa_door_number,
        stories_number,
        garage: garage === "on" ? true : false,
        serventRoom: serventRoom === "on" ? true : false,
        image,
        owner_details: {
          name: fullName,
          email,
          address,
        },
      });
      villa = await villa.save();
      return res.status(201).redirect("/");
    }
  } catch (error) {
    res.status(400).render("error", {
      error: "Something Went Wrong!",
    });
  }
});

module.exports = router;
