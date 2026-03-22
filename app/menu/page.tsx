'use client';

import React from 'react';
import MenuSection from '@/components/MenuSection';
import { useLanguage } from '@/context/LanguageContext';
import { motion } from 'framer-motion';
import { useSession } from 'next-auth/react';
import { Plus } from 'lucide-react';
import Link from 'next/link';

export default function MenuPage() {
  const { t } = useLanguage();
  const { data: session } = useSession();
  const isAdmin = session?.user?.role === 'ADMIN';

  return (
    <div className="min-h-screen bg-gray-950 pt-20">
      {/* Page header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-950 to-gray-900 border-b border-gray-800">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-orange-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-red-500/5 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 py-12 flex flex-col items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <span className="inline-block text-4xl mb-3">🍽️</span>
            <div className="flex items-center justify-center gap-4 mb-3">
              <h1 className="text-4xl sm:text-5xl font-black text-white">{t.menu.title}</h1>
              {isAdmin && (
                <Link 
                  href="/admin" 
                  className="hidden sm:flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-xl font-bold transition-all shadow-lg hover:shadow-orange-500/20"
                >
                  <Plus size={18} /> Add Menu
                </Link>
              )}
            </div>
            <p className="text-gray-400 text-lg mb-4">{t.menu.subtitle}</p>
            {isAdmin && (
               <Link 
                  href="/admin" 
                  className="sm:hidden inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-xl font-bold transition-all shadow-lg hover:shadow-orange-500/20 mb-2"
                >
                  <Plus size={18} /> Add Menu
               </Link>
            )}
          </motion.div>
        </div>
      </div>

      <MenuSection />
    </div>
  );
}
