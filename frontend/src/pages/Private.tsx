import { useContext, useEffect } from 'react';
import AuthContext from '../context/auth/AuthContext';
import { useNavigate } from 'react-router-dom';

function Private() {
  const { state } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (state.user) {
      return navigate('/private');
    }
  }, [navigate, state.user]);
  return (
    <div className="font-semibold  text-2xl tracking-widest">
      ~This is a Private Route 🔏
    </div>
  );
}

export default Private;
