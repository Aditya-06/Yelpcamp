var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
    {
        name: "Karnala", 
        image: "https://q-xx.bstatic.com/xdata/images/hotel/840x460/178852959.jpg?k=e968b270d8259ebbdedad907a5fedb57134ce3a111e276f9dcfa8aaf3dc987c5&o=",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc consequat purus a mattis dapibus. Nam et mauris velit. Nunc rhoncus sollicitudin nulla vitae cursus. Etiam interdum luctus semper. Vestibulum at dictum lorem. Phasellus dignissim nibh a massa laoreet, id vulputate nisi volutpat. Vivamus hendrerit in mi quis auctor. Curabitur sit amet erat nunc. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nulla condimentum dignissim lorem, nec cursus nunc aliquam nec. Phasellus a gravida ipsum. Curabitur semper elit ipsum, bibendum feugiat erat pellentesque sit amet. Nulla lobortis nisi sed sem vestibulum, vel lacinia mi bibendum. Quisque eu quam vel orci porttitor imperdiet vel nec nulla. Cras ornare nibh ac orci faucibus placerat."
    },
    {
        name: "Shirota Lake", 
        image: "https://static-blog.treebo.com/wp-content/uploads/2018/02/shirota_lake-1.jpg",
        description: "OOOOOO"
    }
]

function seedDB() {

    // Removing all campgrounds
    Campground.remove({}, function(err) {
        if (err) {
            console.log(err);
        } else {
            console.log("removed campground");
            
                data.forEach(function(seed) {
                    Campground.create(seed, function(err, campground) {
                        if(err) {
                            console.log(err); 
                        } else {
                            console.log("Added a campground");
                            Comment.create(
                                {
                                    text: "Nice :)",
                                    author: "Me"
                                }, function(err, comment) {
                                    if (err) {
                                        console.log(err);
                                    } else {
                                        campground.comments.push(comment);
                                        campground.save();
                                        console.log("Created new comment");
                                    }
                                });
                                
                        }
                    })
            
                });
            
        }
    });
}

module.exports = seedDB;