'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { Instagram, Twitter, Facebook, Youtube, MapPin, Phone, Mail, Clock } from 'lucide-react';

export default function Footer() {
  const { t, isRTL } = useLanguage();

  return (
    <footer className="bg-gray-950 border-t border-gray-800">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 ${isRTL ? 'text-right' : 'text-left'}`}>
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className={`flex items-center gap-3 mb-4 ${isRTL ? 'justify-end' : 'justify-start'}`}>
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center text-2xl shadow-lg">
                🍚
              </div>
              <div>
                <p className="text-white font-black text-lg">
                  Biryani <span className="text-orange-400">Spot</span>
                </p>
                <p className="text-gray-500 text-xs uppercase tracking-widest">Restaurant</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">{t.footer.tagline}</p>
            <div className={`flex gap-3 ${isRTL ? 'justify-end' : 'justify-start'}`}>
              {[
                { Icon: Instagram, color: 'hover:text-pink-400' },
                { Icon: Twitter, color: 'hover:text-sky-400' },
                { Icon: Facebook, color: 'hover:text-blue-400' },
                { Icon: Youtube, color: 'hover:text-red-400' },
              ].map(({ Icon, color }, i) => (
                <button
                  key={i}
                  className={`w-10 h-10 bg-gray-800 border border-gray-700 hover:border-gray-600 rounded-xl flex items-center justify-center text-gray-400 ${color} transition-all duration-300 hover:scale-110`}
                >
                  <Icon size={16} />
                </button>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-5">{t.footer.quickLinks}</h4>
            <ul className="space-y-3">
              {[
                { href: '/', label: t.nav.home },
                { href: '/menu', label: t.nav.menu },
                { href: '/track', label: t.nav.track },
                { href: '/about', label: t.nav.about },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-orange-400 text-sm transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 bg-orange-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-5">{t.about.hours}</h4>
            <div className={`flex items-start gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <Clock size={16} className="text-orange-400 mt-0.5 flex-shrink-0" />
              <p className="text-gray-400 text-sm leading-relaxed">{t.about.hoursTime}</p>
            </div>
            <div className="mt-6 bg-green-500/10 border border-green-500/20 rounded-xl px-4 py-3">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-green-400 font-semibold text-sm">Now Open</span>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-5">{t.footer.contact}</h4>
            <ul className="space-y-3">
              {[
                { Icon: MapPin, text: t.about.address },
                { Icon: Phone, text: t.about.phone },
                { Icon: Mail, text: t.about.email },
              ].map(({ Icon, text }, i) => (
                <li key={i} className={`flex items-start gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <Icon size={15} className="text-orange-400 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-400 text-sm leading-relaxed">{text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800 px-4 py-5">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-gray-600 text-xs">
          <p>{t.footer.rights}</p>
          <p>{t.footer.madeWith}</p>
        </div>
      </div>
    </footer>
  );
}
