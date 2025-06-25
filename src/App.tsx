import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";


import AuthPage from "./pages/AuthPage";
import ContentListingPage from "./pages/ContentListingPage";
import Homepage from "./pages/Homepage";
import UserProfilePage from "./pages/UserProfilePage";
import VideoPlaybackPage from "./pages/VideoPlaybackPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();


const App = () => (
<QueryClientProvider client={queryClient}>
    <TooltipProvider>
    <Toaster />
    <Sonner />
    <BrowserRouter>
        <Routes>


          <Route path="/" element={<Homepage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/content-listing" element={<ContentListingPage />} />
          <Route path="/user-profile" element={<UserProfilePage />} />
          <Route path="/video-playback" element={<VideoPlaybackPage />} />
          {/* catch-all */}
          <Route path="*" element={<NotFound />} />


        </Routes>
    </BrowserRouter>
    </TooltipProvider>
</QueryClientProvider>
);

export default App;
