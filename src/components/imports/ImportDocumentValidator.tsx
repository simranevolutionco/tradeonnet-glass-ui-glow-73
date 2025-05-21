
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { FileUp, AlertCircle, CheckCircle, X, FileText, Search } from "lucide-react";

const ImportDocumentValidator = () => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<any[]>([]);
  const [selectedPO, setSelectedPO] = useState<string>("");
  const [validationProgress, setValidationProgress] = useState(0);
  const [validationResults, setValidationResults] = useState<any>(null);
  const { toast } = useToast();
  
  const purchaseOrders = [
    { id: "2025-0482-SM", supplier: "Shanghai Electronics Co.", amount: "$45,680" },
    { id: "2025-0491-GC", supplier: "Global Components Ltd", amount: "$23,450" },
    { id: "2025-0512-TM", supplier: "Tech Materials Inc.", amount: "$32,750" },
  ];
  
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
        validationStatus: "pending"
      };
    });
    
    setUploadedFiles(prev => [...prev, ...newFiles]);
    
    toast({
      title: "Documents uploaded",
      description: `${newFiles.length} document(s) added for validation`,
    });
  };
  
  const removeFile = (index: number) => {
    const newFiles = [...uploadedFiles];
    newFiles.splice(index, 1);
    setUploadedFiles(newFiles);
  };
  
  const runValidation = () => {
    if (!selectedPO) {
      toast({
        title: "Select Purchase Order",
        description: "Please select a purchase order to compare documents against",
        variant: "destructive"
      });
      return;
    }
    
    // Simulate progressive validation
    setValidationProgress(0);
    const interval = setInterval(() => {
      setValidationProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          showValidationResults();
          return 100;
        }
        return prev + 10;
      });
    }, 250);
  };
  
  const showValidationResults = () => {
    // Simulate AI validation results
    const results = {
      invoiceMatch: Math.random() > 0.3,
      quantityMatch: Math.random() > 0.5,
      priceMatch: Math.random() > 0.7,
      missingDocuments: ["Certificate of Origin"],
      issueDetails: [
        "Invoice quantity (450 units) doesn't match PO (500 units)",
        "Unit price discrepancy on line item #3"
      ],
      recommendations: [
        "Request updated invoice with correct quantities",
        "Verify pricing with supplier and update PO if necessary"
      ]
    };
    
    setValidationResults(results);
    
    // Update file statuses
    const updatedFiles = uploadedFiles.map(file => {
      if (file.type === "Commercial Invoice") {
        return { ...file, validationStatus: "issues" };
      } else if (file.type === "Certificate of Origin") {
        return { ...file, validationStatus: "missing" };
      } else {
        return { ...file, validationStatus: "valid" };
      }
    });
    
    setUploadedFiles(updatedFiles);
    
    toast({
      title: "Validation Complete",
      description: results.invoiceMatch ? "All documents validated successfully" : "Issues detected in some documents",
      variant: results.invoiceMatch ? "default" : "destructive"
    });
  };
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <Card className="glassmorphism mb-6">
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              <span>Document Validation</span>
              <Badge variant="outline">
                AI-Powered Validation
              </Badge>
            </CardTitle>
            <CardDescription>
              Upload and validate your import documents against purchase orders
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <label className="text-sm font-medium mb-2 block">Select Purchase Order</label>
              <Select value={selectedPO} onValueChange={setSelectedPO}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a purchase order" />
                </SelectTrigger>
                <SelectContent>
                  {purchaseOrders.map((po) => (
                    <SelectItem key={po.id} value={po.id}>
                      {po.id} - {po.supplier} ({po.amount})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
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
                Drag & drop import documents or click to browse
              </h3>
              <p className="text-muted-foreground mb-4">
                Upload commercial invoice, packing list, bill of lading, and certificates
              </p>
              <Button
                as="label"
                htmlFor="file-upload"
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
                <div className="flex justify-between items-center">
                  <h3 className="font-medium">Uploaded Documents</h3>
                  {uploadedFiles.length > 0 && validationProgress === 0 && (
                    <Button onClick={runValidation}>
                      <Search className="mr-2 h-4 w-4" />
                      Validate Documents
                    </Button>
                  )}
                </div>
                
                {validationProgress > 0 && validationProgress < 100 && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Validating Documents...</span>
                      <span>{validationProgress}%</span>
                    </div>
                    <Progress value={validationProgress} className="h-2" />
                  </div>
                )}

                <div className="space-y-3">
                  {uploadedFiles.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-white/10 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div>
                          {file.validationStatus === "valid" ? (
                            <CheckCircle className="h-5 w-5 text-green-500" />
                          ) : file.validationStatus === "issues" ? (
                            <AlertCircle className="h-5 w-5 text-yellow-500" />
                          ) : file.validationStatus === "missing" ? (
                            <AlertCircle className="h-5 w-5 text-red-500" />
                          ) : (
                            <FileText className="h-5 w-5 text-muted-foreground" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium">{file.name}</p>
                          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                            <Badge variant="outline">{file.type}</Badge>
                            <span>{file.size}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center">
                        {file.validationStatus === "issues" && (
                          <Badge variant="outline" className="bg-yellow-100/50 text-yellow-800 mr-2">
                            Issues Found
                          </Badge>
                        )}
                        {file.validationStatus === "valid" && (
                          <Badge variant="outline" className="bg-green-100/50 text-green-800 mr-2">
                            Valid
                          </Badge>
                        )}
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeFile(index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {validationResults && (
          <Card className={validationResults.invoiceMatch ? "glassmorphism border-green-200/30" : "glassmorphism border-yellow-200/30"}>
            <CardHeader className="pb-3">
              <CardTitle className={validationResults.invoiceMatch ? "text-green-500" : "text-yellow-500"}>
                Validation Results
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className={`p-3 rounded-lg ${validationResults.invoiceMatch ? "bg-green-100/20" : "bg-yellow-100/20"}`}>
                    <div className="text-xs text-muted-foreground">Invoice Match</div>
                    <div className="font-medium flex items-center">
                      {validationResults.invoiceMatch ? (
                        <>
                          <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                          <span>Complete Match</span>
                        </>
                      ) : (
                        <>
                          <AlertCircle className="h-4 w-4 text-yellow-500 mr-1" />
                          <span>Partial Match</span>
                        </>
                      )}
                    </div>
                  </div>
                  
                  <div className={`p-3 rounded-lg ${validationResults.quantityMatch ? "bg-green-100/20" : "bg-yellow-100/20"}`}>
                    <div className="text-xs text-muted-foreground">Quantity Check</div>
                    <div className="font-medium flex items-center">
                      {validationResults.quantityMatch ? (
                        <>
                          <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                          <span>Quantities Match</span>
                        </>
                      ) : (
                        <>
                          <AlertCircle className="h-4 w-4 text-yellow-500 mr-1" />
                          <span>Quantity Mismatch</span>
                        </>
                      )}
                    </div>
                  </div>
                  
                  <div className={`p-3 rounded-lg ${validationResults.priceMatch ? "bg-green-100/20" : "bg-yellow-100/20"}`}>
                    <div className="text-xs text-muted-foreground">Price Check</div>
                    <div className="font-medium flex items-center">
                      {validationResults.priceMatch ? (
                        <>
                          <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                          <span>Prices Match</span>
                        </>
                      ) : (
                        <>
                          <AlertCircle className="h-4 w-4 text-yellow-500 mr-1" />
                          <span>Price Discrepancy</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                
                {(validationResults.missingDocuments?.length > 0 || !validationResults.invoiceMatch) && (
                  <div className="bg-yellow-50/10 p-4 rounded-lg border border-yellow-200/20">
                    {validationResults.missingDocuments?.length > 0 && (
                      <div className="mb-3">
                        <div className="font-medium text-yellow-500 mb-2">Missing Documents</div>
                        <ul className="space-y-1">
                          {validationResults.missingDocuments.map((doc: string, i: number) => (
                            <li key={i} className="flex items-center text-sm">
                              <AlertCircle className="h-4 w-4 text-yellow-500 mr-2" />
                              {doc}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {!validationResults.invoiceMatch && validationResults.issueDetails?.length > 0 && (
                      <div>
                        <div className="font-medium text-yellow-500 mb-2">Issues Detected</div>
                        <ul className="space-y-1">
                          {validationResults.issueDetails.map((issue: string, i: number) => (
                            <li key={i} className="flex items-center text-sm">
                              <AlertCircle className="h-4 w-4 text-yellow-500 mr-2" />
                              {issue}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
                
                {validationResults.recommendations?.length > 0 && (
                  <div className="bg-blue-50/10 p-4 rounded-lg border border-blue-200/20">
                    <div className="font-medium text-blue-500 mb-2">AI Recommendations</div>
                    <ul className="space-y-1">
                      {validationResults.recommendations.map((rec: string, i: number) => (
                        <li key={i} className="flex items-center text-sm">
                          <CheckCircle className="h-4 w-4 text-blue-500 mr-2" />
                          {rec}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                <div className="flex justify-end">
                  <Button>Contact Supplier</Button>
                </div>
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
        
        {selectedPO && (
          <Card className="glassmorphism mt-6">
            <CardHeader>
              <CardTitle className="text-base">Purchase Order Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {purchaseOrders.find(po => po.id === selectedPO) ? (
                  <>
                    <div>
                      <div className="text-xs text-muted-foreground">PO Number</div>
                      <div className="font-medium">{selectedPO}</div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">Supplier</div>
                      <div className="font-medium">
                        {purchaseOrders.find(po => po.id === selectedPO)?.supplier}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">Amount</div>
                      <div className="font-medium">
                        {purchaseOrders.find(po => po.id === selectedPO)?.amount}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">Date</div>
                      <div className="font-medium">May 5, 2025</div>
                    </div>
                  </>
                ) : (
                  <p>Select a purchase order to view details</p>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ImportDocumentValidator;
