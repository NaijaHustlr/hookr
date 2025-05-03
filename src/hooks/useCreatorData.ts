
import { useQuery } from "@tanstack/react-query";
import { ModelType } from "@/types/model";

// Mock function to fetch creator data - in a real app, this would make an API call
const fetchCreator = async (id: string): Promise<ModelType | undefined> => {
  // This would be an API call in a real app
  return new Promise(resolve => {
    setTimeout(() => {
      // Simulating API response with mock data
      const mockCreators: ModelType[] = [{
        id: "model-1", 
        name: "Jessica Taylor",
        profileImage: "/lovable-uploads/image-1.jpg",
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
        id: "model-2",
        name: "Alicia Reed",
        profileImage: "/lovable-uploads/image-2.jpg",
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
      
      // Find the creator by ID
      const creator = mockCreators.find(c => c.id === id);
      resolve(creator);
    }, 500);
  });
};

// Define subscription tiers
export const subscriptionTiers = [
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
export const mockReviews = [
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

export const useCreatorData = (id: string | undefined) => {
  return useQuery({
    queryKey: ["creator", id],
    queryFn: () => id ? fetchCreator(id) : undefined,
    enabled: !!id
  });
};
