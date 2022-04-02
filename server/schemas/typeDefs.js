const { gql } = require('apollo-server-express');
//TODO type Dog should include the pageCount and publishedDate
//TODO input DogInput should include the pageCount and publishedDate
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
    authors: [String]
    description: String
    image: String
    link: String
    title: String!

  }
  type Auth {
    token: ID!
    user: User
  }
  input DogInput {
    authors: [String]
    description: String!
    dogId: String!
    image: String
    link: String
    title: String!
   
  }
  type Query {
    me: User
    petSearch(name:String!): [Dog]
  }
  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveDog(dogData: DogInput!): User
    removeDog(dogId: ID!): User
  }
`;
module.exports = typeDefs;