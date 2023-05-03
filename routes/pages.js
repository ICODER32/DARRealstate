const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  const user_id = req.cookies.user_id;
  const role = req.cookies.role;
  if (req.cookies.user_id) {
    return res.render("index", {
      user_id,
      role,
    });
  } else {
    return res.redirect("/login");
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

module.exports = router;
