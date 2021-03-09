import * as React from 'react';
import LoginPage from '../components/LoginPage/LoginPage';
import ScreenWrapper from './styled/ScreenWrapper';

const Login: React.FunctionComponent = () => {
  return (
    <ScreenWrapper>
      <LoginPage />
    </ScreenWrapper>
  );
};

export default Login;
