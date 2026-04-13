'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { offers } from '@/data/menu';

export default function OffersCarousel() {
  const { t, lang } = useLanguage();

  return (
    <section className="py-16 px-4 bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-3">{t.offers.title}</h2>
          <p className="text-gray-400 text-lg">{t.offers.subtitle}</p>
        </motion.div>

        <div className="grid sm:grid-cols-3 gap-6">
          {offers.map((offer, i) => (
            <motion.div
              key={offer.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className={`relative overflow-hidden bg-gradient-to-br ${offer.bg} rounded-3xl p-8 cursor-pointer group hover:scale-105 transition-all duration-500 shadow-xl`}
            >
              {/* Background decoration */}
              <div className="absolute -top-8 -right-8 w-36 h-36 bg-white/10 rounded-full" />
              <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-white/5 rounded-full" />

              <div className="relative z-10">
                <div className="text-5xl mb-4">{offer.icon}</div>
                <h3 className="text-white font-black text-2xl mb-1">
                  {offer.titleEn} | {offer.titleAr}
                </h3>
                <p className="text-orange-100/90 text-sm font-medium">
                  {offer.subtitleEn} | {offer.subtitleAr}
                </p>
                <button className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white font-bold px-5 py-2.5 rounded-full transition-all duration-300 text-sm border border-white/20">
                  {t.offers.grab} →
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
