export default function Contact() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 my-8">
        <h1 className="text-4xl font-bold text-white mb-6">Contact Us</h1>
        <div className="text-gray-300 space-y-6">
          <p>
            Have questions about MatchInvoices.com? We'd love to hear from you.
          </p>
          
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
            <h2 className="text-xl font-bold text-white mb-4">Get in Touch</h2>
            <p className="mb-4">Email: contact@matchinvoices.com</p>
            <p className="mb-4">
              For technical support, feature requests, or general inquiries, please email us 
              and we'll get back to you within 24-48 hours.
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
            <h2 className="text-xl font-bold text-white mb-4">Report an Issue</h2>
            <p>
              Found a bug or have a suggestion? We're constantly improving MatchInvoices.com 
              and appreciate your feedback.
            </p>
          </div>
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
