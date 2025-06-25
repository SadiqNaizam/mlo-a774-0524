import VideoPlayer from "@/components/VideoPlayer";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

const VideoPlaybackPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <div className="container mx-auto px-4 md:px-6 py-8">
      <div className="mb-4">
        <Button variant="outline" onClick={() => navigate(-1)}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to browse
        </Button>
      </div>
      <VideoPlayer />
      <div className="mt-8">
        <h1 className="text-3xl font-bold">Video Title for ID: {id}</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          This is a detailed description of the video. It would contain information about the plot, cast, director, and more. For now, it's just placeholder text to show how the layout would look.
        </p>
      </div>
    </div>
  );
};

export default VideoPlaybackPage;