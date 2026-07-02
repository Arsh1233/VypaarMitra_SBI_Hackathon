import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopBar from './TopBar';

export default function Layout({ role }) {
  return (
    <div className="flex min-h-screen bg-background text-on-background antialiased">
      <Sidebar role={role} />
      <div className="flex-1 flex flex-col min-h-screen md:ml-64 w-full">
        <TopBar />
        <main className="flex-1 p-4 md:p-6 bg-background w-full overflow-x-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
