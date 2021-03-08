import * as React from 'react';

import { useNavigation } from '@react-navigation/native';
import ButtonsWrapper from './styled/ButtonsWrapper';
import HeaderContainer from './styled/HeaderContainer';
import HeaderText from './styled/HeaderText';
import CircleButton from './styled/CircleButton';
import NavButtonsWrapper from './styled/NavButtonsWrapper';
import HeaderButton from './styled/HeaderButton';
import HeaderButtonText from './styled/HeaderButtonText';

type ChatHeaderProps = {
  roomName: string;
};

const ChatHeader: React.FunctionComponent<ChatHeaderProps> = ({ roomName }) => {
  const navigation = useNavigation();
  return (
    <HeaderContainer>
      <NavButtonsWrapper>
        <HeaderButton onPress={() => navigation.goBack()}>
          <HeaderButtonText>Back</HeaderButtonText>
        </HeaderButton>
        <HeaderButton>
          <HeaderButtonText>Search</HeaderButtonText>
        </HeaderButton>
      </NavButtonsWrapper>
      <HeaderText>{roomName}</HeaderText>
      <ButtonsWrapper>
        <CircleButton
          backgroundColor="#8589c9"
          customWidth="30px"
          customHeight="30px"
          customRadius="15px"
        />
      </ButtonsWrapper>
    </HeaderContainer>
  );
};
export default ChatHeader;
