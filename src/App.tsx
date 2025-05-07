
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { AuthProvider, useAuth } from "./context/AuthContext";
import AppLayout from "./components/layout/AppLayout";
import SplashScreen from "./pages/SplashScreen";
import AuthPage from "./pages/AuthPage";
import BrowsePage from "./pages/BrowsePage";
import FeedPage from "./pages/FeedPage"; 
import ProfilePage from "./pages/ProfilePage";
import CreatorProfilePage from "./pages/CreatorProfilePage";
import CreatorDashboard from "./pages/CreatorDashboard";
import FavoritesPage from "./pages/FavoritesPage";
import ChatPage from "./pages/ChatPage";
import NotificationsPage from "./pages/NotificationsPage";
import NotFound from "./pages/NotFound";

// ProtectedRoute component for auth-required pages
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { user, isLoading } = useAuth();
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-hookr-dark">
        <div className="animate-spin w-8 h-8 border-4 border-hookr-accent border-t-transparent rounded-full"></div>
      </div>
    );
  }
  
  if (!user) {
    return <Navigate to="/auth" replace />;
  }
  
  return children;
};

// CreatorRoute component for creator-only pages
const CreatorRoute = ({ children }: { children: JSX.Element }) => {
  const { isCreator, isLoading } = useAuth();
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-hookr-dark">
        <div className="animate-spin w-8 h-8 border-4 border-hookr-accent border-t-transparent rounded-full"></div>
      </div>
    );
  }
  
  if (!isCreator) {
    return <Navigate to="/profile" replace />;
  }
  
  return children;
};

function App() {
  // Create a new QueryClient on component render
  const [queryClient] = useState(() => new QueryClient());
  const [hasVisitedBefore, setHasVisitedBefore] = useState<boolean | null>(null);

  // Check if user has visited before
  useEffect(() => {
    const visited = localStorage.getItem('hasVisitedBefore');
    setHasVisitedBefore(!!visited);
    
    if (!visited) {
      localStorage.setItem('hasVisitedBefore', 'true');
    }
  }, []);

  // Show loading state until we know if user has visited before
  if (hasVisitedBefore === null) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-hookr-dark">
        <div className="animate-spin w-8 h-8 border-4 border-hookr-accent border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Splash and Auth Routes (No Navigation) */}
              <Route 
                path="/splash" 
                element={hasVisitedBefore ? <Navigate to="/" replace /> : <SplashScreen />} 
              />
              <Route path="/auth" element={<AuthPage />} />
              
              {/* Main App Routes (With Navigation) */}
              <Route element={<AppLayout />}>
                <Route 
                  path="/" 
                  element={
                    <ProtectedRoute>
                      <BrowsePage />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/feed" 
                  element={
                    <ProtectedRoute>
                      <FeedPage />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/favorites" 
                  element={
                    <ProtectedRoute>
                      <FavoritesPage />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/profile" 
                  element={
                    <ProtectedRoute>
                      <ProfilePage />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/profile/:id" 
                  element={
                    <ProtectedRoute>
                      <CreatorProfilePage />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/creator-dashboard" 
                  element={
                    <CreatorRoute>
                      <CreatorDashboard />
                    </CreatorRoute>
                  } 
                />
                <Route 
                  path="/chat" 
                  element={
                    <ProtectedRoute>
                      <ChatPage />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/notifications" 
                  element={
                    <ProtectedRoute>
                      <NotificationsPage />
                    </ProtectedRoute>
                  } 
                />
              </Route>
              
              {/* Redirect logic for first-time visitors */}
              <Route 
                path="/" 
                element={
                  hasVisitedBefore ? (
                    <Navigate to="/auth" replace />
                  ) : (
                    <Navigate to="/splash" replace />
                  )
                } 
              />
              
              {/* Not Found */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
