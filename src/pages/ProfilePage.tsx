
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings, LogOut } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const creatorFormSchema = z.object({
  full_name: z.string().min(2, { message: "Full name must be at least 2 characters." }),
  gender: z.string().min(1, { message: "Please select a gender" }),
  bio: z.string().min(20, { message: "Bio must be at least 20 characters." })
});

const ProfilePage: React.FC = () => {
  const { user, profile, isLoading, signOut, refreshProfile } = useAuth();
  const navigate = useNavigate();
  const [showCreatorDialog, setShowCreatorDialog] = useState(false);
  
  const form = useForm<z.infer<typeof creatorFormSchema>>({
    resolver: zodResolver(creatorFormSchema),
    defaultValues: {
      full_name: "",
      gender: "",
      bio: profile?.bio || ""
    }
  });
  
  // Update form values when profile is loaded
  useEffect(() => {
    if (profile) {
      form.setValue("bio", profile.bio || "");
      form.setValue("gender", profile.gender || "");
    }
  }, [profile, form]);
  
  // Redirect to auth page if not logged in
  useEffect(() => {
    if (!isLoading && !user) {
      navigate("/auth");
    }
  }, [user, isLoading, navigate]);
  
  // Helper function to get status badge color
  const getStatusBadge = () => {
    if (!profile) return null;
    
    switch(profile.creator_status) {
      case 'approved':
        return <Badge className="bg-green-600">Approved</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-600">Under Review</Badge>;
      case 'rejected':
        return <Badge className="bg-red-600">Rejected</Badge>;
      default:
        return null;
    }
  };
  
  const handleBecomeCreator = () => {
    setShowCreatorDialog(true);
  };
  
  const onSubmitCreatorForm = async (data: z.infer<typeof creatorFormSchema>) => {
    if (!user) return;
    
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ 
          creator_status: 'pending',
          gender: data.gender, 
          bio: data.bio,
          username: data.full_name,
          applied_at: new Date().toISOString(),
        })
        .eq('id', user.id);
        
      if (error) throw error;
      
      await refreshProfile();
      setShowCreatorDialog(false);
      toast.success("Your creator application has been submitted for review!");
    } catch (error: any) {
      console.error('Error updating profile:', error);
      toast.error("There was an error processing your request.");
    }
  };
  
  // Show loading state
  if (isLoading) {
    return <div className="flex justify-center items-center min-h-screen bg-hookr-dark">
      <div className="animate-spin w-8 h-8 border-4 border-hookr-accent border-t-transparent rounded-full"></div>
    </div>;
  }
  
  // If still loading profile data but we know user exists
  if (!profile && user) {
    return <div className="flex justify-center items-center min-h-screen bg-hookr-dark">
      <div className="animate-spin w-8 h-8 border-4 border-hookr-accent border-t-transparent rounded-full"></div>
    </div>;
  }
  
  return (
    <div className="flex flex-col min-h-screen pb-16">
      <header className="sticky top-0 z-30 bg-hookr-dark bg-opacity-95 backdrop-blur-sm px-4 py-3">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-serif-custom font-hookr-light">Profile</h1>
          <div className="flex gap-2">
            <Button variant="outline" size="icon" className="bg-hookr-muted border-hookr-light border-opacity-10 text-hookr-light">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>
      
      <div className="px-4 py-6">
        <div className="flex items-center gap-4">
          <Avatar className="h-20 w-20 border-2 border-hookr-accent">
            <img src={profile?.avatar_url || "/images/model-1.jpg"} alt="User" className="object-cover" />
          </Avatar>
          <div>
            <h2 className="text-xl font-serif-custom font-bold text-hookr-light">{profile?.username || user?.email}</h2>
            <div className="flex gap-2 items-center">
              <p className="text-hookr-light text-opacity-70">
                {profile?.creator_status === 'approved' ? "Creator" : "Premium Member"}
              </p>
              {getStatusBadge()}
            </div>
            <div className="mt-2 flex gap-2">
              <Button variant="outline" size="sm" className="bg-hookr-muted border-hookr-light border-opacity-20 text-hookr-light">
                Edit Profile
              </Button>
              
              {profile?.creator_status === 'not_applied' && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="bg-hookr-muted border-hookr-accent text-hookr-accent" 
                  onClick={handleBecomeCreator}
                >
                  Become a Hookr
                </Button>
              )}
              
              {profile?.creator_status === 'pending' && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="bg-hookr-muted border-yellow-500 text-yellow-500"
                  disabled
                >
                  Application Pending
                </Button>
              )}
              
              {profile?.creator_status === 'approved' && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="bg-hookr-accent text-white border-hookr-accent"
                  onClick={() => navigate('/creator-dashboard')}
                >
                  Creator Dashboard
                </Button>
              )}
            </div>
          </div>
        </div>
        
        <div className="mt-8">
          <Tabs defaultValue="bookings" className="w-full">
            <TabsList className="grid grid-cols-3 bg-hookr-muted w-full">
              <TabsTrigger value="bookings" className="text-hookr-light">Bookings</TabsTrigger>
              <TabsTrigger value="favorites" className="text-hookr-light">Favorites</TabsTrigger>
              <TabsTrigger value="reviews" className="text-hookr-light">Reviews</TabsTrigger>
            </TabsList>
            
            <TabsContent value="bookings" className="mt-4">
              <div className="bg-hookr-muted p-4 rounded-lg">
                <div className="text-center py-10 text-hookr-light opacity-70">
                  <p>No bookings yet</p>
                  <Button className="mt-4 bg-hookr-accent text-white">Browse Models</Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="favorites" className="mt-4">
              <div className="bg-hookr-muted p-4 rounded-lg">
                <div className="text-center py-10 text-hookr-light opacity-70">
                  <p>No favorites yet</p>
                  <Button className="mt-4 bg-hookr-accent text-white">Browse Models</Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="reviews" className="mt-4">
              <div className="bg-hookr-muted p-4 rounded-lg">
                <div className="text-center py-10 text-hookr-light opacity-70">
                  <p>No reviews yet</p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        <div className="mt-8 flex justify-center">
          <Button 
            variant="ghost" 
            className="text-hookr-light opacity-70 hover:opacity-100"
            onClick={signOut}
          >
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </div>
      
      {/* Become a Creator Dialog with Form */}
      <Dialog open={showCreatorDialog} onOpenChange={setShowCreatorDialog}>
        <DialogContent className="bg-hookr-dark border-hookr-light border-opacity-20 text-hookr-light max-w-md">
          <DialogHeader>
            <DialogTitle className="text-hookr-light">Become a Hookr Creator</DialogTitle>
            <DialogDescription className="text-hookr-light text-opacity-70">
              Complete this form to apply as a creator on our platform.
            </DialogDescription>
          </DialogHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmitCreatorForm)} className="space-y-4">
              <FormField
                control={form.control}
                name="full_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-hookr-light">Full Name</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Your full name" 
                        {...field} 
                        className="bg-hookr-muted text-hookr-light border-hookr-light border-opacity-20" 
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-hookr-light">Gender</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="bg-hookr-muted text-hookr-light border-hookr-light border-opacity-20">
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-hookr-dark text-hookr-light">
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-hookr-light">Bio</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Tell us about yourself..." 
                        {...field} 
                        className="bg-hookr-muted text-hookr-light border-hookr-light border-opacity-20 min-h-[100px]" 
                      />
                    </FormControl>
                    <FormDescription className="text-hookr-light text-opacity-50">
                      Describe your experience, specialties and what makes you unique.
                    </FormDescription>
                  </FormItem>
                )}
              />
              
              <div className="pt-4 bg-hookr-muted rounded-lg p-3">
                <h3 className="font-medium mb-2">Platform Standards</h3>
                <ul className="list-disc pl-5 text-sm space-y-2 text-hookr-light text-opacity-80">
                  <li>Professional quality photos and videos</li>
                  <li>Verified identity and background checks</li>
                  <li>Strict adherence to platform guidelines</li>
                  <li>Reliable scheduling and communication</li>
                </ul>
              </div>
              
              <div className="flex justify-end gap-3 mt-6">
                <Button 
                  type="button" 
                  variant="ghost" 
                  onClick={() => setShowCreatorDialog(false)}
                  className="text-hookr-light"
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  className="bg-hookr-accent text-white"
                  disabled={form.formState.isSubmitting}
                >
                  {form.formState.isSubmitting ? (
                    <span className="flex items-center">
                      <span className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"></span>
                      Submitting...
                    </span>
                  ) : "Apply Now"}
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProfilePage;
