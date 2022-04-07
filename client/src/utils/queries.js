import { gql } from '@apollo/client';

export const QUERY_ME = gql`
  {
    me {
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
      savedPets {
        petId
        petName
        image
        petBDay
        petDescription
        breed
        pureBreed
        female
        lastHeat
      }
    }
  }
`;
