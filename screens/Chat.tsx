import * as React from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import ChatHeader from '../components/Header/ChatHeader';
import ScreenWrapper from './styled/ScreenWrapper';

type ChatProps = {
  route: any;
};

const Chat: React.FunctionComponent<ChatProps> = ({ route }) => {
  const { messages, roomName } = route.params;

  return (
    <ScreenWrapper>
      <ChatHeader roomName={roomName} />
      <GiftedChat />
    </ScreenWrapper>
  );
};

export default Chat;
