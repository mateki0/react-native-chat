import { useMutation } from '@apollo/client';
import * as React from 'react';

import { GiftedChat } from 'react-native-gifted-chat';
import ChatHeader from '../components/Header/ChatHeader';
import { ChatScreenRouteProp, RoomDetails, MessageProps } from '../types/ChatScreenTypes';
import { UserContext } from '../contexts/UserContext';
import ScreenWrapper from '../components/ScreenWrapper/ScreenWrapper';
import GiftedChatWrapper from '../components/ChatWrapper/GiftedChatWrapper';
import SEND_MESSAGE from '../utils/apollo/mutations/sendMessage';

const Chat: React.FunctionComponent<ChatScreenRouteProp> = ({ route }) => {
  const [sendMessage] = useMutation(SEND_MESSAGE);
  const { roomName, roomId }: RoomDetails = route.params;

  const userData = React.useContext(UserContext);

  const userId = userData.user.id ? parseInt(userData.user.id, 10) : '';

  const giftedChatMessagesFormat = route.params.messages.map(
    ({ id, body, insertedAt, user }: MessageProps) => {
      const giftedMsg = {
        _id: id,
        text: body,
        createdAt: insertedAt,
        user: {
          _id: user.id,
          name: user.firstName,
          avatar: user.profilePic,
        },
      };
      return giftedMsg;
    },
  );

  const [messages, setMessages] = React.useState(giftedChatMessagesFormat);

  const handleSend = React.useCallback(
    (msgs = []) => {
      setMessages((previousMessages) => GiftedChat.append(previousMessages, msgs));

      const body = msgs[0].text;
      sendMessage({
        variables: { body, roomId },
      });
    },
    [sendMessage, roomId],
  );

  return (
    <ScreenWrapper>
      <ChatHeader roomName={roomName} />
      <GiftedChatWrapper>
        <GiftedChat
          messages={messages}
          onSend={handleSend}
          user={{ _id: userId }}
          placeholder="Type a message..."
          alwaysShowSend
        />
      </GiftedChatWrapper>
    </ScreenWrapper>
  );
};

export default Chat;
