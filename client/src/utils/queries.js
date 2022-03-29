import { gql } from '@apollo/client';

//TODO add pageCount and publishedDate to savedDogs
export const QUERY_ME = gql`
  {
    me {
      _id
      username
      email
      savedDogs {
        dogId
        authors
        image
        description
        title
        pageCount
        publishedDate
        link
      }
    }
  }
`;
