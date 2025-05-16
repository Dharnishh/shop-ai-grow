
import React from "react";
import PageLayout from "@/components/PageLayout";
import { Avatar } from "@/components/ui/avatar";

interface TeamMemberProps {
  name: string;
  role: string;
  image: string;
  bio: string;
  quote?: string;
}

const TeamMember: React.FC<TeamMemberProps> = ({ name, role, image, bio, quote }) => {
  return (
    <div className="flex flex-col items-center text-center p-6 bg-white rounded-2xl shadow-md">
      <Avatar className="w-32 h-32 mb-4 border-4 border-white shadow-lg">
        <img src={image} alt={name} className="object-cover" />
      </Avatar>
      <h3 className="text-xl font-semibold mb-1 text-[#222222]">{name}</h3>
      <p className="text-accent-purple font-medium mb-3">{role}</p>
      <p className="text-[#555555] mb-4">{bio}</p>
      {quote && (
        <div className="mt-4 p-4 bg-soft-purple rounded-lg italic">
          <p className="text-[#555555]">"{quote}"</p>
        </div>
      )}
    </div>
  );
};

const About: React.FC = () => {
  const founder = {
    name: "Dinesh Penjuru",
    role: "Founder & Visionary",
    image: "/lovable-uploads/dinesh.png",
    bio: "With a passion for empowering local businesses through technology, Dinesh founded this initiative to bridge the digital divide for small-scale shops. His vision is rooted in innovation, inclusivity, and impact.",
    quote: "I believe the smallest stores can have the loudest digital voice. We're here to make that happen."
  };

  const developer = {
    name: "Rishi Kesava",
    role: "Frontend & Backend Developer",
    image: "/lovable-uploads/rishith.png",
    bio: "Rishi transforms bold ideas into seamless digital experiences. From crafting intuitive user interfaces to architecting rock-solid backend systems, he brings our vision to life — one line of code at a time.",
    quote: "Good design is invisible, but powerful code makes it shine. That's where I come in."
  };

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
          <h2 className="text-3xl font-bold mb-6">The Team Behind ShopBoost AI</h2>
          <p className="text-lg max-w-3xl mx-auto mb-12">
            Together, we're not just building a platform — we're building a movement. Welcome to a smarter, 
            AI-powered future for local shops. 🚀
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="animate-fade-in" style={{ animationDelay: "0.3s" }}>
              <TeamMember 
                name={founder.name} 
                role={founder.role}
                image={founder.image}
                bio={founder.bio}
                quote={founder.quote}
              />
            </div>
            <div className="animate-fade-in" style={{ animationDelay: "0.4s" }}>
              <TeamMember 
                name={developer.name} 
                role={developer.role}
                image={developer.image}
                bio={developer.bio}
                quote={developer.quote}
              />
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default About;
