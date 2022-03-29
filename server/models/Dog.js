const { Schema } = require("mongoose");

// This is a subdocument schema, it won't become its own model but we'll use it as the schema for the User's `savedDogs` array in User.js
const dogSchema = new Schema({
  authors: [
    {
      type: String,
    },
  ],
  description: {
    type: String,
    required: true,
  },
  // saved dog id from GoogleDogs
  dogId: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  link: {
    type: String,
  },
  title: {
    type: String,
    required: true,
  },
  //TODO: add the pageCount property. It should be a Number.
  pageCount: {
    type: Number,
  },
  //TODO: add the publishedDate property. It should be a String.
  publishedDate: {
    type: String,
  },
});

module.exports = dogSchema;