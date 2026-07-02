import { useState } from 'react';

const mockLogs = [
  { ts: '2026-07-02T14:32:10Z', userId: 'usr_****1234', agent: 'DocAgent', action: 'PAN Verified', confidence: 95, payload: '{"pan":"XXXX1234","quality_score":92}', status: 'success' },
  { ts: '2026-07-02T14:31:45Z', userId: 'usr_****1234', agent: 'RegistryAgent', action: 'MCA Lookup', confidence: 88, payload: '{"cin":"U72900MH2020","status":"active"}', status: 'success' },
  { ts: '2026-07-02T14:31:20Z', userId: 'usr_****5678', agent: 'VisionAgent', action: 'Blurry Doc Detected', confidence: 45, payload: '{"quality_score":45,"retry":true}', status: 'warning' },
  { ts: '2026-07-02T14:30:55Z', userId: 'usr_****5678', agent: 'MatcherAgent', action: 'Name Mismatch', confidence: 18, payload: '{"pan_name":"Rajesh Sharma","gst_name":"Raj Sharm","ratio":0.82}', status: 'error' },
  { ts: '2026-07-02T14:30:10Z', userId: 'usr_****9012', agent: 'RiskAgent', action: 'PEP Match', confidence: 92, payload: '{"pep_match":true,"sanction_list":"tier1"}', status: 'error' },
  { ts: '2026-07-02T14:29:30Z', userId: 'usr_****9012', agent: 'Admin', action: 'Override Triggered', confidence: 100, payload: '{"admin":"RM_001","reason":"Known customer"}', status: 'success' },
  { ts: '2026-07-02T14:28:00Z', userId: 'usr_****3456', agent: 'ProductAgent', action: 'Eligibility Check', confidence: 82, payload: '{"products":["current","overdraft"],"tier":"full"}', status: 'success' },
  { ts: '2026-07-02T14:27:15Z', userId: 'usr_****3456', agent: 'UBOAgent', action: 'Shareholding Parsed', confidence: 76, payload: '{"directors":2,"beneficial_owner":"Amit Patel"}', status: 'success' },
];

export default function AuditLogs() {
  const [expandedRow, setExpandedRow] = useState(null);
  const [searchUser, setSearchUser] = useState('');

  const filteredLogs = searchUser
    ? mockLogs.filter((l) => l.userId.includes(searchUser))
    : mockLogs;

  const getStatusBadge = (status) => {
    const styles = { success: 'bg-success-bg text-success', warning: 'bg-warning-bg text-warning', error: 'bg-error-container text-on-error-container' };
    return <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${styles[status]}`}>{status}</span>;
  };

  const getConfidenceBar = (score) => {
    const color = score > 80 ? 'bg-success' : score > 50 ? 'bg-warning' : 'bg-error';
    return (
      <div className="flex items-center gap-2">
        <div className="w-20 h-2 bg-surface-container rounded-full overflow-hidden">
          <div className={`h-full ${color} rounded-full transition-all`} style={{ width: `${score}%` }}></div>
        </div>
        <span className="text-xs font-medium text-on-surface-variant">{score}%</span>
      </div>
    );
  };

  return (
    <div className="max-w-[1440px] mx-auto w-full">
      {/* Header */}
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h2 className="text-3xl font-semibold text-on-background tracking-tight">Audit Trail</h2>
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-success-bg text-success">7-Year Retention</span>
          </div>
          <p className="text-secondary mt-1 text-sm">Immutable, searchable audit trail for all agent actions.</p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 mb-4 flex flex-col lg:flex-row gap-4 items-center justify-between shadow-[0_2px_4px_rgba(0,0,0,0.02)]">
        <div className="w-full lg:w-1/4 relative">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline">search</span>
          <input
            className="w-full bg-surface-container-low border-none rounded-lg py-2.5 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary focus:bg-surface-container-lowest transition-all outline-none"
            placeholder="Search by User ID..."
            value={searchUser}
            onChange={(e) => setSearchUser(e.target.value)}
          />
        </div>
        <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
          <select className="bg-surface-container-low border-none rounded-lg py-2.5 px-4 pr-8 text-sm focus:ring-2 focus:ring-primary text-on-surface-variant cursor-pointer outline-none">
            <option>All Agents</option><option>DocAgent</option><option>RegistryAgent</option><option>VisionAgent</option><option>MatcherAgent</option><option>RiskAgent</option><option>ProductAgent</option><option>UBOAgent</option>
          </select>
          <select className="bg-surface-container-low border-none rounded-lg py-2.5 px-4 pr-8 text-sm focus:ring-2 focus:ring-primary text-on-surface-variant cursor-pointer outline-none">
            <option>All Actions</option><option>Verification</option><option>Override</option><option>Account Creation</option>
          </select>
          <input className="bg-surface-container-low border-none rounded-lg py-2.5 px-4 text-sm focus:ring-2 focus:ring-primary text-on-surface-variant cursor-pointer outline-none" type="date" />
          <button className="flex items-center gap-2 px-4 py-2 bg-surface border border-outline-variant rounded-lg text-primary hover:bg-surface-container-low transition-colors font-medium text-sm">
            <span className="material-symbols-outlined text-sm">download</span> Export CSV
          </button>
        </div>
      </div>

      {/* Logs Table */}
      <div className="bg-surface-container-lowest border border-outline-variant rounded-xl shadow-[0_2px_4px_rgba(0,0,0,0.02)] overflow-hidden">
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse whitespace-nowrap">
            <thead>
              <tr className="bg-surface-container-low border-b border-outline-variant text-secondary text-xs font-medium uppercase tracking-wider">
                <th className="py-4 px-6 font-medium">Timestamp</th>
                <th className="py-4 px-6 font-medium">User ID</th>
                <th className="py-4 px-6 font-medium">Agent</th>
                <th className="py-4 px-6 font-medium">Action</th>
                <th className="py-4 px-6 font-medium">Confidence</th>
                <th className="py-4 px-6 font-medium">Status</th>
                <th className="py-4 px-6 font-medium w-10"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant text-sm">
              {filteredLogs.map((log, i) => (
                <>
                  <tr key={i} className="hover:bg-surface-container-low/50 transition-colors cursor-pointer" onClick={() => setExpandedRow(expandedRow === i ? null : i)}>
                    <td className="py-4 px-6 text-secondary font-mono text-xs">{log.ts}</td>
                    <td className="py-4 px-6 text-on-surface-variant font-mono">{log.userId}</td>
                    <td className="py-4 px-6">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary-fixed text-primary">{log.agent}</span>
                    </td>
                    <td className="py-4 px-6 text-on-background font-medium">{log.action}</td>
                    <td className="py-4 px-6">{getConfidenceBar(log.confidence)}</td>
                    <td className="py-4 px-6">{getStatusBadge(log.status)}</td>
                    <td className="py-4 px-6">
                      <span className={`material-symbols-outlined text-outline transition-transform ${expandedRow === i ? 'rotate-180' : ''}`}>expand_more</span>
                    </td>
                  </tr>
                  {expandedRow === i && (
                    <tr key={`${i}-detail`}>
                      <td colSpan="7" className="bg-surface-container-low p-6 border-b border-outline-variant">
                        <p className="text-xs font-medium text-secondary uppercase tracking-wider mb-2">Input Payload (Redacted)</p>
                        <pre className="bg-surface-container-lowest border border-outline-variant rounded-lg p-4 text-xs font-mono overflow-x-auto">
                          <code>{JSON.stringify(JSON.parse(log.payload), null, 2)}</code>
                        </pre>
                      </td>
                    </tr>
                  )}
                </>
              ))}
            </tbody>
          </table>
        </div>
        {/* Pagination */}
        <div className="bg-surface-container-lowest px-6 py-4 border-t border-outline-variant flex items-center justify-between">
          <span className="text-sm text-secondary">Showing 1 to {filteredLogs.length} of {filteredLogs.length} logs</span>
          <div className="flex items-center gap-2">
            <button className="p-1 rounded text-outline hover:text-primary hover:bg-surface-container-low transition-colors disabled:opacity-50" disabled><span className="material-symbols-outlined">chevron_left</span></button>
            <button className="w-8 h-8 rounded bg-primary-fixed text-primary font-medium flex items-center justify-center text-sm">1</button>
            <button className="p-1 rounded text-outline hover:text-primary hover:bg-surface-container-low transition-colors"><span className="material-symbols-outlined">chevron_right</span></button>
          </div>
        </div>
      </div>
    </div>
  );
}
