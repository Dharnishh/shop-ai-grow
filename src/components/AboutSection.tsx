
import React from "react";

const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-soft-blue bg-opacity-30 rounded-3xl my-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">About ShopBoost AI</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We're on a mission to help local shops thrive in the digital world by providing them with powerful, yet easy-to-use tools.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
          <div className="flex flex-col justify-center animate-fade-in">
            <h3 className="text-2xl font-semibold mb-4">Our Story</h3>
            <p className="text-gray-600 mb-6">
              ShopBoost AI was founded with a simple mission: to level the playing field for local businesses. 
              We noticed that while big brands had access to sophisticated marketing tools and teams, 
              local shops were struggling to maintain an effective online presence.
            </p>
            <p className="text-gray-600">
              That's why we created an all-in-one platform that makes social media management and 
              digital marketing accessible, affordable, and effective for local businesses of all sizes.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div className="flex flex-col items-center animate-fade-in" style={{animationDelay: '200ms'}}>
              <div className="w-40 h-40 rounded-full overflow-hidden mb-4 border-4 border-white shadow-lg">
                <img 
                  src="/lovable-uploads/dinesh.png" 
                  alt="Founder" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h4 className="text-lg font-semibold mb-1">Dinesh Penjuru</h4>
              <p className="text-gray-600 text-sm text-center">Founder & Visionary</p>
            </div>
            
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
