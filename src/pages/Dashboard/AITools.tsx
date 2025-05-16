
import React from "react";
import DashboardLayout from "@/components/Dashboard/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageCircle, Hash, FileText, Image } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

const AITools: React.FC = () => {
  const tools = [
    {
      id: "caption",
      name: "Caption Generator",
      description: "Create engaging captions for your social media posts",
      icon: <MessageCircle className="h-5 w-5 text-blue-600" />,
      color: "bg-blue-100"
    },
    {
      id: "ideas",
      name: "Content Ideas",
      description: "Get AI-powered content ideas for your business",
      icon: <FileText className="h-5 w-5 text-purple-600" />,
      color: "bg-purple-100"
    },
    {
      id: "hashtags",
      name: "Hashtag Finder",
      description: "Find relevant hashtags to increase your reach",
      icon: <Hash className="h-5 w-5 text-green-600" />,
      color: "bg-green-100"
    },
    {
      id: "templates",
      name: "Post Templates",
      description: "Choose from professionally designed templates",
      icon: <Image className="h-5 w-5 text-pink-600" />,
      color: "bg-pink-100"
    }
  ];

  return (
    <DashboardLayout pageTitle="AI Tools">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold">AI Content Tools</h2>
        <p className="text-gray-600">Create and optimize your social media content with AI assistance.</p>
      </div>
      
      <Tabs defaultValue="caption" className="w-full">
        <TabsList className="grid grid-cols-4 mb-8">
          {tools.map(tool => (
            <TabsTrigger key={tool.id} value={tool.id} className="flex flex-col items-center gap-2 py-4">
              <div className={`${tool.color} p-2 rounded-full`}>
                {tool.icon}
              </div>
              <span>{tool.name}</span>
            </TabsTrigger>
          ))}
        </TabsList>
        
        <TabsContent value="caption">
          <Card>
            <CardHeader>
              <CardTitle>AI Caption Generator</CardTitle>
              <CardDescription>
                Create engaging captions for your social media posts in seconds.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium block mb-1">Describe your image or product</label>
                <Textarea
                  placeholder="E.g., A coffee shop with aesthetic interior design, morning light through the windows, people enjoying coffee..."
                  className="min-h-[120px]"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium block mb-1">Business Type</label>
                  <Input placeholder="E.g., Coffee Shop, Fashion Boutique, etc." />
                </div>
                
                <div>
                  <label className="text-sm font-medium block mb-1">Tone</label>
                  <Input placeholder="E.g., Professional, Casual, Funny, etc." />
                </div>
              </div>
              
              <Button className="w-full md:w-auto">Generate Captions</Button>
              
              <div className="border rounded-md p-4 mt-4 bg-gray-50">
                <h4 className="font-medium mb-2">Generated Captions</h4>
                <div className="space-y-3">
                  <div className="p-3 bg-white rounded border">
                    <p>Start your day with the perfect brew. Our handcrafted coffees are made with love and served in our cozy atmosphere. ☕ #MorningCoffee #CafeVibes</p>
                  </div>
                  <div className="p-3 bg-white rounded border">
                    <p>Sunshine, good vibes, and even better coffee. That's how we do mornings around here! What's your favorite way to start the day? 🌞 #CoffeeTime</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="ideas">
          <Card>
            <CardHeader>
              <CardTitle>Content Ideas Generator</CardTitle>
              <CardDescription>
                Get AI-powered content ideas tailored to your business.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium block mb-1">What's your business about?</label>
                <Textarea
                  placeholder="Tell us about your business, products, or services..."
                  className="min-h-[120px]"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium block mb-1">Target Audience</label>
                  <Input placeholder="Who are you trying to reach?" />
                </div>
                
                <div>
                  <label className="text-sm font-medium block mb-1">Content Type</label>
                  <Input placeholder="E.g., Educational, Promotional, Behind the Scenes" />
                </div>
              </div>
              
              <Button className="w-full md:w-auto">Generate Ideas</Button>
              
              <div className="border rounded-md p-4 mt-4 bg-gray-50">
                <h4 className="font-medium mb-2">Content Ideas</h4>
                <ul className="space-y-2">
                  <li className="p-3 bg-white rounded border">
                    "Day in the life" video showing your team preparing for the day
                  </li>
                  <li className="p-3 bg-white rounded border">
                    Customer spotlight featuring a loyal customer and their story
                  </li>
                  <li className="p-3 bg-white rounded border">
                    Tutorial on how to make the perfect pour-over coffee at home
                  </li>
                  <li className="p-3 bg-white rounded border">
                    Behind-the-scenes look at how you source your coffee beans
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="hashtags">
          <Card>
            <CardHeader>
              <CardTitle>Hashtag Finder</CardTitle>
              <CardDescription>
                Discover relevant hashtags to increase your post reach and engagement.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium block mb-1">What is your post about?</label>
                <Textarea
                  placeholder="Describe your post content..."
                  className="min-h-[120px]"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium block mb-1">Industry</label>
                  <Input placeholder="E.g., Fashion, Food, Technology" />
                </div>
                
                <div>
                  <label className="text-sm font-medium block mb-1">Number of Hashtags</label>
                  <Input type="number" placeholder="10" min="5" max="30" />
                </div>
              </div>
              
              <Button className="w-full md:w-auto">Find Hashtags</Button>
              
              <div className="border rounded-md p-4 mt-4 bg-gray-50">
                <h4 className="font-medium mb-2">Recommended Hashtags</h4>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm">#CoffeeShop</span>
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm">#MorningCoffee</span>
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm">#CafeVibes</span>
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm">#BrewedCoffee</span>
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm">#CoffeeLover</span>
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm">#CoffeeTime</span>
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm">#BaristaLife</span>
                  <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-sm">#LocalCafe</span>
                  <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-sm">#EspressoYourself</span>
                  <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-sm">#CafeCulture</span>
                </div>
                <div className="mt-4">
                  <h5 className="text-sm font-medium mb-1">Hashtag Performance</h5>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-white rounded border">
                      <p className="text-sm text-gray-500">Popular</p>
                      <p className="font-medium">#CoffeeShop</p>
                      <p className="text-sm text-gray-500">12.3M posts</p>
                    </div>
                    <div className="text-center p-3 bg-white rounded border">
                      <p className="text-sm text-gray-500">Trending</p>
                      <p className="font-medium">#MorningCoffee</p>
                      <p className="text-sm text-gray-500">5.2M posts</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="templates">
          <Card>
            <CardHeader>
              <CardTitle>Post Templates</CardTitle>
              <CardDescription>
                Choose from professionally designed templates for your posts.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <div className="border rounded-md overflow-hidden cursor-pointer hover:border-accent-purple transition-colors">
                  <div className="aspect-square bg-gradient-to-tr from-blue-100 to-blue-300 flex items-center justify-center">
                    <div className="text-center p-4">
                      <h3 className="font-bold">SALE</h3>
                      <p className="text-sm">Up to 50% off</p>
                    </div>
                  </div>
                  <div className="p-3 border-t">
                    <p className="font-medium">Sale Announcement</p>
                    <p className="text-xs text-gray-500">Perfect for promotions</p>
                  </div>
                </div>
                
                <div className="border rounded-md overflow-hidden cursor-pointer hover:border-accent-purple transition-colors">
                  <div className="aspect-square bg-gradient-to-tr from-pink-100 to-pink-300 flex items-center justify-center">
                    <div className="text-center p-4">
                      <h3 className="font-bold">Product Spotlight</h3>
                      <p className="text-sm">Highlight your best items</p>
                    </div>
                  </div>
                  <div className="p-3 border-t">
                    <p className="font-medium">Product Feature</p>
                    <p className="text-xs text-gray-500">Showcase items</p>
                  </div>
                </div>
                
                <div className="border rounded-md overflow-hidden cursor-pointer hover:border-accent-purple transition-colors">
                  <div className="aspect-square bg-gradient-to-tr from-green-100 to-green-300 flex items-center justify-center">
                    <div className="text-center p-4">
                      <h3 className="font-bold">Quote</h3>
                      <p className="text-sm">Share inspiration</p>
                    </div>
                  </div>
                  <div className="p-3 border-t">
                    <p className="font-medium">Inspirational Quote</p>
                    <p className="text-xs text-gray-500">Engage your audience</p>
                  </div>
                </div>
                
                <div className="border rounded-md overflow-hidden cursor-pointer hover:border-accent-purple transition-colors">
                  <div className="aspect-square bg-gradient-to-tr from-yellow-100 to-yellow-300 flex items-center justify-center">
                    <div className="text-center p-4">
                      <h3 className="font-bold">Testimonial</h3>
                      <p className="text-sm">Customer reviews</p>
                    </div>
                  </div>
                  <div className="p-3 border-t">
                    <p className="font-medium">Customer Spotlight</p>
                    <p className="text-xs text-gray-500">Build trust</p>
                  </div>
                </div>
                
                <div className="border rounded-md overflow-hidden cursor-pointer hover:border-accent-purple transition-colors">
                  <div className="aspect-square bg-gradient-to-tr from-purple-100 to-purple-300 flex items-center justify-center">
                    <div className="text-center p-4">
                      <h3 className="font-bold">How-To</h3>
                      <p className="text-sm">Tutorial format</p>
                    </div>
                  </div>
                  <div className="p-3 border-t">
                    <p className="font-medium">Tutorial Format</p>
                    <p className="text-xs text-gray-500">Educational content</p>
                  </div>
                </div>
                
                <div className="border rounded-md overflow-hidden cursor-pointer hover:border-accent-purple transition-colors">
                  <div className="aspect-square bg-gradient-to-tr from-red-100 to-red-300 flex items-center justify-center">
                    <div className="text-center p-4">
                      <h3 className="font-bold">Special Event</h3>
                      <p className="text-sm">Announcement design</p>
                    </div>
                  </div>
                  <div className="p-3 border-t">
                    <p className="font-medium">Event Announcement</p>
                    <p className="text-xs text-gray-500">Drive attendance</p>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-center">
                <Button variant="outline">Load More Templates</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default AITools;
