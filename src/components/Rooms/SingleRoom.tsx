import * as React from 'react';

import { useQuery } from '@apollo/client';
import { ActivityIndicator, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import RoomName from './styled/RoomName';
import SingleRoomContainer from './styled/SingleRoomContainer';
import RoomImage from './styled/RoomImage';
import BlankRoomImage from './styled/BlankRoomImage';
import RoomNameHourWrapper from './styled/RoomNameHourWrapper';
import LastMessageText from './styled/LastMessageText';
import TextBy from './styled/TextBy';
import GET_SINGLE_ROOM from '../../utils/apollo/queries/getSingleRoom';
import MESSAGES_SUBSCRIPTION from '../../utils/apollo/subscriptions/messagesSubscription';

type SingleRoomProps = {
  roomName: string;
  roomId: string;
};

const SingleRoom: React.FunctionComponent<SingleRoomProps> = ({ roomName, roomId }) => {
  const { subscribeToMore, data, loading } = useQuery(GET_SINGLE_ROOM, {
    variables: { id: roomId },
  });

  React.useEffect(() => {
    if (!data) {
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
  }, [data, roomId, subscribeToMore]);

  const navigation = useNavigation();

  const sortedMessages = data.room.messages
    .slice()
    .sort(
      (a, b) =>
        Date.parse(b.insertedAt.replace(' ', 'T')) / 1000 -
        Date.parse(a.insertedAt.replace(' ', 'T')) / 1000,
    );

  const lastMessage = sortedMessages[0];

  if (loading) {
    return <ActivityIndicator size="large" color="#5b61b9" />;
  }

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
