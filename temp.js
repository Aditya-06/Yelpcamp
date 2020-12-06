const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/cat_app", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("Connected to DB!"))
.catch(error => console.log(error.message));

var catSchema = new mongoose.Schema ( {
    name: String,
    age: Number,
    breed: String,
    temperament: String
});

var Cat = mongoose.model("Cat", catSchema);

/*
// creating a new cat-- Henrietta is just name of the variable here, the value that matters is the one given to the "name: "
var Henrietta = new Cat ({
    name: "skittels",
    age: 29,
    breed: "inside-out",
    temperament: "Unknown"
});

// addding henrietta to the database
Henrietta.save(function(err, cat) {
    if(err) {
        console.log("Something went wrong");
    } else {
        console.log(cat);
    }
});
*/

//another way to create a new cat
Cat.create({
    name: "snowballssss",
    age: 15,
    temperament: "Satan's spawn"
}, function(err, cat) {
    if (err) {
        console.log("Error!!!");
    } else {
        console.log(cat);
    }
});

/*
Cat.find({}, function(err, cats) {
    if (err) {
        console.log("Error :((");
        console.log(err);
    } else {
        console.log("Here are all the cats");
        console.log(cats);
    }
})
*/