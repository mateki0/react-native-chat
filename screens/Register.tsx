import * as React from 'react';
import RegisterPage from '../components/RegisterPage/RegisterPage';
import ScreenWrapper from './styled/ScreenWrapper';

const Register: React.FunctionComponent = () => {
  return (
    <ScreenWrapper>
      <RegisterPage />
    </ScreenWrapper>
  );
};

export default Register;
