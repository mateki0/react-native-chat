import * as React from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../components/Header/Header';
import Rooms from '../components/Rooms/Rooms';
import LoginPage from '../components/LoginPage/LoginPage';
import { UserContext } from '../contexts/UserContext';
import ScreenWrapper from '../components/ScreenWrapper/ScreenWrapper';

const Home: React.FunctionComponent = () => {
  const { token, handleTokenSave } = React.useContext(UserContext);

  const getToken = async () => {
    const tokenFromStorage = await AsyncStorage.getItem('token');
    return tokenFromStorage;
  };

  React.useEffect(() => {
    getToken().then((newToken) => {
      if (newToken && newToken !== null) {
        handleTokenSave({ newToken });
      }
    });
  }, [handleTokenSave, token]);

  return (
    <ScreenWrapper>
      <Header isLogged={token !== ''} />
      {token !== '' ? <Rooms /> : <LoginPage />}
    </ScreenWrapper>
  );
};

export default Home;
