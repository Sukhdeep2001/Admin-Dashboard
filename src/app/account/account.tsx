'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import LoginForm from './login'
import RegistrationForm from './register'

export default function AccountPage() {
  const [view, setView] = useState<'login' | 'register' | 'logout'>('login');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [message, setMessage] = useState('');
  const [username, setUsername] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    const storedUser = localStorage.getItem('username');
    const role = localStorage.getItem('role');

    if (token === 'sample_token' && storedUser && role) {
      setIsLoggedIn(true);
      setUsername(storedUser);
      setView('logout');

      if (role === 'super-admin') {
        router.push('/super-admin');
      } else {
        router.push('/admin/settings/plan'); // Step before /admin
      }
    }
  }, []);

  const handleLogin = async (email: string) => {
    const name = email.split('@')[0];
    localStorage.setItem('auth_token', 'sample_token');
    localStorage.setItem('username', name);
    setUsername(name);
    setIsLoggedIn(true);
    setMessage('✅ You have successfully logged in.');
    setView('logout');
  
    try {
      const res = await fetch('/api/role');
      const users = await res.json(); // This is an array of users
  
      const matchedUser = users.find((u: any) => u.email === email);
  
      if (!matchedUser) {
        setMessage('❌ Unauthorized user');
        localStorage.clear();
        setIsLoggedIn(false);
        setView('login');
        return;
      }
  
      localStorage.setItem('role', matchedUser.role);
  
      if (matchedUser.role === 'super-admin') {
        router.push('/super-admin');
      } else if (matchedUser.role === 'admin') {
        router.push('/plan');
      } else {
        setMessage('❌ Role not recognized');
      }
    } catch (err) {
      console.error('Failed to determine role:', err);
      setMessage('❌ Failed to determine role.');
    }
  };
  

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('username');
    localStorage.removeItem('role');
    setUsername(null);
    setIsLoggedIn(false);
    setMessage('');
    setView('login');
    router.push('/');
  };

  const handleRegister = () => {
    setMessage('✅ Registration successful. Please log in.');
    localStorage.removeItem('auth_token');
    localStorage.removeItem('role');
    setIsLoggedIn(false);
    setView('login');
  };

  return (
    <div className="min-h-screen flex flex-col-reverse md:flex-row bg-black text-white">
      {/* Image Section */}
      <div className="w-full md:w-1/2 h-[250px] md:h-auto">
        <Image
          src="/6368592.jpg"
          alt="Account Visual"
          width={700}
          height={700}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Form Section */}
      <div className="w-full md:w-1/2 px-6 md:px-[50px] py-10 bg-black flex flex-col justify-center">
        <div className="flex justify-center mb-6">
            <Image
                src="/logo.png"
                alt="Admin.ai Logo"
                width={150}
                height={50}
                className="object-contain"
            />
        </div>

        {message && (
          <div className="bg-green-100 text-green-700 p-2 rounded mb-4 text-center">
            {message}
          </div>
        )}

        {/* Toggle Buttons */}
        <div className="flex justify-center gap-4 mb-6">
          {!isLoggedIn ? (
            <>
              <button
                onClick={() => setView('login')}
                className={`px-4 py-2 rounded-[5px] border-2 border-white transition-all duration-200 ${
                  view === 'login'
                    ? 'bg-white text-black'
                    : 'bg-transparent text-white hover:bg-white hover:text-black'
                }`}
              >
                Login
              </button>
              <button
                onClick={() => setView('register')}
                className={`px-4 py-2 rounded-[5px] border-2 border-white transition-all duration-200 ${
                  view === 'register'
                    ? 'bg-white text-black'
                    : 'bg-transparent text-white hover:bg-white hover:text-black'
                }`}
              >
                Register
              </button>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-[5px] border-2 border-white transition-all duration-200 bg-transparent text-white hover:bg-white hover:text-black"
            >
              Logout
            </button>
          )}
        </div>

        {/* Auth Forms */}
        <div>
          {view === 'login' && <LoginForm onSuccess={handleLogin} />}
          {view === 'register' && <RegistrationForm onSuccess={handleRegister} />}
          {view === 'logout' && (
            <div className="text-center text-green-400">
              ✅ You are logged in. Redirecting to your dashboard...
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
