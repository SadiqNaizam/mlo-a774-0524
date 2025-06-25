import React from 'react';
import { Link } from 'react-router-dom';
import { Clapperboard } from 'lucide-react';

const Footer: React.FC = () => {
  console.log('Footer loaded');
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted text-muted-foreground border-t">
      <div className="container py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <Clapperboard className="h-5 w-5 text-red-600" />
            <span className="text-sm font-semibold">JioHotstar</span>
          </div>
          <nav className="flex flex-wrap justify-center gap-4 sm:gap-6 text-sm">
            {/* These routes are placeholders as they are not in App.tsx */}
            <Link to="/terms" className="hover:text-primary transition-colors">
              Terms of Service
            </Link>
            <Link to="/privacy" className="hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link to="/faq" className="hover:text-primary transition-colors">
              FAQ
            </Link>
          </nav>
          <div className="text-center md:text-right">
            <p className="text-sm">
              &copy; {currentYear} JioHotstar. All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;