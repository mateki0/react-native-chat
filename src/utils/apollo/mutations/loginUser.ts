import { gql } from '@apollo/client';

const LOGIN_USER = gql`
  mutation($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      token
      user {
        id
        firstName
      }
    }
  }
`;

export default LOGIN_USER;
