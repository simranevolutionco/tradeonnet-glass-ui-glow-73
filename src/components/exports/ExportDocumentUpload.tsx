import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import HelpTooltip from "@/components/ui/help-tooltip";
import { useToast } from "@/hooks/use-toast";
import { FileUp, CheckCircle, AlertCircle, X } from "lucide-react";

const ExportDocumentUpload = () => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<any[]>([]);
  const [completeness, setCompleteness] = useState(40);
  const { toast } = useToast();
  
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(Array.from(e.dataTransfer.files));
    }
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(Array.from(e.target.files));
    }
  };
  
  const handleFiles = (files: File[]) => {
    // Simulate AI processing and auto-tagging
    const newFiles = files.map(file => {
      // Simulate AI detecting file type
      let docType = "Unknown";
      if (file.name.toLowerCase().includes("invoice")) {
        docType = "Commercial Invoice";
      } else if (file.name.toLowerCase().includes("packing")) {
        docType = "Packing List";
      } else if (file.name.toLowerCase().includes("certificate")) {
        docType = "Certificate of Origin";
      } else if (file.name.toLowerCase().includes("bill")) {
        docType = "Bill of Lading";
      }
      
      return {
        file,
        name: file.name,
        type: docType,
        size: (file.size / 1024).toFixed(1) + " KB",
        status: Math.random() > 0.3 ? "valid" : "issues",
        issues: Math.random() > 0.3 ? [] : ["Missing signatures", "Date format issue"]
      };
    });
    
    setUploadedFiles(prev => [...prev, ...newFiles]);
    
    // Update completeness based on document types covered
    const uniqueDocTypes = new Set([
      ...uploadedFiles.map(f => f.type),
      ...newFiles.map(f => f.type)
    ]);
    const completenessValue = Math.min(
      Math.floor((uniqueDocTypes.size / 5) * 100),
      100
    );
    setCompleteness(completenessValue);
    
    toast({
      title: "Documents uploaded",
      description: `${newFiles.length} document(s) processed by AI`,
    });
  };
  
  const removeFile = (index: number) => {
    const newFiles = [...uploadedFiles];
    newFiles.splice(index, 1);
    setUploadedFiles(newFiles);
    
    // Update completeness
    const uniqueDocTypes = new Set(newFiles.map(f => f.type));
    const completenessValue = Math.min(
      Math.floor((uniqueDocTypes.size / 5) * 100),
      100
    );
    setCompleteness(completenessValue);
  };
  
  const getCompletionColor = () => {
    if (completeness < 40) return "bg-red-500";
    if (completeness < 80) return "bg-yellow-500";
    return "bg-green-500";
  };
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <Card className="glassmorphism">
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              <span>Document Upload</span>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-normal">Completeness</span>
                <div className="w-32 h-4 bg-white/20 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${getCompletionColor()} transition-all duration-500`}
                    style={{ width: `${completeness}%` }}
                  />
                </div>
                <span className="text-sm font-medium">{completeness}%</span>
              </div>
            </CardTitle>
            <CardDescription>
              Upload your export documents for AI validation
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div 
              className={`border-2 border-dashed rounded-lg p-6 text-center transition-all duration-200 ${
                dragActive 
                  ? "border-trade-purple bg-trade-purple/5" 
                  : "border-white/30 hover:border-white/50"
              }`}
              onDragEnter={handleDrag}
              onDragOver={handleDrag}
              onDragLeave={handleDrag}
              onDrop={handleDrop}
            >
              <FileUp className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">
                Drag & drop files or click to browse
              </h3>
              <p className="text-muted-foreground mb-4">
                Our AI will automatically detect and tag your documents
              </p>
              <Button
                variant="outline"
                onClick={() => document.getElementById('file-upload')?.click()}
                className="cursor-pointer"
              >
                Select Files
                <input
                  id="file-upload"
                  type="file"
                  multiple
                  className="hidden"
                  onChange={handleFileChange}
                />
              </Button>
            </div>
            
            {uploadedFiles.length > 0 && (
              <div className="mt-6 space-y-4">
                <h3 className="font-medium">Uploaded Documents</h3>
                <div className="space-y-3">
                  {uploadedFiles.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-white/10 rounded-lg border border-white/20">
                      <div className="flex items-center space-x-4">
                        <div>
                          {file.status === "valid" ? (
                            <CheckCircle className="h-5 w-5 text-green-500" />
                          ) : (
                            <AlertCircle className="h-5 w-5 text-yellow-500" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium">{file.name}</p>
                          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                            <Badge variant="outline">{file.type}</Badge>
                            <span>{file.size}</span>
                          </div>
                          
                          {file.status !== "valid" && file.issues?.length > 0 && (
                            <div className="mt-1 text-xs text-amber-500">
                              {file.issues.map((issue: string, i: number) => (
                                <div key={i}>• {issue}</div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => removeFile(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {uploadedFiles.length > 0 && (
              <Button className="w-full mt-6">
                Submit Documents for Validation
              </Button>
            )}
          </CardContent>
        </Card>
        
        {uploadedFiles.length > 0 && completeness < 100 && (
          <Card className="glassmorphism border-yellow-200/30">
            <CardHeader className="pb-3">
              <CardTitle className="text-amber-500 flex items-center">
                <AlertCircle className="h-5 w-5 mr-2" />
                Missing Documents
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">The AI has detected that you're missing these required documents:</p>
              <div className="space-y-2">
                {!uploadedFiles.some(f => f.type === "Certificate of Origin") && (
                  <div className="flex items-center">
                    <AlertCircle className="h-4 w-4 text-amber-500 mr-2" />
                    <span>Certificate of Origin</span>
                    <HelpTooltip content="This document proves the country of manufacturing and is required for customs clearance" />
                  </div>
                )}
                
                {!uploadedFiles.some(f => f.type === "Packing List") && (
                  <div className="flex items-center">
                    <AlertCircle className="h-4 w-4 text-amber-500 mr-2" />
                    <span>Packing List</span>
                    <HelpTooltip content="Details the packaging of goods, including dimensions, weights and contents" />
                  </div>
                )}
                
                {!uploadedFiles.some(f => f.type === "Bill of Lading") && (
                  <div className="flex items-center">
                    <AlertCircle className="h-4 w-4 text-amber-500 mr-2" />
                    <span>Bill of Lading</span>
                    <HelpTooltip content="This transport document serves as receipt of goods and evidence of the contract of carriage" />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
      
      <div className="lg:col-span-1">
        <Card className="glassmorphism sticky top-6">
          <CardHeader>
            <CardTitle>Document Preview</CardTitle>
            <CardDescription>
              Select a document to preview
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[400px] flex items-center justify-center bg-white/10 rounded-md border border-white/20">
            {uploadedFiles.length > 0 ? (
              <div className="text-center p-6">
                <p className="text-muted-foreground">
                  Select a document from the list to preview
                </p>
              </div>
            ) : (
              <div className="text-center p-6">
                <p className="text-muted-foreground">
                  No documents uploaded yet
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ExportDocumentUpload;
