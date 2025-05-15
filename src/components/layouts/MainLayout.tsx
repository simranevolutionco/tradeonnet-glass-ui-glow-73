
import { useState } from "react";
import { SidebarProvider, SidebarTrigger, Sidebar, SidebarContent } from "@/components/ui/sidebar";
import NavSidebar from "@/components/navigation/NavSidebar";
import Logo from "@/components/Logo";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <NavSidebar />
        
        <div className="flex-1 flex flex-col">
          <header className="h-16 flex items-center px-6 glass border-b border-white/20">
            <SidebarTrigger className="mr-4" />
            <Logo className="w-8 h-8" />
            <h1 className="ml-2 font-semibold text-xl bg-gradient-to-r from-trade-purple to-trade-purple-dark bg-clip-text text-transparent">
              TradeOnNet
            </h1>
          </header>
          
          <main className="flex-1 p-6 overflow-y-auto">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default MainLayout;
