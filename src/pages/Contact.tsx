
import React, { useState } from "react";
import PageLayout from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Mail, Phone, MapPin, MessageSquare } from "lucide-react";

const Contact: React.FC = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message sent!",
        description: "We'll get back to you as soon as possible.",
      });
      setFormData({ name: "", email: "", message: "" });
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <PageLayout>
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Have questions or need help? We're here for you. Fill out the form below
            or use one of our contact methods.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="animate-fade-in">
            <form onSubmit={handleSubmit} className="space-y-8 bg-white p-8 rounded-2xl shadow-md">
              <div className="space-y-4">
                <Label htmlFor="name">Your Name</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="John Doe"
                  className="rounded-lg"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="space-y-4">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  className="rounded-lg"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="space-y-4">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="How can we help you?"
                  className="min-h-[150px] rounded-lg"
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-accent-purple hover:bg-accent-purple-hover rounded-lg button-hover"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </div>
          
          <div className="space-y-8 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <div className="bg-white p-8 rounded-2xl shadow-md">
              <h2 className="text-2xl font-semibold mb-6">Get in Touch</h2>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-soft-blue p-3 rounded-full mr-4">
                    <Mail className="text-blue-600" size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">Email Us</h3>
                    <p className="text-gray-600 mt-1">support@shopboost.ai</p>
                    <p className="text-gray-600">sales@shopboost.ai</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-soft-green p-3 rounded-full mr-4">
                    <Phone className="text-green-600" size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">Call Us</h3>
                    <p className="text-gray-600 mt-1">+1 (555) 123-4567</p>
                    <p className="text-gray-600">Monday-Friday, 9am-6pm EST</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-purple-100 p-3 rounded-full mr-4">
                    <MapPin className="text-purple-600" size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">Visit Us</h3>
                    <p className="text-gray-600 mt-1">123 Innovation Drive</p>
                    <p className="text-gray-600">Tech Park, CA 94103</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-accent-purple bg-opacity-10 p-8 rounded-2xl">
              <div className="flex items-center mb-4">
                <div className="bg-white p-2 rounded-full mr-3">
                  <MessageSquare className="text-accent-purple" size={20} />
                </div>
                <h3 className="text-lg font-semibold">Chat Support</h3>
              </div>
              <p className="text-gray-700 mb-4">
                Need immediate assistance? Our chat support is available during business hours.
              </p>
              <Button 
                variant="outline" 
                className="w-full border-accent-purple text-accent-purple hover:bg-accent-purple hover:text-white rounded-lg button-hover"
              >
                Start Chat
              </Button>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Contact;
