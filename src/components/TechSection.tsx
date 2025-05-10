
import React from "react";

const technologies = [
  { name: "React.js", icon: "/icons/react.svg" },
  { name: "Node.js", icon: "/icons/nodejs.svg" },
  { name: "TensorFlow", icon: "/icons/tensorflow.svg" },
  { name: "Firebase", icon: "/icons/firebase.svg" },
  { name: "MongoDB", icon: "/icons/mongodb.svg" }
];

const TechSection: React.FC = () => {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Built With Modern Technology</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We use the latest technologies to deliver a fast, reliable, and secure experience.
          </p>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-10 md:gap-16">
          {technologies.map((tech, index) => (
            <div 
              key={index} 
              className="flex flex-col items-center animate-fade-in"
              style={{animationDelay: `${index * 100}ms`}}
            >
              <div className="bg-white p-4 rounded-full shadow-md mb-3 w-16 h-16 flex items-center justify-center">
                <img src={tech.icon} alt={tech.name} className="w-10 h-10" />
              </div>
              <p className="text-sm font-medium">{tech.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechSection;
