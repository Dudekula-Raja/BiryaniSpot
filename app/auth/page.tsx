'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AuthPage() {
  const { isRTL } = useLanguage();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });

    setLoading(false);

    if (result?.error) {
      setError('Invalid email or password. Please try again.');
    } else {
      // Fetch session to know role for redirect
      const res = await fetch('/api/auth/session');
      const session = await res.json();
      const role = session?.user?.role;

      if (role === 'ADMIN') {
        router.push('/admin');
      } else if (role === 'DELIVERY_PARTNER') {
        router.push('/partner');
      } else {
        router.push('/');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Background patterns */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl opacity-50" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-3xl opacity-50" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-gray-900 border border-gray-800 rounded-3xl overflow-hidden shadow-2xl relative z-10"
      >
        <div className="p-8">
          <div className="text-center mb-8">
            <Link href="/" className="inline-block text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500 mb-2 hover:scale-105 transition-transform">
              🍚 Biryani Spot
            </Link>
            <h1 className="text-2xl font-bold text-white mb-2">Welcome Back!</h1>
            <p className="text-gray-400">Sign in to access your platform.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter your email"
                className="w-full bg-gray-800 border border-gray-700 text-white placeholder-gray-500 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter your password"
                className="w-full bg-gray-800 border border-gray-700 text-white placeholder-gray-500 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500 transition-colors"
              />
            </div>

            {error && (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-400 text-sm text-center bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-2"
              >
                {error}
              </motion.p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-3.5 rounded-xl shadow-lg transition-all disabled:opacity-60"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                'Sign In'
              )}
            </button>

            <p className="text-center text-gray-500 text-sm mt-4">For Administrators, Riders, and Customers</p>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
