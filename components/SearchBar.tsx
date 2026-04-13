'use client';

import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

const suggestions = [
  { en: 'Hyderabadi Biryani', ar: 'برياني حيدر آباد', icon: '🍚' },
  { en: 'Chicken Tikka', ar: 'تكا دجاج', icon: '🍗' },
  { en: 'Butter Chicken', ar: 'دجاج بالزبدة', icon: '🍲' },
  { en: 'Seekh Kebab', ar: 'كباب سيخ', icon: '🍢' },
  { en: 'Mango Lassi', ar: 'لاسي المانجو', icon: '🥤' },
  { en: 'Gulab Jamun', ar: 'غولاب جامون', icon: '🍮' },
];

export default function SearchBar() {
  const { t, lang, isRTL } = useLanguage();
  const [query, setQuery] = useState('');
  const [focused, setFocused] = useState(false);
  const router = useRouter();

  const filtered = query.length > 0
    ? suggestions.filter((s) =>
        s.en.toLowerCase().includes(query.toLowerCase()) ||
        s.ar.includes(query)
      )
    : suggestions;

  return (
    <section className="relative z-30 -mt-16 pb-8">
      <div className="max-w-3xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="relative"
        >
          {/* Search box */}
          <div
            className={`flex items-center gap-3 bg-white rounded-2xl shadow-2xl shadow-black/40 px-5 py-4 border-2 transition-all duration-300 ${
              focused ? 'border-orange-500 shadow-orange-500/20' : 'border-transparent'
            }`}
          >
            <Search className="text-orange-500 flex-shrink-0" size={22} />
            <input
              type="text"
              placeholder={t.search.placeholder}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setTimeout(() => setFocused(false), 200)}
              dir={isRTL ? 'rtl' : 'ltr'}
              className={`flex-1 text-gray-800 font-medium text-base outline-none bg-transparent placeholder-gray-400 ${isRTL ? 'text-right' : 'text-left'}`}
              id="main-search"
            />
            <button
              onClick={() => router.push('/menu')}
              className="bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold px-6 py-2 rounded-xl hover:from-orange-600 hover:to-red-600 transition-all duration-300 hover:scale-105 text-sm whitespace-nowrap"
            >
              {t.search.button}
            </button>
          </div>

          {/* Dropdown suggestions */}
          {focused && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl shadow-black/30 border border-gray-100 overflow-hidden z-50"
            >
              <div className="p-2">
                {filtered.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => { setQuery(`${s.en} | ${s.ar}`); router.push('/menu'); }}
                    className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-orange-50 rounded-xl transition-colors text-left ${isRTL ? 'flex-row-reverse text-right' : ''}`}
                  >
                    <span className="text-xl">{s.icon}</span>
                    <span className="text-gray-700 font-medium">{s.en} | {s.ar}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
