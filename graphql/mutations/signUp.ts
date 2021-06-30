import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation userSignup($userData: SignUpInput!) {
    signUp(input: $userData) {
      viewer {
        sessionToken
        user {
          email
        }
      }
    }
  }
`;
