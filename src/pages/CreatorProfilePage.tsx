
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Star, Calendar, Shield, Lock, ArrowLeft } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import ModelAvailability from "@/components/model/ModelAvailability";
import ModelTags from "@/components/model/ModelTags";
import { useToast } from "@/hooks/use-toast";
import { ModelType } from "@/types/model";

// Mock function to fetch creator data - in a real app, this would make an API call
const fetchCreator = async (id: string): Promise<ModelType | undefined> => {
  // This would be an API call in a real app
  return new Promise((resolve) => {
    setTimeout(() => {
      // Simulating API response with mock data
      const mockCreators: ModelType[] = [
        {
          id: "1",
          name: "Jessica Taylor",
          profileImage: "/images/model-1.jpg",
          fallbackImage: "/placeholder.svg",
          rating: 4.8,
          reviewCount: 124,
          distance: "2.5 miles",
          price: 250,
          tags: ["Massage", "Dinner Date", "Overnight"],
          age: 24,
          verified: true,
          featured: true,
          availability: [
            { day: "Mon", available: true },
            { day: "Tue", available: true },
            { day: "Wed", available: false },
            { day: "Thu", available: true },
            { day: "Fri", available: true },
            { day: "Sat", available: true },
            { day: "Sun", available: false },
          ],
          isCreator: true,
          posts: [
            {
              id: "post1",
              modelId: "1",
              content: "Had an amazing photoshoot today!",
              mediaUrl: "/images/model-1.jpg",
              mediaType: "image",
              likes: 235,
              comments: 42,
              timestamp: new Date(),
              isPremium: false,
            },
            {
              id: "post2",
              modelId: "1",
              content: "Exclusive content for my subscribers",
              mediaUrl: "/images/model-2.jpg",
              mediaType: "image",
              likes: 312,
              comments: 57,
              timestamp: new Date(),
              isPremium: true,
            },
          ],
        },
        {
          id: "2",
          name: "Alicia Reed",
          profileImage: "/images/model-2.jpg",
          fallbackImage: "/placeholder.svg",
          rating: 4.9,
          reviewCount: 89,
          distance: "4.2 miles",
          price: 300,
          tags: ["Massage", "Travel", "Events"],
          age: 26,
          verified: true,
          featured: false,
          availability: [
            { day: "Mon", available: false },
            { day: "Tue", available: true },
            { day: "Wed", available: true },
            { day: "Thu", available: true },
            { day: "Fri", available: false },
            { day: "Sat", available: true },
            { day: "Sun", available: true },
          ],
          isCreator: true,
          posts: [
            {
              id: "post3",
              modelId: "2",
              content: "Beach day vibes",
              mediaUrl: "/images/model-2.jpg",
              mediaType: "image",
              likes: 427,
              comments: 36,
              timestamp: new Date(),
              isPremium: false,
            },
          ],
        },
      ];

      const creator = mockCreators.find((c) => c.id === id);
      resolve(creator);
    }, 500);
  });
};

const CreatorProfilePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedTab, setSelectedTab] = useState("gallery");
  const [showBookingModal, setShowBookingModal] = useState(false);

  const { data: creator, isLoading } = useQuery({
    queryKey: ["creator", id],
    queryFn: () => (id ? fetchCreator(id) : undefined),
    enabled: !!id,
  });

  const handleBookNow = () => {
    // In a real app, this would open a booking form or process
    toast({
      title: "Booking Started",
      description: `You're booking time with ${creator?.name}`,
    });
    setShowBookingModal(true);
  };

  const handleUnlockContent = () => {
    toast({
      title: "Premium Content",
      description: "Subscribe to unlock all content",
      variant: "destructive",
    });
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-hookr-dark flex justify-center items-center">
        <div className="animate-pulse text-hookr-light">Loading profile...</div>
      </div>
    );
  }

  if (!creator) {
    return (
      <div className="min-h-screen bg-hookr-dark flex flex-col justify-center items-center p-4">
        <h2 className="text-2xl text-hookr-light mb-4">Profile Not Found</h2>
        <Button onClick={handleGoBack} variant="outline">
          Go Back
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-hookr-dark pb-20">
      {/* Header with back button */}
      <header className="sticky top-0 z-30 bg-hookr-dark bg-opacity-95 backdrop-blur-sm px-4 py-3">
        <div className="flex justify-between items-center">
          <Button
            variant="ghost"
            size="icon"
            className="text-hookr-light"
            onClick={handleGoBack}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-bold text-hookr-light">Profile</h1>
          <div className="w-10"></div> {/* Spacer for centering */}
        </div>
      </header>

      {/* Hero section with profile image */}
      <div className="relative h-60 md:h-80">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-hookr-dark z-10"></div>
        <img
          src={creator.profileImage}
          alt={creator.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            if (creator.fallbackImage) {
              target.src = creator.fallbackImage;
            }
          }}
        />
      </div>

      {/* Profile info section */}
      <div className="px-4 -mt-16 relative z-20">
        <div className="flex items-end mb-4">
          <Avatar className="h-24 w-24 border-4 border-hookr-dark">
            <img
              src={creator.profileImage}
              alt={creator.name}
              className="object-cover"
            />
          </Avatar>
          <div className="ml-4 mb-2">
            <div className="flex items-center">
              <h2 className="text-2xl font-bold text-hookr-light">
                {creator.name}
              </h2>
              {creator.verified && (
                <Badge className="ml-2 bg-hookr-accent">
                  <Shield className="h-3 w-3 mr-1" />
                  Verified
                </Badge>
              )}
            </div>
            <p className="text-hookr-light text-opacity-70">
              Age: {creator.age} • {creator.distance} away
            </p>
          </div>
        </div>

        <div className="flex items-center mb-4">
          <div className="flex items-center">
            <Star className="w-4 h-4 text-hookr-accent mr-1 fill-hookr-accent" />
            <span className="text-sm font-medium text-hookr-light">
              {creator.rating.toFixed(1)} ({creator.reviewCount})
            </span>
          </div>
          <div className="ml-auto">
            <p className="text-xl font-bold text-hookr-accent">
              ${creator.price}
              <span className="text-xs text-hookr-light opacity-80 ml-1">
                per hour
              </span>
            </p>
          </div>
        </div>

        <div className="mb-6">
          <ModelTags tags={creator.tags} />
        </div>

        <div className="mb-6">
          <h3 className="text-hookr-light mb-2 font-medium">Availability</h3>
          <ModelAvailability availability={creator.availability} />
        </div>

        <div className="flex gap-2 mb-6">
          <Button
            className="bg-hookr-accent text-hookr-light font-semibold flex-1 rounded-full hover:bg-opacity-90 transition-colors duration-200"
            onClick={handleBookNow}
          >
            <Calendar className="w-4 h-4 mr-2" />
            Book Now
          </Button>
          <Button
            variant="outline"
            className="border-hookr-accent text-hookr-accent flex-1 rounded-full hover:bg-hookr-accent hover:bg-opacity-10"
            onClick={handleUnlockContent}
          >
            <Lock className="w-4 h-4 mr-2" />
            Unlock All Content
          </Button>
        </div>

        {/* Content tabs */}
        <Tabs
          defaultValue="gallery"
          value={selectedTab}
          onValueChange={setSelectedTab}
          className="w-full"
        >
          <TabsList className="grid grid-cols-3 bg-hookr-muted w-full">
            <TabsTrigger value="gallery" className="text-hookr-light">
              Gallery
            </TabsTrigger>
            <TabsTrigger value="services" className="text-hookr-light">
              Services
            </TabsTrigger>
            <TabsTrigger value="reviews" className="text-hookr-light">
              Reviews
            </TabsTrigger>
          </TabsList>

          <TabsContent value="gallery" className="mt-4">
            <div className="grid grid-cols-2 gap-2">
              {creator.posts?.map((post) => (
                <Card
                  key={post.id}
                  className={`bg-hookr-muted border-hookr-muted overflow-hidden relative ${
                    post.isPremium ? "opacity-60" : ""
                  }`}
                >
                  <div className="relative aspect-square">
                    <img
                      src={post.mediaUrl}
                      alt={post.content}
                      className="object-cover w-full h-full"
                    />
                    {post.isPremium && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                        <Lock className="w-8 h-8 text-white" />
                      </div>
                    )}
                  </div>
                  <CardContent className="p-2">
                    <p className="text-xs text-hookr-light truncate">
                      {post.content}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="services" className="mt-4">
            <Card className="bg-hookr-muted border-hookr-muted">
              <CardContent className="p-4">
                <ul className="space-y-3">
                  <li className="flex justify-between text-hookr-light">
                    <span>1 Hour</span>
                    <span className="font-bold">${creator.price}</span>
                  </li>
                  <li className="flex justify-between text-hookr-light">
                    <span>2 Hours</span>
                    <span className="font-bold">
                      ${Math.round(creator.price * 1.8)}
                    </span>
                  </li>
                  <li className="flex justify-between text-hookr-light">
                    <span>Dinner Date (4 hours)</span>
                    <span className="font-bold">
                      ${Math.round(creator.price * 3.5)}
                    </span>
                  </li>
                  <li className="flex justify-between text-hookr-light">
                    <span>Overnight (10 hours)</span>
                    <span className="font-bold">
                      ${Math.round(creator.price * 8)}
                    </span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reviews" className="mt-4">
            <Card className="bg-hookr-muted border-hookr-muted">
              <CardContent className="p-4">
                <div className="text-center py-10 text-hookr-light opacity-70">
                  <p>No reviews yet</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CreatorProfilePage;
