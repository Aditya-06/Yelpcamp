var Campground = require("../models/campground");
var Comment = require("../models/comment");

var middlewareObj = {};

middlewareObj.checkCampgroundOwnership = function(req, res, next) {
    
        if (req.isAuthenticated()) {
            Campground.findById(req.params.id, function(err, foundCampground) {
                if (err || !foundCampground) {
                    req.flash("error", "Campground Not Found!");
                    res.redirect("back");
                } else {
                    // does the user own the campground
                    if (foundCampground.author.id.equals(req.user._id) || req.user.isAdmin) {
                        req.campground = foundCampground;    
                        next();
                    } else {
                        req.flash("error", "You Don\'t Have Permission to do That!")
                        res.redirect("back");
                    }              
                }
            });
    
        } else {
            res.flash("error", "You Need to be Logged-in to do That!");
            res.redirect("back");
        }
    
}

middlewareObj.checkCommentOwnership = function(req, res, next) {
    if (req.isAuthenticated()) {
        Comment.findById(req.params.comment_id, function(err, foundComment) {
            if (err || !foundComment) {
                console.log(err);
                req.flash("error", "Comment Not Found!");
                res.redirect("back");
            } else {
                // does the user own the comment
                if (foundComment.author.id.equals(req.user._id) || req.user.isAdmin) {
                   next();
                } else {
                    req.flash("error", "You do Not Have Permission to do That!")
                    return res.redirect("/campgrounds");
                }              
            }
        });

    } else {
        res.flash("error", "You Need to be Logged-in to do That!");
        res.redirect("back");
    }
}

middlewareObj.isLoggedIn = function(req, res, next) {
    
        if (req.isAuthenticated()) {
            return next();
        }
        req.flash("error", "Please Log-in First!");
        res.redirect("/login");
};


module.exports = middlewareObj;