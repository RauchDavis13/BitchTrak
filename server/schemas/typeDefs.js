const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String
    dogCount: Int
    savedDogs: [Dog]
  }
  type Dog {
    dogId: ID!
    dogName: String!
    description: String
    image: String
    age: Int
    breed: String!
    gender: String!
    lastPeriod: String
    pureBreed: Boolean
  }
  type Auth {
    token: ID!
    user: User
  }
  input DogInput {
    dogName: String!
    description: String
    image: String
    age: Int
    breed: String!
    gender: String!
    lastPeriod: String
    pureBreed: Boolean
  }
  type Query {
    me: User
  }
  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveDog(dogData: DogInput!): User
    removeDog(dogId: ID!): User
  }
`;
module.exports = typeDefs;