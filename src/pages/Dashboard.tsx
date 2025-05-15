
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { ArrowRight, FileText, ChartBar, MessageSquare, Calculator, Bell, User, Plus } from "lucide-react";
import MainLayout from "@/components/layouts/MainLayout";
import ActionCard from "@/components/dashboard/ActionCard";
import TransactionCard from "@/components/dashboard/TransactionCard";
import DocumentUploadCard from "@/components/dashboard/DocumentUploadCard";
import AiSuggestionCard from "@/components/dashboard/AiSuggestionCard";
import FxCalculator from "@/components/dashboard/FxCalculator";
import ChatbotWidget from "@/components/dashboard/ChatbotWidget";

const Dashboard = () => {
  const [showChatbot, setShowChatbot] = useState(false);
  
  return (
    <MainLayout>
      <div className="flex flex-col gap-6">
        <header className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Welcome back, Sarah!</h1>
            <p className="text-muted-foreground">
              AI Tip: Your LC application might need more supporting documents
            </p>
          </div>
          
          <div className="flex gap-4 items-center">
            <Button variant="outline" className="bg-white/50 btn-hover">
              <Bell className="h-4 w-4 mr-2" />
              <span className="sr-only sm:not-sr-only">Notifications</span>
            </Button>
            <Button variant="outline" className="bg-white/50 btn-hover">
              <User className="h-4 w-4 mr-2" />
              <span className="sr-only sm:not-sr-only">Account</span>
            </Button>
          </div>
        </header>
        
        <section className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ActionCard
              title="Start New Transaction"
              description="Begin a new trade finance application"
              icon={Plus}
              variant="primary"
              actions={[
                { label: "Letter of Credit", href: "/letter-of-credit/new" },
                { label: "Bank Guarantee", href: "/bank-guarantee/new" },
                { label: "Remittance", href: "/remittance/new" },
              ]}
            />
            
            <ActionCard
              title="Document Center"
              description="Upload required documents"
              icon={FileText}
              variant="secondary"
              actions={[
                { label: "Upload Documents", href: "/documents/upload" },
                { label: "View All Documents", href: "/documents" },
              ]}
            />
            
            <ActionCard
              title="Finance Options"
              description="Explore available finance solutions"
              icon={ChartBar}
              variant="tertiary"
              actions={[
                { label: "Pre-shipment Finance", href: "/finance/pre-shipment" },
                { label: "Post-shipment Finance", href: "/finance/post-shipment" },
                { label: "Buyer's Credit", href: "/finance/buyers-credit" },
              ]}
            />
          </div>
          
          <Tabs defaultValue="open" className="w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold">My Transactions</h2>
              <TabsList className="glassmorphism">
                <TabsTrigger value="open">Open</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="open" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <TransactionCard
                  title="Import LC - ABC Electronics"
                  type="Letter of Credit"
                  reference="LC-2025-05478"
                  amount="$125,000.00"
                  status="In Progress"
                  aiPrediction="Expected approval by May 18"
                />
                
                <TransactionCard
                  title="Performance Guarantee - City Project"
                  type="Bank Guarantee"
                  reference="BG-2025-01122"
                  amount="$75,000.00"
                  status="Under Review"
                  aiPrediction="Additional documents required"
                />
              </div>
            </TabsContent>
            
            <TabsContent value="pending" className="space-y-4">
              <TransactionCard
                title="Outward Remittance - XYZ Supplier"
                type="Remittance"
                reference="RM-2025-00845"
                amount="$54,320.00"
                status="Awaiting Approval"
                aiPrediction="Expected processing by tomorrow"
              />
            </TabsContent>
            
            <TabsContent value="completed">
              <p className="text-muted-foreground text-center py-8">
                No completed transactions in the last 30 days
              </p>
            </TabsContent>
          </Tabs>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="col-span-1">
              <DocumentUploadCard />
            </div>
            
            <div className="col-span-1 md:col-span-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <AiSuggestionCard />
                <FxCalculator />
              </div>
            </div>
          </div>
        </section>
        
        {showChatbot ? (
          <ChatbotWidget onClose={() => setShowChatbot(false)} />
        ) : (
          <Button
            onClick={() => setShowChatbot(true)}
            className="fixed bottom-6 right-6 rounded-full w-14 h-14 bg-gradient-to-r from-trade-purple to-trade-purple-dark btn-hover shadow-lg"
          >
            <MessageSquare className="h-6 w-6" />
          </Button>
        )}
      </div>
    </MainLayout>
  );
};

export default Dashboard;
