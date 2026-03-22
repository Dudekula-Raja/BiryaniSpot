export interface MenuItem {
  id: number;
  nameEn: string;
  nameAr: string;
  descriptionEn: string;
  descriptionAr: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
  category: string;
  isVeg: boolean;
  isBestseller: boolean;
  isSpicy?: boolean;
  badge?: string;
}

export interface Category {
  id: string;
  nameEn: string;
  nameAr: string;
  icon: string;
  color: string;
}

export const categories: Category[] = [
  { id: 'breakfast', nameEn: 'Breakfast', nameAr: 'فطور', icon: '🍳', color: 'from-amber-400 to-orange-500' },
  { id: 'lunch', nameEn: 'Lunch', nameAr: 'غداء', icon: '🍱', color: 'from-orange-500 to-red-500' },
  { id: 'snacks', nameEn: 'Snacks', nameAr: 'وجبات خفيفة', icon: '🍟', color: 'from-yellow-400 to-orange-500' },
  { id: 'dinner', nameEn: 'Dinner', nameAr: 'عشاء', icon: '🍽️', color: 'from-red-500 to-stone-700' },
  { id: 'fruit_shakes', nameEn: 'Fruit Shakes', nameAr: 'مخفوق الفواكه', icon: '🥤', color: 'from-pink-400 to-purple-500' },
  { id: 'biryani', nameEn: 'Biryani', nameAr: 'برياني', icon: '🍚', color: 'from-orange-500 to-red-500' },
  { id: 'kebabs', nameEn: 'Kebabs', nameAr: 'كباب', icon: '🍢', color: 'from-red-500 to-pink-500' },
  { id: 'starters', nameEn: 'Starters', nameAr: 'مقبلات', icon: '🥗', color: 'from-green-500 to-teal-500' },
  { id: 'curries', nameEn: 'Curries', nameAr: 'كاري', icon: '🍲', color: 'from-yellow-500 to-orange-500' },
  { id: 'breads', nameEn: 'Breads', nameAr: 'خبز', icon: '🫓', color: 'from-amber-500 to-yellow-500' },
  { id: 'desserts', nameEn: 'Desserts', nameAr: 'حلويات', icon: '🍮', color: 'from-pink-500 to-rose-500' },
  { id: 'beverages', nameEn: 'Beverages', nameAr: 'مشروبات', icon: '🧃', color: 'from-blue-500 to-cyan-500' },
];



export const offers = [
  {
    id: 1,
    titleEn: '50% OFF on First Order',
    titleAr: '٥٠٪ خصم على الطلب الأول',
    subtitleEn: 'Use code BIRYANI50',
    subtitleAr: 'استخدم الكود BIRYANI50',
    bg: 'from-orange-500 to-red-600',
    icon: '🎉',
  },
  {
    id: 2,
    titleEn: 'Free Delivery',
    titleAr: 'توصيل مجاني',
    subtitleEn: 'On orders above KD 30',
    subtitleAr: 'على الطلبات فوق ٣٠ دولار',
    bg: 'from-purple-600 to-indigo-600',
    icon: '🛵',
  },
  {
    id: 3,
    titleEn: 'Weekend Special',
    titleAr: 'عرض نهاية الأسبوع',
    subtitleEn: 'Combo meals at flat 30% off',
    subtitleAr: 'وجبات كومبو بخصم ٣٠٪',
    bg: 'from-emerald-500 to-teal-600',
    icon: '🍽️',
  },
];

export const reviews = [
  {
    id: 1,
    nameEn: 'Ahmed Al-Rashid',
    nameAr: 'أحمد الراشد',
    rating: 5,
    commentEn: 'Best biryani I have ever had! The aroma is intoxicating and the meat is so tender. Will order again!',
    commentAr: 'أفضل برياني تناولته في حياتي! الرائحة مسكرة واللحم طري جداً. سأطلب مجدداً!',
    date: '2 days ago',
    dateAr: 'منذ يومين',
    avatar: '👨‍💼',
  },
  {
    id: 2,
    nameEn: 'Sarah Johnson',
    nameAr: 'سارة جونسون',
    rating: 5,
    commentEn: 'The Hyderabadi biryani is absolutely divine! Authentic flavours and generous portions.',
    commentAr: 'برياني حيدر آباد رائع تماماً! نكهات أصيلة وحصص سخية.',
    date: '1 week ago',
    dateAr: 'منذ أسبوع',
    avatar: '👩‍🦰',
  },
  {
    id: 3,
    nameEn: 'Mohammed Hassan',
    nameAr: 'محمد حسن',
    rating: 4,
    commentEn: 'Great food and fast delivery. The chicken tikka was perfectly spiced. Highly recommended!',
    commentAr: 'طعام رائع وتوصيل سريع. تكا الدجاج كان متبلاً بشكل مثالي. أنصح به بشدة!',
    date: '3 days ago',
    dateAr: 'منذ 3 أيام',
    avatar: '👨‍🍳',
  },
  {
    id: 4,
    nameEn: 'Priya Sharma',
    nameAr: 'بريا شارما',
    rating: 5,
    commentEn: 'The vegetarian options are amazing too! Dal makhani and veg biryani are exceptional.',
    commentAr: 'الخيارات النباتية رائعة أيضاً! دال مخاني وبرياني الخضار استثنائيان.',
    date: '5 days ago',
    dateAr: 'منذ 5 أيام',
    avatar: '👩‍🍳',
  },
];
