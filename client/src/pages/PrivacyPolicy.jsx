import React from 'react';
import Title from '../components/Title';

const PrivacyPolicy = () => {
  return (
    <div className="border-t pt-14">
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={'PRIVACY'} text2={'POLICY'} />
      </div>

      <div className="my-10 flex flex-col gap-8 px-10 md:px-0 text-gray-600">
        <section>
          <h3 className="font-semibold text-lg text-gray-800 mb-2">Introduction</h3>
          <p>
            Welcome to FOREVER. Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your personal information when you visit our website or make a purchase.
          </p>
        </section>

        <section>
          <h3 className="font-semibold text-lg text-gray-800 mb-2">Information We Collect</h3>
          <p>
            We collect information you provide directly to us, such as your name, email address, shipping address, and payment information when you place an order.
          </p>
        </section>

        <section>
          <h3 className="font-semibold text-lg text-gray-800 mb-2">How We Use Your Information</h3>
          <p>
            We use your information to process orders, communicate with you about your purchases, and improve our services. We do not sell your personal data to third parties.
          </p>
        </section>

        <section>
          <h3 className="font-semibold text-lg text-gray-800 mb-2">Data Security</h3>
          <p>
            We implement various security measures to maintain the safety of your personal information. Your sensitive data is encrypted and protected using secure technologies.
          </p>
        </section>

        <section>
          <h3 className="font-semibold text-lg text-gray-800 mb-2">Changes to This Policy</h3>
          <p>
            We may update our Privacy Policy from time to time. Any changes will be posted on this page with an updated revision date.
          </p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
