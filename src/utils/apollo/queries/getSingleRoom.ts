import { gql } from '@apollo/client';

const GET_SINGLE_ROOM = gql`
  query room($id: ID!) {
    room(id: $id) {
      id
      messages {
        id
        body
        insertedAt
        user {
          id
          firstName
          profilePic
        }
      }
      name
      roomPic
      user {
        id
      }
    }
  }
`;

export default GET_SINGLE_ROOM;
