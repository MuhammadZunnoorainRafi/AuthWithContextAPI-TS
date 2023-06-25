import React, { createContext, useReducer } from 'react';
import { Action, State } from '../../types/AuthContextTypes';
import { authReducer } from './AuthReducer';

// const user = localStorage.getItem('userInfo');
const initialState = {
  user: localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo')!)
    : null,
};

const AuthContext = createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => undefined,
});

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer<React.Reducer<State, Action>>(
    authReducer,
    initialState
  );
  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
