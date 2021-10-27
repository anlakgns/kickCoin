import { createContext, useState } from 'react';

export const AppStateContext = createContext();

export const AppStateProvider = (props) => {
  const [appStates, setAppStates] = useState({
    metamaskWarning: false,
  });

  return (
    <AppStateContext.Provider
      value={{
        appStates,
        setAppStates,
      }}
    >
      {props.children}
    </AppStateContext.Provider>
  );
};
