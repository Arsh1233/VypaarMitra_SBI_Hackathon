import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import CustomerDashboard from './pages/CustomerDashboard';
import AdminQueue from './pages/AdminQueue';
import AuditLogs from './pages/AuditLogs';
import Transactions from './pages/Transactions';
import Products from './pages/Products';
import MerchantReview from './pages/MerchantReview';
import MerchantDetail from './pages/MerchantDetail';
import ApplyCredit from './pages/ApplyCredit';

import Landing from './pages/Landing';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        
        {/* Customer Routes */}
        <Route path="/customer" element={<Layout role="customer" />}>
          <Route path="dashboard" element={<CustomerDashboard />} />
          <Route path="transactions" element={<Transactions />} />
          <Route path="products" element={<Products />} />
          <Route path="apply-credit" element={<ApplyCredit />} />
          <Route path="settings" element={<div className="text-secondary text-center py-20">Settings page coming soon.</div>} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin" element={<Layout role="admin" />}>
          <Route path="queue" element={<AdminQueue />} />
          <Route path="audit" element={<AuditLogs />} />
          <Route path="review" element={<MerchantReview />} />
          <Route path="review/:id" element={<MerchantDetail />} />
          <Route path="settings" element={<div className="text-secondary text-center py-20">Settings page coming soon.</div>} />
        </Route>
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
