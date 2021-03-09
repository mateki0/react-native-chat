import * as React from 'react';

import Header from '../components/Header/Header';
import Rooms from '../components/Rooms/Rooms';
import ScreenWrapper from './styled/ScreenWrapper';
import LoginPage from '../components/LoginPage/LoginPage';
import { UserContext } from '../src/contexts/UserContext';

const Home: React.FunctionComponent = () => {
  const { user } = React.useContext(UserContext);

  const isLogged =
    user && Object.keys(user).length !== 0 && user.constructor === Object && user.id !== '';

  return (
    <ScreenWrapper>
      <Header isLogged={isLogged} />
      {isLogged ? <Rooms /> : <LoginPage />}
    </ScreenWrapper>
  );
};

export default Home;
