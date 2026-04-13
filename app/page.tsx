import HeroBanner from '@/components/HeroBanner';
import SearchBar from '@/components/SearchBar';
import CategoryCards from '@/components/CategoryCards';
import FeaturedDishes from '@/components/FeaturedDishes';
import OffersCarousel from '@/components/OffersCarousel';
import ReviewsSection from '@/components/ReviewsSection';

export default function HomePage() {
  return (
    <>
      <HeroBanner />
      <SearchBar />
      <CategoryCards />
      <FeaturedDishes />
      <OffersCarousel />
      <ReviewsSection />
    </>
  );
}
