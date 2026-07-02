export default function ApplyCredit() {
  return (
    <div className="max-w-3xl mx-auto w-full">
      <div className="mb-8">
        <h2 className="text-3xl font-semibold text-on-background tracking-tight">Apply for Business Credit</h2>
        <p className="text-secondary mt-1 text-sm">Complete the form below to apply for pre-approved credit facilities.</p>
      </div>

      <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 card-shadow space-y-6">
        {/* Pre-approval banner */}
        <div className="bg-primary-fixed border border-primary-fixed-dim rounded-lg p-4 flex items-center gap-3">
          <span className="material-symbols-outlined text-primary">verified</span>
          <div>
            <p className="text-sm font-semibold text-primary">Pre-Approved: ₹5,00,000</p>
            <p className="text-xs text-on-primary-fixed-variant">Based on your GST turnover and financial fitness score.</p>
          </div>
        </div>

        {/* Form */}
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-secondary uppercase tracking-wider mb-1">Credit Type</label>
            <select className="w-full bg-surface-container-low border border-outline-variant rounded-lg py-3 px-4 text-sm focus:ring-2 focus:ring-primary outline-none">
              <option>Business Overdraft</option>
              <option>Term Loan</option>
              <option>Working Capital</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-secondary uppercase tracking-wider mb-1">Requested Amount (₹)</label>
            <input className="w-full bg-surface-container-low border border-outline-variant rounded-lg py-3 px-4 text-sm focus:ring-2 focus:ring-primary outline-none" type="text" placeholder="5,00,000" />
          </div>
          <div>
            <label className="block text-xs font-medium text-secondary uppercase tracking-wider mb-1">Purpose</label>
            <textarea className="w-full bg-surface-container-low border border-outline-variant rounded-lg py-3 px-4 text-sm focus:ring-2 focus:ring-primary outline-none resize-none" rows="3" placeholder="Describe the purpose of this credit facility..." />
          </div>
          <div>
            <label className="block text-xs font-medium text-secondary uppercase tracking-wider mb-1">Tenure</label>
            <select className="w-full bg-surface-container-low border border-outline-variant rounded-lg py-3 px-4 text-sm focus:ring-2 focus:ring-primary outline-none">
              <option>12 Months</option>
              <option>24 Months</option>
              <option>36 Months</option>
              <option>48 Months</option>
              <option>60 Months</option>
            </select>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 justify-end pt-4 border-t border-outline-variant">
          <button className="px-6 py-2.5 text-sm font-medium text-secondary border border-outline-variant rounded-lg hover:bg-surface-container-low transition-colors">Save Draft</button>
          <button className="px-6 py-2.5 text-sm font-medium bg-primary text-on-primary rounded-lg hover:bg-primary-container transition-colors shadow-sm">Submit Application</button>
        </div>
      </div>
    </div>
  );
}
