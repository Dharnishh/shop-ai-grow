import React, { ReactNode } from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";

interface PageLayoutProps {
  children: ReactNode;
  withPadding?: boolean;
}

const PageLayout: React.FC<PageLayoutProps> = ({ children, withPadding = true }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className={`flex-grow ${withPadding ? "pt-20 px-6 md:px-10" : "pt-16"}`}>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default PageLayout;