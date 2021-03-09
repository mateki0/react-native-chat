import * as React from 'react';

import { StatusBar, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useForm, Controller } from 'react-hook-form';
import { useMutation } from '@apollo/client';

import ErrorText from './styled/ErrorText';
import FormInput from './styled/FormInput';
import FormSubmitButton from './styled/FormSubmitButton';
import LoginWrapper from './styled/LoginWrapper';
import LoginHeading from './styled/LoginHeading';

import { LOGIN_USER } from '../../src/utils/mutations';

type FormData = {
  email: string;
  password: string;
};

const LoginPage: React.FunctionComponent = () => {
  const { control, handleSubmit, errors } = useForm<FormData>();

  const navigation = useNavigation();

  const [loginUser] = useMutation(LOGIN_USER, {
    onCompleted: ({ token }) => {
      navigation.navigate('Home');
      AsyncStorage.setItem('token', token);
    },
  });
  const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const handleLogin = (data: { email: string; password: string }) => {
    const { email, password } = data;
    loginUser({
      variables: { email, password },
    });
  };

  return (
    <LoginWrapper statusBarHeight={StatusBar.currentHeight}>
      <LoginHeading>Login to your account</LoginHeading>
      <Controller
        control={control}
        render={({ onChange, value }) => (
          <FormInput
            onChangeText={(textValue) => onChange(textValue)}
            value={value}
            placeholder="Your Email"
          />
        )}
        name="email"
        rules={{
          pattern: {
            value: EMAIL_REGEX,
            message: 'Incorrect email',
          },
        }}
        defaultValue=""
      />

      {errors.email && <ErrorText>{errors.email.message}</ErrorText>}

      <Controller
        control={control}
        render={({ onChange, value }) => (
          <FormInput
            onChangeText={(textValue) => onChange(textValue)}
            value={value}
            placeholder="Your Password"
          />
        )}
        name="password"
        rules={{ required: true, minLength: 8 }}
        defaultValue=""
      />

      {errors.password && <ErrorText>Incorrect password(min. 8 signs)</ErrorText>}

      <FormSubmitButton onPress={handleSubmit(handleLogin)}>
        <Text>Login</Text>
      </FormSubmitButton>
    </LoginWrapper>
  );
};

export default LoginPage;
