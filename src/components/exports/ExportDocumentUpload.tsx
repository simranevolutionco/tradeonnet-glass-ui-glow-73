
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, FileText, Check, AlertCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import HelpTooltip from "@/components/ui/help-tooltip";

interface DocumentItem {
  id: string;
  name: string;
  type: string;
  required: boolean;
  status: "pending" | "uploaded" | "rejected" | "approved";
  uploadedAt?: string;
  feedback?: string;
}

const ExportDocumentUpload = () => {
  const [documentType, setDocumentType] = useState("");
  const [files, setFiles] = useState<FileList | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  
  const documents: DocumentItem[] = [
    {
      id: "doc1",
      name: "Commercial Invoice",
      type: "invoice",
      required: true,
      status: "approved",
      uploadedAt: "2025-05-12 09:23"
    },
    {
      id: "doc2",
      name: "Packing List",
      type: "packing",
      required: true,
      status: "rejected",
      uploadedAt: "2025-05-15 14:30",
      feedback: "Document is incomplete. Please include all item quantities."
    },
    {
      id: "doc3",
      name: "Certificate of Origin",
      type: "certificate",
      required: true,
      status: "pending"
    },
    {
      id: "doc4",
      name: "Bill of Lading",
      type: "transport",
      required: true,
      status: "pending"
    },
    {
      id: "doc5",
      name: "Insurance Certificate",
      type: "insurance",
      required: false,
      status: "pending"
    }
  ];
  
  const requiredDocuments = documents.filter(doc => doc.required);
  const uploadedDocuments = documents.filter(doc => doc.status === "approved" || doc.status === "rejected");
  const pendingDocuments = documents.filter(doc => doc.status === "pending");
  const completionPercentage = (uploadedDocuments.length / requiredDocuments.length) * 100;
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFiles(e.target.files);
  };
  
  const simulateUpload = () => {
    if (!files || !documentType) return;
    
    setIsUploading(true);
    setUploadProgress(0);
    
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          setFiles(null);
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs flex items-center"><Check className="mr-1 h-3 w-3" /> Approved</span>;
      case "rejected":
        return <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs flex items-center"><AlertCircle className="mr-1 h-3 w-3" /> Rejected</span>;
      case "uploaded":
        return <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs flex items-center">Reviewing</span>;
      default:
        return <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs">Pending</span>;
    }
  };
  
  return (
    <div className="space-y-6">
      <Card className="glassmorphism">
        <CardHeader>
          <CardTitle>Export Document Upload</CardTitle>
          <CardDescription>
            Upload all required documents for your export transactions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="document-type">Document Type</Label>
                  <Select value={documentType} onValueChange={setDocumentType}>
                    <SelectTrigger id="document-type">
                      <SelectValue placeholder="Select document type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="invoice">Commercial Invoice</SelectItem>
                      <SelectItem value="packing">Packing List</SelectItem>
                      <SelectItem value="certificate">Certificate of Origin</SelectItem>
                      <SelectItem value="transport">Bill of Lading</SelectItem>
                      <SelectItem value="insurance">Insurance Certificate</SelectItem>
                      <SelectItem value="other">Other Document</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="document-file">Upload File</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-md p-6 hover:border-trade-purple transition-colors">
                    <div className="flex flex-col items-center">
                      <Upload className="h-10 w-10 text-gray-400" />
                      <p className="mt-2 text-sm text-gray-500">
                        Drag and drop or click to browse
                      </p>
                      <p className="mt-1 text-xs text-gray-400">
                        Supported formats: PDF, JPEG, PNG (Max 10MB)
                      </p>
                      <Input
                        id="document-file"
                        type="file"
                        className="hidden"
                        onChange={handleFileChange}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        className="mt-4"
                        onClick={() => document.getElementById("document-file")?.click()}
                      >
                        Select File
                      </Button>
                    </div>
                  </div>
                  {files && files.length > 0 && (
                    <p className="text-xs mt-2">
                      Selected: {files[0].name} ({Math.round(files[0].size / 1024)} KB)
                    </p>
                  )}
                </div>
                
                {isUploading ? (
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Uploading...</span>
                      <span>{uploadProgress}%</span>
                    </div>
                    <Progress value={uploadProgress} className="h-2" />
                  </div>
                ) : (
                  <Button 
                    onClick={simulateUpload} 
                    disabled={!files || !documentType}
                    className="w-full"
                  >
                    <Upload className="mr-2 h-4 w-4" /> Upload Document
                  </Button>
                )}
              </div>
              
              <div className="space-y-4">
                <div className="p-4 bg-white/10 rounded-lg">
                  <h3 className="text-sm font-medium mb-2">Document Requirements</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                      <span>All documents must be in English or with English translation</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                      <span>Commercial documents must include buyer and seller details</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                      <span>Certificate of Origin must be authenticated by chamber of commerce</span>
                    </li>
                  </ul>
                </div>
                
                <div className="p-4 bg-blue-50/10 border border-blue-200/20 rounded-lg">
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium text-blue-500">Completion Status</h3>
                    <Progress value={completionPercentage} className="h-2" />
                    <p className="text-xs text-muted-foreground">
                      {uploadedDocuments.length} of {requiredDocuments.length} required documents uploaded
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium mb-3">Document Status</h3>
              <div className="space-y-3">
                {documents.map((doc) => (
                  <div
                    key={doc.id}
                    className="p-3 flex justify-between items-center rounded-lg bg-white/10 border border-white/20 hover:bg-white/20 transition-colors"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center">
                        <FileText className="h-4 w-4 mr-2 text-trade-purple" />
                        <span className="font-medium text-sm">{doc.name}</span>
                        {doc.required && (
                          <span className="ml-2 text-xs bg-gray-100 text-gray-700 px-1.5 py-0.5 rounded-full">Required</span>
                        )}
                      </div>
                      {doc.uploadedAt && (
                        <p className="text-xs text-muted-foreground">
                          Uploaded on {doc.uploadedAt}
                        </p>
                      )}
                      {doc.feedback && (
                        <p className="text-xs text-red-600 mt-1">
                          {doc.feedback}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center">
                      {getStatusBadge(doc.status)}
                      {doc.status === "pending" && (
                        <Button variant="ghost" size="sm" className="ml-2">
                          <Upload className="h-3.5 w-3.5" />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <Card className="glassmorphism h-full">
            <CardHeader>
              <CardTitle className="text-lg">Document Verification</CardTitle>
              <CardDescription>How our system verifies your documents</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center p-3 rounded-lg bg-white/10 border border-white/20">
                  <div className="bg-blue-100 text-blue-700 h-8 w-8 rounded-full flex items-center justify-center mr-3">1</div>
                  <div>
                    <p className="text-sm font-medium">Automated Scanning</p>
                    <p className="text-xs text-muted-foreground">AI validation of document format and structure</p>
                  </div>
                  <HelpTooltip text="Our system scans document structure and key fields to ensure compliance with export requirements" />
                </div>
                
                <div className="flex items-center p-3 rounded-lg bg-white/10 border border-white/20">
                  <div className="bg-blue-100 text-blue-700 h-8 w-8 rounded-full flex items-center justify-center mr-3">2</div>
                  <div>
                    <p className="text-sm font-medium">Data Extraction</p>
                    <p className="text-xs text-muted-foreground">Key information extracted and validated</p>
                  </div>
                  <HelpTooltip text="Our AI identifies and extracts important information like dates, amounts, and product details from your documents" />
                </div>
                
                <div className="flex items-center p-3 rounded-lg bg-white/10 border border-white/20">
                  <div className="bg-blue-100 text-blue-700 h-8 w-8 rounded-full flex items-center justify-center mr-3">3</div>
                  <div>
                    <p className="text-sm font-medium">Human Review</p>
                    <p className="text-xs text-muted-foreground">Expert verification of critical documents</p>
                  </div>
                  <HelpTooltip text="Documents requiring special attention are reviewed by our export documentation specialists" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="md:col-span-2">
          <Card className="glassmorphism">
            <CardHeader>
              <CardTitle className="text-lg">Recent AI Document Analysis</CardTitle>
              <CardDescription>Insights from our document processing system</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-3 rounded-lg bg-amber-50/10 border border-amber-200/20">
                  <div className="flex items-start">
                    <AlertCircle className="h-5 w-5 text-amber-500 mr-2 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-amber-700">Potential Discrepancy Detected</p>
                      <p className="text-xs mt-1">The commercial invoice value ($45,750) doesn't match the packing list total value ($45,570). This may cause delays in customs clearance.</p>
                      <Button variant="outline" size="sm" className="mt-2 h-7 text-xs">Review Documents</Button>
                    </div>
                  </div>
                </div>
                
                <div className="p-3 rounded-lg bg-blue-50/10 border border-blue-200/20">
                  <div className="flex items-start">
                    <FileText className="h-5 w-5 text-blue-500 mr-2 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-blue-700">Missing HS Codes</p>
                      <p className="text-xs mt-1">Your commercial invoice is missing HS codes for 3 out of 7 items. This information is required for customs clearance in the destination country.</p>
                      <Button variant="outline" size="sm" className="mt-2 h-7 text-xs">Update Invoice</Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ExportDocumentUpload;
