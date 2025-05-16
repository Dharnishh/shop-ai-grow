
import React, { useState } from "react";
import DashboardLayout from "@/components/Dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarDays, Clock, Send, Plus } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

const Schedule: React.FC = () => {
  const [date, setDate] = useState<Date>();
  const [platform, setPlatform] = useState<string>("");
  
  // Sample scheduled posts
  const scheduledPosts = [
    { 
      id: 1, 
      content: "Check out our new spring collection! 🌸 #SpringFashion #NewArrivals", 
      platform: "Instagram",
      scheduledDate: new Date(2025, 4, 20, 10, 30),
      image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&auto=format"
    },
    { 
      id: 2, 
      content: "Flash sale alert! 🔥 Get 20% off on all items for the next 24 hours. Shop now!", 
      platform: "Facebook",
      scheduledDate: new Date(2025, 4, 21, 12, 0),
      image: null
    },
    { 
      id: 3, 
      content: "Our weekend special is back! RT to win a free gift with your next purchase.", 
      platform: "Twitter",
      scheduledDate: new Date(2025, 4, 23, 16, 15),
      image: null
    }
  ];

  const formatScheduledTime = (date: Date) => {
    return format(date, "PPP 'at' p");
  };

  const getPlatformColor = (platform: string) => {
    switch(platform) {
      case "Instagram":
        return "bg-pink-100 text-pink-600";
      case "Facebook":
        return "bg-blue-100 text-blue-600";
      case "Twitter":
        return "bg-sky-100 text-sky-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <DashboardLayout pageTitle="Auto Schedule Posts">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold">Auto Schedule Posts</h2>
        <p className="text-gray-600">Plan and schedule your social media content in advance.</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Scheduled Posts</CardTitle>
            </CardHeader>
            <CardContent>
              {scheduledPosts.length > 0 ? (
                <div className="space-y-4">
                  {scheduledPosts.map(post => (
                    <div key={post.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div className={`px-2 py-1 rounded text-xs font-medium ${getPlatformColor(post.platform)}`}>
                          {post.platform}
                        </div>
                        <div className="text-sm text-gray-500 flex items-center">
                          <CalendarDays className="h-4 w-4 mr-1" />
                          {formatScheduledTime(post.scheduledDate)}
                        </div>
                      </div>
                      <div className="mt-3">
                        <p className="text-gray-800">{post.content}</p>
                      </div>
                      {post.image && (
                        <div className="mt-3">
                          <img src={post.image} alt="Post preview" className="h-32 rounded-md object-cover" />
                        </div>
                      )}
                      <div className="mt-4 flex justify-end space-x-2">
                        <Button variant="outline" size="sm">Edit</Button>
                        <Button variant="outline" size="sm" className="text-red-500 hover:text-red-600">Delete</Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <CalendarDays className="mx-auto h-12 w-12 mb-3 opacity-30" />
                  <p>No scheduled posts yet</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Create New Post</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div>
                  <label className="text-sm font-medium block mb-1">Platform</label>
                  <Select value={platform} onValueChange={setPlatform}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select platform" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="instagram">Instagram</SelectItem>
                      <SelectItem value="facebook">Facebook</SelectItem>
                      <SelectItem value="twitter">Twitter</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="text-sm font-medium block mb-1">Content</label>
                  <Textarea placeholder="Write your post content here..." className="min-h-[100px]" />
                </div>
                
                <div>
                  <label className="text-sm font-medium block mb-1">Image (optional)</label>
                  <div className="border border-dashed rounded-md py-8 px-4 text-center">
                    <Plus className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500 mb-2">Upload an image</p>
                    <Button variant="outline" size="sm">Browse Files</Button>
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium block mb-1">Schedule Date & Time</label>
                  <div className="flex space-x-4">
                    <div className="flex-1">
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !date && "text-muted-foreground"
                            )}
                          >
                            <CalendarDays className="mr-2 h-4 w-4" />
                            {date ? format(date, "PPP") : <span>Pick a date</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div className="flex-1">
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select time">
                            <Clock className="mr-2 h-4 w-4" />
                            <span>Time</span>
                          </SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="9am">9:00 AM</SelectItem>
                          <SelectItem value="12pm">12:00 PM</SelectItem>
                          <SelectItem value="3pm">3:00 PM</SelectItem>
                          <SelectItem value="6pm">6:00 PM</SelectItem>
                          <SelectItem value="9pm">9:00 PM</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium block mb-1">Best Time Recommendation</label>
                  <div className="bg-blue-50 p-3 rounded-md">
                    <p className="text-sm text-blue-700">
                      AI suggests posting at <strong>6:00 PM</strong> on <strong>Wednesday</strong> for maximum engagement based on your audience.
                    </p>
                  </div>
                </div>
                
                <Button className="w-full">
                  <Send className="mr-2 h-4 w-4" />
                  Schedule Post
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Schedule;
