import * as React from 'react';

type UserData = {
  id?: string;
  firstName?: string;
};

interface ContextProps {
  token?: string;
  user: UserData;
  handleUserDataChange: (userData: UserData) => void;
  handleTokenSave: ({ newToken }: { newToken: string }) => void;
}

export const UserContext = React.createContext<ContextProps>({
  token: '',
  user: {
    id: '',
    firstName: '',
  },
  handleUserDataChange: () => ({}),
  handleTokenSave: () => ({}),
});

export const UserProvider = ({ children }) => {
  const [user, setUser] = React.useState({});
  const [token, setToken] = React.useState('');

  const handleTokenSave = ({ newToken }: { newToken: string }) => {
    setToken(newToken);
  };

  const handleUserDataChange = (userData: UserData) => {
    setUser(userData);
  };

  const value: ContextProps = { user, handleUserDataChange, token, handleTokenSave };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
