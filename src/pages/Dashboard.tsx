
import React from "react";
import DashboardLayout from "@/components/Dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  CalendarDays, 
  Image, 
  Video, 
  MessageCircle,
  BarChart, 
  ArrowRight,
  ArrowUp
} from "lucide-react";
import { Link } from "react-router-dom";
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from "recharts";
import SocialMediaIntegration from "@/components/SocialMediaIntegration";

const Dashboard: React.FC = () => {
  // Sample data for the analytics chart
  const analyticsData = [
    { name: "Mon", posts: 4, engagement: 12 },
    { name: "Tue", posts: 3, engagement: 8 },
    { name: "Wed", posts: 5, engagement: 18 },
    { name: "Thu", posts: 2, engagement: 6 },
    { name: "Fri", posts: 6, engagement: 23 },
    { name: "Sat", posts: 3, engagement: 9 },
    { name: "Sun", posts: 2, engagement: 7 },
  ];

  const moduleCards = [
    {
      title: "Auto Schedule Posts",
      icon: <CalendarDays size={24} />,
      color: "bg-blue-100 text-blue-600",
      description: "Schedule your social media posts in advance.",
      href: "/dashboard/schedule",
      delay: 100
    },
    {
      title: "AI Tools",
      icon: <MessageCircle size={24} />,
      color: "bg-purple-100 text-purple-600",
      description: "Generate content with our AI-powered tools.",
      href: "/dashboard/ai-tools",
      delay: 200
    },
    {
      title: "Photo Editing",
      icon: <Image size={24} />,
      color: "bg-green-100 text-green-600",
      description: "Edit photos with our simple tools.",
      href: "/dashboard/photo-editing",
      delay: 300
    },
    {
      title: "Video Editing",
      icon: <Video size={24} />,
      color: "bg-orange-100 text-orange-600",
      description: "Create engaging video content easily.",
      href: "/dashboard/video-editing",
      delay: 400
    },
  ];

  return (
    <DashboardLayout pageTitle="Dashboard">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold">Welcome back, John!</h2>
        <p className="text-gray-600">Here's what's happening with your shop today.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Posts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <span className="text-3xl font-bold">28</span>
              <div className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-medium">
                +14% <ArrowUp className="inline h-3 w-3 ml-1" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Engagement Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <span className="text-3xl font-bold">4.2%</span>
              <div className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-medium">
                +0.8% <ArrowUp className="inline h-3 w-3 ml-1" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">New Followers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <span className="text-3xl font-bold">84</span>
              <div className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-medium">
                +12% <ArrowUp className="inline h-3 w-3 ml-1" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4">Analytics Overview</h3>
        <Card>
          <CardContent className="pt-6">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsBarChart data={analyticsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="posts" fill="#8884d8" name="Posts" />
                  <Bar dataKey="engagement" fill="#82ca9d" name="Engagement" />
                </RechartsBarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4">Social Media Connections</h3>
        <SocialMediaIntegration />
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-4">Quick Access</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {moduleCards.map((card, index) => (
            <Card key={index} className="overflow-hidden animate-fade-in" style={{animationDelay: `${card.delay}ms`}}>
              <CardContent className="p-6">
                <div className={`w-12 h-12 rounded-lg ${card.color} flex items-center justify-center mb-4`}>
                  {card.icon}
                </div>
                <h4 className="font-semibold mb-2">{card.title}</h4>
                <p className="text-gray-600 text-sm mb-4">{card.description}</p>
                <Button variant="ghost" className="text-accent-purple p-0 hover:bg-transparent hover:text-accent-purple-hover" asChild>
                  <Link to={card.href}>
                    Access <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
