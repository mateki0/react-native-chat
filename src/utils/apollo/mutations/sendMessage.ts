import { gql } from '@apollo/client';

const SEND_MESSAGE = gql`
  mutation($body: String!, $roomId: String!) {
    sendMessage(body: $body, roomId: $roomId) {
      body
    }
  }
`;

export default SEND_MESSAGE;
