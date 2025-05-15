
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Fingerprint, User, ShieldCheck } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import Logo from "@/components/Logo";

const Login = () => {
  const [clientId, setClientId] = useState("");
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = () => {
    // Simulate login - in a real app this would validate credentials
    toast({
      title: "AI Security Check",
      description: "Verifying your login from this device and location...",
      action: (
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-4 w-4 text-green-500" />
          <span>Secure</span>
        </div>
      ),
    });
    
    // Simulate a delay before redirecting to dashboard
    setTimeout(() => {
      navigate("/dashboard");
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md glassmorphism rounded-2xl p-8 animate-scale-in">
        <div className="flex flex-col items-center mb-8">
          <Logo className="mb-4" />
          <h1 className="text-3xl font-bold bg-gradient-to-r from-trade-purple to-trade-purple-dark bg-clip-text text-transparent">
            TradeOnNet
          </h1>
          <p className="text-muted-foreground">V Bank's Trade Finance Platform</p>
        </div>

        <Tabs defaultValue="credentials" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6 glassmorphism">
            <TabsTrigger value="credentials" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>ID & OTP</span>
            </TabsTrigger>
            <TabsTrigger value="biometric" className="flex items-center gap-2">
              <Fingerprint className="h-4 w-4" />
              <span>Biometric</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="credentials" className="space-y-4">
            <div className="space-y-2">
              <Input
                id="clientId"
                placeholder="Client ID"
                value={clientId}
                onChange={(e) => setClientId(e.target.value)}
                className="glassmorphism"
              />
            </div>
            <div className="space-y-2">
              <Input
                id="otp"
                type="password"
                placeholder="One-Time Password"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="glassmorphism"
              />
            </div>
            <Button 
              onClick={handleLogin} 
              className="w-full mt-4 bg-gradient-to-r from-trade-purple to-trade-purple-dark btn-hover"
            >
              Login Securely
            </Button>
          </TabsContent>

          <TabsContent value="biometric" className="space-y-4">
            <div className="p-10 flex flex-col items-center justify-center">
              <Fingerprint size={64} className="text-trade-purple animate-pulse mb-4" />
              <p className="text-center text-muted-foreground">
                Use your device biometric authentication to login securely
              </p>
              <Button 
                onClick={handleLogin} 
                className="mt-6 bg-gradient-to-r from-trade-purple to-trade-purple-dark btn-hover"
              >
                Authenticate
              </Button>
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-6 pt-6 border-t border-border flex flex-col items-center text-sm text-muted-foreground">
          <p>Need assistance? Contact your relationship manager</p>
          <p className="flex items-center mt-2">
            <ShieldCheck className="h-4 w-4 mr-1 text-green-600" />
            Enterprise-grade security by V Bank
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
