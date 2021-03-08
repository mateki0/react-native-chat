import { useMutation } from '@apollo/client';
import * as React from 'react';

import { GiftedChat } from 'react-native-gifted-chat';
import ChatHeader from '../components/Header/ChatHeader';
import { SEND_MESSAGE } from '../src/utils/mutations';
import ScreenWrapper from './styled/ScreenWrapper';
import {
  ChatProps,
  ChatScreenRouteProp,
  RoomDetails,
  MessageProps,
} from '../src/types/ChatScreenTypes';

const Chat: React.FunctionComponent<ChatProps> = ({ route }: ChatScreenRouteProp) => {
  const [sendMessage] = useMutation(SEND_MESSAGE);
  const { roomName, roomId }: RoomDetails = route.params;

  const giftedChatMessagesFormat = route.params.messages.map(
    ({ id, body, createdAt, user }: MessageProps) => {
      const giftedMsg = {
        _id: id,
        text: body,
        createdAt,
        user: {
          _id: user.id,
          name: user.firstName,
          avatar: user.avatarUrl,
        },
      };
      return giftedMsg;
    },
  );

  const [messages, setMessages] = React.useState(giftedChatMessagesFormat);

  const handleSend = React.useCallback(() => {
    setMessages((previousMessages) => GiftedChat.append(previousMessages, messages));

    const body = messages[0].text;

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
      />
    </ScreenWrapper>
  );
};

export default Chat;
