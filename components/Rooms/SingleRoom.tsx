import { useQuery } from '@apollo/client';
import * as React from 'react';
import { ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import RoomName from './styled/RoomName';
import SingleRoomContainer from './styled/SingleRoomContainer';
import { GET_SINGLE_ROOM } from '../../src/utils/queries';
import RoomImage from './styled/RoomImage';
import BlankRoomImage from './styled/BlankRoomImage';
import RoomInnerWrapper from './styled/RoomInnerWrapper';
import RoomNameHourWrapper from './styled/RoomNameHourWrapper';
import LastMessageText from './styled/LastMessageText';
import TextBy from './styled/TextBy';

type SingleRoomProps = {
  roomName: string;
  roomId: string;
};

const SingleRoom: React.FunctionComponent<SingleRoomProps> = ({ roomName, roomId }) => {
  const { data, loading } = useQuery(GET_SINGLE_ROOM, { variables: { id: roomId } });

  const navigation = useNavigation();

  if (loading) {
    return <ActivityIndicator />;
  }
  const lastMessage = data.room.messages[data.room.messages.length - 1];

  return (
    <SingleRoomContainer
      onPress={() => {
        navigation.navigate('Chat', { messages: data.room.messages, roomName });
      }}
    >
      {data.room.roomPic ? <RoomImage source={{ uri: data.room.roomPic }} /> : <BlankRoomImage />}
      <RoomInnerWrapper>
        <RoomNameHourWrapper>
          <RoomName>{roomName}</RoomName>
        </RoomNameHourWrapper>
        <LastMessageText>{lastMessage.body}</LastMessageText>
        <TextBy>
          Last message {lastMessage.insertedAt} by {lastMessage.user.firstName}
        </TextBy>
      </RoomInnerWrapper>
    </SingleRoomContainer>
  );
};
export default SingleRoom;
