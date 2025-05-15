
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MessageSquare, X } from "lucide-react";

interface ChatbotWidgetProps {
  onClose: () => void;
}

const ChatbotWidget = ({ onClose }: ChatbotWidgetProps) => {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([
    { 
      role: "system", 
      content: "Hello! I'm your trade finance assistant. How can I help you today?" 
    },
  ]);
  
  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    // Add user message to chat history
    setChatHistory([
      ...chatHistory,
      { role: "user", content: message }
    ]);
    
    // Simulate AI response (in a real app, this would call an API)
    setTimeout(() => {
      setChatHistory(prev => [
        ...prev,
        { 
          role: "system", 
          content: "Thank you for your message. I can help you with trade finance queries, document requirements, and application status updates. What specific information do you need?" 
        }
      ]);
    }, 1000);
    
    // Clear input field
    setMessage("");
  };
  
  return (
    <Card className="fixed bottom-6 right-6 w-96 h-[450px] glass shadow-xl border border-white/40 flex flex-col animate-scale-in">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg flex items-center">
            <MessageSquare className="mr-2 h-5 w-5 text-trade-purple" />
            Trade Finance Assistant
          </CardTitle>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        <CardDescription>Ask me anything about trade finance</CardDescription>
      </CardHeader>
      
      <CardContent className="flex-1 overflow-y-auto py-4">
        <div className="space-y-4">
          {chatHistory.map((chat, index) => (
            <div 
              key={index}
              className={`${
                chat.role === "user" 
                  ? "ml-auto bg-trade-purple text-white" 
                  : "mr-auto bg-white/50" 
              } rounded-lg p-3 max-w-[80%] shadow-sm`}
            >
              {chat.content}
            </div>
          ))}
        </div>
      </CardContent>
      
      <CardFooter className="border-t border-white/20 pt-3">
        <form 
          className="flex w-full gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
        >
          <Input
            className="flex-1 glassmorphism"
            placeholder="Type your question..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <Button type="submit" className="bg-trade-purple hover:bg-trade-purple-dark btn-hover">
            Send
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
};

export default ChatbotWidget;
