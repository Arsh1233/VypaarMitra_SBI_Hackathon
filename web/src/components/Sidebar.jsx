import { NavLink } from 'react-router-dom';

const customerNavItems = [
  { icon: 'dashboard', label: 'Dashboard', path: '/customer/dashboard' },
  { icon: 'receipt_long', label: 'Transactions', path: '/customer/transactions' },
  { icon: 'shopping_bag', label: 'Products', path: '/customer/products' },
  { icon: 'credit_card', label: 'Apply Credit', path: '/customer/apply-credit' },
  { icon: 'settings', label: 'Settings', path: '/customer/settings' },
];

const adminNavItems = [
  { icon: 'list_alt', label: 'Queue', path: '/admin/queue' },
  { icon: 'history', label: 'Logs', path: '/admin/audit' },
  { icon: 'storefront', label: 'Merchants', path: '/admin/review' },
  { icon: 'settings', label: 'Settings', path: '/admin/settings' },
];

export default function Sidebar({ role }) {
  const navItems = role === 'admin' ? adminNavItems : customerNavItems;
  return (
    <aside className="hidden md:flex flex-col h-screen w-64 fixed left-0 top-0 bg-surface border-r border-outline-variant z-20 py-8">
      {/* Brand */}
      <div className="px-6 mb-8 flex flex-col gap-1">
        <h1 className="text-xl font-bold text-primary">Vyapaar Mitra</h1>
        <span className="text-xs font-semibold text-secondary uppercase tracking-wider">Enterprise Banking</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2 space-y-1 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ease-in-out text-sm ${
                isActive
                  ? 'bg-secondary-container text-on-secondary-container font-semibold'
                  : 'text-secondary hover:bg-surface-container-low'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <span className={`material-symbols-outlined text-xl ${isActive ? 'fill' : ''}`}>{item.icon}</span>
                {item.label}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Support CTA */}
      <div className="px-4 mt-auto">
        <button className="w-full flex items-center justify-center gap-2 bg-primary-container text-on-primary-container py-3 rounded-lg font-medium text-sm hover:opacity-90 transition-opacity shadow-sm">
          <span className="material-symbols-outlined text-xl">support_agent</span>
          Support Assistance
        </button>
      </div>
    </aside>
  );
}
