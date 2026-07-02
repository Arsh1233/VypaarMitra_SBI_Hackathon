import { useNavigate } from 'react-router-dom';

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-surface-container-lowest border border-outline-variant rounded-2xl p-8 card-shadow flex flex-col items-center text-center">
        <h1 className="text-3xl font-bold text-primary mb-2">Vyapaar Mitra</h1>
        <p className="text-secondary mb-8">Enterprise Banking Platform</p>
        
        <div className="w-full flex flex-col gap-4">
          <button 
            onClick={() => navigate('/customer/dashboard')}
            className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-primary text-on-primary rounded-xl font-medium hover:bg-primary-container transition-colors shadow-sm"
          >
            <span className="material-symbols-outlined">store</span>
            Login as Customer
          </button>

          <div className="flex items-center gap-4 my-2">
            <div className="flex-1 h-px bg-outline-variant"></div>
            <span className="text-xs font-semibold text-outline uppercase tracking-wider">OR</span>
            <div className="flex-1 h-px bg-outline-variant"></div>
          </div>

          <button 
            onClick={() => navigate('/admin/queue')}
            className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-secondary-container text-on-secondary-container rounded-xl font-medium hover:opacity-90 transition-opacity shadow-sm"
          >
            <span className="material-symbols-outlined">admin_panel_settings</span>
            Login as Admin
          </button>
        </div>
      </div>
    </div>
  );
}
