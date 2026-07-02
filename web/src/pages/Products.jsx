const products = [
  { title: 'SBI Current Account', desc: 'Zero balance requirement, free NEFT/RTGS, dedicated RM support.', icon: 'account_balance', badge: 'Active', badgeColor: 'bg-success-bg text-success', iconBg: 'bg-primary-fixed', iconColor: 'text-primary' },
  { title: 'Business Overdraft', desc: '₹5 Lakh limit at 9.5% p.a. Auto-approved based on your GST turnover.', icon: 'payments', badge: 'Eligible', badgeColor: 'bg-primary-fixed text-primary', iconBg: 'bg-primary-fixed', iconColor: 'text-primary' },
  { title: 'Trade Finance', desc: 'Import/Export financing with competitive rates. Letter of credit services.', icon: 'local_shipping', badge: 'Apply Now', badgeColor: 'bg-tertiary-fixed text-on-tertiary-fixed', iconBg: 'bg-secondary-container', iconColor: 'text-on-secondary-container' },
  { title: 'Business Insurance', desc: 'Protect your business against fire, theft, and liability. Starting ₹999/mo.', icon: 'shield', badge: 'Optional', badgeColor: 'bg-surface-variant text-on-surface-variant', iconBg: 'bg-surface-variant', iconColor: 'text-on-surface-variant' },
  { title: 'POS / Payment Gateway', desc: 'Accept card and UPI payments. Get settled in T+1 with SBI Merchant Services.', icon: 'point_of_sale', badge: 'New', badgeColor: 'bg-tertiary-fixed text-on-tertiary-fixed', iconBg: 'bg-tertiary-fixed', iconColor: 'text-on-tertiary-fixed' },
  { title: 'Fixed Deposit', desc: 'Park surplus funds at 7.1% p.a. Flexible tenures from 7 days to 10 years.', icon: 'savings', badge: 'Available', badgeColor: 'bg-success-bg text-success', iconBg: 'bg-success-bg', iconColor: 'text-success' },
];

export default function Products() {
  return (
    <div className="max-w-[1440px] mx-auto w-full">
      <div className="mb-8">
        <h2 className="text-3xl font-semibold text-on-background tracking-tight">Financial Marketplace</h2>
        <p className="text-secondary mt-1 text-sm">Explore products tailored for your business needs.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((p) => (
          <div key={p.title} className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 card-shadow card-hover flex flex-col gap-4">
            <div className="flex items-start justify-between">
              <div className={`w-12 h-12 ${p.iconBg} rounded-lg flex items-center justify-center`}>
                <span className={`material-symbols-outlined ${p.iconColor} text-2xl`}>{p.icon}</span>
              </div>
              <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${p.badgeColor}`}>{p.badge}</span>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-on-background mb-1">{p.title}</h3>
              <p className="text-sm text-secondary">{p.desc}</p>
            </div>
            <button className="mt-auto px-4 py-2 bg-surface border border-primary text-primary rounded-lg text-xs font-semibold hover:bg-primary-fixed transition-colors self-start">
              Learn More
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
