const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");

router.post("/", async (req, res) => {
  const {
    fullName,
    email,
    address,
    role: userrole,
    phone,
    password,
  } = req.body;
  try {
    const user = new User({
      fullName,
      email,
      address,
      role: userrole,
      phone,
      password,
    });
    const { role, _id } = await user.save();
    res.cookie("role", role).cookie("user_id", _id).status(201).redirect("/");
  } catch (error) {
    return res.status(500).render("error", {
      error: "Please Enter Valid Details",
    });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).render("error", {
        error: "User Not Found",
      });
    } else {
      const validUser = bcrypt.compareSync(password, user.password);
      if (validUser) {
        return res
          .cookie("user_id", user._id)
          .cookie("role", user.role)
          .redirect("/");
      } else {
        return res.status(400).render("error", {
          error: "Invalid Credentials",
        });
      }
    }
  } catch (error) {
    return res.status(500).render("error", {
      error: "Something Went Wrong",
    });
  }
});

router.get("/logout", (req, res) => {
  return res.clearCookie("user_id").clearCookie("role").redirect("/login");
});

module.exports = router;
