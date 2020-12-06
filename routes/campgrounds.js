var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var Comment = require("../models/comment");
const { route } = require("./comments");
var middleware = require("../middleware/index");


// ======== INDEX ROUTE ======                                         setting camp grounds route
router.get("/", function(req, res) {
    
    // getting all the campgrounds from the database
    Campground.find({}, function(err, allCampgrounds) {
        if(err) {
            console.log(err);
        } else {
            res.render("campgrounds/index", {campgrounds: allCampgrounds, currentUser: req.user});
        }
    });
    
    //res.render("campgrounds", {campgrounds: campgrounds});
});

// ======= CREATE ROUTE =======                                        setting up a post route
router.post("/",middleware.isLoggedIn, function(req, res) {
    // get data from form and add to campgrounds array
    var name = req.body.name;
    var price = req.body.price;
    var image = req.body.image;
    var description =  req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var newCampGround = {name: name,price: price, image: image, description: description, author: author};
    
    //create a new campground in the database
    Campground.create(newCampGround, function(err, newlyCreated) {
        if (err) {
            console.log(err);
        } else {
            // redirect back to campgrouunds page (route)
            res.redirect("/campgrounds");
        }
    })
});

// ======== NEW ROUTE ==========                                       new campgrounds page route - form page
router.get("/new",middleware.isLoggedIn, function(req, res) {
    res.render("campgrounds/new");
});

// ======== SHOW ROUTE ===========                                     find campground with given id anad display complete information
router.get("/:id", function(req, res) {
    
    // finding the camp ground withe the provided ID
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground) {
        if (err || !foundCampground) {
            req.flash("error", "Campground Not Found!");
            console.log(err);
        } else {
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});

// ======================== EDIT ROUTE ===========================
router.get("/:id/edit",middleware.checkCampgroundOwnership, function(req, res) {
    // is user loged in 
    
    Campground.findById(req.params.id, function(err, foundCampground) {
            
        res.render("campgrounds/edit", {campground: foundCampground});
    });        
            
        
});

//========================== UPDATE ROUTE =========================
router.put("/:id",middleware.checkCampgroundOwnership, function(req, res) {
    // find and update selected campground
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground) {
        if (err) {
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            req.flash("sucess", "Successfully Updated Campground!");
            res.redirect(`/campgrounds/${req.params.id}`);
        }
    });
    // redirect
});

// =============================== DELETE ROUTE ==================================
router.delete("/:id",middleware.checkCampgroundOwnership, function(req, res) {
    Campground.findByIdAndRemove(req.params.id, function(err) {
        if (err) {
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            req.flash("success", "Successfully Deleted Campground!");
            res.redirect("/campgrounds");
        }
    });
});

module.exports = router;