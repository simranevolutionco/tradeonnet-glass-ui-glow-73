
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { FileText, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";

const DocumentUploadCard = () => {
  const [isHovered, setIsHovered] = useState(false);
  
  const pendingDocs = [
    { name: "Commercial Invoice", status: "Required", date: "Due May 20" },
    { name: "Packing List", status: "Required", date: "Due May 20" },
    { name: "Insurance Certificate", status: "Optional", date: "Due May 25" },
  ];
  
  return (
    <Card 
      className="glass h-full card-hover border border-white/40"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardHeader>
        <CardTitle className="flex items-center">
          <FileText className="mr-2 h-5 w-5 text-trade-purple" />
          Pending Document Uploads
        </CardTitle>
        <CardDescription>Documents needed for your active transactions</CardDescription>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          {pendingDocs.map((doc, index) => (
            <div 
              key={index}
              className={`p-3 rounded-lg bg-white/20 border border-white/30 flex justify-between items-center transition-all duration-300 ${
                isHovered ? "translate-x-1" : ""
              }`}
            >
              <div>
                <p className="font-medium">{doc.name}</p>
                <p className="text-sm text-muted-foreground">{doc.date}</p>
              </div>
              
              <Button 
                variant="outline" 
                size="sm" 
                className={`bg-white/40 hover:bg-white/60 btn-hover transition-all duration-300 ${
                  isHovered ? "scale-105" : ""
                }`}
              >
                <Upload className="h-4 w-4 mr-1" />
                Upload
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-between border-t border-white/20 pt-4">
        <div>
          <p className="text-sm text-muted-foreground">Overall Completion</p>
          <div className="flex items-center space-x-2 mt-1">
            <Progress value={30} className="w-24 h-2" />
            <span className="text-sm">30%</span>
          </div>
        </div>
        
        <Button variant="outline" size="sm" className="bg-white/30 hover:bg-white/50 btn-hover">
          View All
        </Button>
      </CardFooter>
    </Card>
  );
};

export default DocumentUploadCard;
