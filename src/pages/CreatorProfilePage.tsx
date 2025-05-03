
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Star, Calendar, Shield, Lock, ArrowLeft, Heart, MessageSquare, Save, DollarSign } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import ModelAvailability from "@/components/model/ModelAvailability";
import ModelTags from "@/components/model/ModelTags";
import { useToast } from "@/hooks/use-toast";
import { ModelType, Post } from "@/types/model";

// Mock function to fetch creator data - in a real app, this would make an API call
const fetchCreator = async (id: string): Promise<ModelType | undefined> => {
  // This would be an API call in a real app
  return new Promise(resolve => {
    setTimeout(() => {
      // Simulating API response with mock data
      const mockCreators: ModelType[] = [{
        id: "model-1", // Updated to match the ID format used elsewhere
        name: "Jessica Taylor",
        profileImage: "/lovable-uploads/image-1.jpg", // Updated to use the lovable-uploads path
        fallbackImage: "/placeholder.svg",
        rating: 4.8,
        reviewCount: 124,
        distance: "2.5 miles",
        price: 250,
        tags: ["Massage", "Dinner Date", "Overnight"],
        age: 24,
        verified: true,
        featured: true,
        availability: [{
          day: "Mon",
          available: true
        }, {
          day: "Tue",
          available: true
        }, {
          day: "Wed",
          available: false
        }, {
          day: "Thu",
          available: true
        }, {
          day: "Fri",
          available: true
        }, {
          day: "Sat",
          available: true
        }, {
          day: "Sun",
          available: false
        }],
        isCreator: true,
        posts: [{
          id: "post1",
          modelId: "model-1",
          content: "Had an amazing photoshoot today! Check out these new pics 📸✨",
          mediaUrl: "/lovable-uploads/image-1.jpg",
          mediaType: "image",
          likes: 235,
          comments: 42,
          timestamp: new Date(),
          isPremium: false
        }, {
          id: "post2",
          modelId: "model-1",
          content: "Exclusive content for my subscribers 💋",
          mediaUrl: "/lovable-uploads/image-2.jpg",
          mediaType: "image",
          likes: 312,
          comments: 57,
          timestamp: new Date(),
          isPremium: true
        }, {
          id: "post3",
          modelId: "model-1",
          content: "Getting ready for tonight's event! Who's coming?",
          mediaUrl: "/lovable-uploads/image-3.jpg",
          mediaType: "image",
          likes: 178,
          comments: 29,
          timestamp: new Date(),
          isPremium: false
        }, {
          id: "post4",
          modelId: "model-1",
          content: "Premium subscribers only - behind the scenes",
          mediaUrl: "/lovable-uploads/image-4.jpg",
          mediaType: "image",
          likes: 402,
          comments: 63,
          timestamp: new Date(),
          isPremium: true
        }]
      }, {
        id: "model-2", // Updated to match the ID format used elsewhere
        name: "Alicia Reed",
        profileImage: "/lovable-uploads/image-2.jpg", // Updated to use the lovable-uploads path
        fallbackImage: "/placeholder.svg",
        rating: 4.9,
        reviewCount: 89,
        distance: "4.2 miles",
        price: 300,
        tags: ["Massage", "Travel", "Events"],
        age: 26,
        verified: true,
        featured: false,
        availability: [{
          day: "Mon",
          available: false
        }, {
          day: "Tue",
          available: true
        }, {
          day: "Wed",
          available: true
        }, {
          day: "Thu",
          available: true
        }, {
          day: "Fri",
          available: false
        }, {
          day: "Sat",
          available: true
        }, {
          day: "Sun",
          available: true
        }],
        isCreator: true,
        posts: [{
          id: "post5",
          modelId: "model-2",
          content: "Beach day vibes 🌊",
          mediaUrl: "/lovable-uploads/image-5.jpg",
          mediaType: "image",
          likes: 427,
          comments: 36,
          timestamp: new Date(),
          isPremium: false
        }, {
          id: "post6",
          modelId: "model-2",
          content: "Special content for my VIPs",
          mediaUrl: "/lovable-uploads/image-6.jpg",
          mediaType: "image",
          likes: 289,
          comments: 41,
          timestamp: new Date(),
          isPremium: true
        }]
      }];
      
      // Updated to match the new ID format (model-1, model-2)
      const creator = mockCreators.find(c => c.id === id);
      resolve(creator);
    }, 500);
  });
};

// Define subscription tiers
const subscriptionTiers = [
  {
    id: "monthly",
    name: "Monthly",
    price: 19.99,
    description: "Basic access to all content",
    benefits: [
      "Exclusive photos",
      "Chat access",
      "Early access to new content"
    ]
  },
  {
    id: "quarterly",
    name: "Quarterly",
    price: 49.99,
    description: "Save 17% compared to monthly",
    benefits: [
      "Everything in Monthly",
      "Private photo requests (2/month)",
      "Video calls (1/month)"
    ]
  },
  {
    id: "yearly",
    name: "Yearly VIP",
    price: 149.99,
    description: "Best value - Save 38%",
    benefits: [
      "Everything in Quarterly",
      "Priority chat responses",
      "Unlimited photo requests",
      "Monthly video call"
    ]
  }
];

// Add mock reviews
const mockReviews = [
  {
    id: "review1",
    userName: "James",
    rating: 5,
    content: "Amazing experience! Jessica was professional, fun and made me feel completely at ease.",
    date: "May 2, 2025"
  },
  {
    id: "review2",
    userName: "Michael",
    rating: 5,
    content: "Worth every penny. Such a great personality and so attentive.",
    date: "April 28, 2025"
  },
  {
    id: "review3",
    userName: "David",
    rating: 4,
    content: "Great time, very professional and accommodating. Will book again.",
    date: "April 15, 2025"
  }
];

const CreatorProfilePage: React.FC = () => {
  const {
    id
  } = useParams<{
    id: string;
  }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // State management
  const [selectedTab, setSelectedTab] = useState("gallery");
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  const [selectedTier, setSelectedTier] = useState("monthly");
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [activePost, setActivePost] = useState<Post | null>(null);
  const [likedPosts, setLikedPosts] = useState<string[]>([]);
  const [savedPosts, setSavedPosts] = useState<string[]>([]);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);

  // Fetch creator data
  const {
    data: creator,
    isLoading
  } = useQuery({
    queryKey: ["creator", id],
    queryFn: () => id ? fetchCreator(id) : undefined,
    enabled: !!id
  });

  // Handlers
  const handleBookNow = () => {
    toast({
      title: "Booking Started",
      description: `You're booking time with ${creator?.name}`
    });
    setShowBookingModal(true);
  };

  const handleUnlockContent = () => {
    if (isSubscribed) {
      toast({
        title: "Premium Content",
        description: "You now have access to all content",
        variant: "default"
      });
    } else {
      setShowSubscriptionModal(true);
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleLikePost = (postId: string) => {
    if (likedPosts.includes(postId)) {
      setLikedPosts(likedPosts.filter(id => id !== postId));
    } else {
      setLikedPosts([...likedPosts, postId]);
      toast({
        title: "Post liked",
        description: "Added to your liked posts",
      });
    }
  };

  const handleSavePost = (postId: string) => {
    if (savedPosts.includes(postId)) {
      setSavedPosts(savedPosts.filter(id => id !== postId));
    } else {
      setSavedPosts([...savedPosts, postId]);
      toast({
        title: "Post saved",
        description: "Added to your saved collection",
      });
    }
  };

  const handleOpenComments = (post: Post) => {
    setActivePost(post);
    setShowCommentModal(true);
  };

  const handleSubscribe = () => {
    setIsProcessingPayment(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessingPayment(false);
      setShowSubscriptionModal(false);
      setIsSubscribed(true);
      setShowSuccessDialog(true);
    }, 2000);
  };

  const handleTipCreator = () => {
    toast({
      title: "Tip Sent",
      description: `You've sent a tip to ${creator?.name}. Thank you!`,
      variant: "default"
    });
  };

  if (isLoading) {
    return <div className="min-h-screen bg-hookr-dark flex justify-center items-center">
        <div className="animate-pulse text-hookr-light">Loading profile...</div>
      </div>;
  }

  if (!creator) {
    return <div className="min-h-screen bg-hookr-dark flex flex-col justify-center items-center p-4">
        <h2 className="text-2xl text-hookr-light mb-4">Profile Not Found</h2>
        <Button onClick={handleGoBack} variant="outline" className="text-gray-950">
          Go Back
        </Button>
      </div>;
  }

  // Determine subscription button text based on subscription status
  const subscribeButtonText = isSubscribed ? "Subscribed ✓" : "Subscribe";
  const selectedSubscriptionTier = subscriptionTiers.find(tier => tier.id === selectedTier);

  return <div className="flex flex-col min-h-screen bg-hookr-dark pb-20">
      {/* Header with back button */}
      <header className="sticky top-0 z-30 bg-hookr-dark bg-opacity-95 backdrop-blur-sm px-4 py-3">
        <div className="flex justify-between items-center">
          <Button variant="ghost" size="icon" className="text-hookr-light" onClick={handleGoBack}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-bold text-hookr-light">Profile</h1>
          <div className="w-10"></div> {/* Spacer for centering */}
        </div>
      </header>

      {/* Hero section with profile image */}
      <div className="relative h-60 md:h-80">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-hookr-dark z-10"></div>
        <img src={creator.profileImage} alt={creator.name} className="w-full h-full object-cover" onError={e => {
        const target = e.target as HTMLImageElement;
        if (creator.fallbackImage) {
          target.src = creator.fallbackImage;
        }
      }} />
      </div>

      {/* Profile info section */}
      <div className="px-4 -mt-16 relative z-20">
        <div className="flex items-end mb-4">
          <Avatar className="h-24 w-24 border-4 border-hookr-dark">
            <img src={creator.profileImage} alt={creator.name} className="object-cover" />
          </Avatar>
          <div className="ml-4 mb-2">
            <div className="flex items-center">
              <h2 className="text-2xl font-bold text-hookr-light">
                {creator.name}
              </h2>
              {creator.verified && <Badge className="ml-2 bg-hookr-accent">
                  <Shield className="h-3 w-3 mr-1" />
                  Verified
                </Badge>}
              {isSubscribed && <Badge className="ml-2 bg-green-500 text-white">
                  Subscribed
                </Badge>}
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

        <div className="flex flex-wrap gap-2 mb-6">
          <Button className="bg-hookr-accent text-hookr-light font-semibold flex-1 rounded-full hover:bg-opacity-90 transition-colors duration-200" onClick={handleBookNow}>
            <Calendar className="w-4 h-4 mr-2" />
            Book Now
          </Button>
          
          <Button 
            variant="outline" 
            className={`border-hookr-accent text-hookr-accent flex-1 rounded-full hover:bg-hookr-accent hover:bg-opacity-10 ${isSubscribed ? 'bg-hookr-accent bg-opacity-10' : ''}`} 
            onClick={handleUnlockContent}
          >
            <Lock className="w-4 h-4 mr-2" />
            Unlock All Content
          </Button>
          
          <Button 
            variant={isSubscribed ? "outline" : "default"}
            className={`flex-1 rounded-full ${isSubscribed 
              ? 'border-green-500 text-green-500 hover:bg-green-500 hover:bg-opacity-10' 
              : 'bg-green-500 text-white hover:bg-green-600'}`} 
            onClick={() => setShowSubscriptionModal(true)}
          >
            <DollarSign className="w-4 h-4 mr-2" />
            {subscribeButtonText}
          </Button>
        </div>

        {/* Content tabs */}
        <Tabs defaultValue="gallery" value={selectedTab} onValueChange={setSelectedTab} className="w-full">
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
              {creator.posts?.map(post => (
                <Card 
                  key={post.id} 
                  className={`bg-hookr-muted border-hookr-muted overflow-hidden relative ${post.isPremium && !isSubscribed ? "opacity-60" : ""}`}
                >
                  <div className="relative aspect-square">
                    <img 
                      src={post.mediaUrl} 
                      alt={post.content} 
                      className="object-cover w-full h-full" 
                    />
                    {post.isPremium && !isSubscribed && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                        <Lock className="w-8 h-8 text-white" />
                      </div>
                    )}
                  </div>
                  <CardContent className="p-3">
                    <p className="text-xs text-hookr-light truncate mb-2">
                      {post.content}
                    </p>
                    <div className="flex justify-between items-center">
                      <div className="flex space-x-3">
                        <button 
                          className={`flex items-center ${likedPosts.includes(post.id) ? 'text-red-500' : 'text-hookr-light'}`}
                          onClick={() => handleLikePost(post.id)}
                        >
                          <Heart className={`h-4 w-4 ${likedPosts.includes(post.id) ? 'fill-current' : ''}`} />
                          <span className="text-xs ml-1">
                            {likedPosts.includes(post.id) ? post.likes + 1 : post.likes}
                          </span>
                        </button>
                        <button 
                          className="flex items-center text-hookr-light"
                          onClick={() => handleOpenComments(post)}
                        >
                          <MessageSquare className="h-4 w-4" />
                          <span className="text-xs ml-1">{post.comments}</span>
                        </button>
                      </div>
                      <button 
                        className={`text-hookr-light ${savedPosts.includes(post.id) ? 'text-hookr-accent' : ''}`}
                        onClick={() => handleSavePost(post.id)}
                      >
                        <Save className={`h-4 w-4 ${savedPosts.includes(post.id) ? 'fill-current' : ''}`} />
                      </button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="services" className="mt-4">
            <Card className="bg-hookr-muted border-hookr-muted">
              <CardContent className="p-4">
                <ul className="space-y-4">
                  <li className="flex justify-between items-center text-hookr-light p-2 hover:bg-hookr-dark hover:bg-opacity-20 rounded-lg transition-colors">
                    <div>
                      <h4 className="font-medium">1 Hour</h4>
                      <p className="text-xs text-hookr-light text-opacity-70">Standard session</p>
                    </div>
                    <span className="font-bold">${creator.price}</span>
                  </li>
                  <li className="flex justify-between items-center text-hookr-light p-2 hover:bg-hookr-dark hover:bg-opacity-20 rounded-lg transition-colors">
                    <div>
                      <h4 className="font-medium">2 Hours</h4>
                      <p className="text-xs text-hookr-light text-opacity-70">Extended session with drinks</p>
                    </div>
                    <span className="font-bold">
                      ${Math.round(creator.price * 1.8)}
                    </span>
                  </li>
                  <li className="flex justify-between items-center text-hookr-light p-2 hover:bg-hookr-dark hover:bg-opacity-20 rounded-lg transition-colors">
                    <div>
                      <h4 className="font-medium">Dinner Date (4 hours)</h4>
                      <p className="text-xs text-hookr-light text-opacity-70">Fine dining and quality time</p>
                    </div>
                    <span className="font-bold">
                      ${Math.round(creator.price * 3.5)}
                    </span>
                  </li>
                  <li className="flex justify-between items-center text-hookr-light p-2 hover:bg-hookr-dark hover:bg-opacity-20 rounded-lg transition-colors">
                    <div>
                      <h4 className="font-medium">Overnight (10 hours)</h4>
                      <p className="text-xs text-hookr-light text-opacity-70">Full evening and morning</p>
                    </div>
                    <span className="font-bold">
                      ${Math.round(creator.price * 8)}
                    </span>
                  </li>
                  <li className="flex justify-between items-center text-hookr-light p-2 hover:bg-hookr-dark hover:bg-opacity-20 rounded-lg transition-colors">
                    <div>
                      <h4 className="font-medium">Weekend Getaway</h4>
                      <p className="text-xs text-hookr-light text-opacity-70">48 hours exclusive companionship</p>
                    </div>
                    <span className="font-bold">
                      ${Math.round(creator.price * 15)}
                    </span>
                  </li>
                </ul>
                
                <div className="mt-6 bg-hookr-dark bg-opacity-30 p-3 rounded-lg">
                  <h4 className="font-medium text-hookr-light mb-2">Special Requests</h4>
                  <p className="text-sm text-hookr-light text-opacity-70">
                    Custom arrangements available upon discussion. Contact directly for special requests.
                  </p>
                  <Button 
                    className="mt-3 bg-hookr-accent text-hookr-light w-full"
                    onClick={handleBookNow}
                  >
                    Inquire Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reviews" className="mt-4">
            <Card className="bg-hookr-muted border-hookr-muted">
              <CardContent className="p-4">
                {mockReviews.length > 0 ? (
                  <div className="space-y-4">
                    {mockReviews.map(review => (
                      <div key={review.id} className="border-b border-hookr-light border-opacity-10 pb-4 last:border-0">
                        <div className="flex justify-between items-center mb-2">
                          <div className="flex items-center">
                            <div className="w-8 h-8 bg-hookr-accent rounded-full flex items-center justify-center text-white text-sm font-bold">
                              {review.userName.charAt(0)}
                            </div>
                            <span className="ml-2 font-medium text-hookr-light">{review.userName}</span>
                          </div>
                          <div className="flex items-center">
                            {Array.from({ length: 5 }).map((_, index) => (
                              <Star 
                                key={index} 
                                className={`w-4 h-4 ${index < review.rating ? 'text-hookr-accent fill-hookr-accent' : 'text-gray-400'}`}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-sm text-hookr-light">{review.content}</p>
                        <p className="text-xs text-hookr-light text-opacity-50 mt-1">{review.date}</p>
                      </div>
                    ))}
                    <Button 
                      variant="outline"
                      className="w-full mt-4 border-hookr-light border-opacity-20 text-hookr-light"
                    >
                      Write a Review
                    </Button>
                  </div>
                ) : (
                  <div className="text-center py-10 text-hookr-light opacity-70">
                    <p>No reviews yet</p>
                    <Button className="mt-4 bg-hookr-accent text-white">Be the First to Review</Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Subscription Modal */}
      <Dialog open={showSubscriptionModal} onOpenChange={setShowSubscriptionModal}>
        <DialogContent className="bg-hookr-dark border-hookr-muted text-hookr-light">
          <DialogHeader>
            <DialogTitle className="text-hookr-light text-xl">Subscribe to {creator.name}</DialogTitle>
            <DialogDescription className="text-hookr-light text-opacity-70">
              Choose your subscription plan to unlock all content.
            </DialogDescription>
          </DialogHeader>
          
          <div className="mt-4 space-y-4">
            {subscriptionTiers.map((tier) => (
              <div 
                key={tier.id}
                className={`p-4 rounded-lg cursor-pointer transition-all ${selectedTier === tier.id 
                  ? 'bg-hookr-accent bg-opacity-20 border-2 border-hookr-accent' 
                  : 'bg-hookr-muted border-2 border-transparent'}`}
                onClick={() => setSelectedTier(tier.id)}
              >
                <div className="flex justify-between items-center">
                  <h3 className="font-bold text-hookr-light">{tier.name}</h3>
                  <p className="font-bold text-hookr-accent">${tier.price}</p>
                </div>
                <p className="text-sm text-hookr-light text-opacity-70 mt-1">{tier.description}</p>
                <ul className="mt-3 space-y-2">
                  {tier.benefits.map((benefit, index) => (
                    <li key={index} className="text-sm flex items-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-hookr-accent mr-2"></div>
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            
            <div className="bg-hookr-muted p-4 rounded-lg mt-6">
              <h3 className="font-medium mb-2 text-hookr-light">Payment Details</h3>
              <div className="space-y-3">
                <div>
                  <label className="text-sm text-hookr-light">Card Number</label>
                  <input 
                    type="text" 
                    placeholder="**** **** **** ****" 
                    className="w-full p-2 bg-hookr-dark rounded-md text-hookr-light focus:outline-none focus:ring-1 focus:ring-hookr-accent"
                    readOnly
                    value="4242 4242 4242 4242"
                  />
                </div>
                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="text-sm text-hookr-light">Expiry</label>
                    <input 
                      type="text" 
                      placeholder="MM/YY" 
                      className="w-full p-2 bg-hookr-dark rounded-md text-hookr-light focus:outline-none focus:ring-1 focus:ring-hookr-accent"
                      readOnly
                      value="12/25"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="text-sm text-hookr-light">CVC</label>
                    <input 
                      type="text" 
                      placeholder="***" 
                      className="w-full p-2 bg-hookr-dark rounded-md text-hookr-light focus:outline-none focus:ring-1 focus:ring-hookr-accent"
                      readOnly
                      value="123"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <DialogFooter className="mt-6">
            <Button 
              variant="outline" 
              className="border-hookr-light text-hookr-light" 
              onClick={() => setShowSubscriptionModal(false)}
            >
              Cancel
            </Button>
            <Button 
              className="bg-hookr-accent text-hookr-light"
              onClick={handleSubscribe}
              disabled={isProcessingPayment}
            >
              {isProcessingPayment ? 'Processing...' : `Subscribe for $${selectedSubscriptionTier?.price}`}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Comment Modal */}
      <Dialog open={showCommentModal} onOpenChange={setShowCommentModal}>
        <DialogContent className="bg-hookr-dark border-hookr-muted text-hookr-light">
          <DialogHeader>
            <DialogTitle className="text-hookr-light">Comments</DialogTitle>
          </DialogHeader>
          
          <div className="mt-4 max-h-[60vh] overflow-y-auto">
            {activePost && (
              <div className="mb-4">
                <div className="flex items-start gap-3">
                  <Avatar className="h-10 w-10">
                    <img src={creator.profileImage} alt={creator.name} className="object-cover" />
                  </Avatar>
                  <div>
                    <p className="font-medium text-hookr-light">{creator.name}</p>
                    <p className="text-sm text-hookr-light">{activePost.content}</p>
                    <p className="text-xs text-hookr-light text-opacity-50 mt-1">
                      {new Date(activePost.timestamp).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                
                <div className="border-t border-b border-hookr-light border-opacity-10 py-4 my-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <button 
                        className={`flex items-center ${likedPosts.includes(activePost.id) ? 'text-red-500' : 'text-hookr-light'}`}
                        onClick={() => handleLikePost(activePost.id)}
                      >
                        <Heart className={`h-5 w-5 ${likedPosts.includes(activePost.id) ? 'fill-current' : ''}`} />
                        <span className="text-sm ml-1">
                          {likedPosts.includes(activePost.id) ? activePost.likes + 1 : activePost.likes}
                        </span>
                      </button>
                      <button
                        className="flex items-center text-hookr-light"
                        onClick={handleTipCreator}
                      >
                        <DollarSign className="h-5 w-5" />
                        <span className="text-sm ml-1">Tip</span>
                      </button>
                    </div>
                    <button 
                      className={`text-hookr-light ${savedPosts.includes(activePost.id) ? 'text-hookr-accent' : ''}`}
                      onClick={() => handleSavePost(activePost.id)}
                    >
                      <Save className={`h-5 w-5 ${savedPosts.includes(activePost.id) ? 'fill-current' : ''}`} />
                    </button>
                  </div>
                </div>
                
                {/* Sample comments */}
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-hookr-accent rounded-full flex items-center justify-center text-white text-sm font-bold">
                      J
                    </div>
                    <div>
                      <p className="font-medium text-hookr-light text-sm">JohnDoe</p>
                      <p className="text-sm text-hookr-light">Absolutely stunning! Can't wait to see more content.</p>
                      <p className="text-xs text-hookr-light text-opacity-50 mt-1">2 hours ago</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                      M
                    </div>
                    <div>
                      <p className="font-medium text-hookr-light text-sm">MikeBrown</p>
                      <p className="text-sm text-hookr-light">Looking forward to our next meeting!</p>
                      <p className="text-xs text-hookr-light text-opacity-50 mt-1">5 hours ago</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                      D
                    </div>
                    <div>
                      <p className="font-medium text-hookr-light text-sm">DavidSmith</p>
                      <p className="text-sm text-hookr-light">You're the best!</p>
                      <p className="text-xs text-hookr-light text-opacity-50 mt-1">1 day ago</p>
                    </div>
                  </div>
                </div>
                
                {/* Comment input */}
                <div className="mt-6 flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Add a comment..."
                    className="flex-1 p-2 rounded-full bg-hookr-muted text-hookr-light focus:outline-none focus:ring-1 focus:ring-hookr-accent"
                  />
                  <Button size="sm" className="bg-hookr-accent text-white rounded-full">Post</Button>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
      
      {/* Subscription Success Dialog */}
      <AlertDialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <AlertDialogContent className="bg-hookr-dark border-hookr-muted text-hookr-light">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-hookr-light">Subscription Active!</AlertDialogTitle>
            <AlertDialogDescription className="text-hookr-light text-opacity-70">
              Thank you for subscribing to {creator.name}'s premium content. You now have access to all exclusive content.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="my-4 p-4 bg-green-500 bg-opacity-20 rounded-lg border border-green-500">
            <h4 className="font-medium text-green-400 flex items-center">
              <Shield className="h-4 w-4 mr-2" />
              Subscription Confirmed
            </h4>
            <p className="text-sm text-hookr-light mt-1">
              Your subscription is now active. Enjoy unlimited access to premium content.
            </p>
          </div>
          <AlertDialogFooter>
            <AlertDialogAction className="bg-hookr-accent text-white" onClick={() => setShowSuccessDialog(false)}>
              Start Exploring
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>;
};

export default CreatorProfilePage;
