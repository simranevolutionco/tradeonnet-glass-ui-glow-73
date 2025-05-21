
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { X, Send, User, Bot } from "lucide-react";

interface ImportSupportChatProps {
  onClose: () => void;
}

const ImportSupportChat = ({ onClose }: ImportSupportChatProps) => {
  const [messages, setMessages] = useState([
    {
      sender: "ai",
      content: "Hello! I'm your AI trade assistant. How can I help with your import shipment today?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [newMessage, setNewMessage] = useState("");
  
  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    
    // Add user message
    const userMessage = {
      sender: "user",
      content: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages([...messages, userMessage]);
    setNewMessage("");
    
    // Simulate AI response after a short delay
    setTimeout(() => {
      const aiResponses = [
        "I can help you with tracking your Shanghai Electronics shipment. It's currently at sea and expected to arrive on May 28, 2025.",
        "Your import documents for shipment #IM78452 need attention. The Certificate of Origin is missing and required for customs clearance.",
        "For customs clearance, you'll need to pay approximately $5,481.60 in duties for your shipment from Shanghai Electronics.",
        "I've noticed an issue with your commercial invoice. The quantities don't match your purchase order. Would you like me to help resolve this?",
        "Based on your shipment details, you might qualify for our Buyer's Credit program. Would you like more information about financing options?"
      ];
      
      const aiResponse = {
        sender: "ai",
        content: aiResponses[Math.floor(Math.random() * aiResponses.length)],
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      setMessages(prevMessages => [...prevMessages, aiResponse]);
    }, 1000);
  };
  
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  return (
    <div className="fixed bottom-6 right-6 w-[350px] z-50">
      <Card className="glassmorphism shadow-xl">
        <CardHeader className="pb-2 flex flex-row items-center justify-between">
          <CardTitle className="text-lg flex items-center">
            <Bot className="h-5 w-5 mr-2" />
            <span>Import Assistant</span>
            <Badge variant="outline" className="ml-2 bg-green-100/50 text-green-800">
              Online
            </Badge>
          </CardTitle>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="h-[300px] overflow-y-auto p-2 space-y-3">
            {messages.map((message, index) => (
              <div 
                key={index} 
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.sender === 'user' 
                      ? 'bg-trade-purple text-white rounded-tr-none' 
                      : 'bg-white/20 rounded-tl-none'
                  }`}
                >
                  <div className="text-sm">{message.content}</div>
                  <div className="text-xs text-right mt-1 opacity-70">{message.timestamp}</div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex gap-2">
            <Input 
              placeholder="Type your question..."
              value={newMessage}
              onChange={e => setNewMessage(e.target.value)}
              onKeyDown={handleKeyPress}
              className="flex-1"
            />
            <Button onClick={handleSendMessage} size="icon">
              <Send className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="pt-1 text-xs text-center text-muted-foreground">
            This AI assistant can help with your import queries 24/7
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ImportSupportChat;
