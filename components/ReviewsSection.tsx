'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { reviews } from '@/data/menu';

export default function ReviewsSection() {
  const { t, lang, isRTL } = useLanguage();

  return (
    <section className="py-16 px-4 bg-gray-950">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-3">{t.reviews.title}</h2>
          <p className="text-gray-400 text-lg">{t.reviews.subtitle}</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {reviews.map((review, i) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`bg-gray-900 border border-gray-800 hover:border-orange-500/30 rounded-3xl p-6 transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/5 ${isRTL ? 'text-right' : 'text-left'}`}
            >
              {/* Stars */}
              <div className={`flex gap-1 mb-4 ${isRTL ? 'justify-end' : 'justify-start'}`}>
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star
                    key={j}
                    size={14}
                    className={j < review.rating ? 'fill-orange-400 text-orange-400' : 'text-gray-700'}
                  />
                ))}
              </div>

              {/* Comment */}
              <p className="text-gray-300 text-sm leading-relaxed mb-5 italic">
                &ldquo;{review.commentEn} | {review.commentAr}&rdquo;
              </p>

              {/* Reviewer */}
              <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center text-lg flex-shrink-0">
                  {review.avatar}
                </div>
                <div>
                  <p className="text-white font-bold text-sm">
                    {review.nameEn} | {review.nameAr}
                  </p>
                  <p className="text-gray-600 text-xs">
                    {review.date} | {review.dateAr}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
