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
  phtotos: {
    type: String,
  },
  age: {
    type: Number,
  },
  breeds: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  fixed: {
    type: Boolean,
  },
  shots: {
    type: Boolean,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, 'Must use a valid email address'],
  },
  phone: {
    type: String,
  },
  address: {
    type: String,
  },
  city: {
    type: String,
  },
  state: {
    type: String,
  },
  postcode: {
    type: String,
  }

});

module.exports = dogSchema;