import { useState } from 'react';
import { Calculator, TrendingUp, CheckCircle, AlertCircle, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

export default function InvoicePaymentMatcher() {
  const [invoicesText, setInvoicesText] = useState('');
  const [paymentAmount, setPaymentAmount] = useState('');
  const [results, setResults] = useState(null);
  const [showHelp, setShowHelp] = useState(false);

  const findMatchingInvoices = (invoices, target, tolerance = 0.01) => {
    const matches = [];
    const n = invoices.length;

    for (let i = 1; i < (1 << n); i++) {
      let sum = 0;
      const combination = [];
      
      for (let j = 0; j < n; j++) {
        if (i & (1 << j)) {
          sum += invoices[j].amount;
          combination.push(j);
        }
      }
      
      if (Math.abs(sum - target) <= tolerance) {
        matches.push({
          indices: combination,
          total: sum,
          difference: Math.abs(sum - target)
        });
      }
    }

    matches.sort((a, b) => {
      if (a.difference !== b.difference) return a.difference - b.difference;
      return a.indices.length - b.indices.length;
    });

    return matches;
  };

  const allocateOldestFirst = (invoices, payment) => {
    let remaining = payment;
    const allocated = [];
    const unpaid = [];

    invoices.forEach((invoice) => {
      if (remaining <= 0) {
        unpaid.push({ ...invoice, paid: 0, status: 'Unpaid' });
      } else if (remaining >= invoice.amount) {
        allocated.push({ ...invoice, paid: invoice.amount, status: 'Paid in Full' });
        remaining -= invoice.amount;
      } else {
        allocated.push({ 
          ...invoice, 
          paid: remaining, 
          status: 'Partial Payment',
          remaining: invoice.amount - remaining 
        });
        remaining = 0;
      }
    });

    return { allocated: [...allocated, ...unpaid], remaining };
  };

  const calculateMatches = () => {
    const lines = invoicesText
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0);

    const invoices = lines.map((line, index) => {
      const cleaned = line.replace(/[$,]/g, '');
      const amount = parseFloat(cleaned);
      return {
        id: index + 1,
        original: line,
        amount: isNaN(amount) ? 0 : amount
      };
    }).filter(inv => inv.amount > 0);

    const payment = parseFloat(paymentAmount.replace(/[$,]/g, ''));

    if (invoices.length === 0 || isNaN(payment) || payment <= 0) {
      alert('Please enter valid invoice amounts and payment amount');
      return;
    }

    const matches = findMatchingInvoices(invoices, payment);
    const oldestFirst = allocateOldestFirst(invoices, payment);

    setResults({
      invoices,
      payment,
      matches: matches.slice(0, 5).map(match => ({
        ...match,
        invoices: match.indices.map(i => invoices[i])
      })),
      oldestFirst
    });
  };

  const reset = () => {
    setInvoicesText('');
    setPaymentAmount('');
    setResults(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 text-center">
          <div className="text-white/40 font-mono text-sm">728x90 Leaderboard Ad</div>
          <div className="text-xs text-white/30 mt-1">Google AdSense</div>
        </div>

        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <Calculator className="w-4 h-4" />
            Free Tool
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 tracking-tight">
            Invoice Payment
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"> Matcher</span>
          </h1>
          <p className="text-xl text-gray-300 mb-2">Find which invoices match your payment instantly</p>
          <p className="text-sm text-gray-400">No Excel Solver needed • 100% Free</p>
        </div>

        <div className="grid lg:grid-cols-12 gap-6 mb-6">
          <div className="hidden lg:block lg:col-span-2">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-3 text-center sticky top-4">
              <div className="text-white/40 font-mono text-xs mb-2">160x600</div>
              <div className="text-white/40 font-mono text-xs mb-2">Skyscraper</div>
              <div className="h-96"></div>
            </div>
          </div>

          <div className="lg:col-span-8">
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="flex items-center gap-2 text-sm font-bold text-white mb-2">
                    <TrendingUp className="w-4 h-4 text-blue-400" />
                    Outstanding Invoices
                  </label>
                  <p className="text-xs text-gray-400 mb-3">Paste amounts in order (oldest first), one per line</p>
                  <textarea
                    className="w-full h-72 p-4 bg-white/5 backdrop-blur-sm border-2 border-white/10 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm text-white placeholder-white/50 transition-all resize-none"
                    placeholder="Example:&#10;1250.00&#10;750.50&#10;2100.00&#10;450.00&#10;890.25"
                    value={invoicesText}
                    onChange={(e) => setInvoicesText(e.target.value)}
                  />
                </div>

                <div className="flex flex-col space-y-3">
                  <label className="flex items-center gap-2 text-sm font-bold text-white mb-2">
                    <Calculator className="w-4 h-4 text-purple-400" />
                    Payment Received
                  </label>
                  <p className="text-xs text-gray-400 mb-3">Enter the total amount paid by customer</p>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-3xl text-gray-400 font-bold">$</span>
                    <input
                      type="text"
                      className="w-full pl-12 pr-4 py-5 bg-white/5 backdrop-blur-sm border-2 border-white/10 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-3xl font-bold text-white placeholder-white/40 transition-all"
                      placeholder="3000.00"
                      value={paymentAmount}
                      onChange={(e) => setPaymentAmount(e.target.value)}
                    />
                  </div>

                  <div className="mt-auto pt-6 space-y-4">
                    <button
                      onClick={calculateMatches}
                      className="w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white py-5 px-6 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 active:scale-95"
                    >
                      <span className="flex items-center justify-center gap-2">
                        <Calculator className="w-5 h-5" />
                        Find Matches
                      </span>
                    </button>
                    <button
                      onClick={reset}
                      className="w-full py-4 px-6 bg-white/5 backdrop-blur-sm border-2 border-white/10 rounded-2xl hover:bg-white/10 font-semibold text-white transition-all"
                    >
                      Clear All
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="hidden lg:block lg:col-span-2">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-3 text-center sticky top-4">
              <div className="text-white/40 font-mono text-xs mb-2">160x600</div>
              <div className="text-white/40 font-mono text-xs mb-2">Skyscraper</div>
              <div className="h-96"></div>
            </div>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 mb-6 shadow-2xl">
          <button
            onClick={() => setShowHelp(!showHelp)}
            className="w-full flex items-center justify-between text-left group"
          >
            <div className="flex items-center gap-3">
              <HelpCircle className="w-7 h-7 text-blue-400" />
              <h3 className="text-2xl font-bold text-white">How Does Invoice Payment Matching Work?</h3>
            </div>
            {showHelp ? (
              <ChevronUp className="w-6 h-6 text-gray-400 group-hover:text-white transition" />
            ) : (
              <ChevronDown className="w-6 h-6 text-gray-400 group-hover:text-white transition" />
            )}
          </button>

          {showHelp && (
            <div className="mt-6 space-y-6 text-gray-300 leading-relaxed">
              <div>
                <h4 className="text-xl font-bold text-white mb-3">What is Invoice Payment Matching?</h4>
                <p className="mb-4">
                  Invoice payment matching is the process of determining which specific invoices a customer has paid when they send a payment that doesn't clearly indicate which invoices it covers. This is a common challenge in accounts receivable management that bookkeepers, accountants, and small business owners face daily.
                </p>
                <p>
                  When customers make payments, they often pay multiple invoices at once, skip certain invoices, or pay random combinations. This makes it difficult to know exactly which invoices have been settled without manual trial and error calculations.
                </p>
              </div>

              <div>
                <h4 className="text-xl font-bold text-white mb-3">Why This Tool Solves a Real Problem</h4>
                <p className="mb-4">
                  Traditional accounting software like QuickBooks, Xero, and FreshBooks require you to manually match payments to invoices. They don't automatically suggest which combination of outstanding invoices equals your received payment. This means you're left doing mental math or using complicated Excel formulas.
                </p>
                <p className="mb-4">
                  <strong className="text-blue-400">Excel's Solver Add-in</strong> can technically do this, but most people don't know it exists, and it requires technical setup each time you use it. Our tool makes this process instant and accessible to everyone, with no technical knowledge required.
                </p>
              </div>

              <div>
                <h4 className="text-xl font-bold text-white mb-3">How Our Invoice Matcher Works</h4>
                <p className="mb-4">
                  Our calculator uses advanced combinatorial algorithms to test every possible combination of your outstanding invoices against the payment amount you received. Here's what happens when you click "Find Matches":
                </p>
                <ul className="list-disc list-inside space-y-2 mb-4 ml-4">
                  <li><strong className="text-white">Exact Match Detection:</strong> The tool finds all combinations of invoices that exactly match (or come very close to) your payment amount</li>
                  <li><strong className="text-white">Best Match Ranking:</strong> Results are sorted by accuracy and fewest invoices, so you see the most likely scenario first</li>
                  <li><strong className="text-white">Multiple Options:</strong> If several combinations match, we show you up to 5 possibilities so you can choose the right one</li>
                  <li><strong className="text-white">Oldest First Fallback:</strong> When no exact match exists, we automatically show how the payment would be allocated using the standard "oldest invoice first" accounting method</li>
                </ul>
              </div>

              <div>
                <h4 className="text-xl font-bold text-white mb-3">Common Use Cases for Payment Matching</h4>
                <p className="mb-3"><strong className="text-white">Scenario 1: Customer Pays Multiple Invoices</strong></p>
                <p className="mb-4">
                  A customer receives invoices for $1,250, $750, $2,100, and $450. They send a payment of $3,350. Which invoices did they pay? Our tool instantly shows you: Invoice #1 ($1,250) + Invoice #2 ($750) + Invoice #3 ($2,100) + Invoice #4 ($450) = $3,350.
                </p>
                
                <p className="mb-3"><strong className="text-white">Scenario 2: Customer Skips Invoices</strong></p>
                <p className="mb-4">
                  A customer has outstanding invoices but decides to pay only certain ones, skipping others (maybe they're disputing one). They send a payment that doesn't equal the total. Our tool helps you identify which specific invoices they intended to pay.
                </p>

                <p className="mb-3"><strong className="text-white">Scenario 3: Partial Payments</strong></p>
                <p className="mb-4">
                  When a payment doesn't match any combination of invoices, our oldest-first allocation shows you how to apply the payment: which invoices get paid in full, which receive partial payment, and what remains outstanding.
                </p>
              </div>

              <div>
                <h4 className="text-xl font-bold text-white mb-3">Benefits of Using This Tool</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                    <h5 className="font-bold text-white mb-2">⚡ Save Time</h5>
                    <p className="text-sm">No more manual calculations or trial and error. Get instant results in seconds.</p>
                  </div>
                  <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                    <h5 className="font-bold text-white mb-2">✓ Improve Accuracy</h5>
                    <p className="text-sm">Eliminate human error in payment allocation and invoice matching.</p>
                  </div>
                  <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                    <h5 className="font-bold text-white mb-2">📊 Better Cash Flow Management</h5>
                    <p className="text-sm">Know exactly which invoices are paid and which remain outstanding.</p>
                  </div>
                  <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                    <h5 className="font-bold text-white mb-2">💼 Professional Results</h5>
                    <p className="text-sm">Present clear, accurate payment allocations to clients and management.</p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-xl font-bold text-white mb-3">Tips for Managing Invoice Payments</h4>
                <ol className="list-decimal list-inside space-y-3 ml-4">
                  <li className="text-white"><strong>Always list invoices oldest first</strong> - This matches standard accounting practice and makes reconciliation easier</li>
                  <li className="text-white"><strong>Include invoice numbers or dates</strong> - When communicating with customers, reference specific invoice numbers to avoid confusion</li>
                  <li className="text-white"><strong>Set clear payment terms</strong> - Specify which invoices should be paid in what order to prevent mismatches</li>
                  <li className="text-white"><strong>Follow up on partial payments</strong> - If a payment doesn't match, contact the customer immediately to clarify their intent</li>
                  <li className="text-white"><strong>Keep detailed records</strong> - Document how you allocated each payment for audit purposes</li>
                </ol>
              </div>

              <div>
                <h4 className="text-xl font-bold text-white mb-3">Frequently Asked Questions</h4>
                
                <div className="space-y-4">
                  <div className="bg-white/5 backdrop-blur-sm rounded-xl p-5 border border-white/10">
                    <h5 className="font-bold text-white mb-2">Can I use this for multiple currencies?</h5>
                    <p className="text-sm">Yes! Just enter the amounts in your currency. The tool works with any currency as long as all amounts are in the same one.</p>
                  </div>

                  <div className="bg-white/5 backdrop-blur-sm rounded-xl p-5 border border-white/10">
                    <h5 className="font-bold text-white mb-2">What if there are many possible combinations?</h5>
                    <p className="text-sm">We show you the top 5 best matches, ranked by accuracy and fewest invoices. The first option is usually the most likely scenario.</p>
                  </div>

                  <div className="bg-white/5 backdrop-blur-sm rounded-xl p-5 border border-white/10">
                    <h5 className="font-bold text-white mb-2">Is my data saved or stored anywhere?</h5>
                    <p className="text-sm">No! All calculations happen in your browser. Nothing is sent to our servers. Your financial data stays completely private.</p>
                  </div>

                  <div className="bg-white/5 backdrop-blur-sm rounded-xl p-5 border border-white/10">
                    <h5 className="font-bold text-white mb-2">How accurate is the matching?</h5>
                    <p className="text-sm">We allow a tolerance of $0.01 to account for rounding differences. Matches within one cent are considered exact.</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm rounded-2xl p-6 border border-blue-400/30">
                <h4 className="text-xl font-bold text-white mb-3">Ready to Try Better Accounting Software?</h4>
                <p className="mb-4">
                  While our free tool is great for quick invoice matching, full-featured accounting software can automate your entire accounts receivable process, including automated payment reminders, aging reports, and integrated banking.
                </p>
                <div className="flex flex-wrap gap-3">
                  <a href="#" className="inline-block px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-xl transition">
                    Try QuickBooks Free
                  </a>
                  <a href="#" className="inline-block px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-xl transition">
                    Try Xero Free
                  </a>
                  <a href="#" className="inline-block px-6 py-3 bg-purple-500 hover:bg-purple-600 text-white font-semibold rounded-xl transition">
                    Try FreshBooks Free
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>

        {results && (
          <div className="space-y-6">
            <div className="lg:hidden bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 text-center">
              <div className="text-white/40 font-mono text-sm">300x250 Medium Rectangle</div>
              <div className="text-xs text-white/30 mt-1">Mobile Ad</div>
            </div>

            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 backdrop-blur-sm border border-blue-400/30 rounded-2xl p-6">
                  <p className="text-sm text-blue-300 mb-2">Payment Amount</p>
                  <p className="text-4xl font-bold text-white">${results.payment.toFixed(2)}</p>
                </div>
                <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 backdrop-blur-sm border border-purple-400/30 rounded-2xl p-6">
                  <p className="text-sm text-purple-300 mb-2">Total Invoices</p>
                  <p className="text-4xl font-bold text-white">
                    ${results.invoices.reduce((sum, inv) => sum + inv.amount, 0).toFixed(2)}
                  </p>
                </div>
              </div>

              {results.matches.length > 0 ? (
                <div className="mb-8">
                  <div className="flex items-center gap-3 mb-6">
                    <CheckCircle className="w-6 h-6 text-green-400" />
                    <h2 className="text-2xl font-bold text-white">Exact Matches Found</h2>
                  </div>
                  
                  <div className="space-y-4">
                    {results.matches.map((match, matchIndex) => (
                      <div key={matchIndex} className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 backdrop-blur-sm border-2 border-green-400/30 rounded-2xl p-6 hover:border-green-400/50 transition-all">
                        <div className="flex justify-between items-center mb-4">
                          <h3 className="font-bold text-white text-lg">
                            {results.matches.length > 1 && `Option ${matchIndex + 1}: `}
                            {match.invoices.length} Invoice{match.invoices.length > 1 ? 's' : ''}
                          </h3>
                          <div className="text-right">
                            <span className="text-3xl font-bold text-green-400">
                              ${match.total.toFixed(2)}
                            </span>
                            {match.difference > 0 && (
                              <span className="block text-xs text-green-300">
                                (±${match.difference.toFixed(2)})
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="grid gap-3">
                          {match.invoices.map((invoice) => (
                            <div key={invoice.id} className="flex justify-between items-center p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-green-400/20">
                              <span className="font-semibold text-white">Invoice #{invoice.id}</span>
                              <span className="font-mono font-bold text-green-400">${invoice.amount.toFixed(2)}</span>
                            </div>
                          ))}
                        </div>
                        {matchIndex === 0 && (
                          <div className="mt-4 p-3 bg-green-400/20 backdrop-blur-sm rounded-xl text-center border border-green-400/30">
                            <span className="text-sm font-bold text-green-300">⭐ Best Match (Fewest Invoices)</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="mb-8 p-6 bg-yellow-500/10 backdrop-blur-sm border-2 border-yellow-400/30 rounded-2xl">
                  <div className="flex items-start gap-4">
                    <AlertCircle className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-bold text-yellow-300 text-lg mb-1">No Exact Match Found</p>
                      <p className="text-yellow-200/80">The payment doesn't match any combination of invoices. See allocation below.</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="border-t-2 border-white/10 pt-8">
                <div className="flex items-center gap-3 mb-6">
                  <TrendingUp className="w-6 h-6 text-blue-400" />
                  <h2 className="text-2xl font-bold text-white">Oldest First Allocation</h2>
                </div>
                <p className="text-sm text-gray-400 mb-6">Payment applied to invoices in order received</p>
                
                <div className="space-y-3">
                  {results.oldestFirst.allocated.map((invoice) => (
                    <div 
                      key={invoice.id} 
                      className={`flex justify-between items-center p-5 rounded-2xl border-2 backdrop-blur-sm ${
                        invoice.status === 'Paid in Full' 
                          ? 'bg-green-500/10 border-green-400/30' 
                          : invoice.status === 'Partial Payment'
                          ? 'bg-blue-500/10 border-blue-400/30'
                          : 'bg-white/5 border-white/10'
                      }`}
                    >
                      <div>
                        <span className="font-bold text-white">Invoice #{invoice.id}</span>
                        <span className={`ml-3 text-sm font-bold ${
                          invoice.status === 'Paid in Full' 
                            ? 'text-green-400' 
                            : invoice.status === 'Partial Payment'
                            ? 'text-blue-400'
                            : 'text-gray-400'
                        }`}>
                          {invoice.status}
                        </span>
                      </div>
                      <div className="text-right">
                        <div className="font-mono font-bold text-white text-lg">${invoice.amount.toFixed(2)}</div>
                        {invoice.status === 'Partial Payment' && (
                          <div className="text-sm text-blue-300">
                            Paid: ${invoice.paid.toFixed(2)} | Due: ${invoice.remaining.toFixed(2)}
                          </div>
                        )}
                        {invoice.status === 'Paid in Full' && (
                          <div className="text-xs text-green-400">✓ Paid ${invoice.paid.toFixed(2)}</div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {results.oldestFirst.remaining > 0 && (
                  <div className="mt-6 p-5 bg-blue-500/20 backdrop-blur-sm border-2 border-blue-400/30 rounded-2xl">
                    <p className="text-blue-200">
                      <span className="font-bold">Credit Balance:</span> ${results.oldestFirst.remaining.toFixed(2)}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        <div className="mt-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 text-center">
          <div className="text-white/40 font-mono text-sm">728x90 Leaderboard Ad</div>
          <div className="text-xs text-white/30 mt-1">Google AdSense</div>
        </div>

        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 mb-6 mt-6 shadow-2xl">
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-blue-400" />
            Need More Powerful Tools?
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            <a href="#" className="group block p-6 bg-white/5 backdrop-blur-sm border-2 border-white/10 rounded-2xl hover:border-blue-400/50 hover:bg-white/10 transition-all transform hover:scale-105">
              <div className="font-bold text-white text-lg mb-2">QuickBooks Online</div>
              <div className="text-sm text-gray-400 mb-4">Full accounting suite for businesses</div>
              <div className="text-sm text-blue-400 font-semibold group-hover:text-blue-300">Try Free →</div>
            </a>
            <a href="#" className="group block p-6 bg-white/5 backdrop-blur-sm border-2 border-white/10 rounded-2xl hover:border-green-400/50 hover:bg-white/10 transition-all transform hover:scale-105">
              <div className="font-bold text-white text-lg mb-2">Xero</div>
              <div className="text-sm text-gray-400 mb-4">Beautiful accounting software</div>
              <div className="text-sm text-green-400 font-semibold group-hover:text-green-300">Try Free →</div>
            </a>
            <a href="#" className="group block p-6 bg-white/5 backdrop-blur-sm border-2 border-white/10 rounded-2xl hover:border-purple-400/50 hover:bg-white/10 transition-all transform hover:scale-105">
              <div className="font-bold text-white text-lg mb-2">FreshBooks</div>
              <div className="text-sm text-gray-400 mb-4">Invoicing made simple</div>
              <div className="text-sm text-purple-400 font-semibold group-hover:text-purple-300">Try Free →</div>
            </a>
          </div>
          <div className="text-xs text-gray-500 text-center mt-6">Affiliate Disclosure: We may earn a commission from these links</div>
        </div>

        <div className="mt-8 text-center text-sm text-gray-400">
          <p className="mb-2">Free invoice matching tool • No registration required</p>
          <p className="text-xs">
            <a href="/privacy" className="text-blue-400 hover:text-blue-300 transition">Privacy Policy</a> • 
            <a href="/terms" className="text-blue-400 hover:text-blue-300 transition ml-2">Terms of Service</a> • 
            <a href="/contact" className="text-blue-400 hover:text-blue-300 transition ml-2">Contact</a>
          </p>
        </div>
      </div>
    </div>
  );
}
