import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import Autoplay from "embla-carousel-autoplay";
import { Play, Info } from 'lucide-react';

// Mock data for the featured content
const featuredItems = [
  {
    id: 1,
    title: "Epic Sci-Fi Adventure",
    description: "Journey to a new galaxy where heroes are born and legends are forged. A thrilling saga of exploration and survival.",
    image: "https://via.placeholder.com/1920x1080/000022/FFFFFF?text=Featured+Movie+1",
    videoSlug: "epic-sci-fi-adventure"
  },
  {
    id: 2,
    title: "The Last Kingdom's Heir",
    description: "A gripping historical drama about power, loyalty, and the fight for a throne that will define a nation.",
    image: "https://via.placeholder.com/1920x1080/220000/FFFFFF?text=Featured+Show+2",
    videoSlug: "the-last-kingdoms-heir"
  },
  {
    id: 3,
    title: "Champions League Finals",
    description: "Live sports action. Witness the clash of titans in the most anticipated football match of the year.",
    image: "https://via.placeholder.com/1920x1080/002200/FFFFFF?text=Live+Sports+3",
    videoSlug: "champions-league-finals"
  },
];

const FeaturedContentBanner: React.FC = () => {
  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  );

  React.useEffect(() => {
    console.log("FeaturedContentBanner loaded");
  }, []);

  return (
    <div className="w-full relative">
      <Carousel
        plugins={[plugin.current]}
        className="w-full"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
        opts={{
          loop: true,
        }}
      >
        <CarouselContent className="-ml-0">
          {featuredItems.map((item) => (
            <CarouselItem key={item.id} className="pl-0">
              <div className="relative w-full h-[50vh] md:h-[65vh] lg:h-[80vh] xl:h-screen max-h-[800px]">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6 md:p-12 lg:p-16 text-white space-y-4 max-w-2xl">
                  <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight drop-shadow-lg">
                    {item.title}
                  </h1>
                  <p className="text-sm md:text-base lg:text-lg hidden md:block text-gray-200 drop-shadow-md">
                    {item.description}
                  </p>
                  <div className="flex items-center gap-4 pt-4">
                    <Button asChild size="lg" className="bg-white text-black hover:bg-gray-200">
                      <Link to="/video-playback">
                        <Play className="mr-2 h-6 w-6" /> Watch Now
                      </Link>
                    </Button>
                    <Button asChild size="lg" variant="secondary">
                      <Link to="/content-listing">
                        <Info className="mr-2 h-6 w-6" /> More Info
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="absolute bottom-8 right-8 hidden md:flex">
          <CarouselPrevious className="relative translate-y-0 left-0 top-0 right-0" />
          <CarouselNext className="relative translate-y-0 left-0 top-0 right-0" />
        </div>
      </Carousel>
    </div>
  );
};

export default FeaturedContentBanner;