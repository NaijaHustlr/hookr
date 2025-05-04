
import React, { useState } from "react";
import { User, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

interface ChatPreview {
  id: string;
  name: string;
  image: string;
  lastMessage: string;
  time: string;
  unread: number;
}

const ChatPage: React.FC = () => {
  const [activeChat, setActiveChat] = useState<string | null>(null);
  
  // Mock data for chat previews
  const chatPreviews: ChatPreview[] = [
    {
      id: "chat-1",
      name: "Jessica",
      image: "/lovable-uploads/767cbf5f-b796-41a6-a945-21b054d14d4b.png",
      lastMessage: "Are you available tomorrow?",
      time: "2:30 PM",
      unread: 2
    },
    {
      id: "chat-2",
      name: "Sophia",
      image: "/lovable-uploads/a419f82e-1d13-44c4-b3ab-81d3bf9dbae8.png",
      lastMessage: "Looking forward to our session",
      time: "Yesterday",
      unread: 0
    },
    {
      id: "chat-3",
      name: "Emma",
      image: "/lovable-uploads/image-2.jpg",
      lastMessage: "Thanks for booking!",
      time: "Monday",
      unread: 0
    }
  ];
  
  const handleChatSelect = (chatId: string) => {
    setActiveChat(chatId);
  };
  
  return (
    <div className="flex flex-col min-h-screen pb-16 bg-hookr-dark">
      <header className="sticky top-0 z-30 bg-hookr-dark border-b border-hookr-muted/20 px-4 py-3 flex justify-between items-center">
        <h1 className="text-hookr-light text-xl font-medium">Messages</h1>
        
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="text-hookr-light">
            <Search className="h-5 w-5" />
          </Button>
        </div>
      </header>
      
      <div className="flex-1 overflow-hidden">
        {!activeChat ? (
          <div className="h-full">
            <div className="px-4 py-3 sticky top-0 bg-hookr-dark z-10">
              <Input 
                placeholder="Search chats..." 
                className="bg-hookr-muted border-hookr-muted text-hookr-light" 
              />
            </div>
            
            <div className="divide-y divide-hookr-muted/20">
              {chatPreviews.map((chat) => (
                <div 
                  key={chat.id}
                  className="p-4 flex items-center gap-3 cursor-pointer hover:bg-hookr-muted/10"
                  onClick={() => handleChatSelect(chat.id)}
                >
                  <Avatar className="h-12 w-12 border border-hookr-accent/30">
                    <img src={chat.image} alt={chat.name} className="object-cover" />
                  </Avatar>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium text-hookr-light">{chat.name}</h3>
                      <span className="text-xs text-hookr-light/60">{chat.time}</span>
                    </div>
                    <p className="text-sm text-hookr-light/70 truncate">{chat.lastMessage}</p>
                  </div>
                  
                  {chat.unread > 0 && (
                    <div className="bg-hookr-accent rounded-full h-5 w-5 flex items-center justify-center">
                      <span className="text-xs text-white font-medium">{chat.unread}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="h-full flex flex-col">
            <div className="px-4 py-3 border-b border-hookr-muted/20 flex items-center gap-3">
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-hookr-light" 
                onClick={() => setActiveChat(null)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                  <path d="m15 18-6-6 6-6" />
                </svg>
              </Button>
              
              <Avatar className="h-8 w-8">
                <img 
                  src={chatPreviews.find(c => c.id === activeChat)?.image} 
                  alt={chatPreviews.find(c => c.id === activeChat)?.name} 
                  className="object-cover"
                />
              </Avatar>
              
              <h3 className="font-medium text-hookr-light">
                {chatPreviews.find(c => c.id === activeChat)?.name}
              </h3>
            </div>
            
            <div className="flex-1 p-4 overflow-y-auto">
              <div className="mb-4 flex">
                <div className="max-w-[75%] bg-hookr-muted rounded-lg rounded-tl-none p-3">
                  <p className="text-hookr-light text-sm">Hey there! How can I help you today?</p>
                  <p className="text-[10px] text-hookr-light/50 mt-1 text-right">2:15 PM</p>
                </div>
              </div>
              
              <div className="mb-4 flex justify-end">
                <div className="max-w-[75%] bg-hookr-accent rounded-lg rounded-tr-none p-3">
                  <p className="text-white text-sm">I'm interested in booking a session with you tomorrow.</p>
                  <p className="text-[10px] text-white/70 mt-1 text-right">2:20 PM</p>
                </div>
              </div>
              
              <div className="mb-4 flex">
                <div className="max-w-[75%] bg-hookr-muted rounded-lg rounded-tl-none p-3">
                  <p className="text-hookr-light text-sm">I'm available tomorrow afternoon between 2-6PM. Would any time in that window work for you?</p>
                  <p className="text-[10px] text-hookr-light/50 mt-1 text-right">2:25 PM</p>
                </div>
              </div>
              
              <div className="mb-4 flex justify-end">
                <div className="max-w-[75%] bg-hookr-accent rounded-lg rounded-tr-none p-3">
                  <p className="text-white text-sm">3PM would be perfect!</p>
                  <p className="text-[10px] text-white/70 mt-1 text-right">2:28 PM</p>
                </div>
              </div>
              
              <div className="flex">
                <div className="max-w-[75%] bg-hookr-muted rounded-lg rounded-tl-none p-3">
                  <p className="text-hookr-light text-sm">Great! I've marked you down for 3PM tomorrow. Are you interested in the full photoshoot package or just the basic session?</p>
                  <p className="text-[10px] text-hookr-light/50 mt-1 text-right">2:30 PM</p>
                </div>
              </div>
            </div>
            
            <div className="p-4 border-t border-hookr-muted/20">
              <div className="flex gap-2">
                <Input 
                  placeholder="Type a message..." 
                  className="bg-hookr-muted border-hookr-muted text-hookr-light"
                />
                <Button className="bg-hookr-accent text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                    <path d="m22 2-7 20-4-9-9-4Z" />
                    <path d="M22 2 11 13" />
                  </svg>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatPage;
