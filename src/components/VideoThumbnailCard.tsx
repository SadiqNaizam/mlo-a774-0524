import React from 'react';
import { Link } from 'react-router-dom';
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Bookmark, PlayCircle } from 'lucide-react';

interface VideoThumbnailCardProps {
  id: string | number;
  title: string;
  posterUrl: string;
  className?: string;
}

const VideoThumbnailCard: React.FC<VideoThumbnailCardProps> = ({ id, title, posterUrl, className }) => {
  console.log('VideoThumbnailCard loaded for:', title);

  const handleBookmarkClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // Prevents the Link from navigating
    e.stopPropagation(); // Stops the event from bubbling up to the Link
    toast.success(`"${title}" has been added to your watchlist.`);
    console.log(`Bookmarked video ${id}`);
  };

  return (
    <Link
      to={`/video-playback?videoId=${id}`}
      aria-label={`Play ${title}`}
      className={cn(
        "group relative block aspect-[2/3] w-full overflow-hidden rounded-lg bg-slate-900 shadow-lg transition-all duration-300 hover:shadow-xl",
        className
      )}
    >
      {/* Background Image */}
      <img
        src={posterUrl}
        alt={`Poster for ${title}`}
        loading="lazy"
        className="h-full w-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
      />
      
      {/* Gradient Overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      
      {/* Hover Content: Play Icon and Title */}
      <div className="absolute inset-0 flex flex-col justify-end p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="absolute inset-0 flex items-center justify-center">
            <PlayCircle className="h-16 w-16 text-white/90 drop-shadow-lg transition-transform duration-300 group-hover:scale-110" />
        </div>
        <h3 className="line-clamp-2 text-base font-bold text-white drop-shadow-md">
          {title}
        </h3>
      </div>

      {/* Hover Content: Bookmark Button */}
      <div className="absolute top-2 right-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 rounded-full bg-black/50 text-white hover:bg-primary hover:text-primary-foreground"
            onClick={handleBookmarkClick}
            aria-label={`Bookmark ${title}`}
          >
            <Bookmark className="h-5 w-5" />
          </Button>
      </div>
    </Link>
  );
};

export default VideoThumbnailCard;