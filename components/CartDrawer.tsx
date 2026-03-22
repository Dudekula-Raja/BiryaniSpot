'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useLanguage } from '@/context/LanguageContext';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function CartDrawer() {
  const { items, isOpen, setIsOpen, updateQuantity, removeItem, clearCart, totalPrice, totalItems } = useCart();
  const { t, isRTL } = useLanguage();
  const { data: session } = useSession();
  const user = session?.user;
  const isAuthenticated = !!session;
  const router = useRouter();
  const [isCheckingOut, setIsCheckingOut] = React.useState(false);

  const deliveryFee = totalPrice > 30 ? 0 : 2.99;
  const grandTotal = totalPrice + deliveryFee;

  const handleCheckout = async () => {
    if (!isAuthenticated || !user) {
      alert('Please sign in to place an order.');
      setIsOpen(false);
      router.push('/auth');
      return;
    }

    setIsCheckingOut(true);

    try {
      const orderData = {
        userId: user.id,
        restaurantId: 'RES-001',
        items: items.map(i => ({ id: i.id, nameEn: i.nameEn, price: i.price, quantity: i.quantity })),
        subtotal: totalPrice,
        deliveryFee,
        total: grandTotal,
        paymentMethod: 'COD', // Mocking Cash on Delivery by default
        paymentStatus: 'PENDING',
        deliveryAddress: user.addresses?.[0]?.address || 'Default Address',
      };

      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      });

      if (res.ok) {
        clearCart();
        setIsOpen(false);
        router.push('/user'); // Redirect to user dashboard to see order
      } else {
        alert('Failed to place order. Try again.');
      }
    } catch (err: unknown) {
      console.error(err);
      alert('Network error. Failed to place order.');
    } finally {
      setIsCheckingOut(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: isRTL ? '-100%' : '100%' }}
            animate={{ x: 0 }}
            exit={{ x: isRTL ? '-100%' : '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className={`fixed top-0 ${isRTL ? 'left-0' : 'right-0'} h-full w-full max-w-md bg-gray-950 border-${isRTL ? 'r' : 'l'} border-gray-800 z-50 flex flex-col shadow-2xl`}
            dir={isRTL ? 'rtl' : 'ltr'}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-500/20 border border-orange-500/30 rounded-xl flex items-center justify-center">
                  <ShoppingBag size={18} className="text-orange-400" />
                </div>
                <div>
                  <h2 className="text-white font-black text-lg">{t.cart.title}</h2>
                  <p className="text-gray-500 text-xs">{totalItems} {t.cart.items}</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white p-2 rounded-xl hover:bg-gray-800 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Cart items */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center gap-4">
                  <div className="text-7xl opacity-50">🛒</div>
                  <div>
                    <p className="text-white font-bold text-lg mb-1">{t.cart.empty}</p>
                    <p className="text-gray-500 text-sm">{t.cart.emptyDesc}</p>
                  </div>
                </div>
              ) : (
                items.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, x: isRTL ? -20 : 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: isRTL ? -20 : 20 }}
                    className="flex gap-3 bg-gray-900 border border-gray-800 rounded-2xl p-3"
                  >
                    <img
                      src={item.image}
                      alt={item.nameEn}
                      className="w-16 h-16 rounded-xl object-cover flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-white font-semibold text-sm truncate mb-1">
                        {item.nameEn}
                      </h4>
                      <p className="text-orange-400 font-black text-base">${(item.price * item.quantity).toFixed(2)}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="w-7 h-7 bg-gray-800 hover:bg-gray-700 text-white rounded-lg flex items-center justify-center transition-colors"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="text-white font-bold text-sm w-5 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="w-7 h-7 bg-orange-500 hover:bg-orange-600 text-white rounded-lg flex items-center justify-center transition-colors"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-gray-600 hover:text-red-400 p-1 transition-colors self-start"
                    >
                      <Trash2 size={15} />
                    </button>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-6 border-t border-gray-800 space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">{t.cart.subtotal}</span>
                    <span className="text-white font-semibold">KD {totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">{t.cart.delivery}</span>
                    <span className={deliveryFee === 0 ? 'text-green-400 font-semibold' : 'text-white font-semibold'}>
                      {deliveryFee === 0 ? t.cart.free : `KD ${deliveryFee.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="flex items-center justify-between border-t border-gray-800 pt-2">
                    <span className="text-white font-bold">{t.cart.total}</span>
                    <span className="text-orange-400 font-black text-xl">KD {grandTotal.toFixed(2)}</span>
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-black py-4 rounded-2xl transition-all duration-300 hover:scale-[1.02] shadow-xl hover:shadow-orange-500/30 text-lg disabled:opacity-70 disabled:hover:scale-100"
                  id="place-order-btn"
                >
                  {isCheckingOut ? (
                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>{t.cart.placeOrder} 🎉</>
                  )}
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
