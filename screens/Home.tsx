import * as React from 'react';
import { StatusBar } from 'react-native';
import Header from '../components/Header/Header';
import ScreenWrapper from './styled/ScreenWrapper';

interface HomeProps {
  statusBarHeight?: number;
}

const Home: React.FunctionComponent = () => {
  return (
    <ScreenWrapper statusBarHeight={StatusBar.currentHeight}>
      <Header isMainPage />
    </ScreenWrapper>
  );
};

export default Home;
