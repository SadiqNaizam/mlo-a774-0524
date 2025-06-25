import { Button } from "@/components/ui/button";
import { Play, Info } from "lucide-react";
import { Link } from "react-router-dom";

const FeaturedContentBanner = () => {
  return (
    <div className="relative h-[50vh] md:h-[70vh] w-full">
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent">
         <img src="https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?q=80&w=2070&auto=format&fit=crop" alt="Featured content" className="h-full w-full object-cover" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/50 to-transparent"></div>
      <div className="relative z-10 h-full flex flex-col justify-center items-start container mx-auto px-4 md:px-6">
        <h1 className="text-4xl md:text-6xl font-extrabold max-w-xl">Code Rebellion</h1>
        <p className="mt-4 max-w-lg text-lg text-foreground/80">
          In a dystopian future, a group of rogue developers fights against a tyrannical AI that controls the world's information.
        </p>
        <div className="mt-8 flex gap-4">
          <Link to="/watch/1">
            <Button size="lg">
              <Play className="mr-2 h-5 w-5" /> Play
            </Button>
          </Link>
          <Button size="lg" variant="secondary">
            <Info className="mr-2 h-5 w-5" /> More Info
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FeaturedContentBanner;