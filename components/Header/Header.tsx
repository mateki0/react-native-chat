import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import ButtonsWrapper from './styled/ButtonsWrapper';
import HeaderContainer from './styled/HeaderContainer';
import HeaderText from './styled/HeaderText';
import CircleButton from './styled/CircleButton';

type HeaderProps = {
  isMainPage?: boolean;
};
const Header: React.FunctionComponent<HeaderProps> = ({ isMainPage }) => {
  console.log(isMainPage);
  return (
    <HeaderContainer>
      <HeaderText>
        Chat with{'\n'}
        your friends
      </HeaderText>
      <ButtonsWrapper>
        <CircleButton backgroundColor="#8589c9">
          <FontAwesomeIcon icon={faSearch} size={20} color="#e0e1f2" />
        </CircleButton>
      </ButtonsWrapper>
    </HeaderContainer>
  );
};
export default Header;
