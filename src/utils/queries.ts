import { gql } from '@apollo/client';

export const GET_ROOMS = gql`
  {
    usersRooms {
      rooms {
        id
        name
      }
    }
  }
`;

export const GET_SINGLE_ROOM = gql`
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
