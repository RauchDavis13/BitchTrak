import { gql } from "@apollo/client";
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

export const SAVE_PET = gql`
  mutation savePet($petData: PetInput!) {
    savePet(petData: $petData) {
      _id
      username
      email
      savedPets {
        petId
        petName
        petDescription
        image
        petBDay
        breed
        pureBreed
        female
        lastHeat
      }
    }
  }
`;

export const REMOVE_PET = gql`
  mutation removePet($_id: ID!) {
    removePet(_id: $_id) {
      _id
      username
      email
      savedPets {
        petId
        petName
        petDescription
        image
        petBDay
        breed
        pureBreed
        female
        lastHeat
      }
    }
  }
`;

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
