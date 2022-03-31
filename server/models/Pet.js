const { Schema, model } = require('mongoose');

const petSchema = new Schema(
  {
    petId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId()
    },
    petName: {
      type: String,
      required: true,
      unique: true,
    },
    petDescription: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    petBDay: {
      type: Date,
    },
    breed: {
      type: String,
    },
    pureBreed: {
      type: Boolean,
    },
    female: {
      type: Boolean,
    },
    lastPeriod: {
      type: Date,
    },


    // set savedPetss to be an array of data that adheres to the petSchema
    savedDogs: [dogSchema],
  },
  // set this to use virtual below
  {
    toJSON: {
      virtuals: true,
    },
  }
);



// when we query a user, we'll also get another field called `dogCount` with the number of saved dogs we have
petSchema.virtual('petCount').get(function () {
  return this.savedDogs.length;
});

const Pet = model('Pet', petSchema);

module.exports = Pet;
