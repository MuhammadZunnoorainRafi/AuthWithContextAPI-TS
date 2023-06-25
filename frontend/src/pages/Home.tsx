import { useContext } from 'react';
import AuthContext from '../context/auth/AuthContext';
function Home() {
  const { state } = useContext(AuthContext);
  return (
    <div className="mt-32 ">
      <h1 className="font-bold text-4xl text-cyan-800 font-serif">
        {state.user
          ? `Welcome to Screen "${state.user.name}"`
          : 'Sign Up to COntinue'}
      </h1>
    </div>
  );
}

export default Home;
