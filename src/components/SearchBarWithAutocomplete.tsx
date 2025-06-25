import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Search, Film, Tv } from 'lucide-react';

// Mock data to simulate search results. In a real app, this would come from an API.
const MOCK_CONTENT = [
  { id: '1', title: 'Inception', type: 'Movie', slug: 'inception' },
  { id: '2', title: 'Stranger Things', type: 'TV Show', slug: 'stranger-things' },
  { id: '3', title: 'The Mandalorian', type: 'TV Show', slug: 'the-mandalorian' },
  { id: '4', title: 'Parasite', type: 'Movie', slug: 'parasite' },
  { id: '5', title: 'The Queens Gambit', type: 'TV Show', slug: 'the-queens-gambit' },
  { id: '6', title: 'Interstellar', type: 'Movie', slug: 'interstellar' },
  { id: '7', title: 'Breaking Bad', type: 'TV Show', slug: 'breaking-bad' },
  { id: '8', title: 'Joker', type: 'Movie', slug: 'joker' },
];

const SearchBarWithAutocomplete: React.FC = () => {
  console.log('SearchBarWithAutocomplete loaded');
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<(typeof MOCK_CONTENT)>([]);
  const [isFocused, setIsFocused] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (query.trim().length > 1) {
      const filteredResults = MOCK_CONTENT.filter(item =>
        item.title.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filteredResults);
    } else {
      setResults([]);
    }
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setIsFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleResultClick = () => {
    setQuery('');
    setResults([]);
    setIsFocused(false);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/content-listing?search=${encodeURIComponent(query)}`);
      handleResultClick();
    }
  };

  return (
    <div ref={searchContainerRef} className="relative w-full max-w-xs md:max-w-sm">
      <form onSubmit={handleSearchSubmit}>
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground z-10" />
        <Input
          type="search"
          placeholder="Search movies, shows..."
          className="w-full pl-9 pr-4 py-2 bg-background/50 border-border"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
        />
      </form>

      {isFocused && results.length > 0 && (
        <div className="absolute top-full mt-2 w-full bg-background border border-border rounded-md shadow-lg z-50 max-h-80 overflow-y-auto animate-in fade-in-0 zoom-in-95">
          <ul className="py-1">
            {results.map((item) => (
              <li key={item.id}>
                <Link
                  to={`/video-playback?id=${item.slug}`}
                  className="flex items-center gap-4 px-3 py-2 text-sm hover:bg-accent"
                  onClick={handleResultClick}
                >
                  {item.type === 'Movie' ? <Film className="h-4 w-4 text-muted-foreground" /> : <Tv className="h-4 w-4 text-muted-foreground" />}
                  <span className="font-medium flex-1 truncate">{item.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchBarWithAutocomplete;