import { gql } from '@apollo/client';

export const GET_CURRENT_USER = gql`
  query GetCurrentUser {
    viewer {
      selectedLanguage @client
      user {
        displayName
        username
        createdAt
        emailVerified
        email
        emailVerified
      }
    }
  }
`;
