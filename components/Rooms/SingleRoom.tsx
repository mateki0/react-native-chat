import * as React from 'react';
import { RoomProps } from './Rooms';
import RoomName from './styled/RoomName';
import SingleRoomContainer from './styled/SingleRoomContainer';

const SingleRoom: React.FunctionComponent<RoomProps> = ({ item }) => {
  return (
    <SingleRoomContainer>
      <RoomName>{item.name}</RoomName>
    </SingleRoomContainer>
  );
};
export default SingleRoom;
