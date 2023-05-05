const express = require("express");
const router = express.Router();
const Land = require("../models/Land");
const Apartment = require("../models/Apartment");
const Villa = require("../models/Villa");
const LandBooking = require("../models/LandBooking");
const ApartmentBooking = require("../models/ApartmentBooked");
const VillaBooking = require("../models/VillaBooking");

const auth = (req, res, next) => {
  if (req.cookies.user_id) {
    next();
  } else {
    return res.redirect("/login");
  }
};

router.get("/", async (req, res) => {
  const user_id = req.cookies.user_id;
  const role = req.cookies.role;

  try {
    const villas = await Villa.find({});
    const apartments = await Apartment.find({});
    const lands = await Land.find({});
    if (req.cookies.user_id) {
      return res.render("index", {
        myProperty: false,
        user_id,
        role,
        apartments,
        lands,
        villas,
      });
    } else {
      return res.redirect("/login");
    }
  } catch (error) {
    return res.render("error", {
      error: "Something went Wrong try Reloading",
    });
  }
});
router.get("/login", (req, res) => {
  const user_id = req.cookies.user_id;
  const role = req.cookies.role;
  res.render("login", {
    role,
    user_id,
  });
});
router.get("/signup", (req, res) => {
  const user_id = req.cookies.user_id;
  const role = req.cookies.role;
  res.render("signup", { role, user_id });
});

router.get("/addProperty", auth, (req, res) => {
  const user_id = req.cookies.user_id;
  const role = req.cookies.role;
  res.render("addProperty", {
    user_id,
    role,
  });
});
router.get("/land/:id", auth, async (req, res) => {
  const id = req.params.id;
  const user_id = req.cookies.user_id;
  const role = req.cookies.role;
  try {
    const data = await Land.findById(id);
    const ownProperty = user_id == data.user_id;
    res.status(400).render("bookLand", {
      data,
      user_id,
      ownProperty,
      role,
    });
  } catch (error) {
    res.status(400).redirect("error", {
      error: "Something went Wrong",
    });
  }
});
router.get("/apartment/:id", auth, async (req, res) => {
  const id = req.params.id;
  const user_id = req.cookies.user_id;
  const role = req.cookies.role;
  try {
    const data = await Apartment.findById(id);
    const ownProperty = user_id == data.user_id;
    res.status(400).render("bookApartment", {
      data,
      user_id,
      ownProperty,
      role,
    });
  } catch (error) {
    res.status(400).render("error", {
      error: "Somthing went wrong try later",
    });
  }
});

router.get("/villa/:id", auth, async (req, res) => {
  const id = req.params.id;
  const user_id = req.cookies.user_id;
  const role = req.cookies.role;
  try {
    const data = await Villa.findById(id);
    const ownProperty = user_id == data.user_id;

    res.status(400).render("bookVilla", {
      data,
      user_id,
      ownProperty,
      role,
    });
  } catch (error) {
    res.status(400).redirect("error", {
      error: "Somthing went wrong try later",
    });
  }
});

router.get("/myProperties", auth, async (req, res) => {
  const user_id = req.cookies.user_id;
  const role = req.cookies.role;

  try {
    const villas = await Villa.find({ user_id });
    const apartments = await Apartment.find({ user_id });
    const lands = await Land.find({ user_id });
    if (req.cookies.user_id) {
      return res.render("index", {
        myProperty: true,
        user_id,
        role,
        apartments,
        lands,
        villas,
      });
    } else {
      return res.redirect("/login");
    }
  } catch (error) {
    return res.render("error", {
      error: "Something went Wrong try Reloading",
    });
  }
});

router.get("/myBookings", auth, async (req, res) => {
  const user_id = req.cookies.user_id;
  const role = req.cookies.role;
  try {
    const myLands = await LandBooking.find({ user_id });
    const myVillas = await VillaBooking.find({ user_id });
    const myApartments = await ApartmentBooking.find({ user_id });

    res.render("myBookings", {
      user_id,
      role,
      myLands,
      myVillas,
      myApartments,
    });
  } catch (error) {
    res.render("error", {
      error: "Something Went Wrong",
    });
  }
});

module.exports = router;
