import React, { useState } from "react";
import { Heart, MessageSquare, Save, Search, ArrowUpRight, Bell, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ModelType, Post } from "@/types/model";
import { Avatar } from "@/components/ui/avatar";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
interface StoryProps {
  model: ModelType;
  hasNewStory?: boolean;
}
const Story: React.FC<StoryProps> = ({
  model,
  hasNewStory = false
}) => {
  return <div className="flex flex-col items-center space-y-1 w-20">
      <div className={`w-16 h-16 rounded-full p-[2px] ${hasNewStory ? 'bg-gradient-to-br from-hookr-accent to-pink-500' : 'bg-hookr-muted'}`}>
        <Avatar className="w-full h-full border-2 border-hookr-dark">
          <img src={model.profileImage} alt={model.name} className="object-cover" />
        </Avatar>
      </div>
      <span className="text-xs text-hookr-light truncate w-full text-center">{model.name}</span>
    </div>;
};
interface FeedPostProps {
  post: Post;
  model: ModelType;
}
const FeedPost: React.FC<FeedPostProps> = ({
  post,
  model
}) => {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const navigate = useNavigate();
  const handleProfileClick = () => {
    navigate(`/profile/${model.id}`);
  };
  return <Card className="mb-5 bg-hookr-dark border-hookr-muted/30">
      {/* Header */}
      <div className="p-3 flex items-center justify-between">
        <div className="flex items-center gap-3" onClick={handleProfileClick}>
          <Avatar className="w-8 h-8 border border-hookr-accent/50">
            <img src={model.profileImage} alt={model.name} className="object-cover" />
          </Avatar>
          <div>
            <div className="flex items-center">
              <h4 className="text-hookr-light font-medium text-sm">{model.name}</h4>
              {model.verified && <Badge variant="outline" className="ml-1.5 h-4 py-0 px-1 border-hookr-accent/50">
                  <span className="text-[10px] text-hookr-accent">Verified</span>
                </Badge>}
            </div>
            <p className="text-[10px] text-hookr-light/50">{model.distance}</p>
          </div>
        </div>
        
        <Button variant="ghost" size="sm" className="px-1 h-8 text-hookr-light/70">
          <ArrowUpRight className="h-4 w-4" />
        </Button>
      </div>
      
      {/* Media Content */}
      <div className="relative aspect-square">
        {post.mediaType === 'image' ? <img src={post.mediaUrl} alt="Post content" className="w-full h-full object-cover" /> : <div className="relative w-full h-full bg-black flex items-center justify-center">
            <video src={post.mediaUrl} className="w-full h-full object-contain" controls poster={model.profileImage} />
          </div>}
        
        {post.isPremium && <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm">
            <div className="text-center">
              <div className="text-hookr-accent text-lg font-bold mb-2 flex items-center justify-center">
                <Lock className="h-5 w-5 mr-2" /> Premium Content
              </div>
              <Button size="sm" className="bg-hookr-accent text-white hover:bg-hookr-accent/90">
                Unlock Now
              </Button>
            </div>
          </div>}
      </div>
      
      {/* Actions */}
      <div className="p-3">
        <div className="flex justify-between items-center mb-2">
          <div className="flex gap-4">
            <button className={`flex items-center gap-1 ${liked ? 'text-red-500' : 'text-hookr-light'}`} onClick={() => setLiked(!liked)}>
              <Heart className={`h-5 w-5 ${liked ? 'fill-current' : ''}`} />
            </button>
            
            <button className="flex items-center gap-1 text-hookr-light">
              <MessageSquare className="h-5 w-5" />
            </button>
          </div>
          
          <button className={`text-hookr-light ${saved ? 'text-hookr-accent' : ''}`} onClick={() => setSaved(!saved)}>
            <Save className={`h-5 w-5 ${saved ? 'fill-current' : ''}`} />
          </button>
        </div>
        
        {/* Likes count */}
        <div className="mb-1">
          <p className="text-xs font-medium text-hookr-light">
            {liked ? post.likes + 1 : post.likes} likes
          </p>
        </div>
        
        {/* Caption */}
        <div className="mb-2">
          <p className="text-sm text-hookr-light">
            <span className="font-medium mr-1">{model.name}</span>
            {post.content}
          </p>
        </div>
        
        {/* Comments */}
        {post.comments > 0 && <p className="text-xs text-hookr-light/50">
            View all {post.comments} comments
          </p>}
        
        {/* Timestamp */}
        <p className="text-[10px] text-hookr-light/40 mt-1">
          {new Date(post.timestamp).toLocaleDateString(undefined, {
          month: 'short',
          day: 'numeric'
        })}
        </p>
      </div>
    </Card>;
};
const FeedPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("feed");

  // Mock data for models
  const mockModels: ModelType[] = [{
    id: 'model-1',
    name: 'Jessica',
    profileImage: '/lovable-uploads/767cbf5f-b796-41a6-a945-21b054d14d4b.png',
    rating: 4.8,
    reviewCount: 42,
    distance: '2.5 miles away',
    price: 150,
    tags: ['Massage', 'Dinner Date'],
    availability: [{
      day: 'Mon',
      available: true
    }, {
      day: 'Tue',
      available: true
    }, {
      day: 'Wed',
      available: false
    }, {
      day: 'Thu',
      available: true
    }, {
      day: 'Fri',
      available: true
    }, {
      day: 'Sat',
      available: true
    }, {
      day: 'Sun',
      available: false
    }],
    age: 24,
    verified: true,
    featured: true,
    isCreator: true
  }, {
    id: 'model-2',
    name: 'Sophia',
    profileImage: '/lovable-uploads/a419f82e-1d13-44c4-b3ab-81d3bf9dbae8.png',
    rating: 4.9,
    reviewCount: 36,
    distance: '5 miles away',
    price: 180,
    tags: ['Photoshoot', 'Travel Partner'],
    availability: [{
      day: 'Mon',
      available: false
    }, {
      day: 'Tue',
      available: true
    }, {
      day: 'Wed',
      available: true
    }, {
      day: 'Thu',
      available: true
    }, {
      day: 'Fri',
      available: true
    }, {
      day: 'Sat',
      available: false
    }, {
      day: 'Sun',
      available: false
    }],
    age: 26,
    verified: true,
    featured: false,
    isCreator: true
  }, {
    id: 'model-3',
    name: 'Mia',
    profileImage: '/lovable-uploads/image-1.jpg',
    rating: 4.7,
    reviewCount: 28,
    distance: '1.5 miles away',
    price: 160,
    tags: ['Events', 'Dinner Date'],
    availability: [{
      day: 'Mon',
      available: true
    }, {
      day: 'Tue',
      available: true
    }, {
      day: 'Wed',
      available: false
    }, {
      day: 'Thu',
      available: false
    }, {
      day: 'Fri',
      available: true
    }, {
      day: 'Sat',
      available: true
    }, {
      day: 'Sun',
      available: true
    }],
    age: 22,
    verified: true,
    featured: true,
    isCreator: true
  }, {
    id: 'model-4',
    name: 'Emma',
    profileImage: '/lovable-uploads/image-2.jpg',
    rating: 4.6,
    reviewCount: 18,
    distance: '3.8 miles away',
    price: 140,
    tags: ['Photoshoot', 'Events'],
    availability: [{
      day: 'Mon',
      available: false
    }, {
      day: 'Tue',
      available: false
    }, {
      day: 'Wed',
      available: true
    }, {
      day: 'Thu',
      available: true
    }, {
      day: 'Fri',
      available: true
    }, {
      day: 'Sat',
      available: false
    }, {
      day: 'Sun',
      available: true
    }],
    age: 23,
    verified: false,
    featured: false,
    isCreator: true
  }];

  // Mock data for feed posts
  const mockPosts: Post[] = [{
    id: 'post-1',
    modelId: 'model-1',
    content: 'Having a great day at the beach! Who wants to join? ☀️🏖️',
    mediaUrl: '/lovable-uploads/767cbf5f-b796-41a6-a945-21b054d14d4b.png',
    mediaType: 'image',
    likes: 124,
    comments: 32,
    timestamp: new Date(Date.now() - 3600000 * 2),
    isPremium: false
  }, {
    id: 'post-2',
    modelId: 'model-2',
    content: 'Special content for my premium subscribers 💋',
    mediaUrl: '/lovable-uploads/a419f82e-1d13-44c4-b3ab-81d3bf9dbae8.png',
    mediaType: 'image',
    likes: 89,
    comments: 14,
    timestamp: new Date(Date.now() - 3600000 * 5),
    isPremium: true
  }, {
    id: 'post-3',
    modelId: 'model-3',
    content: 'Getting ready for tonight ✨',
    mediaUrl: '/lovable-uploads/image-3.jpg',
    mediaType: 'image',
    likes: 215,
    comments: 47,
    timestamp: new Date(Date.now() - 3600000 * 8),
    isPremium: false
  }, {
    id: 'post-4',
    modelId: 'model-4',
    content: 'Just another day in paradise 🌴',
    mediaUrl: '/lovable-uploads/image-4.jpg',
    mediaType: 'image',
    likes: 178,
    comments: 23,
    timestamp: new Date(Date.now() - 3600000 * 12),
    isPremium: false
  }];

  // Get model data for each post
  const getModelForPost = (post: Post): ModelType => {
    return mockModels.find(model => model.id === post.modelId) || mockModels[0];
  };
  return <div className="flex flex-col min-h-screen pb-16 bg-hookr-dark">
      {/* Header Bar */}
      <header className="sticky top-0 z-30 bg-hookr-dark border-b border-hookr-muted/20 px-4 py-3 flex justify-between items-center">
        <h1 className="text-hookr-light font-serif italic font-bold text-2xl">hookr</h1>
        
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="relative text-hookr-light">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 h-4 w-4 bg-hookr-accent rounded-full text-[10px] text-white flex items-center justify-center">
              3
            </span>
          </Button>
          
          <Button variant="ghost" size="icon" className="text-hookr-light">
            <Search className="h-5 w-5" />
          </Button>
        </div>
      </header>
      
      {/* Stories Row */}
      <div className="px-4 py-3 border-b border-hookr-muted/20">
        <Carousel className="w-full">
          <CarouselContent className="-ml-2">
            {mockModels.map(model => <CarouselItem key={model.id} className="pl-2 basis-auto">
                <Story model={model} hasNewStory={model.featured} />
              </CarouselItem>)}
          </CarouselContent>
        </Carousel>
      </div>
      
      {/* Main Feed */}
      <Tabs defaultValue="feed" className="w-full" onValueChange={setActiveTab}>
        <div className="px-4 sticky top-[3.6rem] z-20 bg-hookr-dark/95 backdrop-blur-sm pt-2 pb-1 border-b border-hookr-muted/20">
          <TabsList className="grid grid-cols-2 bg-hookr-muted/30 w-full">
            <TabsTrigger value="feed" className="text-hookr-light data-[state=active]:bg-hookr-accent/10 data-[state=active]:text-hookr-accent">
              For You
            </TabsTrigger>
            <TabsTrigger value="subscribed" className="text-hookr-light data-[state=active]:bg-hookr-accent/10 data-[state=active]:text-hookr-accent">
              Following
            </TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="feed" className="mt-2 px-4 pb-4">
          {mockPosts.map(post => <FeedPost key={post.id} post={post} model={getModelForPost(post)} />)}
        </TabsContent>
        
        <TabsContent value="subscribed" className="mt-2">
          {activeTab === "subscribed" && <div className="flex flex-col items-center justify-center py-12 px-6 text-center">
              <div className="w-16 h-16 rounded-full bg-hookr-muted/30 flex items-center justify-center mb-4">
                <Heart className="h-8 w-8 text-hookr-light/30" />
              </div>
              <h3 className="text-hookr-light text-lg font-medium mb-2">No subscriptions yet</h3>
              <p className="text-hookr-light/60 text-sm mb-6">
                Subscribe to models to see their exclusive content here
              </p>
              <Button className="bg-hookr-accent text-white hover:bg-hookr-accent/90" onClick={() => setActiveTab("feed")}>
                Discover Models
              </Button>
            </div>}
        </TabsContent>
      </Tabs>
    </div>;
};
export default FeedPage;