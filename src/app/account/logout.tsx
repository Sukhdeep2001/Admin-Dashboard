'use client';
import { useRouter } from 'next/navigation';

export default function LogoutButton() {
  const router = useRouter();

  const logout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('username');
    router.push('/'); // ⬅️ Redirect to homepage after logout
  };

  return (
    <button
      onClick={logout}
      className="bg-red-500 text-white px-4 py-2 mt-4 rounded hover:bg-red-600 transition"
    >
      Log out
    </button>
  );
}
