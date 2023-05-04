const express = require("express");
const router = express.Router();
const Land = require("../models/Land");
const User = require("../models/User");
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

  if (propertytype === "land") {
    const { location, area, totalPrice, pricePerSquareMeter } = req.body;
    console.log(location, area, totalPrice, pricePerSquareMeter);
  } else if (propertytype === "apartment") {
    console.log("Apartment");
  } else if (propertytype === "villa") {
    const {
      villa_number,
      villa_door_number,
      stories_number,
      garage,
      serventRoom,
    } = req.body;
    console.log(
      villa_number,
      villa_door_number,
      stories_number,
      garage,
      serventRoom
    );
  }

  // const { user_id, location, area, totalPrice, pricePerSquareMeter } = req.body;
  // try {
  //   const { fullName, email, address } = await User.findById(user_id);
  //   let land = new Land({
  //     location,
  //     area,
  //     user_id,
  //     totalPrice,
  //     pricePerSquareMeter,
  //     owner_details: {
  //       name: fullName,
  //       email,
  //       address,
  //     },
  //   });
  //   land = await land.save();
  //   res.status(201).json(land);
  // } catch (error) {
  //   console.log(error);
  //   res.status(400).json({ error });
  // }
});

module.exports = router;
