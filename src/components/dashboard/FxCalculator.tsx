
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Calculator, ArrowRight } from "lucide-react";

const FxCalculator = () => {
  const [amount, setAmount] = useState("1000");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [result, setResult] = useState("920.00");
  const [isHovered, setIsHovered] = useState(false);
  
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
    // In a real app, we would calculate the result based on actual exchange rates
    const numAmount = parseFloat(e.target.value) || 0;
    setResult((numAmount * 0.92).toFixed(2));
  };
  
  const currencies = ["USD", "EUR", "GBP", "JPY", "INR", "CNY", "AUD"];
  
  return (
    <Card 
      className="glass card-hover border border-white/40"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardHeader>
        <CardTitle className="flex items-center">
          <Calculator className="mr-2 h-5 w-5 text-trade-purple" />
          Quick FX Calculator
        </CardTitle>
        <CardDescription>Calculate exchange rates for your trades</CardDescription>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Amount</label>
            <Input 
              type="number" 
              value={amount} 
              onChange={handleAmountChange} 
              className="glassmorphism"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">From</label>
              <Select value={fromCurrency} onValueChange={setFromCurrency}>
                <SelectTrigger className="glassmorphism">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {currencies.map((currency) => (
                    <SelectItem key={currency} value={currency}>
                      {currency}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">To</label>
              <Select value={toCurrency} onValueChange={setToCurrency}>
                <SelectTrigger className="glassmorphism">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {currencies.map((currency) => (
                    <SelectItem key={currency} value={currency}>
                      {currency}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="p-3 rounded-lg bg-white/30 text-center">
            <p className="text-sm text-muted-foreground">Converted Amount</p>
            <p className="text-2xl font-semibold">{toCurrency} {result}</p>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="justify-end">
        <Button 
          variant="ghost" 
          size="sm" 
          className={`transition-all duration-300 ${isHovered ? "translate-x-1" : ""}`}
        >
          Advanced Options
          <ArrowRight className={`ml-2 h-4 w-4 transition-all duration-300 ${isHovered ? "translate-x-1" : ""}`} />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default FxCalculator;
