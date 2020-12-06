const mongoose = require("mongoose");

//Schema set-up
var campgroundSchema = new mongoose.Schema({
  name: String,
  price: String,
  image: String,
  description: String,
  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    username: String,
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
});

module.exports = mongoose.model("Campground", campgroundSchema);

/* list of campgrounds

//campgound object array
var campgrounds = [
    {name: "Karnala", image: "https://media.cntraveller.in/wp-content/uploads/2017/08/letscampout-1366x768.jpg"},
    {name: "Vasind", image: "https://static-blog.treebo.com/wp-content/uploads/2018/02/Vasind-.jpg"},
    {name: "Shirota Lake", image: "https://static-blog.treebo.com/wp-content/uploads/2018/02/shirota_lake-1.jpg"},
    {name: "Bhatsa Dam", image: "https://static-blog.treebo.com/wp-content/uploads/2018/02/Bhatsa-Dam.jpg"},
    {name: "Shirgaon Beach", image: "https://static-blog.treebo.com/wp-content/uploads/2018/02/shirgaon-1.jpg"},
    {name: "Karnala", image: "https://media.cntraveller.in/wp-content/uploads/2017/08/letscampout-1366x768.jpg"},
    {name: "Vasind", image: "https://static-blog.treebo.com/wp-content/uploads/2018/02/Vasind-.jpg"},
    {name: "Shirota Lake", image: "https://static-blog.treebo.com/wp-content/uploads/2018/02/shirota_lake-1.jpg"},
    {name: "Bhatsa Dam", image: "https://static-blog.treebo.com/wp-content/uploads/2018/02/Bhatsa-Dam.jpg"}
];
*/

/*
Campgound.create(
    {
        name: "Vasind", 
        image: "https://static-blog.treebo.com/wp-content/uploads/2018/02/Vasind-.jpg",
        description: "Large open spaces, much green."
    }, function(err, campground) {
            if(err) {
                console.log(err);
            } else {
                console.log("Newly created campground");
                console.log(campground);
        }
    }
);
*/
