'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginForm({ onSuccess }: { onSuccess: (email: string) => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [forgotMode, setForgotMode] = useState(false);
  const [forgotMessage, setForgotMessage] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (email && password) {
      const isValid = password.length >= 4; // Example login logic

      if (isValid) {
        try {
          const res = await fetch('/api/role')
          const roles = await res.json()

          const username = email.split('@')[0];
          localStorage.setItem('username', username);

          onSuccess(email); // Already calls from parent

          // Redirect logic based on role
          if (roles['super-admin']?.includes(email)) {
            router.push('/super-admin');
          } else if (roles['admin']?.includes(email)) {
            router.push('/admin/settings/plan');
          } else {
            setError('❌ You are not authorized (role missing)');
          }
        } catch (err) {
          console.error('Failed to load roles:', err);
          setError('❌ Something went wrong. Try again.');
        }
      } else {
        setError('❌ Invalid credentials');
      }
    }
  };

  const handleForgotSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setForgotMessage('✅ Password reset link has been sent to your email.');
    }
  };

  const inputStyles =
    'w-full border border-white placeholder-gray-300 p-2 rounded text-white bg-transparent';

  return (
    <div>
      {!forgotMode ? (
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={inputStyles}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className={inputStyles}
          />

          {error && <div className="text-red-400 text-sm text-center">{error}</div>}

          <div
            className="text-sm text-gray-300 mb-2 cursor-pointer hover:underline text-right"
            onClick={() => {
              setForgotMode(true);
              setForgotMessage('');
              setError('');
            }}
          >
            Forgot Password?
          </div>

          <button
            type="submit"
            className="w-full text-white border-2 border-white hover:bg-white hover:text-black rounded-[5px] p-2 transition"
          >
            Sign In
          </button>
        </form>
      ) : (
        <form onSubmit={handleForgotSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={inputStyles}
          />
          <button
            type="submit"
            className="w-full text-white border-2 border-white hover:bg-white hover:text-black rounded-[5px] p-2 transition"
          >
            Send Reset Link
          </button>

          {forgotMessage && (
            <div className="text-green-400 text-sm text-center">{forgotMessage}</div>
          )}

          <div
            className="text-sm text-gray-300 mt-2 cursor-pointer hover:underline text-center"
            onClick={() => {
              setForgotMode(false);
              setForgotMessage('');
            }}
          >
            ← Back to Login
          </div>
        </form>
      )}
    </div>
  );
}
