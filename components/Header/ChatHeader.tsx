import * as React from 'react';

import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPhone, faVideo } from '@fortawesome/free-solid-svg-icons';
import ButtonsWrapper from './styled/ButtonsWrapper';
import HeaderContainer from './styled/HeaderContainer';
import HeaderText from './styled/HeaderText';
import CircleButton from './styled/CircleButton';
import NavButtonsWrapper from './styled/NavButtonsWrapper';
import HeaderButtonText from './styled/HeaderButtonText';

type ChatHeaderProps = {
  roomName: string;
};

const ChatHeader: React.FunctionComponent<ChatHeaderProps> = ({ roomName }) => {
  const navigation = useNavigation();

  return (
    <HeaderContainer>
      <NavButtonsWrapper>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <HeaderButtonText>Back</HeaderButtonText>
        </TouchableOpacity>
        <TouchableOpacity>
          <HeaderButtonText>Search</HeaderButtonText>
        </TouchableOpacity>
      </NavButtonsWrapper>
      <HeaderText>{roomName}</HeaderText>
      <ButtonsWrapper chatHeader>
        <CircleButton
          backgroundColor="#8589c9"
          customWidth="30px"
          customHeight="30px"
          customRadius="15px"
        >
          <FontAwesomeIcon icon={faPhone} size={16} color="#e0e1f2" />
        </CircleButton>
        <CircleButton
          backgroundColor="#8589c9"
          customWidth="30px"
          customHeight="30px"
          customRadius="15px"
          customMargin="20px"
        >
          <FontAwesomeIcon icon={faVideo} size={16} color="#e0e1f2" />
        </CircleButton>
      </ButtonsWrapper>
    </HeaderContainer>
  );
};
export default ChatHeader;
