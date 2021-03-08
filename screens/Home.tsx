import * as React from 'react';
import { StatusBar } from 'react-native';
import Header from '../components/Header/Header';
import Rooms from '../components/Rooms/Rooms';
import ScreenWrapper from './styled/ScreenWrapper';

const Home: React.FunctionComponent = () => {
  return (
    <ScreenWrapper statusBarHeight={StatusBar.currentHeight}>
      <Header isMainPage />
      <Rooms />
    </ScreenWrapper>
  );
};

export default Home;
