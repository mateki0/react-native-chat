import { gql } from '@apollo/client';

const MESSAGES_SUBSCRIPTION = gql`
  subscription($roomId: String!) {
    messageAdded(roomId: $roomId) {
      id
      body
      insertedAt
      user {
        id
        firstName
      }
    }
  }
`;

export default MESSAGES_SUBSCRIPTION;
