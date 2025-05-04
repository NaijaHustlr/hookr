
import React from "react";
import { ArrowLeft, Heart, MessageSquare, Star, Calendar, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";

interface Notification {
  id: string;
  type: 'like' | 'comment' | 'booking' | 'review' | 'subscription' | 'message' | 'payment';
  sender: {
    id: string;
    name: string;
    image: string;
  };
  content: string;
  time: string;
  read: boolean;
}

const NotificationsPage: React.FC = () => {
  const navigate = useNavigate();
  
  // Mock notifications data
  const notifications: Notification[] = [
    {
      id: 'notif-1',
      type: 'like',
      sender: {
        id: 'user-1',
        name: 'Jessica',
        image: '/lovable-uploads/767cbf5f-b796-41a6-a945-21b054d14d4b.png'
      },
      content: 'liked your post',
      time: '10 minutes ago',
      read: false
    },
    {
      id: 'notif-2',
      type: 'comment',
      sender: {
        id: 'user-2',
        name: 'Emma',
        image: '/lovable-uploads/image-2.jpg'
      },
      content: 'commented on your photo: "You look amazing in this!"',
      time: '1 hour ago',
      read: false
    },
    {
      id: 'notif-3',
      type: 'booking',
      sender: {
        id: 'user-3',
        name: 'Michael',
        image: '/lovable-uploads/image-1.jpg'
      },
      content: 'booked a session with you for tomorrow at 3PM',
      time: '3 hours ago',
      read: true
    },
    {
      id: 'notif-4',
      type: 'subscription',
      sender: {
        id: 'user-4',
        name: 'David',
        image: '/lovable-uploads/image-3.jpg'
      },
      content: 'subscribed to your premium content',
      time: 'Yesterday',
      read: true
    },
    {
      id: 'notif-5',
      type: 'review',
      sender: {
        id: 'user-5',
        name: 'Sophia',
        image: '/lovable-uploads/a419f82e-1d13-44c4-b3ab-81d3bf9dbae8.png'
      },
      content: 'left a 5-star review on your profile',
      time: '2 days ago',
      read: true
    },
    {
      id: 'notif-6',
      type: 'payment',
      sender: {
        id: 'system',
        name: 'Hookr',
        image: '/favicon.ico'
      },
      content: 'You received a payment of $150 for your recent booking',
      time: '3 days ago',
      read: true
    },
    {
      id: 'notif-7',
      type: 'message',
      sender: {
        id: 'user-1',
        name: 'Jessica',
        image: '/lovable-uploads/767cbf5f-b796-41a6-a945-21b054d14d4b.png'
      },
      content: 'sent you a new message',
      time: '4 days ago',
      read: true
    }
  ];
  
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'like': return <Heart className="h-4 w-4 text-red-500" />;
      case 'comment': return <MessageSquare className="h-4 w-4 text-blue-500" />;
      case 'review': return <Star className="h-4 w-4 text-yellow-500" />;
      case 'booking': return <Calendar className="h-4 w-4 text-green-500" />;
      case 'subscription': return <Star className="h-4 w-4 text-purple-500" />;
      case 'payment': return <DollarSign className="h-4 w-4 text-green-500" />;
      case 'message': return <MessageSquare className="h-4 w-4 text-blue-500" />;
      default: return <MessageSquare className="h-4 w-4 text-hookr-accent" />;
    }
  };
  
  const handleBack = () => {
    navigate(-1);
  };
  
  return (
    <div className="flex flex-col min-h-screen pb-16 bg-hookr-dark">
      <header className="sticky top-0 z-30 bg-hookr-dark border-b border-hookr-muted/20 px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-hookr-light" 
            onClick={handleBack}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-medium text-hookr-light">Notifications</h1>
        </div>
      </header>
      
      <div className="flex-1 divide-y divide-hookr-muted/20">
        {notifications.map((notification) => (
          <div 
            key={notification.id}
            className={`p-4 flex items-start gap-3 ${!notification.read ? 'bg-hookr-muted/10' : ''}`}
          >
            <Avatar className="h-10 w-10 rounded-full">
              <img src={notification.sender.image} alt={notification.sender.name} className="object-cover" />
            </Avatar>
            
            <div className="flex-1">
              <div className="flex gap-2 items-center mb-1">
                <span className="text-sm font-medium text-hookr-light">{notification.sender.name}</span>
                <div className="flex items-center gap-1 bg-hookr-muted/30 px-1.5 py-0.5 rounded">
                  {getNotificationIcon(notification.type)}
                  <span className="text-xs text-hookr-light/70">
                    {notification.type.charAt(0).toUpperCase() + notification.type.slice(1)}
                  </span>
                </div>
              </div>
              
              <p className="text-sm text-hookr-light/80">{notification.content}</p>
              <p className="text-xs text-hookr-light/50 mt-1">{notification.time}</p>
            </div>
            
            {!notification.read && (
              <div className="h-2 w-2 bg-hookr-accent rounded-full mt-2"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationsPage;
