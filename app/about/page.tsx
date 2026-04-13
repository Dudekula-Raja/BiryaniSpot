'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, ChefHat, Heart, Users, Award } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function AboutPage() {
  const { t, isRTL } = useLanguage();

  const stats = [
    { icon: ChefHat, value: '50+', labelEn: 'Menu Items', labelAr: 'صنف في القائمة' },
    { icon: Users, value: '50K+', labelEn: 'Happy Customers', labelAr: 'عميل سعيد' },
    { icon: Award, value: '4.9★', labelEn: 'Average Rating', labelAr: 'متوسط التقييم' },
    { icon: Heart, value: '14+', labelEn: 'Years of Love', labelAr: 'سنة من الشغف' },
  ];

  return (
    <div className="min-h-screen bg-gray-950 pt-20" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 to-gray-950 border-b border-gray-800 py-20 px-4">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-72 h-72 bg-orange-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-56 h-56 bg-red-500/5 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <div className="text-6xl mb-4">🍚</div>
            <h1 className="text-4xl sm:text-5xl font-black text-white mb-4">{t.about.title}</h1>
            <p className="text-gray-400 text-lg leading-relaxed max-w-2xl mx-auto">{t.about.storyText}</p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 px-4 bg-gray-950">
        <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-5">
          {stats.map(({ icon: Icon, value, labelEn, labelAr }, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-gray-900 border border-gray-800 rounded-2xl p-6 text-center hover:border-orange-500/30 transition-colors"
            >
              <Icon size={24} className="text-orange-400 mx-auto mb-2" />
              <div className="text-3xl font-black text-white mb-1">{value}</div>
              <div className="text-gray-500 text-sm">{isRTL ? labelAr : labelEn}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Story + Mission */}
      <section className="py-16 px-4 bg-gray-900">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10">
          <motion.div
            initial={{ opacity: 0, x: isRTL ? 30 : -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-gray-950 border border-gray-800 rounded-3xl p-8"
          >
            <div className="text-4xl mb-4">📖</div>
            <h2 className="text-2xl font-black text-white mb-4">{t.about.story}</h2>
            <p className="text-gray-400 leading-relaxed">{t.about.storyText}</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: isRTL ? -30 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-gray-950 border border-gray-800 rounded-3xl p-8"
          >
            <div className="text-4xl mb-4">🎯</div>
            <h2 className="text-2xl font-black text-white mb-4">{t.about.mission}</h2>
            <p className="text-gray-400 leading-relaxed">{t.about.missionText}</p>
          </motion.div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-16 px-4 bg-gray-950">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl font-black text-white mb-2">{t.about.contact}</h2>
          </motion.div>

          <div className="grid sm:grid-cols-3 gap-5">
            {[
              { Icon: MapPin, text: t.about.address, label: 'Address / العنوان' },
              { Icon: Phone, text: t.about.phone, label: 'Phone / الهاتف' },
              { Icon: Mail, text: t.about.email, label: 'Email / البريد' },
            ].map(({ Icon, text, label }, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-gray-900 border border-gray-800 hover:border-orange-500/30 rounded-2xl p-6 text-center transition-colors"
              >
                <Icon size={24} className="text-orange-400 mx-auto mb-3" />
                <p className="text-gray-500 text-xs mb-2 uppercase tracking-wide">{label}</p>
                <p className="text-white font-semibold text-sm leading-relaxed">{text}</p>
              </motion.div>
            ))}
          </div>

          {/* Hours */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-5 bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Clock size={24} className="text-orange-400" />
            <div className={isRTL ? 'text-right' : 'text-left'}>
              <p className="text-white font-bold">{t.about.hours}</p>
              <p className="text-gray-400">{t.about.hoursTime}</p>
            </div>
            <div className="flex items-center gap-2 bg-green-500/10 border border-green-500/20 px-4 py-2 rounded-full">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-green-400 font-semibold text-sm">Open Now</span>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
