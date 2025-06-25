import * as React from "react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import VideoThumbnailCard from "@/components/VideoThumbnailCard"

// A placeholder type for the video content items.
// In a real application, this would likely be defined in a shared types file.
export interface VideoContent {
  id: string;
  slug: string;
  title: string;
  imageUrl: string;
  description?: string;
}

interface ContentCarouselProps {
  title: string;
  items: VideoContent[];
}

const ContentCarousel: React.FC<ContentCarouselProps> = ({ title, items }) => {
  console.log(`ContentCarousel loaded for title: ${title}`);

  if (!items || items.length === 0) {
    return (
      <div className="w-full py-4">
        <h2 className="text-2xl font-bold mb-4 px-4 md:px-6">{title}</h2>
        <p className="text-gray-400 px-4 md:px-6">No content available in this section.</p>
      </div>
    )
  }

  return (
    <div className="w-full py-4">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <div className="flex justify-between items-center mb-4 px-4 md:px-6">
          <h2 className="text-2xl font-bold">{title}</h2>
          <div className="flex items-center gap-2">
            <CarouselPrevious className="relative top-0 left-0 right-0 translate-y-0" />
            <CarouselNext className="relative top-0 left-0 right-0 translate-y-0" />
          </div>
        </div>
        <CarouselContent className="-ml-2 md:-ml-4">
          {items.map((item) => (
            <CarouselItem key={item.id} className="pl-2 md:pl-4 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6">
              <div className="p-1">
                {/* Assuming VideoThumbnailCard accepts these props based on its description */}
                <VideoThumbnailCard
                  id={item.id}
                  slug={item.slug}
                  title={item.title}
                  imageUrl={item.imageUrl}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  )
}

export default ContentCarousel