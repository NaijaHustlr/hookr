import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";

import { AuthProvider } from "@/context/AuthContext";
import AppLayout from "@/layouts/AppLayout";
import Index from "@/pages/IndexPage";
import AuthPage from "@/pages/AuthPage";
import BrowsePage from "@/pages/BrowsePage";
import ExplorePage from "@/pages/ExplorePage";
import FeedPage from "@/pages/FeedPage";
import FavoritesPage from "@/pages/FavoritesPage";
import ChatPage from "@/pages/ChatPage";
import NotificationsPage from "@/pages/NotificationsPage";
import ProfilePage from "@/pages/ProfilePage";
import CreatorProfilePage from "@/pages/CreatorProfilePage";
import CreatorDashboard from "@/pages/CreatorDashboard";
import PostPage from "@/pages/PostPage";
import NotFound from "@/pages/NotFoundPage";
import AdminDashboardPage from "@/pages/AdminDashboardPage";

const queryClient = new QueryClient();

const App = () => {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route element={<AppLayout />}>
              <Route path="/browse" element={<BrowsePage />} />
              <Route path="/explore" element={<ExplorePage />} />
              <Route path="/feed" element={<FeedPage />} />
              <Route path="/favorites" element={<FavoritesPage />} />
              <Route path="/chat" element={<ChatPage />} />
              <Route path="/notifications" element={<NotificationsPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/profile/:id" element={<CreatorProfilePage />} />
              <Route path="/creator-dashboard" element={<CreatorDashboard />} />
              <Route path="/post/:id" element={<PostPage />} />
              <Route path="/admin" element={<AdminDashboardPage />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
        <Toaster />
      </QueryClientProvider>
    </AuthProvider>
  );
};

export default App;
