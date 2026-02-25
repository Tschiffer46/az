'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 500));
    const success = login(username, password);
    setIsLoading(false);
    if (success) {
      const user = { username, role: username === 'admin' ? 'az-staff' : 'club-admin' };
      if (user.role === 'az-staff') {
        router.push('/dashboard');
      } else {
        router.push('/dashboard/club');
      }
    } else {
      setError('Fel användarnamn eller lösenord');
    }
  };

  return (
    <div className="min-h-screen bg-[#1a3a6b] flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#e8c232] text-[#1a3a6b] font-black text-2xl mb-4 shadow-lg">
            Az
          </div>
          <h1 className="text-white text-2xl font-bold">Az Dashboard</h1>
          <p className="text-white/60 text-sm mt-1">Club Commerce Platform</p>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-2xl">
          <h2 className="text-gray-900 font-bold text-xl mb-5">Logga in</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-medium text-gray-600 block mb-1">Användarnamn</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin"
                autoComplete="username"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#1a3a6b] transition-colors"
                required
              />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-600 block mb-1">Lösenord</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                autoComplete="current-password"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#1a3a6b] transition-colors"
                required
              />
            </div>

            {error && (
              <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-xl">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#1a3a6b] text-white py-3.5 rounded-xl font-bold text-sm hover:bg-[#152f58] transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Loggar in...
                </>
              ) : (
                'Logga in'
              )}
            </button>
          </form>

          <div className="mt-5 pt-4 border-t border-gray-100">
            <p className="text-xs text-gray-400 text-center mb-2">Demokonton:</p>
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-gray-50 rounded-xl p-2 text-center">
                <p className="text-xs font-medium text-gray-600">Az Staff</p>
                <p className="text-xs text-gray-400">admin / admin123</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-2 text-center">
                <p className="text-xs font-medium text-gray-600">UIF Admin</p>
                <p className="text-xs text-gray-400">uif-admin / uif123</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
