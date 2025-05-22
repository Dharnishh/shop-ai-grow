import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Facebook, Instagram, MessageSquare } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const SocialMediaIntegration: React.FC = () => {
  const { toast } = useToast();
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [instagramHandle, setInstagramHandle] = useState("");
  const [facebookPageId, setFacebookPageId] = useState("");
  const [message, setMessage] = useState("Hello! I'm interested in your services.");
  const [whatsappBusiness, setWhatsappBusiness] = useState(false);

  const handleWhatsAppChat = () => {
    if (!whatsappNumber) {
      toast({
        title: "Error",
        description: "Please enter a WhatsApp number",
        variant: "destructive",
      });
      return;
    }
    
    // Format the number (remove spaces, +, etc)
    const formattedNumber = whatsappNumber.replace(/\s+/g, "").replace(/\+/g, "");
    
    // Use the WhatsApp Business API URL if selected, otherwise use the regular WhatsApp URL
    const whatsappUrl = whatsappBusiness 
      ? `https://api.whatsapp.com/send?phone=${formattedNumber}&text=${encodeURIComponent(message)}`
      : `https://wa.me/${formattedNumber}?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappUrl, "_blank");
    
    toast({
      title: "WhatsApp",
      description: "Opening WhatsApp chat",
    });
  };

  const handleInstagramConnect = () => {
    if (!instagramHandle) {
      toast({
        title: "Error",
        description: "Please enter an Instagram handle",
        variant: "destructive",
      });
      return;
    }
    
    // Remove @ if present
    const handle = instagramHandle.replace(/^@/, "");
    const instagramUrl = `https://www.instagram.com/${handle}/`;
    window.open(instagramUrl, "_blank");
    
    toast({
      title: "Instagram",
      description: `Opening ${handle}'s Instagram profile`,
    });
  };

  const handleFacebookConnect = () => {
    if (!facebookPageId) {
      toast({
        title: "Error",
        description: "Please enter a Facebook page ID or name",
        variant: "destructive",
      });
      return;
    }
    
    const facebookUrl = `https://www.facebook.com/${facebookPageId}`;
    window.open(facebookUrl, "_blank");
    
    toast({
      title: "Facebook",
      description: "Opening Facebook page",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Social Media Integration</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="whatsapp">
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="whatsapp">WhatsApp</TabsTrigger>
            <TabsTrigger value="instagram">Instagram</TabsTrigger>
            <TabsTrigger value="facebook">Facebook</TabsTrigger>
          </TabsList>
          
          <TabsContent value="whatsapp" className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">WhatsApp Number</label>
              <Input
                placeholder="e.g., +1234567890"
                value={whatsappNumber}
                onChange={(e) => setWhatsappNumber(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Message</label>
              <Input
                placeholder="Enter your message here"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>
            
            <div className="flex items-center space-x-2 mb-4">
              <input
                type="checkbox"
                id="whatsappBusiness"
                checked={whatsappBusiness}
                onChange={(e) => setWhatsappBusiness(e.target.checked)}
                className="rounded border-gray-300 text-green-600"
              />
              <label htmlFor="whatsappBusiness" className="text-sm font-medium">
                Use WhatsApp Business API
              </label>
            </div>
            
            <Button 
              onClick={handleWhatsAppChat}
              className="w-full bg-green-500 hover:bg-green-600"
            >
              <MessageSquare className="mr-2 h-4 w-4" /> Start WhatsApp Chat
            </Button>
            
            <div className="mt-4 bg-gray-50 p-4 rounded-md border border-gray-200">
              <h4 className="font-medium text-sm mb-2">WhatsApp Integration Options:</h4>
              <ul className="list-disc pl-5 text-sm space-y-1 text-gray-600">
                <li>Direct chat link (current): No API key needed, opens chat in WhatsApp app</li>
                <li>WhatsApp Business API: Requires business account and approval from Meta</li>
                <li>WhatsApp Cloud API: Allows automated messages through Meta's API</li>
                <li>Multi-agent inbox: Requires third-party service integration</li>
              </ul>
            </div>
          </TabsContent>
          
          <TabsContent value="instagram" className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Instagram Handle</label>
              <Input
                placeholder="e.g., @yourbusiness"
                value={instagramHandle}
                onChange={(e) => setInstagramHandle(e.target.value)}
              />
            </div>
            <Button 
              onClick={handleInstagramConnect}
              className="w-full bg-pink-500 hover:bg-pink-600"
            >
              <Instagram className="mr-2 h-4 w-4" /> Connect to Instagram
            </Button>
            <div className="text-sm text-gray-500 mt-2">
              <p>For full Instagram API integration (displaying feeds, posting content, etc.), you'll need to:</p>
              <ol className="list-decimal pl-5 mt-2 space-y-1">
                <li>Create a Facebook Developer account</li>
                <li>Set up an Instagram Business or Creator account</li>
                <li>Link your Facebook Page to your Instagram account</li>
                <li>Create a Facebook App and request appropriate permissions</li>
              </ol>
            </div>
          </TabsContent>
          
          <TabsContent value="facebook" className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Facebook Page ID/Username</label>
              <Input
                placeholder="e.g., yourbusiness"
                value={facebookPageId}
                onChange={(e) => setFacebookPageId(e.target.value)}
              />
            </div>
            <Button 
              onClick={handleFacebookConnect}
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              <Facebook className="mr-2 h-4 w-4" /> Connect to Facebook
            </Button>
            <div className="text-sm text-gray-500 mt-2">
              <p>For full Facebook API integration (displaying page feed, managing messages, etc.), you'll need to:</p>
              <ol className="list-decimal pl-5 mt-2 space-y-1">
                <li>Create a Facebook Developer account</li>
                <li>Set up a Facebook App</li>
                <li>Configure necessary permissions and authentication</li>
              </ol>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default SocialMediaIntegration;
