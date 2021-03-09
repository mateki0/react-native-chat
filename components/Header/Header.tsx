import * as React from 'react';

import { useNavigation } from '@react-navigation/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSearch, faSignInAlt, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import ButtonsWrapper from './styled/ButtonsWrapper';
import HeaderContainer from './styled/HeaderContainer';
import HeaderText from './styled/HeaderText';
import CircleButton from './styled/CircleButton';
import HeadingButtonsTextWrapper from './styled/HeadingButtonsTextWrapper';
import LoginRegisterWrapper from './styled/LoginRegisterWrapper';

const Header: React.FunctionComponent = () => {
  const navigation = useNavigation();

  return (
    <HeaderContainer>
      <HeadingButtonsTextWrapper>
        <HeaderText>
          Chat with{'\n'}
          your friends
        </HeaderText>
        <LoginRegisterWrapper>
          <CircleButton
            onPress={() => navigation.navigate('Login')}
            backgroundColor="#8589c9"
            customWidth="40px"
            customHeight="40px"
            customRadius="20px"
          >
            <FontAwesomeIcon icon={faSignInAlt} size={20} color="#e0e1f2" />
          </CircleButton>
          <CircleButton
            onPress={() => navigation.navigate('Register')}
            backgroundColor="#8589c9"
            customWidth="40px"
            customHeight="40px"
            customRadius="20px"
            customMargin="15px"
          >
            <FontAwesomeIcon icon={faUserPlus} size={20} color="#e0e1f2" />
          </CircleButton>
        </LoginRegisterWrapper>
      </HeadingButtonsTextWrapper>
      <ButtonsWrapper>
        <CircleButton
          backgroundColor="#8589c9"
          customWidth="50px"
          customHeight="50px"
          customRadius="25px"
        >
          <FontAwesomeIcon icon={faSearch} size={20} color="#e0e1f2" />
        </CircleButton>
      </ButtonsWrapper>
    </HeaderContainer>
  );
};
export default Header;
