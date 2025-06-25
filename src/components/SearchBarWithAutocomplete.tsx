import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

const SearchBarWithAutocomplete = () => {
  return (
    <div className="relative hidden sm:block">
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        type="search"
        placeholder="Search titles, genres..."
        className="pl-8 sm:w-[200px] md:w-[300px]"
      />
    </div>
  );
};

export default SearchBarWithAutocomplete;