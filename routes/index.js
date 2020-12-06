var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");

// setting the landing page route
router.get("/", function (req, res) {
  res.render("landing");
});

// =========================================================== AUTH ROUTES ======================================================================

// ============== REGISTER ROUTE ================
router.get("/register", function (req, res) {
  res.render("register");
});

// ================= HANDLING REGISTRATION =================
router.post("/register", function (req, res) {
  var newUser = new User({ username: req.body.username });
  User.register(newUser, req.body.password, function (err, user) {
    if (err) {
      console.log(err);
      req.flash("error", err.message);
      return res.redirect("back");
    }
    passport.authenticate("local")(req, res, function () {
      req.flash("success", "Welcome to YelpCamp! " + user.username);
      res.redirect("/campgrounds");
    });
  });
});

// ==================== LOGIN ROUTE =================================
router.get("/login", function (req, res) {
  res.render("login");
});

// ================== HANDLING USER LOG-IN =============================
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login",
  }),
  (req, res) => {}
);

// ================== LOG-OUT ROUTE ======================================
router.get("/logout", function (req, res) {
  req.logOut();
  req.flash("info", "You were Logged Out!");
  res.redirect("/");
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

module.exports = router;
