import { gql } from '@apollo/client';

export const MESSAGES_SUBSCRIPTION = gql`
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
