import * as React from 'react';

import { useQuery } from '@apollo/client';
import { ActivityIndicator, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import RoomName from './styled/RoomName';
import SingleRoomContainer from './styled/SingleRoomContainer';
import { GET_SINGLE_ROOM } from '../../src/utils/queries';
import RoomImage from './styled/RoomImage';
import BlankRoomImage from './styled/BlankRoomImage';
import RoomNameHourWrapper from './styled/RoomNameHourWrapper';
import LastMessageText from './styled/LastMessageText';
import TextBy from './styled/TextBy';
import { MESSAGES_SUBSCRIPTION } from '../../src/utils/subscriptions';

type SingleRoomProps = {
  roomName: string;
  roomId: string;
};

const SingleRoom: React.FunctionComponent<SingleRoomProps> = ({ roomName, roomId }) => {
  const { subscribeToMore, data, loading } = useQuery(GET_SINGLE_ROOM, {
    variables: { id: roomId },
  });

  React.useEffect(() => {
    if (!loading) {
      subscribeToMore({
        document: MESSAGES_SUBSCRIPTION,
        variables: { roomId },
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data) return prev;
          const newMessage = subscriptionData.data.messageAdded;
          return {
            ...prev,
            room: {
              messages: [newMessage, ...prev.room.messages],
            },
          };
        },
      });
    }
  }, [loading, roomId, subscribeToMore]);

  const navigation = useNavigation();

  if (loading) {
    return <ActivityIndicator size="large" color="#5b61b9" />;
  }

  const sortedMessages = data.room.messages
    .slice()
    .sort(
      (a, b) =>
        moment(b.insertedAt, 'YYYY-MM-DD HH:mm:ss').unix() -
        moment(a.insertedAt, 'YYYY-MM-DD HH:mm:ss').unix(),
    );

  const lastMessage = sortedMessages[0];

  return (
    <SingleRoomContainer
      onPress={() => {
        navigation.navigate('Chat', {
          messages: sortedMessages,
          roomName,
          roomId,
        });
      }}
    >
      {data.room.roomPic ? <RoomImage source={{ uri: data.room.roomPic }} /> : <BlankRoomImage />}
      <View>
        <RoomNameHourWrapper>
          <RoomName>{roomName}</RoomName>
        </RoomNameHourWrapper>
        <LastMessageText>{lastMessage.body}</LastMessageText>
        <TextBy>
          Last message {lastMessage.insertedAt} by {lastMessage.user.firstName}
        </TextBy>
      </View>
    </SingleRoomContainer>
  );
};
export default SingleRoom;
