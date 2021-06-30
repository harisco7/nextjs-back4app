import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation userLogin($userData: LogInInput!) {
    logIn(input: $userData) {
      clientMutationId
      viewer {
        sessionToken
        user {
          email
        }
      }
    }
  }
`;
