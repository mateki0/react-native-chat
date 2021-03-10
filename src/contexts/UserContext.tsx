import * as React from 'react';

interface ContextProps {
  user: {
    token?: string;
  };
  handleUserChange: (e: { token: string }) => void;
}

export const UserContext = React.createContext<ContextProps>({
  user: {
    token: '',
  },
  handleUserChange: () => ({}),
});

export const UserProvider = ({ children }) => {
  const [user, setUser] = React.useState({});
  const handleUserChange = (e: { token: string }) => {
    setUser(e);
  };

  const value: ContextProps = { user, handleUserChange };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
