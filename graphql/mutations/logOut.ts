import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation userLogout($userData: LogOutInput!) {
    logOut(input: $userData) {
      clientMutationId
    }
  }
`;
