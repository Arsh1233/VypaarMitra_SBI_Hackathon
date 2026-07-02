const transactions = [
  { date: 'Jul 02, 2026', ref: 'TXN-2026-00142', desc: 'Supplier Payment - TechCorp', type: 'Debit', method: 'NEFT', status: 'Completed', amount: '- ₹45,000' },
  { date: 'Jul 01, 2026', ref: 'TXN-2026-00141', desc: 'Inward Remittance - Client A', type: 'Credit', method: 'RTGS', status: 'Completed', amount: '+ ₹1,20,000' },
  { date: 'Jun 30, 2026', ref: 'TXN-2026-00140', desc: 'Monthly Server Hosting - AWS', type: 'Debit', method: 'Auto-Pay', status: 'Processing', amount: '- ₹8,500' },
  { date: 'Jun 28, 2026', ref: 'TXN-2026-00139', desc: 'GST Payment - Q1 FY27', type: 'Debit', method: 'NEFT', status: 'Completed', amount: '- ₹32,000' },
  { date: 'Jun 25, 2026', ref: 'TXN-2026-00138', desc: 'Client Payment - Sharma Enterprises', type: 'Credit', method: 'IMPS', status: 'Completed', amount: '+ ₹2,50,000' },
  { date: 'Jun 22, 2026', ref: 'TXN-2026-00137', desc: 'Office Rent - June 2026', type: 'Debit', method: 'NACH', status: 'Completed', amount: '- ₹75,000' },
  { date: 'Jun 20, 2026', ref: 'TXN-2026-00136', desc: 'Salary Disbursement', type: 'Debit', method: 'Batch', status: 'Completed', amount: '- ₹3,40,000' },
  { date: 'Jun 18, 2026', ref: 'TXN-2026-00135', desc: 'Revenue - Retail Sales', type: 'Credit', method: 'UPI', status: 'Completed', amount: '+ ₹88,500' },
];

export default function Transactions() {
  return (
    <div className="max-w-[1440px] mx-auto w-full">
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-semibold text-on-background tracking-tight">Transaction Ledger</h2>
          <p className="text-secondary mt-1 text-sm">Complete transaction history for your business account.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-surface border border-outline-variant rounded-lg text-primary hover:bg-surface-container-low transition-colors font-medium text-sm">
            <span className="material-symbols-outlined text-sm">download</span> Export
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 card-shadow">
          <p className="text-xs text-secondary uppercase tracking-wider mb-1">Total Inflow (This Month)</p>
          <h3 className="text-2xl font-bold text-success">+ ₹4,58,500</h3>
        </div>
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 card-shadow">
          <p className="text-xs text-secondary uppercase tracking-wider mb-1">Total Outflow (This Month)</p>
          <h3 className="text-2xl font-bold text-error">- ₹5,00,500</h3>
        </div>
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 card-shadow">
          <p className="text-xs text-secondary uppercase tracking-wider mb-1">Net Cash Flow</p>
          <h3 className="text-2xl font-bold text-on-background">- ₹42,000</h3>
        </div>
      </div>

      {/* Table */}
      <div className="bg-surface-container-lowest border border-outline-variant rounded-xl shadow-[0_2px_4px_rgba(0,0,0,0.02)] overflow-hidden">
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse whitespace-nowrap">
            <thead>
              <tr className="bg-surface-container-low border-b border-outline-variant text-secondary text-xs font-medium uppercase tracking-wider">
                <th className="py-4 px-6">Date</th>
                <th className="py-4 px-6">Reference</th>
                <th className="py-4 px-6">Description</th>
                <th className="py-4 px-6">Type</th>
                <th className="py-4 px-6">Method</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6 text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant text-sm">
              {transactions.map((t, i) => (
                <tr key={i} className="hover:bg-surface-container-low/50 transition-colors">
                  <td className="py-4 px-6 text-secondary">{t.date}</td>
                  <td className="py-4 px-6 font-mono text-xs text-on-surface-variant">{t.ref}</td>
                  <td className="py-4 px-6 text-on-background font-medium">{t.desc}</td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${t.type === 'Credit' ? 'bg-success-bg text-success' : 'bg-surface-variant text-on-surface-variant'}`}>{t.type}</span>
                  </td>
                  <td className="py-4 px-6 text-secondary">{t.method}</td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${t.status === 'Completed' ? 'bg-success-bg text-success' : 'bg-warning-bg text-warning'}`}>{t.status}</span>
                  </td>
                  <td className={`py-4 px-6 text-right font-medium ${t.type === 'Credit' ? 'text-success' : ''}`}>{t.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
