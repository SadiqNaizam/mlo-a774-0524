import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import VideoThumbnailCard from "./VideoThumbnailCard";

interface VideoItem {
  id: string;
  title: string;
  thumbnailUrl: string;
}

interface ContentCarouselProps {
  title: string;
  items: VideoItem[];
}

const ContentCarousel = ({ title, items }: ContentCarouselProps) => {
  return (
    <div className="w-full space-y-4">
      <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-4">
          {items.map((item, index) => (
            <CarouselItem key={index} className="pl-4 basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5">
              <VideoThumbnailCard {...item} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="ml-14" />
        <CarouselNext className="mr-14" />
      </Carousel>
    </div>
  );
}

export default ContentCarousel;