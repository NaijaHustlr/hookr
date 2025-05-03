import React, { useState } from "react";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings, LogOut } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
const ProfilePage: React.FC = () => {
  const [isCreator, setIsCreator] = useState(false);
  const [showCreatorDialog, setShowCreatorDialog] = useState(false);
  const handleBecomeCreator = () => {
    setShowCreatorDialog(true);
  };
  const handleApplySubmit = () => {
    setShowCreatorDialog(false);
    // In a real app, this would submit the application
    setIsCreator(true); // For demo purposes, immediately approve
  };
  return <div className="flex flex-col min-h-screen pb-16">
      <header className="sticky top-0 z-30 bg-hookr-dark bg-opacity-95 backdrop-blur-sm px-4 py-3">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-serif italic font-hookr-light">Profile</h1>
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
            <img src="/images/model-1.jpg" alt="User" className="object-cover" />
          </Avatar>
          <div>
            <h2 className="text-xl font-bold text-hookr-light">John Doe</h2>
            <p className="text-hookr-light text-opacity-70">Premium Member</p>
            <div className="mt-2 flex gap-2">
              <Button variant="outline" size="sm" className="bg-hookr-muted border-hookr-light border-opacity-20 text-hookr-light">
                Edit Profile
              </Button>
              {!isCreator && <Button variant="outline" size="sm" className="bg-hookr-muted border-hookr-accent text-hookr-accent" onClick={handleBecomeCreator}>
                  Become a Hookr
                </Button>}
              {isCreator && <Button variant="outline" size="sm" className="bg-hookr-accent text-white border-hookr-accent">
                  Creator Account
                </Button>}
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
          <Button variant="ghost" className="text-hookr-light opacity-70 hover:opacity-100">
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </div>
      
      {/* Become a Creator Dialog */}
      <Dialog open={showCreatorDialog} onOpenChange={setShowCreatorDialog}>
        <DialogContent className="bg-hookr-dark border-hookr-light border-opacity-20 text-hookr-light">
          <DialogHeader>
            <DialogTitle className="text-hookr-light">Become a Hookr Creator</DialogTitle>
            <DialogDescription className="text-hookr-light text-opacity-70">
              Join our exclusive network of premium models.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="bg-hookr-muted p-3 rounded-lg">
              <h3 className="font-medium mb-2">Our Platform Standards</h3>
              <ul className="list-disc pl-5 text-sm space-y-2 text-hookr-light text-opacity-80">
                <li>Professional quality photos and videos</li>
                <li>Verified identity and background checks</li>
                <li>Strict adherence to platform guidelines</li>
                <li>Reliable scheduling and communication</li>
                <li>Consistent client satisfaction</li>
              </ul>
            </div>
            
            <div className="bg-hookr-muted p-3 rounded-lg">
              <h3 className="font-medium mb-2">Benefits</h3>
              <ul className="list-disc pl-5 text-sm space-y-2 text-hookr-light text-opacity-80">
                <li>Premium visibility on the platform</li>
                <li>Higher booking rates and income potential</li>
                <li>Content monetization options</li>
                <li>Priority customer support</li>
                <li>Exclusive creator community access</li>
              </ul>
            </div>
            
            <div className="flex justify-end gap-3 mt-4">
              <Button variant="ghost" onClick={() => setShowCreatorDialog(false)}>Cancel</Button>
              <Button className="bg-hookr-accent text-white" onClick={handleApplySubmit}>Apply Now</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>;
};
export default ProfilePage;