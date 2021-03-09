import { useMutation } from '@apollo/client';
import * as React from 'react';

import { GiftedChat } from 'react-native-gifted-chat';
import ChatHeader from '../components/Header/ChatHeader';
import { SEND_MESSAGE } from '../src/utils/mutations';
import ScreenWrapper from './styled/ScreenWrapper';
import { ChatScreenRouteProp, RoomDetails, MessageProps } from '../src/types/ChatScreenTypes';

const Chat: React.FunctionComponent<ChatScreenRouteProp> = ({ route }) => {
  const [sendMessage] = useMutation(SEND_MESSAGE);
  const { roomName, roomId }: RoomDetails = route.params;

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

  const handleSend = React.useCallback((msgs = []) => {
    setMessages((previousMessages) => GiftedChat.append(previousMessages, msgs));

    const body = msgs[0].text;
    sendMessage({
      variables: { body, roomId },
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ScreenWrapper>
      <ChatHeader roomName={roomName} />
      <GiftedChat
        messages={messages}
        onSend={handleSend}
        user={{ _id: 999 }}
        placeholder="Type a message..."
        alwaysShowSend
      />
    </ScreenWrapper>
  );
};

export default Chat;
