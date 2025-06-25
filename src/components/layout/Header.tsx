import { Link, NavLink } from 'react-router-dom';
import { Clapperboard, User } from 'lucide-react';
import SearchBarWithAutocomplete from '../SearchBarWithAutocomplete';
import { Button } from '@/components/ui/button';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Browse', path: '/browse' },
  { name: 'My List', path: '/profile' }, // Simplified to profile for this scope
];

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center space-x-8">
          <Link to="/" className="flex items-center space-x-2">
            <Clapperboard className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold">Streamix</span>
          </Link>
          <nav className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors hover:text-primary ${
                    isActive ? 'text-primary' : 'text-foreground/70'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          <SearchBarWithAutocomplete />
          <Link to="/profile">
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;