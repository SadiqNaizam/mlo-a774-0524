import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

// Custom Layout & Components
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import VideoPlayer from '@/components/VideoPlayer';
import VideoThumbnailCard from '@/components/VideoThumbnailCard';

// Shadcn/ui Components
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from '@/components/ui/button';
import { toast } from "sonner";

// Icons
import { Share2, Bookmark } from 'lucide-react';

// Mock Data
const mockVideoData = {
  'epic-sci-fi-adventure': {
    title: 'Epic Sci-Fi Adventure',
    description: 'Journey to a new galaxy where heroes are born and legends are forged. A thrilling saga of exploration and survival against unknown cosmic horrors.',
    poster: 'https://via.placeholder.com/1280x720/000022/FFFFFF?text=Epic+Sci-Fi+Adventure',
    sources: [
      { label: '1080p', src: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' },
      { label: '720p', src: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4' },
    ],
    cast: ['John Actor', 'Jane Actress', 'Sam Director'],
    details: 'Released: 2024 | Genre: Sci-Fi, Adventure | Rating: PG-13'
  },
  'default': {
    title: 'Default Movie Title',
    description: 'This is a default description for a movie when the specific ID is not found. Enjoy this classic clip.',
    poster: 'https://via.placeholder.com/1280x720/111111/FFFFFF?text=Video+Playback',
    sources: [
        { label: '1080p', src: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' },
        { label: '720p', src: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4' },
    ],
    cast: ['Actor A', 'Actress B', 'Director C'],
    details: 'Released: 2023 | Genre: Action | Rating: R'
  }
};

const moreLikeThisContent = [
    { id: '1', title: 'Cosmic Drift', posterUrl: 'https://via.placeholder.com/300x450/4B0082/FFFFFF?text=Cosmic+Drift' },
    { id: '2', title: 'Cybernetic Uprising', posterUrl: 'https://via.placeholder.com/300x450/00008B/FFFFFF?text=Cybernetic+Uprising' },
    { id: '3', title: 'The Last Stand', posterUrl: 'https://via.placeholder.com/300x450/8B0000/FFFFFF?text=The+Last+Stand' },
    { id: '4', title: "Ocean's Mystery", posterUrl: "https://via.placeholder.com/300x450/008080/FFFFFF?text=Ocean's+Mystery" },
    { id: '5', title: "Mountain's Echo", posterUrl: "https://via.placeholder.com/300x450/2F4F4F/FFFFFF?text=Mountain's+Echo" },
];

const VideoPlaybackPage = () => {
    console.log('VideoPlaybackPage loaded');
    const [searchParams] = useSearchParams();
    const [videoDetails, setVideoDetails] = useState(mockVideoData.default);
    
    useEffect(() => {
        const videoId = searchParams.get('videoId') || searchParams.get('id');
        const details = videoId && mockVideoData[videoId] ? mockVideoData[videoId] : mockVideoData.default;
        setVideoDetails(details);
        window.scrollTo(0, 0); // Scroll to top when video changes
    }, [searchParams]);

    const handleShare = () => {
        const url = window.location.href;
        navigator.clipboard.writeText(url);
        toast.success("Link copied to clipboard!");
    }
    
    const handleAddToWatchlist = () => {
        toast.success(`"${videoDetails.title}" added to your watchlist!`);
    }

    return (
        <div className="bg-background text-foreground min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-6">
                <section className="mb-6">
                    <VideoPlayer 
                        sources={videoDetails.sources}
                        poster={videoDetails.poster}
                    />
                </section>

                <section className="mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold mb-2">{videoDetails.title}</h1>
                    <p className="text-muted-foreground max-w-3xl mb-4">{videoDetails.description}</p>
                    <div className="flex items-center gap-4">
                        <Button onClick={handleAddToWatchlist} variant="outline">
                            <Bookmark className="mr-2 h-4 w-4" /> Add to Watchlist
                        </Button>
                        <Button onClick={handleShare} variant="secondary">
                            <Share2 className="mr-2 h-4 w-4" /> Share
                        </Button>
                    </div>
                </section>
                
                <section>
                    <Tabs defaultValue="more-like-this" className="w-full">
                        <TabsList className="grid w-full grid-cols-2 md:w-[400px] md:grid-cols-2 bg-muted">
                            <TabsTrigger value="more-like-this">More Like This</TabsTrigger>
                            <TabsTrigger value="details">Details & Cast</TabsTrigger>
                        </TabsList>
                        <TabsContent value="more-like-this" className="py-6">
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                                {moreLikeThisContent.map(item => (
                                    <VideoThumbnailCard 
                                        key={item.id}
                                        id={item.id}
                                        title={item.title}
                                        posterUrl={item.posterUrl}
                                    />
                                ))}
                            </div>
                        </TabsContent>
                        <TabsContent value="details" className="py-6">
                            <Accordion type="single" collapsible className="w-full max-w-3xl" defaultValue="item-1">
                                <AccordionItem value="item-1" className="border-border">
                                    <AccordionTrigger className="hover:no-underline text-lg">Details</AccordionTrigger>
                                    <AccordionContent className="text-muted-foreground">
                                        {videoDetails.details}
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="item-2" className="border-border">
                                    <AccordionTrigger className="hover:no-underline text-lg">Cast & Crew</AccordionTrigger>
                                    <AccordionContent className="text-muted-foreground">
                                        <ul className="list-disc pl-5">
                                            {videoDetails.cast.map((member, index) => (
                                                <li key={index}>{member}</li>
                                            ))}\
                                        </ul>
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        </TabsContent>
                    </Tabs>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default VideoPlaybackPage;