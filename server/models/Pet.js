const { Schema, model } = require('mongoose');

const petSchema = new Schema(
  {
     // set custom id to avoid confusion with parent userId
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
    savedPets: [petSchema],
  },
  // set this to use virtual below
  {
    toJSON: {
      virtuals: true,
    },
  }
);



// when a user is queried, we'll also get another field called `petCount` with the number of saved pets the user has
petSchema.virtual('petCount').get(function () {
  return this.savedPets.length;
});

const Pet = model('Pet', petSchema);

module.exports = Pet;
