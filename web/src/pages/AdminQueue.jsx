import { useState } from 'react';

const initialQueue = [
  { id: 'APP-2023-8942', entity: 'Global Trade Corp Ltd.', person: 'Anil Desai', risk: 92, reason: 'Matched PEP Database (Tier 1)', time: 'Today, 10:42 AM', level: 'high' },
  { id: 'APP-2023-8940', entity: 'TechSynapse Solutions', person: 'Priya Sharma', risk: 65, reason: 'Unusual Trans. Volume', time: 'Today, 09:15 AM', level: 'medium' },
  { id: 'APP-2023-8921', entity: 'Nexus Logistics PVT', person: 'Rohan Mehta', risk: 88, reason: 'Sanction List Alert', time: 'Yesterday, 04:30 PM', level: 'high' },
  { id: 'APP-2023-8910', entity: 'Green Valley Estates', person: 'Amit Patel', risk: 25, reason: 'Missing KYC Doc', time: 'Yesterday, 11:20 AM', level: 'low' },
];

const kpis = [
  { label: 'Pending PEP', value: '12', icon: 'policy', iconBg: 'bg-error-container', iconColor: 'text-error', trend: '+3 from yesterday', trendColor: 'text-error', trendIcon: 'trending_up', decorBg: 'bg-error-container' },
  { label: 'Suspicious Flags', value: '47', icon: 'flag', iconBg: 'bg-primary-fixed', iconColor: 'text-primary', trend: 'Stable volume', trendColor: 'text-secondary', trendIcon: 'horizontal_rule', decorBg: 'bg-primary-container' },
  { label: 'Deferred Reviews', value: '08', icon: 'schedule', iconBg: 'bg-surface-variant', iconColor: 'text-on-surface-variant', trend: '-5 this week', trendColor: 'text-tertiary-container', trendIcon: 'trending_down', decorBg: 'bg-tertiary-container' },
];

export default function AdminQueue() {
  const [queue, setQueue] = useState(initialQueue);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [otp, setOtp] = useState('');
  const [overrideReason, setOverrideReason] = useState('');
  const [toast, setToast] = useState(null);

  const handleOverride = (item) => {
    setSelectedUser(item);
    setShowModal(true);
    setOtp('');
    setOverrideReason('');
  };

  const confirmOverride = () => {
    if (otp.length !== 6) {
      setToast({ type: 'error', msg: 'Invalid OTP. Please enter 6 digits.' });
      setTimeout(() => setToast(null), 3000);
      return;
    }
    // Simulate API POST /api/admin/override
    setQueue(queue.filter((q) => q.id !== selectedUser.id));
    setShowModal(false);
    setToast({ type: 'success', msg: `✅ Override successful. ${selectedUser.entity} moved to Account Creation.` });
    setTimeout(() => setToast(null), 4000);
  };

  const getRiskBadge = (level, score) => {
    const styles = {
      high: 'bg-error-container text-on-error-container',
      medium: 'bg-tertiary-fixed text-on-tertiary-fixed',
      low: 'bg-surface-variant text-on-surface-variant',
    };
    return <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${styles[level]}`}>{score} / 100</span>;
  };

  return (
    <div className="max-w-[1440px] mx-auto w-full">
      {/* Toast */}
      {toast && (
        <div className={`fixed top-6 right-6 z-50 px-4 py-3 rounded-lg shadow-lg text-sm font-medium animate-pulse ${toast.type === 'success' ? 'bg-success-bg text-success' : 'bg-error-container text-on-error-container'}`}>
          {toast.msg}
        </div>
      )}

      {/* Header */}
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-semibold text-on-background tracking-tight">Compliance Queue</h2>
          <p className="text-secondary mt-1 text-sm">Review and manage pending entity compliance flags.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-surface border border-outline-variant rounded-lg text-primary hover:bg-surface-container-low transition-colors font-medium text-sm">
            <span className="material-symbols-outlined text-sm">download</span> Export List
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary text-on-primary rounded-lg hover:bg-primary-container transition-colors font-medium text-sm shadow-sm">
            <span className="material-symbols-outlined text-sm">add</span> New Case
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {kpis.map((kpi) => (
          <div key={kpi.label} className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 shadow-[0_2px_4px_rgba(0,0,0,0.02)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.05)] transition-shadow relative overflow-hidden group cursor-pointer">
            <div className={`absolute right-0 top-0 w-32 h-32 ${kpi.decorBg} opacity-15 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110`}></div>
            <div className="flex items-start justify-between relative z-10">
              <div>
                <p className="text-secondary text-xs font-medium uppercase mb-2 tracking-wider">{kpi.label}</p>
                <h3 className="text-5xl font-bold text-on-background tracking-tight">{kpi.value}</h3>
              </div>
              <div className={`p-3 ${kpi.iconBg} ${kpi.iconColor} rounded-lg`}>
                <span className="material-symbols-outlined">{kpi.icon}</span>
              </div>
            </div>
            <div className={`mt-4 flex items-center gap-1 ${kpi.trendColor} text-sm font-medium relative z-10`}>
              <span className="material-symbols-outlined text-sm">{kpi.trendIcon}</span>
              <span>{kpi.trend}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Filter Bar */}
      <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 mb-4 flex flex-col lg:flex-row gap-4 items-center justify-between shadow-[0_2px_4px_rgba(0,0,0,0.02)]">
        <div className="w-full lg:w-1/3 relative">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline">search</span>
          <input className="w-full bg-surface-container-low border-none rounded-lg py-2.5 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary focus:bg-surface-container-lowest transition-all outline-none" placeholder="Search by ID, Entity, or User..." type="text" />
        </div>
        <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
          <select className="bg-surface-container-low border-none rounded-lg py-2.5 px-4 pr-8 text-sm focus:ring-2 focus:ring-primary text-on-surface-variant cursor-pointer outline-none">
            <option>All Statuses</option><option>Pending</option><option>In Review</option><option>Deferred</option>
          </select>
          <select className="bg-surface-container-low border-none rounded-lg py-2.5 px-4 pr-8 text-sm focus:ring-2 focus:ring-primary text-on-surface-variant cursor-pointer outline-none">
            <option>All Risk Levels</option><option>High Risk</option><option>Medium Risk</option><option>Low Risk</option>
          </select>
          <button className="p-2.5 rounded-lg border border-outline-variant text-secondary hover:bg-surface-container-low transition-colors">
            <span className="material-symbols-outlined">filter_list_off</span>
          </button>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-surface-container-lowest border border-outline-variant rounded-xl shadow-[0_2px_4px_rgba(0,0,0,0.02)] overflow-hidden">
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse whitespace-nowrap">
            <thead>
              <tr className="bg-surface-container-low border-b border-outline-variant text-secondary text-xs font-medium uppercase tracking-wider">
                <th className="py-4 px-6 font-medium w-16"><input className="rounded border-outline text-primary focus:ring-primary" type="checkbox" /></th>
                <th className="py-4 px-6 font-medium">Applicant / Entity</th>
                <th className="py-4 px-6 font-medium text-center">Risk Score</th>
                <th className="py-4 px-6 font-medium">Flag Reason</th>
                <th className="py-4 px-6 font-medium">Timestamp</th>
                <th className="py-4 px-6 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant text-sm">
              {queue.map((item) => (
                <tr key={item.id} className="hover:bg-surface-container-low/50 transition-colors group">
                  <td className="py-5 px-6"><input className="rounded border-outline text-primary focus:ring-primary" type="checkbox" /></td>
                  <td className="py-5 px-6">
                    <div className="flex flex-col">
                      <span className="font-semibold text-on-background">{item.entity}</span>
                      <span className="text-secondary text-sm">{item.id} • {item.person}</span>
                    </div>
                  </td>
                  <td className="py-5 px-6 text-center">{getRiskBadge(item.level, item.risk)}</td>
                  <td className="py-5 px-6">
                    <div className="flex items-center gap-2">
                      <span className={`material-symbols-outlined text-sm ${item.level === 'high' ? 'text-error' : item.level === 'medium' ? 'text-tertiary-container' : 'text-secondary'}`}>
                        {item.level === 'low' ? 'article' : 'warning'}
                      </span>
                      <span className="text-on-surface-variant max-w-[200px] truncate" title={item.reason}>{item.reason}</span>
                    </div>
                  </td>
                  <td className="py-5 px-6 text-secondary text-sm">{item.time}</td>
                  <td className="py-5 px-6 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="px-3 py-1.5 text-sm font-medium text-primary hover:bg-primary-fixed rounded-md transition-colors">Details</button>
                      <button onClick={() => handleOverride(item)} className="px-3 py-1.5 text-sm font-medium text-on-surface-variant border border-outline-variant hover:bg-surface-container-high rounded-md transition-colors">Override</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Pagination */}
        <div className="bg-surface-container-lowest px-6 py-4 border-t border-outline-variant flex items-center justify-between">
          <span className="text-sm text-secondary">Showing 1 to {queue.length} of {queue.length} entries</span>
          <div className="flex items-center gap-2">
            <button className="p-1 rounded text-outline hover:text-primary hover:bg-surface-container-low transition-colors disabled:opacity-50" disabled><span className="material-symbols-outlined">chevron_left</span></button>
            <button className="w-8 h-8 rounded bg-primary-fixed text-primary font-medium flex items-center justify-center text-sm">1</button>
            <button className="p-1 rounded text-outline hover:text-primary hover:bg-surface-container-low transition-colors"><span className="material-symbols-outlined">chevron_right</span></button>
          </div>
        </div>
      </div>

      {/* Override Modal */}
      {showModal && selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" onClick={() => setShowModal(false)}>
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>
          <div className="relative bg-surface-container-lowest rounded-xl shadow-2xl w-full max-w-md mx-4 p-6" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-xl font-semibold text-on-background mb-2">⚠️ Manual Override Confirmation</h3>
            <p className="text-sm text-secondary mb-4">
              You are about to override AI decision for <strong>{selectedUser.entity}</strong>. Risk Score: <strong className="text-error">{selectedUser.risk}/100</strong>. Are you sure?
            </p>
            <div className="mb-4">
              <label className="block text-xs font-medium text-secondary mb-1 uppercase tracking-wider">Override Reason</label>
              <textarea
                className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-3 text-sm focus:ring-2 focus:ring-primary outline-none resize-none"
                rows="3"
                placeholder="Enter override reason for audit log..."
                value={overrideReason}
                onChange={(e) => setOverrideReason(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <label className="block text-xs font-medium text-secondary mb-1 uppercase tracking-wider">OTP Verification (6 digits)</label>
              <input
                className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-3 text-sm font-mono tracking-widest text-center focus:ring-2 focus:ring-primary outline-none"
                type="text"
                maxLength="6"
                placeholder="● ● ● ● ● ●"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
              />
            </div>
            <div className="flex gap-3 justify-end">
              <button onClick={() => setShowModal(false)} className="px-4 py-2 text-sm font-medium text-secondary border border-outline-variant rounded-lg hover:bg-surface-container-low transition-colors">Cancel</button>
              <button onClick={confirmOverride} className="px-4 py-2 text-sm font-medium bg-error text-on-error rounded-lg hover:opacity-90 transition-opacity shadow-sm">Confirm Override</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
