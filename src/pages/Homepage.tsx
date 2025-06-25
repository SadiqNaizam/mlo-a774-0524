import React, { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FeaturedContentBanner from '@/components/FeaturedContentBanner';
import ContentCarousel, { VideoContent } from '@/components/ContentCarousel';
import { Skeleton } from '@/components/ui/skeleton';

// Mock data for the carousels, matching the VideoContent interface in ContentCarousel.tsx
const continueWatchingItems: VideoContent[] = [
  { id: 'cw-1', slug: 'the-mandalorian-s02e03', title: 'The Mandalorian', imageUrl: 'https://via.placeholder.com/300x450/1A202C/FFFFFF?text=Mandalorian', description: 'Chapter 11: The Heiress' },
  { id: 'cw-2', slug: 'stranger-things-s04e01', title: 'Stranger Things', imageUrl: 'https://via.placeholder.com/300x450/000000/FF0000?text=Stranger+Things', description: 'Chapter One: The Hellfire Club' },
  { id: 'cw-3', slug: 'interstellar', title: 'Interstellar', imageUrl: 'https://via.placeholder.com/300x450/223344/FFFFFF?text=Interstellar', description: 'A team of explorers travel through a wormhole...' },
];

const trendingNowItems: VideoContent[] = [
  { id: 't-1', slug: 'the-boys-s03', title: 'The Boys', imageUrl: 'https://via.placeholder.com/300x450/EEEEEE/000000?text=The+Boys' },
  { id: 't-2', slug: 'house-of-the-dragon', title: 'House of the Dragon', imageUrl: 'https://via.placeholder.com/300x450/8B0000/FFFFFF?text=HotD' },
  { id: 't-3', slug: 'cyberpunk-edgerunners', title: 'Cyberpunk: Edgerunners', imageUrl: 'https://via.placeholder.com/300x450/FFFF00/000000?text=Edgerunners' },
  { id: 't-4', slug: 'dune-part-two', title: 'Dune: Part Two', imageUrl: 'https://via.placeholder.com/300x450/D2B48C/000000?text=Dune+2' },
  { id: 't-5', slug: 'bullet-train', title: 'Bullet Train', imageUrl: 'https://via.placeholder.com/300x450/FF69B4/FFFFFF?text=Bullet+Train' },
  { id: 't-6', slug: 'avatar-way-of-water', title: 'Avatar: The Way of Water', imageUrl: 'https://via.placeholder.com/300x450/0000FF/FFFFFF?text=Avatar+2' },
];

const topMoviesItems: VideoContent[] = [
  { id: 'm-1', slug: 'the-dark-knight', title: 'The Dark Knight', imageUrl: 'https://via.placeholder.com/300x450/0C0C0C/FFFFFF?text=Batman' },
  { id: 'm-2', slug: 'pulp-fiction', title: 'Pulp Fiction', imageUrl: 'https://via.placeholder.com/300x450/FFD700/000000?text=Pulp+Fiction' },
  { id: 'm-3', slug: 'forrest-gump', title: 'Forrest Gump', imageUrl: 'https://via.placeholder.com/300x450/ADD8E6/000000?text=Forrest+Gump' },
  { id: 'm-4', slug: 'inception', title: 'Inception', imageUrl: 'https://via.placeholder.com/300x450/A9A9A9/000000?text=Inception' },
  { id: 'm-5', slug: 'parasite', title: 'Parasite', imageUrl: 'https://via.placeholder.com/300x450/006400/FFFFFF?text=Parasite' },
];

const recommendedItems: VideoContent[] = [
    { id: 'r-1', slug: 'spirited-away', title: 'Spirited Away', imageUrl: 'https://via.placeholder.com/300x450/FFC0CB/000000?text=Spirited+Away' },
    { id: 'r-2', slug: 'the-matrix', title: 'The Matrix', imageUrl: 'https://via.placeholder.com/300x450/003300/33FF33?text=Matrix' },
    { id: 'r-3', slug: 'blade-runner-2049', title: 'Blade Runner 2049', imageUrl: 'https://via.placeholder.com/300x450/FFA500/000000?text=Blade+Runner' },
    { id: 'r-4', slug: 'spider-man-acros-spider-verse', title: 'Spider-Man: Across the Spider-Verse', imageUrl: 'https://via.placeholder.com/300x450/FF0000/0000FF?text=Spider-Verse' },
];

const CarouselSkeleton = () => (
    <div className="w-full py-4 px-4 md:px-6">
        <Skeleton className="h-8 w-1/4 mb-4" />
        <div className="flex space-x-4">
            <Skeleton className="h-64 w-44" />
            <Skeleton className="h-64 w-44" />
            <Skeleton className="h-64 w-44 hidden sm:block" />
            <Skeleton className="h-64 w-44 hidden md:block" />
            <Skeleton className="h-64 w-44 hidden lg:block" />
            <Skeleton className="h-64 w-44 hidden xl:block" />
        </div>
    </div>
);


const Homepage = () => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        console.log('Homepage loaded');
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1500); // Simulate network delay

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="flex flex-col min-h-screen bg-background text-foreground">
            <Header />
            <main className="flex-grow">
                <FeaturedContentBanner />

                <div className="py-6 space-y-8">
                    {isLoading ? (
                        <>
                            <CarouselSkeleton />
                            <CarouselSkeleton />
                            <CarouselSkeleton />
                        </>
                    ) : (
                        <>
                            <ContentCarousel title="Continue Watching" items={continueWatchingItems} />
                            <ContentCarousel title="Trending Now" items={trendingNowItems} />
                            <ContentCarousel title="Top Movies" items={topMoviesItems} />
                            <ContentCarousel title="Recommended for You" items={recommendedItems} />
                        </>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Homepage;