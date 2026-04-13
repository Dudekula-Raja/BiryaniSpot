import type { Metadata } from 'next';
import { Inter, Cairo } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import { LanguageProvider } from '@/context/LanguageContext';
import { Providers } from '@/components/Providers';
import Navbar from '@/components/Navbar';
import CartDrawer from '@/components/CartDrawer';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const cairo = Cairo({ subsets: ['arabic'], variable: '--font-cairo' });

export const metadata: Metadata = {
  title: 'Biryani Spot Restaurant | Authentic Biryani & Kebabs',
  description:
    'Experience the finest Hyderabadi biryani and kebabs at Biryani Spot Restaurant. Order online for delivery or dine-in. Now available in English & Arabic.',
  keywords: 'biryani, hyderabadi biryani, kebab, restaurant, food delivery, indian food',
  openGraph: {
    title: 'Biryani Spot Restaurant',
    description: 'Authentic Flavours, Royal Experience',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${cairo.variable} bg-gray-950 text-white antialiased`}>
        <Providers>
          <LanguageProvider>
            <CartProvider>
              <Navbar />
              <main>{children}</main>
              <CartDrawer />
              <Footer />
            </CartProvider>
          </LanguageProvider>
        </Providers>
      </body>
    </html>
  );
}
