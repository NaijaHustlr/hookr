
import React from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerHeader } from "@/components/ui/drawer";
import { ModelType, ChatMessage } from "@/types/model";

interface ChatDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

// Mock data for chat
const mockChats = [
  {
    model: {
      id: 'model-1',
      name: 'Sophia',
      profileImage: '/lovable-uploads/image-1.jpg',
      rating: 4.9,
      reviewCount: 58,
      distance: '1.2 miles',
      price: 180,
      tags: [],
      availability: [],
      age: 25,
      verified: true,
      featured: true,
    },
    lastMessage: {
      id: 'msg-1',
      senderId: 'model-1',
      receiverId: 'user-1',
      content: "Hey there! Are we still on for tonight?",
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
      read: false
    }
  },
  {
    model: {
      id: 'model-2',
      name: 'Emma',
      profileImage: '/lovable-uploads/image-2.jpg',
      rating: 4.7,
      reviewCount: 42,
      distance: '3.5 miles',
      price: 150,
      tags: [],
      availability: [],
      age: 23,
      verified: true,
      featured: false,
    },
    lastMessage: {
      id: 'msg-2',
      senderId: 'user-1',
      receiverId: 'model-2',
      content: "I'd like to book you for Friday night if you're available?",
      timestamp: new Date(Date.now() - 1000 * 60 * 120),
      read: true
    }
  },
  {
    model: {
      id: 'model-3',
      name: 'Olivia',
      profileImage: '/lovable-uploads/image-3.jpg',
      rating: 4.8,
      reviewCount: 37,
      distance: '4.1 miles',
      price: 200,
      tags: [],
      availability: [],
      age: 26,
      verified: true,
      featured: true,
    },
    lastMessage: {
      id: 'msg-3',
      senderId: 'model-3',
      receiverId: 'user-1',
      content: "Thank you for your booking! I'm looking forward to meeting you.",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5),
      read: true
    }
  }
];

export const ChatDrawer: React.FC<ChatDrawerProps> = ({ isOpen, onClose }) => {
  return (
    <div className={`fixed inset-0 z-50 transition-opacity duration-300 ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
      <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose}></div>
      
      <div className="fixed bottom-0 right-0 w-full sm:w-96 h-[80vh] bg-hookr-dark rounded-t-2xl shadow-xl z-50 overflow-hidden">
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b border-hookr-light border-opacity-10">
            <h2 className="text-lg font-semibold text-hookr-light">Messages</h2>
            <Button variant="ghost" size="icon" onClick={onClose} className="text-hookr-light">
              <X className="h-5 w-5" />
            </Button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-2">
            {mockChats.map(chat => (
              <div 
                key={chat.model.id}
                className="flex items-center p-3 rounded-lg mb-2 hover:bg-hookr-muted cursor-pointer"
              >
                <div className="relative mr-3">
                  <div className="w-12 h-12 rounded-full overflow-hidden">
                    <img 
                      src={chat.model.profileImage}
                      alt={chat.model.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {!chat.lastMessage.read && chat.lastMessage.senderId !== 'user-1' && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-hookr-accent rounded-full"></div>
                  )}
                </div>
                
                <div className="flex-1">
                  <div className="flex justify-between">
                    <h4 className="font-medium text-hookr-light">{chat.model.name}</h4>
                    <span className="text-xs text-hookr-light opacity-70">
                      {chat.lastMessage.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                    </span>
                  </div>
                  
                  <p className={`text-sm truncate ${!chat.lastMessage.read && chat.lastMessage.senderId !== 'user-1' ? 'text-hookr-light font-medium' : 'text-hookr-light opacity-70'}`}>
                    {chat.lastMessage.senderId === 'user-1' ? `You: ${chat.lastMessage.content}` : chat.lastMessage.content}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
