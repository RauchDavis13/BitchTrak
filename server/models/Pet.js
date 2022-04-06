const { Schema } = require("mongoose");
const petSchema = new Schema({
  // set custom id to avoid confusion with parent userId
  petId: {
    type: Schema.Types.ObjectId,
    default: () => new Types.ObjectId(),
  },
  petName: {
    type: String,
    required: true
  },
  petDescription: {
    type: String,
  },
  image: {
    type: String,
  },
  petBDay: {
    type: String,
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
  lastHeat: {
    type: String,
  },
});
// // when a user is queried, we'll also get another field called `petCount` with the number of saved pets the user has
// petSchema.virtual('petCount').get(function () {
//   return this.savedPets.length;
// });
// const Pet = model('Pet', petSchema);


module.exports = petSchema;
