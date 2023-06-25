import { Action, State } from '../../types/AuthContextTypes';

export const authReducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'REG_USER': {
      return { ...state, user: action.payload };
    }
    case 'LOGIN': {
      return { ...state, user: action.payload };
    }

    case 'LOGOUT': {
      localStorage.removeItem('userInfo');
      return { ...state, user: null };
    }
    case 'UPDATE': {
      return { ...state, user: action.payload };
    }
    default:
      return state;
  }
};
