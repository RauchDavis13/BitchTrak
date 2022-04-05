const { AuthenticationError } = require("apollo-server-express");
const { User } = require("../models");
const { signToken } = require("../auth");
const petSearch = require("../queries/petfinder");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id }).select(
          "-__v -password"
        );

        return userData;
      }

      throw new AuthenticationError("Not logged in");
    },
    petSearch: async (parent,{petSearchInput}, context) => {
      console.log({petSearchInput})
      const pets = await petSearch({name:petSearchInput.name, zipcode:petSearchInput.zipcode});
      console.log({ pets },pets[0].contact);
      const result = pets.map((pet) => {
        return {
          dogId: pet.id,
          dogName: 	pet.name,
          description: 	pet.description,
          photos: 	pet.primary_photo_cropped.medium,
          age: 	pet.age,
          breeds:	pet.breeds.primary,
          gender:	pet.gender,
          shots:	pet.attributes.shot_current,
          contact:	pet.contact,
      

        };
      });
      console.log(result);
      return [];
    },
  },

  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);
      return { token, user };
    },

    savePet: async (parent, { petData }, context) => {
      if (context.user) {
        const updatedUser = await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { savedPets: petData } },
          { new: true }
        );

        return updatedUser;
      }

      throw new AuthenticationError("You need to be logged in!");
    },
    removePet: async (parent, { petId }, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedPets: { petId } } },
          { new: true }
        );

        return updatedUser;
      }

      throw new AuthenticationError("You need to be logged in!");
    },

    savedDog: async (parent, { dogData }, context) => {
      if (context.user) {
        const updatedUser = await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { savedDogs: dogData } },
          { new: true }
        );

        return updatedUser;
      }

      throw new AuthenticationError("You need to be logged in!");
    },
    removeDog: async (parent, { dogId }, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedDogs: { dogId } } },
          { new: true }
        );

        return updatedUser;
      }

      throw new AuthenticationError("You need to be logged in!");
    },
  },
};

module.exports = resolvers;
