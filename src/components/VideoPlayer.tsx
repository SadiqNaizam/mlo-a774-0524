import { Card, CardContent } from "@/components/ui/card";
import { Play } from "lucide-react";

const VideoPlayer = () => {
    return (
        <Card className="w-full bg-black border-muted">
            <CardContent className="p-0">
                <div className="aspect-video w-full bg-black flex items-center justify-center">
                    {/* This would be replaced by a real video player element */}
                    <div className="text-center text-muted-foreground">
                        <Play className="h-16 w-16 mx-auto text-gray-600" />
                        <p className="mt-4">Video player would be here.</p>
                        <p className="text-sm">This is a static placeholder.</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default VideoPlayer;