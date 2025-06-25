const ContentListingPage = () => {
    return (
      <div className="container mx-auto px-4 md:px-6 py-8">
        <h1 className="text-4xl font-bold">Browse All Content</h1>
        <p className="mt-4 text-muted-foreground">This page would show a grid of all available movies and TV shows with filtering and sorting options.</p>
        {/* Placeholder for content grid */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {/* Example of grid items */}
            {Array.from({length: 15}).map((_, i) => (
                <div key={i} className="bg-muted aspect-video rounded-md flex items-center justify-center">
                    <p className="text-sm text-muted-foreground">Video {i+1}</p>
                </div>
            ))}
        </div>
      </div>
    );
  };
  
export default ContentListingPage;