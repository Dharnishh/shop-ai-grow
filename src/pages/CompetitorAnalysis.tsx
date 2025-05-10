
import React, { useState } from "react";
import PageLayout from "@/components/PageLayout";
import { 
  BarChart as BarChartIcon, 
  TrendingUp, 
  Users, 
  MessageSquare,
  Eye, 
  Search, 
  Plus,
  Facebook,
  Instagram, 
  Twitter 
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const CompetitorAnalysis: React.FC = () => {
  const [competitorUrl, setCompetitorUrl] = useState("");
  
  // Sample data for charts
  const weeklyData = [
    { name: 'Mon', yourPage: 4000, competitor: 2400 },
    { name: 'Tue', yourPage: 3000, competitor: 1398 },
    { name: 'Wed', yourPage: 2000, competitor: 9800 },
    { name: 'Thu', yourPage: 2780, competitor: 3908 },
    { name: 'Fri', yourPage: 1890, competitor: 4800 },
    { name: 'Sat', yourPage: 2390, competitor: 3800 },
    { name: 'Sun', yourPage: 3490, competitor: 4300 },
  ];

  const engagementData = [
    { name: 'Likes', yourPage: 4000, competitor: 2400 },
    { name: 'Comments', yourPage: 3000, competitor: 1398 },
    { name: 'Shares', yourPage: 2000, competitor: 3300 },
    { name: 'Saves', yourPage: 2780, competitor: 3908 },
  ];

  const topCompetitors = [
    { id: 1, name: "FashionHub", platform: "Instagram", followers: 12500, engagement: 3.8 },
    { id: 2, name: "StyleCompany", platform: "Facebook", followers: 9800, engagement: 2.7 },
    { id: 3, name: "TrendyStore", platform: "Instagram", followers: 15200, engagement: 4.2 },
  ];

  return (
    <PageLayout>
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl font-bold mb-4">Competitor Analysis</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Gain insights into your competitors' performance and strategies to stay ahead in your market.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="animate-fade-in">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Follower Count</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8,350</div>
              <p className="text-xs text-muted-foreground">
                <TrendingUp className="inline mr-1 h-3 w-3 text-green-500" />
                +12.3% from last month
              </p>
            </CardContent>
          </Card>
          
          <Card className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Engagement Rate</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3.6%</div>
              <p className="text-xs text-muted-foreground">
                <TrendingUp className="inline mr-1 h-3 w-3 text-green-500" />
                +1.8% from last month
              </p>
            </CardContent>
          </Card>
          
          <Card className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Post Impressions</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24.5K</div>
              <p className="text-xs text-muted-foreground">
                <TrendingUp className="inline mr-1 h-3 w-3 text-green-500" />
                +28.4% from last month
              </p>
            </CardContent>
          </Card>
          
          <Card className="animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Growth Rate</CardTitle>
              <BarChartIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5.2%</div>
              <p className="text-xs text-muted-foreground">
                <TrendingUp className="inline mr-1 h-3 w-3 text-green-500" />
                +2.1% from last month
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2 animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <Card>
              <CardHeader>
                <CardTitle>Weekly Performance Comparison</CardTitle>
                <CardDescription>
                  Compare your performance with your top competitor
                </CardDescription>
                <Tabs defaultValue="followers">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="followers">Followers</TabsTrigger>
                    <TabsTrigger value="engagement">Engagement</TabsTrigger>
                    <TabsTrigger value="impressions">Impressions</TabsTrigger>
                  </TabsList>
                </Tabs>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={weeklyData}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="yourPage"
                        name="Your Page"
                        stroke="#9b87f5"
                        activeDot={{ r: 8 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="competitor"
                        name="Competitor"
                        stroke="#8884d8"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="animate-fade-in" style={{ animationDelay: "0.5s" }}>
            <Card>
              <CardHeader>
                <CardTitle>Engagement Breakdown</CardTitle>
                <CardDescription>
                  Comparison by engagement type
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={engagementData}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar
                        dataKey="yourPage"
                        name="Your Page"
                        fill="#9b87f5"
                      />
                      <Bar
                        dataKey="competitor"
                        name="Competitor"
                        fill="#8884d8"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="animate-fade-in" style={{ animationDelay: "0.6s" }}>
          <Card className="mb-12">
            <CardHeader>
              <CardTitle>Track New Competitor</CardTitle>
              <CardDescription>
                Add a competitor to analyze their social media performance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-4">
                <Input
                  placeholder="Enter competitor social media URL"
                  className="flex-grow rounded-lg"
                  value={competitorUrl}
                  onChange={(e) => setCompetitorUrl(e.target.value)}
                />
                <div className="flex gap-2">
                  <Button 
                    className="bg-accent-purple hover:bg-accent-purple-hover rounded-lg button-hover"
                  >
                    Add Competitor
                  </Button>
                  <Button 
                    variant="outline"
                    className="rounded-lg button-hover"
                  >
                    <Search className="mr-2 h-4 w-4" />
                    Search
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="animate-fade-in" style={{ animationDelay: "0.7s" }}>
          <Card>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>Top Competitors</span>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="rounded-full button-hover"
                >
                  <Plus className="mr-1 h-4 w-4" /> Add New
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b bg-gray-50">
                      <th className="py-3 px-4 text-left font-medium">Competitor</th>
                      <th className="py-3 px-4 text-left font-medium">Platform</th>
                      <th className="py-3 px-4 text-right font-medium">Followers</th>
                      <th className="py-3 px-4 text-right font-medium">Engagement</th>
                    </tr>
                  </thead>
                  <tbody>
                    {topCompetitors.map((competitor) => (
                      <tr key={competitor.id} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4">{competitor.name}</td>
                        <td className="py-3 px-4">
                          <div className="flex items-center">
                            {competitor.platform === "Instagram" ? (
                              <Instagram className="h-4 w-4 mr-1 text-pink-600" />
                            ) : competitor.platform === "Facebook" ? (
                              <Facebook className="h-4 w-4 mr-1 text-blue-600" />
                            ) : (
                              <Twitter className="h-4 w-4 mr-1 text-blue-400" />
                            )}
                            {competitor.platform}
                          </div>
                        </td>
                        <td className="py-3 px-4 text-right">
                          {competitor.followers.toLocaleString()}
                        </td>
                        <td className="py-3 px-4 text-right">
                          {competitor.engagement}%
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
};

export default CompetitorAnalysis;
