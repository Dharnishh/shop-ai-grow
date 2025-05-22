
import React, { useState } from "react";
import DashboardLayout from "@/components/Dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Plus, Edit, Trash2, MessageSquare } from "lucide-react";
import { Input } from "@/components/ui/input";

interface Account {
  id: string;
  name: string;
  platform: string;
  status: "active" | "inactive";
  dateAdded: string;
}

const ManageAccounts: React.FC = () => {
  const { toast } = useToast();
  const [accounts, setAccounts] = useState<Account[]>([
    {
      id: "1",
      name: "Main Facebook Page",
      platform: "Facebook",
      status: "active",
      dateAdded: "2025-03-15",
    },
    {
      id: "2",
      name: "Business Instagram",
      platform: "Instagram",
      status: "active",
      dateAdded: "2025-03-15",
    },
    {
      id: "3",
      name: "Customer Support WhatsApp",
      platform: "WhatsApp",
      status: "active",
      dateAdded: "2025-05-22",
    },
  ]);
  
  const [newAccountName, setNewAccountName] = useState("");
  const [isAddingAccount, setIsAddingAccount] = useState(false);
  
  const handleAddAccount = () => {
    if (!newAccountName.trim()) {
      toast({
        title: "Error",
        description: "Please enter an account name",
        variant: "destructive",
      });
      return;
    }
    
    const newAccount: Account = {
      id: Date.now().toString(),
      name: newAccountName,
      platform: "WhatsApp", // Default platform
      status: "active",
      dateAdded: new Date().toISOString().split('T')[0],
    };
    
    setAccounts([...accounts, newAccount]);
    setNewAccountName("");
    setIsAddingAccount(false);
    
    toast({
      title: "Success",
      description: "Account added successfully",
    });
  };
  
  const handleDeleteAccount = (id: string) => {
    setAccounts(accounts.filter(account => account.id !== id));
    toast({
      title: "Account Deleted",
      description: "The account has been removed",
    });
  };
  
  return (
    <DashboardLayout pageTitle="Manage Social Media Accounts">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Connected Accounts</CardTitle>
          <CardDescription>
            Manage all your social media accounts in one place
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex justify-end">
            {!isAddingAccount ? (
              <Button onClick={() => setIsAddingAccount(true)}>
                <Plus className="mr-2 h-4 w-4" /> Add Account
              </Button>
            ) : (
              <div className="flex w-full max-w-sm items-center space-x-2">
                <Input
                  placeholder="Account name"
                  value={newAccountName}
                  onChange={(e) => setNewAccountName(e.target.value)}
                />
                <Button onClick={handleAddAccount}>Add</Button>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setIsAddingAccount(false);
                    setNewAccountName("");
                  }}
                >
                  Cancel
                </Button>
              </div>
            )}
          </div>
          
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Account Name</TableHead>
                <TableHead>Platform</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date Added</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {accounts.map((account) => (
                <TableRow key={account.id}>
                  <TableCell className="font-medium">{account.name}</TableCell>
                  <TableCell>{account.platform}</TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      account.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                    }`}>
                      {account.status === "active" ? "Active" : "Inactive"}
                    </span>
                  </TableCell>
                  <TableCell>{account.dateAdded}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => handleDeleteAccount(account.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default ManageAccounts;
