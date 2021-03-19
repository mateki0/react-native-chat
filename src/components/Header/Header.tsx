import * as React from 'react';

import { useApolloClient } from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSearch, faSignOutAlt, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import ButtonsWrapper from './styled/ButtonsWrapper';
import HeaderContainer from './styled/HeaderContainer';
import HeaderText from './styled/HeaderText';
import CircleButton from './styled/CircleButton';
import HeadingButtonsTextWrapper from './styled/HeadingButtonsTextWrapper';
import LoginRegisterWrapper from './styled/LoginRegisterWrapper';
import { UserContext } from '../../contexts/UserContext';

type HeaderProps = {
  isLogged?: boolean;
};

const Header: React.FunctionComponent<HeaderProps> = ({ isLogged }) => {
  const { handleTokenSave } = React.useContext(UserContext);
  const navigation = useNavigation();
  const client = useApolloClient();

  const handleRemoveToken = async () => {
    try {
      await AsyncStorage.removeItem('token');
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = () => {
    handleRemoveToken().then(() => {
      client.resetStore();
      handleTokenSave({ newToken: '' });
    });
  };

  return (
    <HeaderContainer>
      <HeadingButtonsTextWrapper>
        <HeaderText>
          Chat with{'\n'}
          your friends
        </HeaderText>
        {!isLogged ? (
          <LoginRegisterWrapper>
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
        ) : (
          <LoginRegisterWrapper>
            <CircleButton
              onPress={handleLogout}
              backgroundColor="#8589c9"
              customWidth="40px"
              customHeight="40px"
              customRadius="20px"
            >
              <FontAwesomeIcon icon={faSignOutAlt} size={20} color="#e0e1f2" />
            </CircleButton>
          </LoginRegisterWrapper>
        )}
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
