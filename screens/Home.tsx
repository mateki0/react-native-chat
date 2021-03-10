import * as React from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../components/Header/Header';
import Rooms from '../components/Rooms/Rooms';
import ScreenWrapper from './styled/ScreenWrapper';
import LoginPage from '../components/LoginPage/LoginPage';
import { UserContext } from '../src/contexts/UserContext';

const Home: React.FunctionComponent = () => {
  const { user } = React.useContext(UserContext);
  const [isLoading, setIsLoading] = React.useState(true);
  const { handleUserChange } = React.useContext(UserContext);
  const getToken = async () => {
    const tokenFromStorage = await AsyncStorage.getItem('token');
    return tokenFromStorage;
  };

  React.useEffect(() => {
    getToken().then((token) => {
      if (token && token !== null) {
        handleUserChange({ token });
      }
      setIsLoading(false);
    });
  }, [handleUserChange]);

  const isLogged =
    !isLoading &&
    user &&
    Object.keys(user).length !== 0 &&
    user.constructor === Object &&
    user.token !== '';

  return (
    <ScreenWrapper>
      <Header isLogged={isLogged} />
      {isLogged ? <Rooms /> : <LoginPage />}
    </ScreenWrapper>
  );
};

export default Home;
