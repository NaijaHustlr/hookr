
import React from "react";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings, LogOut } from "lucide-react";

const ProfilePage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen pb-16">
      <header className="sticky top-0 z-30 bg-hookr-dark bg-opacity-95 backdrop-blur-sm px-4 py-3">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-hookr-light">Profile</h1>
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
              <Button variant="outline" size="sm" className="bg-hookr-muted border-hookr-accent text-hookr-accent">
                Upgrade
              </Button>
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
                  <Button className="book-now-btn mt-4">Browse Models</Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="favorites" className="mt-4">
              <div className="bg-hookr-muted p-4 rounded-lg">
                <div className="text-center py-10 text-hookr-light opacity-70">
                  <p>No favorites yet</p>
                  <Button className="book-now-btn mt-4">Browse Models</Button>
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
          >
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
