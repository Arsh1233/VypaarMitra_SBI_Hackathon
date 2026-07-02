import { useParams, Link } from 'react-router-dom';

const merchantData = {
  'MRC-001': {
    name: 'Global Trade Corp Ltd.', owner: 'Anil Desai', pan: 'AXXPD1234X', gst: '27AXXPD1234X1Z5', cin: 'U72900MH2020PTC123456',
    type: 'Company', risk: 92, status: 'PEP Flagged', address: '123 Trade Street, Andheri East, Mumbai 400069',
    directors: ['Anil Desai (MD)', 'Deepa Desai (Director)'],
    timeline: [
      { time: '10:42 AM', action: 'PAN Verified', agent: 'DocAgent', status: 'success' },
      { time: '10:43 AM', action: 'GST Lookup Complete', agent: 'RegistryAgent', status: 'success' },
      { time: '10:44 AM', action: 'PEP Match Found (Tier 1)', agent: 'RiskAgent', status: 'error' },
      { time: '10:45 AM', action: 'Application Flagged for Review', agent: 'System', status: 'warning' },
    ]
  },
};

export default function MerchantDetail() {
  const { id } = useParams();
  const m = merchantData[id] || merchantData['MRC-001'];

  return (
    <div className="max-w-[1440px] mx-auto w-full">
      <Link to="/admin/review" className="flex items-center gap-1 text-sm text-secondary hover:text-primary transition-colors mb-6">
        <span className="material-symbols-outlined text-xl">arrow_back</span> Back to Merchant Review
      </Link>

      <div className="mb-8 flex flex-col md:flex-row md:items-start justify-between gap-4">
        <div>
          <h2 className="text-3xl font-semibold text-on-background tracking-tight">{m.name}</h2>
          <p className="text-secondary mt-1 text-sm">{id} • {m.type} • {m.address}</p>
        </div>
        <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-semibold bg-error-container text-on-error-container">{m.status} — Risk: {m.risk}/100</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {/* Business Info */}
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 card-shadow">
          <h3 className="text-lg font-semibold text-on-background mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">business</span> Business Information
          </h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between"><span className="text-secondary">Owner</span><span className="font-medium">{m.owner}</span></div>
            <div className="flex justify-between"><span className="text-secondary">PAN</span><span className="font-mono">{m.pan}</span></div>
            <div className="flex justify-between"><span className="text-secondary">GST</span><span className="font-mono">{m.gst}</span></div>
            <div className="flex justify-between"><span className="text-secondary">CIN</span><span className="font-mono text-xs">{m.cin}</span></div>
          </div>
        </div>

        {/* Directors */}
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 card-shadow">
          <h3 className="text-lg font-semibold text-on-background mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">group</span> Directors / UBOs
          </h3>
          <ul className="space-y-3">
            {m.directors.map((d, i) => (
              <li key={i} className="flex items-center gap-3 text-sm">
                <div className="w-8 h-8 rounded-full bg-primary-fixed text-primary flex items-center justify-center font-bold text-xs">{d[0]}</div>
                <span>{d}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Verification Timeline */}
      <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 card-shadow">
        <h3 className="text-lg font-semibold text-on-background mb-4 flex items-center gap-2">
          <span className="material-symbols-outlined text-primary">timeline</span> Verification Timeline
        </h3>
        <div className="space-y-4">
          {m.timeline.map((t, i) => {
            const statusColors = { success: 'bg-success', error: 'bg-error', warning: 'bg-warning' };
            return (
              <div key={i} className="flex items-start gap-4">
                <div className="flex flex-col items-center">
                  <div className={`w-3 h-3 rounded-full ${statusColors[t.status]}`}></div>
                  {i < m.timeline.length - 1 && <div className="w-0.5 h-8 bg-outline-variant"></div>}
                </div>
                <div>
                  <p className="text-sm font-medium text-on-background">{t.action}</p>
                  <p className="text-xs text-secondary">{t.time} — Agent: {t.agent}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
