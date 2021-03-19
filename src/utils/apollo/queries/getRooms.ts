import { gql } from '@apollo/client';

const GET_ROOMS = gql`
  {
    usersRooms {
      rooms {
        id
        name
      }
    }
  }
`;

export default GET_ROOMS;
