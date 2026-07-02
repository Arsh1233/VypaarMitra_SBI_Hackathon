import { Link } from 'react-router-dom';

const merchants = [
  { id: 'MRC-001', name: 'Global Trade Corp Ltd.', owner: 'Anil Desai', type: 'Company', risk: 92, status: 'PEP Flagged', date: 'Jul 02, 2026', level: 'high' },
  { id: 'MRC-002', name: 'TechSynapse Solutions', owner: 'Priya Sharma', type: 'Partnership', risk: 65, status: 'Suspicious Activity', date: 'Jul 02, 2026', level: 'medium' },
  { id: 'MRC-003', name: 'Nexus Logistics PVT', owner: 'Rohan Mehta', type: 'Company', risk: 88, status: 'Sanction Alert', date: 'Jul 01, 2026', level: 'high' },
  { id: 'MRC-004', name: 'Green Valley Estates', owner: 'Amit Patel', type: 'Proprietorship', risk: 25, status: 'Missing Docs', date: 'Jul 01, 2026', level: 'low' },
  { id: 'MRC-005', name: 'Bharat Textiles', owner: 'Sunita Devi', type: 'Proprietorship', risk: 30, status: 'KYC Incomplete', date: 'Jun 30, 2026', level: 'low' },
];

export default function MerchantReview() {
  const getRiskBadge = (level, score) => {
    const styles = { high: 'bg-error-container text-on-error-container', medium: 'bg-tertiary-fixed text-on-tertiary-fixed', low: 'bg-surface-variant text-on-surface-variant' };
    return <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${styles[level]}`}>{score}/100</span>;
  };

  return (
    <div className="max-w-[1440px] mx-auto w-full">
      <div className="mb-8">
        <h2 className="text-3xl font-semibold text-on-background tracking-tight">Merchant Compliance Review</h2>
        <p className="text-secondary mt-1 text-sm">Review onboarding compliance and KYC status for all merchants.</p>
      </div>

      <div className="bg-surface-container-lowest border border-outline-variant rounded-xl shadow-[0_2px_4px_rgba(0,0,0,0.02)] overflow-hidden">
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse whitespace-nowrap">
            <thead>
              <tr className="bg-surface-container-low border-b border-outline-variant text-secondary text-xs font-medium uppercase tracking-wider">
                <th className="py-4 px-6">Merchant</th>
                <th className="py-4 px-6">Business Type</th>
                <th className="py-4 px-6 text-center">Risk Score</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6">Date</th>
                <th className="py-4 px-6 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant text-sm">
              {merchants.map((m) => (
                <tr key={m.id} className="hover:bg-surface-container-low/50 transition-colors group">
                  <td className="py-5 px-6">
                    <div className="flex flex-col">
                      <span className="font-semibold text-on-background">{m.name}</span>
                      <span className="text-secondary text-sm">{m.id} • {m.owner}</span>
                    </div>
                  </td>
                  <td className="py-5 px-6 text-secondary">{m.type}</td>
                  <td className="py-5 px-6 text-center">{getRiskBadge(m.level, m.risk)}</td>
                  <td className="py-5 px-6 text-on-surface-variant">{m.status}</td>
                  <td className="py-5 px-6 text-secondary">{m.date}</td>
                  <td className="py-5 px-6 text-right">
                    <Link to={`/admin/review/${m.id}`} className="px-3 py-1.5 text-sm font-medium text-primary hover:bg-primary-fixed rounded-md transition-colors">
                      View Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
