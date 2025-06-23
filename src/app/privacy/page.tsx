'use client';

const Privacy = () => {
  return (
    <div className="bg-gray-50 py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-teal-700">Privacy Policy</h1>
          <p className="mt-3 text-lg text-gray-600">
            At <strong>Headliness</strong>, your trust matters. Here's how we handle your data.
          </p>
        </div>

        {/* Content Box */}
        <div className="bg-white shadow-md rounded-lg p-8 space-y-6 text-gray-700 leading-relaxed text-lg">
          <p>
            <strong>Headliness</strong> is committed to protecting your personal information and respecting your privacy.
            This policy outlines how we collect, use, and safeguard your data when you interact with our platform.
          </p>

          <h2 className="text-2xl font-semibold text-teal-600 mt-6">1. Information We Collect</h2>
          <p>
            We may collect personal details such as your name, email address, IP address, browser type,
            and language preference when you access our site or sign up for updates.
          </p>

          <h2 className="text-2xl font-semibold text-teal-600 mt-6">2. How We Use Your Information</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>To provide and personalize the news content in your preferred language.</li>
            <li>To improve user experience and site performance.</li>
            <li>To send newsletters or updates if you opt in.</li>
            <li>To analyze user behavior and engagement trends.</li>
          </ul>

          <h2 className="text-2xl font-semibold text-teal-600 mt-6">3. Third-Party Services</h2>
          <p>
            We may use third-party tools (such as analytics or ad providers) that collect information
            to help us improve the service. These tools adhere to their own privacy policies.
          </p>

          <h2 className="text-2xl font-semibold text-teal-600 mt-6">4. Cookies</h2>
          <p>
            Headliness uses cookies to remember your language preference and browsing activity. 
            You can choose to disable cookies in your browser settings.
          </p>

          <h2 className="text-2xl font-semibold text-teal-600 mt-6">5. Your Rights</h2>
          <p>
            You have the right to access, correct, or delete your personal information. You can contact us
            at <a href="mailto:support@headliness.com" onClick={(e) => e.preventDefault()} className="text-teal-600 underline disabled">support@headliness.com</a> 
            for any data-related queries.
          </p>

          <h2 className="text-2xl font-semibold text-teal-600 mt-6">6. Policy Updates</h2>
          <p>
            This Privacy Policy may be updated periodically. We recommend reviewing it occasionally
            to stay informed of how we protect your information.
          </p>

          <p className="italic text-sm text-gray-500 mt-6">
            Last updated: 23/06/2025
          </p>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
