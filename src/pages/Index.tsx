
import React from "react";
import PageLayout from "@/components/PageLayout";
import Hero from "@/components/Hero";
import FeatureSection from "@/components/FeatureSection";
import AboutSection from "@/components/AboutSection";
import UseCase from "@/components/UseCase";
import TechSection from "@/components/TechSection";

const Index: React.FC = () => {
  return (
    <PageLayout withPadding={false}>
      <Hero />
      <div className="px-6 md:px-10">
        <FeatureSection />
        <UseCase />
        <AboutSection />
        <TechSection />
      </div>
    </PageLayout>
  );
};

export default Index;
