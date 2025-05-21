
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import LetterOfCredit from "./pages/LetterOfCredit";
import BankGuarantee from "./pages/BankGuarantee"; 
import Remittance from "./pages/Remittance";
import Exports from "./pages/Exports";
import Imports from "./pages/Imports";
import Documents from "./pages/Documents";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/letter-of-credit" element={<LetterOfCredit />} />
          <Route path="/bank-guarantee" element={<BankGuarantee />} />
          <Route path="/remittance" element={<Remittance />} />
          <Route path="/exports" element={<Exports />} />
          <Route path="/imports" element={<Imports />} />
          <Route path="/documents" element={<Documents />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
