// setting up express
var express = require("express"),
  app = express(),
  mongoose = require("mongoose"),
  passport = require("passport"),
  LocalStrategy = require("passport-local"),
  User = require("./models/user"),
  bodyParser = require("body-parser"),
  methodOverride = require("method-override"),
  flash = require("connect-flash");

// importing all the routes
var campgroundRoutes = require("./routes/campgrounds");
commentRoutes = require("./routes/comments");
indexRoutes = require("./routes/index");

// connecting to mongoose
mongoose
  .connect("mongodb://localhost:27017/yelp_camp", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to DB!"))
  .catch((error) => console.log(error));

// setting up body-parser
app.use(bodyParser.urlencoded({ extended: true }));

//setting default type of files to be ejs
app.set("view engine", "ejs");

app.use(express.static(__dirname + "/public"));

app.use(methodOverride("_method"));

app.use(flash());

// importing the campgrounds
var Campground = require("./models/campground.js");
var Comment = require("./models/comment.js");

var seedDB = require("./seeds");
const comment = require("./models/comment.js");

// seed the database: seedDB();

//setting up passport config
app.use(
  require("express-session")({
    secret: "This is a secret",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function (req, res, next) {
  res.locals.currentUser = req.user;
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  res.locals.info = req.flash("info");
  next();
});

//using all imported routes
app.use(indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

// specifying port to run on (3000)
var port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("The YelpCamp server is running on port 3000");
});
