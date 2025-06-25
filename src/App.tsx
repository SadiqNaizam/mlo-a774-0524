import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Homepage from './pages/Homepage';
import VideoPlaybackPage from './pages/VideoPlaybackPage';
import ContentListingPage from './pages/ContentListingPage';
import UserProfilePage from './pages/UserProfilePage';
import AuthPage from './pages/AuthPage';

const AppLayout = () => (
  <div className="flex flex-col min-h-screen">
    <Header />
    <main className="flex-grow">
      <Outlet />
    </main>
    <Footer />
  </div>
);

function App() {
  return (
    <div className="dark">
      <Router>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Homepage />} />
            <Route path="/watch/:id" element={<VideoPlaybackPage />} />
            <Route path="/browse" element={<ContentListingPage />} />
            <Route path="/profile" element={<UserProfilePage />} />
          </Route>
          <Route path="/login" element={<AuthPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;