'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Circle, Clock, MapPin, Phone } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const STEPS = [
  { key: 'placed', icon: '📋' },
  { key: 'confirmed', icon: '✅' },
  { key: 'preparing', icon: '👨‍🍳' },
  { key: 'delivery', icon: '🛵' },
  { key: 'delivered', icon: '🎉' },
];

export default function TrackPage() {
  const { t, isRTL } = useLanguage();
  const [activeStep, setActiveStep] = useState(2);

  // Simulate order progression
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev < 4 ? prev + 1 : prev));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const stepKeys = ['placed', 'confirmed', 'preparing', 'delivery', 'delivered'] as const;

  return (
    <div className="min-h-screen bg-gray-950 pt-24 pb-16 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="text-6xl mb-4">🛵</div>
          <h1 className="text-3xl sm:text-4xl font-black text-white mb-2">{t.track.title}</h1>
          <p className="text-gray-400 text-lg mb-4">{t.track.subtitle}</p>
          <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/30 px-4 py-2 rounded-full">
            <span className="text-gray-400 text-sm">{t.track.orderId}:</span>
            <span className="text-orange-400 font-black text-sm">#BSR-2024-0042</span>
          </div>
        </motion.div>

        {/* Progress timeline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gray-900 border border-gray-800 rounded-3xl p-8 mb-6"
          dir={isRTL ? 'rtl' : 'ltr'}
        >
          <div className="relative">
            {STEPS.map((step, i) => {
              const done = i < activeStep;
              const current = i === activeStep;
              const stepKey = stepKeys[i];

              return (
                <div key={step.key} className={`flex gap-5 ${i < STEPS.length - 1 ? 'mb-8' : ''} ${isRTL ? 'flex-row-reverse' : ''}`}>
                  {/* Timeline line + icon */}
                  <div className="flex flex-col items-center">
                    <motion.div
                      animate={current ? { scale: [1, 1.2, 1] } : {}}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className={`w-12 h-12 rounded-full border-2 flex items-center justify-center text-xl transition-all duration-500 ${
                        done
                          ? 'bg-green-500 border-green-500 text-white shadow-lg shadow-green-500/30'
                          : current
                          ? 'bg-orange-500 border-orange-500 text-white shadow-lg shadow-orange-500/30'
                          : 'bg-gray-800 border-gray-700 text-gray-600'
                      }`}
                    >
                      {done ? <CheckCircle size={22} className="text-white" /> : step.icon}
                    </motion.div>
                    {i < STEPS.length - 1 && (
                      <div
                        className={`w-0.5 h-14 mt-2 transition-all duration-700 ${
                          done ? 'bg-green-500' : 'bg-gray-800'
                        }`}
                      />
                    )}
                  </div>

                  {/* Content */}
                  <div className={`flex-1 pt-3 ${isRTL ? 'text-right' : 'text-left'}`}>
                    <h3
                      className={`font-bold text-base transition-colors ${
                        done ? 'text-green-400' : current ? 'text-orange-400' : 'text-gray-600'
                      }`}
                    >
                      {t.track.steps[stepKey as keyof typeof t.track.steps]}
                    </h3>
                    {current && (
                      <p className="text-gray-400 text-sm mt-0.5">
                        {t.track.steps[`${stepKey}Desc` as keyof typeof t.track.steps]}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Delivery info cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-2 gap-4"
        >
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5 flex flex-col items-center text-center gap-2">
            <Clock size={22} className="text-orange-400" />
            <p className="text-gray-400 text-xs">Estimated Time</p>
            <p className="text-white font-black text-2xl">12 min</p>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5 flex flex-col items-center text-center gap-2">
            <MapPin size={22} className="text-orange-400" />
            <p className="text-gray-400 text-xs">Delivering To</p>
            <p className="text-white font-bold text-sm text-center">123 Main St, NY</p>
          </div>
        </motion.div>

        {/* Rider contact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-4 bg-gray-900 border border-gray-800 rounded-2xl p-5 flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center text-xl">
              🛵
            </div>
            <div>
              <p className="text-white font-bold text-sm">Rajan Kumar</p>
              <p className="text-gray-500 text-xs">Your Delivery Rider</p>
            </div>
          </div>
          <button className="flex items-center gap-2 bg-green-500/20 border border-green-500/40 text-green-400 px-4 py-2 rounded-xl text-sm font-semibold hover:bg-green-500/30 transition-colors">
            <Phone size={14} />
            Call
          </button>
        </motion.div>
      </div>
    </div>
  );
}
