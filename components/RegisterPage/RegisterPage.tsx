import * as React from 'react';

import { StatusBar, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useForm, Controller } from 'react-hook-form';
import { useMutation } from '@apollo/client';

import { REGISTER_USER } from '../../src/utils/mutations';
import FormWrapper from '../LoginPage/styled/FormWrapper';
import FormHeading from '../LoginPage/styled/FormHeading';
import FormInput from '../LoginPage/styled/FormInput';
import ErrorText from '../LoginPage/styled/ErrorText';
import FormSubmitButton from '../LoginPage/styled/FormSubmitButton';

type RegisterFormData = {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  passwordConfirmation: string;
};

const RegisterPage: React.FunctionComponent = () => {
  const navigation = useNavigation();

  const [insertUser] = useMutation(REGISTER_USER, {
    onCompleted: () => navigation.navigate('Home'),
  });

  const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const { control, errors, register, handleSubmit, watch } = useForm<RegisterFormData>();

  React.useEffect(() => {
    register('email');
    register('firstName');
    register('lastName');
    register('password');
    register('passwordConfirmation');
  }, [register]);

  const handleRegister = ({
    email,
    firstName,
    lastName,
    password,
    passwordConfirmation,
  }: RegisterFormData) => {
    insertUser({
      variables: { email, firstName, lastName, password, passwordConfirmation },
    });
  };
  return (
    <FormWrapper statusBarHeight={StatusBar.currentHeight}>
      <FormHeading>Create new account</FormHeading>

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
            placeholder="First Name"
          />
        )}
        name="firstName"
        rules={{ required: true }}
        defaultValue=""
      />

      {errors.firstName && <ErrorText>First name is required</ErrorText>}

      <Controller
        control={control}
        render={({ onChange, value }) => (
          <FormInput
            onChangeText={(textValue) => onChange(textValue)}
            value={value}
            placeholder="Last Name"
          />
        )}
        name="lastName"
        rules={{ required: true }}
        defaultValue=""
      />

      {errors.lastName && <ErrorText>Last name is required</ErrorText>}

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

      {errors.password && <ErrorText>You must specify a password(min. 8 signs)</ErrorText>}

      <Controller
        control={control}
        render={({ onChange, value }) => (
          <FormInput
            onChangeText={(textValue) => onChange(textValue)}
            value={value}
            placeholder="Confirm Your Password"
            secureTextEntry
          />
        )}
        name="passwordConfirmation"
        rules={{
          required: 'You must specify a password',
          validate: (value) => {
            if (value === watch('password')) {
              return true;
            }
            return 'The passwords do not match';
          },
        }}
        defaultValue=""
      />

      {errors.passwordConfirmation && <ErrorText>{errors.passwordConfirmation.message}</ErrorText>}

      <FormSubmitButton onPress={handleSubmit(handleRegister)}>
        <Text>Register</Text>
      </FormSubmitButton>
    </FormWrapper>
  );
};

export default RegisterPage;
