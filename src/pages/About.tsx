
import React from "react";
import PageLayout from "@/components/PageLayout";
import { Avatar } from "@/components/ui/avatar";

interface TeamMemberProps {
  name: string;
  role: string;
  image: string;
  bio: string;
}

const TeamMember: React.FC<TeamMemberProps> = ({ name, role, image, bio }) => {
  return (
    <div className="flex flex-col items-center text-center p-6">
      <Avatar className="w-32 h-32 mb-4 border-4 border-white shadow-lg">
        <img src={image} alt={name} className="object-cover" />
      </Avatar>
      <h3 className="text-xl font-semibold mb-1">{name}</h3>
      <p className="text-accent-purple font-medium mb-3">{role}</p>
      <p className="text-gray-600">{bio}</p>
    </div>
  );
};

const About: React.FC = () => {
  const teamMembers = [
    {
      name: "Sarah Johnson",
      role: "Founder & CEO",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
      bio: "Sarah has 10+ years of experience in digital marketing and AI development. She founded ShopBoost AI to help small businesses thrive in the digital space."
    },
    {
      name: "Michael Chen",
      role: "CTO",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
      bio: "Michael leads our engineering team, bringing expertise in AI and machine learning to develop powerful yet intuitive tools for our users."
    },
    {
      name: "Priya Sharma",
      role: "Head of Marketing",
      image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
      bio: "Priya's innovative marketing strategies have helped thousands of businesses improve their social media presence using ShopBoost AI."
    },
    {
      name: "David Wilson",
      role: "Head of Product",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
      bio: "David ensures our product meets the highest standards of usability and effectiveness for businesses of all sizes."
    }
  ];

  return (
    <PageLayout>
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-4xl font-bold mb-4">About ShopBoost AI</h1>
          <p className="text-xl max-w-3xl mx-auto">
            We're on a mission to empower local shops and small businesses with AI-powered tools 
            to grow their social media presence and increase sales.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-12 mb-20">
          <div className="bg-white rounded-2xl shadow p-8 animate-fade-in">
            <h2 className="text-2xl font-semibold mb-4">Our Vision</h2>
            <p className="mb-6">
              At ShopBoost AI, we envision a world where local businesses can compete effectively in the digital 
              marketplace, leveraging the same powerful AI tools that were once only available to large corporations.
            </p>
            <p>
              We believe that by democratizing access to cutting-edge social media marketing tools, we can help 
              preserve the unique character of local businesses while enabling them to thrive in the digital age.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow p-8 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
            <p className="mb-6">
              Our mission is to provide affordable, easy-to-use, and powerful AI-powered tools that help small 
              businesses create engaging social media content, save time, increase their online visibility, 
              and ultimately grow their customer base and revenue.
            </p>
            <p>
              We're committed to continuous innovation, exceptional customer support, and building long-term 
              relationships with the businesses we serve.
            </p>
          </div>
        </div>

        <div className="mb-16 text-center animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <h2 className="text-3xl font-bold mb-2">Meet Our Team</h2>
          <p className="text-lg max-w-2xl mx-auto mb-12">
            The passionate experts behind ShopBoost AI working to help your business succeed.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="animate-fade-in" style={{ animationDelay: `${0.3 + index * 0.1}s` }}>
                <TeamMember 
                  name={member.name} 
                  role={member.role}
                  image={member.image}
                  bio={member.bio}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default About;
