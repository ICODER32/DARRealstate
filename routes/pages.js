const express = require("express");
const router = express.Router();
const Land = require("../models/Land");
const Apartment = require("../models/Apartment");
const Villa = require("../models/Villa");

router.get("/", async (req, res) => {
  const user_id = req.cookies.user_id;
  const role = req.cookies.role;

  try {
    const villas = await Villa.find({});
    const apartments = await Apartment.find({});
    const lands = await Land.find({});
    if (req.cookies.user_id) {
      return res.render("index", {
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

router.get("/addProperty", (req, res) => {
  const user_id = req.cookies.user_id;
  const role = req.cookies.role;
  res.render("addProperty", {
    user_id,
    role,
  });
});
router.get("/land/:id", (req, res) => {
  console.log("land");
});
router.get("/apartment/:id", (req, res) => {
  console.log("APARTMENT");
});

router.get("/villa/:id", (req, res) => {
  console.log("VILLA");
});

module.exports = router;
