export default function Privacy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 my-8">
        <h1 className="text-4xl font-bold text-white mb-6">Privacy Policy</h1>
        <div className="text-gray-300 space-y-6">
          <p className="text-sm"><strong>Last Updated:</strong> January 6, 2025</p>
          
          <section>
            <h2 className="text-2xl font-bold text-white mb-3">1. Introduction</h2>
            <p>
              MatchInvoices.com ("we," "us," or "our") operates the website https://matchinvoices.com. 
              This Privacy Policy explains how we collect, use, disclose, and safeguard your information 
              when you visit our website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-3">2. Information We Collect</h2>
            <p className="mb-3"><strong className="text-white">Information You Provide:</strong></p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Invoice amounts and payment data entered into our calculator tool</li>
              <li>This data is processed locally in your browser and is NOT stored on our servers</li>
              <li>We do not collect, store, or have access to your financial information</li>
            </ul>
            <p className="mt-3 mb-3"><strong className="text-white">Automatically Collected Information:</strong></p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>IP address</li>
              <li>Browser type and version</li>
              <li>Pages visited and time spent on pages</li>
              <li>Referring website addresses</li>
              <li>Device information</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-3">3. How We Use Your Information</h2>
            <p className="mb-3">We use the information we collect to:</p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Provide and maintain our invoice matching service</li>
              <li>Improve and optimize our website</li>
              <li>Analyze usage patterns and trends</li>
              <li>Display relevant advertisements</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-3">4. Cookies and Tracking Technologies</h2>
            <p className="mb-3"><strong className="text-white">Google Analytics:</strong></p>
            <p className="mb-3">
              We use Google Analytics to understand how visitors interact with our site. Google Analytics 
              collects information anonymously and reports website trends without identifying individual visitors. 
              You can opt out of Google Analytics by installing the Google Analytics Opt-out Browser Add-on.
            </p>
            <p className="mb-3"><strong className="text-white">Google AdSense:</strong></p>
            <p>
              We use Google AdSense to display advertisements on our site. Google and its partners use cookies 
              to serve ads based on your prior visits to our website or other websites. You may opt out of 
              personalized advertising by visiting Google's Ads Settings at https://www.google.com/settings/ads.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-3">5. Third-Party Services</h2>
            <p className="mb-3"><strong className="text-white">Affiliate Links:</strong></p>
            <p className="mb-3">
              Our website contains affiliate links to third-party accounting software providers (QuickBooks, 
              Xero, FreshBooks). When you click these links, the third party may collect information about 
              your visit. We receive a commission if you make a purchase through these links.
            </p>
            <p>
              We are not responsible for the privacy practices of third-party websites. We encourage you to 
              review their privacy policies.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-3">6. Data Security</h2>
            <p>
              Your invoice data is processed entirely in your browser using JavaScript. We do not transmit, 
              store, or have access to any invoice amounts or payment information you enter into our tool. 
              All calculations are performed locally on your device.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-3">7. Your Privacy Rights</h2>
            <p className="mb-3">Depending on your location, you may have the following rights:</p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Access the personal information we hold about you</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Opt out of marketing communications</li>
              <li>Disable cookies through your browser settings</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-3">8. Children's Privacy</h2>
            <p>
              Our service is not directed to individuals under the age of 18. We do not knowingly collect 
              personal information from children under 18.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-3">9. International Users</h2>
            <p>
              If you are visiting from outside the United States, please be aware that your information may 
              be transferred to, stored, and processed in the United States where our servers are located.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-3">10. Changes to This Privacy Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any changes by 
              posting the new Privacy Policy on this page and updating the "Last Updated" date.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-3">11. Contact Us</h2>
            <p className="mb-2">If you have questions about this Privacy Policy, please contact us at:</p>
            <ul className="list-disc list-inside ml-4">
              <li>Email: contact@matchinvoices.com</li>
              <li>Website: https://matchinvoices.com</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-3">12. Consent</h2>
            <p>
              By using our website, you consent to our Privacy Policy and agree to its terms.
            </p>
          </section>
        </div>
        
        <div className="mt-8">
          <a href="/" className="inline-block px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-xl hover:opacity-90 transition">
            ← Back to Home
          </a>
        </div>
      </div>
    </div>
  );
}
