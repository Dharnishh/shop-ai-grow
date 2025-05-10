
import React from "react";
import PageLayout from "@/components/PageLayout";

const PrivacyPolicy: React.FC = () => {
  return (
    <PageLayout>
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6">
        <h1 className="text-3xl font-bold mb-8 animate-fade-in">Privacy Policy</h1>
        
        <div className="prose prose-lg max-w-none">
          <section className="mb-8 animate-fade-in">
            <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
            <p>
              At ShopBoost AI, we respect your privacy and are committed to protecting your personal data. 
              This Privacy Policy explains how we collect, use, and safeguard your information when you 
              use our service.
            </p>
          </section>

          <section className="mb-8 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <h2 className="text-2xl font-semibold mb-4">2. Information We Collect</h2>
            <p className="mb-4">
              We collect information that you provide directly to us, such as when you create an account, 
              subscribe to our service, contact customer support, or interact with our social media accounts.
            </p>
            <p className="mb-2">This information may include:</p>
            <ul className="list-disc ml-6 mb-4">
              <li>Name, email address, phone number, and other contact information</li>
              <li>Account login credentials</li>
              <li>Billing information and transaction history</li>
              <li>Social media account information that you authorize us to access</li>
              <li>Preferences and settings</li>
              <li>Communications with us</li>
            </ul>
            <p>
              We also collect information automatically when you use our service, including log data, 
              device information, location information, and cookies.
            </p>
          </section>

          <section className="mb-8 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <h2 className="text-2xl font-semibold mb-4">3. How We Use Your Information</h2>
            <p className="mb-2">We use the information we collect to:</p>
            <ul className="list-disc ml-6 mb-4">
              <li>Provide, maintain, and improve our services</li>
              <li>Process transactions and send related information</li>
              <li>Send administrative messages, updates, and security alerts</li>
              <li>Respond to your comments, questions, and requests</li>
              <li>Provide customer service</li>
              <li>Monitor and analyze trends, usage, and activities in connection with our service</li>
              <li>Detect, investigate, and prevent fraudulent transactions and other illegal activities</li>
              <li>Personalize and improve your experience</li>
            </ul>
          </section>

          <section className="mb-8 animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <h2 className="text-2xl font-semibold mb-4">4. Data Sharing and Disclosure</h2>
            <p className="mb-4">
              We do not sell, trade, or otherwise transfer your personal information to outside parties 
              except in the following circumstances:
            </p>
            <ul className="list-disc ml-6 mb-4">
              <li>With vendors, consultants, and other service providers who need access to such information to carry out work on our behalf</li>
              <li>In response to a request for information if we believe disclosure is in accordance with applicable law, regulation, or legal process</li>
              <li>If we believe your actions are inconsistent with our user agreements or policies, or to protect the rights, property, and safety of ShopBoost AI or others</li>
              <li>In connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business by another company</li>
              <li>With your consent or at your direction</li>
            </ul>
          </section>

          <section className="mb-8 animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <h2 className="text-2xl font-semibold mb-4">5. Data Security</h2>
            <p>
              We take reasonable measures to help protect your personal information from loss, theft, 
              misuse, unauthorized access, disclosure, alteration, and destruction. However, no Internet 
              or email transmission is ever fully secure or error-free.
            </p>
          </section>

          <section className="mb-8 animate-fade-in" style={{ animationDelay: "0.5s" }}>
            <h2 className="text-2xl font-semibold mb-4">6. Your Rights and Choices</h2>
            <p className="mb-4">
              You have certain rights regarding your personal information. You can access, update, or 
              delete your information by contacting us or using the account settings in our service.
            </p>
            <p>
              You can also opt out of receiving promotional communications from us by following the 
              instructions in those communications.
            </p>
          </section>

          <section className="mb-8 animate-fade-in" style={{ animationDelay: "0.6s" }}>
            <h2 className="text-2xl font-semibold mb-4">7. International Data Transfers</h2>
            <p>
              We may transfer, process, and store your personal information on servers located outside 
              of your country, where data protection laws may differ. By using our service, you consent 
              to such transfer.
            </p>
          </section>

          <section className="mb-8 animate-fade-in" style={{ animationDelay: "0.7s" }}>
            <h2 className="text-2xl font-semibold mb-4">8. Changes to This Privacy Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any changes by 
              posting the new Privacy Policy on this page and updating the "Last Updated" date.
            </p>
          </section>

          <section className="animate-fade-in" style={{ animationDelay: "0.8s" }}>
            <h2 className="text-2xl font-semibold mb-4">9. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at privacy@shopboost.ai
            </p>
          </section>
        </div>
      </div>
    </PageLayout>
  );
};

export default PrivacyPolicy;
