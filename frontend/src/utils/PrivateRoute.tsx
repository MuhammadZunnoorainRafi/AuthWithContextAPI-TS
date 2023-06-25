import { useContext } from 'react';
import AuthContext from '../context/auth/AuthContext';
import { Navigate } from 'react-router-dom';
function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { state } = useContext(AuthContext);
  if (state.user) {
    return children;
  }
  return <Navigate to="/login" />;
}

export default PrivateRoute;
