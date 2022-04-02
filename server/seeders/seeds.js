const Dog = require("../models/Dog");
const mongoose = require("mongoose");
const dev = require("../config/dev"); 

//get your mongoose string
//create your array. i inserted only 1 object here

const Dog = [
    new doggy({
        dogName: "Tokyo",
        description: "Tokyo is an amazing dog. Loves walks on the beach. Single and ready to mingle",
        image: "",
        age: "5",
        breed: "Pitbull",
        gender: "female",
        postcode: "07021"
    }, 
    {
        dogName: "Bella",
        description: "",
        image: "",
        age: "6",
        breed: "Labrador Retriever",
        gender: "female",
        postcode: "10003"
    },{
        dogName: "Luna",
        description: "Furry",
        image: "",
        age: "4",
        breed: "French Bulldog",
        gender: "female",
        postcode: "07012"
    },{
        dogName: "Lucy",
        description: "Furry",
        image: "",
        age: "7",
        breed: "Golden Retriever",
        gender: "female",
        postcode: "07013"
    },{
        dogName: "Daisy",
        description: "Furry",
        image: "",
        age: "5",
        breed: "German Shepherd Dog",
        gender: "female",
        postcode: "90210"
    },{
        dogName: "Zoe",
        description: "Furry",
        image: "",
        age: "3",
        breed: "Poodle",
        gender: "female",
        postcode: "08976"
    },{
        dogName: "Max",
        description: "Furry",
        image: "",
        age: "4",
        breed: "Bulldog",
        gender: "female",
        postcode: "05473"
    },{
        dogName: "Charlie",
        description: "Furry",
        image: "",
        age: "4",
        breed: "Beagles",
        gender: "female",
        postcode: "09876"
    },{
        dogName: "Milo",
        description: "Furry",
        image: "",
        age: "8",
        breed: "Rottweilers",
        gender: "female",
        postcode: "12345"
    },{
        dogName: "Buddy",
        description: "Furry",
        image: "",
        age: "7",
        breed: "Dachshunds",
        gender: "female",
        postcode: "86759"
    },{
        dogName: "Rocky",
        description: "Furry",
        image: "",
        age: "6",
        breed: "Pembroke Welsh Corgis",
        gender: "female",
        postcode: "87465"
    }),
    

]


//connect mongoose
mongoose
    .connect(String(dev.db), { useNewUrlParser: true })
    .catch(err => {
        console.log(err.stack);
        process.exit(1);
    })
    .then(() => {
        console.log("connected to db in development environment");
    });

//save your data. this is an async operation

//after you make sure you seeded all the products, disconnect automatically

products.map(async (p, index) => {
    await p.save((err, result) => {
        if (index === products.length - 1) {
            console.log("DONE!");
            mongoose.disconnect();
        }
    });
});