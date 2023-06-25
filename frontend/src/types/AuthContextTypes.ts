type user = {
  _id: string;
  name: string;
  email: string;
  password: string;
  token: string;
  isAdmin: boolean;
};

export type State = {
  user: user | null;
};

export type Action =
  | {
      type: 'REG_USER';
      payload: user;
    }
  | {
      type: 'LOGIN';
      payload: user;
    }
  | { type: 'LOGOUT' }
  | {
      type: 'UPDATE';
      payload: user;
    };
