
import React, { useState } from "react";
import { Heart, MessageSquare, Save, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ModelType, Post } from "@/types/model";

interface FeedPostProps {
  post: Post;
  model: ModelType;
}

const FeedPost: React.FC<FeedPostProps> = ({ post, model }) => {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);

  return (
    <div className="bg-hookr-muted rounded-lg overflow-hidden mb-4">
      <div className="p-3 flex items-center">
        <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
          <img src={model.profileImage} alt={model.name} className="w-full h-full object-cover" />
        </div>
        <div>
          <h4 className="text-hookr-light font-medium">{model.name}</h4>
          <p className="text-xs text-hookr-light opacity-70">
            {new Date(post.timestamp).toLocaleDateString()}
          </p>
        </div>
      </div>
      
      <div className="relative aspect-square">
        {post.mediaType === 'image' ? (
          <img 
            src={post.mediaUrl} 
            alt="Post content" 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="relative w-full h-full bg-black flex items-center justify-center">
            <video
              src={post.mediaUrl}
              className="w-full h-full object-contain"
              controls
              poster={model.profileImage}
            />
          </div>
        )}
        
        {post.isPremium && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70">
            <div className="text-center">
              <div className="text-hookr-accent text-lg font-bold mb-2">Premium Content</div>
              <Button size="sm" className="bg-hookr-accent text-white">Unlock</Button>
            </div>
          </div>
        )}
      </div>
      
      <div className="p-3">
        <p className="text-sm text-hookr-light mb-3">{post.content}</p>
        
        <div className="flex justify-between items-center">
          <div className="flex gap-4">
            <button 
              className={`flex items-center gap-1 ${liked ? 'text-red-500' : 'text-hookr-light'}`}
              onClick={() => setLiked(!liked)}
            >
              <Heart className={`h-5 w-5 ${liked ? 'fill-current' : ''}`} />
              <span className="text-xs">{liked ? post.likes + 1 : post.likes}</span>
            </button>
            
            <button className="flex items-center gap-1 text-hookr-light">
              <MessageSquare className="h-5 w-5" />
              <span className="text-xs">{post.comments}</span>
            </button>
          </div>
          
          <div className="flex gap-4">
            <Button variant="ghost" size="sm" className="text-hookr-light px-2 py-1">
              Tip
            </Button>
            
            <button 
              className={`text-hookr-light ${saved ? 'text-hookr-accent' : ''}`}
              onClick={() => setSaved(!saved)}
            >
              <Save className={`h-5 w-5 ${saved ? 'fill-current' : ''}`} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const FeedPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("feed");
  
  // Mock data for feed
  const mockModel: ModelType = {
    id: 'model-1',
    name: 'Jessica',
    profileImage: '/lovable-uploads/image-1.jpg',
    rating: 4.8,
    reviewCount: 42,
    distance: '2.5 miles',
    price: 150,
    tags: ['Massage', 'Dinner Date'],
    availability: [
      { day: 'Mon', available: true },
      { day: 'Tue', available: true },
      { day: 'Wed', available: false },
      { day: 'Thu', available: true },
      { day: 'Fri', available: true },
      { day: 'Sat', available: true },
      { day: 'Sun', available: false }
    ],
    age: 24,
    verified: true,
    featured: true,
    isCreator: true
  };
  
  const mockPosts: Post[] = [
    {
      id: 'post-1',
      modelId: 'model-1',
      content: 'Having a great day at the beach! Who wants to join?',
      mediaUrl: '/lovable-uploads/image-2.jpg',
      mediaType: 'image',
      likes: 124,
      comments: 32,
      timestamp: new Date(Date.now() - 3600000 * 2),
      isPremium: false
    },
    {
      id: 'post-2',
      modelId: 'model-1',
      content: 'Special content for my premium subscribers',
      mediaUrl: '/lovable-uploads/image-3.jpg',
      mediaType: 'image',
      likes: 89,
      comments: 14,
      timestamp: new Date(Date.now() - 3600000 * 5),
      isPremium: true
    },
    {
      id: 'post-3',
      modelId: 'model-1',
      content: 'Getting ready for tonight',
      mediaUrl: '/lovable-uploads/image-4.jpg',
      mediaType: 'image',
      likes: 215,
      comments: 47,
      timestamp: new Date(Date.now() - 3600000 * 8),
      isPremium: false
    }
  ];
  
  return (
    <div className="flex flex-col min-h-screen pb-16">
      <header className="sticky top-0 z-30 bg-hookr-dark bg-opacity-95 backdrop-blur-sm px-4 py-3">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-hookr-light">Feed</h1>
        </div>
      </header>
      
      <Tabs defaultValue="feed" className="w-full">
        <div className="px-4">
          <TabsList className="grid grid-cols-2 bg-hookr-muted w-full">
            <TabsTrigger value="feed" className="text-hookr-light">For You</TabsTrigger>
            <TabsTrigger value="subscribed" className="text-hookr-light">Subscribed</TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="feed" className="mt-2 px-4">
          {mockPosts.map(post => (
            <FeedPost key={post.id} post={post} model={mockModel} />
          ))}
        </TabsContent>
        
        <TabsContent value="subscribed" className="flex items-center justify-center h-60 text-hookr-light opacity-70">
          Subscribe to models to see their content here
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FeedPage;
