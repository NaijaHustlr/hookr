
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";
import { ArrowLeft, Eye, Cog, BarChart3 } from "lucide-react";
import PostUploader from "@/components/creator/PostUploader";
import { useCreatorPosts } from "@/hooks/usePosts";
import PostGrid from "@/components/creator/PostGrid";

const CreatorDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { profile, isCreator, user } = useAuth();
  
  // Fetch creator's posts
  const { data: posts = [], isLoading: isLoadingPosts } = useCreatorPosts(user?.id);
  
  // Redirect if not an approved creator
  React.useEffect(() => {
    if (!isCreator) {
      navigate('/profile');
      toast({
        title: "Access denied",
        description: "You need to be an approved creator to access this page.",
        variant: "destructive"
      });
    }
  }, [isCreator, navigate, toast]);
  
  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="flex flex-col min-h-screen bg-hookr-dark pb-20">
      {/* Header with back button */}
      <header className="sticky top-0 z-30 bg-hookr-dark bg-opacity-95 backdrop-blur-sm px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" onClick={handleGoBack} className="mr-2">
              <ArrowLeft className="h-5 w-5 text-hookr-light" />
            </Button>
            <h1 className="text-xl font-serif-custom text-hookr-light">Creator Dashboard</h1>
          </div>
        </div>
      </header>
      
      {/* Creator Stats */}
      <div className="px-4 py-6">
        <h2 className="text-hookr-light text-lg mb-4">Welcome back, {profile?.username}</h2>
        
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-hookr-muted rounded-lg p-4">
            <p className="text-sm text-hookr-light/70">Subscribers</p>
            <p className="text-2xl font-bold text-hookr-light">0</p>
          </div>
          <div className="bg-hookr-muted rounded-lg p-4">
            <p className="text-sm text-hookr-light/70">Total Earnings</p>
            <p className="text-2xl font-bold text-hookr-light">$0</p>
          </div>
        </div>
        
        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <Button 
            className="bg-hookr-accent text-white h-auto py-6 flex flex-col items-center gap-2"
            onClick={() => document.getElementById('creator-dashboard-tabs')?.setAttribute('value', 'content')}
          >
            <Upload className="h-6 w-6" />
            <span>Upload Content</span>
          </Button>
          
          <Button 
            variant="outline" 
            className="border-hookr-light/20 text-hookr-light h-auto py-6 flex flex-col items-center gap-2"
            onClick={() => navigate(`/profile/${profile?.id}`)}
          >
            <Eye className="h-6 w-6" />
            <span>View Profile</span>
          </Button>
        </div>
      </div>
      
      {/* Content Tabs */}
      <div className="px-4 flex-1">
        <Tabs defaultValue="content" id="creator-dashboard-tabs" className="w-full">
          <TabsList className="grid grid-cols-3 bg-hookr-muted w-full">
            <TabsTrigger value="content" className="text-hookr-light">Content</TabsTrigger>
            <TabsTrigger value="analytics" className="text-hookr-light">Analytics</TabsTrigger>
            <TabsTrigger value="settings" className="text-hookr-light">Settings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="content" className="mt-4">
            {/* Upload Form */}
            <div className="mb-8">
              <h3 className="text-hookr-light text-lg mb-4">Upload New Content</h3>
              <PostUploader />
            </div>
            
            {/* Posts Grid */}
            <div className="mt-8">
              <h3 className="text-hookr-light text-lg mb-4">Your Content</h3>
              {isLoadingPosts ? (
                <div className="bg-hookr-muted p-6 rounded-lg text-center py-10">
                  <div className="animate-spin text-hookr-accent mb-2">◌</div>
                  <p className="text-hookr-light/70">Loading your content...</p>
                </div>
              ) : posts.length > 0 ? (
                <PostGrid posts={posts} />
              ) : (
                <div className="bg-hookr-muted p-6 rounded-lg text-center py-10">
                  <BarChart3 className="h-12 w-12 text-hookr-light/50 mx-auto mb-4" />
                  <h3 className="text-hookr-light font-medium text-lg">No Content Yet</h3>
                  <p className="text-hookr-light/70 mt-2 mb-6">
                    Upload photos and videos to start growing your audience
                  </p>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="analytics" className="mt-4">
            <div className="bg-hookr-muted p-6 rounded-lg text-center py-10">
              <BarChart3 className="h-12 w-12 text-hookr-light/50 mx-auto mb-4" />
              <h3 className="text-hookr-light font-medium text-lg">No Analytics Yet</h3>
              <p className="text-hookr-light/70 mt-2">
                Start creating content to see your performance analytics
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="settings" className="mt-4">
            <div className="bg-hookr-muted p-6 rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-hookr-light font-medium">Profile Visibility</h3>
                  <p className="text-hookr-light/70 text-sm">Control who can see your profile</p>
                </div>
                <Cog className="h-5 w-5 text-hookr-light/70" />
              </div>
              
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-hookr-light font-medium">Subscription Pricing</h3>
                  <p className="text-hookr-light/70 text-sm">Set your subscription rates</p>
                </div>
                <Cog className="h-5 w-5 text-hookr-light/70" />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-hookr-light font-medium">Payout Settings</h3>
                  <p className="text-hookr-light/70 text-sm">Manage how you receive payments</p>
                </div>
                <Cog className="h-5 w-5 text-hookr-light/70" />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CreatorDashboard;
