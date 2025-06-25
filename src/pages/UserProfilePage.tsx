import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import VideoThumbnailCard from '@/components/VideoThumbnailCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { History, Heart, CreditCard } from 'lucide-react';

// Mock Data for demonstration
const watchHistoryData = [
  { id: 'interstellar', title: 'Interstellar', posterUrl: 'https://placehold.co/400x600/000000/FFFFFF?text=Interstellar' },
  { id: 'stranger-things', title: 'Stranger Things', posterUrl: 'https://placehold.co/400x600/8B0000/FFFFFF?text=Stranger+Things' },
  { id: 'the-mandalorian', title: 'The Mandalorian', posterUrl: 'https://placehold.co/400x600/A9A9A9/FFFFFF?text=The+Mandalorian' },
  { id: 'joker', title: 'Joker', posterUrl: 'https://placehold.co/400x600/4B0082/FFFFFF?text=Joker' },
];

const favoritesData = [
  { id: 'inception', title: 'Inception', posterUrl: 'https://placehold.co/400x600/1E90FF/FFFFFF?text=Inception' },
  { id: 'breaking-bad', title: 'Breaking Bad', posterUrl: 'https://placehold.co/400x600/006400/FFFFFF?text=Breaking+Bad' },
  { id: 'parasite', title: 'Parasite', posterUrl: 'https://placehold.co/400x600/FFD700/000000?text=Parasite' },
  { id: 'the-queens-gambit', title: 'The Queen\'s Gambit', posterUrl: 'https://placehold.co/400x600/DEB887/000000?text=Queen\'s+Gambit' },
  { id: 'the-last-kingdoms-heir', title: 'The Last Kingdom\'s Heir', posterUrl: 'https://placehold.co/400x600/696969/FFFFFF?text=Last+Kingdom' },
];

const UserProfilePage = () => {
  console.log('UserProfilePage loaded');

  return (
    <div className="bg-background text-foreground min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">My Profile</h1>
          <p className="text-muted-foreground mt-2">Manage your watch history, favorites, and subscription plan.</p>
        </header>

        <Tabs defaultValue="history" className="w-full">
          <TabsList className="grid w-full grid-cols-1 sm:grid-cols-3 h-auto sm:h-12">
            <TabsTrigger value="history" className="py-2">
              <History className="mr-2 h-4 w-4" />
              Watch History
            </TabsTrigger>
            <TabsTrigger value="favorites" className="py-2">
              <Heart className="mr-2 h-4 w-4" />
              Favorites
            </TabsTrigger>
            <TabsTrigger value="subscription" className="py-2">
              <CreditCard className="mr-2 h-4 w-4" />
              Subscription
            </TabsTrigger>
          </TabsList>

          {/* Watch History Tab */}
          <TabsContent value="history" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Your Watch History</CardTitle>
                <CardDescription>Content you recently watched.</CardDescription>
              </CardHeader>
              <CardContent>
                {watchHistoryData.length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                    {watchHistoryData.map(item => (
                      <VideoThumbnailCard key={item.id} id={item.id} title={item.title} posterUrl={item.posterUrl} />
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground">You haven't watched anything yet.</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Favorites Tab */}
          <TabsContent value="favorites" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Your Favorites</CardTitle>
                <CardDescription>Content you've added to your watchlist.</CardDescription>
              </CardHeader>
              <CardContent>
                {favoritesData.length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                    {favoritesData.map(item => (
                      <VideoThumbnailCard key={item.id} id={item.id} title={item.title} posterUrl={item.posterUrl} />
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground">Your watchlist is empty.</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Subscription Tab */}
          <TabsContent value="subscription" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Subscription Plan</CardTitle>
                <CardDescription>Details about your current plan and billing.</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Plan</TableCell>
                      <TableCell>Premium HD</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Status</TableCell>
                      <TableCell><Badge variant="default">Active</Badge></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Next Billing Date</TableCell>
                      <TableCell>July 31, 2024</TableCell>
                    </TableRow>
                     <TableRow>
                      <TableCell className="font-medium">Monthly Rate</TableCell>
                      <TableCell>$14.99</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Payment Method</TableCell>
                      <TableCell>Visa ending in 1234</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter className="border-t px-6 py-4">
                  <Button>Manage Subscription</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
};

export default UserProfilePage;