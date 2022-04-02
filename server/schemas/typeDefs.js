const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String
    dogCount: Int
    savedDogs: [Dog]
  }
  type Pet {
    petId: ID!
    petName: String!
    petDescription: String
    image: String
    petBDay: String
    breed: String
    pureBreed: Boolean
    female: Boolean
    lastHeat: String
  }
  input PetInput {
    petName: String!
    petDescription: String
    image: String
    petBDay: String
    breed: String
    pureBreed: Boolean
    female: Boolean
    lastHeat: String
  }

  type Dog {
    dogId: ID!
    dogName: String!
    description: String
    photos: String
    age: Int
    breeds: String!
    gender: String!
    shots: Boolean
    email: String
    phone: String
    address: String
    city: String
    state: String
    postcode: String
  }
  type Auth {
    token: ID!
    user: User
  }
  input DogInput {
    dogName: String!
    description: String
    photos: String
    age: Int
    breeds: String!
    gender: String!
    shots: Boolean
    email: String
    phone: String
    address: String
    city: String
    state: String
    postcode: String
  }
  type Query {
    me: User
    petSearch(name: String!): [Dog]
  }
  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    savedDog(dogData: DogInput!): User
    removeDog(dogId: ID!): User
    savePet(petData: PetInput!): User
    removedPet(PetId: ID!): User
  }
`;
module.exports = typeDefs;
