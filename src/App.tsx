
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "./components/layout/AppLayout";
import SplashScreen from "./pages/SplashScreen";
import AuthPage from "./pages/AuthPage";
import BrowsePage from "./pages/BrowsePage";
import FeedPage from "./pages/FeedPage"; 
import ProfilePage from "./pages/ProfilePage";
import CreatorProfilePage from "./pages/CreatorProfilePage";
import FavoritesPage from "./pages/FavoritesPage";
import ChatPage from "./pages/ChatPage";
import NotificationsPage from "./pages/NotificationsPage";
import NotFound from "./pages/NotFound";
import { useState } from "react";

function App() {
  // Create a new QueryClient on component render
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Splash and Auth Routes (No Navigation) */}
            <Route path="/splash" element={<SplashScreen />} />
            <Route path="/auth" element={<AuthPage />} />
            
            {/* Main App Routes (With Navigation) */}
            <Route element={<AppLayout />}>
              <Route path="/" element={<BrowsePage />} />
              <Route path="/feed" element={<FeedPage />} />
              <Route path="/favorites" element={<FavoritesPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/profile/:id" element={<CreatorProfilePage />} />
              <Route path="/chat" element={<ChatPage />} />
              <Route path="/notifications" element={<NotificationsPage />} />
            </Route>
            
            {/* Redirect from / to /splash for first-time visitors */}
            <Route path="/" element={<Navigate to="/splash" replace />} />
            
            {/* Not Found */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
