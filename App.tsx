import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ApolloProvider } from '@apollo/client';
import initApollo from './src/utils/apollo/initApollo';
import Home from './src/screens/Home';
import Chat from './src/screens/Chat';
import Login from './src/screens/Login';
import { UserProvider } from './src/contexts/UserContext';
import Register from './src/screens/Register';

const Stack = createStackNavigator();
const client = initApollo();

const App: React.FunctionComponent = () => {
  return (
    <ApolloProvider client={client}>
      <UserProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Chat" component={Chat} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
          </Stack.Navigator>
        </NavigationContainer>
      </UserProvider>
    </ApolloProvider>
  );
};

export default App;
