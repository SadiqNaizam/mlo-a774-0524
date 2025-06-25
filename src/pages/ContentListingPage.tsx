import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';

// Custom Components
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import VideoThumbnailCard from '@/components/VideoThumbnailCard';

// shadcn/ui Components
import { Button } from '@/components/ui/button';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';

// Mock data type
interface VideoContent {
  id: string;
  title: string;
  posterUrl: string;
  type: 'movie' | 'tv' | 'sports';
}

// Comprehensive mock data to simulate a backend
const mockContent: VideoContent[] = [
  // Movies
  ...Array.from({ length: 25 }, (_, i) => ({ id: `mov-${i + 1}`, title: `Epic Movie ${i + 1}`, posterUrl: `https://picsum.photos/seed/movie${i}/400/600`, type: 'movie' as const })),
  // TV Shows
  ...Array.from({ length: 25 }, (_, i) => ({ id: `tv-${i + 1}`, title: `Gripping TV Show ${i + 1}`, posterUrl: `https://picsum.photos/seed/tv${i}/400/600`, type: 'tv' as const })),
  // Sports
  ...Array.from({ length: 15 }, (_, i) => ({ id: `sport-${i + 1}`, title: `Live Sports Event ${i + 1}`, posterUrl: `https://picsum.photos/seed/sport${i}/400/600`, type: 'sports' as const })),
];


const ContentListingPage = () => {
    console.log('ContentListingPage loaded');
    const [searchParams] = useSearchParams();
    const [isLoading, setIsLoading] = useState(true);
    const [listedContent, setListedContent] = useState<VideoContent[]>([]);
    const [pageTitle, setPageTitle] = useState('Content');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [sortBy, setSortBy] = useState('popularity');

    const itemsPerPage = 12;

    // Main effect to fetch and filter data based on URL params and sorting
    useEffect(() => {
        setIsLoading(true);
        const type = searchParams.get('type');
        const searchQuery = searchParams.get('search');

        // Simulate API call with a delay
        const timer = setTimeout(() => {
            let filteredContent = [...mockContent]; // Create a mutable copy

            if (type) {
                const capitalizedType = type.charAt(0).toUpperCase() + type.slice(1);
                setPageTitle(type === 'tv' ? 'TV Shows' : capitalizedType);
                filteredContent = mockContent.filter(item => item.type === type);
            } else if (searchQuery) {
                setPageTitle(`Search Results for "${searchQuery}"`);
                filteredContent = mockContent.filter(item => item.title.toLowerCase().includes(searchQuery.toLowerCase()));
            } else {
                setPageTitle('All Content');
            }

            // Simulate sorting on the server
            if (sortBy === 'title-asc') {
                filteredContent.sort((a, b) => a.title.localeCompare(b.title));
            } else if (sortBy === 'title-desc') {
                filteredContent.sort((a, b) => b.title.localeCompare(a.title));
            }

            const totalItems = filteredContent.length;
            setTotalPages(Math.ceil(totalItems / itemsPerPage));

            const paginatedContent = filteredContent.slice(
                (currentPage - 1) * itemsPerPage,
                currentPage * itemsPerPage
            );

            setListedContent(paginatedContent);
            setIsLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, [searchParams, currentPage, sortBy]);
    
    // Effect to reset to page 1 when filters change
    useEffect(() => {
      setCurrentPage(1);
    }, [searchParams, sortBy]);

    const handlePageChange = (page: number) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page);
            window.scrollTo(0, 0);
        }
    }
    
    // Function to generate intelligent pagination links
    const renderPaginationItems = () => {
        const pageNumbers = [];
        const maxPagesToShow = 5;
        const half = Math.floor(maxPagesToShow / 2);

        let startPage = Math.max(1, currentPage - half);
        let endPage = Math.min(totalPages, currentPage + half);

        if (currentPage <= half) {
            endPage = Math.min(totalPages, maxPagesToShow);
        }
        if (currentPage + half >= totalPages) {
            startPage = Math.max(1, totalPages - maxPagesToShow + 1);
        }

        if (startPage > 1) {
            pageNumbers.push(<PaginationItem key="1"><PaginationLink href="#" onClick={(e) => { e.preventDefault(); handlePageChange(1); }}>1</PaginationLink></PaginationItem>);
            if (startPage > 2) {
                pageNumbers.push(<PaginationItem key="start-ellipsis"><PaginationEllipsis /></PaginationItem>);
            }
        }

        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(
                <PaginationItem key={i}>
                    <PaginationLink href="#" onClick={(e) => { e.preventDefault(); handlePageChange(i); }} isActive={currentPage === i}>{i}</PaginationLink>
                </PaginationItem>
            );
        }
        
        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                 pageNumbers.push(<PaginationItem key="end-ellipsis"><PaginationEllipsis /></PaginationItem>);
            }
             pageNumbers.push(<PaginationItem key={totalPages}><PaginationLink href="#" onClick={(e) => { e.preventDefault(); handlePageChange(totalPages); }}>{totalPages}</PaginationLink></PaginationItem>);
        }
        return pageNumbers;
    };

    const breadcrumbPage = pageTitle.startsWith('Search') ? 'Search Results' : pageTitle;

    return (
        <div className="flex flex-col min-h-screen bg-background text-foreground">
            <Header />
            <main className="flex-grow container py-6 md:py-8">
                <Breadcrumb className="mb-6">
                    <BreadcrumbList>
                        <BreadcrumbItem><BreadcrumbLink asChild><Link to="/">Home</Link></BreadcrumbLink></BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem><BreadcrumbPage>{breadcrumbPage}</BreadcrumbPage></BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
                
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                    <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{pageTitle}</h1>
                    <Select value={sortBy} onValueChange={setSortBy}>
                        <SelectTrigger className="w-full sm:w-[180px]">
                            <SelectValue placeholder="Sort by" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="popularity">Popularity</SelectItem>
                            <SelectItem value="release-date" disabled>Release Date</SelectItem>
                            <SelectItem value="title-asc">Title (A-Z)</SelectItem>
                            <SelectItem value="title-desc">Title (Z-A)</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {isLoading ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
                        {Array.from({ length: itemsPerPage }).map((_, index) => (
                            <Skeleton key={index} className="aspect-[2/3] w-full rounded-lg" />
                        ))}
                    </div>
                ) : listedContent.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
                        {listedContent.map(item => (
                            <VideoThumbnailCard
                                key={item.id}
                                id={item.id}
                                title={item.title}
                                posterUrl={item.posterUrl}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center text-center py-20 bg-muted rounded-lg">
                        <h2 className="text-2xl font-semibold">No Results Found</h2>
                        <p className="text-muted-foreground mt-2 max-w-md">We couldn't find any content matching your criteria. Try a different search or filter.</p>
                        <Button asChild variant="outline" className="mt-6">
                            <Link to="/">Back to Home</Link>
                        </Button>
                    </div>
                )}

                {!isLoading && totalPages > 1 && (
                    <div className="mt-8 flex justify-center">
                        <Pagination>
                            <PaginationContent>
                                <PaginationItem><PaginationPrevious href="#" onClick={(e) => { e.preventDefault(); handlePageChange(currentPage - 1); }} className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''} /></PaginationItem>
                                {renderPaginationItems()}
                                <PaginationItem><PaginationNext href="#" onClick={(e) => { e.preventDefault(); handlePageChange(currentPage + 1); }} className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''} /></PaginationItem>
                            </PaginationContent>
                        </Pagination>
                    </div>
                )}
            </main>
            <Footer />
        </div>
    );
};

export default ContentListingPage;