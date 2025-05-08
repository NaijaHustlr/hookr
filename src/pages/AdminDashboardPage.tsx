
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, UserCheck, UserX, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { isAdmin } from "@/utils/adminUtils";
import { Profile } from "@/types/supabase";

const AdminDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isAdminUser, setIsAdminUser] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  
  useEffect(() => {
    const checkAdminStatus = async () => {
      setIsLoading(true);
      const adminStatus = await isAdmin();
      setIsAdminUser(adminStatus);
      setIsLoading(false);
      
      if (!adminStatus) {
        navigate('/');
        toast({
          title: "Access Denied",
          description: "You don't have permission to access this page.",
          variant: "destructive"
        });
      }
    };
    
    checkAdminStatus();
  }, [navigate, toast]);
  
  // Fetch pending creator applications
  const { data: pendingCreators = [], isLoading: isLoadingCreators, refetch } = useQuery({
    queryKey: ['pending-creators'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('creator_status', 'pending')
        .order('applied_at', { ascending: false });
        
      if (error) throw error;
      return data as Profile[];
    },
    enabled: isAdminUser,
  });
  
  const handleApprove = async (profileId: string) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ 
          creator_status: 'approved',
          approved_at: new Date().toISOString()
        })
        .eq('id', profileId);
        
      if (error) throw error;
      
      toast({
        title: "Creator Approved",
        description: "The creator application has been approved."
      });
      
      refetch();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Something went wrong",
        variant: "destructive"
      });
    }
  };
  
  const handleReject = async (profileId: string) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ 
          creator_status: 'rejected'
        })
        .eq('id', profileId);
        
      if (error) throw error;
      
      toast({
        title: "Creator Rejected",
        description: "The creator application has been rejected."
      });
      
      refetch();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Something went wrong",
        variant: "destructive"
      });
    }
  };
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-hookr-dark">
        <Loader2 className="h-8 w-8 text-hookr-accent animate-spin" />
      </div>
    );
  }
  
  if (!isAdminUser) {
    return null; // Will redirect via useEffect
  }

  return (
    <div className="flex flex-col min-h-screen bg-hookr-dark pb-20">
      {/* Header with back button */}
      <header className="sticky top-0 z-30 bg-hookr-dark bg-opacity-95 backdrop-blur-sm px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="mr-2">
              <ArrowLeft className="h-5 w-5 text-hookr-light" />
            </Button>
            <h1 className="text-xl font-serif-custom text-hookr-light">Admin Dashboard</h1>
          </div>
        </div>
      </header>
      
      <div className="px-4 py-6">
        <Tabs defaultValue="applications">
          <TabsList className="grid grid-cols-2 bg-hookr-muted w-full">
            <TabsTrigger value="applications" className="text-hookr-light">Creator Applications</TabsTrigger>
            <TabsTrigger value="users" className="text-hookr-light">Users</TabsTrigger>
          </TabsList>
          
          <TabsContent value="applications" className="mt-4">
            <h2 className="text-hookr-light text-lg mb-4">Pending Applications ({pendingCreators.length})</h2>
            
            {isLoadingCreators ? (
              <div className="flex justify-center py-10">
                <Loader2 className="h-6 w-6 text-hookr-accent animate-spin" />
              </div>
            ) : pendingCreators.length === 0 ? (
              <Card className="bg-hookr-muted border-hookr-light border-opacity-10">
                <CardContent className="pt-6 text-center text-hookr-light">
                  <p>No pending applications</p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {pendingCreators.map(creator => (
                  <Card key={creator.id} className="bg-hookr-muted border-hookr-light border-opacity-10">
                    <CardHeader className="pb-2">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <img src={creator.avatar_url || "/placeholder.svg"} alt={creator.username || "User"} />
                          </Avatar>
                          <div>
                            <CardTitle className="text-hookr-light">{creator.username || "Anonymous"}</CardTitle>
                            <CardDescription className="text-hookr-light text-opacity-70">
                              Applied: {new Date(creator.applied_at || "").toLocaleDateString()}
                            </CardDescription>
                          </div>
                        </div>
                        <Badge className="bg-yellow-600">Pending</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="mt-2 mb-4">
                        <h4 className="text-sm font-medium text-hookr-light mb-1">Bio:</h4>
                        <p className="text-sm text-hookr-light text-opacity-80">{creator.bio || "No bio provided"}</p>
                      </div>
                      <div className="mb-4">
                        <h4 className="text-sm font-medium text-hookr-light mb-1">Gender:</h4>
                        <p className="text-sm text-hookr-light text-opacity-80">{creator.gender || "Not specified"}</p>
                      </div>
                      <div className="flex gap-2 mt-4">
                        <Button
                          onClick={() => handleApprove(creator.id)}
                          className="flex-1 bg-green-600 hover:bg-green-700"
                        >
                          <UserCheck className="mr-2 h-4 w-4" /> Approve
                        </Button>
                        <Button
                          onClick={() => handleReject(creator.id)}
                          variant="outline"
                          className="flex-1 border-red-600 text-red-600 hover:bg-red-600 hover:text-white"
                        >
                          <UserX className="mr-2 h-4 w-4" /> Reject
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="users" className="mt-4">
            <Card className="bg-hookr-muted border-hookr-light border-opacity-10">
              <CardContent className="pt-6 text-center text-hookr-light">
                <p>User management features coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
