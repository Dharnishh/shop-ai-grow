
import React from "react";
import PageLayout from "@/components/PageLayout";

const TermsOfService: React.FC = () => {
  return (
    <PageLayout>
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6">
        <h1 className="text-3xl font-bold mb-8 animate-fade-in">Terms of Service</h1>
        
        <div className="prose prose-lg max-w-none">
          <section className="mb-8 animate-fade-in">
            <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
            <p>
              These Terms of Service govern your use of ShopBoost AI, accessible from shopboost.ai. 
              By accessing or using our service, you agree to be bound by these Terms. If you disagree 
              with any part of the terms, you may not access the service.
            </p>
          </section>

          <section className="mb-8 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <h2 className="text-2xl font-semibold mb-4">2. Accounts</h2>
            <p className="mb-4">
              When you create an account with us, you must provide accurate, complete, and current 
              information. Failure to do so constitutes a breach of the Terms, which may result in 
              immediate termination of your account on our service.
            </p>
            <p>
              You are responsible for safeguarding the password and for all activities that occur under 
              your account. You must immediately notify us of any unauthorized use of your account or 
              any other breach of security.
            </p>
          </section>

          <section className="mb-8 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <h2 className="text-2xl font-semibold mb-4">3. Service Usage and Limitations</h2>
            <p className="mb-4">
              ShopBoost AI provides tools for social media content creation, scheduling, and analysis. 
              While we strive to ensure high availability and reliability of our service, we cannot 
              guarantee that the service will be available at all times.
            </p>
            <p>
              We reserve the right to refuse service to anyone for any reason at any time. We also 
              reserve the right to modify or terminate the service for any reason, without notice at 
              any time.
            </p>
          </section>

          <section className="mb-8 animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <h2 className="text-2xl font-semibold mb-4">4. Content Ownership and Licensing</h2>
            <p className="mb-4">
              Content created using our service belongs to you. However, you grant us a license to use, 
              reproduce, adapt, publish, translate and distribute your content in any existing or future 
              media to provide and improve our services.
            </p>
            <p>
              You represent and warrant that: (i) the content is yours or you have the right to use it 
              and grant us the rights and license as provided in these Terms, and (ii) that the content 
              does not violate the rights of any third party.
            </p>
          </section>

          <section className="mb-8 animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <h2 className="text-2xl font-semibold mb-4">5. Prohibited Activities</h2>
            <p>
              You may not use ShopBoost AI for any illegal purposes or to violate any laws in your 
              jurisdiction. You may not use the service to distribute malicious content, infringe upon 
              intellectual property rights, harass others, or engage in any activity that could damage, 
              disable, or impair the service.
            </p>
          </section>

          <section className="mb-8 animate-fade-in" style={{ animationDelay: "0.5s" }}>
            <h2 className="text-2xl font-semibold mb-4">6. Payment Terms</h2>
            <p className="mb-4">
              Certain features of ShopBoost AI require payment of fees. You agree to pay all fees 
              associated with your account. Fees are non-refundable except as required by law or as 
              explicitly stated in these Terms.
            </p>
            <p>
              We may modify our fees at any time. We will provide notice of any price changes at least 
              30 days in advance.
            </p>
          </section>

          <section className="mb-8 animate-fade-in" style={{ animationDelay: "0.6s" }}>
            <h2 className="text-2xl font-semibold mb-4">7. Changes to Terms</h2>
            <p>
              We reserve the right to modify these Terms at any time. If a revision is material, we will 
              provide at least 30 days' notice prior to any new terms taking effect. What constitutes a 
              material change will be determined at our sole discretion.
            </p>
          </section>

          <section className="animate-fade-in" style={{ animationDelay: "0.7s" }}>
            <h2 className="text-2xl font-semibold mb-4">8. Contact Us</h2>
            <p>
              If you have any questions about these Terms, please contact us at support@shopboost.ai
            </p>
          </section>
        </div>
      </div>
    </PageLayout>
  );
};

export default TermsOfService;
