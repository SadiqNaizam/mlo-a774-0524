import FeaturedContentBanner from "@/components/FeaturedContentBanner";
import ContentCarousel from "@/components/ContentCarousel";

const mockContent = (category: string, count: number) => 
  Array.from({ length: count }, (_, i) => ({
    id: `${category.toLowerCase().replace(' ', '-')}-${i + 1}`,
    title: `${category} Title ${i + 1}`,
    thumbnailUrl: `https://picsum.photos/seed/${category}${i}/400/225`,
  }));

const Homepage = () => {
  return (
    <div className="space-y-12">
      <FeaturedContentBanner />
      <div className="container mx-auto px-4 md:px-6 space-y-12">
        <ContentCarousel title="Trending Now" items={mockContent('Trending', 10)} />
        <ContentCarousel title="New Releases" items={mockContent('New', 10)} />
        <ContentCarousel title="Sci-Fi Hits" items={mockContent('SciFi', 10)} />
        <ContentCarousel title="Action & Adventure" items={mockContent('Action', 10)} />
      </div>
    </div>
  );
};

export default Homepage;