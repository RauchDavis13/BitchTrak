import { gql } from '@apollo/client';

export const QUERY_ME = gql`
  {
    me {
      _id
      firstName
      lastName
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
        petname
        image
        petBday
        petDescription
        breed
        pureBreed
        female
        lastheat
      }
    }
  }
`;
