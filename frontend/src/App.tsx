import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { AuthContextProvider } from './context/auth/AuthContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/Home';
import UpdateUser from './pages/UpdateUser';
import Private from './pages/Private';

axios.defaults.baseURL =
  process.env.NODE_ENV === 'development' ? 'http://localhost:4000' : '';
function App() {
  const queryClient = new QueryClient();
  return (
    <>
      <AuthContextProvider>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <div className="flex flex-col justify-between min-h-screen">
              <ToastContainer position="bottom-center" />
              <Navbar />
              <main className="p-4 mt-2 mb-auto max-w-2xl mx-auto">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/update" element={<UpdateUser />} />
                  <Route
                    path="/private"
                    element={
                      // <PrivateRoute>
                      //   <Private />
                      // </PrivateRoute>
                      <Private />
                    }
                  />
                </Routes>
              </main>
              <Footer />
            </div>
          </BrowserRouter>
        </QueryClientProvider>
      </AuthContextProvider>
    </>
  );
}

export default App;
