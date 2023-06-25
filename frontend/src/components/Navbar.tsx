import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/auth/AuthContext';
import { toast } from 'react-toastify';
function Navbar() {
  const { state, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch({
      type: 'LOGOUT',
    });
    toast.info(`${state.user?.name} Logout`);
    navigate('/');
  };
  return (
    <div className="px-16 py-6 bg-slate-800 flex items-center justify-between text-slate-50">
      <Link to="/" className="font-bold text-3xl">
        Auth
      </Link>
      {state.user ? (
        <div className="space-x-3 flex items-center justify-center">
          <button
            className="px-4 py-2 active:scale-x-95 transition-all rounded-md bg-black border border-slate-50 text-slate-50"
            onClick={handleLogout}
          >
            Logout "{state.user.name}"
          </button>
          <Link
            to="/update"
            className="px-4 py-2 active:scale-x-95 transition-all rounded-md bg-blue-600 text-slate-50"
          >
            Update User
          </Link>
        </div>
      ) : (
        <div className="flex items-center justify-center space-x-3">
          <Link
            className="px-4 py-2 active:scale-x-95 transition-all rounded-md bg-blue-600 text-slate-50"
            to="/login"
          >
            Login
          </Link>
          <Link
            className="px-4 py-2 active:scale-x-95 transition-all rounded-md bg-yellow-500 text-slate-100"
            to="/register"
          >
            Register
          </Link>
        </div>
      )}
      <Link
        className="px-4 py-2 active:scale-x-95 transition-all rounded-md bg-purple-500 text-slate-100"
        to="/login?redirect=/private"
      >
        Private
      </Link>
    </div>
  );
}

export default Navbar;
