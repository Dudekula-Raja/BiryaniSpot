'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Star, Clock, ChevronDown } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function HeroBanner() {
  const { t, isRTL } = useLanguage();

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gray-950">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950" />
        {/* Animated orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-red-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-600/5 rounded-full blur-3xl" />
        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `linear-gradient(rgba(249,115,22,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(249,115,22,0.3) 1px, transparent 1px)`,
            backgroundSize: '80px 80px',
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className={isRTL ? 'text-right' : 'text-left'}>
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/30 text-orange-400 px-4 py-2 rounded-full text-sm font-semibold mb-6"
            >
              <Star size={14} className="fill-orange-400 text-orange-400" />
              {t.hero.badge}
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-tight mb-4"
            >
              {t.hero.title}
              <br />
              <span className="bg-gradient-to-r from-orange-400 via-red-400 to-pink-400 bg-clip-text text-transparent">
                {t.hero.restaurant}
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-orange-300 font-semibold mb-4 italic"
            >
              {t.hero.subtitle}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-gray-400 text-lg leading-relaxed mb-8 max-w-xl"
            >
              {t.hero.description}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className={`flex flex-wrap gap-4 mb-12 ${isRTL ? 'justify-end' : 'justify-start'}`}
            >
              <Link
                href="/menu"
                id="hero-order-btn"
                className="group flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold px-8 py-4 rounded-full shadow-xl hover:shadow-orange-500/30 transition-all duration-300 hover:scale-105 text-lg"
              >
                {t.hero.orderNow}
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/menu"
                className="flex items-center gap-2 border-2 border-gray-700 hover:border-orange-500/70 text-gray-300 hover:text-white font-bold px-8 py-4 rounded-full transition-all duration-300 hover:scale-105 text-lg"
              >
                {t.hero.viewMenu}
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-4"
            >
              {[
                { value: t.hero.stats.dishes, label: t.hero.stats.dishesLabel, icon: '🍽️' },
                { value: t.hero.stats.rating, label: t.hero.stats.ratingLabel, icon: '⭐' },
                { value: t.hero.stats.delivery, label: t.hero.stats.deliveryLabel, icon: '⚡' },
                { value: t.hero.stats.customers, label: t.hero.stats.customersLabel, icon: '❤️' },
              ].map((stat, i) => (
                <div key={i} className="bg-gray-900/60 border border-gray-800 rounded-2xl p-4 text-center hover:border-orange-500/30 transition-colors">
                  <div className="text-2xl mb-1">{stat.icon}</div>
                  <div className="text-white font-black text-lg">{stat.value}</div>
                  <div className="text-gray-500 text-xs font-medium">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right - Food Display */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.9, delay: 0.2, type: 'spring' }}
            className="hidden lg:flex items-center justify-center relative"
          >
            <div className="relative w-96 h-96">
              {/* Rotating ring */}
              <div className="absolute inset-0 border-2 border-dashed border-orange-500/20 rounded-full animate-spin" style={{ animationDuration: '20s' }} />
              <div className="absolute inset-4 border-2 border-dashed border-red-500/10 rounded-full animate-spin" style={{ animationDuration: '15s', animationDirection: 'reverse' }} />

              {/* Main plate */}
              <div className="absolute inset-8 bg-gradient-to-br from-gray-800 to-gray-900 rounded-full shadow-2xl flex items-center justify-center border border-gray-700 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&h=400&fit=crop"
                  alt="Hyderabadi Biryani"
                  className="w-full h-full object-cover opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent" />
              </div>

              {/* Floating badges */}
              <motion.div
                animate={{ y: [-8, 8, -8] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-4 left-8 bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg"
              >
                🏆 #1 Bestseller
              </motion.div>
              <motion.div
                animate={{ y: [8, -8, 8] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -bottom-2 right-4 bg-gray-900 border border-gray-700 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg flex items-center gap-2"
              >
                <Clock size={14} className="text-orange-400" />
                <span>30 min</span>
              </motion.div>
              <motion.div
                animate={{ y: [5, -5, 5] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute top-12 -right-6 bg-green-500/20 border border-green-500/40 text-green-400 px-3 py-1.5 rounded-full text-xs font-bold shadow"
              >
                ⭐ 4.9
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-600"
      >
        <span className="text-xs uppercase tracking-widest">Scroll</span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
          <ChevronDown size={20} />
        </motion.div>
      </motion.div>
    </section>
  );
}
