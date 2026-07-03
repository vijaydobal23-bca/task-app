import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { LogIn } from 'lucide-react';
import toast from 'react-hot-toast';

const Login = () => {
  // 1. State variables to store what the user types in the input fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // 2. Extract the 'login' function from our AuthContext so we can use it here
  const { login } = useContext(AuthContext);
  // 3. useNavigate allows us to programmatically redirect the user to another page
  const navigate = useNavigate();

  // 4. Function that runs when the user submits the form
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents the page from refreshing (default HTML form behavior)
    
    // Basic validation: check if fields are empty
    if (!email || !password) {
      toast.error('Please fill in all fields');
      return;
    }
    
    const success = await login({ email, password });
    
    // If login is successful, redirect the user to the home page (Dashboard)
    if (success) {
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gray-50 dark:bg-gray-900 transition-colors duration-500">
     
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-500/20 rounded-full blur-[120px] animate-pulse pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/20 rounded-full blur-[120px] animate-pulse pointer-events-none" style={{ animationDelay: '1s' }} />
      
      <div 
        className="max-w-md w-full p-8 rounded-3xl shadow-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-white/40 dark:border-gray-700/50 z-10 mx-4"
      >
        <div className="text-center">
          <div 
            className="mx-auto h-16 w-16 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/30 mb-6 transition-transform duration-300 hover:scale-110 hover:rotate-6 active:scale-95"
          >
            <LogIn className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-2 tracking-tight">
            Welcome Back
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Don't have an account?{' '}
            <Link to="/register" className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 transition-all">
              Sign up today
            </Link>
          </p>
        </div>

        {/* 5. The Form */}
        <form 
          action="#" 
          method="POST" 
          name="loginForm" 
          id="loginForm" 
          autoComplete="on"
          className="mt-8 space-y-5" 
          onSubmit={handleSubmit}
        >
          <div className="space-y-4">
            {/* Email Input Field */}
            <div className="group relative">
              <input
                id="email-address"
                name="email"
                type="email"
                required
                className="peer w-full px-4 py-3.5 bg-white dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 shadow-sm"
                placeholder=" "
                value={email}
                // This onChange event updates the 'email' state variable every time the user types a letter
                onChange={(e) => setEmail(e.target.value)}
              />
              <label htmlFor="email-address" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-transparent px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-2 cursor-text">Email address</label>
            </div>
            <div className="group relative">
              <input
                id="password"
                name="password"
                type="password"
                required
                className="peer w-full px-4 py-3.5 bg-white dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 shadow-sm"
                placeholder=" "
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label htmlFor="password" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-transparent px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-2 cursor-text">Password</label>
            </div>
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-3.5 px-4 rounded-xl text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 font-semibold text-lg shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] active:scale-95"
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
