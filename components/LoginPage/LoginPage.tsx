import * as React from 'react';

import { Text, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useForm, Controller } from 'react-hook-form';
import { useMutation } from '@apollo/client';

import ErrorText from './styled/ErrorText';
import FormInput from './styled/FormInput';
import FormSubmitButton from './styled/FormSubmitButton';
import FormWrapper from './styled/FormWrapper';
import FormHeading from './styled/FormHeading';

import { LOGIN_USER } from '../../src/utils/mutations';
import { UserContext } from '../../src/contexts/UserContext';

type FormData = {
  email: string;
  password: string;
};

const LoginPage: React.FunctionComponent = () => {
  const { control, handleSubmit, register, errors } = useForm<FormData>();
  const { handleUserChange } = React.useContext(UserContext);
  const [isLoading, setIsLoading] = React.useState(false);

  const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const navigation = useNavigation();

  const [loginUserMutation] = useMutation(LOGIN_USER, {
    onCompleted: async ({ loginUser }) => {
      navigation.navigate('Home');
      await AsyncStorage.setItem('token', loginUser.token);
      handleUserChange({ id: loginUser.user.id });
      setIsLoading(false);
    },
  });

  const handleLogin = ({ email, password }: FormData) => {
    setIsLoading(true);
    loginUserMutation({
      variables: { email, password },
    });
  };

  React.useEffect(() => {
    register('email');
    register('password');
  }, [register]);

  if (isLoading) {
    return <ActivityIndicator animating size="large" color="#5b61b9" />;
  }

  return (
    <FormWrapper>
      <FormHeading>Login to your account</FormHeading>
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
            secureTextEntry
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
    </FormWrapper>
  );
};

export default LoginPage;
