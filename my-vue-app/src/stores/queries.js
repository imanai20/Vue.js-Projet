import { gql } from '@apollo/client';

export const GET_TOPS = gql`
  query GetProducts {
    tops {
        id
        nom
        prix
        image
    }
  }
`;

export const GET_SNEAKERS = gql`
    query MyQuery {
      sneakers {
        id
        image
        nom
        prix
      }
    }
    `;