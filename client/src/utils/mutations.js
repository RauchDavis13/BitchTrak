import { gql } from '@apollo/client';
export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;
export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;
//TODO add the pageCount and publishedDate to the savedDogs query
export const SAVE_DOG = gql`
  mutation saveDog($dogData: DogInput!) {
    saveDog(dogData: $dogData) {
      _id
      username
      email
      savedDogs {
        dogId
        dogName
        photos
        description
        age
        breeds
        gender
        shots
        email
        phone
        address
        city
        state
        postcode
      }
    }
  }
`;
//TODO add the pageCount and publishedDate to the savedDogs query
export const REMOVE_DOG = gql`
  mutation removeDog($dogId: ID!) {
    removeDog(dogId: $dogId) {
      _id
      username
      email
      savedDogs {
        dogId
        dogName
        photos
        description
        age
        breeds
        gender
        shots
        email
        phone
        address
        city
        state
        postcode
      }
    }
  }
`;