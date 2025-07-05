'use client';
import { useState } from 'react';

export default function RegistrationForm({ onSuccess }: { onSuccess: () => void }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState('');

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError('❌ Passwords do not match');
      return;
    }

    // Simulate saving user info to localStorage or database
    localStorage.setItem('username', formData.email.split('@')[0]);
    setError('');
    onSuccess(); // 🔁 switch to login or redirect
  };

  const inputStyles =
    'w-full border border-white placeholder-gray-300 p-2 rounded text-white bg-transparent';

  return (
    <form onSubmit={handleRegister} className="space-y-4">
      <input
        type="text"
        placeholder="Name"
        required
        className={inputStyles}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      />
      <input
        type="email"
        placeholder="Email"
        required
        className={inputStyles}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      />
      <input
        type="tel"
        placeholder="Phone"
        required
        className={inputStyles}
        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        required
        className={inputStyles}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
      />
      <input
        type="password"
        placeholder="Confirm Password"
        required
        className={inputStyles}
        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
      />

      {error && <div className="text-red-400 text-sm text-center">{error}</div>}

      <button
        type="submit"
        className="w-full p-2 rounded-[5px] border-2 border-white text-white bg-black hover:bg-white hover:text-black hover:shadow-md transition"
      >
        Register
      </button>
    </form>
  );
}
