'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Star, Flame, Plus, Leaf } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useCart } from '@/context/CartContext';
import { MenuItem } from '@/data/menu';
import Link from 'next/link';

export default function FeaturedDishes() {
  const { t, lang } = useLanguage();
  const { addItem } = useCart();
  const [featured, setFeatured] = React.useState<MenuItem[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    fetch('/api/menu')
      .then((res) => res.json())
      .then((data: MenuItem[]) => {
        setFeatured(data.filter((item) => item.isBestseller).slice(0, 6));
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
      });
  }, []);

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-gray-950 to-gray-900">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-end justify-between mb-10"
        >
          <div>
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-2">{t.featured.title}</h2>
            <p className="text-gray-400 text-lg">{t.featured.subtitle}</p>
          </div>
          <Link
            href="/menu"
            className="text-orange-400 hover:text-orange-300 font-semibold text-sm border border-orange-500/30 hover:border-orange-500/70 px-4 py-2 rounded-full transition-all"
          >
            {t.viewAll} →
          </Link>
        </motion.div>

        {/* Dishes grid */}
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="w-12 h-12 border-4 border-orange-500/20 border-t-orange-500 rounded-full animate-spin"></div>
          </div>
        ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative bg-gray-900 border border-gray-800 hover:border-orange-500/40 rounded-3xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-orange-500/10 hover:-translate-y-1"
            >
              {/* Image */}
              <div className="relative h-52 overflow-hidden">
                <img
                  src={item.image}
                  alt={`${item.nameEn} | ${item.nameAr}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />

                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-2">
                  {item.isBestseller && (
                    <span className="bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                      🏆 {t.featured.badge}
                    </span>
                  )}
                  {item.badge && !item.isBestseller && (
                    <span className="bg-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </div>

                {/* Veg indicator */}
                <div className="absolute top-3 right-3">
                  <div
                    className={`w-6 h-6 border-2 ${item.isVeg ? 'border-green-500 bg-green-500/20' : 'border-red-500 bg-red-500/20'} rounded-sm flex items-center justify-center`}
                  >
                    <div className={`w-2.5 h-2.5 rounded-full ${item.isVeg ? 'bg-green-500' : 'bg-red-500'}`} />
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="text-white font-bold text-lg leading-tight group-hover:text-orange-300 transition-colors">
                    {item.nameEn} | {item.nameAr}
                  </h3>
                  {item.isSpicy && (
                    <span className="flex items-center gap-1 text-red-400 text-xs font-semibold whitespace-nowrap">
                      <Flame size={12} /> Spicy
                    </span>
                  )}
                </div>

                <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-2">
                  {item.descriptionEn} | {item.descriptionAr}
                </p>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-1.5 mb-1">
                      <div className="flex items-center gap-1 bg-green-600/20 border border-green-600/30 px-2 py-0.5 rounded-full">
                        <Star size={11} className="fill-green-400 text-green-400" />
                        <span className="text-green-400 font-bold text-xs">{item.rating}</span>
                      </div>
                      <span className="text-gray-600 text-xs">({item.reviews.toLocaleString()})</span>
                    </div>
                    <span className="text-white font-black text-xl">KD {item.price.toFixed(2)}</span>
                  </div>

                  <button
                    onClick={() => addItem(item)}
                    className="flex items-center gap-1.5 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold px-4 py-2.5 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-orange-500/30"
                    id={`add-to-cart-${item.id}`}
                  >
                    <Plus size={16} />
                    {t.menu.addToCart}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        )}
      </div>
    </section>
  );
}
