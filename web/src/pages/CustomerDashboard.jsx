import { useState } from 'react';

const metrics = [
  { label: 'Total Available Balance', value: '₹14,50,000', trend: '+2.4% from last month', icon: 'trending_up', color: 'text-surface-tint' },
];

const products = [
  { name: 'Current Account', icon: 'account_balance', status: 'Active', active: true },
  { name: 'Corporate Card', icon: 'credit_card', status: 'Active', active: true },
  { name: 'Overdraft', icon: 'payments', status: 'Pending', active: false },
];

const transactions = [
  { date: 'Jul 02, 2026', desc: 'Supplier Payment - TechCorp', status: 'Completed', amount: '- ₹45,000', positive: false },
  { date: 'Jul 01, 2026', desc: 'Inward Remittance - Client A', status: 'Completed', amount: '+ ₹1,20,000', positive: true },
  { date: 'Jun 30, 2026', desc: 'Monthly Server Hosting', status: 'Processing', amount: '- ₹8,500', positive: false },
  { date: 'Jun 28, 2026', desc: 'GST Payment - Q1', status: 'Completed', amount: '- ₹32,000', positive: false },
  { date: 'Jun 25, 2026', desc: 'Client Payment - Sharma Enterprises', status: 'Completed', amount: '+ ₹2,50,000', positive: true },
];

const recommendations = [
  { title: 'Business Term Loan', desc: 'Expand your operations with rates starting at 8.5% p.a. Pre-approved up to ₹50L.', icon: 'real_estate_agent', cta: 'Apply Now', iconBg: 'bg-primary-fixed', iconColor: 'text-primary', ctaStyle: 'border-primary text-primary hover:bg-primary-fixed' },
  { title: 'Trade Finance', desc: 'Secure your supply chain with our letter of credit and bank guarantee services.', icon: 'local_shipping', cta: 'Learn More', iconBg: 'bg-secondary-container', iconColor: 'text-on-secondary-container', ctaStyle: 'border-outline text-secondary hover:bg-surface-variant' },
];

export default function CustomerDashboard() {
  const [tier] = useState('full'); // 'full' | 'limited' | 'blocked'

  return (
    <div className="max-w-[1440px] mx-auto w-full space-y-8">
      {/* Greeting & Banner */}
      <section>
        <h2 className="text-2xl md:text-3xl font-semibold text-on-background mb-2">Welcome back, Sharma Traders</h2>
        {tier === 'full' && (
          <div className="bg-primary-container text-on-primary-container p-4 rounded-lg flex items-center gap-3 card-shadow">
            <span className="material-symbols-outlined">verified_user</span>
            <p className="text-sm">Your account is fully verified and operating optimally.</p>
          </div>
        )}
        {tier === 'limited' && (
          <div className="bg-warning-bg text-warning p-4 rounded-lg flex items-center gap-3 card-shadow">
            <span className="material-symbols-outlined">warning</span>
            <p className="text-sm">⚠️ Verification pending. GST portal is busy. We'll upgrade you within 24hrs.</p>
          </div>
        )}
        {tier === 'blocked' && (
          <div className="bg-error-container text-on-error-container p-4 rounded-lg flex items-center gap-3 card-shadow">
            <span className="material-symbols-outlined">block</span>
            <p className="text-sm">🚫 Account under review. RM will call in 1 hour.</p>
          </div>
        )}
      </section>

      {/* Metrics Row */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Balance */}
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 card-shadow card-hover">
          <p className="text-sm text-secondary mb-2">Total Available Balance</p>
          <h3 className="text-4xl font-bold text-primary tracking-tight">₹14,50,000</h3>
          <p className="text-xs font-medium text-surface-tint mt-2 flex items-center gap-1">
            <span className="material-symbols-outlined text-base">trending_up</span> +2.4% from last month
          </p>
        </div>
        {/* Fitness Score */}
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 card-shadow card-hover flex flex-col justify-between">
          <p className="text-sm text-secondary mb-4">Financial Fitness Score</p>
          <div className="flex items-end justify-between">
            <div>
              <span className="text-3xl font-semibold text-on-background">840</span>
              <span className="text-secondary text-sm">/900</span>
            </div>
            <div className="w-16 h-16 rounded-full border-4 border-surface-container flex items-center justify-center relative">
              <div className="absolute inset-0 rounded-full border-4 border-primary" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 80%, 0 80%)' }}></div>
              <span className="text-xs font-bold text-primary">Excellent</span>
            </div>
          </div>
        </div>
        {/* Active Products */}
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 card-shadow card-hover">
          <p className="text-sm text-secondary mb-4">Active Products</p>
          <ul className="space-y-3">
            {products.map((p) => (
              <li key={p.name} className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-surface-tint text-xl">{p.icon}</span>
                  {p.name}
                </span>
                <span className={p.active ? 'text-on-background font-medium' : 'text-secondary'}>{p.status}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Recommendations */}
      <section>
        <h3 className="text-xl font-semibold text-on-background mb-4">Recommended for You</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {recommendations.map((r) => (
            <div key={r.title} className="bg-surface-container-low rounded-xl p-6 border border-outline-variant card-shadow flex gap-4 items-start">
              <div className={`w-12 h-12 ${r.iconBg} rounded-lg flex items-center justify-center shrink-0`}>
                <span className={`material-symbols-outlined ${r.iconColor} text-3xl`}>{r.icon}</span>
              </div>
              <div className="flex-1">
                <h4 className="text-xl font-semibold text-on-background mb-1">{r.title}</h4>
                <p className="text-sm text-secondary mb-4">{r.desc}</p>
                <button className={`px-6 py-2 bg-surface-container-lowest border ${r.ctaStyle} rounded-lg text-xs font-semibold transition-colors`}>{r.cta}</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Recent Transactions */}
      <section>
        <h3 className="text-xl font-semibold text-on-background mb-4">Recent Transactions</h3>
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden card-shadow">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-container text-secondary text-xs font-medium uppercase tracking-wider border-b border-outline-variant">
                  <th className="p-4">Date</th>
                  <th className="p-4">Description</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="text-sm text-on-background divide-y divide-outline-variant">
                {transactions.map((t, i) => (
                  <tr key={i} className="hover:bg-surface-container-low transition-colors">
                    <td className="p-4">{t.date}</td>
                    <td className="p-4">{t.desc}</td>
                    <td className="p-4">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${t.status === 'Completed' ? 'bg-success-bg text-success' : 'bg-warning-bg text-warning'}`}>
                        {t.status}
                      </span>
                    </td>
                    <td className={`p-4 text-right font-medium ${t.positive ? 'text-success' : ''}`}>{t.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAB */}
      <button
        aria-label="Ask YONO Ji"
        className="fixed bottom-8 right-8 bg-primary text-on-primary w-14 h-14 rounded-full shadow-lg flex items-center justify-center hover:bg-surface-tint transition-colors z-50 card-hover group"
      >
        <span className="material-symbols-outlined text-3xl">smart_toy</span>
        <span className="absolute right-16 bg-inverse-surface text-inverse-on-surface px-3 py-1 rounded-md text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          Ask YONO Ji
        </span>
      </button>
    </div>
  );
}
