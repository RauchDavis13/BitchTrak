const { Schema } = require("mongoose");

// This is a subdocument schema, it won't become its own model but we'll use it as the schema for the User's `savedDogs` array in User.js
const dogSchema = new Schema({
      // set custom id to avoid confusion with parent userId
  dogId: {
    type: Schema.Types.ObjectId,
    default: () => new Types.ObjectId()
  },
  dogName: {
      type: String,
      required: true,
  },  
  description: {
    type: String,    
  },
  image: {
    type: String,
  },
  age: {
    type: Number,
  },
  breed: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  lastPeriod: {
    type: Date,
  },
  pureBreed: {
    type: Boolean,
  },
});

module.exports = dogSchema;