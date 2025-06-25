import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { PlayCircle } from 'lucide-react';

interface VideoThumbnailCardProps {
  id: string;
  title: string;
  thumbnailUrl: string;
}

const VideoThumbnailCard = ({ id, title, thumbnailUrl }: VideoThumbnailCardProps) => {
  return (
    <Link to={`/watch/${id}`} className="block group">
      <Card className="overflow-hidden border-0 bg-muted transform transition-all duration-300 ease-in-out group-hover:scale-105">
        <CardContent className="p-0 relative">
          <img
            src={thumbnailUrl}
            alt={title}
            className="aspect-video w-full object-cover transition-opacity group-hover:opacity-75"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <PlayCircle className="h-12 w-12 text-white" />
          </div>
        </CardContent>
      </Card>
      <p className="mt-2 text-sm font-medium truncate group-hover:text-primary">{title}</p>
    </Link>
  );
};

export default VideoThumbnailCard;