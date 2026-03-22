'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { categories } from '@/data/menu';
import Link from 'next/link';

export default function CategoryCards() {
  const { t, lang } = useLanguage();

  return (
    <section className="py-16 px-4 bg-gray-950">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-3">
            {t.categories.title}
          </h2>
          <p className="text-gray-400 text-lg">{t.categories.subtitle}</p>
        </motion.div>

        {/* Category grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-4">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
            >
              <Link
                href={`/menu?category=${cat.id}`}
                className="group flex flex-col items-center gap-3 p-4 rounded-2xl bg-gray-900 border border-gray-800 hover:border-orange-500/50 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-orange-500/10 cursor-pointer"
              >
                {/* Icon bubble */}
                <div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${cat.color} flex items-center justify-center text-3xl shadow-lg group-hover:scale-110 transition-transform duration-300`}
                >
                  {cat.icon}
                </div>
                <span className="text-white font-bold text-lg group-hover:text-orange-400 transition-colors">
                  {cat.nameEn} | {cat.nameAr}
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
