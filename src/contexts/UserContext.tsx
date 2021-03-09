import * as React from 'react';

interface ContextProps {
  user: {
    id?: string;
  };
  handleUserChange: (e: { id: string }) => void;
}

export const UserContext = React.createContext<ContextProps>({
  user: {
    id: '',
  },
  handleUserChange: () => ({}),
});

export const UserProvider = ({ children }) => {
  const [user, setUser] = React.useState({});
  const handleUserChange = (e: { id: string }) => {
    setUser(e);
  };

  const value: ContextProps = { user, handleUserChange };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
