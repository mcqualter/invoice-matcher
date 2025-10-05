export default function Terms() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 my-8">
        <h1 className="text-4xl font-bold text-white mb-6">Terms of Service</h1>
        <div className="text-gray-300 space-y-6">
          <p className="text-sm"><strong>Last Updated:</strong> January 6, 2025</p>
          
          <section>
            <h2 className="text-2xl font-bold text-white mb-3">1. Acceptance of Terms</h2>
            <p>
              By accessing and using MatchInvoices.com, you accept and agree to be bound by the 
              terms and provisions of this agreement.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-3">2. Use License</h2>
            <p className="mb-3">
              Permission is granted to use MatchInvoices.com for personal and commercial purposes 
              related to invoice payment matching. This license shall automatically terminate if you 
              violate any of these restrictions.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-3">3. Disclaimer</h2>
            <p className="mb-3">
              The materials on MatchInvoices.com are provided on an 'as is' basis. We make no 
              warranties, expressed or implied, and hereby disclaim all other warranties including, 
              without limitation, implied warranties or conditions of merchantability, fitness for 
              a particular purpose, or non-infringement of intellectual property.
            </p>
            <p className="mb-3">
              <strong className="text-white">Financial Accuracy:</strong> While we strive for accuracy, 
              MatchInvoices.com is a tool to assist with invoice matching calculations. We are not 
              responsible for any financial decisions made based on the results provided by our tool. 
              Always verify calculations independently.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-3">4. Limitations</h2>
            <p>
              In no event shall MatchInvoices.com or its suppliers be liable for any damages 
              (including, without limitation, damages for loss of data or profit, or due to business 
              interruption) arising out of the use or inability to use our service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-3">5. Accuracy of Materials</h2>
            <p>
              The materials appearing on MatchInvoices.com could include technical, typographical, 
              or photographic errors. We do not warrant that any of the materials on our website are 
              accurate, complete, or current.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-3">6. Links to Third-Party Sites</h2>
            <p>
              MatchInvoices.com may contain affiliate links to third-party websites. We are not 
              responsible for the content, accuracy, or practices of these external sites. Your use 
              of third-party websites is at your own risk.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-3">7. User Conduct</h2>
            <p className="mb-3">You agree not to:</p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Use the service for any unlawful purpose</li>
              <li>Attempt to gain unauthorized access to our systems</li>
              <li>Interfere with or disrupt the service</li>
              <li>Reproduce, duplicate, or copy material from MatchInvoices.com without permission</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-3">8. Modifications</h2>
            <p>
              We may revise these Terms of Service at any time without notice. By using this website, 
              you agree to be bound by the current version of these terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-3">9. Governing Law</h2>
            <p>
              These terms and conditions are governed by and construed in accordance with the laws 
              of the United States, and you irrevocably submit to the exclusive jurisdiction of the 
              courts in that location.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-3">10. Contact Information</h2>
            <p>
              If you have any questions about these Terms of Service, please contact us at 
              contact@matchinvoices.com
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
