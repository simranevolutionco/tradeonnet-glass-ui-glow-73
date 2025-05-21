
import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileText, Search, Upload, Download, ArrowUpRight, Check, AlertCircle, Filter, SortAsc, SortDesc } from "lucide-react";
import MainLayout from "@/components/layouts/MainLayout";
import { Search as SearchInput } from "@/components/ui/search";

interface Document {
  id: string;
  name: string;
  type: string;
  transaction: string;
  transactionType: string;
  uploadDate: string;
  status: "pending" | "approved" | "rejected";
  size: string;
}

const Documents = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [documentType, setDocumentType] = useState("");
  const [transactionType, setTransactionType] = useState("");
  const [sortBy, setSortBy] = useState("date-desc");
  
  const documents: Document[] = [
    {
      id: "doc1",
      name: "Commercial Invoice - ABC Electronics",
      type: "Invoice",
      transaction: "LC-2025-05478",
      transactionType: "Letter of Credit",
      uploadDate: "2025-05-20",
      status: "approved",
      size: "1.2 MB"
    },
    {
      id: "doc2",
      name: "Packing List - XYZ Shipment",
      type: "Packing List",
      transaction: "LC-2025-05478",
      transactionType: "Letter of Credit",
      uploadDate: "2025-05-18",
      status: "approved",
      size: "820 KB"
    },
    {
      id: "doc3",
      name: "Bill of Lading - Container MSCU7369871",
      type: "Transport",
      transaction: "LC-2025-05478",
      transactionType: "Letter of Credit",
      uploadDate: "2025-05-15",
      status: "approved",
      size: "945 KB"
    },
    {
      id: "doc4",
      name: "Certificate of Origin - Electrical Components",
      type: "Certificate",
      transaction: "LC-2025-05478",
      transactionType: "Letter of Credit",
      uploadDate: "2025-05-12",
      status: "rejected",
      size: "680 KB"
    },
    {
      id: "doc5",
      name: "Insurance Certificate - Marine Cargo",
      type: "Insurance",
      transaction: "LC-2025-05478",
      transactionType: "Letter of Credit",
      uploadDate: "2025-05-10",
      status: "pending",
      size: "540 KB"
    },
    {
      id: "doc6",
      name: "Performance Bond - City Project",
      type: "Guarantee",
      transaction: "BG-2025-01122",
      transactionType: "Bank Guarantee",
      uploadDate: "2025-05-08",
      status: "approved",
      size: "725 KB"
    },
    {
      id: "doc7",
      name: "Bank Swift Message - Payment Confirmation",
      type: "Payment",
      transaction: "RM-2025-00845",
      transactionType: "Remittance",
      uploadDate: "2025-05-05",
      status: "approved",
      size: "310 KB"
    }
  ];
  
  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          doc.transaction.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDocType = documentType ? doc.type === documentType : true;
    const matchesTransType = transactionType ? doc.transactionType === transactionType : true;
    
    return matchesSearch && matchesDocType && matchesTransType;
  });
  
  const sortedDocuments = [...filteredDocuments].sort((a, b) => {
    switch (sortBy) {
      case "date-desc":
        return new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime();
      case "date-asc":
        return new Date(a.uploadDate).getTime() - new Date(b.uploadDate).getTime();
      case "name-asc":
        return a.name.localeCompare(b.name);
      case "name-desc":
        return b.name.localeCompare(a.name);
      default:
        return 0;
    }
  });
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            <Check className="mr-1 h-3.5 w-3.5" /> Approved
          </Badge>
        );
      case "rejected":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
            <AlertCircle className="mr-1 h-3.5 w-3.5" /> Rejected
          </Badge>
        );
      default:
        return (
          <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
            Pending
          </Badge>
        );
    }
  };
  
  const documentTypeOptions = ["Invoice", "Packing List", "Transport", "Certificate", "Insurance", "Guarantee", "Payment"];
  const transactionTypeOptions = ["Letter of Credit", "Bank Guarantee", "Remittance"];
  
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Document Center</h1>
            <p className="text-muted-foreground">
              Manage documents for all your trade finance transactions
            </p>
          </div>
          
          <Button className="btn-hover hover:scale-105 transition-transform duration-300">
            <Upload className="mr-2 h-4 w-4" /> Upload New Document
          </Button>
        </div>
        
        <Tabs defaultValue="all" className="w-full">
          <div className="flex justify-between items-center mb-4">
            <TabsList className="glassmorphism">
              <TabsTrigger value="all">All Documents</TabsTrigger>
              <TabsTrigger value="pending">Pending Review</TabsTrigger>
              <TabsTrigger value="approved">Approved</TabsTrigger>
              <TabsTrigger value="rejected">Rejected</TabsTrigger>
            </TabsList>
          </div>
          
          <Card className="glassmorphism mb-6">
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="col-span-1">
                  <SearchInput
                    placeholder="Search documents..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full"
                  />
                </div>
                
                <div className="col-span-1">
                  <Select value={documentType} onValueChange={setDocumentType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Document Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Types</SelectItem>
                      {documentTypeOptions.map((type) => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="col-span-1">
                  <Select value={transactionType} onValueChange={setTransactionType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Transaction Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Transactions</SelectItem>
                      {transactionTypeOptions.map((type) => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="flex justify-between items-center mt-4">
                <div className="text-sm text-muted-foreground">
                  {filteredDocuments.length} documents found
                </div>
                
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-muted-foreground">Sort by:</span>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="date-desc">Date (Newest first)</SelectItem>
                      <SelectItem value="date-asc">Date (Oldest first)</SelectItem>
                      <SelectItem value="name-asc">Name (A-Z)</SelectItem>
                      <SelectItem value="name-desc">Name (Z-A)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <TabsContent value="all" className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              {sortedDocuments.map((doc) => (
                <Card key={doc.id} className="glassmorphism hover:bg-white/10 transition-colors">
                  <CardContent className="p-4 flex flex-col md:flex-row justify-between items-start md:items-center">
                    <div className="flex items-start">
                      <div className="h-10 w-10 bg-white/15 rounded flex items-center justify-center mr-4">
                        <FileText className="h-5 w-5 text-trade-purple" />
                      </div>
                      
                      <div>
                        <h3 className="font-medium hover:text-trade-purple transition-colors">{doc.name}</h3>
                        <div className="flex flex-wrap gap-x-4 gap-y-2 mt-1 text-xs text-muted-foreground">
                          <span className="flex items-center">Type: {doc.type}</span>
                          <span className="flex items-center">Transaction: {doc.transaction}</span>
                          <span className="flex items-center">Uploaded: {doc.uploadDate}</span>
                          <span className="flex items-center">Size: {doc.size}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center mt-4 md:mt-0 space-x-2">
                      {getStatusBadge(doc.status)}
                      <Button variant="ghost" size="sm" className="hover:bg-white/20">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="hover:bg-white/20">
                        <ArrowUpRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="pending" className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              {sortedDocuments
                .filter(doc => doc.status === "pending")
                .map((doc) => (
                  <Card key={doc.id} className="glassmorphism hover:bg-white/10 transition-colors">
                    <CardContent className="p-4 flex flex-col md:flex-row justify-between items-start md:items-center">
                      <div className="flex items-start">
                        <div className="h-10 w-10 bg-white/15 rounded flex items-center justify-center mr-4">
                          <FileText className="h-5 w-5 text-trade-purple" />
                        </div>
                        
                        <div>
                          <h3 className="font-medium hover:text-trade-purple transition-colors">{doc.name}</h3>
                          <div className="flex flex-wrap gap-x-4 gap-y-2 mt-1 text-xs text-muted-foreground">
                            <span className="flex items-center">Type: {doc.type}</span>
                            <span className="flex items-center">Transaction: {doc.transaction}</span>
                            <span className="flex items-center">Uploaded: {doc.uploadDate}</span>
                            <span className="flex items-center">Size: {doc.size}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center mt-4 md:mt-0 space-x-2">
                        {getStatusBadge(doc.status)}
                        <Button variant="ghost" size="sm" className="hover:bg-white/20">
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="hover:bg-white/20">
                          <ArrowUpRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>
          
          <TabsContent value="approved" className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              {sortedDocuments
                .filter(doc => doc.status === "approved")
                .map((doc) => (
                  <Card key={doc.id} className="glassmorphism hover:bg-white/10 transition-colors">
                    <CardContent className="p-4 flex flex-col md:flex-row justify-between items-start md:items-center">
                      <div className="flex items-start">
                        <div className="h-10 w-10 bg-white/15 rounded flex items-center justify-center mr-4">
                          <FileText className="h-5 w-5 text-trade-purple" />
                        </div>
                        
                        <div>
                          <h3 className="font-medium hover:text-trade-purple transition-colors">{doc.name}</h3>
                          <div className="flex flex-wrap gap-x-4 gap-y-2 mt-1 text-xs text-muted-foreground">
                            <span className="flex items-center">Type: {doc.type}</span>
                            <span className="flex items-center">Transaction: {doc.transaction}</span>
                            <span className="flex items-center">Uploaded: {doc.uploadDate}</span>
                            <span className="flex items-center">Size: {doc.size}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center mt-4 md:mt-0 space-x-2">
                        {getStatusBadge(doc.status)}
                        <Button variant="ghost" size="sm" className="hover:bg-white/20">
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="hover:bg-white/20">
                          <ArrowUpRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>
          
          <TabsContent value="rejected" className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              {sortedDocuments
                .filter(doc => doc.status === "rejected")
                .map((doc) => (
                  <Card key={doc.id} className="glassmorphism hover:bg-white/10 transition-colors">
                    <CardContent className="p-4 flex flex-col md:flex-row justify-between items-start md:items-center">
                      <div className="flex items-start">
                        <div className="h-10 w-10 bg-white/15 rounded flex items-center justify-center mr-4">
                          <FileText className="h-5 w-5 text-trade-purple" />
                        </div>
                        
                        <div>
                          <h3 className="font-medium hover:text-trade-purple transition-colors">{doc.name}</h3>
                          <div className="flex flex-wrap gap-x-4 gap-y-2 mt-1 text-xs text-muted-foreground">
                            <span className="flex items-center">Type: {doc.type}</span>
                            <span className="flex items-center">Transaction: {doc.transaction}</span>
                            <span className="flex items-center">Uploaded: {doc.uploadDate}</span>
                            <span className="flex items-center">Size: {doc.size}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center mt-4 md:mt-0 space-x-2">
                        {getStatusBadge(doc.status)}
                        <Button variant="ghost" size="sm" className="hover:bg-white/20">
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="hover:bg-white/20">
                          <ArrowUpRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Documents;
